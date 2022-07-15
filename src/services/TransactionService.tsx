import algosdk, { LogicSigAccount, Transaction } from 'algosdk';
import ChainService from './ChainService';
import WalletService from './WalletService';

export default class TransactionService {
  algod = new ChainService().algod;
  walletService = new WalletService();

  sendAndConfirm = async (
    signedTxns: Uint8Array[]
  ): Promise<Record<string, any>> => {
    try {
      const sentTxns = await this.algod.sendRawTransaction(signedTxns).do();
      console.log('sentTxns', sentTxns);
      const confirmedTxns = await algosdk.waitForConfirmation(
        this.algod,
        sentTxns.txId,
        4
      );
      return confirmedTxns;
    } catch (error) {
      throw error;
    }
  };

  sellAsset = async ({
    seller,
    assetIndex,
    contractResult,
  }: any): Promise<Record<string, any>> => {
    try {
      const contractEncoded = new Uint8Array(
        Buffer.from(contractResult, 'base64')
      );
      const contractSig = new LogicSigAccount(contractEncoded);
      const suggestedParams = await this.algod.getTransactionParams().do();
      // fund escrow
      const txn0: Transaction =
        algosdk.makePaymentTxnWithSuggestedParamsFromObject({
          from: seller,
          to: contractSig.address(),
          amount: 0.5 * 1e6,
          suggestedParams,
        });
      // opt in escrow
      const txn1: Transaction =
        algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
          from: contractSig.address(),
          to: contractSig.address(),
          amount: 0,
          assetIndex,
          suggestedParams,
        });
      // transfer asset to escrow
      const txn2: Transaction =
        algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
          from: seller,
          to: contractSig.address(),
          assetIndex,
          amount: 1,
          suggestedParams,
        });

      const group = algosdk.assignGroupID([txn0, txn1, txn2]);
      const signedTxns = await this.walletService.sign(group);
      signedTxns[1] = algosdk.signLogicSigTransactionObject(
        group[1],
        contractSig
      ).blob;

      const confirmedTxns = await this.sendAndConfirm(signedTxns);
      return confirmedTxns;
    } catch (error) {
      throw error;
    }
  };

  buyAsset = async ({
    buyer,
    seller,
    assetIndex,
    price,
    contractSig,
  }: any): Promise<Record<string, any>> => {
    try {
      const suggestedParams = await this.algod.getTransactionParams().do();
      // pay seller
      const txn0 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        from: buyer,
        to: seller,
        amount: price * 1e6 * 0.9,
        suggestedParams,
      });
      // opt in buyer
      const txn1 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        from: buyer,
        to: buyer,
        amount: 0,
        assetIndex,
        suggestedParams,
      });
      // transfer asset to buyer
      const txn2 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        from: contractSig.address(),
        to: buyer,
        amount: 1,
        assetIndex,
        closeRemainderTo: buyer,
        suggestedParams,
      });
      // close remainder to seller
      const txn3 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        from: contractSig.address(),
        to: seller,
        amount: 0,
        closeRemainderTo: seller,
        suggestedParams,
      });
      // pay collaborator
      const txn4 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        from: buyer,
        to: process.env.REACT_APP_COLLAB_ADDRESS ?? '',
        amount: price * 1e6 * 0.1,
        suggestedParams,
      });
      const group = algosdk.assignGroupID([txn0, txn1, txn2, txn3, txn4]);
      const signedTxns = await this.walletService.sign(group);

      signedTxns[2] = algosdk.signLogicSigTransactionObject(
        group[2],
        contractSig
      ).blob;
      signedTxns[3] = algosdk.signLogicSigTransactionObject(
        group[3],
        contractSig
      ).blob;
      return await this.sendAndConfirm(signedTxns);
    } catch (error) {
      throw error;
    }
  };

  cancelAssetSale = async ({ contract }: any) => {
    try {
      const contractEncoded = new Uint8Array(
        Buffer.from(contract['result'], 'base64')
      );
      const contractSig = new algosdk.LogicSigAccount(contractEncoded);
      const suggestedParams = await this.algod.getTransactionParams().do();

      // opt in seller
      // const tx0 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
      //   from: contract["seller"],
      //   to: contract["seller"],
      //   amount: 0,
      //   assetIndex: contract["asset"],
      //   suggestedParams,
      // });
      // close asset to seller
      const tx1 = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
        from: contract['hash'],
        to: contract['seller'],
        assetIndex: contract['asset'],
        amount: 1,
        closeRemainderTo: contract['seller'],
        suggestedParams,
      });
      // close remainder to seller
      const tx2 = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        from: contract['hash'],
        to: contract['seller'],
        amount: 0,
        closeRemainderTo: contract['seller'],
        suggestedParams,
      });
      // group
      const group = algosdk.assignGroupID([tx1, tx2]);
      // const signedTxns = await WalletClient.sign(group);
      let signedTxns = [];
      signedTxns[0] = algosdk.signLogicSigTransactionObject(
        group[0],
        contractSig
      ).blob;
      signedTxns[1] = algosdk.signLogicSigTransactionObject(
        group[1],
        contractSig
      ).blob;
      const confirmedTxns = await this.sendAndConfirm(signedTxns);

      return confirmedTxns;
    } catch (error) {
      throw error;
    }
  };
}

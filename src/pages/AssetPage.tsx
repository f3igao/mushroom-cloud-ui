import { serverTimestamp } from '@firebase/firestore';
import WalletConnect from '@walletconnect/client';
import { LogicSigAccount } from 'algosdk';
import React from 'react';
import { useParams } from 'react-router';
import algo_light from '../assets/algo_light.svg';
import BuyButton from '../components/BuyButton';
import SellForm from '../components/SellForm';
import ChainService from '../services/ChainService';
import ContractService from '../services/ContractService';
import FirebaseService from '../services/FirebaseService';
import TransactionService from '../services/TransactionService';
import {
  FirebaseCollections,
  FirebaseFields,
  IPFS,
  IPFS_DOMAIN,
  SAssetInfo,
  SButton,
  SIcon,
  SImage,
  Status,
} from '../utils';

interface AssetPageProps {
  connector: WalletConnect;
  address: string;
  assetIndex: number;
}

interface AssetPageState {
  fetching: boolean;
  contract: any;
  price: number;
  owner: string;
  assetInfo: any;
  imageSrc: string;
  description: string;
  status: Status | null;
}

const INITIAL_STATE: AssetPageState = {
  fetching: false,
  contract: null,
  price: -1,
  owner: '',
  assetInfo: null,
  imageSrc: '',
  description: '',
  status: null,
};

class AssetPage extends React.Component<AssetPageProps, AssetPageState> {
  constructor(props: AssetPageProps) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  firebaseService = new FirebaseService();
  contractService = new ContractService();
  transactionService = new TransactionService();
  chainService = new ChainService();

  componentDidMount() {
    this.firebaseService.setup({ account: this.props.address });
    this.setAsset(this.props.assetIndex);
    console.log('mainnet:', this.chainService.isMainNet);
  }

  setAsset = async (index: number) => {
    this.setState({ fetching: true });
    this.chainService.indexer
      .lookupAssetByID(index)
      .do()
      .then((response) => {
        const assetInfo = response.asset.params;
        this.setState({ assetInfo, fetching: false });
        this.getAssetMetadata(assetInfo.url);
      })
      .catch((error: Error) => {
        console.error(error);
      });
    this.chainService.indexer
      .lookupAssetBalances(index)
      .do()
      .then((response) => {
        const ownerInfo = response.balances.find((item: any) => item.amount);
        this.setState({ owner: ownerInfo.address });
      });
    this.firebaseService.getContractForAsset(index).then((response) => {
      this.setState({
        contract: response,
        price: response?.data()[FirebaseFields.Price],
        status: response?.data()[FirebaseFields.Status],
      });
    });
  };

  sellAsset = async (price: number) => {
    const { address: seller, assetIndex } = this.props;

    if (seller && price) {
      this.setState({ fetching: true });
      try {
        const contract = await this.contractService.generateAssetSaleContract(
          seller,
          assetIndex,
          price
        );
        const contractResult = contract.result;
        const response = await this.firebaseService.addDocument(
          FirebaseCollections.AssetSaleContracts,
          {
            seller,
            asset_index: assetIndex,
            price,
            contract_result: contractResult,
            status: Status.Pending,
            is_main: this.chainService.isMainNet,
            created_on: serverTimestamp(),
          }
        );
        // confirm transaction
        await this.transactionService.sellAsset({
          seller,
          assetIndex,
          contractResult,
        });
        this.firebaseService.updateDocument(
          FirebaseCollections.AssetSaleContracts,
          response.id,
          {
            status: Status.Active,
            updated_on: serverTimestamp(),
          }
        );
        this.setState({ contract: response, status: Status.Active, price });
      } catch (error) {
        throw error;
      }
      this.setState({ fetching: false });
    }
  };

  buyAsset = async () => {
    if (!this.props.address) {
      this.props.connector.createSession();
      return;
    }
    const contractResult =
      this.state.contract.data()[FirebaseFields.ContractResult];
    const contract = new Uint8Array(Buffer.from(contractResult, 'base64'));
    const contractSig = new LogicSigAccount(contract);
    const buyer = this.props.address;
    const seller = this.state.contract.data()[FirebaseFields.Seller];
    const assetIndex = this.props.assetIndex;
    const price = this.state.contract.data()[FirebaseFields.Price];

    if (buyer && seller && contractSig && assetIndex && price) {
      this.setState({ fetching: true });
      try {
        // confirm transaction
        await this.transactionService.buyAsset({
          buyer,
          seller,
          assetIndex,
          price,
          contractSig,
        });
        this.firebaseService.updateDocument(
          FirebaseCollections.AssetSaleContracts,
          this.state.contract.id,
          {
            status: Status.Complete,
            updated: serverTimestamp(),
            buyer,
          }
        );
        this.setState({ status: Status.Complete, contract: null });
      } catch (error) {
        throw error;
      }
      this.setState({ fetching: false });
    }
  };

  getAssetMetadata = async (url: any) => {
    const ipfsUrl = url.replace(IPFS, IPFS_DOMAIN);
    const data = await this.contractService.getAssetMetadataFromIpfs(ipfsUrl);
    // const imageSrc = data.properties.source_image.replace(IPFS, IPFS_DOMAIN);
    const imageSrc = data.image.replace(IPFS, IPFS_DOMAIN);
    this.setState({ description: data.description, imageSrc });
  };

  render() {
    const assetInfo = this.state.assetInfo;
    const renderButtons = () => {
      const isCreator = assetInfo?.creator === this.props.address;
      const hasContract = this.state.contract;
      const isSold = this.state.status === Status.Complete;
      if (isSold) {
        return (
          <SButton disabled className='w-100'>
            <div className='flex justify-center'>
              <span className='white'>Sold for {this.state.price}</span>
              <SIcon src={algo_light} alt='algos' />
            </div>
          </SButton>
        );
      } else if (isCreator) {
        return hasContract ? (
          <SButton disabled className='w-100'>
            <div className='flex justify-center'>
              <span className='white'>On Sale for {this.state.price}</span>
              <SIcon src={algo_light} alt='algos' />
            </div>
          </SButton>
        ) : (
          <SellForm sellAsset={this.sellAsset} />
        );
      } else {
        return hasContract ? (
          <BuyButton
            price={this.state.price}
            buyAsset={this.buyAsset}
          ></BuyButton>
        ) : (
          <SButton disabled className='w-100'>
            Not on Sale
          </SButton>
        );
      }
    };

    return (
      assetInfo && (
        <div className='pv5-ns ph6-ns pt4'>
          <p className='f3 b'>{assetInfo.name}</p>
          <div className='flex flex-row-ns flex-column justify-between'>
            <div className='w-40-ns'>
              <SImage src={this.state.imageSrc} alt='nft' />
              <div className='mt3'>{renderButtons()}</div>
            </div>
            <div className='w-50-ns mt0-ns mt4'>
              <SAssetInfo>
                <span className='b mb2 f6 light-red'>owner</span>
                <span>{this.state.owner}</span>
              </SAssetInfo>
              {this.state.description && (
                <SAssetInfo>
                  <span className='b mb2 f6 light-red'>description</span>
                  <span>{this.state.description}</span>
                </SAssetInfo>
              )}
              <SAssetInfo>
                <span className='b mb2 f6 light-red'>url</span>
                <span>{assetInfo.url}</span>
              </SAssetInfo>
              <SAssetInfo>
                <span className='b mb2 f6 light-red'>creator</span>
                <span>{assetInfo.creator}</span>
              </SAssetInfo>
            </div>
          </div>
        </div>
      )
    );
  }
}

function AssetPageWithParams(props: any) {
  const params = useParams();
  return <AssetPage {...props} assetIndex={Number(params.index)} />;
}

export default AssetPageWithParams;

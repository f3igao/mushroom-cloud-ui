import algosdk from 'algosdk';
import {
  ALGOD_HOST_MAIN,
  ALGOD_HOST_TEST,
  INDEXER_HOST_MAIN,
  INDEXER_HOST_TEST, NodeEnv
} from '../utils';

export default class ChainService {
  isMainNet = process.env.NODE_ENV === NodeEnv.Production;
  algodHost = this.isMainNet ? ALGOD_HOST_MAIN : ALGOD_HOST_TEST;
  algod = new algosdk.Algodv2('', this.algodHost, '');
  indexerHost = this.isMainNet ? INDEXER_HOST_MAIN : INDEXER_HOST_TEST;
  indexer = new algosdk.Indexer('', this.indexerHost, '');
}

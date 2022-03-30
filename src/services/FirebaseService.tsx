import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where
} from 'firebase/firestore';
import { FirebaseCollections, FirebaseFields, Status } from '../utils';
import ChainService from './ChainService';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_ID + 'firebaseapp.com',
  projectId: process.env.REACT_APP_FIREBASE_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_ID + 'appspot.com',
  messagingSenderId: '138191449972',
  appId: '1:138191449972:web:e9ab144c0b4bc016cb0621',
};

export default class FirebaseService {
  currentAccountData = {};
  chainService = new ChainService();

  setup = async ({ account }: any) => {
    initializeApp(firebaseConfig);
    getAnalytics();
    if (account) {
      const currentAccount = await this.getDocument('accounts', account);
      this.currentAccountData = currentAccount.exists()
        ? currentAccount.data()
        : {};
    } else {
      this.currentAccountData = {};
    }
  };

  addDocument = async (collectionName: string, data: any) => {
    const firestore = getFirestore();
    const ref = collection(firestore, collectionName);
    const response = await addDoc(ref, data);
    return await getDoc(response);
  };

  getDocument = async (collectionName: string, docIndex: string) => {
    const firestore = getFirestore();
    const ref = doc(firestore, collectionName, docIndex);
    return await getDoc(ref);
  };

  updateDocument = async (
    collectionName: string,
    docIndex: string,
    data: any
  ) => {
    const firestore = getFirestore();
    const ref = doc(firestore, collectionName, docIndex);
    await updateDoc(ref, data);
  };

  deleteDocument = async (collectionName: string, docIndex: string) => {
    const firestore = getFirestore();
    const ref = doc(firestore, collectionName, docIndex);
    return await deleteDoc(ref);
  };

  getContractForAsset = async (index: number) => {
    const firestore = getFirestore();
    const ref = collection(firestore, FirebaseCollections.AssetSaleContracts);
    const contracts = query(
      ref,
      where(FirebaseFields.AssetIndex, '==', index),
      where(FirebaseFields.Status, '==', Status.Active)
    );
    const snapshot = await getDocs(contracts);
    if (snapshot.docs.length > 0 && snapshot.docs[0].exists()) {
      return snapshot.docs[0];
    } else {
      return null;
    }
  };

  getContractsForSeller = async (address: string) => {
    const firestore = getFirestore();
    const ref = collection(firestore, FirebaseCollections.AssetSaleContracts);
    const filter = query(
      ref,
      where(FirebaseFields.Seller, '==', address),
      where(FirebaseFields.Status, '==', Status.Active),
      where(FirebaseFields.IsMain, '==', this.chainService.isMainNet)
    );
    const snapshot = await getDocs(filter);
    return snapshot.docs;
  };
}

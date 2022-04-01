import WalletConnect from '@walletconnect/client';
import { IInternalEvent } from '@walletconnect/types';
import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import AssetPage from './pages/AssetPage';
import HomePage from './pages/HomePage';
import ChainService from './services/ChainService';
import FirebaseService from './services/FirebaseService';
import WalletService from './services/WalletService';

interface AppProps {}

interface AppState {
  connector: WalletConnect;
  firebaseService: FirebaseService;
  chainService: ChainService;
  address: string;
  connected: boolean;
  accounts: string[];
  fetching: boolean;
}

const INITIAL_STATE: AppState = {
  connector: new WalletService().connector,
  firebaseService: new FirebaseService(),
  chainService: new ChainService(),
  address: '',
  connected: false,
  accounts: [],
  fetching: false,
};

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    const { connected, accounts } = INITIAL_STATE.connector;
    this.state = {
      ...INITIAL_STATE,
      connected,
      accounts,
      address: accounts[0],
    };
    this.subscribeToWalletEvents();
    this.setupFirebase();
    console.log('on mainnet:', this.state.chainService.isMainNet);
  }

  setupFirebase = async () => {
    await this.state.firebaseService.setup({ account: this.state.address });
  };

  subscribeToWalletEvents = async () => {
    const connector = this.state.connector;
    if (!connector) return;
    connector.on('connect', (error: Error | null, payload: any) => {
      window.location.reload();
      console.log(`connector.on('connect')`);
      if (error) throw error;
      this.onConnect(payload);
    });
    connector.on(
      'session_update',
      async (error: Error | null, payload: any) => {
        console.log(`connector.on('session_update')`);
        if (error) throw error;
        const accounts = payload.params[0].accounts;
        this.onSessionUpdate(accounts);
      }
    );
    connector.on('disconnect', (error: Error | null, payload: any) => {
      console.log(`connector.on('disconnect')`);
      if (error) throw error;
      this.onDisconnect();
    });
    if (connector.connected) {
      const { accounts } = connector;
      this.setState({
        connected: true,
        accounts,
        address: accounts[0],
      });
      this.onSessionUpdate(accounts);
    }
    this.setState({ connector });
  };

  onConnect = (payload: IInternalEvent) => {
    const { accounts } = payload.params[0];
    this.setState({
      connected: true,
      accounts,
      address: accounts[0],
    });
  };

  onSessionUpdate = (accounts: string[]) => {
    this.setState({ accounts, address: accounts[0] });
    // this.getAccountAssets();
  };

  onDisconnect = () => {
    this.setState({ ...INITIAL_STATE });
  };

  // getAccountAssets = async () => {
  //   const { address, chain } = this.state;
  //   this.setState({ fetching: true });
  //   try {
  //     // get account balances
  //     const assets = await apiGetAccountAssets(chain, address);
  //     this.setState({ assets });
  //   } catch (error) {
  //     this.setState({ fetching: false });
  //     throw error;
  //   }
  //   this.setState({ fetching: false });
  // };

  killSession = () => {
    const { connector } = this.state;
    if (connector) connector.killSession();
    this.setState({ ...INITIAL_STATE });
  };

  render() {
    const { connector, firebaseService, chainService, address } = this.state;
    return (
      <div className='code'>
        <Header
          address={address}
          connector={connector}
          killSession={this.killSession}
        ></Header>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route
              path='/asset/:index'
              element={
                <AssetPage
                  chainService={chainService}
                  firebaseService={firebaseService}
                  address={address}
                  connector={connector}
                />
              }
            />
            <Route path='*' element={<Navigate to='/' replace />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

import WalletConnect from '@walletconnect/client';
import { IInternalEvent } from '@walletconnect/types';
import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import AssetPage from './pages/AssetPage';
import HomePage from './pages/HomePage';
import WalletService from './services/WalletService';

interface AppProps {}

interface AppState {
  connector: WalletConnect;
  fetching: boolean;
  connected: boolean;
  accounts: string[];
  address: string;
}

const INITIAL_STATE: AppState = {
  connector: new WalletService().connector,
  fetching: false,
  connected: false,
  accounts: [],
  address: '',
};

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    const { connector } = INITIAL_STATE;
    const { connected, accounts } = connector;
    this.state = {
      ...INITIAL_STATE,
      connected,
      accounts,
      address: accounts[0],
    };
  }

  componentDidMount() {
    this.subscribeToWalletEvents();
  }

  subscribeToWalletEvents = () => {
    const connector = this.state.connector;
    if (!connector) return;
    connector.on('connect', (error: Error | null, payload: any) => {
      console.log(`connector.on("connect")`);
      if (error) throw error;
      this.onConnect(payload);
    });
    connector.on(
      'session_update',
      async (error: Error | null, payload: any) => {
        console.log(`connector.on("session_update")`);
        if (error) throw error;
        const accounts = payload.params[0].accounts;
        this.onSessionUpdate(accounts);
      }
    );
    connector.on('disconnect', (error: Error | null, payload: any) => {
      console.log(`connector.on("disconnect")`);
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
  //     this.setState({ fetching: false, address, assets });
  //   } catch (error) {
  //     console.error(error);
  //     this.setState({ fetching: false });
  //   }
  // };

  killSession = () => {
    const { connector } = this.state;
    if (connector) connector.killSession();
    this.setState({ ...INITIAL_STATE });
  };

  render() {
    return (
      <div className="code">
        <Header
          address={this.state.address}
          connector={this.state.connector}
          killSession={this.killSession}
        ></Header>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route
              path='/asset/:index'
              element={
                <AssetPage
                  address={this.state.address}
                  connector={this.state.connector}
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

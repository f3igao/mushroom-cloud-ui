import WalletConnect from '@walletconnect/client';
import { FunctionComponent } from 'react';
import styled from 'styled-components';
import logo from '../../src/logo.svg';
import { ellipseAddress } from '../utils';
import { SButton } from '../utils';

interface HeaderProps {
  address: string;
  connector: WalletConnect;
  killSession: () => void;
}

const SAddress = styled.span`
  color: aqua;
`;

const Header: FunctionComponent<HeaderProps> = ({
  address,
  connector,
  killSession,
}: HeaderProps) => {
  const connectWallet = async () => connector.createSession();

  return (
    <div className='flex items-center justify-between sans-serif'>
      <div className='flex items-center w-50'>
        <img src={logo} className='app-logo mr2' alt='logo' />
        <span className='f4'>Mushroom Cloud NFT</span>
      </div>
      {address ? (
        <div className='flex flex-column tr'>
          <SAddress>{ellipseAddress(address)}</SAddress>
          <span className='pointer-fade f6' onClick={killSession}>
            Disconnect
          </span>
        </div>
      ) : (
        <SButton className='pointer-fade' onClick={connectWallet}>
          Connect Wallet
        </SButton>
      )}
    </div>
  );
};

export default Header;

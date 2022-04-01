import { FunctionComponent } from 'react';
import algo_dark from '../assets/algo_dark.svg';
import { formatMoney, SButton, SIcon } from '../utils';

interface BuyButtonProps {
  address: string;
  price: number;
  buyAsset: () => {};
}

const BuyButton: FunctionComponent<BuyButtonProps> = ({
  address,
  price,
  buyAsset,
}) => {
  return (
    <SButton className='w-100' onClick={buyAsset} disabled={!address}>
      {address ? (
        <div className='flex justify-center'>
          {formatMoney(price)}
          <SIcon src={algo_dark} alt='algos' />
        </div>
      ) : (
        <span>Connect Wallet to Purchase</span>
      )}
    </SButton>
  );
};

export default BuyButton;

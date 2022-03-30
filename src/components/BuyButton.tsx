import { FunctionComponent } from 'react';
import algo_dark from '../assets/algo_dark.svg';
import { SIcon, SButton } from '../utils';

interface BuyButtonProps {
  price: number;
  buyAsset: () => {};
}

const BuyButton: FunctionComponent<BuyButtonProps> = ({ price, buyAsset }) => {
  return (
    <SButton className='pointer-fade w-100' onClick={buyAsset}>
      <div className='flex justify-center'>
        {price}
        <SIcon src={algo_dark} alt='algos' />
      </div>
    </SButton>
  );
};

export default BuyButton;
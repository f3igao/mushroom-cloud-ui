import React, { ChangeEvent } from 'react';
import { SButton } from '../utils';

interface SellFormProps {
  sellAsset: (price: number) => {};
}

interface SellFormState {
  price: number;
}

const DEFAULT_PRICE = -1;

class SellForm extends React.Component<SellFormProps, SellFormState> {
  state = { price: DEFAULT_PRICE };

  onSellAsset = () => this.props.sellAsset(this.state.price);

  onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const price: number = parseInt(event.target.value) ?? DEFAULT_PRICE;
    this.setState({ price });
  };
  render() {
    return (
      <div className='mv3 w-100 flex items-center justify-between'>
        <input
          className='pa2 ba br2 w-60'
          type='number'
          min='1'
          step='1'
          name='price'
          onChange={this.onInputChange}
          required
          placeholder='Price in Algo'
        />
        <SButton className='w-third pointer' onClick={this.onSellAsset}>
          Put on Sale
        </SButton>
      </div>
    );
  }
}

export default SellForm;

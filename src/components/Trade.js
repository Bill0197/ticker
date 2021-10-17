import React from 'react';
import {Form, FormGroup, Input, Button, Alert} from 'reactstrap';
import {LegendLabel, LegendWrapper, ValidatedRadioInput} from './TradeFormComponents';
import ViewHeader from '../components/ViewHeader';

const Trade = ({props, state, storeTransaction, onChangeQuantity, chooseBuy, chooseSell}) => {
  let {currentTicker, currentPrice, cash} = props;
  let {quantity, canBuy, canSell, alert, okToStoreTransaction} = state;
  return (
    <div className="Trade">
    {alert.send ? <Alert color={alert.color}>{alert.message}</Alert> : <div></div>}
    <ViewHeader heading={'Trade'} />
    <Form onSubmit={storeTransaction}>  
      <p>Choose a symbol to trade from the Stocks Panel</p>
      <LegendLabel
        legendTxt={'Cash On Hand: '} 
        labelTxt={`$${cash}`}
      />
      <LegendLabel
        legendTxt={'Symbol: '} 
        labelTxt={currentTicker && `${currentTicker} @ $${currentPrice}`}
      />
      <LegendWrapper legendTxt={'Quantity: '} >
        <Input onChange={onChangeQuantity} type="text" name="quantity" id="quantity" value={quantity} pattern="[0-9]*"  />
      </LegendWrapper>
      <FormGroup tag="fieldset" >
        <LegendWrapper legendTxt={'Buy/Sell'} >
          <ValidatedRadioInput 
            labelText={"Buy"}
            name={'buy-sell'}
            formGroupCheck={false}
            validation={quantity <= canBuy}
            valueIfPass={canBuy}
            errorTextIfFail={`You'll need more cash to buy this quantity on this date. Sell other shares from your portfolio to get cash.`}
            onChange={chooseBuy}
          />
          <ValidatedRadioInput 
            labelText={"Sell"}
            name={'buy-sell'}
            formGroupCheck={false}
            validation={quantity <= canSell}
            valueIfPass={canSell}
            errorTextIfFail={`You have no shares of this stock to sell on this date. Buy some at an earlier date.`}
            onChange={chooseSell}
          />
        </LegendWrapper>
      </FormGroup>
      {okToStoreTransaction && <Button className="mb-3" type="submit" color="success">Place Order</Button>}
    </Form>  
  </div>
  );
};

export default Trade;
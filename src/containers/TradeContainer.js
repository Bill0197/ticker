import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setCurrentTicker } from '../actions/TradeActions';
import { storeTransactionToPortfolio } from '../actions/PortfolioActions';
import Trade from '../components/Trade';
const moment = require('moment');

const mapStateToProps = (state) => {
  return {
    date: state.date.current,
    currentTicker: state.trades.currentTicker,
    currentPrice: state.trades.currentPrice,
    cash: state.portfolio.cash,
    history: state.portfolio.history,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentTicker: (ticker) => {
      dispatch(setCurrentTicker(ticker));
    },
    storeTransactionToPortfolio: (transaction) => {
      dispatch(storeTransactionToPortfolio(transaction));
    },
  };
};

const TradeContainer = (props) => {
  const [state, setState] = useState({
    canBuy: 0,
    canSell: 0,
    quantity: 10,
    buyOrSell: null,
    okToStoreTransaction: true,
    alert: {
      send: false,
      message: '',
      color: '',
    },
  });

  useEffect(() => {
    checkCanBuyOrSell();

    checkTransaction();
  }, [state.currentPrice, state.canBuy]);

  const storeTransaction = (e) => {
    let { quantity, buyOrSell } = state;
    let { date, currentTicker, currentPrice, cash } = props;
    e.preventDefault();

    props.storeTransactionToPortfolio({
      cash: cash - quantity * currentPrice,
      transaction: {
        ticker: currentTicker,
        date: date,
        price: currentPrice,
        quantity: buyOrSell === 'buy' ? quantity : -1 * quantity,
      },
    });

    setState(
      {
        alert: {
          send: true,
          message: 'Transaction successful!',
          color: 'success',
        },
      },
      () => {
        setTimeout(() => {
          setState({ alert: { send: false } });
        }, 3000);
      }
    );
  };

  const onChangeQuantity = (e) => {
    if (!isNaN(e.target.value)) {
      setState({ quantity: +e.target.value }, checkTransaction);
    }
  };

  const chooseBuy = () => {
    setState({ buyOrSell: 'buy' }, checkTransaction);
  };

  const chooseSell = () => {
    setState({ buyOrSell: 'sell' }, checkTransaction);
  };

  const checkCanBuyOrSell = () => {
    let { date, currentTicker, currentPrice, cash, history } = props;
    let canBuy = 0;
    let canSell = 0;

    if (currentPrice) {
      canBuy = Math.floor(cash / currentPrice);
    }

    const sumOfHoldings = (holdings, transaction) =>
      (holdings += transaction.quantity);

    if (currentTicker && history[currentTicker]) {
      let holdingsAllOfHistory = history[currentTicker].reduce(
        sumOfHoldings,
        0
      );
      let holdingsUpToCurrentDate = history[currentTicker]
        .filter((transaction) => moment(date).isSameOrAfter(transaction.date))
        .reduce(sumOfHoldings, 0);
      canSell =
        holdingsAllOfHistory > holdingsUpToCurrentDate
          ? holdingsAllOfHistory
          : holdingsUpToCurrentDate;
    }
  };

  const checkTransaction = () => {
    let { quantity, canBuy, canSell, buyOrSell } = state;
    let okToStoreTransaction = false;
    let alert = {
      send: false,
      message: '',
      color: 'danger',
    };

    switch (buyOrSell) {
      case 'buy': {
        if (quantity > canBuy) {
          alert.send = true;
          alert.message =
            'You need to get more cash to buy this stock on this date.';
          okToStoreTransaction = false;
        } else {
          okToStoreTransaction = true;
          alert.send = false;
        }
        break;
      }
      case 'sell': {
        if (quantity > canSell) {
          alert.send = true;
          alert.message =
            'You have to own this stock on this date before you can buy it.';
          okToStoreTransaction = false;
        } else {
          okToStoreTransaction = true;
          alert.send = false;
        }
        break;
      }
      default: {
        okToStoreTransaction = false;
        alert.send = false;
        buyOrSell = null;
        break;
      }
    }
  };

  return (
    <Trade
      props={props}
      state={state}
      storeTransaction={storeTransaction}
      onChangeQuantity={onChangeQuantity}
      chooseBuy={chooseBuy}
      chooseSell={chooseSell}
    />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TradeContainer);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import StocksTable from '../components/StocksTable';
import { getStocks } from '../actions/StocksActions';
import { setCurrentTicker } from '../actions/TradeActions';
import { stocksDefaults, createDatesList } from '../helpers/helpers';

const Filter = () => {
  return null;
};

const mapStateToProps = (state) => {
  return {
    stocks: state.stocks,
    date: state.date,
    currentTicker: state.trades.currentTicker,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getStocks: (selectedStocks, selectedDates, currentDate, currentTicker) => {
      dispatch(
        getStocks(selectedStocks, selectedDates, currentDate, currentTicker)
      );
    },
    setCurrentTicker: (e, currentTicker, currentPrice) => {
      dispatch(setCurrentTicker({ currentTicker, currentPrice }));
    },
  };
};

class StocksTableContainer extends Component {
  componentDidMount() {
    let {
      currentTicker,
      getStocks,
      date: { current },
    } = this.props;

    getStocks(stocksDefaults, createDatesList(current), current, currentTicker);
  }

  componentWillReceiveProps(nextProps) {
    let {
      currentTicker,
      getStocks,
      date: { current },
    } = nextProps;
    if (this.props.date.current !== nextProps.date.current) {
      getStocks(
        stocksDefaults,
        createDatesList(current),
        current,
        currentTicker
      );
    }
  }

  render() {
    const {
      setCurrentTicker,
      stocks,
      date: { current },
    } = this.props;
    return (
      <div>
        <Filter />
        <StocksTable
          stocks={stocks}
          dates={createDatesList(current)}
          setCurrentTicker={setCurrentTicker}
          currentDate={current}
        />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StocksTableContainer);

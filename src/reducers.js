import { combineReducers } from 'redux';
import * as StocksActions from './actions/StocksActions';
import * as DateActions from './actions/DateActions';
import * as TradeActions from './actions/TradeActions';
import * as PortfolioActions from './actions/PortfolioActions';
import { DEFAULT_LATEST_DATE, INITIAL_CASH_ON_HAND } from './helpers/helpers';

const initialState = {
  date: {
    isChanging: false,
    current: DEFAULT_LATEST_DATE,
  },
  stocks: {
    isFetching: false,
    data: [],
    error: null,
  },
  trades: {
    currentTicker: null,
    currentPrice: 0,
  },
  portfolio: {
    cash: INITIAL_CASH_ON_HAND,
    history: {
      GOOG: [
        {
          date: '2017-02-07',
          price: 806.97,
          quantity: 100,
          ticker: 'GOOG',
        },
      ],
    },
  },
};

const date = (state = initialState.date, action) => {
  switch (action.type) {
    case DateActions.SET_SELECTED_DATE: {
      return Object.assign({}, ...state, {
        isChanging: false,
        current: action.data,
      });
    }
    case DateActions.NOW_SELECTING_DATE: {
      return Object.assign({}, ...state, {
        isChanging: true,
        current: action.data,
      });
    }
    default:
      return state;
  }
};

const stocks = (state = initialState.stocks, action) => {
  switch (action.type) {
    case StocksActions.GET_STOCKS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        data: state.data,
        error: state.error,
      });

    case StocksActions.GET_STOCKS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.data,
        error: state.error,
      });

    case StocksActions.GET_STOCKS_FAILURE:
      return Object.assign({}, state, {
        isFetching: true,
        data: state.data,
        error: action.error,
      });

    default:
      return state;
  }
};

const trades = (state = initialState.trades, action) => {
  switch (action.type) {
    case TradeActions.SET_CURRENT_TICKER:
      return {
        ...state,
        currentTicker: action.data.currentTicker,
        currentPrice: action.data.currentPrice,
      };

    case TradeActions.UPDATE_CURRENT_TICKER:
      let { stockData, currentDate, currentTicker } = action.data;
      return {
        ...state,
        currentPrice: stockData.filter(
          (stock) => stock.ticker === currentTicker
        )[0].eodPriceByDay[currentDate],
      };

    default:
      return state;
  }
};

const portfolio = (state = initialState.portfolio, action) => {
  switch (action.type) {
    case PortfolioActions.STORE_TRANSACTION_TO_PORTFOLIO: {
      const { history } = state;
      const { cash, transaction } = action.data;
      const previousTransactions = history[transaction.ticker] || [];
      return {
        cash: cash,
        history: {
          ...history,
          [transaction.ticker]: [
            ...previousTransactions,
            {
              date: transaction.date,
              price: transaction.price,
              quantity: transaction.quantity,
              ticker: transaction.ticker,
            },
          ],
        },
      };
    }
    default:
      return state;
  }
};

const stocksApp = combineReducers({ date, stocks, trades, portfolio });

export default stocksApp;

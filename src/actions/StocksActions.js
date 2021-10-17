/* global fetch */
import getDataPromise from '../temp-data/tempDataWrapper';
import { updateCurrentTicker } from './TradeActions';
const {
  stocksDefaults,
  createDatesList,
  DEFAULT_LATEST_DATE,
} = require('../helpers/helpers');
export const GET_STOCKS_REQUEST = 'GET_STOCKS_REQUEST';
export const GET_STOCKS_FAILURE = 'GET_STOCKS_FAILURE';
export const GET_STOCKS_SUCCESS = 'GET_STOCKS_SUCCESS';

export const getStocksRequest = () => {
  return {
    type: GET_STOCKS_REQUEST,
  };
};
export const getStocksSuccess = (data) => {
  return {
    type: GET_STOCKS_SUCCESS,
    data: data,
  };
};
export const getStocksFailure = (error) => {
  return {
    type: GET_STOCKS_FAILURE,
    error: error,
  };
};
export const getStocks = (
  stocks = stocksDefaults,
  dates = createDatesList(DEFAULT_LATEST_DATE),
  currentDate,
  currentTicker
) => {
  return (dispatch) => {
    dispatch(getStocksRequest());

    getDataPromise(stocks, dates)
      .then((data) => {
        dispatch(getStocksSuccess(data));
        return data;
      })
      .then((stockData) => {
        if (currentTicker) {
          dispatch(
            updateCurrentTicker({ stockData, currentDate, currentTicker })
          );
        }
        return stockData;
      })
      .catch((error) => {
        dispatch(getStocksFailure(error));
      });
  };
};

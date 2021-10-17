import { datatable } from './raw-data';

const stocksDataArray = datatable.data;

const stocksObj = stocksDataArray.reduce((stocksObj, [ticker, date, price]) => {
  stocksObj[ticker] = stocksObj[ticker]
    ? stocksObj[ticker]
    : { ticker, eodPriceByDay: {} };

  stocksObj[ticker].eodPriceByDay[date] = price;

  return stocksObj;
}, {});

const moment = require('moment');

export const navs = {
  Trade: '/trade',
  Transactions: '/transactions',
  Portfolio: '/portfolio',
};

export const INITIAL_CASH_ON_HAND = 100000;
export const DEFAULT_LATEST_DATE = '2021-02-19';
export const DEFAULT_EARLIEST_DATE = '2021-01-02';
export const DEFAULT_DATE_INTERVAL = [0, 7, 14, 28];

export const createDatesList = (latestDate) => {
  return DEFAULT_DATE_INTERVAL.map((interval) => {
    return moment(latestDate).subtract(interval, 'days').format('YYYY-MM-DD');
  });
};

export const datesDefaults = createDatesList(DEFAULT_LATEST_DATE);
export const isWeekDay = (momentObj) => momentObj.isoWeekday() < 6;
export const createWeekdayArray = (earliestDate, latestDate) => {
  let i = 0;
  let weekdayArray = [];
  while (moment(earliestDate).add(i, 'days').isSameOrBefore(latestDate)) {
    if (isWeekDay(moment(earliestDate).add(i, 'days'))) {
      weekdayArray.push(
        moment(earliestDate).add(i, 'days').format('YYYY-MM-DD')
      );
    }
    i++;
  }
  return weekdayArray;
};

export const dateSliderArray = createWeekdayArray(
  DEFAULT_EARLIEST_DATE,
  DEFAULT_LATEST_DATE
);

export const stocksDefaults = [
  'AAPL',
  'AMZN',
  'DIS',
  'GOOG',
  'MSFT',
  'NFLX',
  'NKE',
  'NVDA',
  'QCOM',
  'TSLA',
];

export const getCurrentPriceForTicker = (stockData, ticker, currentDate) => {
  return stockData.filter((stock) => stock.ticker === ticker)[0].eodPriceByDay[
    currentDate
  ];
};

const stocksObj = require('./stocksObject');

const getData = (stocks, dates) => {
  return stocks.map((ticker) => {
    const eodPriceByDay = dates.reduce((prices, date) => {
      prices[date] = stocksObj[ticker].eodPriceByDay[date];
      return prices;
    }, {});
    return { ticker, eodPriceByDay };
  });
};

const getDataPromise = (stocks, dates) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, 1000, getData(stocks, dates));
  });
};

export default getDataPromise;

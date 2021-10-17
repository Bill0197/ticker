import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'reactstrap';
import ColumnHeadings from '../components/ColumnHeadings';
import ViewHeader from '../components/ViewHeader';
import { getCurrentPriceForTicker } from '../helpers/helpers';

const mapStateToProps = (state) => {
  return {
    cash: state.portfolio.cash,
    history: state.portfolio.history,
    stockData: state.stocks.data,
    currentDate: state.date.current,
  };
};
const mapDispatchToProps = () => {
  return {};
};

const PortfolioContainer = (props) => {
  const getSummaryOfHoldings = () => {
    const { history, stockData, currentDate } = props;
    return Object.keys(history).reduce((summaryOfHoldings, ticker) => {
      const currentPriceForTicker = getCurrentPriceForTicker(
        stockData,
        ticker,
        currentDate
      );

      summaryOfHoldings[ticker] = {
        currentPrice: currentPriceForTicker,
        quantity: history[ticker].reduce((quantity, transaction) => {
          return (quantity += transaction.quantity);
        }, 0),
        profitOrLoss: history[ticker].reduce((profitOrLoss, transaction) => {
          const { price, quantity } = transaction;
          return (profitOrLoss +=
            currentPriceForTicker * quantity - price * quantity);
        }, 0),
      };
      return summaryOfHoldings;
    }, {});
  };

  const calculateValueOfStocks = (summaryOfHoldings) => {
    return Object.keys(summaryOfHoldings).reduce((valueOfStocks, ticker) => {
      const { currentPrice, quantity } = summaryOfHoldings[ticker];
      return (valueOfStocks += currentPrice * quantity);
    }, 0);
  };

  const calculateProfitLoss = (summaryOfHoldings) => {
    return Object.keys(summaryOfHoldings).reduce((profitOrLoss, ticker) => {
      return (profitOrLoss += summaryOfHoldings[ticker].profitOrLoss);
    }, 0);
  };

  const { cash } = props;
  const summaryOfHoldings = getSummaryOfHoldings();
  const valueOfStocks = calculateValueOfStocks(summaryOfHoldings);
  const profitOrLoss = calculateProfitLoss(summaryOfHoldings);
  const portfolioMap = Object.keys(summaryOfHoldings).map((ticker) => {
    const thisHolding = summaryOfHoldings[ticker];

    return (
      <tr key={ticker}>
        <td>{ticker}</td>
        <td>{thisHolding.quantity}</td>
        <td>{thisHolding.currentPrice}</td>
        <td>{thisHolding.currentPrice * thisHolding.quantity}</td>
        <td>{thisHolding.profitOrLoss}</td>
      </tr>
    );
  });

  return (
    <div>
      <ViewHeader heading={'Portfolio'} />
      <Table size='sm'>
        <thead>
          <tr>
            <ColumnHeadings
              headings={['Cash On Hand', 'Value of Stocks', 'Profit/Loss']}
            />
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{cash}</td>
            <td>{valueOfStocks}</td>
            <td>{profitOrLoss}</td>
          </tr>
        </tbody>
      </Table>
      <Table>
        <thead>
          <tr>
            <ColumnHeadings
              headings={[
                'Symbol',
                'Quantity',
                'Current Price',
                'Current Value',
                'Profit/Loss',
              ]}
            />
          </tr>
        </thead>
        <tbody>{portfolioMap}</tbody>
      </Table>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioContainer);

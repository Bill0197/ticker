import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'reactstrap';
import ColumnHeadings from '../components/ColumnHeadings';
import ViewHeader from '../components/ViewHeader';
const moment = require('moment');

const mapStateToProps = (state) => {
  return {
    history: state.portfolio.history,
  };
};

const mapDispatchToProps = () => {
  return {};
};

const TransactionsContainer = (props) => {
  const { history } = props;

  let transactionsMap = Object.keys(history)
    .reduce((transactions, ticker) => {
      return [...transactions, ...history[ticker]];
    }, [])
    .sort((transactionA, transactionB) => {
      return moment(transactionA.date).isBefore(transactionB.date);
    })
    .map((transaction) => {
      return (
        <tr
          key={`${transaction.ticker}${transaction.quantity}${transaction.date}`}
        >
          <td>{transaction.date}</td>
          <td>{transaction.ticker}</td>
          <td>{transaction.quantity > 0 ? 'Buy' : 'Sell'}</td>
          <td>{transaction.quantity}</td>
          <td>{transaction.price}</td>
        </tr>
      );
    });
  return (
    <div>
      <ViewHeader heading={'Transactions'} />

      <Table>
        <thead>
          <tr>
            <ColumnHeadings
              headings={['Date', 'Symbol', 'Type', 'Quantity', 'Price']}
            />
          </tr>
        </thead>
        <tbody>{transactionsMap}</tbody>
      </Table>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionsContainer);

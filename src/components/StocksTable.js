import React from 'react';
import { Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import ColumnHeadings from './ColumnHeadings';
import ViewHeader from './ViewHeader';
import moment from 'moment';

const StocksTable = ({ stocks, dates, setCurrentTicker, currentDate }) => {
  const colHeadings = [
    'Symbol',
    ...dates.map((date) => moment(date).format('MM-DD')),
    'Trade',
  ];

  const tableData = stocks.data.map((stockData, i) => {
    let prices = dates.map((date, j) => (
      <td key={j}>{stockData.eodPriceByDay[date]}</td>
    ));

    return (
      <tr key={i}>
        <td>{stockData.ticker}</td>
        {prices}
        <td>
          <Link
            to={`/trade`}
            onClick={(e) =>
              setCurrentTicker(
                e,
                stockData.ticker,
                stockData.eodPriceByDay[currentDate]
              )
            }
          >
            Trade
          </Link>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <ViewHeader heading={'Stocks'} />
      <Table>
        <thead>
          <tr>
            <ColumnHeadings headings={colHeadings} />
          </tr>
        </thead>
        <tbody>{tableData}</tbody>
      </Table>
    </div>
  );
};

export default StocksTable;

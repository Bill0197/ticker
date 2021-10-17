import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import DateSliderContainer from './containers/DateSliderContainer';
import StocksTableContainer from './containers/StocksTableContainer';
import TradeContainer from './containers/TradeContainer';
import TransactionsContainer from './containers/TransactionsContainer';
import PortfolioContainer from './containers/PortfolioContainer';
import NavBarContainer from './containers/NavBarContainer';
import SelectAction from './components/SelectAction';

class App extends Component {
  render() {
    return (
      <Router>
        <div className='App container-fluid'>
          <div className='row'>
            <div className='col-12 '>
              <NavBarContainer color='success' />
            </div>
          </div>
          <div className='row my-3 full-height'>
            <div className='col-xl-4 col-lg-12'>
              <div className='col-12 show-border'>
                <StocksTableContainer />
              </div>
            </div>
            <div className='col-xl-8 col-lg-12'>
              <div className='col-12'>
                <div className='row show-border'>
                  <div className='col'>
                    <DateSliderContainer />
                  </div>
                </div>
                <div className='row show-border my-3'>
                  <div className='col-12 full-height'>
                    <div>
                      <SelectAction />
                      <Switch>
                        <Route
                          exact
                          path='/'
                          render={() => <Redirect to='/transactions' />}
                        />
                        <Route
                          path='/trade/:ticker?'
                          component={TradeContainer}
                        />
                        <Route
                          path='/transactions'
                          component={TransactionsContainer}
                        />
                        <Route
                          path='/portfolio'
                          component={PortfolioContainer}
                        />
                      </Switch>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

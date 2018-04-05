import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

import PriceInfo from './components/price_info';
import PriceGraph from './components/price_graph';

ReactDOM.render(
  <div>
    <PriceInfo />
    <PriceGraph />
    <h6 className="text-center text-secondary">
      Spot price data provided by{' '}
      <a href="https://www.coinbase.com/">Coinbase.</a>
    </h6>
    <h6 className="text-center text-secondary">
      Chart data provided by <a href="https://poloniex.com/">Poloniex.</a>
    </h6>
  </div>,
  document.getElementById('root')
);
registerServiceWorker();

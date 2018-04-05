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
  </div>,
  document.getElementById('root')
);
registerServiceWorker();

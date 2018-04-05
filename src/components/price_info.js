import React, { Component } from 'react';
import axios from 'axios';
import './price_info.css';

class PriceInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount() {
    const etherURL = 'https://api.coinbase.com/v2/prices/ETH-USD/spot';
    const bitcoinURL = 'https://api.coinbase.com/v2/prices/BTC-USD/spot';
    const bitcoinCashURL = 'https://api.coinbase.com/v2/prices/BCH-USD/spot';

    axios
      .all([
        axios.get(etherURL, { headers: { 'CB-VERSION': '2018-02-06' } }),
        axios.get(bitcoinURL, { headers: { 'CB-VERSION': '2018-02-06' } }),
        axios.get(bitcoinCashURL, { headers: { 'CB-VERSION': '2018-02-06' } })
      ])
      .then(
        axios.spread((etherRes, bitcoinRes, bitcoinCashRes) => {
          const etherPrice = parseInt(etherRes.data.data.amount, 10)
            .toFixed(2)
            .replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
          this.setState({ etherPrice });

          const bitcoinPrice = parseInt(bitcoinRes.data.data.amount, 10)
            .toFixed(2)
            .replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
          this.setState({ bitcoinPrice });

          const bitcoinCashPrice = parseInt(bitcoinCashRes.data.data.amount, 10)
            .toFixed(2)
            .replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
          this.setState({ bitcoinCashPrice });
        })
      );
  }

  render() {
    return (
      <div className="container text-center">
        <div className="row">
          <div className="col-sm border border-primary rounded">
            Ethereum (ETH) spot price
            <h1>${this.state.etherPrice}</h1>
          </div>
          <div className="col-sm border border-primary rounded">
            Bitcoin (BTC) spot price <h1>${this.state.bitcoinPrice}</h1>
          </div>
          <div className="col-sm border border-primary rounded">
            Bitcoin Cash (BCH) spot price
            <h1>${this.state.bitcoinCashPrice}</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default PriceInfo;

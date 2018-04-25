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
          const etherPrice = etherRes.data.data.amount;
          const formattedEtherPrice = etherPrice.replace(
            /(\d)(?=(\d{3})+\.)/g,
            '$1,'
          );
          this.setState({ formattedEtherPrice });

          const bitcoinPrice = bitcoinRes.data.data.amount;
          const formattedBitcoinPrice = bitcoinPrice.replace(
            /(\d)(?=(\d{3})+\.)/g,
            '$1,'
          );
          this.setState({ formattedBitcoinPrice });

          const bitcoinCashPrice = bitcoinCashRes.data.data.amount;
          const formattedBitcoinCashPrice = bitcoinCashPrice.replace(
            /(\d)(?=(\d{3})+\.)/g,
            '$1,'
          );
          this.setState({ formattedBitcoinCashPrice });
        })
      );
  }

  render() {
    return (
      <div className="container text-center">
        <div className="row">
          <div className="col-sm border border-primary rounded">
            Ethereum (ETH) current spot price
            <h1>${this.state.formattedEtherPrice}</h1>
          </div>
          <div className="col-sm border border-primary rounded">
            Bitcoin (BTC) current spot price{' '}
            <h1>${this.state.formattedBitcoinPrice}</h1>
          </div>
          <div className="col-sm border border-primary rounded">
            Bitcoin Cash (BCH) current spot price
            <h1>${this.state.formattedBitcoinCashPrice}</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default PriceInfo;

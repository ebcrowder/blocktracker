import React, { Component } from 'react';
import axios from 'axios';

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
      .get(etherURL, {
        headers: {
          'CB-VERSION': '2018-02-06'
        }
      })
      .then(res => {
        const etherPrice = parseInt(res.data.data.amount, 10)
          .toFixed(2)
          .replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
        this.setState({ etherPrice });
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get(bitcoinURL, {
        headers: {
          'CB-VERSION': '2018-02-06'
        }
      })
      .then(res => {
        const bitcoinPrice = parseInt(res.data.data.amount, 10)
          .toFixed(2)
          .replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
        this.setState({ bitcoinPrice });
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get(bitcoinCashURL, {
        headers: {
          'CB-VERSION': '2018-02-06'
        }
      })
      .then(res => {
        const bitcoinCashPrice = parseInt(res.data.data.amount, 10)
          .toFixed(2)
          .replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
        this.setState({ bitcoinCashPrice });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="container text-center">
        <div className="row">
          <div className="col-sm">
            ethereum spot price
            <h1>${this.state.etherPrice}</h1>
          </div>
          <div className="col-sm">
            btc spot price <h1>${this.state.bitcoinPrice}</h1>
          </div>
          <div className="col-sm">
            btc cash spot price <h1>${this.state.bitcoinCashPrice}</h1>
          </div>
        </div>
      </div>
    );
  }
}

export default PriceInfo;

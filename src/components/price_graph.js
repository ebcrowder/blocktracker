import React, { Component } from 'react';
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';
import './price_graph.css';

class PriceGraph extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.handleEtherClick = this.handleEtherClick.bind(this);
    this.handleBitcoinClick = this.handleBitcoinClick.bind(this);
    this.handleBitcoinCashClick = this.handleBitcoinCashClick.bind(this);
  }

  componentDidMount() {
    const etherURL =
      'https://poloniex.com/public?command=returnChartData&currencyPair=USDT_ETH&start=1514764800&end=9999999999&period=86400';
    const bitcoinURL =
      'https://poloniex.com/public?command=returnChartData&currencyPair=USDT_BTC&start=1514764800&end=9999999999&period=86400';
    const bitcoinCashURL =
      'https://poloniex.com/public?command=returnChartData&currencyPair=USDT_BCH&start=1514764800&end=9999999999&period=86400';

    axios
      .all([
        axios.get(etherURL, {}),
        axios.get(bitcoinURL, {}),
        axios.get(bitcoinCashURL, {})
      ])
      .then(
        axios.spread((etherRes, bitcoinRes, bitcoinCashRes) => {
          const etherData = _.map(etherRes.data);
          const formattedEtherData = etherData.map(a => ({
            date: moment.unix(+a.date).format('M/DD'),
            close: _.ceil(+a.close, 2)
          }));
          this.setState({ formattedEtherData });

          const bitcoinData = _.map(bitcoinRes.data);
          const formattedBitcoinData = bitcoinData.map(a => ({
            date: moment.unix(+a.date).format('M/DD'),
            close: _.ceil(+a.close, 2)
          }));
          this.setState({ formattedBitcoinData });

          const bitcoinCashData = _.map(bitcoinCashRes.data);
          const formattedBitcoinCashData = bitcoinCashData.map(a => ({
            date: moment.unix(+a.date).format('M/DD'),
            close: _.ceil(+a.close, 2)
          }));
          this.setState({ formattedBitcoinCashData });
        })
      );
  }

  handleEtherClick() {
    this.setState({ formattedData: this.state.formattedEtherData });
  }

  handleBitcoinClick() {
    this.setState({ formattedData: this.state.formattedBitcoinData });
  }

  handleBitcoinCashClick() {
    this.setState({ formattedData: this.state.formattedBitcoinCashData });
  }

  render() {
    const tickFormatter = data =>
      data.toLocaleString('us-EN', { style: 'currency', currency: 'USD' });
    return (
      <div className="container border border-primary rounded">
        <button
          type="button align-right"
          className="btn btn-outline-primary"
          onClick={this.handleEtherClick}
        >
          Ethereum
        </button>
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={this.handleBitcoinClick}
        >
          Bitcoin
        </button>
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={this.handleBitcoinCashClick}
        >
          Bitcoin Cash
        </button>
        <div className="graph">
          <ResponsiveContainer height={500} width="95%">
            <AreaChart
              width={1400}
              height={500}
              data={this.state.formattedData}
              margin={{ top: 5, right: 5, bottom: 5, left: 35 }}
            >
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0000ff" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#0000ff" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="date" interval={15} />
              <YAxis tickFormatter={tickFormatter} type="number" />
              <Tooltip formatter={tickFormatter} />
              <Area
                type="monotone"
                dataKey="close"
                stroke="#82ca9d"
                fillOpacity={1}
                fill="url(#colorUv)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
}

export default PriceGraph;

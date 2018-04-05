import React, { Component } from 'react';
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';
import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';

class PriceGraph extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    const URL =
      'https://poloniex.com/public?command=returnChartData&currencyPair=USDT_ETH&start=1514764800&end=9999999999&period=14400';

    axios
      .get(URL, {})
      .then(res => {
        const data = _.map(res.data);
        const formattedData = data.map(a => ({
          date: moment.unix(+a.date).format('M/DD'),
          close: _.ceil(+a.close, 2)
        }));
        this.setState({ formattedData });
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    return (
      <div className="container">
        <button type="button" class="btn btn-primary">
          Ethereum
        </button>
        <button type="button" class="btn btn-primary">
          Bitcoin
        </button>
        <button type="button" class="btn btn-primary">
          Litecoin
        </button>
        <AreaChart
          width={1100}
          height={400}
          data={this.state.formattedData}
          margin={{ top: 5, right: 20, bottom: 5, left: 5 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0000ff" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#0000ff" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="close"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
        </AreaChart>
      </div>
    );
  }
}

export default PriceGraph;

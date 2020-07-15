/*jshint esversion: 6 */
import React, { Fragment } from 'react';

import StudioTimeSeriesChart from '../lib/StudioTimeSeriesChart';

class Example_001 extends React.Component {
  render () {
    const datasets = [
      {
        key: 'set1',
        color: '#ff0000',
        data: [
          {
            value: 2,
            timestamp: 100001,
          },
          {
            value: 7,
            timestamp: 100002,
          },
          {
            value: 7,
            timestamp: 100003,
          },
          {
            value: 6,
            timestamp: 100004,
          },
        ],
      },
    ];

    const displayConfig = [
      {
        key: 'set1',
        color: '#ff0000',
        data: [
          {
            value: 2,
            timestamp: 100001,
          },
          {
            value: 7,
            timestamp: 100002,
          },
          {
            value: 7,
            timestamp: 100003,
          },
          {
            value: 6,
            timestamp: 100004,
          },
        ],
      },
    ];
    /* jshint ignore:start */
    return (
      <Fragment>
        <StudioTimeSeriesChart
          datasets={datasets}
          height={500}
          yAxisLabel='test'
        />
        <div style={{ paddingLeft: 30, paddingTop: 30 }}>
          <h2>JSON&nbsp;<span style={{fontSize: 16}}>( same as Example 0, but with custom color)</span></h2>
          <pre style={{ color: 'black', fontSize: 16 }}>
            {JSON.stringify(displayConfig, null, 2)}
          </pre>
        </div>
      </Fragment>
    );
    /* jshint ignore:end */
  }
}

export default Example_001;

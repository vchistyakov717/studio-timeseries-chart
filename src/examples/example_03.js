/*jshint esversion: 6 */
import React, { Fragment } from 'react';

import { generateData } from './helpers';
import StudioTimeSeriesChart from '../lib/StudioTimeSeriesChart';

class Example_03 extends React.Component {
  render () {
    const datasets = [
      {
        key: 'Navy Dark',
        data: generateData(20, 'Jan 01 1990'),
        color: '#030d28',
        showMaxLine: true,
      },
      {
        key: 'Bar',
        color: '#8e9093',
        data: generateData(20, 'Jan 01 1990'),
        type: 'bar',
      },
    ];

    const displayConfig = [
      {
        key: 'Navy Dark',
        data: generateData(0, 'Jan 01 1990'),
        color: '#030d28',
        showMaxLine: true,
      },
      {
        key: 'Bar',
        color: '#8e9093',
        data: generateData(0, 'Jan 01 1990'),
        type: 'bar',
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
          <h2>
            JSON&nbsp;
            <span style={{ fontSize: 16 }}>
              ( bar and line charts with max marker line)
            </span>
          </h2>
          <pre style={{ color: 'black', fontSize: 16 }}>
            {JSON.stringify(displayConfig, null, 2)}
          </pre>
        </div>
      </Fragment>
    );
    /* jshint ignore:end */
  }
}

export default Example_03;

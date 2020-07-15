/*jshint esversion: 6 */
import React, { Fragment } from 'react';

import { generateData } from './helpers';
import StudioTimeSeriesChart from '../lib/StudioTimeSeriesChart';

class Example_01 extends React.Component {
  render () {
    const datasets = [
      {
        key: 'Navy Light',
        data: generateData(40, 'Jan 01 1990'),
      },
      {
        key: 'Green',
        data: generateData(40, 'Jan 01 1990'),
        type: 'area',
        opacity: 0.5
      },
    ];

    const displayConfig = [
      {
        key: 'Navy Light',
        data: generateData(0, 'Jan 01 1990'),
      },
      {
        key: 'Green',
        data: generateData(0, 'Jan 01 1990'),
        type: 'area',
        opacity: 0.5
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
              ( area type with opacity)
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

export default Example_01;

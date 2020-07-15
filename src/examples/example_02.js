/*jshint esversion: 6 */
import React, { Fragment } from 'react';

import { generateData } from './helpers';
import StudioTimeSeriesChart from '../lib/StudioTimeSeriesChart';

class Example_02 extends React.Component {
  render () {
    const datasets = [
      {
        key: 'Navy Dark',
        type: 'spline',
        data: generateData(30, 'Jan 01 1990'),
        color: '#030d28', //Navy Dark
      },
      {
        key: 'Area data',
        data: generateData(30, 'Jan 01 1990'),
        type: 'area',
        spline: true,
        opacity: 0.1,
      },
    ];

    const displayConfig = [
      {
        key: 'Navy Dark',
        type: 'spline',
        data: generateData(1, 'Jan 01 1990'),
        color: '#030d28', //Navy Dark
      },
      {
        key: 'Area data',
        data: generateData(1, 'Jan 01 1990'),
        type: 'area',
        spline: true,
        opacity: 0.1,
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
              ( spline type and area in spline mode, data arrays are truncated for
              readability)
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

export default Example_02;

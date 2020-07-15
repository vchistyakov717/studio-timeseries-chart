/*jshint esversion: 6 */
import React, { Fragment } from 'react';

import { generateData } from './helpers';
import StudioTimeSeriesChart from '../lib/StudioTimeSeriesChart';

class Example_013 extends React.Component {
  render () {
    const datasets = [
      {
        label: 'Navy Light',
        data: generateData(40, 'Jan 01 1990'),
        showMaxLine: true,
      },
      {
        label: 'Red',
        color: '#ff0000',
        data: generateData(40, 'Jan 01 1990'),
        showMaxLine: true,
      },
    ];

    const displayConfig = [
      {
        label: 'Navy Light',
        data: generateData(0, 'Jan 01 1990'),
        showMaxLine: true,
      },
      {
        label: 'Red',
        color: '#ff0000',
        data: generateData(0, 'Jan 01 1990'),
        showMaxLine: true,
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
              ( chart with max marker lines)
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

export default Example_013;

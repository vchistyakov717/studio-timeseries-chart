/*jshint esversion: 6 */
import React, { Fragment } from 'react';
import { isValid } from 'date-fns';

import StudioTimeSeriesChart from '../lib/StudioTimeSeriesChart';

class Example_01 extends React.Component {
  render() {
    const datasets = [
      {
        key: 'set1',
        showMaxLine: true,
        data: [
          {
            value: 0,
            timestamp: '08:15am',
          },
          {
            value: 0,
            timestamp: '08:16am',
          },
          {
            value: 0,
            timestamp: '08:17am',
          },
          {
            value: 0,
            timestamp: '08:18am',
          },
          {
            value: 0,
            timestamp: '08:19am',
          },
          {
            value: 0,
            timestamp: '08:20am',
          },
          {
            value: 0,
            timestamp: '08:21am',
          },
          {
            value: 0,
            timestamp: '08:22am',
          },
          {
            value: 0,
            timestamp: '08:23am',
          },
          {
            value: 0,
            timestamp: '08:24am',
          },
          {
            value: 0,
            timestamp: '08:25am',
          },
          {
            value: 0,
            timestamp: '08:26am',
          },
          {
            value: 0,
            timestamp: '08:27am',
          },
          {
            value: 0,
            timestamp: '08:28am',
          },
          {
            value: 0,
            timestamp: '08:29am',
          },
          {
            value: 0,
            timestamp: '08:30am',
          },
          {
            value: 0,
            timestamp: '08:31am',
          },
          {
            value: 0,
            timestamp: '08:32am',
          },
          {
            value: 0,
            timestamp: '08:33am',
          },
          {
            value: 0,
            timestamp: '08:34am',
          },
          {
            value: 0,
            timestamp: '08:35am',
          },
          {
            value: 0,
            timestamp: '08:36am',
          },
          {
            value: 0,
            timestamp: '08:37am',
          },
          {
            value: 0,
            timestamp: '08:38am',
          },
          {
            value: 0,
            timestamp: '08:39am',
          },
          {
            value: 0,
            timestamp: '08:40am',
          },
          {
            value: 0,
            timestamp: '08:41am',
          },
          {
            value: 0,
            timestamp: '08:42am',
          },
          {
            value: 0,
            timestamp: '08:43am',
          },
          {
            value: 0,
            timestamp: '08:44am',
          },
          {
            value: 0,
            timestamp: '08:45am',
          },
          {
            value: 0,
            timestamp: '08:46am',
          },
          {
            value: 0,
            timestamp: '08:47am',
          },
          {
            value: 0,
            timestamp: '08:48am',
          },
          {
            value: 0,
            timestamp: '08:49am',
          },
          {
            value: 0,
            timestamp: '08:50am',
          },
          {
            value: 0,
            timestamp: '08:51am',
          },
          {
            value: 0,
            timestamp: '08:52am',
          },
          {
            value: 0,
            timestamp: '08:53am',
          },
          {
            value: 0,
            timestamp: '08:54am',
          },
          {
            value: 0,
            timestamp: '08:55am',
          },
          {
            value: 0,
            timestamp: '08:56am',
          },
          {
            value: 1,
            timestamp: '08:57am',
          },
          {
            value: 1,
            timestamp: '08:58am',
          },
          {
            value: 1,
            timestamp: '08:59am',
          },
          {
            value: 1,
            timestamp: '09:00am',
          },
          {
            value: 1,
            timestamp: '09:01am',
          },
          {
            value: 1,
            timestamp: '09:02am',
          },
          {
            value: 1,
            timestamp: '09:03am',
          },
          {
            value: 1,
            timestamp: '09:04am',
          },
          {
            value: 1,
            timestamp: '09:05am',
          },
          {
            value: 0,
            timestamp: '09:06am',
          },
          {
            value: 0,
            timestamp: '09:07am',
          },
          {
            value: 0,
            timestamp: '09:08am',
          },
          {
            value: 0,
            timestamp: '09:09am',
          },
          {
            value: 0,
            timestamp: '09:10am',
          },
          {
            value: 0,
            timestamp: '09:11am',
          },
          {
            value: 0,
            timestamp: '09:12am',
          },
          {
            value: 1,
            timestamp: '09:13am',
          },
          {
            value: 0,
            timestamp: '09:14am',
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
          <h3>
            Data is taken from the 'Trending Now' report with invalid date format ("09:14am") and max values plato detection
          </h3>
        </div>
      </Fragment>
    );
    /* jshint ignore:end */
  }
}

export default Example_01;

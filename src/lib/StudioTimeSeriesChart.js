/*jshint esversion: 6 */
import React, { useState } from 'react';
import moment from 'moment';
import { isValid, parseISO } from 'date-fns';
import 'chartjs-plugin-annotation';
import deepcopy from 'deepcopy';
import PropTypes from 'prop-types';

import StudioChart from './StudioChart';
import './plugins/autoConfigPlugin';

function parseTime(t) {
  var d = new Date();
  var time = t.match(/(\d+)(?::(\d\d))?\s*(p?)/);
  d.setHours(parseInt(time[1]) + (time[3] ? 12 : 0));
  d.setMinutes(parseInt(time[2]) || 0);
  return d;
}

const getMaxY = (datasets) => {
  let globalMax = null;
  datasets.forEach((set) => {
    const data = set.data;
    let dataMax = null;
    if (
      !data.some((value) => {
        return typeof value === 'object';
      })
    ) {
      dataMax = Math.max(...data);
    } else {
      dataMax = data.reduce(
        (max, p) => (parseFloat(p.y) > max ? parseFloat(p.y) : max),
        data[0].y
      );
    }
    if (!globalMax) globalMax = dataMax;
    if (dataMax > globalMax) globalMax = dataMax;
  });
  return globalMax + globalMax / 100;
};

const buidMaxAnnotations = (datasets) => {
  const dates = [];
  const values = [];
  const colors = [];

  datasets.forEach((set) => {
    if (set.showMaxLine) {
      let max = Math.max.apply(
        Math,
        set.data.map(function (o) {
          return o.y;
        })
      );
      let keys = [];
      let last = null;

      //search max values with plato detection if any
      let platoEndIds = [];
      for (let i = 0; i < set.data.length; i++) {
        if (max === JSON.parse(set.data[i].y) && i !== 0) {
          if (keys.length === 0) {       
            keys.push(i);
            last = i;
          } else {
            const key = keys[keys.length - 1];
            if (i !== last + 1) {
              keys.push(i);
            } else if (set.data[i].y !== set.data[i + 1].y) {
              platoEndIds.push(i);
            }
            last = i;
          }
        }
      }

      //add plato end indexes and remove duplicates
      keys = Array.from(new Set(keys.concat(platoEndIds)));

      for (let j = 0; j < keys.length; j++) {
        const k = keys[j];
        dates.push(set.data[k].t);
        values.push(parseFloat(set.data[k].y));
        colors.push(set.borderColor ? set.borderColor : set.color);
      }
    }
  });

  return dates.map(function (date, index) {
    return {
      type: 'line',
      id: 'vline' + index,
      mode: 'vertical',
      scaleID: 'x-axis-0',
      value: date,
      borderColor: colors[index],
      borderWidth: 1,
      label: {
        enabled: true,
        position: 'top',
        content: values[index],
      },
    };
  });
};

const buildTicks = (scale, ticks) => {
  const majorUnit = scale._majorUnit;
  const firstTick = ticks[0];
  let i, ilen, val, tick, currMajor, lastMajor;
  val = moment(ticks[0].value);
  if (
    (majorUnit === 'minute' && val.second() === 0) ||
    (majorUnit === 'hour' && val.minute() === 0) ||
    (majorUnit === 'day' && val.hour() === 9) ||
    (majorUnit === 'month' && val.date() <= 3 && val.isoWeekday() === 1) ||
    (majorUnit === 'year' && val.month() === 0)
  ) {
    firstTick.major = true;
  } else {
    firstTick.major = false;
  }
  lastMajor = val.get(majorUnit);

  for (i = 1, ilen = ticks.length; i < ilen; i++) {
    tick = ticks[i];
    val = moment(tick.value);
    currMajor = val.get(majorUnit);
    tick.major = currMajor !== lastMajor;
    lastMajor = currMajor;
  }
  return ticks;
};

const buildDefaultXAxis = () => {
  return [
    {
      type: 'time',
      distribution: 'series',
      offset: true,
      ticks: {
        major: {
          enabled: true,
          fontStyle: 'bold',
        },
        source: 'data',
        autoSkip: true,
        autoSkipPadding: 75,
        maxRotation: 0,
        sampleSize: 100,
      },
      afterBuildTicks: buildTicks,
    },
  ];
};

const renameKey = (obj, newKey, oldKey) => {
  delete Object.assign(obj, { [newKey]: obj[oldKey] })[oldKey];
};

const dateFormat = (timestamp, scale) => {
  const dateObject = new Date(timestamp);
  const options = { weekday: 'short', month: 'short', day: 'numeric' };
  let humanDateFormat = dateObject.toLocaleString().split(',')[0]; //2019-12-9 10:30:15

  switch (scale) {
    case 'week':
      humanDateFormat = dateObject.toLocaleDateString('en-US', options);
      break;
    case 'month':
      humanDateFormat = dateObject.toLocaleString('en-US', { month: 'long' });
      break;
    case 'year':
      humanDateFormat = dateObject.toLocaleString('en-US', { year: 'numeric' });
      break;
    case 'hour':
      humanDateFormat = dateObject.toLocaleString('en-US', { hour: 'numeric' });
      break;
    default:
    // humanDateFormat = dateObject.toLocaleString("en-US", { timeZoneName: "short" }); // 12/9/2019, 10:30:15 AM CST
  }
  return humanDateFormat;
};

const buildTestConfig = (datasets, height, yAxisLabel) => {
  if (!datasets) return null;

  const currentDates = [];
  const data = {};

  datasets[0].data.forEach((item) => {
    currentDates.push(item.t);
  });

  data.labels = currentDates;

  datasets.forEach((set, index) => {
    let key = 'current';
    const values = [];
    if (index !== 0) {
      if (datasets.length === 2) key = 'previous';
      else key = 'previous_' + index;
    }
    set.data.forEach((item) => {
      values.push(item.y);
    });
    data[key] = values;
  });

  return {
    height: height || 600,
    data: {
      labels: data.labels,
      datasets: [
        {
          type: 'line',
          borderWidth: 3,
          label: 'Current',
          // lineTension: 0.5,
          pointRadius: 5,
          pointBackgroundColor: 'white',
          data: data.current,
          xAxisID: 'x-axis-2',
        },
        {
          type: 'bar',
          label: 'Previous',
          data: data.previous,
          xAxisID: 'x-axis-1',
        },
      ],
    },

    options: {
      maintainAspectRatio: false,
      tooltips: {
        mode: 'index',
        intersect: true,
      },
      scales: {
        xAxes: [
          {
            id: 'x-axis-1',
            barThickness: data.labels.length > 7 ? 20 : 100,
            type: 'time',
            offset: true,
            ticks: {
              autoSkip: true,
              maxTicksLimit: data.labels.length * 3,
              major: {
                enabled: true,
                fontStyle: 'bold',
              },
            },
            scaleLabel: {
              display: yAxisLabel ? true : false,
              labelString: yAxisLabel ? yAxisLabel : '',
            },
            afterBuildTicks: buildTicks,
          },
          {
            id: 'x-axis-2',
            type: 'time',
            display: false,
            offset: true,
            ticks: {
              autoSkip: true,
              major: {
                enabled: true,
                fontStyle: 'bold',
              },
            },
            afterBuildTicks: buildTicks,
          },
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Total',
            },
            ticks: {
              suggestedMax: getMaxY(datasets),
            },
          },
        ],
      },
    },
  };
};

const buildComparePeriodsConfig = (datasets, height, yAxisLabel, category) => {
  if (!datasets) return null;

  const currentDates = [];
  const data = {};

  datasets[0].data.forEach((item) => {
    currentDates.push(item.t);
  });

  data.labels = currentDates;

  datasets.forEach((set, index) => {
    let key = 'current';
    const values = [];
    if (index !== 0) {
      if (datasets.length === 2) key = 'previous';
      else key = 'previous_' + index;
    }
    set.data.forEach((item) => {
      values.push(item.y);
    });
    data[key] = values;
  });

  return {
    type: 'bar',
    height: height || 600,
    data: {
      labels: data.labels,
      datasets: [
        {
          type: 'line',
          borderWidth: 3,
          label: 'Current',
          pointRadius: 5,
          pointBackgroundColor: 'white',
          data: data.current,
          xAxisID: 'x-axis-2',
        },
        {
          type: 'bar',
          label: 'Previous',
          data: data.previous,
          xAxisID: 'x-axis-1',
        },
      ],
    },

    options: {
      maintainAspectRatio: false,
      tooltips: {
        mode: 'index',
        intersect: true,
      },
      scales: {
        xAxes: [
          {
            id: 'x-axis-1',
            ticks: {
              callback: function (label) {
                return dateFormat(label, category);
              },
            },
          },
          {
            display: false,
            offset: true,
            id: 'x-axis-2',
            ticks: {
              display: false,
            },
          },
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Total',
            },
            ticks: {
              suggestedMax: getMaxY(datasets),
            },
          },
        ],
      },
    },
  };
};

const buildConfig = (
  datasets,
  height,
  yAxisLabel,
  comparePeriods,
  category
) => {
  if (!datasets) return null;

  let datasets_copy = deepcopy(datasets);

  //rename custom key names to default ones
  datasets_copy.forEach((set) => {
    let data = set.data;
    if (set.key) {
      renameKey(set, 'label', 'key');
    }
    if (set.valueKey && set.timeKey) {
      data.forEach((d) => {
        renameKey(d, 't', set.timeKey);
        renameKey(d, 'y', set.valueKey);
      });
    } else {
      //default studio key names for time series data sets
      const keys = Object.keys(data[0]);
      if (keys.includes('timestamp') && keys.includes('value')) {
        data.forEach((d) => {
          renameKey(d, 't', 'timestamp');
          renameKey(d, 'y', 'value');
        });
      }
    }
  });

  // validate timestamp values
  datasets_copy.forEach((set) => {
    let data = set.data;
    data.forEach((d) => {
      const valid = isValid(new Date(d.t));
      if (!valid) {
        // console.log(d.t.padStart( 9, ' ' ) + " = " + parseTime(d.t) + " : " + valid + ", " + parseTime(d.t).getTime());
        d.t = parseTime(d.t).getTime();
      }
    });
  });

  if (comparePeriods) {
    if (category)
      return buildComparePeriodsConfig(
        datasets_copy,
        height,
        yAxisLabel,
        category
      );
    else return buildTestConfig(datasets, height, yAxisLabel);
  } else {
    return {
      height: height || 600,
      data: {
        datasets: datasets_copy,
      },
      options: {
        legend: {
          labels: {
            filter: function (item) {
              //remove undefined legend
              return item.text;
            },
          },
        },
        maintainAspectRatio: false,
        animation: {
          duration: 0,
        },
        scales: {
          xAxes: buildDefaultXAxis(),
          yAxes: [
            {
              ticks: {
                suggestedMax: getMaxY(datasets_copy),
              },
              gridLines: {
                drawBorder: false,
              },
              scaleLabel: {
                display: yAxisLabel ? true : false,
                labelString: yAxisLabel ? yAxisLabel : '',
              },
            },
          ],
        },
        annotation: {
          drawTime: 'afterDatasetsDraw',
          annotations: buidMaxAnnotations(datasets_copy),
        },
        tooltips: {
          intersect: false,
          mode: 'index',
          callbacks: {
            label: function (tooltipItem, myData) {
              let label = myData.datasets[tooltipItem.datasetIndex].label || '';
              if (label) {
                label += ': ';
              }
              label += parseFloat(tooltipItem.value).toFixed(2);
              return label;
            },
          },
        },
      },
    };
  }
};

//==================================================

const StudioTimeSeriesChart = (props) => {
  // eslint-disable-next-line no-unused-vars
  const [config, setConfig] = useState(
    buildConfig(
      props.datasets,
      props.height,
      props.yAxisLabel,
      props.comparePeriods,
      props.category
    )
  );

  StudioTimeSeriesChart.propTypes = {
    height: PropTypes.PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    datasets: PropTypes.arrayOf(PropTypes.object),
    yAxisLabel: PropTypes.string,
    comparePeriods: PropTypes.bool,
    category: PropTypes.string,
    config: PropTypes.object,
  };

  /* jshint ignore:start */
  return <StudioChart config={config ? config : props.config} />;
  /* jshint ignore:end */
};

export default StudioTimeSeriesChart;

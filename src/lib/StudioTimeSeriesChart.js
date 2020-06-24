import React, { useState } from "react";
import moment from "moment";
import "chartjs-plugin-annotation";

import StudioChart from "./StudioChart";
import "./plugins/autoConfigPlugin";

const buildMinMaxAnnotation = (datasets) => {
  let dates = [];
  let values = [];
  var colors = [];

  datasets.forEach((set) => {
    if (!set.showMaxLine) return;
    var lowest = set.data[0];
    var highest = set.data[0];

    var tmp;
    for (var i = set.data.length - 1; i >= 0; i--) {
      tmp = set.data[i];
      if (parseFloat(tmp.y) < parseFloat(lowest.y)) lowest = tmp;
      if (parseFloat(tmp.y) > parseFloat(highest.y)) highest = tmp;
    }
    if (highest) {
      dates.push(highest.t);
      values.push(parseFloat(highest.y));
      colors.push(set.borderColor);
    }
  });

  return dates.map(function (date, index) {
    return {
      type: "line",
      id: "vline" + index,
      mode: "vertical",
      scaleID: "x-axis-0",
      value: date,
      borderColor: colors[index],
      borderWidth: 1,
      label: {
        enabled: true,
        position: "top",
        content: values[index],
      },
    };
  });
};

const buildTicks = (scale, ticks) => {
  var majorUnit = scale._majorUnit;
  var firstTick = ticks[0];
  var i, ilen, val, tick, currMajor, lastMajor;

  val = moment(ticks[0].value);
  if (
    (majorUnit === "minute" && val.second() === 0) ||
    (majorUnit === "hour" && val.minute() === 0) ||
    (majorUnit === "day" && val.hour() === 9) ||
    (majorUnit === "month" && val.date() <= 3 && val.isoWeekday() === 1) ||
    (majorUnit === "year" && val.month() === 0)
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
      type: "time",
      distribution: "series",
      offset: true,
      ticks: {
        major: {
          enabled: true,
          fontStyle: "bold",
        },
        source: "data",
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

const buildConfig = (datasets, height, yAxisLabel) => {
  datasets.forEach((set) => {
    const data = set.data;
    if (set.key) {
      renameKey(set, "label", "key");
    }
    if (set.valueKey && set.timeKey) {
      data.forEach((d) => {
        renameKey(d, "t", set.timeKey);
        renameKey(d, "y", set.valueKey);
      });
    } else {
      //default studio key names for time series data sets
      const keys = Object.keys(data[0]);
      if (keys.includes("timestamp") && keys.includes("value")) {
        data.forEach((d) => {
          renameKey(d, "t", "timestamp");
          renameKey(d, "y", "value");
        });
      }
    }
  });

  return {
    height: height || 600,
    data: {
      datasets: datasets,
    },
    options: {
      legend: {
        labels: {
          filter: function (item, chart) {
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
            gridLines: {
              drawBorder: false,
            },
            scaleLabel: {
              display: yAxisLabel ? true : false,
              labelString: yAxisLabel ? yAxisLabel : "",
            },
          },
        ],
      },
      annotation: {
        drawTime: "afterDatasetsDraw",
        annotations: buildMinMaxAnnotation(datasets),
      },
      tooltips: {
        intersect: false,
        mode: "index",
        callbacks: {
          label: function (tooltipItem, myData) {
            var label = myData.datasets[tooltipItem.datasetIndex].label || "";
            if (label) {
              label += ": ";
            }
            label += parseFloat(tooltipItem.value).toFixed(2);
            return label;
          },
        },
      },
    },
  };
};

//==================================================

const StudioTimeSeriesChart = (props) => {
  const [config, setConfig] = useState(
    buildConfig(props.datasets, props.height, props.yAxisLabel)
  );

  return <StudioChart config={config} />;
};

export default StudioTimeSeriesChart;
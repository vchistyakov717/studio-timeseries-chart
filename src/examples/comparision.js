import React from "react";

import StudioTimeSeriesChart from "../lib/StudioTimeSeriesChart";

var convertToTimestamp = function (date) {
  var myDate = date.split("/");
  var newDate = myDate[1] + "," + myDate[0] + "," + myDate[2];
  return new Date(newDate).getTime();
};

function comparePeriods() {
  // let data2 = JSON.parse(
  //   '{"labels":["09/01/2018#02/01/2019","10/01/2018#03/01/2019","11/01/2018#04/01/2019","12/01/2018#05/01/2019","13/01/2018#06/01/2019","14/01/2018#07/01/2019","15/01/2018#08/01/2019"],"values_first":[390,328,259.5,371,166,302,232],"values_second":[342.81,352,336.5,299.07,389.07,136,204]}'
  // );

  let data3 = JSON.parse(
    '{"labels":["09/01/2018","10/01/2018","11/01/2018","12/01/2018","13/01/2018","14/01/2018","15/01/2018"],"values_first":[390,328,259.5,371,166,302,232],"values_second":[342.81,352,336.5,299.07,389.07,136,204]}'
  );

  // let data = [
  //   {
  //     values_first: [
  //       { t: convertToTimestamp("08/01/2018"), v: 390 },
  //       { t: convertToTimestamp("09/01/2018"), v: 328 },
  //       { t: convertToTimestamp("10/01/2018"), v: 259 },
  //       { t: convertToTimestamp("11/01/2018"), v: 371 },
  //       { t: convertToTimestamp("12/01/2018"), v: 166 },
  //       { t: convertToTimestamp("13/01/2018"), v: 302 },
  //       { t: convertToTimestamp("14/01/2018"), v: 232 },
  //     ],
  //   },
  //   {
  //     values_second: [
  //       { t: convertToTimestamp("01/01/2018"), v: 342.81 },
  //       { t: convertToTimestamp("02/01/2018"), v: 352 },
  //       { t: convertToTimestamp("03/01/2018"), v: 336.5 },
  //       { t: convertToTimestamp("04/01/2018"), v: 299.07 },
  //       { t: convertToTimestamp("05/01/2018"), v: 389.07 },
  //       { t: convertToTimestamp("06/01/2018"), v: 136 },
  //       { t: convertToTimestamp("07/01/2018"), v: 204 },
  //     ],
  //   },
  // ];

  return {
    type: "line",
    data: {
      labels: data3.labels,
      datasets: [
        {
          type: "line",
          pointRadius: 4,
          borderWidth: 3,
          label: "Current",
          lineTension: 0.5,
          data: data3.values_second,
          xAxisID: "x-axis-2",
        },
        {
          type: "bar",
          label: "Previous",
          data: data3.values_first,
          xAxisID: "x-axis-1",
        },
      ],
    },

    options: {
      tooltips: {
        mode: "index",
        intersect: true,
      },
      scales: {
        xAxes: [
          {
            display: true,
            tipe: "time",
            scaleLabel: {
              display: true,
            },
            time: {
              displayFormats: {
                day: "MMM DD",
                week: "MMM DD",
                month: "MMM DD",
                quarter: "MMM DD",
                year: "MMM DD",
              },
            },
            id: "x-axis-1",
            ticks: {
              callback: function (label) {
                return label.split("#")[0];
              },
            },
          },
          {
            display: false,
            tipe: "time",
            scaleLabel: {
              display: false,
            },
            id: "x-axis-2",
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
              labelString: "Totale",
            },
            ticks: {
              callback: function (value, index, values) {
                return value.toLocaleString("de-DE", {
                  style: "currency",
                  currency: "EUR",
                });
              },
            },
          },
        ],
      },
    },
  };
}

class ComparisionPerPeriod extends React.Component {
  render() {
    return (
      <StudioTimeSeriesChart
        config={comparePeriods()}
        height={500}
        yAxisLabel="test"
      />
    );
  }
}

export default ComparisionPerPeriod;

import React, { Fragment } from "react";

import StudioTimeSeriesChart from "../lib/StudioTimeSeriesChart";

class Example_03 extends React.Component {
  render() {
    var config = {
      type: "bar",
      height: 500,
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
        datasets: [
          {
            type: "line",
            label: "Dataset 2",
            data: [-65, -10, -80, -81, -56, -85, 40],
            borderColor: "black",
            fill: false,
            pointRadius: 5,
            lineTension: 0.5,
            borderWidth: 4,
            pointBackgroundColor: "white"
          },
          {
            type: "bar",
            label: "Dataset 1",
            backgroundColor: "red",
            data: [65, 0, 80, 81, 56, 85, 40],
          },
          {
            type: "bar",
            label: "Dataset 3",
            backgroundColor: "blue",
            data: [-65, 0, -80, -81, -56, -85, -40],
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              stacked: true,
            },
          ],
          yAxes: [
            {
              stacked: true,
            },
          ],
        },
      },
    };

    return (
      <Fragment>
        <StudioTimeSeriesChart config={config} height={500} yAxisLabel="test" />
        <div style={{ paddingLeft: 30, paddingTop: 30 }}>
          <h2>Stacked bar example with custom config parameters (ChartJS native)</h2>
          <pre style={{ color: "black", fontSize: 16 }}>
            {JSON.stringify(config, null, 2)}
          </pre>
        </div>
      </Fragment>
    );
  }
}

export default Example_03;

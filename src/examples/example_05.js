import React, { Fragment } from "react";

import { generateData } from "./helpers";
import StudioTimeSeriesChart from "../lib/StudioTimeSeriesChart";

class Example_05 extends React.Component {
  render() {
    const datasets = [
      {
        key: "Navy Dark",
        data: generateData(7, "Jan 08 1990"),
        color: "#030d28",
      },
      {
        key: "Bar",
        color: "#8e9093",
        data: generateData(7, "Jan 01 1990"),
        type: "bar",
      },
    ];

    const displayConfig = [
      {
        key: "Navy Dark",
        data: generateData(0, "Jan 01 1990"),
        color: "#030d28",
      },
      {
        key: "Bar",
        color: "#8e9093",
        data: generateData(0, "Jan 01 1990"),
        type: "bar",
      },
    ];

    return (
      <Fragment>
        <StudioTimeSeriesChart
          datasets={datasets}
          height={500}
          yAxisLabel="test"
          comparePeriods={true}
          category="week"
        />
        <div style={{ paddingLeft: 30, paddingTop: 30 }}>
          <h2>
            JSON&nbsp;
            <span style={{ fontSize: 16 }}>
            (Period-per-Period comparison)
            </span>
          </h2>
          <pre style={{ color: "black", fontSize: 16 }}>
            {JSON.stringify(displayConfig, null, 2)}
          </pre>
        </div>
      </Fragment>
    );
  }
}

export default Example_05;

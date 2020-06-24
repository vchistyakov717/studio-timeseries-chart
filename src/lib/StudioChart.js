import React from "react";

import Chart from "./Chart";

const configValidation = (config) => {
  let validConfig = config;

  if (!config.type) validConfig.type = "line";

  return validConfig;
};

const StudioChart = (props) => {
  const config = props.config;

  return (
    <div
      style={{
        height: config.height ? config.height : props.height,
        position: "relative",
      }}
    >
      <Chart config={configValidation(config)} />
    </div>
  );
};

StudioChart.defaultProps = {
  height: 300,
};

export default StudioChart;

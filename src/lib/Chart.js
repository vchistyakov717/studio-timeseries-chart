import React, { useEffect, useRef, useState } from "react";
import isEqual from "lodash/isEqual";
import Chartjs from "chart.js";

const Chart = (props) => {
  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  const [config, setConfig] = useState(null);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chartjs(
        chartContainer.current,
        props.config
      );
      setChartInstance(newChartInstance);
    }
  }, [chartContainer]);

  const updateDataset = (newData) => {
    if (chartInstance) {
      newData.data.datasets.forEach((item, index) => {
        chartInstance.data.datasets[index].data = item.data;
      });
      chartInstance.update();
    }
  };

  if (!isEqual(config, props.config)) {
    updateDataset(props.config);
    setConfig(props.config);
  }

  return <canvas ref={chartContainer} />;
};

export default Chart;

import Chart from "chart.js";
const autoConfig = {
  pointRadius: 0,
  lineTension: 0,
  borderWidth: 1,
};
const targetChartType = ["bar", "line"];
const autoConfigPlugin = {
  id: "autoconfig",
  beforeInit(chart, options) {
    // If it is not used, display it as it is
    if (options.disabled) {
      return;
    }
    // If it is not the expected graph type, display it as is
    if (targetChartType.indexOf(chart.config.type) === -1) {
      return;
    }

    const { datasets } = chart.data;

    datasets.forEach((data) => {
      let target = data;
      if (!data.color) {
        let randomColor =
          "#" + Math.floor(Math.random() * 16777215).toString(16);
        let randomFillColor = randomColor + "33";

        target.borderColor = randomColor;
        // If you use a fill, fill with the same color
        if (
          (typeof target.fill === "undefined" || target.fill) &&
          !target.backgroundColor
        ) {
          if (chart.config.type === "bar") {
            target.backgroundColor = randomColor;
          } else if (chart.config.type === "line") {
            target.backgroundColor = randomFillColor;
          }
        }
      } else {
        if(data.color) {
          target.borderColor = data.color;
        }
      }
      if(data.type == "bar" || data.type == "area") {
        if(typeof data.opacity === 'undefined') {
          target.backgroundColor = target.borderColor;
        }
        else {
          const opacity = parseInt(((1-data.opacity)*100));
          target.backgroundColor = target.borderColor+opacity;
          target.borderColor = target.borderColor+opacity;
        }
      }
      if(data.type && data.type === "area") {
        data.type = "line";
        data.fill = "origin";
      }
      if(!data.fill) {
        target.fill = "false";
      }
      if (!data.pointRadius) {
        target.pointRadius = autoConfig.pointRadius;
      }
      if (!data.lineTension) {
        target.lineTension = autoConfig.lineTension;
      }
      if (!data.borderWidth) {
        target.borderWidth = autoConfig.borderWidth;
      }
    });
  },
};

Chart.plugins.register(autoConfigPlugin);

export default autoConfigPlugin;

import Chart from "chart.js";

let colors = [
  "#030d28", //Navy Dark
  "#092dbd", //Navy Light
  "#00b057", //Green
  "#b00f00",
  "#00b09e",
  "#b000aa",
  "#b00009",
  "#b0a400",
];

let barColors = [
  "#8e9093", //Gray
  "#6a7abc",
];

const autoConfig = {
  pointRadius: 0,
  lineTension: 0,
  borderWidth: 2,
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

    //remove default color from array if it is already taken
    datasets.forEach((data) => {
      if (!data.color && !data.borderColor) {
        const color = data.color ? data.color : data.borderColor;
        let index = colors.indexOf(color);
        if (index > -1) {
          colors.splice(index, 1);
        }
        index = barColors.indexOf(color);
        if (index > -1) {
          barColors.splice(index, 1);
        }
      }
    });

    let i = 1;
    let j = 0;
    let randomColor = null;

    //iterate through the all data sets
    datasets.forEach((dataset) => {
      let target = dataset;

      //define type of chart (line, bar)
      if (dataset.type) {
        if (dataset.type === "area") {
          if(dataset.spline) {
            target.lineTension = 0.3;
          }
          target.type = "line";
          target.fill = "origin";
          target.borderWidth = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          };
        }

        if(dataset.type === "spline") {
          target.type = "line";
          target.lineTension = 0.3;
        }

        if (dataset.type === "bar") {
          target.fill = "origin";
          target.borderWidth = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          };
        }
      } else {
        target.type = "line";
      }

      if (!dataset.fill) {
        target.fill = "false";
      }

      if (dataset.color && !dataset.borderColor)
        target.borderColor = dataset.color;

      //assign chart color in accordance with type and mode
      if (!dataset.color && !dataset.borderColor) {
        if (chart.config.mode !== "comparision") {
          if (i <= colors.length) {
            target.borderColor = colors[i];
            i++;
          } else {
            randomColor =
              "#" + Math.round(Math.random() * 0xffffff).toString(16);
            target.borderColor = randomColor;
          }
        } else if (dataset.type === "line") {
          target.borderColor = colors[0];
        }
      }

      if (dataset.type === "bar") {
        if (chart.config.mode === "comparision") {
          if (j <= barColors.length) {
            target.borderColor = barColors[j];
            j++;
          } else {
            randomColor =
              "#" + Math.round(Math.random() * 0xffffff).toString(16);
            target.borderColor = randomColor;
          }
        }
      }

      //correct color if opacity is defined
      if (typeof target.opacity !== "undefined") {
        let opacity = parseInt((1 - target.opacity) * 100);
        if (target.opacity >= 0.9) opacity = "11";

        const colorWithOpacity = target.borderColor + opacity;
        target.borderColor = colorWithOpacity;
      }

      //area color
      if (
        (target.fill && target.fill === "origin") ||
        target.type === "area" ||
        target.type === "bar"
      ) {
        target.backgroundColor = target.borderColor;
        target.fill = "origin";
      }
      if (!target.pointRadius) {
        target.pointRadius = autoConfig.pointRadius;
      }
      if (!target.lineTension) {
        target.lineTension = autoConfig.lineTension;
      }
      if (!target.borderWidth) {
        target.borderWidth = autoConfig.borderWidth;
      }
    });

    // datasets.forEach((data) => {
    //   let target = data;
    //   if (!data.color) {
    //     if (data.type !== "bar") {
    //       if (i <= colors.length) {
    //         target.borderColor = colors[i];
    //         i++;
    //       } else {
    //         randomColor =
    //           "#" + Math.round(Math.random() * 0xffffff).toString(16);
    //         randomFillColor = randomColor + "33";
    //         target.borderColor = randomColor;
    //       }
    //     } else {
    //       target.borderColor = barColors[0];
    //       if (typeof data.opacity === "undefined") {
    //         target.backgroundColor = target.borderColor;
    //       } else {
    //         const opacity = parseInt((1 - data.opacity) * 100);
    //         target.backgroundColor = target.borderColor + opacity;
    //         target.borderColor = target.borderColor + opacity;
    //       }
    //     }

    //     // If you use a fill, fill with the same color
    //     if (
    //       (typeof target.fill === "undefined" || target.fill) &&
    //       !target.backgroundColor
    //     ) {
    //       if (chart.config.type === "bar") {
    //         target.backgroundColor = barColors[0];
    //       } else if (chart.config.type === "line") {
    //         target.backgroundColor = randomFillColor;
    //       }
    //     }
    //   } else {
    //     if (data.color) {
    //       target.borderColor = data.color;
    //     }
    //   }
    //   if (data.type === "bar" || data.type === "area") {
    //     if (typeof data.opacity === "undefined") {
    //       target.backgroundColor = target.borderColor;
    //     } else {
    //       const opacity = parseInt((1 - data.opacity) * 100);
    //       target.backgroundColor = target.borderColor + opacity;
    //       target.borderColor = target.borderColor + opacity;
    //     }
    //   }
    //   if (data.type && data.type === "area") {
    //     data.type = "line";
    //     data.fill = "origin";
    //   }
    //   if (!data.fill) {
    //     target.fill = "false";
    //   }
    //   if (!data.pointRadius) {
    //     target.pointRadius = autoConfig.pointRadius;
    //   }
    //   if (!data.lineTension) {
    //     target.lineTension = autoConfig.lineTension;
    //   }
    //   if (!data.borderWidth) {
    //     target.borderWidth = autoConfig.borderWidth;
    //   }
    // });
  },
};

Chart.plugins.register(autoConfigPlugin);

export default autoConfigPlugin;

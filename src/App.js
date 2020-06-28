import React from "react";
import moment from "moment";

import StudioTimeSeriesChart from "./lib/StudioTimeSeriesChart";

function generateData(num, start) {
  var unit = "day"; //take unit value from outside

  function unitLessThanDay() {
    return unit === "second" || unit === "minute" || unit === "hour";
  }

  function beforeNineThirty(date) {
    return date.hour() < 9 || (date.hour() === 9 && date.minute() < 30);
  }

  // Returns true if outside 9:30am-4pm on a weekday
  function outsideMarketHours(date) {
    if (date.isoWeekday() > 5) {
      return true;
    }
    if (unitLessThanDay() && (beforeNineThirty(date) || date.hour() > 16)) {
      return true;
    }
    return false;
  }

  function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }

  function randomBar(date, lastClose) {
    var open = randomNumber(lastClose * 0.95, lastClose * 1.05).toFixed(2);
    var close = randomNumber(open * 0.95, open * 1.05).toFixed(2);
    return {
      t: date.valueOf(),
      y: close,
    };
  }

  var date = moment(start, "MMM DD YYYY");
  var now = moment();
  var data = [];
  var lessThanDay = unitLessThanDay();
  for (
    ;
    data.length < num && date.isBefore(now);
    date = date.clone().add(1, unit).startOf(unit)
  ) {
    if (outsideMarketHours(date)) {
      if (!lessThanDay || !beforeNineThirty(date)) {
        date = date
          .clone()
          .add(date.isoWeekday() >= 5 ? 8 - date.isoWeekday() : 1, "day");
      }
      if (lessThanDay) {
        date = date.hour(9).minute(30).second(0);
      }
    }
    data.push(randomBar(date, data.length > 0 ? data[data.length - 1].y : 30));
  }
  return data;
}

class App extends React.Component {
  render() {

    const datasets = [
      {
        key: "Black data",
        color: "black",
        data: generateData(40, "Jan 01 1990"),
        showMaxLine: true,
      },
      // {
      //   key: "Area data",
      //   color: "#00ff00",
      //   opacity: 0.3,
      //   data: generateData(20, "Jan 01 1990"),
      //   type: "area",
      // },
      // {
      //   key: "Yellow data",
      //   // backgroundColor: "#d4d43933",
      //   // borderColor: "#d4d43933",
      //   data: generateData(20, "Jan 01 1990"),
      //   // type: "line",
      //   // fill: "origin",
      // },
      // {
      //   key: "Green data",
      //   // backgroundColor: "#36cf5c33",
      //   // borderColor: "#36cf5c33",
      //   data: generateData(20, "Jan 01 1990"),
      //   // type: "line",
      //   // fill: "origin",
      // },
      {
        key: "Bar data",
        data: generateData(40, "Jan 01 1990"),
        opacity: 0.3,
        type: "bar",
      },
    ];

    // const dataSet = {
    //   key: 'set1',
    //   showMaxLine: true,
    //   data: [{
    //     value: 2,
    //     timestamp: 100001
    //   }, {
    //     value: 7,
    //     timestamp: 100002
    //   }, {
    //     value: 7,
    //     timestamp: 100003
    //   }, {
    //     value: 6,
    //     timestamp: 100004
    //   }]
    // };
    // const dataSets = [ dataSet ];

    return (
      <StudioTimeSeriesChart
        datasets={datasets}
        height={500}
        yAxisLabel="test"
      />
    );
  }
}

export default App;

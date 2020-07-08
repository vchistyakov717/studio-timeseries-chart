import moment from "moment";

export function generateData(num, start) {
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
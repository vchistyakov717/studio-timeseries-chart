/*jshint esversion: 6 */
import React from 'react';
import PropTypes from 'prop-types';

import Chart from './Chart';

const configValidation = (config) => {
  const validConfig = config;

  if (!config.type) validConfig.type = 'line';

  return validConfig;
};

const StudioChart = (props) => {
  const config = props.config;

  /* jshint ignore:start */
  return (
    <div
      style={{
        height: config.height ? config.height : props.height,
        position: 'relative',
      }}
    >
      <Chart config={configValidation(config)} />
    </div>
  );
  /* jshint ignore:end */
};

StudioChart.propTypes = {
  height: PropTypes.PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  config: PropTypes.object
};

StudioChart.defaultProps = {
  height: 300,
};

export default StudioChart;

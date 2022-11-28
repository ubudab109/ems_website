import React from "react";
import PropTypes from 'prop-types';

const style = {
  filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
  borderRadius: '5px',
  background: '#19C8FF',
  color: 'white',
};

const ButtonBlueFilter = ({ name, onClick }) => (
  <button className="btn mr-5" style={style} onClick={onClick}>
    {name}
  </button>
);

ButtonBlueFilter.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default ButtonBlueFilter;

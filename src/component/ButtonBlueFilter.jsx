import React from "react";
import PropTypes from 'prop-types';



const ButtonBlueFilter = ({ name, onClick, disabled, type, style }) => (
  <button className="btn mr-5" style={{
    filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
    borderRadius: '5px',
    background: '#19C8FF',
    color: 'white',
    ...style,
  }} onClick={onClick} disabled={disabled} type={type}>
    {name}
  </button>
);

ButtonBlueFilter.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  style: PropTypes.object,
};

ButtonBlueFilter.defaultProps = {
  disabled: false,
  type: 'button',
};

export default ButtonBlueFilter;

import React from "react";
import PropTypes from 'prop-types';

const ButtonOrangeFilter = ({ name, onClick, disabled, type, style }) => (
  <button className="btn mr-5" style={{
    filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
    borderRadius: '5px',
    background: '#FF5900',
    color: 'white',
    ...style
  }} onClick={onClick} disabled={disabled} type={type}>
    {name}
  </button>
);

ButtonOrangeFilter.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  style: PropTypes.object,
};

ButtonOrangeFilter.defaultProps = {
  disabled: false,
  type: 'button',
};

export default ButtonOrangeFilter;

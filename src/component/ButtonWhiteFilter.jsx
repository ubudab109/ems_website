import React from 'react';
import PropTypes from 'prop-types';

const style = {
  filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
  borderRadius: '5px',
  background: 'white',
};

const ButtonWhiteFilter = ({ name, onClick, disabled, className, color, type }) => (
  <button type={type} className={`${className} btn mr-5`} style={{...style, color: color}} onClick={onClick} disabled={disabled}>
    {name}
  </button>
);

ButtonWhiteFilter.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  color: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
};

ButtonWhiteFilter.defaultProps = {
  disabled: false,
  className: "",
  color: '#00617F',
  type: 'button',
};

export default ButtonWhiteFilter;

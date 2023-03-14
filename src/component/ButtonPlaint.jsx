import React from 'react';
import PropTypes from 'prop-types';


const ButtonPlaint = ({ 
  name, 
  onClick, 
  margin, 
  disabled, 
  background, 
  color,
  className,
}) => (
  <button 
  className={`btn mr-5 ${className}`}
  disabled={disabled}
  style={
    {
      filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
      borderRadius: '5px',
      background: background,
      color: color,
      margin: margin,
    }
  } 
  onClick={onClick}>
    {name}
  </button>
);

ButtonPlaint.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  margin: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

ButtonPlaint.defaultProps = {
  margin: '0px',
  disabled: false,
  background: 'white',
  color: 'black',
  className: '',
}

export default ButtonPlaint;

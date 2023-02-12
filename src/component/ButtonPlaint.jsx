import React from 'react';
import PropTypes from 'prop-types';


const ButtonPlaint = ({ 
  name, 
  onClick, 
  margin, 
  disabled, 
  background, 
  color,
}) => (
  <button 
  className="btn mr-5"
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
};

ButtonPlaint.defaultProps = {
  margin: '0px',
  disabled: false,
  background: 'white',
  color: 'black'
}

export default ButtonPlaint;

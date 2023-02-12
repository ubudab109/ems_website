import React from 'react';
import PropTypes from 'prop-types';

const style = {
  filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
  borderRadius: '5px',
  background: 'white',
  color: '#00617F',
};

const ButtonWhiteFilter = ({ name, onClick, disabled }) => (
  <button className="btn mr-5" style={style} onClick={onClick} disabled={disabled}>
    {name}
  </button>
);

ButtonWhiteFilter.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

ButtonWhiteFilter.defaultProps = {
  disabled: false,
};

export default ButtonWhiteFilter;

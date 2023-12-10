import React from 'react';
import PropTypes from 'prop-types';

const ButtonNotPermissions = ({ 
  handleClick,
  className,
  name,
}) => {
  return (
    <button className={className} onClick={handleClick}>{name}</button>
  );
};

ButtonNotPermissions.propTypes = {
  handleClick: PropTypes.func,
  className: PropTypes.string,
  name: PropTypes.string,
};

ButtonNotPermissions.defaultProps = {
  handleClick: null,
  className: 'btn-detail',
  name: 'View',
};

export default ButtonNotPermissions;

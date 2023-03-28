import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { isActionAllowed } from '../utils/helper';

const ButtonPermissions = ({ 
  scopePermission, 
  permissionName, 
  handleClick,
  className,
  name,
}) => {
  const permissionData = useSelector(state => state.auth.permissions.filter(e => e.name === scopePermission )[0]); // get permission 
  if(isActionAllowed(permissionData.permissions, permissionName)) {
    return (
      <button className={className} onClick={handleClick}>{name}</button>
    );
  } else {
    return (null);
  }
};

ButtonPermissions.propTypes = {
  scopePermission: PropTypes.string.isRequired,
  permissionName: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
  className: PropTypes.string,
  name: PropTypes.string,
};

ButtonPermissions.defaultProps = {
  handleClick: null,
  className: 'btn-detail',
  name: 'View',
};

export default ButtonPermissions;

import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { isActionAllowed } from '../utils/helper';

const ButtonPermissions = ({ 
  scopePermission, 
  permissionName, 
  handleClick,
  className,
}) => {
  const permissionData = useSelector(state => state.auth.permissions.filter(e => e.name === scopePermission )[0]); // get permission 
  if(isActionAllowed(permissionData.permissions, permissionName)) {
    return (
      <button className={className} onClick={handleClick}>View</button>
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
};

ButtonPermissions.defaultProps = {
  handleClick: null,
  className: 'btn-detail',
};

export default ButtonPermissions;

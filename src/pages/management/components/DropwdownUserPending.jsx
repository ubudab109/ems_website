import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { isActionAllowed } from '../../../utils/helper';
import { CustomMenu, CustomToggle } from '../../components/DropdownCustomToggle';



const DropdownUserPending = ({
  onResend, onCancel
}) => {

  const permissionData = useSelector(state => state.auth.permissions.filter(e => e.name === 'Management')[0]); // get permission for management, to check if current user if can access a few menu in this views

  const canResend=isActionAllowed(permissionData.permissions, 'user-management-permission-resend');
  const canCancel=isActionAllowed(permissionData.permissions, 'user-management-permission-delete');
  
  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle} >
        <FontAwesomeIcon
          icon={faEllipsisVertical}
          style={{
            color: '#AAAAAA'
          }}
        />
      </Dropdown.Toggle>
      <Dropdown.Menu as={CustomMenu}>
        <Dropdown.Header style={{ paddingLeft: '0px' }}>Select Action</Dropdown.Header>
        <Dropdown.Divider />
        {
          canResend ?
            <Dropdown.Item eventkey="1" onClick={onResend} style={{ paddingLeft: '0px' }}>Resend Invitation</Dropdown.Item>
            : null
        }
        {
          canCancel ?
            <Dropdown.Item eventkey="2" onClick={onCancel} style={{ paddingLeft: '0px' }}>Cancel Invite</Dropdown.Item>
            : null
        }
      </Dropdown.Menu>
    </Dropdown>
  );
};

DropdownUserPending.propTypes = {
  onView: PropTypes.func,
  onChangeRole: PropTypes.func,
  onRemove: PropTypes.func,
  idDropdown: PropTypes.any,
};


export default DropdownUserPending;

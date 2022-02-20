/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

export const CustomToggle = forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    style={{
      paddingRight : '24px'
    }}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </a>
));

export const CustomMenu = forwardRef(
  ({
    children, style, className, 'aria-labelledby': labeledBy,
  }, ref) => {
    return (
      <div
        ref={ref}
        style={style}
        className={className + ' card-shadow min-w-auto'}
        aria-labelledby={labeledBy}
      >
        <div className="card-body">
          <ul className="text-table">
            {children}
          </ul>
        </div>
      </div>
    );
  },
);

const DropdownUserAccepted = ({
  onView, onChangeRole, onRemove, isUserSuperadmin, canView, canChange
}) => {
  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle} >
        <FontAwesomeIcon
          icon={faEllipsisVertical}
          style={{
            color : '#AAAAAA'
          }}
        />
      </Dropdown.Toggle>
      <Dropdown.Menu as={CustomMenu}>
        <Dropdown.Header style={{paddingLeft : '0px'}}>Select Action</Dropdown.Header>
        <Dropdown.Divider />
        {
          canView 
          ?
            <Dropdown.Item eventkey="1" onClick={onView} style={{paddingLeft : '0px'}}>View Detail</Dropdown.Item>
          : null
        }
        {
          canChange 
          ?
            <Dropdown.Item eventkey="2" onClick={onChangeRole} style={{paddingLeft : '0px'}}>Change Role</Dropdown.Item>
          : null
        }
        {
          isUserSuperadmin ? null : <Dropdown.Item eventkey="3" onClick={onRemove} style={{paddingLeft : '0px'}}>Remove</Dropdown.Item>
        }
      </Dropdown.Menu>
    </Dropdown>
  );
};

DropdownUserAccepted.propTypes = {
  onView: PropTypes.func,
  onChangeRole: PropTypes.func,
  onRemove: PropTypes.func,
  idDropdown: PropTypes.any,
  isUserSuperadmin: PropTypes.bool,
  canView: PropTypes.bool,
  canChange: PropTypes.bool,
};

DropdownUserAccepted.defaultProps = {
  canView : true,
  canChange: true,
}

export default DropdownUserAccepted;

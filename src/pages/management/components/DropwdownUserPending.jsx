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
      paddingRight: '24px'
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

const DropdownUserPending = ({
  onResend, onCancel, canResend, canCancel
}) => {
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
  canResend: PropTypes.bool,
  canCancel: PropTypes.bool,
};

DropdownUserPending.defaultProps = {
  canResend : true,
  canCancel : true,
};

export default DropdownUserPending;

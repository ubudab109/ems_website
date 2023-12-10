/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { isActionAllowed } from "../../../utils/helper";

export const CustomToggle = forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    style={{
      margin: 0,
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
  ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
    return (
      <div
        ref={ref}
        style={style}
        className={className + " card-shadow min-w-auto"}
        aria-labelledby={labeledBy}
      >
        <div className="card-body">
          <ul className="text-table">{children}</ul>
        </div>
      </div>
    );
  }
);

const DropdownUserAccepted = ({
  onView,
  onChangeRole,
  onRemove,
  isUserSuperadmin,
  currentUserId,
}) => {
  const permissionData = useSelector(
    (state) => state.auth.permissions.filter((e) => e.name === "Management")[0]
  ); // get permission for management, to check if current user if can access a few menu in this views
  const canView = isActionAllowed(
    permissionData.permissions,
    "user-management-permission-detail"
  );
  const canChange = isActionAllowed(
    permissionData.permissions,
    "user-management-permission-update"
  );
  const userId = useSelector((state) => state.auth.dataUser.id);
  const isSuperAdminRole = useSelector((state) => state.auth.isSuperAdmin);

  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle}>
        <FontAwesomeIcon
          icon={faEllipsisVertical}
          style={{
            color: "#AAAAAA",
          }}
        />
      </Dropdown.Toggle>
      <Dropdown.Menu as={CustomMenu}>
        <Dropdown.Header style={{ paddingLeft: "0px" }}>
          Select Action
        </Dropdown.Header>
        <Dropdown.Divider />
        {canView ? (
          <Dropdown.Item
            eventkey="1"
            onClick={onView}
            style={{ paddingLeft: "0px" }}
          >
            View Detail
          </Dropdown.Item>
        ) : null}
        {canChange ? (
          <Dropdown.Item
            eventkey="2"
            onClick={onChangeRole}
            style={{ paddingLeft: "0px" }}
          >
            Change Role
          </Dropdown.Item>
        ) : null}
        {isSuperAdminRole ? null : isUserSuperadmin &&
          currentUserId === userId ? null : (
          <Dropdown.Item
            eventkey="3"
            onClick={onRemove}
            style={{ paddingLeft: "0px" }}
          >
            Remove
          </Dropdown.Item>
        )}
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
};

export default DropdownUserAccepted;

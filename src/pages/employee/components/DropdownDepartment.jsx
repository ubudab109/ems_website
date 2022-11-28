import React from "react";
import { Dropdown } from "react-bootstrap";
import PropTypes from "prop-types";
import {
  CustomMenu,
  CustomToggle,
} from "../../components/DropdownCustomToggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const DropdownDepartment = ({
  onEdit,
  onRemove,
  isEditAllowed,
  isRemoveAllowed,
}) => {
  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle}>
        <FontAwesomeIcon
          style={{ paddingRight: "7px" }}
          className="pl-20 pt-3"
          icon={faBars}
          color="#00617F"
        />
      </Dropdown.Toggle>
      <Dropdown.Menu as={CustomMenu}>
        {isEditAllowed ? (
          <Dropdown.Item className="text-center" onClick={onEdit} eventkey="1">
            Edit
          </Dropdown.Item>
        ) : null}
        <Dropdown.Divider />
        {isRemoveAllowed ? (
          <Dropdown.Item
            className="text-center"
            eventkey="2"
            onClick={onRemove}
          >
            Remove
          </Dropdown.Item>
        ) : null}
      </Dropdown.Menu>
    </Dropdown>
  );
};

DropdownDepartment.propTypes = {
  onEdit: PropTypes.func,
  onRemove: PropTypes.func,
  isEditAllowed: PropTypes.bool,
  isRemoveAllowed: PropTypes.bool,
};

export default DropdownDepartment;

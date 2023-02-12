import React from "react";
import { useSelector } from "react-redux";
import { isActionAllowed } from "../../../utils/helper";
import { Dropdown } from "react-bootstrap";
import {
  CustomMenu,
  CustomToggle,
} from "../../components/DropdownCustomToggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const DropdownAttendance = ({ onViewDetail, onEdit }) => {
  //get permission scope attendance
  const permissionData = useSelector((state) =>
    state.auth.permissions.filter((e) => e.name === "Attendance")
  )[0];

  const canViewDetail = isActionAllowed(
    permissionData.permissions,
    "attendance-management-detail"
  );

  const canEdit = isActionAllowed(
    permissionData.permissions,
    "attendance-management-edit"
  );

  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle}>
        <FontAwesomeIcon
          icon={faBars}
          style={{
            color: "#00617F",
          }}
        />
      </Dropdown.Toggle>
      <Dropdown.Menu as={CustomMenu}>
        {canViewDetail ? (
          <>
            <Dropdown.Item
              eventkey="1"
              onClick={onViewDetail}
              style={{ paddingLeft: "0px" }}
              className="text-center text-bold"
            >
              Detail
            </Dropdown.Item>
            <Dropdown.Divider />
          </>
        ) : null}
        {canEdit ? (
          <>
            <Dropdown.Item
              eventkey="2"
              onClick={onEdit}
              className="text-center text-bold"
              style={{ paddingLeft: "0px" }}
            >
              Edit
            </Dropdown.Item>
          </>
        ) : null}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownAttendance;

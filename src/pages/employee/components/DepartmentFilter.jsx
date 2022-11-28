import React, { Fragment } from "react";
import PropTypes from "prop-types";
import DropdownDepartment from "./DropdownDepartment";


const DepartmentFilter = ({
  idDepartment,
  departmenName,
  isActive,
  onClick,
  isEditAllowed,
  isRemoveAllowed,
  onEdit,
  onRemove,
}) => {
  return (
    <Fragment>
      <div className="d-flex flex-wrap justify-content-between cursor-pointer">
        <div
          onClick={onClick}
          className={
            isActive ? "bg-grey col-10 pl-20 pt-2" : "col-10 pl-20 pt-2"
          }
        >
          <p>{departmenName}</p>
        </div>
        {idDepartment !== 0 ? (
          <DropdownDepartment 
            onEdit={onEdit}
            onRemove={onRemove}
            isEditAllowed={isEditAllowed}
            isRemoveAllowed={isRemoveAllowed}
          />
        ) : null}
        <div className="divider-card-black"></div>
      </div>
    </Fragment>
  );
};

DepartmentFilter.propTypes = {
  idDepartment: PropTypes.number.isRequired,
  departmenName: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
  isEditAllowed: PropTypes.bool,
  isRemoveAllowed: PropTypes.bool,
  onEdit: PropTypes.func,
  onRemove: PropTypes.func
};

export default DepartmentFilter;

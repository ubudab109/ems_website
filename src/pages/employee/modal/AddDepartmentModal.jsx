import React, { Fragment } from "react";
import PropTypes from "prop-types";

const AddDepartmentModal = ({ 
  data, 
  onChangeDivision,
}) => {
  return (
    <Fragment>
      <div className="form-group">
        <label htmlFor="division_name">
          Division Name <span className="text-red">*</span>
        </label>
        <input
          type="text"
          required
          className="form-control input-text-custom"
          id="division_name"
          name="division_name"
          onChange={onChangeDivision}
          value={data.division_name}
        />
      </div>
    </Fragment>
  );
};

AddDepartmentModal.propTypes = {
  data: PropTypes.object.isRequired,
};

export default AddDepartmentModal;

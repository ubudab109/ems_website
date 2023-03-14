import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { SALARY_TYPE_VALUE } from "../../../../utils/constant";
import { filterStyles } from "../../../../style-component/ReactSelectFilterTable";

const AddSalaryModal = ({ data, onChangeForm, onChangeType }) => {
  return (
    <Fragment>
      <div className="form-group mb-3">
        <label htmlFor="division_name">
          Salary Name <span className="text-red">*</span>
        </label>
        <input
          type="text"
          required
          className="form-control input-border-gray"
          id="division_name"
          name="division_name"
          onChange={onChangeForm}
          value={data.name}
        />
      </div>
      <div className="form-group">
        <label htmlFor="division_name">
          Type <span className="text-red">*</span>
        </label>
        <Select
          id="type-salary"
          name="type"
          options={SALARY_TYPE_VALUE}
          className="input-border-gray"
          styles={filterStyles}
          isClearable={false}
          onChange={onChangeType}
          placeholder={"Salary Type..."}
          value={data.type}
        />
      </div>
    </Fragment>
  );
};

AddSalaryModal.propTypes = {
  data: PropTypes.object,
  onChangeForm: PropTypes.func,
  onChangeType: PropTypes.func,
};

AddSalaryModal.defaultProps = {
  data: {
    name: 'type',
    value: 'income',
    label: 'Income'
  }
};

export default AddSalaryModal;

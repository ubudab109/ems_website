import React, { Fragment } from "react";
import Select from "react-select";
import PropTypes from 'prop-types';
import { filterStyles } from "../../../style-component/ReactSelectFilterTable";

const ModalGeneratePayroll = ({
  checked,
  employeeData,
  employeeIdData,
  onChangeCheckbox,
  onChange,
}) => {
  return (
    <Fragment>
      <div className="row">
        <div className="col-md-12">
          <div className="row mb-2">
            <div className="col-12">
              <label htmlFor="status">Select Employee</label>
              <Select
                id="status"
                className="high-index mr-5"
                isMulti
                isDisabled={checked}
                options={employeeData}
                value={employeeIdData}
                styles={filterStyles}
                isClearable={true}
                onChange={onChange}
              />
              <span className="mt-2 mb-2">Or</span>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  onChange={onChangeCheckbox}
                  value=""
                  id="defaultCheck1"
                />
                <label className="form-check-label" htmlFor="defaultCheck1">
                  Generate All Employee
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

ModalGeneratePayroll.propTypes = {
  checked: PropTypes.bool,
  employeeData: PropTypes.array,
  employeeIdData: PropTypes.array,
  onChange: PropTypes.func,
};

ModalGeneratePayroll.defaultProps = {
  checked: false,
  employeeData: [],
  employeeIdData: [],
};

export default ModalGeneratePayroll;

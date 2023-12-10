import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { filterStyles } from "../../../../style-component/ReactSelectFilterTable";

const ManagerForm = ({ data, selected, onChange }) => (
  <Fragment>
    <div className="col-md-12">
      <div className="form-group col-md-12">
        <label htmlFor="" className="text-bold">Manager Data</label>
        <Select
          id="province_id"
          name="province_id"
          required
          options={data}
          styles={filterStyles}
          isClearable={false}
          onChange={onChange}
          placeholder={"Select Manager"}
          value={selected}
        />
      </div>
    </div>
  </Fragment>
);

ManagerForm.propTypes = {
  data: PropTypes.array.isRequired,
  selected: PropTypes.func,
  onChange: PropTypes.func
};

ManagerForm.propTypes = {

  onChange : () => null
};

export default ManagerForm;

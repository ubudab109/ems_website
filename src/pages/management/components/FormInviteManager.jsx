import React, { Fragment } from "react";
import Select from "react-select";
import PropTypes from "prop-types";

const FormInviteManager = ({
  isFetchingEmployee,
  optionsEmployee,
  customStyles,
  onChangeSelectEmployee,
  selectedEmployee,
  optionsRole,
  selectedRole,
  onChangeSelectedRole,
  onChangeCheckbox,
  isUseEmail,
  detailEmployee,
  formUseEmail,
  onChangeFormUseEmail,
}) => (
  <Fragment>
    <div className="form-group">
      <label htmlFor="name" className="text-blue-dark my-2">
        Name
      </label>
      {isUseEmail ? (
        <input
          type="text"
          name="name"
          required
          placeholder="Fullname"
          onChange={onChangeFormUseEmail}
          value={formUseEmail.name}
          id="name"
          className="form-control input-text-custom"
        />
      ) : (
        <Select
          id="name"
          options={optionsEmployee}
          styles={customStyles}
          onChange={onChangeSelectEmployee}
          value={selectedEmployee}
        />
      )}
      <div className="form-check">
        <input
          onChange={onChangeCheckbox}
          checked={isUseEmail}
          type="checkbox"
          name="use_email"
          id="use_email"
          className="form-check-input"
        />
        <label className="form-check-label" htmlFor="exampleCheck1">
          {isUseEmail ? "Get From Employee" : "Use New Data"}
        </label>
      </div>
    </div>
    <div className="form-group">
      <label htmlFor="email" className="text-blue-dark my-2">
        Email
      </label>
      {isUseEmail ? (
        <input
          type="text"
          name="email"
          id="email"
          placeholder="example@example.com"
          required
          onChange={onChangeFormUseEmail}
          className="form-control input-text-custom"
          value={formUseEmail.email}
        />
      ) : (
        <input
          type="text"
          name="email"
          id="email"
          readOnly
          className="form-control input-text-custom"
          value={isFetchingEmployee ? "Getting Data..." : detailEmployee.email}
        />
      )}
    </div>
    <div className="form-group">
      <label htmlFor="role" className="text-blue-dark my-2">
        Role
      </label>
      <Select
        id="role"
        options={optionsRole}
        styles={customStyles}
        value={selectedRole}
        required
        defaultValue={"test"}
        onChange={onChangeSelectedRole}
      />
    </div>
    {!isUseEmail ? (
      <div className="form-group">
        <label htmlFor="nip" className="text-blue-dark my-2">
          NIP
        </label>
        <input
          type="text"
          name="nip"
          id="nip"
          readOnly
          className="form-control input-text-custom"
          value={isFetchingEmployee ? "Getting Data..." : detailEmployee.nip}
        />
      </div>
    ) : null}
  </Fragment>
);

FormInviteManager.propTypes = {
  isFetchingEmployee: PropTypes.bool.isRequired,
  optionsEmployee: PropTypes.array.isRequired,
  customStyles: PropTypes.object.isRequired,
  onChangeSelectEmployee: PropTypes.func,
  selectedEmployee: PropTypes.object.isRequired,
  optionsBranch: PropTypes.object,
  onChangeSelectBranch: PropTypes.func,
  selectedBranch: PropTypes.object,
  optionsRole: PropTypes.array.isRequired,
  selectedRole: PropTypes.object.isRequired,
  onChangeSelectedRole: PropTypes.func,
  detailEmployee: PropTypes.object,
  onChangeCheckbox: PropTypes.func,
  isUseEmail: PropTypes.bool,
  formUseEmail: PropTypes.object,
  onChangeFormUseEmail: PropTypes.func,
};

FormInviteManager.defaultProps = {
  isUseEmail: false,
};

export default FormInviteManager;

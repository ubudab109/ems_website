import React, { Fragment } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { customStyles } from '../../../style-component/ReactSelectCustomStyle';

const FormInviteSuperadmin = ({
  name,
  nip,
  email,
  onChangeText,
  onChangeSelect,
  onChangeSelectRoleAdmin,
  optionsBranch,
  selectedBranch,
  optionsRoles,
  selectedRoles,
}) => (
  <Fragment>
    <div className="form-group">
      <label htmlFor="name" className="text-blue-dark my-2">Name</label>
      <input type="text" name="name" id="name" onChange={onChangeText} value={name} className="form-control input-text-custom" />
    </div>
    <div className="form-group">
      <label htmlFor="name" className="text-blue-dark my-2">Branch</label>
      <Select
        id="name"
        options={optionsBranch}
        styles={customStyles}
        onChange={onChangeSelect}
        value={selectedBranch}
      />
    </div>
    <div className="form-group">
      <label htmlFor="name" className="text-blue-dark my-2">Role</label>
      <Select
        id="name"
        options={optionsRoles}
        isDisabled={selectedBranch.value === ""}
        styles={customStyles}
        onChange={onChangeSelectRoleAdmin}
        value={selectedRoles}
      />
      {
        selectedBranch.value !== "" && optionsRoles.length < 1 ? (
          <span className="text-red text-bold">This Branch not have any roles. The manager will automatically invited as Head Branch</span>
        ) : null
      }
    </div>
    <div className="form-group">
      <label htmlFor="nip" className="text-blue-dark my-2">NIP</label>
      <input
        type="text"
        name="nip"
        id="nip"
        value={nip}
        onChange={onChangeText}
        className="form-control input-text-custom"
      />
    </div>
    <div className="form-group">
      <label htmlFor="email" className="text-blue-dark my-2">Email</label>
      <input
        type="text"
        name="email"
        id="email"
        value={email}
        className="form-control input-text-custom"
        onChange={onChangeText}
      />
    </div>
  </Fragment>
);

FormInviteSuperadmin.propTypes = {
  name: PropTypes.string,
  nip: PropTypes.string,
  email: PropTypes.string,
  onChangeText: PropTypes.func,
  onChangeSelect: PropTypes.func,
  onChangeSelectRoleAdmin: PropTypes.func,
  optionsBranch: PropTypes.array,
  selectedBranch: PropTypes.object,
  optionsRoles: PropTypes.array,
  selectedRoles: PropTypes.object,
};

FormInviteSuperadmin.defaultProps = {
  name: "",
  nip: "",
  email: "",
  selectedBranch: {
    name: "branch",
    value: "",
    label: "Select Branch..."
  },
  optionsRoles: [],
  selectedRoles: {
    name: "role",
    value: "",
    label: "Select Role..."
  },
};

export default FormInviteSuperadmin;

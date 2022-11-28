import React, { Fragment } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

const FormInviteManager = ({
  isFetchingEmployee,
  optionsEmployee,
  customStyles,
  onChangeSelectEmployee,
  selectedEmployee,
  optionsRole,
  selectedRole,
  onChangeSelectedRole,
  detailEmployee
}) => (
  <Fragment>
    <div className="form-group">
      <label htmlFor="name" className="text-blue-dark my-2">Name</label>
      <Select
        id="name"
        options={optionsEmployee}
        styles={customStyles}
        onChange={onChangeSelectEmployee}
        value={selectedEmployee}
      />
    </div>
    <div className="form-group">
      <label htmlFor="role" className="text-blue-dark my-2">Role</label>
      <Select
        id="role"
        options={optionsRole}
        styles={customStyles}
        value={selectedRole}
        defaultValue={'test'}
        onChange={onChangeSelectedRole}
      />
    </div>
    <div className="form-group">
      <label htmlFor="nip" className="text-blue-dark my-2">NIP</label>
      <input
        type="text"
        name="nip"
        id="nip"
        readOnly
        className="form-control input-text-custom"
        value={isFetchingEmployee ? 'Getting Data...' : detailEmployee.nip}
      />
    </div>
    <div className="form-group">
      <label htmlFor="email" className="text-blue-dark my-2">Email</label>
      <input
        type="text"
        name="email"
        id="email"
        readOnly
        className="form-control input-text-custom"
        value={isFetchingEmployee ? 'Getting Data...' : detailEmployee.email}
      />
    </div>
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
  detailEmployee: PropTypes.object
};

export default FormInviteManager;

import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { isNull, ucwords } from "../../../utils/helper";
import WarningIcon from "../../../component/WarningIcon";
import { BLOOD_TYPE, MARITAL_STATUS, RELIGION } from "../../../utils/constant";
import { selectStyles } from "../../../style-component/ReactSelectFilterTable";
import { RequiredIcon } from "../../components/PiecesComponent";
import ButtonBlueFilter from "../../../component/ButtonBlueFilter";

const EmployeeData = ({
  employeeData,
  selectForm,
  isDisabled,
  onChange,
  onChangeSelect,
  onEditClick,
  onChangeExists,
  submitEdit,
  isFetching,
  isValidEmail,
  errorExistType,
  isLoadingEdit,
}) => {
  if (isFetching) {
    return <div className="col-xl-12 mb-4"></div>;
  } else {
    return (
      <div className="col-xl-12 mb-4">
        <div className="float-end p-3">
          <button
            onClick={onEditClick}
            className="btn-plaint"
            style={{ width: "80px" }}
          >
            {isDisabled ? "Edit" : "Cancel"}
          </button>
        </div>
        <div className="d-flex flex-wrap">
          <div className="col-xl-4 col-lg-12 col-md-12 px-3 p-3">
            <h3 className="text-bold mt-1 my-4">Personal Data</h3>
          </div>

          <div className="col-xl-8 col-lg-12 col-md-12 col-sm-12 mb-3">
            <form onSubmit={submitEdit}>
              {/* FULLNAME */}
              {isDisabled ? (
                <div className="row mt-3 px-3">
                  <div className="form-group col-xl-10 col-lg-10 col-md-12 col-sm-12">
                    <label
                      htmlFor="amount"
                      className="text-bold text-blue-dark mb-1"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={
                        employeeData !== null
                          ? employeeData.firstname + " " + employeeData.lastname
                          : ""
                      }
                      className="form-control input-border-grey"
                      name="fullname"
                      id="fullname"
                      placeholder="Fullname"
                      disabled={isDisabled}
                    />
                  </div>
                </div>
              ) : (
                <div className="row mt-3 px-3">
                  <div className="form-group col-xl-5-1 col-lg-6 col-md-6 col-sm-6">
                    <label htmlFor="firstname" className="text-bold">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={employeeData.firstname}
                      className="form-control input-border-grey"
                      name="firstname"
                      id="firstname"
                      onChange={onChange}
                      placeholder="Firstname"
                    />
                    <RequiredIcon />
                  </div>
                  <div className="form-group col-xl-5-1 col-lg-6 col-md-6 col-sm-6 mt-4">
                    <input
                      type="text"
                      value={employeeData.lastname}
                      className="form-control input-border-grey"
                      name="lastname"
                      id="lastname"
                      onChange={onChange}
                      placeholder="Last Name"
                    />
                  </div>
                </div>
              )}

              {/* EMAIL */}
              <div className="row mt-3 px-3">
                <div className="form-group col-xl-10 col-lg-12 col-md-12 col-sm-12">
                  <label
                    htmlFor="amount"
                    className="text-bold text-blue-dark mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    value={employeeData !== null ? employeeData.email : ""}
                    className="form-control input-border-grey"
                    name="email"
                    onChange={onChange}
                    onKeyUp={onChangeExists}
                    id="email"
                    placeholder="example@example.com"
                    disabled={isDisabled}
                  />
                  <span className="text-bold">This email is use for login</span>
                  <br />
                  {errorExistType === "email" && !isDisabled ? (
                    <span className="text-red">
                      User with this email already exists
                    </span>
                  ) : null}
                  {!isValidEmail && !isDisabled ? (
                    <span className="pl-3 text-red">Email not Valid</span>
                  ) : null}
                </div>
              </div>

              {/* MOBILE PHONE AND PHONE NUMBER */}
              <div className="row mt-3 px-3">
                <div className="form-group col-xl-5-1 col-lg-12 col-md-12 col-sm-12 mb-3">
                  <label
                    htmlFor="mobile_phone"
                    className="text-bold text-blue-dark mb-1"
                  >
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    name="mobile_phone"
                    className="form-control input-border-grey"
                    id="mobile_phone"
                    value={
                      employeeData !== null ? employeeData.mobile_phone : ""
                    }
                    disabled={isDisabled}
                    onChange={onChange}
                    placeholder="Mobile phone"
                  />
                </div>
                <div className="form-group col-xl-5-1 col-lg-12 col-md-12 col-sm-12 ">
                  <label
                    htmlFor="phone_number"
                    className="text-bold text-blue-dark mb-1"
                  >
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone_number"
                    value={
                      employeeData.phone_number !== null ? employeeData.phone_number : ""
                    }
                    className="form-control input-border-grey"
                    id="phone_number"
                    onChange={onChange}
                    disabled={isDisabled}
                    placeholder="Phone Number"
                  />
                  {isNull(employeeData.phone_number) ? (
                    <span className="text-light-red">
                      {" "}
                      <WarningIcon /> Please Complete{" "}
                    </span>
                  ) : null}
                </div>
              </div>

              {/* POB AND BIRTHDATE */}
              <div className="row mt-3 px-3">
                <div className="form-group col-xl-5-1 col-lg-12 col-md-12 col-sm-12 mb-3">
                  <label
                    htmlFor="mobile_phone"
                    className="text-bold text-blue-dark mb-1"
                  >
                    Place Of Birth
                  </label>
                  <input
                    type="text"
                    name="pob"
                    className="form-control input-border-grey"
                    id="pob"
                    onChange={onChange}
                    value={employeeData.pob !== null ? employeeData.pob : ""}
                    disabled={isDisabled}
                    placeholder="Place Of Birth"
                  />
                  {isNull(employeeData.pob) ? (
                    <span className="text-light-red">
                      {" "}
                      <WarningIcon /> Please Complete{" "}
                    </span>
                  ) : null}
                </div>
                <div className="form-group col-xl-5-1 col-lg-12 col-md-12 col-sm-12">
                  <label
                    htmlFor="dob"
                    className="text-bold text-blue-dark mb-1"
                  >
                    Birthdate
                  </label>
                  <input
                    type={isDisabled ? "text" : "date"}
                    name="dob"
                    value={
                      !isDisabled ? 
                      (employeeData.dob === null ? '' : employeeData.dob)
                      :
                      (employeeData.dob === null ? '' : employeeData.date_of_birth)
                    }
                    className="form-control input-border-grey"
                    onChange={onChange}
                    id="dob"
                    disabled={isDisabled}
                    placeholder="Date Of Birth"
                  />
                  {isNull(employeeData.dob) ? (
                    <span className="text-light-red">
                      {" "}
                      <WarningIcon /> Please Complete{" "}
                    </span>
                  ) : null}
                </div>
              </div>

              {/* GENDER AND MARITAL STATUS */}
              <div className="row mt-3 px-3">
                <div className="form-group col-xl-5-1 col-lg-12 col-md-12 col-sm-12 mb-3">
                  <label
                    htmlFor="gender"
                    className="text-bold text-blue-dark mb-1"
                  >
                    Gender
                  </label>
                  {isDisabled ? (
                    <>
                      <input
                        type="text"
                        name="gender"
                        className="form-control input-border-grey"
                        id="gender"
                        value={
                          employeeData !== null
                            ? ucwords(employeeData.gender)
                            : ""
                        }
                        disabled
                      />
                      {isNull(employeeData.gender) ? (
                        <span className="text-light-red">
                          {" "}
                          <WarningIcon /> Please Complete{" "}
                        </span>
                      ) : null}
                    </>
                  ) : (
                    <>
                      <div className="form-check form-check-inline mb-3">
                        <input
                          onChange={onChange}
                          checked={employeeData.gender === "male"}
                          value="male"
                          className="form-check-input"
                          type="radio"
                          name="gender"
                          id="male"
                        />
                        <label className="form-check-label" htmlFor="male">
                          Male
                        </label>
                      </div>
                      <div className="form-check form-check-inline mb-3">
                        <input
                          onChange={onChange}
                          checked={employeeData.gender === "female"}
                          value="female"
                          className="form-check-input"
                          type="radio"
                          name="gender"
                          id="female"
                        />
                        <label className="form-check-label" htmlFor="female">
                          Female
                        </label>
                      </div>
                    </>
                  )}
                </div>
                <div className="form-group col-xl-5-1 col-lg-12 col-md-12 col-sm-12">
                  <label
                    htmlFor="phone_number"
                    className="text-bold text-blue-dark mb-1"
                  >
                    Marital Status
                  </label>
                  {isDisabled ? (
                    <>
                      <input
                        type={isDisabled ? "text" : "date"}
                        name="marital_status"
                        value={
                          employeeData.marital_status !== null
                            ? ucwords(employeeData.marital_status)
                            : ""
                        }
                        className="form-control input-border-grey"
                        id="marital_status"
                        disabled
                      />
                      {isNull(employeeData.marital_status) ? (
                        <span className="text-light-red">
                          {" "}
                          <WarningIcon /> Please Complete{" "}
                        </span>
                      ) : null}
                    </>
                  ) : (
                    <Select
                      onChange={onChangeSelect}
                      id="marital_status"
                      name="marital_status"
                      value={selectForm.marital_status}
                      options={MARITAL_STATUS}
                      styles={selectStyles}
                      isClearable={false}
                      placeholder={"Select Status..."}
                    />
                  )}
                </div>
              </div>

              {/* BLOOD TYPE & RELIGION */}
              <div className="row mt-3 px-3">
                <div className="form-group col-xl-5-1 col-lg-12 col-md-12 col-sm-12 mb-3">
                  <label
                    htmlFor="mobile_phone"
                    className="text-bold text-blue-dark mb-1"
                  >
                    Blood Type
                  </label>
                  {isDisabled ? (
                    <>
                      <input
                        type="text"
                        name="blood_type"
                        className="form-control input-border-grey"
                        id="blood_type"
                        value={
                          employeeData.blood_type !== null ? employeeData.blood_type : ""
                        }
                        disabled
                      />
                      {isNull(employeeData.blood_type) ? (
                        <span className="text-light-red">
                          {" "}
                          <WarningIcon /> Please Complete{" "}
                        </span>
                      ) : null}
                    </>
                  ) : (
                    <Select
                      id="blood_type"
                      name="blood_type"
                      options={BLOOD_TYPE}
                      value={selectForm.blood_type}
                      styles={selectStyles}
                      isClearable={false}
                      onChange={onChangeSelect}
                      placeholder={"Select..."}
                    />
                  )}
                </div>
                <div className="form-group col-xl-5-1 col-lg-12 col-md-12 col-sm-12">
                  <label
                    htmlFor="religion"
                    className="text-bold text-blue-dark mb-1"
                  >
                    Religion
                  </label>
                  {isDisabled ? (
                    <>
                      <input
                        type="text"
                        name="religion"
                        value={
                          employeeData.religion !== null ? employeeData.religion : ""
                        }
                        className="form-control input-border-grey"
                        id="religion"
                        placeholder="Employee Religion"
                        disabled
                      />
                      {isNull(employeeData.religion) ? (
                        <span className="text-light-red">
                          {" "}
                          <WarningIcon /> Please Complete{" "}
                        </span>
                      ) : null}
                    </>
                  ) : (
                    <Select
                      id="religion"
                      name="religion"
                      options={RELIGION}
                      value={selectForm.religion}
                      styles={selectStyles}
                      isClearable={false}
                      onChange={onChangeSelect}
                      placeholder={"Select..."}
                    />
                  )}
                </div>
              </div>

              {!isDisabled ? (
                <div className="row mt-3 px-3">
                  <div className="col-md-12">
                  <ButtonBlueFilter disabled={errorExistType !== '' || isLoadingEdit} name={isLoadingEdit ? 'Saving...' : 'Save'} type="submit" />
                  </div>
                </div>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    );
  }
};

EmployeeData.propTypes = {
  employeeData: PropTypes.object.isRequired,
  isDisabled: PropTypes.bool,
  onEditClick: PropTypes.func,
  onChange: PropTypes.func,
  onChangeSelect: PropTypes.func,
};

EmployeeData.defaultProps = {
  isDisabled: true,
};

export default EmployeeData;

import React from "react";
import Select from "react-select";
import { IDENTITY_TYPE } from "../../../utils/constant";
import { selectStyles } from "../../../style-component/ReactSelectFilterTable";
import ButtonBlueFilter from "../../../component/ButtonBlueFilter";

const EmployeeDataIdentity = ({
  employeeData,
  selectForm,
  isDisabled,
  onChange,
  onChangeSelect,
  onEditClick,
  onChangeCheckbox,
  isPermanentIdCard,
  isSameAddress,
  submitEdit,
  isLoadingEdit,
}) => {
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
          <h3 className="text-bold mt-1 my-4">Identity & Address</h3>
        </div>

        <div className="col-xl-8 col-lg-12 col-md-12 col-sm-12 mb-3">
          <form onSubmit={submitEdit}>

            {/* IDENTITY TYPE & NUMBER */}
            <div className="row mt-3 px-3">
              <div className="form-group col-xl-5-1 col-lg-12 col-md-12 col-sm-12 mb-3">
                <label
                  htmlFor="mobile_phone"
                  className="text-bold text-blue-dark mb-1"
                >
                  Identity Type
                </label>
                {isDisabled ? (
                  <>
                    <input
                      type="text"
                      name="identity_type"
                      className="form-control input-border-grey"
                      id="identity_type"
                      value={
                        employeeData !== null
                          ? employeeData.identity_type_name
                          : ""
                      }
                      disabled
                    />
                  </>
                ) : (
                  <Select
                    id="identity_type"
                    name="identity_type"
                    options={IDENTITY_TYPE}
                    value={selectForm.identity_type}
                    styles={selectStyles}
                    isClearable={false}
                    onChange={onChangeSelect}
                    placeholder={"Select..."}
                  />
                )}
              </div>
              <div className="form-group col-xl-5-1 col-lg-12 col-md-12 col-sm-12">
                <label
                  htmlFor="identity_number"
                  className="text-bold text-blue-dark mb-1"
                >
                  Identity Number
                </label>
                <input
                  type="number"
                  name="identity_number"
                  className="form-control input-border-grey"
                  id="identity_number"
                  onChange={onChange}
                  value={
                    employeeData !== null ? employeeData.identity_number : ""
                  }
                  disabled={isDisabled}
                />
                <div className="form-check mb-2 mt-1">
                  <input
                    onChange={onChangeCheckbox}
                    value={isPermanentIdCard}
                    className="form-check-input"
                    name="isPermanentIdCard"
                    type="checkbox"
                    disabled={isDisabled}
                    checked={isPermanentIdCard}
                    id="isPermanentIdCard"
                  />
                  <label className="form-check-label" htmlFor="defaultCheck1">
                    Permanent
                  </label>
                </div>
              </div>
            </div>

            {/* IF PERMANENT ID CARD IS UNCHECK THEN SHOW DATE EXPIRED INPUT */}
            {!isPermanentIdCard ? (
              <div className="row mt-3 px-3">
                <div className="form-group col-xl-10 col-lg-12 col-md-12 col-sm-12">
                  <label
                    htmlFor="amount"
                    className="text-bold text-blue-dark mb-1"
                  >
                    Identity Expired
                  </label>
                  <input
                    type="date"
                    value={
                      employeeData.identity_expired === null ? '' : employeeData.identity_expired
                    }
                    className="form-control input-border-grey"
                    name="identity_expired"
                    onChange={onChange}
                    id="identity_expired"
                    disabled={isDisabled}
                  />
                </div>
              </div>
            ) : (
              ""
            )}

            {/* POSTAL CODE */}
            <div className="row mt-3 px-3">
              <div className="form-group col-xl-10 col-lg-12 col-md-12 col-sm-12">
                <label
                  htmlFor="postal_code"
                  className="text-bold text-blue-dark mb-1"
                >
                  Postal Code
                </label>
                <input
                  type="text"
                  value={employeeData !== null ? employeeData.postal_code : ""}
                  className="form-control input-border-grey"
                  name="postal_code"
                  onChange={onChange}
                  id="postal_code"
                  placeholder="Postal Code"
                  disabled={isDisabled}
                />
              </div>
            </div>

            {/* CITIZENT ADDRESS */}
            <div className="row mt-3 px-3">
              <div className="form-group col-xl-10 col-lg-12 col-md-12 col-sm-12">
                <label
                  htmlFor="postal_code"
                  className="text-bold text-blue-dark mb-1"
                >
                  Citizent Address
                </label>

                <textarea
                  style={{ height: "90px" }}
                  className="form-control input-border-grey"
                  name="citizent_address"
                  id="citizent_address"
                  value={employeeData !== null ? employeeData.citizent_address : ''}
                  onChange={onChange}
                  disabled={isDisabled}
                  placeholder="Citizen ID Address"
                ></textarea>
              </div>
            </div>

            {/* RESIDENT ADDRESS */}
            <div className="row mt-3 px-3">
              <div className="form-group col-xl-10 col-lg-12 col-md-12 col-sm-12">
                <label
                  htmlFor="postal_code"
                  className="text-bold text-blue-dark mb-1"
                >
                  Resident Address
                </label>

                <textarea
                  style={{ height: "90px" }}
                  className="form-control input-border-grey"
                  name="resident_address"
                  id="resident_address"
                  value={
                    isSameAddress ? employeeData.citizent_address : employeeData.resident_address
                  }
                  onChange={onChange}
                  readOnly={isSameAddress}
                  disabled={isDisabled}
                  placeholder="Citizen ID Address"
                ></textarea>

                <div className="form-check mb-2 mt-1">
                  <input
                    onChange={onChangeCheckbox}
                    value={isSameAddress}
                    className="form-check-input"
                    name="isSameAddress"
                    type="checkbox"
                    disabled={isDisabled}
                    checked={isSameAddress}
                    id="isSameAddress"
                  />
                  <label className="form-check-label" htmlFor="defaultCheck1">
                    Use as Citizent ID Address
                  </label>
                </div>
              </div>
            </div>

            {!isDisabled ? (
                <div className="row mt-3 px-3">
                  <div className="col-md-12">
                    <ButtonBlueFilter name="Save" type="submit" disabled={isLoadingEdit} />
                  </div>
                </div>
              ) : null}
          </form>

        </div>
      </div>
    </div>
  );
};

export default EmployeeDataIdentity;

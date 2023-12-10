import React from "react";
import ButtonBlueFilter from "../../../component/ButtonBlueFilter";
import Select from "react-select";
import { ucwords } from "../../../utils/helper";
import { selectStyles } from "../../../style-component/ReactSelectFilterTable";
import {
  JOB_STATUS_NOT_FILTER,
  STATUS_EMPLOYEE,
} from "../../../utils/constant";

const EmployementData = ({
  employeeData,
  selectForm,
  isDisabled,
  onChange,
  onChangeSelect,
  onEditClick,
  onChangeExists,
  submitEdit,
  isFetching,
  isLoadingEdit,
  errorExistType,
  departmentData,
  ptkpData,
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
            <h3 className="text-bold mt-1 my-4">Employment</h3>
          </div>

          <div className="col-xl-8 col-lg-12 col-md-12 col-sm-12 mb-3">
            <form onSubmit={submitEdit}>
              {/* NIP AND JOB POSITION */}
              <div className="row mt-3 px-3">
                <div className="form-group col-xl-5-1 col-lg-6 col-md-6 col-sm-6">
                  <label
                    htmlFor="nip"
                    className="text-bold text-blue-dark mb-1"
                  >
                    Employee Id
                  </label>
                  <input
                    type="text"
                    required
                    value={employeeData.nip}
                    className="form-control input-border-grey"
                    name="nip"
                    disabled={isDisabled}
                    onKeyUp={onChangeExists}
                    id="nip"
                    onChange={onChange}
                    placeholder="Employee Id"
                  />
                  {errorExistType === "nip" && !isDisabled ? (
                    <span className="text-red">
                      User with this Employee ID already exists
                    </span>
                  ) : null}
                </div>
                <div className="form-group col-xl-5-1 col-lg-6 col-md-6 col-sm-6">
                  <label
                    htmlFor="job_position"
                    className="text-bold text-blue-dark mb-1"
                  >
                    Job Position
                  </label>
                  <input
                    type="text"
                    disabled={isDisabled}
                    value={ucwords(employeeData.job_position)}
                    className="form-control input-border-grey"
                    name="job_position"
                    id="job_position"
                    onChange={onChange}
                    placeholder="Job Position"
                  />
                </div>
              </div>

              {/* EMPLOYEE STATUS AND JOB LEVEL */}
              <div className="row mt-3 px-3">
                <div className="form-group col-xl-5-1 col-lg-12 col-md-12 col-sm-12">
                  <label
                    htmlFor="status"
                    className="text-bold text-blue-dark mb-1"
                  >
                    Employee Status
                  </label>
                  {isDisabled || employeeData.branch.status === "2" ? (
                    <>
                      <input
                        type="text"
                        name="status"
                        value={
                          employeeData !== null
                            ? ucwords(employeeData.status_name)
                            : ""
                        }
                        className="form-control input-border-grey"
                        id="status"
                        disabled
                      />
                      {employeeData.branch.status === "2" ? (
                        <span className="text-red">
                          You Can Only Edit on Active or Inactive Status
                        </span>
                      ) : null}
                    </>
                  ) : (
                    <Select
                      onChange={onChangeSelect}
                      id="marital_status"
                      name="marital_status"
                      value={selectForm.status}
                      options={STATUS_EMPLOYEE}
                      styles={selectStyles}
                      isClearable={false}
                      placeholder={"Select Status..."}
                    />
                  )}
                </div>
                <div className="form-group col-xl-5-1 col-lg-12 col-md-12 col-sm-12">
                  <label
                    htmlFor="job_level"
                    className="text-bold text-blue-dark mb-1"
                  >
                    Job Level
                  </label>
                  <input
                    type="text"
                    name="job_level"
                    onChange={onChange}
                    value={ucwords(employeeData.job_level)}
                    className="form-control input-border-grey"
                    id="job_level"
                    disabled={isDisabled}
                  />
                </div>
              </div>

              {/* DEPARTMENT AND JOB STATUS */}
              <div className="row mt-3 px-3">
                <div className="form-group col-xl-5-1 col-lg-12 col-md-12 col-sm-12">
                  <label
                    htmlFor="division_id"
                    className="text-bold text-blue-dark mb-1"
                  >
                    Department
                  </label>
                  {isDisabled ? (
                    <input
                      type="text"
                      name="division_id"
                      value={ucwords(employeeData.division_name)}
                      className="form-control input-border-grey"
                      id="division_id"
                      disabled
                    />
                  ) : (
                    <Select
                      onChange={onChangeSelect}
                      id="division_id"
                      name="division_id"
                      value={selectForm.division_id}
                      options={departmentData}
                      isClearable={false}
                      placeholder={"Select Department..."}
                    />
                  )}
                </div>

                <div className="form-group col-xl-5-1 col-lg-12 col-md-12 col-sm-12">
                  <label
                    htmlFor="job_status"
                    className="text-bold text-blue-dark mb-1"
                  >
                    Job Status
                  </label>
                  {isDisabled ? (
                    <input
                      type="text"
                      name="job_status"
                      value={ucwords(employeeData.job_status_name)}
                      className="form-control input-border-grey"
                      id="job_status"
                      disabled
                    />
                  ) : (
                    <Select
                      onChange={onChangeSelect}
                      id="job_status"
                      name="job_status"
                      value={selectForm.job_status}
                      options={JOB_STATUS_NOT_FILTER}
                      isClearable={false}
                      placeholder={"Select Job Status..."}
                    />
                  )}
                </div>
              </div>

              {/* PTKP STATUS */}
              <div className="row mt-3 px-3">
                <div className="form-group col-xl-10 col-lg-12 col-md-12 col-sm-12">
                  <label
                    htmlFor="ptkp_id"
                    className="text-bold text-blue-dark mb-1"
                  >
                    PTKP Status
                  </label>
                  {isDisabled ? (
                    <input
                      type="text"
                      name="ptkp_id"
                      value={
                        employeeData.ptkp_id !== null
                          ? employeeData.ptkp.status
                          : "PTKP Not Selected"
                      }
                      className="form-control input-border-grey"
                      id="ptkp_id"
                      disabled
                    />
                  ) : (
                    <Select
                      onChange={onChangeSelect}
                      id="ptkp_id"
                      name="ptkp_id"
                      value={selectForm.ptkp_id}
                      options={ptkpData}
                      isClearable={false}
                      placeholder={"Select PTKP..."}
                    />
                  )}
                </div>
              </div>

              {/* JOIN DATE & END DATE */}
              <div className="row mt-3 px-3">
                <div className="form-group col-xl-5-1 col-lg-12 col-md-12 col-sm-12">
                  <label
                    htmlFor="join_date"
                    className="text-bold text-blue-dark mb-1"
                  >
                    Join Date
                  </label>
                  <input
                    type={isDisabled ? "text" : "date"}
                    onChange={onChange}
                    name="join_date"
                    value={
                      isDisabled
                        ? employeeData.date_human_diff.join_date
                        : employeeData.join_date
                    }
                    className="form-control input-border-grey"
                    id="join_date"
                    disabled={isDisabled}
                  />
                </div>

                <div className="form-group col-xl-5-1 col-lg-12 col-md-12 col-sm-12">
                  <label
                    htmlFor="end_date"
                    className="text-bold text-blue-dark mb-1"
                  >
                    End Date
                  </label>
                  <input
                    type={
                      isDisabled || selectForm.job_status.value === "0"
                        ? "text"
                        : "date"
                    }
                    onChange={onChange}
                    name="end_date"
                    value={
                      !isDisabled
                        ? selectForm.job_status.value === "0"
                          ? "-"
                          : employeeData.end_date === null
                          ? ""
                          : employeeData.end_date
                        : selectForm.job_status.value === "0"
                        ? "-"
                        : employeeData.date_human_diff.end_date
                    }
                    className="form-control input-border-grey"
                    id="end_date"
                    disabled={isDisabled || selectForm.job_status.value === "0"}
                  />
                </div>
              </div>
              {!isDisabled ? (
                <div className="row mt-3 px-3">
                  <div className="col-md-12">
                    <ButtonBlueFilter
                      disabled={errorExistType !== "" || isLoadingEdit}
                      name={isLoadingEdit ? "Saving..." : "Save"}
                      type="submit"
                    />
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

export default EmployementData;

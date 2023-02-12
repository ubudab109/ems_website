import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { selectStyles } from "../../../../../style-component/ReactSelectFilterTable";
import { JOB_STATUS_NOT_FILTER } from "../../../../../utils/constant";
import { RequiredIcon } from "../../../../components/PiecesComponent";

const Second = ({
  data,
  onChange,
  onChangeSelect,
  departmentData,
  errorExistType,
  handleCheckUser,
}) => {
  const branch = useSelector((state) => state.auth.branch);

  return (
    <div className="card card-shadow">
      <div className="col-xl-12">
        <div className="row justify-content-between">
          {/* EMPLOYEE DATA */}
          <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 px-5 p-3">
            <span className="mt-4 text-blue-dark my-4">
              Employee Data <RequiredIcon />
            </span>
            <br />
            <span className="text-muted my-4">
              Fill all employee data information related to company
            </span>

            {/* Employee ID & Job Position */}
            <div className="row mt-3">
              <div className="form-group col-md-6">
                <label htmlFor="nip" className="text-bold">
                  Employee Id
                </label>
                <input
                  type="text"
                  value={data.nip}
                  onKeyUp={handleCheckUser}
                  className="form-control input-border-grey"
                  name="nip"
                  id="nip"
                  onChange={onChange}
                  placeholder="Employee Id"
                />
                {errorExistType === "nip" ? (
                  <span className="text-red">Employee ID already exists</span>
                ) : null}
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="job_position" className="text-bold">
                  Job Position
                </label>
                <input
                  type="text"
                  value={data.job_position}
                  className="form-control input-border-grey"
                  name="job_position"
                  id="job_position"
                  onChange={onChange}
                  placeholder="Job Position"
                />
              </div>
            </div>

            {/* Job Level */}
            <div className="row mt-3">
              <div className="form-group col-md-12">
                <label htmlFor="job_level" className="text-bold">
                  Job Level
                </label>
                <input
                  type="text"
                  value={data.job_level}
                  className="form-control input-border-grey"
                  name="job_level"
                  id="job_level"
                  onChange={onChange}
                  placeholder="Job Level"
                />
              </div>
            </div>

            {/* DEPARTMENT AND JOB STATUS */}
            <div className="row mt-3">
              <div className="form-group col-md-6">
                <label htmlFor="division_id" className="text-bold">
                  Department
                </label>
                <Select
                  onChange={onChangeSelect}
                  id="division_id"
                  name="division_id"
                  value={data.division_id}
                  options={departmentData}
                  styles={selectStyles}
                  isClearable={false}
                  placeholder={"Select Department..."}
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="job_status" className="text-bold">
                  Job Status
                </label>
                <Select
                  onChange={onChangeSelect}
                  id="job_status"
                  name="job_status"
                  value={data.job_status}
                  options={JOB_STATUS_NOT_FILTER}
                  styles={selectStyles}
                  isClearable={false}
                  placeholder={"Select Status..."}
                />
              </div>
            </div>
          </div>

          {/* JOIN DATE */}
          <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 px-5 p-3">
            {/* BORDER */}
            <div className="border-div-left"></div>

            {/* BRANCH */}
            <div className="row" style={{ marginTop: "54px" }}>
              <div className="form-group col-md-12">
                <label htmlFor="branch" className="text-bold">
                  Branch
                </label>
                <input
                  type="text"
                  disabled
                  value={`${branch.branch_name} | ${branch.branch_code}`}
                  className="form-control input-border-grey"
                  name="branch"
                  id="branch"
                />
              </div>
            </div>

            {/* JOIN DATE & END DATE */}
            <div className="row mt-4">
              <div className="form-group col-md-6">
                <label htmlFor="join_date" className="text-bold">
                  Join Date
                </label>
                <input
                  type="date"
                  value={data.join_date}
                  onChange={onChange}
                  className="form-control input-border-grey"
                  name="join_date"
                  id="join_date"
                />
              </div>

              <div className="form-group col-md-6">
                <label htmlFor="end_date" className="text-bold">
                  End Date
                </label>
                <input
                  onChange={onChange}
                  type="date"
                  disabled={data.job_status.value === "0"}
                  value={data.job_status.value === "0" ? "" : data.end_date}
                  className="form-control input-border-grey"
                  name="end_date"
                  id="end_date"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Second.propTypes = {
  data: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  onChangeSelect: PropTypes.func,
  departmentData: PropTypes.array.isRequired,
  errorExistType: PropTypes.string,
  onChangeExists: PropTypes.func,
};

export default Second;

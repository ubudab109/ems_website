import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { formatedDate, rupiah } from "../../../utils/helper";
import { REIMBURSEMENT_STATUS_INPUT } from "../../../utils/constant";
import { filterStyles } from "../../../style-component/ReactSelectFilterTable";

const ModalDetailReimbersement = ({
  employee,
  date,
  files,
  status,
  reimberseStatus,
  claimType,
  amount,
  isError,
  onChangeStatus,
}) => (
  <Fragment>
    {isError ? (
      <div className="col-12">
        Error when fetching detail. Please reload this page. If error still
        there, please contact Administrator
      </div>
    ) : (
      <div className="row">
        <div className="col-md-12">
          {/* EMPLOYEE */}
          <div className="row mb-2">
            <div className="col-6">
              <label className="text-bold" htmlFor="employee_name">
                Employee Name
              </label>
              <input
                type="text"
                className="form-control input-border-gray"
                disabled
                name="employee_name"
                id="employee_name"
                value={employee.firstname + employee.lastname}
              />
            </div>
            <div className="col-6">
              <label className="text-bold" htmlFor="employeeId">
                Employee ID
              </label>
              <input
                type="text"
                name="employeeId"
                disabled
                id="employeeId"
                className="form-control input-border-gray"
                value={employee.nip}
              />
            </div>
          </div>

          {/* START DATE END DATE */}
          <div className="row mb-2">
            <div className="col-12">
              <label className="text-bold" htmlFor="start_date">
                Request Date
              </label>
              <input
                type="text"
                className="form-control input-border-gray"
                disabled
                name="start_date"
                id="start_date"
                value={date !== "" ? formatedDate(date) : ""}
              />
            </div>
          </div>

          {/* DEPARTMENT & AMOUNT */}
          <div className="row mb-2">
            <div className="col-6">
              <label className="text-bold" htmlFor="department">
                Department
              </label>
              <input
                type="text"
                className="form-control input-border-gray"
                disabled
                name="department"
                id="department"
                value={employee.division_name}
              />
            </div>
            <div className="col-6">
              <label className="text-bold" htmlFor="amount">
                Amount
              </label>
              <input
                type="text"
                className="form-control input-border-gray"
                disabled
                name="amount"
                id="amount"
                value={rupiah(amount)}
              />
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="row mb-2">
            <div className="col-12">
              <label htmlFor="desc">Claim Type</label>
              <div className="box-border-div">{claimType}</div>
            </div>
          </div>

          {/* FILES */}
          <div className="row mb-2">
            <div className="col-12">
              <label htmlFor="desc">Attachment</label>
              <div className="box-border-div">
                <div className="d-flex flex-wrap justify-content-center">
                  {files.map((val) => (
                    <a
                      key={val.id}
                      href={val.files}
                      target="_blank"
                      rel="noreferrer"
                      className="mb-3 px-2"
                    >
                      <img src={val.files} alt="" srcset="" width={250} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* STATUS */}
          <div className="row mb-2">
            <div className="col-12">
              <label htmlFor="status">Status</label>
              <Select
                id="status"
                className="high-index mr-5"
                isDisabled={reimberseStatus === "2"}
                options={REIMBURSEMENT_STATUS_INPUT}
                styles={filterStyles}
                isClearable={false}
                onChange={onChangeStatus}
                value={status}
              />
            </div>
          </div>
        </div>
      </div>
    )}
  </Fragment>
);

ModalDetailReimbersement.propTypes = {
  employee: PropTypes.object.isRequired,
  date: PropTypes.string,
  files: PropTypes.array,
  status: PropTypes.object,
  claimType: PropTypes.string,
  reimberseStatus: PropTypes.string,
  amount: PropTypes.any,
  isError: PropTypes.bool,
  onChangeStatus: PropTypes.func,
};

ModalDetailReimbersement.defaultProps = {
  date: '1970-01-01',
  files: [],
  claimType: "",
  amount: "",
  employee: {
    firstname: "",
    lastname: "",
    nip: "",
    division_name: "",
  }
};

export default ModalDetailReimbersement;

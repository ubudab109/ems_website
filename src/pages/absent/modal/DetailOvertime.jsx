import React, { Fragment } from "react";
import { formatedDate, formatingTime } from "../../../utils/helper";
import PropTypes from "prop-types";

const DetailOvertime = ({
  isError,
  employeeName,
  employeeId,
  inRequest,
  outRequest,
  takenHour,
  takenDate,
  status,
  department,
  statusColor,
}) => {
  return (
    <Fragment>
      {isError ? (
        <div className="col-12">
          Error when fetching detail. Please reload this page. If error still
          there, please contact Administrator
        </div>
      ) : (
        <div className="row">
          <div className="col-md-12">
            <div className="row mb-2">
              <div className="col-6">
                <label className="text-bold" htmlFor="employee_name">Employee Name</label>
                <input
                  type="text"
                  className="form-control input-border-gra"
                  disabled
                  name="employee_name"
                  id="employee_name"
                  value={employeeName}
                />
              </div>
              <div className="col-6">
                <label className="text-bold" htmlFor="employeeId">Employee ID</label>
                <input
                  type="text"
                  name="employeeId"
                  disabled
                  id="employeeId"
                  className="form-control input-border-gra"
                  value={employeeId}
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-6">
                <label className="text-bold" htmlFor="in">In</label>
                <input
                  type="text"
                  className="form-control input-border-gra"
                  disabled
                  name="in"
                  value={inRequest ? formatingTime(inRequest) : ''}
                />
              </div>
              <div className="col-6">
                <label className="text-bold" htmlFor="out">Out</label>
                <input
                  type="text"
                  className="form-control input-border-gra"
                  disabled
                  name="out"
                  value={outRequest !== '' ? formatingTime(outRequest) : ''}
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-6">
                <label className="text-bold" htmlFor="taken_hour">Taken Hour</label>
                <input
                  type="text"
                  name="taken_hour"
                  disabled
                  id="taken_hour"
                  className="form-control input-border-gra"
                  value={takenHour + ' Hour'}
                />
              </div>
              <div className="col-6">
                <label className="text-bold" htmlFor="date">Request Date</label>
                <input
                  type="text"
                  name="text"
                  disabled
                  id="date"
                  className="form-control input-border-gra"
                  value={takenDate !== '' ? formatedDate(takenDate) : ''}
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-6">
                <label className="text-bold" htmlFor="department">Department</label>
                <input
                  type="text"
                  name="department"
                  disabled
                  id="department"
                  value={department}
                  className="form-control input-border-gra"
                />
              </div>
              <div className="col-6">
                <label className="text-bold" htmlFor="status">Status</label>
                <input
                  type="text"
                  name="status"
                  disabled
                  id="status"
                  style={{ color: statusColor }}
                  value={status}
                  className="form-control input-border-gra"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

DetailOvertime.propTypes = {
  isError: PropTypes.bool,
  employeeName: PropTypes.string,
  employeeId: PropTypes.string,
  inRequest: PropTypes.string,
  outRequest: PropTypes.string,
  takenHour: PropTypes.any,
  takenDate: PropTypes.string,
  status: PropTypes.string,
  department: PropTypes.string,
  statusColor: PropTypes.string,
};

export default DetailOvertime;

import React, { Fragment } from "react";
import parse from "html-react-parser";
import PropTypes from "prop-types";
import { formatedDate } from "../utils/helper";

const DetailPermit = ({
  startDate,
  endDate,
  taken,
  desc,
  employee,
  department,
  files,
  isError,
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
              <div className="col-6">
                <label className="text-bold" htmlFor="start_date">Start Date</label>
                <input
                  type="text"
                  className="form-control input-border-gray"
                  disabled
                  name="start_date"
                  id="start_date"
                  value={startDate !== '' ? formatedDate(startDate) : ''}
                />
              </div>
              <div className="col-6">
                <label className="text-bold" htmlFor="endDate">End Date</label>
                <input
                  type="text"
                  name="endDate"
                  disabled
                  id="endDate"
                  className="form-control input-border-gray"
                  value={endDate !== '' ? formatedDate(endDate) : ''}
                />
              </div>


            </div>

            {/* DEPARTMENT & TAKEN */}
            <div className="row mb-2">
              <div className="col-6">
                <label className="text-bold" htmlFor="department">Department</label>
                <input
                  type="text"
                  className="form-control input-border-gray"
                  disabled
                  name="department"
                  id="department"
                  value={department.division_name}
                />
              </div>
              <div className="col-6">
                <label className="text-bold" htmlFor="taken">Taken</label>
                <input
                  type="text"
                  name="taken"
                  disabled
                  id="taken"
                  className="form-control input-border-gray"
                  value={taken + ' days'}
                />
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="row mb-2">
              <div className="col-12">
                <label htmlFor="desc">Description</label>
                <div className="box-border-div">
                  {parse(desc)}
                </div>
              </div>
            </div>

            {/* FILES */}
            <div className="row mb-2">
              <div className="col-12">
                <label htmlFor="desc">Attachment</label>
                <div className="box-border-div">
                  <div className="d-flex flex-wrap justify-content-center">
                    {
                      files.map(val => (
                        <a key={val.id} href={val.files} target="_blank" rel="noreferrer" className="mb-3 px-2"><img src={val.files} alt="" srcset="" width={250} /></a>
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

DetailPermit.propTypes = {
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  taken: PropTypes.number,
  desc: PropTypes.string,
  employee: PropTypes.object,
  department: PropTypes.object,
  files: PropTypes.array,
  isError: PropTypes.bool,
};

export default DetailPermit;

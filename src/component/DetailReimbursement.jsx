import React, {Fragment} from 'react';
import parse from "html-react-parser";
import PropTypes from "prop-types";
import Select from 'react-select';
import { formatedDate, rupiahInputFormat } from '../utils/helper';
import { REIMBURSEMENT_STATUS_INPUT } from '../utils/constant';
import { filterStyles } from '../style-component/ReactSelectFilterTable';

const DetailReimbursement = ({
  date,
  total,
  claim_type,
  employee,
  status,
  statusName,
  files,
  isError,
  onChangeStatus,
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
                <label className="text-bold" htmlFor="start_date">Date</label>
                <input
                  type="text"
                  className="form-control input-border-gray"
                  disabled
                  name="start_date"
                  id="start_date"
                  value={date !== '' ? formatedDate(date) : ''}
                />
              </div>
              <div className="col-6">
                <label className="text-bold" htmlFor="endDate">Total</label>
                <input
                  type="text"
                  name="total"
                  disabled
                  id="total"
                  className="form-control input-border-gray"
                  value={total !== '' ? rupiahInputFormat(total.toString(), 'Rp. ') : ''}
                />
              </div>


            </div>

            {/* DESCRIPTION */}
            <div className="row mb-2">
              <div className="col-12">
                <label htmlFor="desc">Claim Type</label>
                <div className="box-border-div">
                  {claim_type.name}
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

            {/* STATUS */}
            <div className="row mb-2">
              <div className="col-12">
                <label htmlFor="status">Status</label>
                <Select
                  id="status"
                  className="high-index mr-5"
                  isDisabled={statusName === 'Rejected'}
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
};

DetailReimbursement.propTypes = {
  date: PropTypes.string,
  total: PropTypes.any,
  claim_type: PropTypes.object,
  employee: PropTypes.object,
  status: PropTypes.any,
  statusName: PropTypes.string,
  files: PropTypes.array,
  isError: PropTypes.bool,
  onChangeStatus: PropTypes.func,
};

export default DetailReimbursement;

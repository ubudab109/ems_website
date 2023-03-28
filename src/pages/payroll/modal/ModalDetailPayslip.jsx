import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { NumericFormat } from "react-number-format";
import { isActionAllowed, rupiahInputFormat } from "../../../utils/helper";

const ModalDetailPayslip = ({
  employeeData,
  presence,
  totalDays,
  salaryIncome,
  salaryCut,
  totalSalary,
  handleChangeIncomeSalary,
  handleChangeCutSalary,
  onEdit,
  onCancel,
  onSave,
  isError,
}) => {
  const payslipPermission = useSelector(
    (state) => state.auth.permissions.filter((e) => e.name === "Finance")[0]
  );
  return (
    <Fragment>
      {isError ? (
        <div className="col-12">
          Failed Fetching Detail. Please Reload This Page or Contact Us If
          Problem Still There
        </div>
      ) : (
        <>
          <div className="col-md-12 text-center mb-3">
            <img src={employeeData.avatar} alt="" className="circle-image" />
            <h3 className="text-blue-dark">
              {employeeData.firstname} {employeeData.lastname}
            </h3>
            <span className="text-bold">ID : {employeeData.nip}</span>
            <br />
            <span className="text-bold">
              Departemtent : {employeeData.division_name}
            </span>
            <br />
            <span className="text-bold mb-5">
              Position : {employeeData.job_position}
            </span>
            <br />
            <span className="text-bold mb-5">
              Status : {employeeData.job_status_name}
            </span>
          </div>
          <div className="col-md-12 text-center mb-3">
            <div className="table-responsive">
              <table className="table table-borderless">
                <thead>
                  <tr>
                    <th scope="col">Presence Type</th>
                    <th scope="col">Total / Working Days</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Total Present</td>
                    <td>
                      {presence.total_present} / {totalDays}
                    </td>
                  </tr>
                  <tr>
                    <td>Total Paid Leave</td>
                    <td>
                      {presence.total_paid_leave} / {totalDays}
                    </td>
                  </tr>
                  <tr>
                    <td>Total Permit</td>
                    <td>
                      {presence.total_permit} / {totalDays}
                    </td>
                  </tr>
                  <tr>
                    <td>Total Absent</td>
                    <td>
                      {" "}
                      {parseInt(totalDays) -
                        (parseInt(presence.total_present) +
                          parseInt(presence.total_paid_leave) +
                          parseInt(presence.total_permit))}
                      / {totalDays}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {/* SALARY INCOME */}
          <div className="col-md-12 mb-3">
            <div className="card">
              <div className="card-body">
                <h5
                  className="mt-4 my-4"
                  style={{ color: "#00B5EE", fontWeight: "bold" }}
                >
                  Salary Income
                </h5>
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Salary Name</th>
                        <th>Amount</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {salaryIncome.map((val, key) => (
                        <tr key={key}>
                          <td>
                            <div className="td-text mb-1">
                              {val.salary_name}
                            </div>
                          </td>
                          <td>
                            <NumericFormat
                              value={val.currencyAmount}
                              data-key={key}
                              required
                              disabled={val.isDisabled}
                              onChange={handleChangeIncomeSalary}
                              className="form-control input-border-grey"
                              name="currencyAmount"
                              placeholder={`Amount Income ${val.salary_name}`}
                              prefix={"Rp. "}
                              thousandSeparator=","
                            />
                          </td>
                          <td>
                            <div className="btn-group" data-toggle="buttons">
                              {val.isDisabled ? (
                                <button
                                  className="btn btn-warning radius-10 mr-2 text-white"
                                  disabled={val.status === "sended" || !isActionAllowed(payslipPermission.permissions, 'payslip-edit')}
                                  style={{
                                    cursor:
                                      val.status === "sended"
                                        ? "not-allowed"
                                        : "pointer",
                                  }}
                                  onClick={onEdit}
                                  data-key={key}
                                  data-type="income"
                                >
                                  Edit
                                </button>
                              ) : (
                                <>
                                  <button
                                    className="btn btn-primary radius-10"
                                    data-key={key}
                                    data-type="income"
                                    onClick={onSave}
                                  >
                                    Save
                                  </button>
                                  <button
                                    className="btn btn-danger radius-10"
                                    data-key={key}
                                    data-type="income"
                                    onClick={onCancel}
                                  >
                                    Cancel
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {/* END SALARY INCOME */}

          {/* SALARY CUTS */}
          <div className="col-md-12 mb-3">
            <div className="card">
              <div className="card-body">
                <h5
                  className="mt-4 my-4"
                  style={{ color: "#FF5F00", fontWeight: "bold" }}
                >
                  Salary Cuts
                </h5>
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Salary Name</th>
                        <th>Amount</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {salaryCut.map((val, key) => (
                        <tr key={key}>
                          <td>
                            <div className="td-text mb-1">
                              {val.salary_name}
                            </div>
                          </td>
                          <td>
                            <NumericFormat
                              value={
                                val.isDisabled
                                  ? -val.amount
                                  : rupiahInputFormat(-val.amount, "Rp. ")
                              }
                              data-key={key}
                              required
                              disabled={val.isDisabled}
                              onChange={handleChangeCutSalary}
                              className="form-control input-border-grey"
                              name="currencyAmount"
                              placeholder={`Amount Income ${val.salary_name}`}
                              prefix={"Rp. "}
                              thousandSeparator=","
                            />
                          </td>
                          <td>
                            <div className="btn-group" data-toggle="buttons">
                              {val.isDisabled ? (
                                <button
                                  className="btn btn-warning radius-10 mr-2 text-white"
                                  disabled={val.status === "sended"}
                                  style={{
                                    cursor:
                                      val.status === "sended"
                                        ? "not-allowed"
                                        : "pointer",
                                  }}
                                  data-key={key}
                                  data-type="cut"
                                  onClick={onEdit}
                                >
                                  Edit
                                </button>
                              ) : (
                                <>
                                  <button
                                    className="btn btn-primary radius-10"
                                    data-key={key}
                                    data-type="cut"
                                    onClick={onSave}
                                  >
                                    Save
                                  </button>
                                  <button
                                    className="btn btn-danger radius-10"
                                    data-key={key}
                                    data-type="cut"
                                    onClick={onCancel}
                                  >
                                    Cancel
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {/* END SALARY CUTS */}

          {/* TOTAL SALARY */}
          <div className="col-md-12 mb-3">
            <div className="card">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead style={{ border: "none" }}>
                      <tr>
                        <th></th>
                        <th></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="td-text mb-1">Total Salary</div>
                        </td>
                        <td>
                          <NumericFormat
                            value={totalSalary}
                            className="form-control input-border-grey"
                            name="currencyAmount"
                            disabled
                            prefix={"Rp. "}
                            thousandSeparator=","
                          />
                        </td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {/* END TOTAL SALARY */}
        </>
      )}
    </Fragment>
  );
};

ModalDetailPayslip.propTypes = {
  employeeData: PropTypes.object,
  presence: PropTypes.object,
  totalDays: PropTypes.number,
  totalSalary: PropTypes.string,
  salaryIncome: PropTypes.array,
  salaryCut: PropTypes.array,
  handleChangeIncomeSalary: PropTypes.func,
  handleChangeCutSalary: PropTypes.func,
  onEdit: PropTypes.func,
  onCancel: PropTypes.func,
  onSave: PropTypes.func,
  isError: PropTypes.bool,
};

ModalDetailPayslip.defaultProps = {
  employeeData: {},
  presence: {},
  totalDays: 0,
  totalSalary: "",
  salaryIncome: [],
  salaryCut: [],
};

export default ModalDetailPayslip;

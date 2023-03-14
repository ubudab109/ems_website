import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";
import { NumericFormat } from "react-number-format";
import { selectStyles } from "../../../../../style-component/ReactSelectFilterTable";
import {
  arraySum,
  datePerMonth,
  daysForCuts,
} from "../../../../../utils/helper";
import { RequiredIcon } from "../../../../components/PiecesComponent";
import { useState } from "react";
import { useEffect } from "react";

const Third = ({
  data,
  dataIncomeSalary,
  dataCutSalary,
  dataAttendanceCut,
  onChangeSelect,
  onChange,
  onChangeIncome,
  onChangeCuts,
  onChangeCutAttendance,
  onChangeSelectAttendanceCut,
}) => {
  let [totalSalary, setTotalSalary] = useState([]);
  useEffect(() => {
    let concatSalary = dataIncomeSalary.concat(dataCutSalary);
    let data = [];
    concatSalary.forEach((value, key) => {
      if (!isNaN(value.amount)) {
        if (value.type === "income") {
          if (key !== 1) {
            data.push(parseFloat(value.amount));
          }
        } else {
          data.push(parseFloat(-value.amount));
        }
      }
    });
    setTotalSalary(data);
  }, [dataCutSalary, dataIncomeSalary]);

  return (
    <div className="col-xl-12">
      {/* PAYROLL PAYMENT DATE */}
      <div className="col-xl-12 mb-4">
        <div className="card card-shadow">
          <div className="d-flex flex-wrap">
            <div className="col-xl-4 col-lg-12 col-md-12 px-3 p-3">
              <span className="mt-4 text-blue-dark my-4">
                Payroll <RequiredIcon />
              </span>
              <br />
              <span className="text-muted my-4">Input employee salary</span>
            </div>
            <div className="col-xl-8 col-lg-12 mb-3">
              {/* PAYMEND DATE */}
              <div className="row mt-3 px-3">
                <div className="form-group col-xl-8 col-lg-8 col-md-12 col-sm-12">
                  <label htmlFor="payment_date" className="text-bold">
                    Payment Date
                  </label>
                  <Select
                    onChange={onChangeSelect}
                    id="division_id"
                    name="division_id"
                    value={data.payment_date}
                    options={datePerMonth("payment_date")}
                    styles={selectStyles}
                    isClearable={false}
                    placeholder={"Select Date..."}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BANK ACCOUNT */}
      <div className="col-xl-12 mb-4">
        <div className="card card-shadow">
          <div className="d-flex flex-wrap">
            <div className="col-xl-4 col-lg-12 col-md-12 px-3 p-3">
              <span className="mt-4 text-blue-dark my-4">
                Bank Account <RequiredIcon />
              </span>
              <br />
              <span className="text-muted my-4">
                The Employee Bank Account is Use For Payroll
              </span>
            </div>

            <div className="col-xl-8 col-lg-12 mb-3">
              {/* BANK NAME & ACCOUNT NUMBER */}
              <div className="row mt-3 px-3">
                <div className="form-group col-md-4 mb-3">
                  <label htmlFor="bank_name" className="text-bold">
                    Bank Name
                  </label>
                  <input
                    type="text"
                    value={data.bank_name}
                    className="form-control input-border-grey"
                    name="bank_name"
                    id="bank_name"
                    onChange={onChange}
                    placeholder="Ex: BCA"
                  />
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="account_number" className="text-bold">
                    Account Number
                  </label>
                  <input
                    type="text"
                    value={data.account_number}
                    className="form-control input-border-grey"
                    name="account_number"
                    id="account_number"
                    onChange={onChange}
                    placeholder="Account Number"
                  />
                </div>
              </div>

              {/* ACCOUNT HOLDER NAME */}
              <div className="row mt-3 px-3">
                <div className="form-group col-md-8">
                  <label htmlFor="account_holder_name" className="text-bold">
                    Account Holder Name
                  </label>
                  <input
                    type="text"
                    value={data.account_holder_name}
                    className="form-control input-border-grey"
                    name="account_holder_name"
                    id="account_holder_name"
                    onChange={onChange}
                    placeholder="Account Holder Name"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SALARY INCOME */}
      <div className="col-xl-12 mb-4">
        <div className="card card-shadow">
          <div className="d-flex flex-wrap">
            <div className="col-xl-4 col-lg-12 col-md-12 px-3 p-3">
              <span
                className="mt-4 my-4"
                style={{ color: "#00B5EE", fontWeight: "bold" }}
              >
                Salary Income
              </span>
              <br />
              <span className="text-muted my-4">Input Salary Income</span>
            </div>

            <div className="col-xl-8 col-lg-12 mb-3">
              {/* DATA INCOME SALARY */}
              {dataIncomeSalary.map((data, key) => (
                <div className="row mt-3 px-3" key={key}>
                  <div className="form-group col-xl-4 col-lg-5 col-md-8 col-sm-12">
                    <label htmlFor="amount" className="text-bold">
                      {data.name}
                    </label>
                    <NumericFormat
                      value={dataIncomeSalary[key].currencyAmount}
                      data-key={key}
                      className="form-control input-border-grey"
                      name="currencyAmount"
                      id="currencyAmount"
                      onChange={onChangeIncome}
                      placeholder={`Amount Income ${data.name}`}
                      prefix={"Rp. "}
                      thousandSeparator=","
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SALARY CUTS */}
      <div className="col-xl-12 mb-4">
        <div className="card card-shadow">
          <div className="d-flex flex-wrap">
            <div className="col-xl-4 col-lg-12 col-md-12 px-3 p-3">
              <span
                className="mt-4 my-4"
                style={{ color: "#FF5F00", fontWeight: "bold" }}
              >
                Salary Cuts
              </span>
              <br />
              <span className="text-muted my-4">Input Salary Cuts</span>
            </div>

            <div className="col-xl-8 col-lg-12 mb-3">
              {/* DATA CUTS SALARY */}
              {dataCutSalary.map((data, key) => (
                <div className="row mt-3 px-3" key={key}>
                  <div className="form-group col-xl-4 col-lg-5 col-md-8 col-sm-12">
                    <label htmlFor="amount" className="text-bold">
                      {data.name}
                    </label>
                    <NumericFormat
                      value={dataCutSalary[key].currencyAmount}
                      data-key={key}
                      className="form-control input-border-grey"
                      name="currencyAmount"
                      id="currencyAmount"
                      onChange={onChangeCuts}
                      placeholder={`Amount Cuts ${data.name}`}
                      prefix={"Rp. "}
                      thousandSeparator=","
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ATTENDANCE CUT */}
      <div className="col-xl-12 mb-4">
        <div className="card card-shadow">
          <div className="d-flex flex-wrap">
            <div className="col-xl-4 col-lg-12 col-md-12 px-3 p-3">
              <span className="mt-4 my-4" style={{ fontWeight: "bold" }}>
                Attendance Cut
              </span>
              <br />
              <span className="text-muted my-4">Input Other Cuts</span>
            </div>

            <div className="col-xl-8 col-lg-12 mb-3">
              {/* ABSENT */}
              <div className="row mt-3 px-3">
                <div className="form-group col-xl-4 col-lg-5 col-md-8 col-sm-12">
                  <label
                    htmlFor="absent_cut"
                    className="text-bold mb-2"
                    style={{ color: "#FF1111" }}
                  >
                    {dataAttendanceCut[0].name}
                  </label>{" "}
                  <br />
                  <label htmlFor="absent_cut" className="text-bold mb-2">
                    Day
                  </label>
                  <Select
                    onChange={onChangeSelectAttendanceCut}
                    id="days-absent"
                    name="days"
                    className="mb-2"
                    data-key={0}
                    value={dataAttendanceCut[0].days}
                    options={daysForCuts(10, 0, "days")}
                    styles={selectStyles}
                    isClearable={false}
                    placeholder={"Select Days..."}
                  />
                  <NumericFormat
                    value={dataAttendanceCut[0].currencyAmount}
                    data-key={0}
                    className="form-control input-border-grey"
                    name="currencyAmount"
                    id="currencyAmount"
                    onChange={onChangeCutAttendance}
                    placeholder={`Amount Cuts Absent`}
                    prefix={"Rp. "}
                    thousandSeparator=","
                  />
                </div>
              </div>

              {/* LATE */}
              <div className="row mt-3 px-3">
                <div className="form-group col-xl-4 col-lg-5 col-md-8 col-sm-12">
                  <label
                    htmlFor="absent_cut"
                    className="text-bold mb-2"
                    style={{ color: "#FFC900" }}
                  >
                    {dataAttendanceCut[1].name}
                  </label>{" "}
                  <br />
                  <div className="row">
                    <div className="col-md-6">
                      <input
                        onChange={onChangeCutAttendance}
                        data-key={1}
                        className="form-control input-border-grey"
                        name="time"
                        id="time-cuts"
                        placeholder="Minutes"
                        value={dataAttendanceCut[1].time}
                      />
                    </div>
                    <div className="col-md-6">
                      <Select
                        onChange={onChangeSelectAttendanceCut}
                        id="days-late"
                        name="days"
                        className="mb-2"
                        data-key={1}
                        value={dataAttendanceCut[1].days}
                        options={daysForCuts(10, 1, "days")}
                        styles={selectStyles}
                        isClearable={false}
                        placeholder={"Total.."}
                      />
                    </div>
                  </div>
                  <NumericFormat
                    value={dataAttendanceCut[1].currencyAmount}
                    data-key={1}
                    className="form-control input-border-grey"
                    name="currencyAmount"
                    id="currencyAmount"
                    onChange={onChangeCutAttendance}
                    placeholder={`Amount Cuts Absent`}
                    prefix={"Rp. "}
                    thousandSeparator=","
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TOTAL SALARY */}
      <div className="col-xl-12 mb-4">
        <div className="card card-shadow">
          <div className="d-flex flex-wrap">
            <div className="col-xl-4 col-lg-12 col-md-12 px-3 p-3">
              <span className="mt-4 text-bold my-4">Total Salary</span>
              <br />
              <span className="text-muted my-4">Total Employee Salary</span>
            </div>

            <div className="col-xl-8 col-lg-12 mb-3">
              {/* ACCOUNT HOLDER NAME */}
              <div className="row mt-3 px-3">
                <div className="form-group col-md-8">
                  <label htmlFor="account_holder_name" className="text-bold">
                    Total Salary
                  </label>

                  <NumericFormat
                    value={arraySum(totalSalary)}
                    className="form-control input-border-grey"
                    readOnly
                    id="totalSalary"
                    prefix={"Rp. "}
                    thousandSeparator=","
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Third.propTypes = {
  data: PropTypes.object.isRequired,
  onChangeSelect: PropTypes.func,
  dataIncomeSalary: PropTypes.array.isRequired,
  dataCutSalary: PropTypes.array.isRequired,
  onChangeIncome: PropTypes.func,
  onChange: PropTypes.func,
  onChangeCuts: PropTypes.func,
  onChangeCutAttendance: PropTypes.func,
  onChangeSelectAttendanceCut: PropTypes.func,
  totalSalary: PropTypes.array,
};

export default Third;

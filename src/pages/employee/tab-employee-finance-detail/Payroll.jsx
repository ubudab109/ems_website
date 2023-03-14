/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, Fragment, useEffect } from "react";
import Select from "react-select";
import swal from "sweetalert";
import { NumericFormat } from "react-number-format";
import http from "../../../service/PrivateConfigRequest";
import {
  arraySum,
  datePerMonth,
  daysForCuts,
  notifError,
  rupiahInputFormat,
  ucwords,
} from "../../../utils/helper";
import { selectStyles } from "../../../style-component/ReactSelectFilterTable";
import ButtonWhiteFilter from "../../../component/ButtonWhiteFilter";
import ButtonBlueFilter from "../../../component/ButtonBlueFilter";
import method from "../../../service/Method";

const Payroll = ({ id }) => {
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [dataFinance, setDataFinance] = useState({
    payment_date: {
      name: "payment_date",
      value: "",
      label: "Select Date...",
    },
    bank: {
      bank_name: "",
      account_holder_name: "",
      account_number: "",
    },
    salary_income: [],
    salary_cuts: [],
    attendance_cut: [
      {
        type: "absent",
        amount: 0,
        currencyAmount: "",
        name: "Absent",
        days: {
          name: "days",
          keyData: 0,
          value: "",
          label: "Select days...",
        },
        time: "",
        currentAmount: "",
        currentTime: "",
        currentDays: {
          name: "days",
          keyData: 0,
          value: "",
          label: "Select days...",
        },
      },
      {
        type: "late",
        amount: 0,
        currencyAmount: "",
        name: "Late",
        time: "",
        days: {
          name: "days",
          keyData: 1,
          value: "",
          label: "Total..",
        },
        currentAmount: "",
        currentTime: "",
        currentDays: {
          name: "days",
          keyData: 0,
          value: "",
          label: "Total...",
        },
      },
    ],
    totalSalary: 0,
  });
  const [isEdit, setIsEdit] = useState({
    payment_date: false,
    bank: false,
    salary_income: false,
    salary_cuts: false,
    attendance_cut: false,
  });
  const [isLoadingEdit, setIsLoadingEdit] = useState({
    payment_date: false,
    bank: false,
    salary_income: false,
    salary_cuts: false,
    attendance_cut: false,
  });
  const [oldDataFinance, setOldDataFinance] = useState({}); // for saving old state

  /**
   * FETCHING DETAIL EMPLOYEE FINANCE
   */
  const fetchDetailEmployeeFinance = async () => {
    setIsLoadingDetail(true);
    await http.get(`employee/${id}?type=payroll`).then((res) => {
      let data = res.data.data;
      const stateData = {
        payment_date: {
          name: "payment_date",
          value: data.payment_date.payment_date,
          label: data.payment_date.payment_date,
        },
        bank: {
          bank_name: data.bank.bank_name,
          account_holder_name: data.bank.account_holder_name,
          account_number: data.bank.account_number,
        },
        salary_income: [],
        salary_cuts: [],
        attendance_cut: [],
        totalSalary: data.total_salary,
      };

      // INCOME SALARY
      for (let income = 0; income < data.income.length; income++) {
        let incomeResponse = {
          id: data.income[income].id,
          employee_id: data.income[income].employee_id,
          salary_component_id: data.income[income].salary_component_id,
          type: data.income[income].type,
          name: data.income[income].name,
          amount: data.income[income].amount,
          currencyAmount: rupiahInputFormat(data.income[income].amount, "Rp. "),
          setting: data.income[income].setting,
          currentAmount: data.income[income].amount,
        };
        stateData.salary_income.push(incomeResponse);
      }

      // CUT SALARY
      for (let cut = 0; cut < data.cuts.length; cut++) {
        let cutsResponse = {
          id: data.cuts[cut].id,
          employee_id: data.cuts[cut].employee_id,
          salary_component_id: data.cuts[cut].salary_component_id,
          type: data.cuts[cut].type,
          name: data.cuts[cut].name,
          amount: -data.cuts[cut].amount,
          currencyAmount: rupiahInputFormat(-data.cuts[cut].amount, "Rp. "),
          setting: data.cuts[cut].setting,
          currentAmount: -data.cuts[cut].amount,
        };
        stateData.salary_cuts.push(cutsResponse);
      }

      // ATTENDANCE CUT
      for (
        let attendanceCut = 0;
        attendanceCut < data.attendance_cuts.length;
        attendanceCut++
      ) {
        let cutAttendanceData = data.attendance_cuts[attendanceCut];
        let time = "";
        let days = "";
        if (cutAttendanceData.cut_type === "late") {
          // SPLITTING TIME AND DAYS FOR LATE
          let splitTotal = cutAttendanceData.total.split(" / ");
          time = splitTotal[0];
          days = splitTotal[1];
        } else {
          // FOR ABSENT
          time = 0;
          days = cutAttendanceData.total;
        }

        let dataToState = {
          type: cutAttendanceData.cut_type,
          currencyAmount: rupiahInputFormat(
            cutAttendanceData.amount.toString(),
            "Rp. "
          ),
          amount: cutAttendanceData.amount,
          name: ucwords(cutAttendanceData.cut_type),
          time: time,
          days: {
            name: "days",
            keyData: attendanceCut,
            value: days !== 0 ? days : "",
            label:
              days !== 0
                ? days
                : cutAttendanceData.cut_type === "absent"
                ? "Select Days..."
                : "Total...",
          },
          currentAmount: cutAttendanceData.amount,
          currentTime: time,
          currentDays: {
            name: "days",
            keyData: attendanceCut,
            value: days !== 0 ? days : "",
            label:
              days !== 0
                ? days
                : cutAttendanceData.cut_type === "absent"
                ? "Select Days..."
                : "Total...",
          },
        };

        stateData.attendance_cut.push(dataToState);
      }

      setDataFinance(stateData);
      setOldDataFinance(stateData);
      setIsLoadingDetail(false);
    });
  };

  /**
   * Handler select option attendance cut
   * @param {Event} e
   */
  const handleSelectChangeAttendanceCut = (e) => {
    let key = e.keyData;
    let cloneDataAttendanceCut = [...dataFinance.attendance_cut];
    let obj = cloneDataAttendanceCut[key];
    obj.days = e;
    cloneDataAttendanceCut[key] = obj;
    setDataFinance({
      ...dataFinance,
      attendance_cut: [...cloneDataAttendanceCut],
    });
  };

  /**
   * On Change number input attendance cut
   * @param {Event} e
   */
  const handleChangeAttendanceCut = (e) => {
    let key = e.target.getAttribute("data-key");
    let cloneDataAttendanceCut = [...dataFinance.attendance_cut];
    let obj = cloneDataAttendanceCut[key];

    if (e.target.name === "currencyAmount") {
      let amount = e.target.value;
      let explode = amount.replace(/[^\d.]/g, "").split(".");
      obj["amount"] = explode[1];
    }
    obj[e.target.name] = e.target.value;
    cloneDataAttendanceCut[key] = obj;
    setDataFinance({
      ...dataFinance,
      attendance_cut: [...cloneDataAttendanceCut],
    });
  };

  /**
   * On Change number input salary
   * @param {Event} e
   * @param {string} type - type of salary between income or cuts
   */
  const handleChangeSalary = (e, type) => {
    let key = e.target.getAttribute("data-key");
    if (type === "income") {
      let cloneDataIncome = [...dataFinance.salary_income];
      let obj = cloneDataIncome[key];
      if (e.target.name === "currencyAmount") {
        let amount = e.target.value;
        let explode = amount.replace(/[^\d.]/g, "").split(".");
        obj["amount"] = explode[1];
      }
      obj[e.target.name] = e.target.value;
      cloneDataIncome[key] = obj;
      setDataFinance({ ...dataFinance, salary_income: [...cloneDataIncome] });
    } else {
      let cloneDataCuts = [...dataFinance.salary_cuts];
      let obj = cloneDataCuts[key];
      if (e.target.name === "currencyAmount") {
        let amount = e.target.value;
        let explode = amount.replace(/[^\d.]/g, "").split(".");
        obj["amount"] = explode[1];
      }
      obj[e.target.name] = e.target.value;
      cloneDataCuts[key] = obj;
      setDataFinance({ ...dataFinance, salary_cuts: [...cloneDataCuts] });
    }

    let concatSalary = dataFinance.salary_income.concat(
      dataFinance.salary_cuts
    );
    let totalSalaryArr = [];
    concatSalary.forEach((value, key) => {
      if (!isNaN(value.amount)) {
        if (value.type === "income") {
          totalSalaryArr.push(parseFloat(value.amount));
        } else {
          totalSalaryArr.push(parseFloat(-value.amount));
        }
      }
    });
    setDataFinance({ ...dataFinance, totalSalary: arraySum(totalSalaryArr) });
  };

  /**
   * HANDLE SUBMIT UPDATE DATA FINANCE
   * @param {Event} e
   * @param {string} type - UPDATE TYPE
   * @return {Promise}
   */
  const handleSaveUpdateEmployeeFinance = async (e, type) => {
    e.preventDefault();
    let data;
    switch (type) {
      case "payment_date":
        data = {
          payment_date: dataFinance.payment_date.value,
        };
        break;
      case "bank":
        if (
          dataFinance.bank.bank_name === "" ||
          dataFinance.bank.account_number === "" ||
          dataFinance.bank.account_holder_name === ""
        ) {
          return notifError(
            "Input Failed",
            "All input is required. Please fill that"
          );
        } else {
          data = {
            bank_name: dataFinance.bank.bank_name,
            account_number: dataFinance.bank.account_number,
            account_holder_name: dataFinance.bank.account_holder_name,
          };
        }
        break;
      case "salary_income":
        let reqDataIncome = {
          data: [],
        };
        for (let i = 0; i < dataFinance.salary_income.length; i++) {
          let salaryComponentId =
            dataFinance.salary_income[i]["salary_component_id"];
          let amount = dataFinance.salary_income[i]["amount"];
          reqDataIncome["data"][i] = {
            salary_component_id: salaryComponentId,
            amount: amount,
          };
          if (amount === null || amount === "" || amount === undefined) {
            return notifError(
              "Input Failed",
              "Please input amount more than or equal 0"
            );
          }

          if (parseFloat(dataFinance.totalSalary) < 0) {
            return notifError("Failed", "Total salary can not be minus");
          }
        }
        data = reqDataIncome;
        break;
      case "salary_cuts":
        let reqDataCuts = {
          data: [],
        };
        for (let i = 0; i < dataFinance.salary_cuts.length; i++) {
          let salaryComponentId =
            dataFinance.salary_cuts[i]["salary_component_id"];
          let amount = dataFinance.salary_cuts[i]["amount"];
          reqDataCuts["data"][i] = {
            salary_component_id: salaryComponentId,
            amount: amount,
          };
          if (amount === null || amount === "" || amount === undefined) {
            return notifError(
              "Input Failed",
              "Please input amount more than or equal 0"
            );
          }

          if (parseFloat(dataFinance.totalSalary) < 0) {
            return notifError("Failed", "Total salary can not be minus");
          }
        }
        data = reqDataCuts;
        break;
      case "attendance_cut":
        let reqDataAttendanceCuts = {
          data: [],
        };
        for (let i = 0; i < dataFinance.attendance_cut.length; i++) {
          let amount = dataFinance.attendance_cut[i].amount;
          let type = dataFinance.attendance_cut[i].type;
          let total;
          if (type === "late") {
            total = `${dataFinance.attendance_cut[i].time} / ${dataFinance.attendance_cut[i].days.value}`;
          } else {
            total = dataFinance.attendance_cut[i].days.value;
          }
          reqDataAttendanceCuts["data"][i] = {
            cut_type: type,
            total: total,
            amount: amount,
          };

          if (amount === undefined || amount === "") {
            return notifError(
              "Input Failed",
              "Please input amount more than or equal 0"
            );
          } else if (
            dataFinance.attendance_cut[i].time === "" ||
            dataFinance.attendance_cut[i].time === undefined
          ) {
            return notifError(
              "Input Failed",
              "Please input time more than or equal 0"
            );
          }
          data = reqDataAttendanceCuts;
        }
        break;
      default:
        swal({
          title: "Failed",
          text: "There's an error from server. Please try again",
          icon: "error",
        });
        break;
    }

    setIsLoadingEdit({ ...isLoadingEdit, [type]: true });
    await method
      .updateDataPut(`employee-finance/${id}?type=${type}`, data)
      .then((res) => {
        swal({
          title: "Success",
          text: "Employee finance successfully update",
          icon: "success",
        });
        setIsEdit({ ...isEdit, [type]: false });
        setIsLoadingEdit({ ...isLoadingEdit, [type]: false });
      })
      .catch(() => {
        setIsEdit({ ...isEdit, [type]: false });
        setIsLoadingEdit({ ...isLoadingEdit, [type]: false });
        fetchDetailEmployeeFinance();
        swal({
          title: "Failed",
          text: "There's an error from server. Please try again",
          icon: "error",
        });
      });
  };

  /**
   * On Change Edit or Cancel Handler
   * @param {string} type
   */
  const onEditHandler = (type) => {
    let dataFinanceState = { ...oldDataFinance };
    /**
     * IF CANCEL BUTTON IS CLICKED THEN
     * REVERT OLD VALUE IF CANCEL
     */
    if (isEdit[type]) {
      setIsEdit({ ...isEdit, [type]: false });
      let oldDataFinance = dataFinanceState[type];
      // REVERT VALUE FOR NON SALARY_INCOME AND SALARY_CUTS
      if (
        type !== "salary_income" &&
        type !== "salary_cuts" &&
        type !== "attendance_cut"
      ) {
        setDataFinance({ ...dataFinance, [type]: oldDataFinance });
      } else {
        // REVERT VALUE FRO SALARY_INCOME AND SALARY_CUTS TYPE
        if (type === "salary_income") {
          let cloneDataIncome = [...dataFinance.salary_income];
          for (let i = 0; i < dataFinance.salary_income.length; i++) {
            let obj = cloneDataIncome[i];
            cloneDataIncome[i].amount = cloneDataIncome[i].currentAmount;
            cloneDataIncome[i].currencyAmount = rupiahInputFormat(
              cloneDataIncome[i].currentAmount.toString(),
              "Rp. "
            );
            cloneDataIncome[i] = obj;
          }
          setDataFinance({
            ...dataFinance,
            salary_income: [...cloneDataIncome],
            totalSalary: dataFinanceState.totalSalary,
          });
        } else if (type === "salary_cuts") {
          let cloneDataCuts = [...dataFinance.salary_cuts];
          for (let i = 0; i < dataFinance.salary_cuts.length; i++) {
            let obj = cloneDataCuts[i];
            cloneDataCuts[i].amount = cloneDataCuts[i].currentAmount;
            cloneDataCuts[i].currencyAmount = rupiahInputFormat(
              cloneDataCuts[i].currentAmount.toString(),
              "Rp. "
            );
            cloneDataCuts[i] = obj;
          }
          setDataFinance({
            ...dataFinance,
            salary_cuts: [...cloneDataCuts],
            totalSalary: dataFinanceState.totalSalary,
          });
        } else if (type === "attendance_cut") {
          let cloneDataAttendanceCut = [...dataFinance.attendance_cut];
          for (let i = 0; i < dataFinance.attendance_cut.length; i++) {
            let obj = cloneDataAttendanceCut[i];
            cloneDataAttendanceCut[i].amount =
              cloneDataAttendanceCut[i].currentAmount;
            cloneDataAttendanceCut[i].currencyAmount = rupiahInputFormat(
              cloneDataAttendanceCut[i].currentAmount,
              "Rp. "
            );
            cloneDataAttendanceCut[i].time =
              cloneDataAttendanceCut[i].currentTime;
            cloneDataAttendanceCut[i].days =
              cloneDataAttendanceCut[i].currentDays;
            cloneDataAttendanceCut[i] = obj;
          }
          setDataFinance({
            ...dataFinance,
            attendance_cut: [...cloneDataAttendanceCut],
          });
        }
      }
    } else {
      setIsEdit({ ...isEdit, [type]: true });
    }
  };

  /**
   * COMPONENT DID MOUNT
   */
  useEffect(() => {
    fetchDetailEmployeeFinance();
    return () => {
      setOldDataFinance({})
    };
  }, []);

  return (
    <Fragment>
      <div className="col-xl-12">
        {isLoadingDetail ? (
          <h5>Fetching...</h5>
        ) : (
          <>
            {/* PAYMENT DATE */}
            <div className="container pl-0">
              <ButtonWhiteFilter
                className="float-end"
                name={isEdit.payment_date ? "Cancel" : "Edit"}
                color="black"
                onClick={() => onEditHandler("payment_date")}
              />
              <div className="d-flex flex-wrap">
                <div className="col-xl-4 col-lg-12 col-md-12 px-3 p-3">
                  <span className="mt-4 text-blue-dark my-4">Payment Date</span>
                </div>
                <div className="col-xl-8 col-lg-12 col-md-12 mb-3">
                  <div className="row mt-3 px-3">
                    <div className="form-group col-md-9 mb-3">
                      <label htmlFor="payment_date" className="text-bold">
                        Payment Date
                      </label>
                      <Select
                        onChange={(e) =>
                          setDataFinance({ ...dataFinance, payment_date: e })
                        }
                        id="division_id"
                        name="division_id"
                        isDisabled={!isEdit.payment_date}
                        value={dataFinance.payment_date}
                        options={datePerMonth("payment_date")}
                        styles={selectStyles}
                        isClearable={false}
                        placeholder={"Select Days..."}
                      />
                    </div>
                  </div>
                  {/* BUTTON SAVE */}
                  {isEdit.payment_date ? (
                    <div className="row mt-3 px-3">
                      <div className="col-md-12 mt-3">
                        <ButtonBlueFilter
                          name={
                            isLoadingEdit.payment_date ? "Saving..." : "Save"
                          }
                          onClick={(e) =>
                            handleSaveUpdateEmployeeFinance(e, "payment_date")
                          }
                        />
                      </div>
                    </div>
                  ) : null}
                  {/* END BUTTON SAVE */}
                </div>
              </div>
            </div>
            {/* END PAYMENT DATE */}
            <hr className="divider-gray" />

            {/* BANK ACCOUNT */}
            <div className="container pl-0">
              <ButtonWhiteFilter
                className="float-end"
                name={isEdit.bank ? "Cancel" : "Edit"}
                color="black"
                onClick={() => onEditHandler("bank")}
              />
              <div className="d-flex flex-wrap">
                <div className="col-xl-4 col-lg-12 col-md-12 px-3 p-3">
                  <span className="mt-4 text-bold my-4">Bank Account</span>
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
                        value={dataFinance.bank.bank_name}
                        disabled={!isEdit.bank}
                        className="form-control input-border-grey"
                        name="bank_name"
                        id="bank_name"
                        onChange={(e) =>
                          setDataFinance({
                            ...dataFinance,
                            bank: {
                              ...dataFinance.bank,
                              bank_name: e.target.value,
                            },
                          })
                        }
                        placeholder="Ex: BCA"
                      />
                    </div>
                    <div className="form-group col-md-5">
                      <label htmlFor="account_number" className="text-bold">
                        Account Number
                      </label>
                      <input
                        type="text"
                        value={dataFinance.bank.account_number}
                        className="form-control input-border-grey"
                        disabled={!isEdit.bank}
                        name="account_number"
                        id="account_number"
                        onChange={(e) =>
                          setDataFinance({
                            ...dataFinance,
                            bank: {
                              ...dataFinance.bank,
                              account_number: e.target.value,
                            },
                          })
                        }
                        placeholder="Account Number"
                      />
                    </div>
                  </div>

                  {/* ACCOUNT HOLDER NAME */}
                  <div className="row mt-3 px-3">
                    <div className="form-group col-md-8">
                      <label
                        htmlFor="account_holder_name"
                        className="text-bold"
                      >
                        Account Holder Name
                      </label>
                      <input
                        type="text"
                        value={dataFinance.bank.account_holder_name}
                        className="form-control input-border-grey"
                        name="account_holder_name"
                        disabled={!isEdit.bank}
                        id="account_holder_name"
                        onChange={(e) =>
                          setDataFinance({
                            ...dataFinance,
                            bank: {
                              ...dataFinance.bank,
                              account_holder_name: e.target.value,
                            },
                          })
                        }
                        placeholder="Account Holder Name"
                      />
                    </div>
                  </div>

                  {/* BUTTON SAVE */}
                  {isEdit.bank ? (
                    <div className="row mt-3 px-3">
                      <div className="col-md-12 mt-3">
                        <ButtonBlueFilter
                          name={isLoadingEdit.bank ? "Saving..." : "Save"}
                          onClick={(e) =>
                            handleSaveUpdateEmployeeFinance(e, "bank")
                          }
                        />
                      </div>
                    </div>
                  ) : null}
                  {/* END BUTTON SAVE */}
                </div>
              </div>
            </div>
            {/* END BANK ACCOUNT */}
            <hr className="divider-gray" />

            {/* SALARY INCOME */}
            <div className="container pl-0">
              <ButtonWhiteFilter
                className="float-end"
                name={isEdit.salary_income ? "Cancel" : "Edit"}
                color="black"
                onClick={() => onEditHandler("salary_income")}
              />
              <div className="d-flex flex-wrap">
                <div className="col-xl-4 col-lg-12 col-md-12 px-3 p-3">
                  <span
                    className="mt-4 my-4"
                    style={{ color: "#00B5EE", fontWeight: "bold" }}
                  >
                    Salary Income
                  </span>
                  <br />
                  <span className="text-muted my-4">Salary Income</span>
                </div>
                <div className="col-xl-8 col-lg-12 col-md-12 mb-3">
                  <div className="row mt-3 px-3">
                    {/* DATA INCOME SALARY */}
                    {dataFinance.salary_income.map((data, key) => (
                      <div className="row mt-3 px-3" key={key}>
                        <div className="form-group col-xl-4 col-lg-5 col-md-8 col-sm-12">
                          <label htmlFor="amount" className="text-bold">
                            {data.name}
                          </label>
                          <NumericFormat
                            value={
                              dataFinance.salary_income[key].currencyAmount
                            }
                            data-key={key}
                            required
                            onChange={(e) => handleChangeSalary(e, "income")}
                            className="form-control input-border-grey"
                            name="currencyAmount"
                            disabled={!isEdit.salary_income}
                            placeholder={`Amount Income ${data.name}`}
                            prefix={"Rp. "}
                            thousandSeparator=","
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* BUTTON SAVE */}
                  {isEdit.salary_income ? (
                    <div className="row mt-3 px-3">
                      <div className="col-md-12 mt-3">
                        <ButtonBlueFilter
                          name={
                            isLoadingEdit.salary_income ? "Saving..." : "Save"
                          }
                          onClick={(e) =>
                            handleSaveUpdateEmployeeFinance(e, "salary_income")
                          }
                        />
                      </div>
                    </div>
                  ) : null}
                  {/* END BUTTON SAVE */}
                </div>
              </div>
            </div>
            {/* END SALARY INCOME */}
            <hr className="divider-gray" />

            {/* SALARY CUTS */}
            <div className="container pl-0">
              <ButtonWhiteFilter
                className="float-end"
                name={isEdit.salary_cuts ? "Cancel" : "Edit"}
                color="black"
                onClick={() => onEditHandler("salary_cuts")}
              />
              <div className="d-flex flex-wrap">
                <div className="col-xl-4 col-lg-12 col-md-12 px-3 p-3">
                  <span
                    className="mt-4 my-4"
                    style={{ color: "#FF5F00", fontWeight: "bold" }}
                  >
                    Salary Cuts
                  </span>
                  <br />
                  <span className="text-muted my-4">Salary Cuts</span>
                </div>
                <div className="col-xl-8 col-lg-12 col-md-12 mb-3">
                  <div className="row mt-3 px-3">
                    {/* DATA CUTS SALARY */}
                    {dataFinance.salary_cuts.map((data, key) => (
                      <div className="row mt-3 px-3" key={key}>
                        <div className="form-group col-xl-4 col-lg-5 col-md-8 col-sm-12">
                          <label htmlFor="amount" className="text-bold">
                            {data.name}
                          </label>
                          <NumericFormat
                            value={dataFinance.salary_cuts[key].currencyAmount}
                            data-key={key}
                            required
                            onChange={(e) => handleChangeSalary(e, "cuts")}
                            className="form-control input-border-grey"
                            name="currencyAmount"
                            disabled={!isEdit.salary_cuts}
                            placeholder={`Amount Cut ${data.name}`}
                            prefix={"Rp. "}
                            thousandSeparator=","
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* BUTTON SAVE */}
                  {isEdit.salary_cuts ? (
                    <div className="row mt-3 px-3">
                      <div className="col-md-12 mt-3">
                        <ButtonBlueFilter
                          name={
                            isLoadingEdit.salary_cuts ? "Saving..." : "Save"
                          }
                          onClick={(e) =>
                            handleSaveUpdateEmployeeFinance(e, "salary_cuts")
                          }
                        />
                      </div>
                    </div>
                  ) : null}
                  {/* END BUTTON SAVE */}
                </div>
              </div>
            </div>
            {/* END SALARY CUTS */}
            <hr className="divider-gray" />

            {/* ATTENDANCE CUTS */}
            <div className="container pl-0">
              <ButtonWhiteFilter
                className="float-end"
                name={isEdit.attendance_cut ? "Cancel" : "Edit"}
                color="black"
                onClick={() => onEditHandler("attendance_cut")}
              />
              <div className="d-flex flex-wrap">
                <div className="col-xl-4 col-lg-12 col-md-12 px-3 p-3">
                  <span
                    className="mt-4 my-4"
                    style={{ color: "Black", fontWeight: "bold" }}
                  >
                    Attendance Cuts
                  </span>
                  <br />
                  <span className="text-muted my-4">Other Cuts</span>
                </div>
                <div className="col-xl-8 col-lg-12 col-md-12 mb-3">
                  {/* ABSENT */}
                  <div className="row mt-3 px-3">
                    <div className="form-group col-xl-4 col-lg-5 col-md-8 col-sm-12">
                      <label
                        htmlFor="absent_cut"
                        className="text-bold mb-2"
                        style={{ color: "#FF1111" }}
                      >
                        Absent
                      </label>{" "}
                      <br />
                      <label htmlFor="absent_cut" className="text-bold mb-2">
                        Day
                      </label>
                      <Select
                        onChange={(e) => handleSelectChangeAttendanceCut(e)}
                        id="days-absent"
                        name="days"
                        className="mb-2"
                        isDisabled={!isEdit.attendance_cut}
                        data-key={0}
                        value={dataFinance.attendance_cut[0].days}
                        options={daysForCuts(10, 0, "days")}
                        styles={selectStyles}
                        isClearable={false}
                        placeholder={"Select Days..."}
                      />
                      <NumericFormat
                        value={dataFinance.attendance_cut[0].currencyAmount}
                        data-key={0}
                        className="form-control input-border-grey"
                        name="currencyAmount"
                        disabled={!isEdit.attendance_cut}
                        id="currencyAmount"
                        onChange={(e) => handleChangeAttendanceCut(e)}
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
                        Late
                      </label>{" "}
                      <br />
                      <div className="row">
                        <div className="col-md-6">
                          <label htmlFor="" className="text-bold">
                            Time
                          </label>
                          <input
                            onChange={(e) => handleChangeAttendanceCut(e)}
                            data-key={1}
                            className="form-control input-border-grey"
                            name="time"
                            id="time-cuts"
                            placeholder="Minutes"
                            disabled={!isEdit.attendance_cut}
                            value={dataFinance.attendance_cut[1].time}
                          />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="" className="text-bold">
                            Day
                          </label>
                          <Select
                            onChange={(e) => handleSelectChangeAttendanceCut(e)}
                            id="days-late"
                            name="days"
                            className="mb-2"
                            data-key={1}
                            isDisabled={!isEdit.attendance_cut}
                            value={dataFinance.attendance_cut[1].days}
                            options={daysForCuts(10, 1, "days")}
                            styles={selectStyles}
                            isClearable={false}
                            placeholder={"Total.."}
                          />
                        </div>
                      </div>
                      <NumericFormat
                        value={dataFinance.attendance_cut[1].currencyAmount}
                        data-key={1}
                        className="form-control input-border-grey"
                        name="currencyAmount"
                        disabled={!isEdit.attendance_cut}
                        id="currencyAmount"
                        onChange={(e) => handleChangeAttendanceCut(e)}
                        placeholder={`Amount Cuts Absent`}
                        prefix={"Rp. "}
                        thousandSeparator=","
                      />
                    </div>
                  </div>

                  {/* BUTTON SAVE */}
                  {isEdit.attendance_cut ? (
                    <div className="row mt-3 px-3">
                      <div className="col-md-12 mt-3">
                        <ButtonBlueFilter
                          name={
                            isLoadingEdit.attendance_cut ? "Saving..." : "Save"
                          }
                          onClick={(e) =>
                            handleSaveUpdateEmployeeFinance(e, "attendance_cut")
                          }
                        />
                      </div>
                    </div>
                  ) : null}
                  {/* END BUTTON SAVE */}
                </div>
              </div>
            </div>
            {/* END ATTENDANCE CUTS */}
            <hr className="divider-gray" />

            {/* TOTAL SALARY */}
            <div className="container pl-0">
              <div className="d-flex flex-wrap">
                <div className="col-xl-4 col-lg-12 col-md-12 px-3 p-3">
                  <span
                    className="mt-4 my-4"
                    style={{ color: "black", fontWeight: "bold" }}
                  >
                    Total Salary
                  </span>
                  <br />
                  <span className="text-muted my-4">Total Employee Salary</span>
                </div>
                <div className="col-xl-8 col-lg-12 col-md-12 mb-3">
                  <div className="row mt-3">
                    <div className="row mt-3">
                      <div className="form-group col-xl-4 col-lg-5 col-md-8 col-sm-12">
                        <label htmlFor="amount" className="text-bold">
                          Total Salary
                        </label>
                        <NumericFormat
                          value={dataFinance.totalSalary}
                          className="form-control input-border-grey"
                          readOnly
                          prefix={"Rp. "}
                          thousandSeparator=","
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* END TOTAL SALARY */}
          </>
        )}
      </div>
    </Fragment>
  );
};

export default Payroll;

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from "react";
import Select from "react-select";
import SearchFilterInput from "../../../component/SearchFilterInput";
import { MONTH, MONTH_LIST } from "../../../utils/constant";
import {
  arraySum,
  isActionAllowed,
  notifError,
  notifSuccess,
  rupiahInputFormat,
  yearsOption,
} from "../../../utils/helper";
import { filterStyles } from "../../../style-component/ReactSelectFilterTable";
import ButtonWhiteFilter from "../../../component/ButtonWhiteFilter";
import ButtonBlueFilter from "../../../component/ButtonBlueFilter";
import ButtonPlaint from "../../../component/ButtonPlaint";
import DataTable from "react-data-table-component";
import columnPayslipData from "../data/column_payslip_data";
import http from "../../../service/PrivateConfigRequest";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
import CustomModalForm from "../../../component/CustomModalForm";
import ModalGeneratePayroll from "../modal/ModalGeneratePayroll";
import method from "../../../service/Method";
import columnGeneratedPayslipData from "../data/column_generated_payslip_data";
import CustomModalDetail from "../../../component/CustomModalDetail";
import ModalDetailPayslip from "../modal/ModalDetailPayslip";
import { useSelector } from "react-redux";

const Payslip = () => {
  const payslipPermission = useSelector(
    (state) => state.auth.permissions.filter((e) => e.name === "Finance")[0]
  );
  const date = new Date();
  const history = useHistory();
  const yearsFilter = yearsOption();
  const [dataPayslip, setDataPayslip] = useState([]);
  const [payslipStatus, setPayslipStatus] = useState({});
  const [dataDepartement, setDataDepartement] = useState([]);
  const [dataEmployee, setDataEmployee] = useState([]);
  const [dataGeneratedPayslip, setDataGeneratedPayslip] = useState([]);
  const [inputKeyword, setInputKeyword] = useState("");
  const [filterPayslip, setFilterPayslip] = useState({
    keyword: "",
    month: MONTH_LIST[date.getMonth()],
    year: {
      name: "year",
      value: date.getFullYear(),
      label: date.getFullYear(),
    },
    departement: {
      name: "departement",
      value: "",
      label: "All",
    },
  });
  const [formGenerate, setFormGenerate] = useState({
    month: filterPayslip.month.value,
    years: filterPayslip.year.value,
    type: "selected",
    checkbox: false,
    employee_id: [],
  });
  const [loadingGenerate, setLoadingGenerate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDataGeneratedPayslip, setIsLoadingDataGeneratedPayslip] =
    useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [modalGenerate, setModalGenerate] = useState(false);
  const [totalWorkingDays, setTotalWorkingDays] = useState(0);
  const [detailPayslip, setDetailPayslip] = useState({
    presence: {
      total_present: 0,
      total_paid_leave: 0,
      total_permit: 0,
    },
    employee: {},
    salaryIncome: [],
    salaryCuts: [],
    totalSalary: 0,
  });
  const [isErrorDetail, setIsErrorDetail] = useState(false);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [isLoadingSendPayslip, setIsLoadingSendPayslip] = useState(false);
  const [modalDetailPayslip, setModalDetailPayslip] = useState(false);

  /**
   * REQUEST DATA PAYSLIP TO API
   * @param {string} keyword
   * @param {string} month
   * @param {string} year
   * @param {string} departement
   * @returns {Promise}
   */
  const requestDataPayslip = async (keyword, month, year, departement) => {
    return await http.get(
      `payslip?date[month]=${month}&date[years]=${year}&keyword=${keyword}&departement=${departement}`
    );
  };

  /**
   * REQUEST DATA EMPLOYEE NOT EXIST IN PAYSLIP IN SPESIFIC MONTH
   * @param {string} month
   * @param {string} year
   * @returns {Promise}
   */
  const requestDataEmployeeNotInPayslip = async (month, year) => {
    return await http.get(
      `dataset/employee-notin-payslip?month=${month}&years=${year}`
    );
  };

  /**
   * GET TOTAL WORKING DAYS IN CURRENT MONTH AND YEAR
   * @param {string} month
   * @param {string} year
   * @returns {Promise}
   */
  const requestTotalWorkingDays = async (month, year) => {
    return await http.get(`dataset/total-working?month=${month}&years=${year}`);
  };

  /**
   * REQUEST DATA PAYSLIP GENERATED IN SPESIFIC MONTH AND YEARS
   * @param {string} month
   * @param {string} year
   * @returns {Promise}
   */
  const requestDataGeneratedPayslip = async (month, year) => {
    return await http.get(`payslip-generate-list?month=${month}&years=${year}`);
  };

  /**
   * CALLBACK REQUEST DATA PAYSLIP
   */
  const callbackDataPayslip = useCallback(() => {
    let keyword = filterPayslip.keyword;
    let month = filterPayslip.month.value;
    let year = filterPayslip.year.value;
    let departement =
      filterPayslip.departement !== null ? filterPayslip.departement.value : "";
    return requestDataPayslip(keyword, month, year, departement);
  }, [filterPayslip]);

  /**
   * CALLBACK REQUEST DATA EMPLOYEE NOT IN PAYSLIP
   */
  const callbackDataEmployeeNotInPayslip = useCallback(() => {
    let month = filterPayslip.month.value;
    let year = filterPayslip.year.value;
    return requestDataEmployeeNotInPayslip(month, year);
  }, [filterPayslip]);

  /**
   * REQUEST DATA GENERATED PAYSLIP
   */
  const callbackDataGeneratedPayslip = useCallback(() => {
    let month = filterPayslip.month.value;
    let year = filterPayslip.year.value;
    return requestDataGeneratedPayslip(month, year);
  }, [filterPayslip]);

  /**
   * CALLBACK REQUEST TOTAL WORKING DAYS
   */
  const callbackDataTotalWorkingDays = useCallback(() => {
    let month = filterPayslip.month.value;
    let year = filterPayslip.year.value;
    return requestTotalWorkingDays(month, year);
  }, [filterPayslip]);

  /**
   * FETCH DATA PAYSLIP FROM CALLBACK
   */
  const fetchDataPayslip = () => {
    setIsLoading(true);
    callbackDataPayslip()
      .then((res) => {
        const data = res.data.data.data.list;
        const payslipStatus = res.data.data.data.payslip_status;
        let dataToState = [];
        for (let i = 0; i < data.length; i++) {
          let value = data[i];
          value["payment_date_current"] = `${data[i].payment_date} ${
            MONTH[filterPayslip.month.value - 1]
          } ${filterPayslip.year.label}`;
          dataToState.push(value);
        }
        fetchDataEmployeeNotInPayslip();
        setPayslipStatus(payslipStatus);
        setDataPayslip(dataToState);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.response.status === 403) {
          swal(err.response.data.message, {
            icon: "error",
          }).then(() => {
            history.push("/forbidden");
          });
        } else {
          notifError(
            "Error",
            "Error when fetching data. Check your connection or contact us if the problem still there"
          );
        }
        setIsLoading(false);
      });
  };

  /**
   * FETCH DATA GENERATED PAYSLIP FROM CALLBACK
   */
  const fetchDataGeneratedPayslip = () => {
    setIsLoadingDataGeneratedPayslip(true);
    callbackDataGeneratedPayslip()
      .then((res) => {
        const data = res.data.data;
        setDataGeneratedPayslip(data);
        setIsLoadingDataGeneratedPayslip(false);
      })
      .catch(() => {
        notifError(
          "Error",
          "Error when fetching data generated paylip. Check your connection or contact us if the problem still there"
        );
        setIsLoadingDataGeneratedPayslip(false);
      });
  };

  /**
   * FETCH DATA EMPLOYEE NOT IN PAYSLIP
   */
  const fetchDataEmployeeNotInPayslip = () => {
    callbackDataEmployeeNotInPayslip()
      .then((res) => {
        const data = res.data.data;
        setDataEmployee(data);
      })
      .catch((err) => {
        notifError(
          "Failed",
          "There's an error when fetching data employee. Please reload this page"
        );
      });
  };

  /**
   * It fetches department data from the API and sets the data to the state.
   */
  const fetchDepartment = async () => {
    await http.get("dataset/department?filter=1").then((res) => {
      let data = res.data.data;
      setDataDepartement(data);
    });
  };

  /**
   * FETCH DATA TOTAL WORKING DAYS FROM CALLBACK
   */
  const fetchTotalWorkingDays = async () => {
    callbackDataTotalWorkingDays().then((res) => {
      let data = res.data.data;
      setTotalWorkingDays(data);
    });
  };

  /**
   * On View Detail Payslip
   * @param {Number} employeeId
   */
  const onViewDetail = async (employeeId) => {
    setModalDetailPayslip(true);
    setIsLoadingDetail(true);
    let month = filterPayslip.month.value;
    let year = filterPayslip.year.value;
    await http
      .get(`payslip/${employeeId}?month=${month}&years=${year}`)
      .then((res) => {
        const data = res.data.data.data;
        const employee = data.employee;
        const presence = data.presence;
        let dataToState = {
          employee: employee,
          presence: presence,
          salaryIncome: [],
          salaryCuts: [],
          totalSalary: employee.total_salary,
        };
        for (let i = 0; i < data.payslip.length; i++) {
          let payslipData = data.payslip[i];

          if (payslipData.type === "income") {
            dataToState.salaryIncome.push(payslipData);
          }

          if (payslipData.type === "cut") {
            dataToState.salaryCuts.push(payslipData);
          }
        }
        setDetailPayslip(dataToState);
        setIsLoadingDetail(false);
      })
      .catch(() => {
        setIsErrorDetail(true);
        setIsLoadingDetail(false);
      });
  };

  /**
   * Retry generated payslip
   * @param {Number} id
   * @return {Promise}
   */
  const retryGenerate = async (id) => {
    swal({
      title: "Retry?",
      text: "Re-generate this process?",
      buttons: true,
      dangerMode: true,
      icon: "warning",
    }).then(async (isYes) => {
      if (isYes) {
        await http
          .post(`payslip-generate/${id}`)
          .then((res) => {
            notifSuccess("Success", "Payslip Regenerate Successfully");
            fetchDataGeneratedPayslip();
          })
          .catch(() => {
            notifError("Failed", "Unable To Regenerate This Payslip");
          });
      }
      return false;
    });
  };

  /**
   * It takes an object with a property called selectedRows, and returns an array of objects.
   */
  const handleSelectData = ({ selectedRows }) => {
    let data = [];
    selectedRows.forEach((value) => {
      data.push(value);
    });
    setSelectedRows(data);
  };

  /**
   * CHANGE HANDLER TO SELECT EMPLOYEE IN MODAL GENERATE
   * @param {Event} e
   */
  const handleSelectEmployee = (e) => {
    setFormGenerate({
      ...formGenerate,
      employee_id: e,
    });
  };

  /**
   * Handle checkbox generate form
   * @param {event} e
   */
  const onChangeCheckbox = (e) => {
    if (e.target.checked) {
      setFormGenerate({
        ...formGenerate,
        employee_id: [],
        checkbox: true,
        type: "all",
      });
    } else {
      setFormGenerate({
        ...formGenerate,
        checkbox: false,
        type: "selected",
      });
    }
  };

  /**
   * Generate Payslip
   * @param {Event} e
   * @returns
   */
  const generatePayslip = async (e) => {
    e.preventDefault();
    setLoadingGenerate(true);
    let form = new FormData();
    form.append("month", filterPayslip.month.value);
    form.append("years", filterPayslip.year.value);
    form.append("type", formGenerate.type);
    if (formGenerate.type === "selected") {
      if (formGenerate.employee_id.length === 0) {
        setLoadingGenerate(false);
        return notifError(
          "Employee Required",
          "Please select the employee or if You want to generate all employee data, please thick 'Generate All Employee'"
        );
      } else {
        let employeeId = [];
        for (let i = 0; i < formGenerate.employee_id.length; i++) {
          employeeId.push(formGenerate.employee_id[i].value);
        }
        form.append("employee_id", JSON.stringify(employeeId));
      }
    }
    await method
      .createDataWithoutUpload("payslip-generate", form)
      .then(() => {
        setLoadingGenerate(false);
        notifSuccess(
          "Success",
          "Payslip Successfully Generating in Queue. You can check the process at the bottom table"
        );
        fetchDataGeneratedPayslip();
        setModalGenerate(false);
      })
      .catch((err) => {
        let errData = err.response;
        if (errData.status > 400) {
          notifError("Failed", errData.data.data.message);
        } else {
          notifError(
            "Failed",
            "There's an error when generating payslip. Please check Your connection or contact us if issues still there"
          );
        }
        setLoadingGenerate(false);
      });
  };

  /**
   * HANDLE CLOSE MODAL DETAIL PAYSLIP
   */
  const handleCloseModalDetailPayslip = () => {
    setDetailPayslip({
      total_present: 0,
      employee: {},
      salaryIncome: [],
      salaryCuts: [],
      totalSalary: 0,
    });
    setModalDetailPayslip(false);
  };

  /**
   * On Click Edit Each Row Salary (Income or Cut)
   * @param {Event} e
   */
  const onEditSalary = (e) => {
    let key = e.target.getAttribute("data-key");
    let type = e.target.getAttribute("data-type");
    if (type === "income") {
      let cloneDataIncome = [...detailPayslip.salaryIncome];
      let obj = cloneDataIncome[key];
      obj["isDisabled"] = false;
      cloneDataIncome[key] = obj;
      setDetailPayslip({
        ...detailPayslip,
        salaryIncome: [...cloneDataIncome],
      });
    } else if (type === "cut") {
      let cloneDataCuts = [...detailPayslip.salaryCuts];
      let obj = cloneDataCuts[key];
      obj["isDisabled"] = false;
      cloneDataCuts[key] = obj;
      setDetailPayslip({
        ...detailPayslip,
        salaryCuts: [...cloneDataCuts],
      });
    } else {
      return false;
    }
  };

  /**
   * On Click Cancel Each Row Salary (Income or Cut)
   * @param {Event} e
   */
  const onCancelSalary = (e) => {
    let key = e.target.getAttribute("data-key");
    let type = e.target.getAttribute("data-type");
    if (type === "income") {
      let cloneDataIncome = [...detailPayslip.salaryIncome];
      let obj = cloneDataIncome[key];
      obj["isDisabled"] = true;
      obj["amount"] = cloneDataIncome[key].currentAmount;
      obj["currencyAmount"] = rupiahInputFormat(
        cloneDataIncome[key].currentAmount.toString(),
        "Rp. "
      );
      cloneDataIncome[key] = obj;
      setDetailPayslip({
        ...detailPayslip,
        salaryIncome: [...cloneDataIncome],
      });
    } else if (type === "cut") {
      let cloneDataCuts = [...detailPayslip.salaryCuts];
      let obj = cloneDataCuts[key];
      obj["isDisabled"] = true;
      obj["amount"] = cloneDataCuts[key].currentAmount;
      obj["currencyAmount"] = rupiahInputFormat(
        cloneDataCuts[key].currentAmount.toString(),
        "Rp. "
      );
      cloneDataCuts[key] = obj;
      setDetailPayslip({
        ...detailPayslip,
        salaryCuts: [...cloneDataCuts],
      });
    } else {
      return false;
    }
    sumTotalSalary();
  };

  /**
   * On Save Salary Data
   * @param {Event} e
   */
  const onSaveSalary = async (e) => {
    e.preventDefault();
    swal({
      title: "Update Amount",
      text: "Are You sure want to update this amount?",
      dangerMode: true,
      buttons: true,
    }).then(async (isYes) => {
      if (isYes) {
        let key = e.target.getAttribute("data-key");
        let type = e.target.getAttribute("data-type");
        let request = {
          id: 0,
          amount: 0,
          type: "",
        };
        if (type === "income") {
          request = {
            id: detailPayslip.salaryIncome[key]["id"],
            name: detailPayslip.salaryIncome[key]["salary_name"],
            amount: detailPayslip.salaryIncome[key]["amount"],
            type: "income",
          };
        } else if (type === "cut") {
          request = {
            id: detailPayslip.salaryCuts[key]["id"],
            name: detailPayslip.salaryCuts[key]["salary_name"],
            amount: detailPayslip.salaryCuts[key]["amount"],
            type: "cut",
          };
        } else {
          return false;
        }

        if (detailPayslip.totalSalary === 0) {
          return notifError("Failed", "Total salary should be greater than 0");
        }

        if (request.amount === null && request.amount === undefined) {
          return notifError(
            "Failed",
            "Amount should be greater or equal than 0"
          );
        }

        // PROCESS UPDATE
        await method
          .updateDataByIdWithPut("payslip", request.id, request)
          .then(() => {
            notifSuccess(
              "Success",
              `Amount ${request.name} successfully updated`
            );
            let cloneDataSalary;
            if (type === "income") {
              cloneDataSalary = [...detailPayslip.salaryIncome];
            } else if (type === "cut") {
              cloneDataSalary = [...detailPayslip.salaryCuts];
            }
            let obj = cloneDataSalary[key];
            let amount = type === "income" ? request.amount : -request.amount;
            obj["isDisabled"] = true;
            obj["amount"] = amount;
            obj["currentAmount"] = amount;
            obj["currencyAmount"] = rupiahInputFormat(
              amount.toString(),
              "Rp. "
            );
            cloneDataSalary[key] = obj;

            let salaryType = {};
            if (type === "income") {
              salaryType = {
                salaryIncome: [...cloneDataSalary],
              };
            } else if (type === "cut") {
              salaryType = {
                salaryCuts: [...cloneDataSalary],
              };
            }
            setDetailPayslip({
              ...detailPayslip,
              salaryType,
            });
          })
          .catch((err) => {
            let errData = err.response;
            if (errData.status > 400) {
              notifError("Failed", errData.data.data.message);
            } else {
              notifError(
                "Failed",
                "There's an error when generating payslip. Please check Your connection or contact us if issues still there"
              );
            }
          });
      }
    });
  };

  /**
   * Handle Change Income Salary
   * @param {Event} e
   */
  const handleChangeIncomeSalary = (e) => {
    let key = e.target.getAttribute("data-key");
    let cloneDataIncome = [...detailPayslip.salaryIncome];
    let obj = cloneDataIncome[key];
    if (e.target.name === "currencyAmount") {
      let amount = e.target.value;
      let explode = amount.replace(/[^\d.]/g, "").split(".");
      obj["amount"] = explode[1];
    }
    obj[e.target.name] = e.target.value;
    cloneDataIncome[key] = obj;
    setDetailPayslip({ ...detailPayslip, salaryIncome: [...cloneDataIncome] });
    sumTotalSalary();
  };

  /**
   * Handle Change Cuts Salary
   * @param {Event} e
   */
  const handleChangeCutSalary = (e) => {
    let key = e.target.getAttribute("data-key");
    let cloneDataCuts = [...detailPayslip.salaryCuts];
    let obj = cloneDataCuts[key];
    if (e.target.name === "currencyAmount") {
      let amount = e.target.value;
      let explode = amount.replace(/[^\d.]/g, "").split(".");
      obj["amount"] = explode[1];
    }
    obj[e.target.name] = e.target.value;
    cloneDataCuts[key] = obj;
    setDetailPayslip({ ...detailPayslip, salaryCuts: [...cloneDataCuts] });
    sumTotalSalary();
  };

  /**
   * SUM TOTAL SALARY AFTER CHANGE HANDLER
   */
  const sumTotalSalary = () => {
    let concatSalary = detailPayslip.salaryIncome.concat(
      detailPayslip.salaryCuts
    );
    let totalSalaryArr = [];
    concatSalary.forEach((value, key) => {
      if (!isNaN(value.amount)) {
        if (value.type === "income") {
          totalSalaryArr.push(parseFloat(value.amount));
        } else if (value.type === "cut") {
          totalSalaryArr.push(parseFloat(value.amount));
        }
      }
    });
    setDetailPayslip({
      ...detailPayslip,
      totalSalary: arraySum(totalSalaryArr),
    });
  };

  /**
   * PROCESS SENDING PAYSLIP
   * @param {Event} e 
   */
  const onSendPayslip = async (e) => {
    e.preventDefault();
    let form = new FormData();
    form.append("month", filterPayslip.month.value);
    form.append("year", filterPayslip.year.value);
    let confirmText = "Please confirm the number of digits for each salary component. You will not be able to change or re send the payslip that has been sent during this period.";
    let title = "";
    if (selectedRows.length > 0) {
      form.append("type", "selected");
      let employeeId = [];
      selectedRows.forEach((val) => {
        employeeId.push(val.id);
      });
      form.append("employeeId", JSON.stringify(employeeId));
      title = "Send Payslip To The Selected Employee?"        
    } else {
      form.append("type", "all");
      title = "Send Payslip To All Employee?"
    }
    // CONFIRM BUTTON
    swal({
      title,
      text: confirmText,
      icon: "warning",
      dangerMode: true,
      buttons: true,
    })
    .then(async (isYes) => {
      if (isYes) {
        setIsLoadingSendPayslip(true);
        await method.createDataWithoutUpload("send-payslip", form)
        .then(() => {
          setIsLoadingSendPayslip(false);
          if (selectedRows.length > 0) {
            setSelectedRows([]);
          }
          notifSuccess("Success", "Payslips have been successfully sent to employees. The message will be sent to email automatically.");
        })
        .catch((err) => {
          setIsLoadingSendPayslip(false);
          let errData = err.response;
          if (errData.status > 400) {
            notifError("Failed", errData.data.data.message);
          } else {
            notifError(
              "Failed",
              "There's an error when sending payslip. Please check Your connection or contact us if issues still there"
            );
          }
        })
      } else {
        return false;
      }
    })
  };

  /**
   * COMPONENT DID MOUNT
   */
  useEffect(() => {
    fetchDepartment();
    fetchDataPayslip();
    fetchDataGeneratedPayslip();
    fetchTotalWorkingDays();
    console.log(payslipStatus);
    return () => {
      setDataPayslip([]);
      setDataDepartement([]);
      setDataEmployee([]);
      setDataGeneratedPayslip([]);
    };
  }, [
    callbackDataPayslip,
    callbackDataGeneratedPayslip,
    callbackDataTotalWorkingDays,
  ]);

  return (
    <div
      className="tab-pane active"
      role="tabpanel"
      id="noanim-tab-example-tabpane-payslip"
    >
      <div
        className="col-xl-12 col-lg-8 col-md-11 col-sm-11 mt-2"
        style={{ width: "97%" }}
      >
        <CustomModalForm
          children={
            <ModalGeneratePayroll
              onChangeCheckbox={(e) => onChangeCheckbox(e)}
              checked={formGenerate.checkbox}
              employeeData={dataEmployee}
              employeeIdData={formGenerate.employee_id}
              onChange={(e) => handleSelectEmployee(e)}
            />
          }
          handleSure={(e) => generatePayslip(e)}
          handleClose={() => setModalGenerate(false)}
          show={modalGenerate}
          headerTitle={"Generate Payslip"}
          submitText={loadingGenerate ? "Generating..." : "Generate"}
        />

        <CustomModalDetail
          show={modalDetailPayslip}
          headerTitle={"Detail Payslip"}
          children={
            isLoadingDetail ? (
              <div className="row">
                <div className="col-12">Fetching Detail....</div>
              </div>
            ) : (
              <ModalDetailPayslip
                employeeData={detailPayslip.employee}
                presence={detailPayslip.presence}
                totalDays={totalWorkingDays}
                isError={isErrorDetail}
                salaryIncome={detailPayslip.salaryIncome}
                salaryCut={detailPayslip.salaryCuts}
                onEdit={(e) => onEditSalary(e)}
                onCancel={(e) => onCancelSalary(e)}
                handleChangeIncomeSalary={(e) => handleChangeIncomeSalary(e)}
                handleChangeCutSalary={(e) => handleChangeCutSalary(e)}
                onSave={(e) => onSaveSalary(e)}
                totalSalary={
                  detailPayslip ? detailPayslip.totalSalary.toString() : ""
                }
              />
            )
          }
          isEditable={false}
          size={"fullscreen"}
          handleClose={handleCloseModalDetailPayslip}
        />
        <div className="card card-shadow">
          <div className="card-body">
            {/* FILTER */}
            <div className="d-flex flex-wrap justify-content-start mb-2">
              <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 mb-3 p-3">
                <div className="row">
                  {/* FILTER MONTH */}
                  <div className="col-xl-2 col-lg-6 col-md-6 col-sm-6 mt-2">
                    <Select
                      id="month_filter"
                      options={MONTH_LIST}
                      styles={filterStyles}
                      className="high-index"
                      onChange={(e) =>
                        setFilterPayslip({ ...filterPayslip, month: e })
                      }
                      placeholder={"Select Status..."}
                      value={filterPayslip.month}
                    />
                  </div>
                  {/* FILTER YEARS */}
                  <div className="col-xl-2 col-lg-6 col-md-6 col-sm-6 mt-2">
                    <Select
                      id="years-filter"
                      className="high-index"
                      options={yearsFilter}
                      styles={filterStyles}
                      isClearable={false}
                      onChange={(e) => {
                        setFilterPayslip({
                          ...filterPayslip,
                          year: e,
                        });
                      }}
                      value={filterPayslip.year}
                    />
                  </div>
                  {/* SEARCH KEYWORD */}
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 mt-2">
                    <SearchFilterInput
                      onChangeInput={(e) => {
                        if (e.target.value === "") {
                          setFilterPayslip({
                            ...filterPayslip,
                            keyword: "",
                          });
                        }
                        setInputKeyword(e.target.value);
                      }}
                      onKeyDown={(e) => {
                        if (e.keyCode === 13) {
                          setFilterPayslip({
                            ...filterPayslip,
                            keyword: inputKeyword,
                          });
                        }
                      }}
                      input={inputKeyword}
                      canFilter={false}
                    />
                  </div>
                  {/* FILTER DEPAREMENT */}
                  <div className="col-xl-2 col-lg-6 col-md-6 col-sm-6 mt-2">
                    <Select
                      id="departement-filter"
                      className="high-index"
                      options={dataDepartement}
                      styles={filterStyles}
                      isClearable={
                        filterPayslip.departement !== null &&
                        filterPayslip.departement.value !== ""
                          ? true
                          : false
                      }
                      onChange={(e) => {
                        setFilterPayslip({
                          ...filterPayslip,
                          departement: e,
                        });
                      }}
                      placeholder={"All"}
                      value={filterPayslip.departement}
                    />
                  </div>
                </div>
              </div>

              <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
                <div
                  className="btn-group btn-group-xl"
                  style={{ float: "right", padding: "25px" }}
                >
                  <ButtonWhiteFilter
                    name="Export"
                    disabled={dataPayslip.length === 0}
                  />
                  <ButtonBlueFilter
                    name={isLoadingSendPayslip ? "Sending..." : "Send Payslip"}
                    disabled={
                      dataPayslip.length === 0 || payslipStatus.status === "2" || isLoadingSendPayslip ||
                      !isActionAllowed(
                        payslipPermission.permissions,
                        "payslip-send"
                      )
                    }
                    onClick={(e) => onSendPayslip(e)}
                  />
                  <ButtonPlaint
                    name="Generate Payroll"
                    onClick={() => setModalGenerate(true)}
                    disabled={!isActionAllowed(
                      payslipPermission.permissions,
                      "payslip-generate"
                    )}
                  />
                  <ButtonPlaint
                    name="Refresh"
                    onClick={() => fetchDataPayslip()}
                  />
                </div>
              </div>
            </div>

            {/* DATA */}
            <div className="table-responsive">
              <div className="col-12 text-center">
                {payslipStatus && payslipStatus.status === "0" ? (
                  <>
                    <h5 className="text-red">PAYSLIP STATUS : ALL GENERATED</h5>
                    <span className="text-red">
                      YOU CAN SEND THIS PAYSLIP TO ALL OR SELECTED EMPLOYEE
                    </span>
                  </>
                ) : payslipStatus && payslipStatus.status === "1" ? (
                  <>
                    <h5 className="text-red">
                      PAYSLIP STATUS : PARTIALLY SENT
                    </h5>
                    <span className="text-red">
                      THIS PAYSLIP PARTIALLY HAD BEEN SENT TO EMPLOYEE. YOU MAY
                      SEND SELECTED PAYSLIPS TO EMPLOYEES THAT HAVE NOT BEEN
                      SENT
                    </span>
                  </>
                ) : payslipStatus && payslipStatus.status === "2" ? (
                  <>
                    <h5 className="text-red">PAYSLIP STATUS : ALL SENT</h5>
                    <span className="text-red">
                      THIS PAYSLIP HAD BEEN SENT TO ALL EMPLOYEE. YOU CAN NOT
                      SEND OR EDIT THIS PAYSLIP.
                    </span>
                  </>
                ) : (
                  <>
                    <h5 className="text-red">PAYSLIP STATUS : NOT GENERATED</h5>
                    <span className="text-red">
                      THIS PAYSLIP HAVE NOT GENERATED YET. YOU CAN GENERATE THIS
                      PERIOD PAYSLIP.
                    </span>
                  </>
                )}
              </div>
              <DataTable
                columns={columnPayslipData(
                  onViewDetail,
                  filterPayslip.month.value,
                  filterPayslip.year.value
                )}
                title="Pasylip"
                data={dataPayslip}
                pagination
                progressPending={isLoading}
                selectableRows
                onSelectedRowsChange={handleSelectData}
                fixedHeader
                fixedHeaderScrollHeight={"100vh"}
              />
            </div>
          </div>
        </div>

        <div className="card card-shadow mt-3">
          <div className="card-body">
            <div className="d-flex flex-wrap mb-3">
              <div className="col-xl-12 col-lg-12 col-md-12">
                <div className="btn-group btn-group-xl float-end">
                  <ButtonPlaint
                    name="Refresh"
                    onClick={() => fetchDataGeneratedPayslip()}
                  />
                </div>
              </div>
            </div>
            {/* DATA GENERATED */}
            <div className="table-responsive">
              <DataTable
                columns={columnGeneratedPayslipData(retryGenerate)}
                title="Data Process Generate Pasylip"
                data={dataGeneratedPayslip}
                pagination
                progressPending={isLoadingDataGeneratedPayslip}
                fixedHeader
                fixedHeaderScrollHeight={"100vh"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payslip;

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from "react";
import Select from "react-select";
import SearchFilterInput from "../../../component/SearchFilterInput";
import { MONTH, MONTH_LIST } from "../../../utils/constant";
import { notifError, notifSuccess, yearsOption } from "../../../utils/helper";
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

const Payslip = () => {
  const date = new Date();
  const history = useHistory();
  const yearsFilter = yearsOption();
  const [dataPayslip, setDataPayslip] = useState([]);
  const [dataDepartement, setDataDepartement] = useState([]);
  const [dataEmployee, setDataEmployee] = useState([]);
  const [dataGeneratedPayslip, setDataGeneratedPayslip] = useState([]);
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
   * FETCH DATA PAYSLIP FROM CALLBACK
   */
  const fetchDataPayslip = () => {
    setIsLoading(true);
    callbackDataPayslip()
      .then((res) => {
        const data = res.data.data.data;
        let dataToState = [];
        for (let i = 0; i < data.length; i++) {
          let value = data[i];
          value["payment_date_current"] = `${data[i].payment_date} ${
            MONTH[filterPayslip.month.value - 1]
          } ${filterPayslip.year.label}`;
          dataToState.push(value);
        }
        fetchDataEmployeeNotInPayslip();

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

  const onViewDetail = (id) => {
    console.log(id);
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

  useEffect(() => {
    fetchDepartment();
    fetchDataPayslip();
    fetchDataGeneratedPayslip();
    return () => {
      setDataPayslip([]);
      setDataDepartement([]);
      setDataEmployee([]);
      setDataGeneratedPayslip([]);
    };
  }, [callbackDataPayslip, callbackDataGeneratedPayslip]);

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
                      onChangeInput={(e) =>
                        setFilterPayslip({
                          ...filterPayslip,
                          keyword: e.target.value,
                        })
                      }
                      input={filterPayslip.keyword}
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
                    name="Send Payslip"
                    disabled={dataPayslip.length === 0}
                  />
                  <ButtonPlaint
                    name="Generate Payroll"
                    onClick={() => setModalGenerate(true)}
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

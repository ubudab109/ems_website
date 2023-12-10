/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback, Fragment } from "react";
import Select from "react-select";
import swal from "sweetalert";
import DataTable from "react-data-table-component";
import { yearsOption } from "../../../utils/helper";
import { MONTH_LIST } from "../../../utils/constant";
import http from "../../../service/PrivateConfigRequest";
import method from "../../../service/Method";
import ButtonWhiteFilter from "../../../component/ButtonWhiteFilter";
import columnEmployeeOvertime from "../data/column_employee_overtime";
import { filterStyles } from "../../../style-component/ReactSelectFilterTable";
import { OVERTIME_STATUS_FILTER } from "../../../utils/constant";
import ButtonBlueFilter from "../../../component/ButtonBlueFilter";
import CustomModalDetail from "../../../component/CustomModalDetail";
import DetailOvertime from "../../../component/DetailOvertime";

const Overtime = ({ id }) => {
  const date = new Date();
  const [dataOverTime, setDataOvertime] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const yearsFilter = yearsOption();
  const [filterOvertime, setFilterOvertime] = useState({
    month: MONTH_LIST[date.getMonth()],
    year: {
      value: date.getFullYear(),
      label: date.getFullYear(),
    },
    status: {
      value: "",
      label: "All (Default)",
    },
  });
  const [selectedOvertime, setSelectedOvertime] = useState([]);
  const [detailOvertime, setDetailOvertime] = useState({});
  const [isFetchingDetail, setIsFetchingDetail] = useState(false);
  const [errorDetailOvertime, setErrorDetailOvertime] = useState(false);
  const [showModalDetailOvertime, setShowModalDetailOvertime] = useState(false);

  /**
   * This function returns a promise that resolves to the result of an HTTP GET request.
   * Request for get list overtime
   * @param {string} month
   * @param {string} year
   * @param {string} status
   * @returns {array} An array with a property called data.
   */
  const requestDataOvertime = async (month, year, status) => {
    return await http.get(
      `employee/${id}?type=overtime&date[month]=${month}&date[year]=${year}&status=${status}`
    );
  };

  /* A callback function that returns a promise that resolves to the result of an HTTP GET request. */
  const callbackDataOvertime = useCallback(() => {
    let month = filterOvertime.month.value;
    let year = filterOvertime.year.value;
    let status = filterOvertime.status.value;
    return requestDataOvertime(month, year, status);
  }, [filterOvertime.month, filterOvertime.status, filterOvertime.year]);

  /**
   * Request Get Detail Overtime
   * @param {number} overtimeId
   * @returns {Promise}
   */
  const requestDetailOvertime = async (overtimeId) => {
    return await http.get(`employee-overtime/${overtimeId}`);
  };

  /**
   * On View Click Handler
   * @param {number} overtimeId
   */
  const onViewDetail = (overtimeId) => {
    setShowModalDetailOvertime(true);
    setIsFetchingDetail(true);
    requestDetailOvertime(overtimeId)
      .then((res) => {
        let data = res.data.data;
        setDetailOvertime(data);
        setIsFetchingDetail(false);
      })
      .catch((err) => {
        setIsFetchingDetail(false);
        setErrorDetailOvertime(true);
        setErrorDetailOvertime("Error When Fetching Data");
      });
  };

  /**
   * It takes an object with a property called selectedRows, and returns an array of objects.
   * Select Data from table Employee
   */
   const handleSelectData = ({ selectedRows }) => {
    let data = [];
    selectedRows.forEach(value => {
      data.push(value);
    })
    setSelectedOvertime(data);
  };

  /**
   * When the user clicks the close button, close the modal, clear the detail overtime object, and set
   * the error detail overtime to false.
   */
  const handleCloseModalDetailOvertime = () => {
    setShowModalDetailOvertime(false);
    setErrorDetailOvertime(false);
  };

  /**
   * Fetching data overtime from callback then add to state
   */
  const fetchDataOvertime = () => {
    setIsLoading(true);
    callbackDataOvertime()
      .then((res) => {
        let data = res.data.data;
        setDataOvertime(data);
        setIsLoading(false);
      })
      .catch((err) => {
        swal({
          title: "Error When Fetching Data",
          text: "Check Your connection or contact us if the problem still there",
          icon: "error",
        });
        setIsLoading(false);
      });
  };

  /**
   * Handle to update selected overtime data
   * @param {event} e
   * @param {integer} id
   */
  const onSubmitEditOvertime = async (e, status) => {
    e.preventDefault();
    swal({
      title: `Are You Sure Want To ${status === '2' ? 'Reject' : 'Approve'} This Employee Overtime Status?`,
      buttons: true,
      dangerMode: true,
      icon: "warning",
    }).then(async (isYes) => {
      if (isYes) {
        let data = {
          id: [],
        };
        selectedOvertime.forEach(val => {
          data.id.push(val.id);
        })
        data.status = status;
        await method
          .updateDataPut("employee-overtime-status", data)
          .then(() => {
            swal("Overtime Status Successfully Updated", {
              icon: "success",
            });
            fetchDataOvertime();
          })
          .catch((err) => {
            const errorData = err.response.data;
            swal({
              title: "Failed To Update Overtime",
              text: errorData.message,
              icon: "error",
            });
          });
      }
    });
  };

  /**
   * Component Did Mount
   */
  useEffect(() => {
    fetchDataOvertime();
    return () => {
      setDataOvertime([]);
    };
  }, [callbackDataOvertime]);

  return (
    <Fragment>

      {/* MODAL DETAIL OVERTIME */}
      <CustomModalDetail 
        children={
          isFetchingDetail ? (
            <div className="row">
                <div className="col-12">Fetching Detail....</div>
              </div>
          ) :
          (
            <DetailOvertime 
              employeeId={detailOvertime.employee ? detailOvertime.employee.nip : ''}
              employeeName={detailOvertime.employee ? detailOvertime.employee.firstname + ' ' + detailOvertime.employee.lastname : ''}
              department={detailOvertime.employee ? detailOvertime.employee.division_name : ''}
              inRequest={detailOvertime ? detailOvertime.in : ''}
              outRequest={detailOvertime ? detailOvertime.out : ''}
              isEdit={false}
              desc={detailOvertime ? detailOvertime.description : ''}
              status={detailOvertime ? detailOvertime.status_name : ''}
              statusColor={detailOvertime ? detailOvertime.status_color : ''}
              takenDate={detailOvertime ? detailOvertime.date : ''}
              takenHour={detailOvertime ? detailOvertime.taken_hour : ''}
              isError={errorDetailOvertime}
              files={detailOvertime ? detailOvertime.files : []}
              key={1}
            />
          )
        }
        show={showModalDetailOvertime}
        handleClose={handleCloseModalDetailOvertime}
        headerTitle={'Detail Overtime'}
      />
      <div className="col-sm-12">
        <h5 className="text-blue-dark p-3">Employee Overtime</h5>
        <div className="d-flex flex-wrap justify-content-end mb-2">
          <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 mb-3 p-3">
            {/* FILTER */}
            <div className="row">
              {/* MONTH FILTER */}
              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 mt-2">
                <Select
                  id="status"
                  className="high-index"
                  options={MONTH_LIST}
                  styles={filterStyles}
                  isClearable={false}
                  onChange={(e) => {
                    setFilterOvertime({
                      ...filterOvertime,
                      month: e,
                    });
                  }}
                  value={filterOvertime.month}
                />
              </div>

              {/* YEAR  */}
              <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6 mt-2">
                <Select
                  id="status"
                  className="high-index"
                  options={yearsFilter}
                  styles={filterStyles}
                  isClearable={false}
                  onChange={(e) => {
                    setFilterOvertime({
                      ...filterOvertime,
                      year: e,
                    });
                  }}
                  value={filterOvertime.year}
                />
              </div>

              {/* STATUS */}
              <div className="col-xl-4 col-lg-12 col-md-12 col-sm-12 mt-2">
                <Select
                  id="status"
                  className="high-index mr-5"
                  options={OVERTIME_STATUS_FILTER}
                  styles={filterStyles}
                  isClearable={false}
                  onChange={(e) => {
                    setFilterOvertime({
                      ...filterOvertime,
                      status: e,
                    });
                  }}
                  value={filterOvertime.status}
                />
              </div>
            </div>
            {/* END FILTER */}
          </div>
          <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 mt-2">
            <div
              className="btn-group btn-group-xl"
              style={{ float: "right", padding: "15px" }}
            >
              <ButtonWhiteFilter onClick={e => onSubmitEditOvertime(e, '2')} disabled={selectedOvertime.length === 0} name="Declined" />
              <ButtonWhiteFilter name="Export" />
              <ButtonBlueFilter onClick={e => onSubmitEditOvertime(e, '1')} disabled={selectedOvertime.length === 0} name="Apply To Payroll" />
            </div>
          </div>
        </div>
        <div className="table-responsive">
          <DataTable
            columns={columnEmployeeOvertime(onViewDetail)}
            data={dataOverTime}
            pagination
            progressPending={isLoading}
            selectableRows
            onSelectedRowsChange={handleSelectData}
            fixedHeader
            fixedHeaderScrollHeight={"100vh"}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default Overtime;

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useEffect, Fragment } from "react";
import swal from "sweetalert";
import Select from 'react-select';
import DataTable from "react-data-table-component";
import http from "../../../service/PrivateConfigRequest";
import { yearsOption } from "../../../utils/helper";
import { MONTH_LIST, PAID_LEAVE_STATUS_FILTER } from "../../../utils/constant";
import { filterStyles } from "../../../style-component/ReactSelectFilterTable";
import columnEmployeePaidLeave from "../data/column_employee_paid_leave";
import CustomModalDetail from "../../../component/CustomModalDetail";
import method from "../../../service/Method";
import DetailPaidLeave from "../../../component/DetailPaidLeave";

const PaidLeave = ({ id }) => {
  const date = new Date();
  const [dataPaidLeave, setDataPaidLeave] = useState([]);
  const [dataEmployee, setDataEmployee] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const yearsFilter = yearsOption();
  const [filterPaidLeave, setFilterPaidLeave] = useState({
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
  const [detailPaidLeave, setDetailPaidLeave] = useState({});
  const [detailStatusPaidLeave, setDetailStatusPaidLeave] = useState({
    name: "status",
    value: "",
    label: "",
  });
  const [isFetchingDetail, setIsFetchingDetail] = useState(false);
  const [showModalDetail, setShowModalDetail] = useState(false);
  const [errorDetailPaidLeave, setErrorDetailPaidLeave] = useState({
    status: false,
    message: "",
  });

  /**
   * This function returns a promise that resolves to the result of an HTTP GET request.
   * Request for get list paid leave
   * @param {string} month
   * @param {string} year
   * @param {string} status
   * @returns {array} An array with a property called data.
   */
  const requestDataPaidLeave = async (month, year, status) => {
    return await http.get(
      `employee/${id}?type=leave&date[month]=${month}&date[year]=${year}&status=${status}`
    );
  };

  /* A callback function that returns a promise that resolves to the result of an HTTP GET request. */
  const callbackDataPaidLeave = useCallback(() => {
    let month = filterPaidLeave.month.value;
    let year = filterPaidLeave.year.value;
    let status = filterPaidLeave.status.value;
    return requestDataPaidLeave(month, year, status);
  }, [filterPaidLeave]);

  /**
   * "This function returns a promise that resolves to the result of an HTTP GET request to the URL
   * 'employee-paid-leave/{paidLeaveId}'".
   * @param {number} paidLeaveId
   * @returns The return value of the async function is a promise.
   */
  const requestDetailPaidLeave = async (paidLeaveId) => {
    return await http.get(`employee-paid-leave/${paidLeaveId}`);
  };

  /**
   * On View Click Handler
   * @param {number} paidLeaveId
   */
  const onViewDetail = (paidLeaveId) => {
    setShowModalDetail(true);
    setIsFetchingDetail(true);
    requestDetailPaidLeave(paidLeaveId)
      .then((res) => {
        let data = res.data.data.data;
        setDetailStatusPaidLeave({
          name: "status",
          label: data.status_name,
          value: data.status
        });
        setDetailPaidLeave(data);
        setIsFetchingDetail(false);
      })
      .catch(() => {
        setIsFetchingDetail(false);
        setErrorDetailPaidLeave({
          status: true,
          message:
            "Failed. There's an error when fetching data. Please try again. If error still showing, You can contact the administrator",
        });
      });
  };

  /**
   * If the user clicks the button, then a modal will appear asking the user if they want to approve,
   * reject, or cancel the paid leave. If the user clicks yes, then the paid leave status will be
   * updated.
   * @param {event} e 
   * @param {string} status 
   * @param {number} id 
   */
  const updateStatusPaidLeave = (e, status, id) => {
    e.preventDefault();
    swal({
      title: `Are You Sure Want To ${status === '2' ? 'Reject' : (status === '0' ? 'Cancel' : 'Approve')} This Employee Paid Leave Status?`,
      buttons: true,
      dangerMode: true,
      icon: "warning"
    }).then(async (isYes) => {
      if (isYes) {
        let data = {
          onlyStatus: 1,
          status: status,
        };
        await method.updateDataByIdWithPut('employee-paid-leave', id, data)
        .then(() => {
          swal("Paid Leave Status Successfully Updated", {
            icon: "success",
          });
          if (showModalDetail) {
            setShowModalDetail(false);
          }
          fetchDataPaidLeave();
        }).catch(() => {
          swal({
            title: "Failed To Update Paid Leave",
            text: "Please check Your form. Contact administrator if the problem still exists",
            icon: "error",
          });
        })
      }
    });
  }

  /**
   * OnCancelApproved is a function that takes in an event, a status, and an id, and then calls the
   * updateStatusPaidLeave function with the event, status, and id.
   * @param {event} e 
   * @param {string} status 
   * @param {number} id 
   */
  const onCancelApproved = (e, status, id) => {
    updateStatusPaidLeave(e, status, id);
  }

  /**
   * When the user clicks the button, close the modal and reset the error state.
   */
  const handleCloseModalDetailPaidLeave = () => {
    setShowModalDetail(false);
    setErrorDetailPaidLeave({ status: false, message: "" });
  };

  /**
   * It fetches data from the API and then sets the data to the state.
   */
  const fetchDataPaidLeave = () => {
    setIsLoading(true);
    callbackDataPaidLeave()
      .then((res) => {
        let data = res.data.data;
        setDataEmployee(data.employee);
        setDataPaidLeave(data.leave);
        setIsLoading(false);
      })
      .catch(() => {
        swal({
          title: "Error When Fetching Data",
          text: "Check Your connection or contact us if the problem still there",
          icon: "error",
        });
        setIsLoading(false);
      });
  };

  /**
   * COMPONENT DID MOUNT
   */
  useEffect(() => {
    fetchDataPaidLeave();
    return () => {
      setDataEmployee({});
      setDataPaidLeave([]);
    };
  }, [callbackDataPaidLeave]);

  return (
    <Fragment>

      {/* MODAL DETAIL */}
      <CustomModalDetail 
          children = {
            isFetchingDetail ? (
              <div className="row">
                  <div className="col-12">Fetching Detail....</div>
                </div>
            ) :
            (
              <DetailPaidLeave 
                startDate={detailPaidLeave ? detailPaidLeave.start_date : ''}
                endDate={detailPaidLeave ? detailPaidLeave.end_date : ''}
                taken={detailPaidLeave ? detailPaidLeave.taken : ''}
                status={detailStatusPaidLeave ? detailStatusPaidLeave : ''}
                desc={detailPaidLeave ? detailPaidLeave.desc : ''}
                employee={detailPaidLeave && detailPaidLeave.employee ? detailPaidLeave.employee : {}}
                department={detailPaidLeave && detailPaidLeave.department ? detailPaidLeave.department : {}}
                files={detailPaidLeave && detailPaidLeave.files ? detailPaidLeave.files : []}
                isError={errorDetailPaidLeave.status}
                onChangeStatus={(e) => setDetailStatusPaidLeave(e)}
              />
            )
          }
          show={showModalDetail}
          handleClose={handleCloseModalDetailPaidLeave}
          headerTitle={'Detail Paid Leave'}
          isEditable={detailStatusPaidLeave.value !== '2'}
          handleSave={e => updateStatusPaidLeave(e, detailStatusPaidLeave.value, detailPaidLeave.id)}
      />
      <div className="col-sm-12">
        <div className="row justify-content-center">
          <div className="col-xl-6 col-md-12"></div>
          <div className="col-xl-6 col-md-12"></div>
        </div>
      </div>

      {/* PAID LEAVE DATA */}
      <div className="col-sm-12">
        <h5 className="text-blue-dark p-3">Employee Paid Leave</h5>
        <div className="d-flex flex-wrap justify-content-start mb-2">
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
                    setFilterPaidLeave({
                      ...filterPaidLeave,
                      month: e,
                    });
                  }}
                  value={filterPaidLeave.month}
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
                    setFilterPaidLeave({
                      ...filterPaidLeave,
                      year: e,
                    });
                  }}
                  value={filterPaidLeave.year}
                />
              </div>

              {/* STATUS */}
              <div className="col-xl-4 col-lg-12 col-md-12 col-sm-12 mt-2">
                <Select
                  id="status"
                  className="high-index mr-5"
                  options={PAID_LEAVE_STATUS_FILTER}
                  styles={filterStyles}
                  isClearable={false}
                  onChange={(e) => {
                    setFilterPaidLeave({
                      ...filterPaidLeave,
                      status: e,
                    });
                  }}
                  value={filterPaidLeave.status}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="table-responsive">
          <DataTable 
            columns={columnEmployeePaidLeave(onViewDetail, onCancelApproved)}
            data={dataPaidLeave}
            pagination
            progressPending={isLoading}
            fixedHeader
            fixedHeaderScrollHeight={"100vh"}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default PaidLeave;

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback, Fragment } from "react";
import Select from "react-select";
import { notifError, notifSuccess, yearsOption } from "../../../utils/helper";
import {
  MONTH_LIST,
  REIMBURSEMENT_STATUS_FILTER,
} from "../../../utils/constant";
import http from "../../../service/PrivateConfigRequest";
import { filterStyles } from "../../../style-component/ReactSelectFilterTable";
import ButtonWhiteFilter from "../../../component/ButtonWhiteFilter";
import DataTable from "react-data-table-component";
import columnEmployeeReimbursement from "../data/column_employee_reimbursement";
import CustomModalDetail from "../../../component/CustomModalDetail";
import DetailReimbursement from "../../../component/DetailReimbursement";
import swal from "sweetalert";
import method from "../../../service/Method";

const Reimbursement = ({ id }) => {
  const date = new Date();
  const [dataReimbers, setDataReimbers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const yearsFilter = yearsOption();
  const [filterData, setFilterData] = useState({
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
  const [selectedData, setSelectedData] = useState([]);
  const [detailData, setDetailData] = useState({
    id: '',
    date: '',
    claim_type: '',
    amount: '',
    status: {
      name: "status",
      value: '',
      label: '',
    },
    employee: {
      firstname: '',
      lastname: '',
      nip: '',
    },
    files: [],
  });
  const [isFetchingDetail, setIsFetchingDetail] = useState(false);
  const [errorDetailData, setErrorDetailData] = useState({
    status: false,
    message: "",
  });
  const [showModalDetailData, setShowModalDetailData] = useState(false);

  /**
   * Request for get list reimbursement data
   * @param {string} month string
   * @param {string} year
   * @param {string} status
   * @returns
   */
  const requestData = async (month, year, status) => {
    return await http.get(
      `employee/${id}?type=reiumbershment&date[month]=${month}&date[year]=${year}&status=${status}`
    );
  };

  /* A callback function that returns a promise that resolves to the result of an HTTP GET request. */
  const callBackData = useCallback(() => {
    let month = filterData.month.value;
    let year = filterData.year.value;
    let status = filterData.status.value;
    return requestData(month, year, status);
  }, [filterData]);

  /**
   * Request Get Detail Reimbursement
   * @param {number} reimbursementId
   * @returns {Promise}
   */
  const requestDetailReimbursement = async (reimbursementId) => {
    return await http.get(`employee-reimbursement/${reimbursementId}`);
  };

  /**
   * On View Click Handler
   * @param {number} reimbursementId
   */
  const onViewDetail = (reimbursementId) => {
    setShowModalDetailData(true);
    setIsFetchingDetail(true);
    requestDetailReimbursement(reimbursementId)
      .then((res) => {
        let data = res.data.data;
        setDetailData({
          id: data.id,
          date: data.date,
          claim_type: data.claim_type,
          amount: data.amount,
          status: {
            name: "status",
            value: data.status,
            label: data.status_name,
          },
          employee: {
            firstname: data.employee.firstname,
            lastname: data.employee.lastname,
            nip: data.employee.nip,
          },
          files: data.files,
        });
        setIsFetchingDetail(false);
      })
      .catch(() => {
        setIsFetchingDetail(false);
        setErrorDetailData({
          status: false,
          message:
            "Error When Fetching Data. Please Reload This Page or Check Your Connection",
        });
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
    setSelectedData(data);
  };

  /**
   * Handle click on close modal detail
   */
  const handleCloseModalDetail = () => {
    setShowModalDetailData(false);
    setErrorDetailData({
      status: false,
      message: "",
    });
  };

  /**
   * Fetching data reimbursement from callback then add to state
   */
  const fetchDataReimbursement = () => {
    setIsLoading(true);
    callBackData()
      .then((res) => {
        let data = res.data.data;
        setDataReimbers(data);
        setIsLoading(false);
      })
      .catch(() => {
        notifError(
          "Error When Fetching Data",
          "Check your connection or contact us if the problem still there"
        );
        setIsLoading(false);
      });
  };

  /**
   * Handle to update selected reimbursement
   * @param {Event} e
   * @param {integer} status
   */
  const onSubmitEditReimbursement = async (e, status) => {
    e.preventDefault();
    swal({
      title: `Are You Sure Want To ${
        status === "2" ? "Reject" : "Approve"
      } This Employee Overtime Status?`,
      buttons: true,
      dangerMode: true,
      icon: "warning"
    }).then(async (isYes) => {
      if (isYes) {
        let reqBody = {
          onlyStatus: 1,
          status: status,
        };
        await method.updateDataByIdWithPut('employee-reimbursement', detailData.id, reqBody)
        .then(() => {
          notifSuccess("Success", "Reimbursemeng Status Successfully Updated");
          fetchDataReimbursement();
          handleCloseModalDetail();
        })
        .catch(() => {
          notifError("Failed", "Please check Your form. Contact administrator if the problem still exists")
        })
      }
    });
  };

  /**
   * COMPONENT DID MOUNT
   */
  useEffect(() => {
    fetchDataReimbursement();
    return () => {
      setDataReimbers([]);
    };
  }, [callBackData]);

  return (
    <Fragment>
      {/* MODAL DETAIL */}
      <CustomModalDetail
        children={
          isFetchingDetail ? (
            <div className="row">
              <div className="col-12">Fetching Detail....</div>
            </div>
          ) : (
            <DetailReimbursement
              claim_type={detailData ? detailData.claim_type : ''}
              employee={detailData && detailData.employee ? detailData.employee : {}}
              files={detailData && detailData.files ? detailData.files : []}
              isError={errorDetailData.status}
              onChangeStatus={(e) => {
                setDetailData({...detailData, status: e})
              }}
              date={detailData ? detailData.date : ''}
              status={detailData ? detailData.status : ''}
              total={detailData ? detailData.amount : ''}
            />
          )
        }
        show={showModalDetailData}
        handleClose={handleCloseModalDetail}
        headerTitle={"Detail Reimbursement"}
        isEditable={detailData && detailData.status.value !== "2"}
        handleSave={(e) => onSubmitEditReimbursement(e, detailData.status.value)}
      />
      <div className="col-sm-12">
        <h5 className="text-blue-dark p-3">Employee Reimbursement</h5>
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
                    setFilterData({
                      ...filterData,
                      month: e,
                    });
                  }}
                  value={filterData.month}
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
                    setFilterData({
                      ...filterData,
                      year: e,
                    });
                  }}
                  value={filterData.year}
                />
              </div>

              {/* STATUS */}
              <div className="col-xl-4 col-lg-12 col-md-12 col-sm-12 mt-2">
                <Select
                  id="status"
                  className="high-index mr-5"
                  options={REIMBURSEMENT_STATUS_FILTER}
                  styles={filterStyles}
                  isClearable={false}
                  onChange={(e) => {
                    setFilterData({
                      ...filterData,
                      status: e,
                    });
                  }}
                  value={filterData.status}
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
              <ButtonWhiteFilter name="Export" />
            </div>
          </div>
        </div>
        <div className="table-responsive">
          {/* DATA */}
          <DataTable
            columns={columnEmployeeReimbursement(onViewDetail)}
            data={dataReimbers}
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

export default Reimbursement;

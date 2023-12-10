/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useEffect, useRef } from "react";
import Select from "react-select";
import { filterStyles } from "../../../style-component/ReactSelectFilterTable";
import { useHistory } from "react-router-dom";
import http from "../../../service/PrivateConfigRequest";
import moment from "moment";
import {
  defaultNotifError,
  notifError,
  notifSuccess,
  rupiahInputFormat,
} from "../../../utils/helper";
import swal from "sweetalert";
import { Fragment } from "react";
import DataTable from "react-data-table-component";
import columnReimbersementFinanceData from "../data/column_reimbersement_finance_data";
import SearchFilterInput from "../../../component/SearchFilterInput";
import { REIMBURSEMENT_STATUS_FILTER } from "../../../utils/constant";
import ButtonWhiteFilter from "../../../component/ButtonWhiteFilter";
import DateButtonPicker from "../../../component/DateButtonPicker";
import DropdownDepartment from "../../employee/components/DropdownDepartment";
import CustomModalDetail from "../../../component/CustomModalDetail";
import ModalDetailReimbersement from "../modal/ModalDetailReimbersement";
import method from "../../../service/Method";
import ModalCreateClaimType from "../modal/ModalCreateClaimType";

const Reimbursement = () => {
  const history = useHistory();
  const [dataReimbersement, setDataReimbersement] = useState([]);
  const [dataClaim, setDataClaim] = useState([]);
  const [dataDepartement, setDataDepartement] = useState([]);
  const [detailReimbersement, setDetailReimbersement] = useState({});
  const [detailClaimType, setDetailClaimType] = useState({});
  const [selectedData, setSelectedData] = useState([]);
  const [inputKeyword, setInputKeyword] = useState("");
  const [filterData, setFilterData] = useState({
    keyword: "",
    date: Date.now(),
    department: {
      value: "",
      label: "Department",
    },
    status: {
      value: "",
      label: "Status",
    },
    claim_type_id: "",
    claim_type: {
      id: "",
      name: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDetailReimbersement, setIsLoadingDetailReimbersement] =
    useState(false);
  const [isLoadingDetailClaim, setIsLoadingDetailClaim] = useState(false);
  const dateRef = useRef();
  const [modalDetail, setModalDetail] = useState(false);
  const [modalDetailClaim, setModalDetailClaim] = useState(false);
  const [modalClaimCreate, setModalClaimCreate] = useState(false);
  const [error, setError] = useState({
    detailReimbersement: false,
    detailClaim: false,
  });
  const [statusInput, setStatusInput] = useState({
    reimberseStatus: {
      name: "status",
      value: "",
      label: "",
    },
  });
  const [formClaimType, setFormClaimType] = useState({
    name: "",
    max_claim: "",
  });
  const [loadingSave, setLoadingSave] = useState({
    reimbursementUpdate: false,
    claimUpdate: false,
    claimCreate: false,
    export: false,
  });

  /**
   * On Change Date Filter
   * @param {String} value
   */
  const onChangeDateFilter = (value) => {
    setFilterData({ ...filterData, date: value });
  };

  /**
   * On Change Claim Type Filter
   * @param {Number} value
   */
  const onChangeClaimType = (value) => {
    setFilterData({ ...filterData, claim_type_id: value });
  };

  /**
   * REQUEST GET LIST REIMBERSEMENT
   * @param {String} keyword
   * @param {String} date
   * @param {String} status
   * @param {Number} claimTypeId
   * @returns {Promise}
   */
  const requestListReimbersement = async (
    keyword,
    date,
    status,
    claimTypeId
  ) => {
    return await http.get(
      `employee-reimbursement?keyword=${keyword}&date=${date}&status=${status}&claim_type_id=${claimTypeId}`
    );
  };

  /**
   * CALLBACK REQUEST LIST REIMBERSEMENT
   */
  const callbackListReimbersement = useCallback(() => {
    let keyword = filterData.keyword;
    let date = moment(new Date(filterData.date))
      .format("YYYY-MM-DD")
      .toString();
    let status = filterData.status.value;
    let claimType = filterData.claim_type_id;
    return requestListReimbersement(keyword, date, status, claimType);
  }, [filterData]);

  /**
   * FETCH DATA DEPARTEMENT
   */
  const fetchDataDepartment = async () => {
    await http.get(`dataset/department?filter=1`).then((res) => {
      const data = res.data.data;
      setDataDepartement(data);
    });
  };

  /**
   * FETCH DATA CLAIM TYPE
   */
  const fetchDataClaimType = async () => {
    await http.get("dataset/claim-type").then((res) => {
      const data = res.data.data;
      setDataClaim(data);
    });
  };

  /**
   * FETCH DATA REIMBERSEMENT FROM CALLBACK
   */
  const fetchReimbersement = () => {
    callbackListReimbersement()
      .then((res) => {
        const data = res.data.data.data;
        setDataReimbersement(data);
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
          swal("Error when fetching data", {
            text: "Check Your connection or contact us if the problem still there",
            icon: "error",
          });
        }
        setIsLoading(false);
      });
  };
  /**
   * HANDLE OPEN OR CLOSE MODAL DETAIL REIMBERSEMENT
   * @param {Number} id - ID REIMBERSEMENT
   */
  const handleModalDetailReimbersement = async (id) => {
    if (modalDetail) {
      setDetailReimbersement({});
      setModalDetail(false);
    } else {
      setModalDetail(true);
      setIsLoadingDetailReimbersement(true);
      await http
        .get(`employee-reimbursement/${id}`)
        .then((res) => {
          const data = res.data.data;
          console.log(data);
          setDetailReimbersement(data);
          setIsLoadingDetailReimbersement(false);
          setStatusInput({
            ...statusInput,
            reimberseStatus: {
              name: "status",
              value: data.status,
              label: data.status_name,
            },
          });
          setError({ ...error, detailReimbersement: false });
        })
        .catch(() => {
          setIsLoadingDetailReimbersement(false);
          setError({ ...error, detailReimbersement: true });
        });
    }
  };

  /**
   * HANDLE MODAL DETAIL CLAIM
   * @param {Number} id - ID Claim Type
   */
  const handleModalDetailClaim = async (id) => {
    if (modalDetailClaim) {
      setDetailClaimType({});
      setModalDetailClaim(false);
    } else {
      setModalDetailClaim(true);
      setIsLoadingDetailClaim(true);
      await http
        .get(`claim-type/${id}`)
        .then((res) => {
          const data = res.data.data;
          setDetailClaimType(data);
          setIsLoadingDetailClaim(false);
        })
        .catch(() => {
          setIsLoadingDetailClaim(false);
          setModalDetailClaim(false);
          notifError(
            "Failed",
            "There is an error or data not found. You can refresh new data first"
          );
        });
    }
  };

  /**
   * HANLDE MODAL CREATE CLAIM
   */
  const handleModalCreateClaim = () => {
    if (modalClaimCreate) {
      setModalClaimCreate(false);
    } else {
      setModalClaimCreate(true);
    }
  };

  /**
   * It takes an object with a property called selectedRows, and returns an array of objects.
   * Select Data from table Employee
   */
  const handleSelectData = ({ selectedRows }) => {
    let data = [];
    selectedRows.forEach((value) => {
      data.push(value);
    });
    setSelectedData(data);
  };

  /**
   * Handle save update reimbursement
   * @param {Event} e
   */
  const handleSaveReimbursement = async (e) => {
    e.preventDefault();
    swal({
      title: "Update Reimbersement",
      text: `Are You sure want to update this reimbursement to ${statusInput.reimberseStatus.label}?`,
      dangerMode: true,
      icon: "warning",
      buttons: true,
      closeOnClickOutside: false,
    }).then(async (isYes) => {
      if (isYes) {
        setLoadingSave({ ...loadingSave, reimbursementUpdate: true });
        let request = {
          onlyStatus: 1,
          status: statusInput.reimberseStatus.value,
        };
        await method
          .updateDataByIdWithPut(
            "employee-reimbursement",
            detailReimbersement.id,
            request
          )
          .then(() => {
            setLoadingSave({ ...loadingSave, reimbursementUpdate: false });
            notifSuccess(
              "Success",
              "Reiumbersement status successfully updated"
            );
            setModalDetail(false);
            fetchReimbersement();
          })
          .catch(() => {
            setLoadingSave({ ...loadingSave, reimbursementUpdate: false });
            notifError(
              "Failed",
              "There is an error when updating. Please try again or contact us if problem still there"
            );
          });
      } else {
        return false;
      }
    });
  };

  /**
   * HANDLE CREATE OR UPDATE CLAIM TYPE
   * @param {Event} e
   * @param {String} type
   */
  const handleSaveClaimType = async (e, type) => {
    e.preventDefault();
    if (type === "create") {
      setLoadingSave({
        ...loadingSave,
        claimCreate: true,
      });
      let formData = new FormData();
      formData.append("name", formClaimType.name);
      let amount = formClaimType.max_claim;
      let explode = amount.replace(/[^\d.]/g, "").split(".");
      formData.append("max_claim", explode[1]);
      await method
        .createDataWithoutUpload("claim-type", formData)
        .then(() => {
          setLoadingSave({
            ...loadingSave,
            claimCreate: false,
          });
          notifSuccess("Success", "Claim Type Created Successfully");
          setModalClaimCreate(false);
          fetchDataClaimType();
          setFormClaimType({
            name: "",
            max_claim: "",
          });
        })
        .catch(() => {
          setLoadingSave({
            ...loadingSave,
            claimCreate: false,
          });
          notifError(
            "Failed",
            "There is an error. Please try again or contact us if problem still there"
          );
        });
    } else if (type === "update") {
      setLoadingSave({
        ...loadingSave,
        claimUpdate: true,
      });
      let amount = detailClaimType.max_claim;
      let explode = amount.replace(/[^\d.]/g, "").split(".");
      let param = {
        name: detailClaimType.name,
        max_claim: explode[1],
      };
      await method
        .updateDataByIdWithPut("claim-type", detailClaimType.id, param)
        .then(() => {
          setLoadingSave({
            ...loadingSave,
            claimUpdate: false,
          });
          notifSuccess("Success", "Claim Type Created Successfully");
          setModalDetailClaim(false);
          fetchDataClaimType();
          setDetailClaimType({});
        })
        .catch(() => {
          setLoadingSave({
            ...loadingSave,
            claimUpdate: false,
          });
          notifError(
            "Failed",
            "There is an error. Please try again or contact us if problem still there"
          );
        });
    } else {
      return false;
    }
  };

  /**
   * EXPORT DATA REIMBURSEMENT
   * @param {Event} e
   */
  const onExport = async (e) => {
    e.preventDefault();
    let form = new FormData();
    let text = "";
    form.append("export_type", "all");
    form.append(
      "date",
      moment(new Date(filterData.date)).format("YYYY-MM-DD").toString()
    );

    if (selectedData.length < 1) {
      text = "Are You sure want to export ALL Reimbursement data employee?";
      form.append("type", "all");
    } else {
      text =
        "Are You sure want to export SELECTED data Reimbursement employee?";
      form.append("type", "selected");
      selectedData.forEach((val, _) => {
        form.append("reimbursement_id[]", val.id);
      });
    }

    swal({
      title: "Export",
      text,
      icon: "warning",
      dangerMode: true,
      buttons: true,
    }).then(async (isYes) => {
      if (isYes) {
        setLoadingSave({ ...loadingSave, export: true });
        await method
          .createDataWithoutUpload("export-reimbursement", form)
          .then((res) => {
            notifSuccess(
              "Success",
              "Reimbursement data successfully exported. You can check the process at the Storage menu"
            );
            setLoadingSave({ ...loadingSave, export: false });
          })
          .catch(() => {
            defaultNotifError("Export Reimbursement");
            setLoadingSave({ ...loadingSave, export: false });
          });
      } else {
        return false;
      }
    });
  };

  /**
   * COMPONENT DID MOUNT
   */
  useEffect(() => {
    setIsLoading(true);
    fetchReimbersement();
    if (dataClaim.length < 1) {
      fetchDataClaimType();
    }
    if (dataDepartement.length < 1) {
      fetchDataDepartment();
    }
    return () => {
      setDataReimbersement([]);
    };
  }, [callbackListReimbersement]);

  return (
    <Fragment>
      {/* DETAIL REIMBERSEMENT */}
      <CustomModalDetail
        show={modalDetail}
        handleClose={() => {
          setDetailReimbersement({});
          setModalDetail(false);
        }}
        headerTitle={"Detail Reimbersement"}
        children={
          isLoadingDetailReimbersement ? (
            <div className="row">
              <div className="col-12">Fetching Detail....</div>
            </div>
          ) : (
            <ModalDetailReimbersement
              date={detailReimbersement ? detailReimbersement.date : ""}
              employee={
                detailReimbersement && detailReimbersement.employee
                  ? detailReimbersement.employee
                  : {
                      firstname: "",
                      lastname: "",
                      nip: "",
                      division_name: "",
                    }
              }
              amount={detailReimbersement ? detailReimbersement.amount : ""}
              claimType={
                detailReimbersement && detailReimbersement.claim_type
                  ? detailReimbersement.claim_type.name
                  : ""
              }
              reimberseStatus={
                detailReimbersement ? detailReimbersement.status : ""
              }
              files={detailReimbersement ? detailReimbersement.files : []}
              isError={error.detailReimbersement}
              status={statusInput.reimberseStatus}
              onChangeStatus={(e) =>
                setStatusInput({ ...statusInput, reimberseStatus: e })
              }
            />
          )
        }
        isEditable
        handleSave={(e) => handleSaveReimbursement(e)}
        buttonName={loadingSave.reimbursementUpdate ? "Saving..." : "Save"}
        disabledButtonSave={loadingSave.reimbursementUpdate}
      />

      {/* MODAL CREATE CLAIM TYPE */}
      <CustomModalDetail
        show={modalClaimCreate}
        buttonName={loadingSave.claimCreate ? "Creating..." : "Submit"}
        headerTitle={"Create Claim Type"}
        isEditable
        disabledButtonSave={loadingSave.claimCreate}
        handleClose={() => setModalClaimCreate(false)}
        handleSave={(e) => handleSaveClaimType(e, "create")}
        children={
          <ModalCreateClaimType
            name={formClaimType.name}
            max_claim={formClaimType.max_claim}
            onChangeInput={(e) => {
              setFormClaimType({
                ...formClaimType,
                [e.target.name]: e.target.value,
              });
            }}
          />
        }
      />

      {/* MODAL DETAIL CLAIM TYPE */}
      <CustomModalDetail
        show={modalDetailClaim}
        buttonName={loadingSave.claimUpdate ? "Saving..." : "Save"}
        headerTitle={"Update Claim Type"}
        isEditable
        disabledButtonSave={loadingSave.claimUpdate}
        handleClose={() => {
          setDetailClaimType({});
          setModalDetailClaim(false);
        }}
        handleSave={(e) => handleSaveClaimType(e, "update")}
        children={
          isLoadingDetailClaim ? (
            <div className="row">
              <div className="col-12">Fetching Detail....</div>
            </div>
          ) : (
            <ModalCreateClaimType
              name={detailClaimType.name}
              max_claim={detailClaimType.max_claim}
              onChangeInput={(e) => {
                setDetailClaimType({
                  ...detailClaimType,
                  [e.target.name]: e.target.value,
                });
              }}
            />
          )
        }
      />
      <div className="row">
        <div className="col-xl-9 col-lg-8 col-md-12 col-sm-12">
          <div className="d-flex flex-wrap justify-content-end mb-2">
            <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 mb-3">
              <div className="row">
                {/* KEYWORD SEARCH */}
                <div className="col-xl-5 col-lg-6 col-md-6 col-sm-6 mb-2">
                  <SearchFilterInput
                    onChangeInput={(e) => {
                      if (e.target.value === "") {
                        setFilterData({
                          ...filterData,
                          keyword: "",
                        });
                      }
                      setInputKeyword(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      if (e.keyCode === 13) {
                        setFilterData({
                          ...filterData,
                          keyword: inputKeyword,
                        });
                      }
                    }}
                    input={inputKeyword}
                    canFilter={false}
                  />
                </div>

                {/* FILTER DEPARTMENT */}
                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6">
                  {/* FILTER DEPARTMENT */}
                  <Select
                    id="status"
                    className="high-index"
                    options={dataDepartement}
                    styles={filterStyles}
                    isClearable={
                      filterData.department !== null &&
                      filterData.department.value !== ""
                        ? true
                        : false
                    }
                    onChange={(e) => {
                      setFilterData({
                        ...filterData,
                        department: e,
                      });
                    }}
                    placeholder={"Select Department..."}
                    value={filterData.department}
                  />
                </div>

                {/* FILTER STATUS */}
                <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
                  {/* FILTER Status */}
                  <Select
                    id="status"
                    className="high-index"
                    options={REIMBURSEMENT_STATUS_FILTER}
                    styles={filterStyles}
                    isClearable={false}
                    onChange={(e) => {
                      setFilterData({
                        ...filterData,
                        status: e,
                      });
                    }}
                    placeholder={"Select Status..."}
                    value={filterData.status}
                  />
                </div>

                <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
                  <DateButtonPicker
                    ref={dateRef}
                    dateText={moment(new Date(filterData.date))
                      .format("ddd, DD/MM/YYYY")
                      .toString()}
                    handleChangeDate={onChangeDateFilter}
                  />
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
              <div
                className="btn-group btn-group-xl"
                style={{ float: "right" }}
              >
                <ButtonWhiteFilter
                  name="Export"
                  onClick={(e) => onExport(e)}
                  disabled={loadingSave.export}
                />
                {/* <ButtonBlueFilter name="Send Reiumbersement" /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        {/* TABLE */}
        <div className="col-xl-9 col-lg-8 col-md-12 col-sm-12">
          {/* FILTER */}
          <div className="d-flex flex-wrap justify-content-end mb-2"></div>
          {/* TABLE */}
          <div className="table-responsive">
            <DataTable
              columns={columnReimbersementFinanceData(
                handleModalDetailReimbersement
              )}
              selectableRows
              data={dataReimbersement}
              pagination
              progressPending={isLoading}
              fixedHeader
              fixedHeaderScrollHeight={"61vh"}
              onSelectedRowsChange={handleSelectData}
            />
          </div>
        </div>

        {/* CLAIM TYPE */}
        <div className="col-xl-3 col-lg-4 col-md-12 col-sm-12 mt-2">
          <div className="card card-shadow">
            <div className="d-flex flex-wrap justify-content-between">
              <h1
                className="text-blue-dark text-left pl-20 mx-1"
                style={{
                  fontSize: "18px",
                  paddingTop: "7px",
                }}
              >
                Claim Type
              </h1>
              <div onClick={() => handleModalCreateClaim(true)}>
                <button className="btn float-right">
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/img/Add.png`}
                    alt=""
                  />
                </button>
              </div>
            </div>
            <div className="divider-card" />
            <div
              className="scrollbar"
              style={{
                overflowY: "scroll",
                height: "30rem",
              }}
            >
              <table className="table" style={{ marginTop: "0" }}>
                <tbody>
                  <tr
                    className={filterData.claim_type_id === "" ? "bg-grey" : ""}
                    onClick={() => onChangeClaimType("")}
                    style={{ cursor: "pointer" }}
                  >
                    <td>All</td>
                    <td></td>
                    <td></td>
                  </tr>
                  {dataClaim.map((val, key) => (
                    <tr
                      className={
                        filterData.claim_type_id === val.id ? "bg-grey" : ""
                      }
                      key={key}
                      onClick={() => onChangeClaimType(val.id)}
                      style={{ cursor: "pointer" }}
                    >
                      <td>{val.name}</td>
                      <td className="text-center" style={{ color: "#FF5900" }}>
                        Rp. {rupiahInputFormat(val.max_claim)}
                      </td>
                      <td className="text-center" style={{ paddingLeft: "0" }}>
                        <DropdownDepartment
                          onEdit={() => handleModalDetailClaim(val.id)}
                          onRemove={() => console.log(val.id)}
                          isEditAllowed={true}
                          isRemoveAllowed={false}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Reimbursement;

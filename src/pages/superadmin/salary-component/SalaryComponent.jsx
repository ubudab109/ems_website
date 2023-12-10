/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState, useCallback, useEffect } from "react";
import swal from "sweetalert";
import Select from "react-select";
import http from "../../../service/PrivateConfigRequest";
import SearchFilterInput from "../../../component/SearchFilterInput";
import { SALARY_TYPE_FILTER } from "../../../utils/constant";
import { filterStyles } from "../../../style-component/ReactSelectFilterTable";
import DataTable from "react-data-table-component";
import columnDataSalary from "./column_data_salary";
import ButtonBlueFilter from "../../../component/ButtonBlueFilter";
import CustomModalForm from "../../../component/CustomModalForm";
import AddSalaryModal from "./modal/AddSalaryModal";
import method from "../../../service/Method";
import { ucwords } from "../../../utils/helper";
import EditSalaryModal from "./modal/EditSalaryModal";

const SalaryComponent = () => {
  const [dataSalary, setDataSalary] = useState([]);
  const [filterDataSalary, setFilterDataSalary] = useState({
    keyword: "",
    type: {
      name: "type",
      value: "",
      label: "All",
    },
  });
  const [formDataSalary, setFormDataSalary] = useState({
    name: "",
    type: {
      name: "type",
      value: "income",
      label: "Income",
    },
  });
  const [formDetailSalary, setFormDetailSalary] = useState({
    name: "",
    type: {
      name: "type",
      value: "income",
      label: "Income",
    },
  })
  const [loadingForm, setLoadingForm] = useState({
    submitLoading: false,
    updateLoading: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalDetail, setShowModalDetail] = useState(false);

  /**
   * REQUEST FETCH DATA SALARY
   * @param {string} keyword 
   * @param {string} type 
   * @returns {Promise}
   */
  const requestDataSalaryComponent = async (keyword, type) => {
    return await http.get(`salary-component?keyword=${keyword}&type=${type}`);
  };

  /**
   * CALLBACK FROM REQUEST DATA SALARY
   */
  const callbackRequestDataSalaryComponent = useCallback(() => {
    let keyword = filterDataSalary.keyword;
    let type = filterDataSalary.type.value;
    return requestDataSalaryComponent(keyword, type);
  }, [filterDataSalary]);

  /**
   * FETCHING DATA SALARY FROM CALLBACK
   */
  const fetchDataSalary = () => {
    setIsLoading(true);
    callbackRequestDataSalaryComponent()
      .then((res) => {
        let data = res.data.data.data;
        setDataSalary(data);
        setIsLoading(false);
      })
      .catch(() => {
        swal("Error when fetching data", {
          text: "Check Your connection or contact us if the problem still there",
          icon: "error",
        });
        setIsLoading(false);
      });
  };

  /**
   * Handle on change keyword add
   * @param {event} e 
   */
  const onChangeKeyword = (e) => {
    setFilterDataSalary({ ...filterDataSalary, keyword: e.target.value });
  };

  /**
   * OnView Detail Salary List
   * @param {number} salaryId 
   */
  const onViewDetail = async (salaryId) => {
    setShowModalDetail(true);
    await http.get(`salary-component/${salaryId}`)
    .then(res => {
      let data = res.data.data;
      let state = {
        id: data.id,
        name: data.name,
        type: {
          name: 'type',
          value: data.type,
          label: ucwords(data.type),
        }
      };
      setFormDetailSalary(state);
    })
    // .catch()
  };

  /**
   * Handle Submit Salary Component
   * @param {event} e 
   */
  const handleSubmitAddSalary = async (e) => {
    e.preventDefault();
    let data = {
      name: formDataSalary.name,
      type: formDataSalary.type.value,
    };
    
    setLoadingForm({...loadingForm, submitLoading: true});

    await method.createDataWithoutUpload('salary-component', data)
    .then(() => {
      setLoadingForm({...loadingForm, submitLoading: false});
      setShowModalAdd(false);
      swal("Success", {
        text: 'Salary Component Added Successfully',
        icon: 'success',
      });
      setFormDataSalary({
        name: "",
        type: {
          name: "type",
          value: "income",
          label: "Income",
        },
      });
      fetchDataSalary();
    })
    .catch(() => {
      setLoadingForm({...loadingForm, submitLoading: false});
      swal("Failed", {
        text: 'There was an error when creating salary component. Contact administrator if problem still exists',
        icon: 'error',
      });
    });
  }

  /**
   * Handle Submit Edit Salary Component
   * @param {event} e 
   * @param {number} id
   */
   const handleSubmitEditSalary = async (e, id) => {
    e.preventDefault();
    let data = {
      name: formDetailSalary.name,
      type: formDetailSalary.type.value,
    };
    
    setLoadingForm({...loadingForm, updateLoading: true});

    await method.updateDataByIdWithPut('salary-component', id, data)
    .then(() => {
      setLoadingForm({...loadingForm, update: false});
      setShowModalDetail(false);
      swal("Success", {
        text: 'Salary Component Updated Successfully',
        icon: 'success',
      });
      setFormDetailSalary({
        name: "",
        type: {
          name: "type",
          value: "income",
          label: "Income",
        },
      });
      fetchDataSalary();
    })
    .catch(() => {
      setLoadingForm({...loadingForm, update: false});
      swal("Failed", {
        text: 'There was an error when updating salary component. Contact administrator if problem still exists',
        icon: 'error',
      });
    });
  }

  /**
   * COMPONENT DID MOUNT
   */
  useEffect(() => {
    fetchDataSalary();
    return () => {
      setDataSalary([]);
    };
  }, [callbackRequestDataSalaryComponent]);

  return (
    <Fragment>
      {/* ADD SALARY COMPONENT */}
      <CustomModalForm
        children={
          <AddSalaryModal
            data={formDataSalary}
            onChangeForm={(e) =>
              setFormDataSalary({ ...formDetailSalary, name: e.target.value })
            }
            onChangeType={(e) =>
              setFormDataSalary({ ...formDetailSalary, type: e })
            }
          />
        }
        handleSure={(e) => handleSubmitAddSalary(e)}
        isSendButtonDisabled={loadingForm.submitLoading}
        submitText={loadingForm.submitLoading ? 'Processing' : 'Submit'}
        headerTitle="Add Salary Component"
        show={showModalAdd}
        handleClose={() => {
          setShowModalAdd(false);
          setFormDataSalary({
            name: "",
            type: {
              name: "type",
              value: "income",
              label: "Income",
            },
          });
        }}
      />

      {/* DETAIL AND UPDATE SALARY COMPONENT */}
      <CustomModalForm 
        children={
          <EditSalaryModal
            data={formDetailSalary}
            onChangeForm={(e) =>
              setFormDetailSalary({ ...formDetailSalary, name: e.target.value })
            }
            onChangeType={(e) =>
              setFormDetailSalary({ ...formDetailSalary, type: e })
            }
          />
        }
        handleSure={(e) => handleSubmitEditSalary(e,  formDetailSalary.id)}
        isSendButtonDisabled={loadingForm.updateLoading}
        submitText={loadingForm.updateLoading ? 'Processing' : 'Save'}
        headerTitle="Edit Salary Component"
        show={showModalDetail}
        handleClose={() => {
          setShowModalDetail(false);
          setFormDetailSalary({
            name: "",
            type: {
              name: "type",
              value: "income",
              label: "Income",
            },
          });
        }}
      />
      <div className="d-flex flex-wrap">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
          <div className="card card-dashboard card-shadow">
            <div className="card-body" style={{ width: "100%" }}>
              {/* SEARCH AND FILTER */}
              <div
                className="row justify-content-left"
                style={{
                  position: "sticky",
                  zIndex: "94",
                }}
              >
                <div className="col-xl-2 col-lg-12 col-md-12 col-sm-12 mt-2 ml-2">
                  <h5 className="text-blue-dark" style={{ fontSize: "19px" }}>
                    Salary Component
                  </h5>
                </div>
                {/* SEARCH */}
                <div className="col-xl-3 col-lg-12 col-md-12 col-sm-12 mb-2">
                  <SearchFilterInput
                    onChangeInput={(e) => onChangeKeyword(e)}
                    input={filterDataSalary.keyword}
                    canFilter={false}
                  />
                </div>
                {/* Filter */}
                <div className="col-xl-2 col-lg-6 col-md-12 col-sm-12 mb-2">
                  {/* FILTER TYPE */}
                  <Select
                    id="work-places"
                    options={SALARY_TYPE_FILTER}
                    styles={filterStyles}
                    isClearable={false}
                    onChange={(e) => {
                      setFilterDataSalary({
                        ...filterDataSalary,
                        type: e,
                      });
                    }}
                    placeholder={"Work Places..."}
                    value={filterDataSalary.type}
                  />
                </div>
                <div className="col-xl-4 col-lg-12 col-md-12 col-sm-12 float-right">
                  {/* FILTER DATE */}
                  <ButtonBlueFilter
                    name="Add Salary Component"
                    onClick={() => setShowModalAdd(true)}
                  />
                </div>

                {/* END */}
              </div>
              {/* END */}

              {/* TABLE HERE */}
              <div className="row">
                <div className="table-responsive">
                  <DataTable
                    columns={columnDataSalary(onViewDetail)}
                    data={dataSalary}
                    progressPending={isLoading}
                    pagination
                    fixedHeader
                    fixedHeaderScrollHeight={"100vh"}
                  />
                </div>
              </div>
              {/* END */}

              {/* PAGINATION */}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SalaryComponent;

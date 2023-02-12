/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import swal from "sweetalert";
import Select from "react-select";
import SearchFilterInput from "../../component/SearchFilterInput";
import http from "../../service/PrivateConfigRequest";
import { filterStyles } from "../../style-component/ReactSelectFilterTable";
import { EMPLOYEE_STATUS, JOB_STATUS } from "../../utils/constant";
import DepartmentFilter from "./components/DepartmentFilter";
import JobStatusFilter from "./components/JobStatusFilter";
import columnEmployee from "./data/column_employee_header";
import ButtonWhiteFilter from "../../component/ButtonWhiteFilter";
import ButtonBlueFilter from "../../component/ButtonBlueFilter";
import { isActionAllowed } from "../../utils/helper";
import method from "../../service/Method";
import CustomModalForm from "../../component/CustomModalForm";
import AddDepartmentModal from "./modal/AddDepartmentModal";
import { useHistory } from "react-router-dom";

const Employee = () => {
  const [departmentData, setDepartmentData] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(0);
  const [selectedJobStatus, setSelectedJobStatus] = useState(0);
  const [employeeData, setEmployeeData] = useState([]);
  const [fetchingEmployee, setFetchingEmployee] = useState(false);
  const [inputKeyword, setInputKeyword] = useState("");
  const [showModalAddDepartment, setShowModalAddDepartment] = useState(false);
  const [showModalUpdateDepartment, setShowModalUpdateDepartment] = useState(false);
  const [formAddDepartment, setFormAddDepartment] = useState({
    division_name: '',
  });
  const [isLoadingAddDepartment, setIsLoadingAddDepartment] = useState(false);
  const [filterEmployee, setFilterEmployee] = useState({
    keyword: "",
    department: 0,
    job_status: "",
    status: {
      value: "",
      label: "All (Default)",
    },
  });
  const [selectedEmployee, setSelectedEmployee] = useState([]);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const history = useHistory();

  const permissionEmployee = useSelector(
    state => state.auth.permissions.filter(e => e.name === "Employee")[0]
  );


  /**
   * When the user clicks on a department, set the selected department to the id of the department that
   * was clicked, and set the filterEmployee state to the id of the department that was clicked.
   * 
   * @param {Number} id
   */
  const handleClickDepartment = (id) => {
    setSelectedDepartment(parseInt(id));
    setFilterEmployee({
      ...filterEmployee,
      department: id,
    });
  };

  /**
   * When the user clicks on a job status, set the selected job status to the id of the clicked job
   * status and set the filterEmployee object to the value of the clicked job status.
   * 
   * @param {Object} data
   */
  const handleClickJobStatus = (data) => {
    setSelectedJobStatus(parseInt(data.id));
    setFilterEmployee({
      ...filterEmployee,
      job_status: data.value,
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
    setSelectedEmployee(data);
  };

  /**
   * It makes a GET request to the employee endpoint with the given parameters.
   * 
   * @param {any} keyword
   * @param {any} department
   * @param {any} job_status
   * @param {any} status
   * 
   * @return {Promise}
   */
  const requestGetEmployee = async (
    keyword,
    department,
    job_status,
    status
  ) => {
    return await http.get(
      `employee?keyword=${keyword}&departement=${department}&job_status=${job_status}&status=${status}`
    );
  };

  /**
   * It's a function that creates a new department in the database.
   */
  const handleAddDepartment = async e => {
    e.preventDefault();
    setIsLoadingAddDepartment(true);
    await method.createDataWithoutUpload('division', formAddDepartment)
    .then(() => {
      setIsLoadingAddDepartment(false);
      setShowModalAddDepartment(false);
      setFormAddDepartment({
        division_name: '',
      })
      fetchDepartment();
      swal("Department created successfully", {
        icon: 'success'
      });
    })
    .catch(err => {
      setIsLoadingAddDepartment(false);
      swal("There was an error when creating department", {
        icon: 'error'
      });
    });
  };

  /**
   * It's a function that updates a department by id using a put method.
   */
  const handleUpdateDepartment = async e => {
    e.preventDefault();
    setIsLoadingAddDepartment(true);
    await method.updateDataByIdWithPut('division', formAddDepartment.id, formAddDepartment)
    .then(() => {
      setIsLoadingAddDepartment(false);
      setShowModalUpdateDepartment(false);
      fetchDepartment();
      setFormAddDepartment({
        division_name: '',
      })
      swal("Department updated successfully", {
        icon: 'success'
      });
    })
    .catch(err => {
      setIsLoadingAddDepartment(false);
      swal("There was an error when creating department", {
        icon: 'error'
      });
    });
  }

  /* A function that is called when the component is mounted. */
  const fetchEmployee = useCallback(() => {
    let keyword = filterEmployee.keyword;
    let department = filterEmployee.department;
    let jobStatus = filterEmployee.job_status;
    let status = filterEmployee.status.value;

    return requestGetEmployee(keyword, department, jobStatus, status);
  }, [
    filterEmployee.department,
    filterEmployee.job_status,
    filterEmployee.keyword,
    filterEmployee.status,
  ]);

  /**
   * It fetches department data from the API and sets the data to the state.
   */
  const fetchDepartment = async () => {
    await http.get("dataset/department").then((res) => {
      let data = res.data.data;
      setDepartmentData(data);
    });
  };

  /**
   * Handle delete employee from selected employee data
   */
  const handleDeleteEmployee = async () => {
    swal({
      title: 'Are You Sure?',
      text: 'Delete this selected Employee?. You can not revert this action and data will lost',
      buttons: true,
      icon: 'warning',
      dangerMode: true,
    })
    .then(async willDelete => {
      setLoadingDelete(true);
      if (willDelete) {
        let data = [];
        selectedEmployee.forEach(value => {
          data.push(value.id);
        });
        let req = JSON.stringify(data);
        await http.delete(`delete-employee?data=${req}`)
        .then(async () => {
          setLoadingDelete(false);
          swal({
            title: 'Success',
            text: "Employee Deleted Successfully",
            icon: 'success',
          });
          fetchEmployee()
            .then((res) => {
              let data = res.data.data.data;
              setEmployeeData(data);
              setFetchingEmployee(false);
            })
            .catch(() => {
              swal("Error when fetching data", {
                icon: "error",
              });
              setFetchingEmployee(false);
            });
        })
        .catch(() => {
          setLoadingDelete(false);
          swal({
            title: 'Failed',
            text: "Failed to Delete Employee. Please Contact Administrator",
            icon: 'error',
          });
        })
      } else {
        return false;
      }
    })
  };

  /**
   * On View Click Handler
   * @param {number} employeeId 
   */
  const onViewDetail = employeeId  => {
    history.push(`/employee/detail/${employeeId}`);
  }


  useEffect(() => {
    let isMounted = true;
    setFetchingEmployee(true);
    fetchEmployee()
      .then((res) => {
        let data = res.data.data.data;
        setEmployeeData(data);
        if (isMounted) {
          setFetchingEmployee(false);
        }
      })
      .catch(() => {
        swal("Error when fetching data", {
          text: "Check Your connection or contact us if the problem still there",
          icon: "error",
        });
        if (isMounted) {
          setFetchingEmployee(false);
        }
      });

    if (departmentData.length < 1) {
      fetchDepartment();
    }

    return () => {
      isMounted = false;
      setEmployeeData([]);
    };
  }, [fetchEmployee]);

  return (
    <Fragment>
      {/* ADD DEPARTMENT MODAL */}
      <CustomModalForm 
        children={
          <AddDepartmentModal 
            data={formAddDepartment}
            onChangeDivision={e => setFormAddDepartment(
              {
                ...formAddDepartment,
                [e.target.name] : e.target.value
              }
            )}
          />
        }
        handleSure={e => handleAddDepartment(e)}
        isSendButtonDisabled={isLoadingAddDepartment}
        submitText={isLoadingAddDepartment ? 'Processing...' : 'Submit'}
        headerTitle="Add Department"
        show={showModalAddDepartment}
        handleClose={() => setShowModalAddDepartment(false)}
      />

      {/* EDIT DEPARTMENT MODAL */}
      <CustomModalForm 
        children={
          <AddDepartmentModal 
            data={formAddDepartment}
            onChangeDivision={e => setFormAddDepartment(
              {
                ...formAddDepartment,
                [e.target.name] : e.target.value
              }
            )}
          />
        }
        handleSure={e => handleUpdateDepartment(e)}
        isSendButtonDisabled={isLoadingAddDepartment}
        submitText={isLoadingAddDepartment ? 'Processing...' : 'Submit'}
        headerTitle="Update Department"
        show={showModalUpdateDepartment}
        handleClose={() => {
          setFormAddDepartment({
              division_name: '',
          })
          setShowModalUpdateDepartment(false);
        }}
      />
      <div className="row">
        <div className="col-xl-2 col-lg-4 col-md-12 col-sm-12 mt-2 mb-3">
          {/* DEPARTMENT FILTER */}
          <div className="card card-shadow">
            <div className="d-flex flex-wrap justify-content-between">
            <h1
              className="text-blue-dark text-left pl-20 mx-1"
              style={{
                fontSize: "18px",
                paddingTop: "7px",
              }}
            >
              Department
            </h1>
            <div onClick={() => setShowModalAddDepartment(true)}>

              <button className="btn float-right">
                <img src={`${process.env.PUBLIC_URL}/assets/img/Add.png`} alt=""/>
              </button>
            </div>
            </div>
            <div className="divider-card" />
            <div
              className="scrollbar"
              style={{
                overflowY: "scroll",
                height: "300px",
              }}
            >
              {/* DEPARTMENT DATA */}
              <DepartmentFilter
                departmenName="All (Default)"
                idDepartment={0}
                isActive={selectedDepartment === 0}
                onClick={() => handleClickDepartment(0)}
              />
              {departmentData.map((data, key) => (
                <DepartmentFilter
                  isEditAllowed={isActionAllowed(permissionEmployee.permissions, 'department-update')}
                  isRemoveAllowed={isActionAllowed(permissionEmployee.permissions, 'department-delete')}
                  key={key}
                  onEdit={() => {
                    setFormAddDepartment({
                      id: data.id,
                      division_code: data.division_code,
                      division_name: data.division_name,
                    });
                    setShowModalUpdateDepartment(true);
                  }}
                  departmenName={data.division_name}
                  idDepartment={data.id}
                  isActive={selectedDepartment === data.id}
                  onClick={() => handleClickDepartment(data.id)}
                />
              ))}
            </div>
          </div>

          {/* JOB STATUS FILTER */}
          <div className="card card-shadow mt-4">
            <h1
              className="text-blue-dark text-left pl-20 mx-1"
              style={{
                fontSize: "18px",
                paddingTop: "7px",
              }}
            >
              Job Status
            </h1>
            <div className="divider-card" />
            <div
              className="scrollbar"
              style={{
                overflowY: "scroll",
                height: "245px",
              }}
            >
              {/* JOB STATUS DATA */}
              {JOB_STATUS.map((value) => (
                <JobStatusFilter
                  key={value.id}
                  jobStatusName={value.label}
                  isActive={selectedJobStatus === value.id}
                  onClick={() => handleClickJobStatus(value)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* DATA */}
        <div className="col-xl-10 col-lg-8 col-md-12 col-sm-12 mt-2">
          <div className="d-flex flex-wrap justify-content-end mb-2">
            <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 mb-3">
              <div className="row">
                {/* KEYWORD SEARCH */}
                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6">
                  <SearchFilterInput
                    onChangeInput={(e) => {
                      if (e.target.value === "") {
                        setFilterEmployee({
                          ...filterEmployee,
                          keyword: "",
                        });
                      }
                      setInputKeyword(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      if (e.keyCode === 13) {
                        setFilterEmployee({
                          ...filterEmployee,
                          keyword: inputKeyword,
                        });
                      }
                    }}
                    input={inputKeyword}
                    canFilter={false}
                  />
                </div>

                {/* FILTER STATUS */}
                <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6">
                  {/* FILTER Status */}
                  <Select
                    id="status"
                    className="high-index"
                    options={EMPLOYEE_STATUS}
                    styles={filterStyles}
                    isClearable={false}
                    onChange={(e) => {
                      setFilterEmployee({
                        ...filterEmployee,
                        status: e,
                      });
                    }}
                    placeholder={"Select Status..."}
                    value={filterEmployee.status}
                  />
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12">
              <div className="btn-group btn-group-sm" style={{ float: "right" }}>
                  <ButtonWhiteFilter disabled={selectedEmployee.length < 1} name="Export" />
                  {
                    isActionAllowed(permissionEmployee.permissions, 'employee-management-update') ?
                    <ButtonWhiteFilter name="Employee Transfer" /> : null
                  }
                  {
                    isActionAllowed(permissionEmployee.permissions, 'employee-management-delete') ?
                    <ButtonWhiteFilter onClick={handleDeleteEmployee} disabled={selectedEmployee.length < 1 || loadingDelete} name="Delete Employee" /> : null
                  }
                  {
                    isActionAllowed(permissionEmployee.permissions, 'employee-management-create') ?
                    <ButtonBlueFilter name="Add Employee" onClick={() => history.push('/employee/add/add-employee')} /> : null
                  }
              </div>
            </div>
          </div>
          <div className="table-responsive">
            <DataTable
              columns={columnEmployee(
                onViewDetail
              )}
              selectableRows
              data={employeeData}
              pagination
              progressPending={fetchingEmployee}
              fixedHeader
              fixedHeaderScrollHeight={"61vh"}
              onSelectedRowsChange={handleSelectData}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Employee;

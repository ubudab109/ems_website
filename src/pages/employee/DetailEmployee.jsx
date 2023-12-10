/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import swal from "sweetalert";
import http from "../../service/PrivateConfigRequest";
import GeneralData from "./detail-employee-component/GeneralData";
import { isValidEmail, ucwords } from "../../utils/helper";
import method from "../../service/Method";
import EmployeeAttendance from "./detail-employee-component/EmployeeAttendance";
import EmployeeTimeManagement from "./detail-employee-component/EmployeeTimeManagement";
import EmployeeFinance from "./detail-employee-component/EmployeeFinance";

const DetailEmployee = () => {
  const history = useHistory();
  const { id } = useParams();
  const [employee, setEmployee] = useState({});
  const [formEmployee, setFormEmployee] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isFormEmployeeDataDisabled, setFormEmployeeDataDisabed] = useState(true);
  const [currentMenu, setCurrentMenu] = useState(0);
  const [existsErrorType, setExistErrorType] = useState('');
  const [isEmailValid, setEmailIsValid] = useState(true);
  const [departmentData, setDepartmentData] = useState([]);
  const [ptkpData, setPtkpData] = useState([]);
  const [isLoadingEdit, setIsLoadingEdit] = useState(false);
  const [selectFormEmployee, setSelectFormEmployee] = useState();
  const [employeeFormCondition, setEmployeeFormCondition] = useState({
    isPermanentIdCard: false,
    isSameAddress: false,
  });

  /**
   * It fetches department data from the API and sets the data to the state.
   */
   const fetchDepartment = async () => {
    await http.get("dataset/department").then((res) => {
      let data = res.data.data;
      let options = [];
      for (let i = 0; i < data.length; i++) {
        let item = {
          name: 'division_id',
          value: data[i].id,
          label: data[i].division_name,
        }
        options.push(item);
      }
      setDepartmentData(options);
    });
  };

  /** 
   * FETCH PTKP DATASET
   */
  const fetchPtkp = async () => {
    await http.get('dataset/ptkp?select=1')
    .then((res) => {
      let data = res.data.data;
      let options = [];
      for (let i = 0; i < data.length; i++) {
        let item = {
          name: 'ptkp_id',
          value: data[i].value,
          label: data[i].label,
        };
        options.push(item);
      }
      setPtkpData(options);
    });
  };

  /**
   * When the user types in the input field, the value of the input field is set to the value of the
   * state.
   */
   const handleChangeForm = (e) => {
    setFormEmployee({
      ...formEmployee,
      [e.target.name]: e.target.value,
    });
  };

  /**
   * It takes an event object, and then it sets the state of the formAddEmployee object to the event
   * object.
   */
   const handleChangeSelectForm = (e) => {
    setSelectFormEmployee({
      ...selectFormEmployee,
      [e.name]: e,
    });
  };

  /**
   * It makes a GET request to the server, and if the response is successful, it sets the state of the
   * component.
   * @returns The result of the http.get request.
   */
   const requestCheckUserExists = async (param, value) => {
    return await http.get(`dataset/exists-employee?${param}=${value}&user_id=${id}`)
      .then(res => {
        let result = res.data.data;
        if (result.result) {
          setExistErrorType(result.type)
        } else {
          setExistErrorType('');
        }
    })
  }

  /**
   * "If the data is email, check if the email is valid, if it is, check if the email exists, if it
   * doesn't, set the email to valid."
   */
   const handleCheckUser = async (data, value) => {
    if (data === 'email') {
      if (!isValidEmail(value)) {
        setEmailIsValid(false);
      } else {
        await requestCheckUserExists('email', value);
        setEmailIsValid(true);
      }
    } else if (data === 'nip') {
      await requestCheckUserExists('nip', value);
    }
  }

  /**
   * Update the data in the database, but before that show a confirmation dialog to
   * the user. If the user clicks yes, then the data will be updated. If the user clicks no, then the
   * data will not be updated.
   * @param {Event} e
   */
  const updateEmployee = async (e) => {
    e.preventDefault();
    swal({
      title: "Send This Form?",
      text: "Make sure the data is correct. You can edit this Employee data in Detail Employee",
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then(async isYes => {
      if (isYes) {
        setIsLoadingEdit(true);
        let data = {
          firstname: formEmployee.firstname,
          lastname: formEmployee.lastname,
          email: formEmployee.email,
          mobile_phone: formEmployee.mobile_phone,
          phone_number: formEmployee.phone_number,
          pob: formEmployee.pob,
          dob: formEmployee.dob,
          gender: formEmployee.gender,
          identity_number: formEmployee.identity_number,
          postal_code: formEmployee.postal_code,
          nip: formEmployee.nip,
          job_level: formEmployee.job_level,
          job_position: formEmployee.job_position,
          join_date: formEmployee.join_date,
          ptkp_id: selectFormEmployee.ptkp_id.value !== "" ? selectFormEmployee.ptkp_id.value : null,
          end_date: selectFormEmployee.job_status.value === '0' ? null : formEmployee.end_date,
          citizent_address: formEmployee.citizent_address,
          resident_address: !employeeFormCondition.isSameAddress ? formEmployee.resident_address : formEmployee.citizent_address,
          is_address_same: employeeFormCondition.isSameAddress ? 1 : 0,
          identity_expired: employeeFormCondition.isPermanentIdCard ? null : formEmployee.identity_expired,
          marital_status: selectFormEmployee.marital_status.value,
          blood_type: selectFormEmployee.blood_type.value,
          identity_type: selectFormEmployee.identity_type.value,
          religion: selectFormEmployee.religion.value,
          job_status: selectFormEmployee.job_status.value,
          department: selectFormEmployee.division_id.value,
        };

        await method.updateDataByIdWithPut('employee', id, data)
        .then(async res => {
          setIsLoading(false);
          setFormEmployeeDataDisabed(true);
          await fetchDetailEmployee();
          swal({
            title: 'Success',
            text: 'Employee Updated Successfully',
            icon: 'success',
          });
          setIsLoadingEdit(false);
        })
        .catch(err => {
          setIsLoading(false);
          setIsLoadingEdit(false);
          const errorCode = err.response.status;
          if (errorCode > 400) {
            swal("There's a invalid input. Please fix it", {
              title: "Failed",
              icon: 'error',
            });
          } else {
            swal("There's something wrong in Server. Please contact the administrator", {
              title: "Failed",
              icon: 'error',
            });
          }
        })
      }
    })
  }

  const menuComponent = [
    <GeneralData 
      key={0}
      isLoadingEdit={isLoadingEdit}
      employeeData={formEmployee}
      isDisabled={isFormEmployeeDataDisabled}
      onChangeForm={e => handleChangeForm(e)}
      isValidEmail={isEmailValid}
      onSubmitEdit={e => updateEmployee(e)}
      errorExistType={existsErrorType}
      onChangeSelectForm={e => handleChangeSelectForm(e)}
      isFetching={isLoading}
      onChangeExists={e => handleCheckUser(e.target.name, e.target.value)}
      selectForm={selectFormEmployee}
      departmentData={departmentData}
      ptkpData={ptkpData}
      isPermanendIdCard={employeeFormCondition.isPermanentIdCard}
      isSameAddress={employeeFormCondition.isSameAddress}
      onChangeCheckbox={e => {
        let name = [e.target.name];
        if (employeeFormCondition[name]) {
          setEmployeeFormCondition({
            ...employeeFormCondition,
            [e.target.name] : false,
          });
        } else {
          setEmployeeFormCondition({
            ...employeeFormCondition,
            [e.target.name] : true,
          });
        }
      }}
      onEditClick={() => {
        if (isFormEmployeeDataDisabled) {
          setExistErrorType('');
          setEmailIsValid(true);
          setFormEmployeeDataDisabed(false);
        } else {
          setFormEmployee(employee);
          setEmployeeFormCondition({
            isPermanentIdCard: formEmployee.identity_expired === null,
            isSameAddress: formEmployee.is_address_same,
          });
          setFormEmployeeDataDisabed(true);
        }
      }}
    />,
    <EmployeeAttendance key={1} id={id} />,
    <EmployeeTimeManagement key={2} id={id} />,
    <EmployeeFinance key={3} id={id} />
  ];

  const fetchDetailEmployee = async () => {
    setIsLoading(true);
    await http
      .get(`employee/${id}?type=employee`)
      .then((res) => {
        let data = res.data.data;
        setEmployee(data);
        setFormEmployee(data);
        let dataSelect = {
          marital_status: {
            name: 'marital_status',
            value: data.marital_status != null ? data.marital_status : '',
            label: data.marital_status != null ? ucwords(data.marital_status) : '',
          },
          blood_type: {
            name: "blood_type",
            value: data.blood_type != null ? data.blood_type : '',
            label: data.blood_type != null ? ucwords(data.blood_type) : '',
          },
          identity_type: {
            name: 'identity_type',
            value: data.identity_type != null ? data.identity_type : '',
            label: data.identity_type != null ? data.identity_type_name : ''
          },
          religion: {
            name: 'religion',
            value: data.religion != null ? data.religion : '',
            label: data.religion != null ? ucwords(data.religion) : '',
          },
          division_id: {
            name: "division_id",
            value: data.branch.division_id,
            label: data.division_name,
          },
          job_status: {
            name: "job_status",
            value: data.job_status,
            label: data.job_status_name,
          },
          status: {
            name: 'status',
            value: data.branch.status,
            label: data.status_name,
          },
          ptkp_id: {
            name: 'ptkp_id',
            value: data.ptkp !== null ? data.ptkp.id : '',
            label: data.ptkp !== null ? data.ptkp.status : 'PTKP Not Selected'
          },
        };
        setEmployeeFormCondition({
          isPermanentIdCard: data.identity_expired === null,
          isSameAddress: data.is_address_same,
        });
        setSelectFormEmployee(dataSelect);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        swal({
          title: "Error",
          text: "There's an error when fetching data. Please check Your connection or contact administrator",
          icon: "error",
        });
      });
  };

  /** 
   * HANDLER SELECT MENU IDENTITY
   */
  const handleSelectMenu = index => setCurrentMenu(index);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      fetchDetailEmployee();
      fetchDepartment();
      fetchPtkp();
    }
    return () => (isMounted = false);
  }, []);

  return (
    <Fragment>
      <h1 className="mt-4 breadcumb my-4">Detail Employee</h1>
      <div className="row">
        <div className="col-12 pl-25">
          <button
            className="btn btn-white-filter"
            onClick={() => history.push("/employee")}
          >
            <img
              src={`${process.env.PUBLIC_URL}/assets/img/left.png`}
              alt="left"
            />
          </button>
          <div className="divider-card mt-3 mb-3" style={{ width: "99%" }} />
        </div>
      </div>

      <div className="row">
        <div className="col-xl-3 col-lg-4 col-md-12 col-sm-12">
          {/* PROFILE CARD */}
          <div className="card-shadow text-center">
            {isLoading ? (
              <span className="text-center">Fetching Data ... </span>
            ) : (
              <div className="col-12 text-center p-3">
                <img
                  src={employee.avatar}
                  alt=""
                  className="img-circle"
                  width={100}
                />
                <h5 className="text-blue-dark mt-2">
                  {employee.firstname} {employee.lastname}
                </h5>
                <span className="mt-2">{employee.job_position}</span> <br />
                <span className="mt-2">ID: {employee.nip}</span> <br />
                <hr />
                {
                  employee.ptkp_id ? <><span className="mt-2">PTKP Status: {employee.ptkp.status}</span> <br /></> : null
                }
                
              </div>
            )}
          </div>
          {/* TABULATION */}
          <div className="card-shadow text-center mt-4">
            <div className="text-bold cursor-pointer p-2" onClick={() => handleSelectMenu(0)}>
              <h5 className={`p-2 ${currentMenu === 0 ? 'active-div' : ''}`}>General</h5>
            </div>
            <div className="text-bold cursor-pointer p-2" onClick={() => handleSelectMenu(1)}>
              <h5 className={`p-2 ${currentMenu === 1 ? 'active-div' : ''}`}>Attendance</h5>
            </div>
            <div className="text-bold cursor-pointer p-2" onClick={() => handleSelectMenu(2)}>
              <h5 className={`p-2 ${currentMenu === 2 ? 'active-div' : ''}`}>Time Management</h5>
            </div>
            <div className="text-bold cursor-pointer p-2" onClick={() => handleSelectMenu(3)}>
              <h5 className={`p-2 ${currentMenu === 3 ? 'active-div' : ''}`}>Finance</h5>
            </div>
            <div className="text-bold cursor-pointer p-2" onClick={() => handleSelectMenu(4)}>
              <h5 className={`p-2 ${currentMenu === 4 ? 'active-div' : ''}`}>Warning Letter</h5>
            </div>
          </div>
        </div>
        <div className="col-xl-9 col-lg-8 col-md-12 col-sm-12">
            <div className="card-shadow">
              {menuComponent[currentMenu]}
            </div>
        </div>
      </div>
    </Fragment>
  );
};

export default DetailEmployee;

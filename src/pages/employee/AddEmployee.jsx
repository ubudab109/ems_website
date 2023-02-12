import React, { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import swal from "sweetalert";
import ButtonBlueFilter from "../../component/ButtonBlueFilter";
import ButtonWhiteFilter from "../../component/ButtonWhiteFilter";
import method from "../../service/Method";
import http from "../../service/PrivateConfigRequest";
import { isValidEmail } from "../../utils/helper";
import First from "./components/addemployee/Form/First";
import Four from "./components/addemployee/Form/Four";
import Second from "./components/addemployee/Form/Second";
import Third from "./components/addemployee/Form/Third";
import Step from "./components/addemployee/StepProgress/Step";

const AddEmployee = () => {
  const history = useHistory();
  const [loadingInvite, setLoadingInvite] = useState(false);
  const [firstFormCondition, setFirstFormCondition] = useState({
    isSameCitizentAddress: false,
    isPermanentIdCard: false,
  });
  const [departmentData, setDepartmentData] = useState([]);
  const [existsErrorType, setExistErrorType] = useState('');
  const [isEmailValid, setEmailIsValid] = useState(true);
  const [formStep, setFormStep] = useState(0);
  const [dataIncomeSalary, setDataIncomeSalary] = useState([
    {
      type: 'income',
      amount: 0,
      currencyAmount: '',
      name: 'Basic Salary',
      slug: '',
      isDefault: true,
      submitted: true,
    }, 
    {
      type: 'income',
      amount: 0,
      currencyAmount: '',
      name: 'Overtime',
      slug: '/ 1 Hours',
      isDefault: true,
      submitted: true,
    }
  ]);
  const [dataCutSalary, setDataCutSalary] = useState([
    {
      type: 'cuts',
      amount: 0,
      currencyAmount: '',
      name: 'Tax',
      slug: '',
      isDefault: true,
      submitted: true,
    }, 
    {
      type: 'cuts',
      amount: 0,
      currencyAmount: '',
      name: 'BPJS TK',
      slug: '',
      isDefault: true,
      submitted: true,
    }
  ]);

  const [dataAttendanceCut, setDataAttendanceCut] = useState([
    {
      type: 'absent',
      amount: 0,
      currencyAmount: '',
      name: 'Absent',
      days: {
        name: 'days',
        keyData: 0,
        value: '',
        label: 'Select days...'
      },
      time: '',
    }, 
    {
      type: 'late',
      amount: 0,
      currencyAmount: '',
      name: 'Late',
      time: '',
      days: {
        name: 'days',
        keyData: 1,
        value: '',
        label: 'Total..'
      },
    }
  ]);

  const [formAddEmployee, setFormAddEmployee] = useState({
    // FOR FIRST FORM
    firstname: "",
    lastname: "",
    email: "",
    mobile_phone: "",
    phone_number: "",
    pob: "",
    dob: "",
    gender: "male",
    marital_status: {
      name: 'marital_status',
      value: '',
      label: 'Select Status...'
    },
    blood_type: {
      name: "blood_type",
      value: "",
      label: "Select Blood Type",
    },
    identity_type: {
      name: 'identity_type',
      value: '',
      label: 'Select Type...'
    },
    religion: {
      name: 'religion',
      value: '',
      label: 'Select Religion...',
    },
    identity_expired: "",
    identity_number: "",
    postal_code: "",
    citizent_address: "",
    resident_address: "",
    // FOR SECOND FORM
    nip: "",
    job_position: "",
    job_level: "",
    division_id: {
      name: "division_id",
      value: "",
      label: "Select Department...",
    },
    job_status: {
      name: "job_status",
      value: "",
      label: "Select Job Status....",
    },
    join_date: '',
    end_date: '',

    // FOR THIRD FORM
    payment_date: {
      name: 'payment_date',
      value: '',
      label: 'Select Date...'
    },
    bank_name: '',
    account_holder_name: '',
    account_number: '',
    salary: dataIncomeSalary,
    cuts: dataCutSalary,
  });

  

  /**
   * It fetches department data from the API and sets the data to the state.
   */
   const fetchDepartment = async () => {
    await http.get("dataset/department").then((res) => {
      let data = res.data.data;
      let options = [];
      data.forEach((res) => {
        let item = {
          name: 'division_id',
          value: res.id,
          label: res.division_name,
        }
        options.push(item);
      });
      setDepartmentData(options);
    });
  };

  /**
   * It makes a GET request to the server, and if the response is successful, it sets the state of the
   * component.
   * @returns The result of the http.get request.
   */
  const requestCheckUserExists = async (param, value) => {
    return await http.get(`dataset/exists-employee?${param}=${value}`)
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
   * When the user clicks the button, add a new object to the array.
   * Cloning the income salary input
   */
  const handleAddNewIncomeForm = () => {
    setDataIncomeSalary(prevState => [...prevState, {
      type: 'income',
      amount: 0,
      currencyAmount: '',
      name: '',
      slug: '',
      isDefault: false,
      submitted: false,
    }])
  }

  /**
   * When the user clicks the button, add a new object to the array.
   * Cloning the cuts salary input
   */
   const handleAddNewCutsForm = () => {
    setDataCutSalary(prevState => [...prevState, {
      type: 'cuts',
      amount: 0,
      currencyAmount: '',
      name: '',
      slug: '',
      isDefault: false,
      submitted: false,
    }])
  }

  /**
   * A validation input for eacth step
  */
  const formValidation = async (e) => {
    if (formStep === 0) {
      if (formAddEmployee.firstname.length < 1
          || (formAddEmployee.email.length < 1 || !isValidEmail(formAddEmployee.email) || existsErrorType !== '')
          || formAddEmployee.mobile_phone.length < 1
          || formAddEmployee.identity_type === ''
          || formAddEmployee.identity_number === ''
        ) {
        swal("Some Data Fill is Still Missing or Wrong. Please fix that.", {
          title: "Validation Error",
          icon: 'error'
        })
      } else {
        setFormStep(1);
      }
    } else if (formStep === 1) {

      let startDate = Date.parse(formAddEmployee.join_date);
      let endDate = Date.parse(formAddEmployee.end_date);
      if (
        (formAddEmployee.nip.length < 1 || existsErrorType === 'nip')
        || formAddEmployee.job_level.length < 1
        || formAddEmployee.division_id === ''
        || formAddEmployee.job_status.value === 'all'
        || formAddEmployee.join_date === ''
        || formAddEmployee.job_position === ''
        || (formAddEmployee.job_status.value !== '0' && formAddEmployee.end_date === '')
      ) {
        swal("Some Data Fill is Still Missing or Wrong. Please fix that.", {
          title: "Validation Error",
          icon: 'error'
        })
      } else if (startDate > endDate) {
        swal("Join Date must be less than from End Date", {
          title: "Validation Error",
          icon: 'error'
        })
      } 
      else {

        setFormStep(2);
      }
    } else if (formStep === 2) {
      await handleSubmitInviteEmployee(e)
    } else {
      history.push('/employee');
    }
  }


  /**
   * When the user changes the value of an input, update the corresponding value in the
   * dataAttendanceCut array.
   */
  const handleChangeAttendanceCut = e => {
    let key = e.target.getAttribute('data-key');
    let cloneDataAttendanceCut = [...dataAttendanceCut];
    let obj = cloneDataAttendanceCut[key];

    if (e.target.name === 'currencyAmount') {
      let amount = e.target.value;
      let explode = amount.replace(/[^\d.]/g, '').split('.');
      obj['amount'] = explode[1];
    }
    obj[e.target.name] = e.target.value;
    cloneDataAttendanceCut[key] = obj;
    setDataAttendanceCut([...cloneDataAttendanceCut]);
  }

  /**
   * When the user changes the value of an input, update the corresponding value in the
   * dataIncomeSalary or dataCutSalary array.
   */
  const handleChangeSalary = (e, type) => {
    let key = e.target.getAttribute('data-key');
    if (type === 'income') {
      let cloneDataIncome = [...dataIncomeSalary];
      let obj = cloneDataIncome[key];
      if (e.target.name === 'currencyAmount') {
        let amount = e.target.value;
        let explode = amount.replace(/[^\d.]/g, '').split('.');
        obj['amount'] = explode[1];
      }
      obj[e.target.name] = e.target.value;
      cloneDataIncome[key] = obj;
      setDataIncomeSalary([...cloneDataIncome]);
    } else {
      let cloneDataCuts = [...dataCutSalary];
      let obj = cloneDataCuts[key];
      if (e.target.name === 'currencyAmount') {
        let amount = e.target.value;
        let explode = amount.replace(/[^\d.]/g, '').split('.');
        obj['amount'] = explode[1];
      }
      obj[e.target.name] = e.target.value;
      cloneDataCuts[key] = obj;
      setDataCutSalary([...cloneDataCuts]);
    }
  }


  /**
   * If the name is empty, remove the object from the array, otherwise set the submitted property to
   * true.
   * On submit income name label in data salary income state
   */
  const onSubmitSalaryName = (e, type) => {
    e.preventDefault();
    let key = e.target.getAttribute('data-key');
    if (type === 'income') {
      let cloneDataIncome = [...dataIncomeSalary];
      let obj = cloneDataIncome[key];
      if (obj['name'] === "") {
        cloneDataIncome.splice(key, 1);
      } else {
        obj.submitted = true;
        cloneDataIncome[key] = obj;
      }
      setDataIncomeSalary([...cloneDataIncome]);
    } else {
      let cloneDataIncome = [...dataCutSalary];
      let obj = cloneDataIncome[key];
      if (obj['name'] === "") {
        cloneDataIncome.splice(key, 1);
      } else {
        obj.submitted = true;
        cloneDataIncome[key] = obj;
      }
      setDataCutSalary([...cloneDataIncome]);
    }
  }


  /**
   * Send data from a form to the server using the FormData object.
   * @param {Event} e
   */
  const handleSubmitInviteEmployee = async e => {
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
        setLoadingInvite(true);
        let formData = new FormData();
        formData.append('firstname', formAddEmployee.firstname);
        formData.append('lastname', formAddEmployee.lastname);
        formData.append('email', formAddEmployee.email);
        formData.append('mobile_phone', formAddEmployee.mobile_phone);
        formData.append('phone_number', formAddEmployee.phone_number);
        formData.append('pob', formAddEmployee.pob);
        formData.append('dob', formAddEmployee.dob);
        formData.append('gender', formAddEmployee.gender);
        formData.append('marital_status', formAddEmployee.marital_status.value);
        formData.append('blood_type', formAddEmployee.blood_type.value);
        formData.append('identity_type', formAddEmployee.identity_type.value);
        formData.append('identity_number', formAddEmployee.identity_number);
        formData.append('marital_status', formAddEmployee.marital_status.value);
        formData.append('is_address_same', firstFormCondition.isSameCitizentAddress ? 1 : 0);
        if (!firstFormCondition.isPermanentIdCard) {
          formData.append('identity_expired', formAddEmployee.identity_expired);
        }
        formData.append('postal_code', formAddEmployee.postal_code);
        formData.append('religion', formAddEmployee.religion.value);
        formData.append('citizent_address', formAddEmployee.citizent_address);
        if (firstFormCondition.isSameCitizentAddress) {
          formData.append('resident_address', formAddEmployee.citizent_address);
        } else {
          formData.append('resident_address', formAddEmployee.resident_address);
        }
        formData.append('nip',formAddEmployee.nip);
        formData.append('job_level', formAddEmployee.job_level);
        formData.append('job_status', formAddEmployee.job_status.value);
        formData.append('department', formAddEmployee.division_id.value);
        formData.append('join_date', formAddEmployee.join_date);
        if (formAddEmployee.job_status.value !== '0') {
          formData.append('end_date', formAddEmployee.end_date);
        }
        formData.append('payment_date', formAddEmployee.payment_date.value);
        formData.append('bank_name', formAddEmployee.bank_name);
        formData.append('account_holder_name', formAddEmployee.account_holder_name);
        formData.append('account_number', formAddEmployee.account_number);
        formData.append('job_position', formAddEmployee.job_position);
    
        // DATA SALARY
        let salaryData = dataIncomeSalary.concat(dataCutSalary);
        salaryData.forEach((data, index) => {
          formData.append(`salary[${index}][type]`, data.type);
          formData.append(`salary[${index}][name]`, data.name);
          formData.append(`salary[${index}][amount]`, data.amount);
        });
    
        // DATA ATTENDANCE CUT
        dataAttendanceCut.forEach((data, index) => {
            formData.append(`cuts[${index}][cut_type]`, data.type);
            if (data.type === 'late') {
              formData.append(`cuts[${index}][total]`, `${data.time} / ${data.days.value}`);
            } else {
              formData.append(`cuts[${index}][total]`, data.days.value);
            }
            formData.append(`cuts[${index}][amount]`, data.amount);
        })
    
        await method.createDataWithoutUpload('employee', formData)
        .then(res => {
          setLoadingInvite(false);
          swal('Employee Invited Successfully', {
            title: "Success",
            icon: 'success',
          }).then(() => {
            setFormStep(3);
          });
        })
        .catch(err => {
          setLoadingInvite(false);
          const errorCode = err.response.status;
          if (errorCode > 400) {
            swal("There's a missing form. Please fill required form", {
              title: "Failed",
              icon: 'error',
            });
          } else {
            swal("There's something wrong in Server. Please contact the administrator", {
              title: "Failed",
              icon: 'error',
            });
          }
        });
      } else {
        return false;
      }
    })
  }
  

  /**
   * When the user clicks on the remove button, the function will remove the item from the array and
   * update the state.
   * Remove Form Income Salary
   */
  const onRemoveIncomeSalary = e => {
    let key = e.target.getAttribute('data-key');
    let cloneDataIncome = [...dataIncomeSalary];
    cloneDataIncome.splice(key, 1);
    setDataIncomeSalary([...cloneDataIncome]);
  }

  /**
   * When the user clicks on the remove button, the function will remove the item from the array and
   * update the state.
   * Remove Form Income Salary
   */
   const onRemoveCutSalary = e => {
    let key = e.target.getAttribute('data-key');
    let cloneDataIncome = [...dataCutSalary];
    cloneDataIncome.splice(key, 1);
    setDataCutSalary([...cloneDataIncome]);
  }

  /**
   * When the user types in the input field, the value of the input field is set to the value of the
   * state.
   */
   const handleChangeForm = (e) => {
    setFormAddEmployee({
      ...formAddEmployee,
      [e.target.name]: e.target.value,
    });
  };


  useEffect(() => {
    fetchDepartment();
    return () => {
      setDepartmentData([]);
    }
  },[formStep]);

  /**
   * FORM COMPONENT FOR STEP FORM
   */
  const FormComponent = [
    <First
      data={formAddEmployee}
      onChange={(e) => {
        handleChangeForm(e);
      }}
      errorExistType={existsErrorType}
      isPermanentIdCard={firstFormCondition.isPermanentIdCard}
      isSameCitizentAddress={firstFormCondition.isSameCitizentAddress}
      onChangeCitizentAddress={() => {
        if (firstFormCondition.isSameCitizentAddress) {
          setFirstFormCondition({
            ...firstFormCondition,
            isSameCitizentAddress: false,
          });
        } else {
          setFirstFormCondition({
            ...firstFormCondition,
            isSameCitizentAddress: true,
          });
        }
      }}
      onChangePermanentIdCard={() => {
        if (firstFormCondition.isPermanentIdCard) {
          setFirstFormCondition({
            ...firstFormCondition,
            isPermanentIdCard: false,
          });
        } else {
          setFirstFormCondition({
            ...firstFormCondition,
            isPermanentIdCard: true,
          });
        } 
      }}
      onChangeSelect={(e) => handleChangeSelectForm(e)}
      onChangeExists={e => handleCheckUser(e.target.name, e.target.value)}
      isValidEmail={isEmailValid}
    />,
    <Second 
      data={formAddEmployee}
      errorExistType={existsErrorType}
      departmentData={departmentData}
      handleCheckUser={e => handleCheckUser(e.target.name, e.target.value)}
      onChange={e => handleChangeForm(e)}
      onChangeSelect={(e) => handleChangeSelectForm(e)}
    />,
    <Third 
      data={formAddEmployee}
      onChangeSelect={e => handleChangeSelectForm(e)}
      dataIncomeSalary={dataIncomeSalary}
      dataCutSalary={dataCutSalary}
      onChange={e => handleChangeForm(e)}
      onSubmitIncomeName={e => onSubmitSalaryName(e, 'income')}
      onChangeIncome={e => handleChangeSalary(e, 'income')}
      handleAddNewIncome={() => handleAddNewIncomeForm()}
      onRemoveIncomeSalary={e => onRemoveIncomeSalary(e)}
      handleAddNewCuts={e => handleAddNewCutsForm(e)}
      onChangeCuts={e => handleChangeSalary(e, 'cuts')}
      onRemoveCutsSalary={e => onRemoveCutSalary(e)}
      onSubmitCutsName={e => onSubmitSalaryName(e, 'cuts')}
      dataAttendanceCut={dataAttendanceCut}
      onChangeCutAttendance={e => handleChangeAttendanceCut(e)}
      onChangeSelectAttendanceCut={e => handleSelectChangeAttendanceCut(e)}
    />,
    <Four />
  ];

  /**
   * It takes an event object, and then it sets the state of the dataAttendanceCut[days] object to the event
   * object.
   */
  const handleSelectChangeAttendanceCut = e => {
    let key = e.keyData;
    let cloneDataAttendanceCut = [...dataAttendanceCut];
    let obj = cloneDataAttendanceCut[key];
    obj.days = e;
    cloneDataAttendanceCut[key] = obj;
    setDataAttendanceCut([...cloneDataAttendanceCut]);
  }

  /**
   * It takes an event object, and then it sets the state of the formAddEmployee object to the event
   * object.
   */
  const handleChangeSelectForm = (e) => {
    setFormAddEmployee({
      ...formAddEmployee,
      [e.name]: e,
    });
  };

  return (
    <Fragment>
      <h1 className="mt-4 breadcumb my-4">Add Employee</h1>
      {/* HEADER */}
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
        {/* STEP PROGRESS */}
        <div className="col-xl-3 col-lg-4 col-md-12 col-sm-12">
          <div className="card card-shadow">
            <Step step={formStep} />
          </div>
        </div>

        {/* FORM */}
        <div className="col-xl-9 col-lg-8 col-md-12 col-sm-12">
          <div>
            {FormComponent[formStep]}
          </div>
          <div className="col-12 text-center mt-4">
            <div className="btn-group text-center">
              {
                formStep < 3 ?
                <ButtonWhiteFilter
                  name={formStep > 0 ? "Back" : "Cancel"}
                  onClick={() => {
                    if (formStep > 0) {
                      setFormStep(formStep - 1);
                    } else {
                      history.push("/employee");
                    }
                  }}
                /> : null
              }
              <ButtonBlueFilter
                name={
                  formStep === 2 ? 'Invite Employee' : 
                  (formStep === 3 ? 'List' : (loadingInvite ? 'Processing...' : 'Next'))
                }
                onClick={e => formValidation(e)}
                disabled={loadingInvite}
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AddEmployee;

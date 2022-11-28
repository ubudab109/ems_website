import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import ButtonBlueFilter from '../../component/ButtonBlueFilter';
import ButtonWhiteFilter from '../../component/ButtonWhiteFilter';
import First from './components/addemployee/Form/First';
import Step from './components/addemployee/StepProgress/Step';

const AddEmployee = () => {
  const history = useHistory();
  const [firstFormCondition, setFirstFormCondition] = useState({
    isSameCitizentAddress: false,
    isPermanentIdCard: false,
  });
  const [formStep, setFormStep] = useState(1);
  const [formAddEmployee, setFormAddEmployee] = useState({
    firstname: '',
    lastname: '',
    email: '',
    mobile_phone: '',
    phone_number: '',
    pob: '',
    dob: '',
    gender: 'male',
    marital_status: '',
    blood_type: {
      name: 'blood_type',
      value: '',
      label: 'Select Blood Type'
    },
    identity_type: '',
    identity_expired: '',
    postal_code: '',
    citizent_address: '',
    resident_address: '',
  })

  
  /**
   * When the user types in the input field, the value of the input field is set to the value of the
   * state.
   */
  const handleChangeFirstForm = e => {
    setFormAddEmployee({
      ...formAddEmployee,
      [e.target.name] : e.target.value
    })
  };

  const handleChangeSelectFirstForm = e => {
    setFormAddEmployee({
      ...formAddEmployee,
      [e.name] : e,
    });
  };

  const FormComponent = () => {
    switch(formStep) {
      case 1:
        return (
          <First
              data={formAddEmployee}
              onChange={e => {
                console.log(e);
                handleChangeFirstForm(e)
              }}
              isPermanentIdCard={firstFormCondition.isPermanentIdCard}
              isSameCitizentAddress={firstFormCondition.isSameCitizentAddress}
              onChangeCitizentAddress={() => {
                if (firstFormCondition.isSameCitizentAddress) {
                  setFirstFormCondition({
                    ...firstFormCondition,
                    isSameCitizentAddress: false
                  });
                } else {
                  setFirstFormCondition({
                    ...firstFormCondition,
                    isSameCitizentAddress: true
                  });
                }
              }}
              onChangePermanentIdCard={() => {
                if (firstFormCondition.isPermanentIdCard) {
                  setFirstFormCondition({
                    ...firstFormCondition,
                    isPermanentIdCard: false
                  });
                } else {
                  setFirstFormCondition({
                    ...firstFormCondition,
                    isPermanentIdCard: true
                  });
                }
              }}
              onChangeSelect={e => handleChangeSelectFirstForm(e)}
            />
        );
      case 2:
        return (
          <div>2</div>
        );
      default:
        return null;
    }
  }
  return (
    <Fragment>
      <h1 className="mt-4 breadcumb my-4">Add Employee</h1>
      {/* HEADER */}
      <div className="row">
        <div className="col-12 pl-25">
          <button className="btn btn-white-filter" onClick={() => history.push('/employee')}>
            <img src={`${process.env.PUBLIC_URL}/assets/img/left.png`} alt="left" />
          </button>
          <div className="divider-card mt-3 mb-3" style={{ width: '99%' }} />
        </div>
      </div>

      <div className="row">
        {/* STEP PROGRESS */}
        <div className="col-xl-3 col-lg-4 col-md-12 col-sm-12">
          <div className="card card-shadow">
            <Step />
          </div>
        </div>

        {/* FORM */}
        <div className="col-xl-9 col-lg-8 col-md-12 col-sm-12">
          <div className="card card-shadow">
            <FormComponent />
          </div>
          <div className="col-12 text-center mt-4">
            <div className="btn-group text-center">
              <ButtonWhiteFilter name={formStep > 1 ? 'Back' : 'Cancel'} onClick={() => {
                if (formStep > 1) {
                  setFormStep(formStep - 1);
                } else {
                  history.push('/employee')
                }
              }} />
              <ButtonBlueFilter name="Next" onClick={() => setFormStep(formStep + 1)} />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AddEmployee;

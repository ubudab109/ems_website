import React from "react";
import './Step.scss'

const Step = ({step}) => {
  return (
    <div className="card mb-3">
      <div className="card-body h-100">
        <p style={{ color: "#00617F" }}>
          <b className="mr-5">Step Progress</b>
        </p>
        <div className="col-xl-12">
          <ul className="timeline">
            <li className={`step-1 ${step === 0 ? 'active' : (step > 0 ? 'complete' : '')}`}>
              <p style={{marginLeft : '20px', paddingTop: '10px'}}>
                Personal Data <br />
                <span className="text-muted">{step > 0 ? 'Complete' : 'Not Complete'}</span>
              </p>
              
            </li>
            <li className={`step-2 ${step === 1 ? 'active' : (step > 1 ? 'complete' : '')}`}>
              <p style={{marginLeft : '20px', paddingTop: '10px'}}>
                Employment Data <br />
                <span className="text-muted">{step > 1 ? 'Complete' : 'Not Complete'}</span>
                </p>
            </li>
            <li className={`step-3 ${step === 2 ? 'active' : (step > 2 ? 'complete' : '')}`}>
              <p style={{marginLeft : '20px', paddingTop: '10px'}}>
                Payroll <br />
                <span className="text-muted">{step > 2 ? 'Complete' : 'Not Complete'}</span>
              </p>
            </li>
            <li className={`step-4 ${step === 3 ? 'active' : (step > 3 ? 'complete' : '')}`}>
              <p style={{marginLeft : '20px', paddingTop: '10px'}}>
                Invited Employee <br />
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Step;

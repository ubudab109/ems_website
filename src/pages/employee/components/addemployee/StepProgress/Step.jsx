import React from "react";
import './Step.scss'

const Step = () => {
  return (
    <div className="card mb-3">
      <div className="card-body h-100">
        <p style={{ color: "#00617F" }}>
          <b className="mr-5">Step Progress</b>
        </p>
        <div className="col-xl-12">
          <ul className="timeline">
            <li className="step-1 active">
              <p style={{marginLeft : '20px', paddingTop: '10px'}}>Personal Data</p>
            </li>
            <li className="step-2">
              <p style={{marginLeft : '20px', paddingTop: '10px'}}>Employment Data</p>
            </li>
            <li className="step-3">
              <p style={{marginLeft : '20px', paddingTop: '10px'}}>Payroll</p>
            </li>
            <li className="step-4">
              <p style={{marginLeft : '20px', paddingTop: '10px'}}>Invited Employee</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Step;

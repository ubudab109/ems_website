import React from "react";
import './Step.scss'

const Step = () => {
  return (
    <div className="card mb-3">
      <div className="card-body h-100">
        <p style={{ color: "#00617F" }}>
          <b className="mr-5">Step Progress</b>
        </p>
        <div class="col-xl-12">
          <ul class="timeline">
            <li>
              <p>Personal Data</p>
            </li>
            <li>
              <p>Employment Data</p>
            </li>
            <li>
              <p>Payroll</p>
            </li>
            <li>
              <p>Invited Employee</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Step;

import React from "react";
import "./Step.scss";

const Step = () => {
  return (
    <div className="card mb-3">
      <div className="card-body h-100">
        <p style={{ color: "#00617F" }}>
          <b className="mr-5">Step Progress</b>
        </p>
        <div class="position-relative m-4">
          <div class="progress" style={{height: "1px;"}}>
            <div
              class="progress-bar"
              role="progressbar"
              style={{width: "50%;"}}
              aria-valuenow="50"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
          <div className="d-flex">
          <button
            type="button"
            class="position-absolute top-0 start-0 translate-middle btn btn-sm btn-primary rounded-pill"
            
          >
            1
          </button>
          <button
            type="button"
            class="position-absolute top-0 start-50 translate-middle btn btn-sm btn-primary rounded-pill"
            
          >
            2
          </button>
          <button
            type="button"
            class="position-absolute top-0 start-100 translate-middle btn btn-sm btn-secondary rounded-pill"
            
          >
            3
          </button>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Step;

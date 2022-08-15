import React from "react";
import "./pageheading.scss";
import Form from "../Form/Form";
import StepProgress from "../StepProgress/Step"

const pageHeading = () => (
  <div className="p-1">
    <div className="row">
      <div className="col-xl-3">
        <StepProgress />
      </div>
      <div className="col-xl-9">
      <Form />
      </div>
    </div>
  </div>
);

export default pageHeading;

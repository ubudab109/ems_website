import React from "react";
import "./pageheading.scss";
import Form from "../Form/Form";
import StepProgress from "../StepProgress/Step"
import {BsArrowLeft} from "react-icons/bs"

const pageHeading = () => (
  <div className="p-1">
    <div>
      <button className="btn btn-outline-primary" style={{width:"63px"}}><BsArrowLeft style={{color:"#00617F"}} size={25}/></button>
      <hr className="hr1"/>
    </div>
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

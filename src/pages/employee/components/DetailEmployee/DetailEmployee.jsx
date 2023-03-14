import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import "./DetailEmployee.scss";
import CardLeft from "./components/CardLeft/CardLeft";
import { FaSearch } from "react-icons/fa";
import Reimbursement from "./components/Finance/Reimbursement";

const DetailEmployee = () => {
  return (
    <div className="p-1">
      <div>
        <button className="btn btn-outline-primary" style={{ width: "63px" }}>
          <BsArrowLeft style={{ color: "#00617F" }} size={25} />
        </button>
        <hr className="hr1" />
      </div>
      <div className="row">
       <CardLeft />
        <Reimbursement />
          </div>
        </div>
  );
};

export default DetailEmployee;

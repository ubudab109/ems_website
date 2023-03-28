import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import "./DetailEmployee.scss";
import CardLeft from "./components/CardLeft/CardLeft";
import { FaSearch } from "react-icons/fa";
import Tabs from "./components/ScheduleRequest/Tabs";
import Tabbing from "./components/Finance/Tabbing";

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
       <div className="col-xl-9">
       <Tabs />
       </div>
        
          </div>
        </div>
  );
};

export default DetailEmployee;

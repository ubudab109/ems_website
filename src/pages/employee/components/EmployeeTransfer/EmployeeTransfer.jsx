import { Button } from "bootstrap";
import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import "./EmployeeTransfer.scss";
import { FaSearch } from "react-icons/fa";

const EmployeeTransfer = () => {
  return (
    <div className="p-1">
      <div>
        <button className="btn btn-outline-primary" style={{ width: "63px" }}>
          <BsArrowLeft style={{ color: "#00617F" }} size={25} />
        </button>
        <button className="btn btn-outline-primary float-end" >
          Employee Transfer
        </button>
        <hr className="hr1" />
      </div>
      <div className="col-xl-12">
        <div className="card shadow mb-4">
          <div className="card-body">
            <div className="col-xl-12">
              <div className="row">
                <div className="col-xl-3">
                  <p>Employee Transfer History</p>
                </div>
                <div className="col-xl-4">
                  <div className="search mr-5">
                    <div className="d-flex">
                      <div className="searchIcon border-primary">
                        <button type="button" className="btn">
                          <FaSearch color="#00617F" />
                        </button>
                      </div>
                      <input
                        type="search"
                        className="form-control"
                        placeholder="Search Employee"
                        aria-controls="DataTables_Table_0"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <table className="table mb-0">
              <thead>
                <tr>
                  <th scope="col">Employee Name</th>
                  <th scope="col">Employee ID</th>
                  <th scope="col">Created Day</th>
                  <th scope="col">Effective Day</th>
                  <th scope="col">Status</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Munandar Soleh Somandi</td>
                  <td>Accounting Department</td>
                  <td>Accounting Manager</td>
                  <td>Manager</td>
                  <td>
                    <span className="badge bg-success badge-radius">
                      Active
                    </span>
                  </td>
                  <td><a href="">Detail</a></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeTransfer;

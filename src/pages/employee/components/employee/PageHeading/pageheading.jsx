import React from "react";
import "./pageheading.scss";
import { Link } from "react-router-dom";
// import addEmployee from "../../addemployee/PageHeading/pageHeading"
import { FaSearch } from "react-icons/fa";
import { MdAdd } from "react-icons/md";

const PageHeading = () => (
  <div className="container p-2">
    <div className="row">
      <div className="col-xl-3">
        <div className="card mb-3">
          <div style={{ width: "18rem;" }}>
            <div className="card-header" style={{ color: "#00617F" }}>
              <b>Department</b>
              <button type="button" className="btn float-end">
                <MdAdd size={23} color="#00617F" />
              </button>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">All Department</li>
              <li className="list-group-item">HR Department</li>
              <li className="list-group-item">Accounting Department</li>
              <li className="list-group-item">IT Department</li>
            </ul>
          </div>
        </div>
        <div className="card mb-3">
          <div style={{ width: "18rem;" }}>
            <div className="card-header" style={{ color: "#00617F" }}>
              <b>Job Status</b>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">All Status (Default)</li>
              <li className="list-group-item">Permanent</li>
              <li className="list-group-item">Contract</li>
              <li className="list-group-item">Probation</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="col-xl-9">
        <div className="text-right mb-3">
          <Link to={`/employee`}>
            <button
              type="button"
              className="btn btn-outline-primary"
              style={{ width: "136px" }}
            >
              Add Employee
            </button>
          </Link>
        </div>
        <div className="row d-flex justify-content-between align-items-center mb-3">
          <div className="col-lg-6 d-flex align-items-center">
            <div className="d-flex">
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
              <div className="dropdown mr-5">
                <button
                  className="btn btn-outline-primary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  All Status
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-6 d-flex align-items-center justify-content-lg-end">
            <div className="mr-3">
              <button className="btn btn-outline-primary shadow-sm" type="submit">
                Export
              </button>
            </div>
            <div className="mr-3">
              <button
                className="btn btn-outline-primary shadow-sm"
                type="submit"
                style={{ width: "144px" }}
              >
                Employee Transfer
              </button>
            </div>
            <div className="">
              <button
                className="btn btn-outline-primary shadow-sm"
                type="submit"
                style={{ width: "136px" }}
              >
                Delete Employee
              </button>
            </div>
          </div>
        </div>
        <div className="card shadow mb-4">
          <div className="card-body">
            <div className="table-wrapper-scroll-y custom-scrollbar">
              <table className="table mb-0">
                <thead>
                  <tr>
                    <th scope="col">Employee Name</th>
                    <th scope="col">Department</th>
                    <th scope="col">Job Position</th>
                    <th scope="col">Job Level</th>
                    <th scope="col">Job Status</th>
                    <th scope="col">Job Salary</th>
                    <th scope="col">Employee Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Munandar Soleh Somandi</td>
                    <td>Accounting Department</td>
                    <td>Accounting Manager</td>
                    <td>Manager</td>
                    <td>Permanent</td>
                    <td>Rp. 7.500.000</td>
                    <td>
                      <span className="badge bg-success badge-radius">
                        Active
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Munandar Soleh Somandi</td>
                    <td>Accounting Department</td>
                    <td>Accounting Manager</td>
                    <td>Manager</td>
                    <td>Permanent</td>
                    <td>Rp. 7.500.000</td>
                    <td>
                      <span className="badge bg-success badge-radius">
                        Active
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Munandar Soleh Somandi</td>
                    <td>Accounting Department</td>
                    <td>Accounting Manager</td>
                    <td>Manager</td>
                    <td>Permanent</td>
                    <td>Rp. 7.500.000</td>
                    <td>
                      <span className="badge bg-success badge-radius">
                        Active
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Munandar Soleh Somandi</td>
                    <td>Accounting Department</td>
                    <td>Accounting Manager</td>
                    <td>Manager</td>
                    <td>Permanent</td>
                    <td>Rp. 7.500.000</td>
                    <td>
                      <span className="badge bg-success badge-radius">
                        Active
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Munandar Soleh Somandi</td>
                    <td>Accounting Department</td>
                    <td>Accounting Manager</td>
                    <td>Manager</td>
                    <td>Permanent</td>
                    <td>Rp. 7.500.000</td>
                    <td>
                      <span className="badge bg-success badge-radius">
                        Active
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Munandar Soleh Somandi</td>
                    <td>Accounting Department</td>
                    <td>Accounting Manager</td>
                    <td>Manager</td>
                    <td>Permanent</td>
                    <td>Rp. 7.500.000</td>
                    <td>
                      <span className="badge bg-success badge-radius">
                        Active
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default PageHeading;

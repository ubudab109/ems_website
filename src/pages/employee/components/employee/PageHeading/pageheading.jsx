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
            <div class="card-header" style={{ color: "#00617F" }}>
              <b>Department</b>
              <button type="button" className="btn float-end">
                <MdAdd size={23} color="#00617F" />
              </button>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">All Department</li>
              <li class="list-group-item">HR Department</li>
              <li class="list-group-item">Accounting Department</li>
              <li class="list-group-item">IT Department</li>
            </ul>
          </div>
        </div>
        <div className="card mb-3">
          <div style={{ width: "18rem;" }}>
            <div class="card-header" style={{ color: "#00617F" }}>
              <b>Job Status</b>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">All Status (Default)</li>
              <li class="list-group-item">Permanent</li>
              <li class="list-group-item">Contract</li>
              <li class="list-group-item">Probation</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="col-xl-9">
        <div className="text-right mb-3">
          <Link to={`/employee`}>
            <button
              type="button"
              class="btn btn-outline-primary"
              style={{ width: "136px" }}
            >
              Add Employee
            </button>
          </Link>
        </div>
        <div class="row d-flex justify-content-between align-items-center mb-3">
          <div class="col-lg-6 d-flex align-items-center">
            <div class="d-flex">
              <div className="search mr-5">
                <div className="d-flex">
                  <div className="searchIcon border-primary">
                    <button type="button" className="btn">
                      <FaSearch color="#00617F" />
                    </button>
                  </div>
                  <input
                    type="search"
                    class="form-control"
                    placeholder="Search Employee"
                    aria-controls="DataTables_Table_0"
                  />
                </div>
              </div>
              <div class="dropdown mr-5">
                <button
                  class="btn btn-outline-primary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  All Status
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li>
                    <a class="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-lg-6 d-flex align-items-center justify-content-lg-end">
            <div class="mr-3">
              <button class="btn btn-outline-primary shadow-sm" type="submit">
                Export
              </button>
            </div>
            <div class="mr-3">
              <button
                class="btn btn-outline-primary shadow-sm"
                type="submit"
                style={{ width: "144px" }}
              >
                Employee Transfer
              </button>
            </div>
            <div class="">
              <button
                class="btn btn-outline-primary shadow-sm"
                type="submit"
                style={{ width: "136px" }}
              >
                Delete Employee
              </button>
            </div>
          </div>
        </div>
        <div class="card shadow mb-4">
          <div class="card-body">
            <div class="table-wrapper-scroll-y custom-scrollbar">
              <table class="table mb-0">
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

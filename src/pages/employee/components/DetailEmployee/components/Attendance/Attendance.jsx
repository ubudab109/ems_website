import React from "react";
import {BsList} from "react-icons/bs"

const Attendance = () => {
  return (
    <div className="col-xl-9">
      <div className="card shadow mb-4">
        <div className="card-body">
          <h5 className="mb-3">Attendance History</h5>
          <div className="row d-flex mb-3">
            <div className="col-lg-6 align-items-center">
              <div className="d-flex">
                <div className="dropdown mr-5">
                  <button
                    className="btn btn-outline-primary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    January
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
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
                <div className="dropdown mr-5">
                  <button
                    className="btn btn-outline-primary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    2022
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
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
            <div className="col-lg-6 ">
              <div className="d-flex float-end">
                <div className="dropdown mr-5">
                  <button
                    className="btn btn-outline-primary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    All
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
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
                <div className="mr-5">
                  <button className="btn btn-outline-primary" type="button">
                    Export
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="table-wrapper-scroll-y custom-scrollbar">
            <table className="table mb-0">
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Clock In</th>
                  <th scope="col">Clock Out</th>
                  <th scope="col">Work Places</th>
                  <th scope="col">Status Attendance</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Munandar Soleh Somandi</td>
                  <td>Accounting Department</td>
                  <td>Accounting Manager</td>
                  <td>
                    <span className="badge bg-success badge-radius">
                      Active
                    </span>
                  </td>
                  <td>
                    <span className="badge bg-primary badge-radius">
                      Active
                    </span>
                  </td>
                  <td>
                  <button className="btn">
                      <BsList size={20} style={{color:"#00617F"}}/>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Munandar Soleh Somandi</td>
                  <td>Accounting Department</td>
                  <td>Accounting Manager</td>
                  <td>
                    <span className="badge bg-success badge-radius">
                      Active
                    </span>
                  </td>
                  <td>
                    <span className="badge bg-success badge-radius">
                      Active
                    </span>
                  </td>
                  <td>
                  <button className="btn">
                      <BsList size={20} style={{color:"00617F"}}/>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Munandar Soleh Somandi</td>
                  <td>Accounting Department</td>
                  <td>Accounting Manager</td>
                  <td>
                      <span className="badge bg-success badge-radius">
                        Active
                      </span>
                    </td>
                    <td>
                      <span className="badge bg-success badge-radius">
                        Active
                      </span>
                    </td>
                  <td>
                  <button className="btn">
                      <BsList size={20} style={{color:"00617F"}}/>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Munandar Soleh Somandi</td>
                  <td>Accounting Department</td>
                  <td>Accounting Manager</td>
                  <td>
                      <span className="badge bg-success badge-radius">
                        Active
                      </span>
                    </td>
                    <td>
                      <span className="badge bg-success badge-radius">
                        Active
                      </span>
                    </td>
                  <td>
                  <button className="btn">
                      <BsList size={20} style={{color:"00617F"}}/>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Munandar Soleh Somandi</td>
                  <td>Accounting Department</td>
                  <td>Accounting Manager</td>
                  <td>
                      <span className="badge bg-success badge-radius">
                        Active
                      </span>
                    </td>
                    <td>
                      <span className="badge bg-success badge-radius">
                        Active
                      </span>
                    </td>
                  <td>
                  <button className="btn">
                      <BsList size={20} style={{color:"00617F"}}/>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>Munandar Soleh Somandi</td>
                  <td>Accounting Department</td>
                  <td>Accounting Manager</td>
                  <td>
                      <span className="badge bg-success badge-radius">
                        Active
                      </span>
                    </td>
                    <td>
                      <span className="badge bg-success badge-radius">
                        Active
                      </span>
                    </td>
                  <td>
                    <button className="btn">
                      <BsList size={20} style={{color:"00617F"}}/>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;

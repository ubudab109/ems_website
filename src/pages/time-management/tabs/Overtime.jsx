import React from "react";
import "./timeManagement.scss";
import { FaSearch } from "react-icons/fa";

const Overtime = () => {
  return (
    <div className="col-xl-12 mt-3">
      <div className="card shadow mb-4">
        <div className="card-body">
          <div className="row d-flex justify-content-between align-items-center mb-3">
            <div className="col-lg-6 d-flex align-items-center">
              <div className="d-flex">
                <div className="search mr-5">
                  <div className="d-flex">
                    <div className="search">
                      <i type="button" className="fa-search">
                        <FaSearch />
                      </i>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search Employee"
                      />
                    </div>
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
                    Accounting Department
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
            <div className="col-lg-6 d-flex align-items-center justify-content-lg-end">
              <div className="mr-3">
                <button className="btn btn-outline-primary shadow-sm" type="submit">
                  Mon,01/02/2022
                </button>
              </div>
            </div>
          </div>
          <div className="table-wrapper-scroll-y custom-scrollbar">
            <table className="table mb-0">
              <thead>
                <tr>
                  <th scope="col">Employee Name</th>
                  <th scope="col">Department</th>
                  <th scope="col">Job Level</th>
                  <th scope="col">Overtime In</th>
                  <th scope="col">Overtime Out</th>
                  <th scope="col">Taken Time</th>
                  <th scope="col">Detail</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Munandar Soleh Somandi</td>
                  <td>Accounting Department</td>
                  <td>Manager</td>
                  <td>16.00</td>
                  <td>17.00</td>
                  <td>3 Times</td>
                  <td>
                  <button type="button" className="btn btn-outline-primary rounded-pill" >View</button>
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

export default Overtime;

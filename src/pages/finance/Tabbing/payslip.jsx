import React from "react";
import "./finance.scss";
import { FaSearch } from "react-icons/fa";

const payslip = () => {
  return (
    <div className="col-xl-12 mt-3">
      <div className="row">
        <div class="col-lg-6 d-flex align-items-center mb-3">
          <div class="d-flex">
            <div class="dropdown mr-5">
              <button
                class="btn btn-outline-primary dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                January
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
            <div class="dropdown mr-5">
              <button
                class="btn btn-outline-primary dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                2022
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
            <div className="search mr-5">
              <div className="d-flex">
                <div class="search">
                  <i type="button" class="fa-search">
                    <FaSearch />
                  </i>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Search Employee"
                  />
                </div>
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
                Department
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
        <div class="col-lg-6 d-flex justify-content-end mb-3">
          <div class="mr-3">
            <button class="btn btn-outline-primary shadow-sm" type="submit">
              Export
            </button>
          </div>
          <div class="mr-3">
            <button class="btn btn-primary shadow-sm" type="submit">
              Send Payslip
            </button>
          </div>
        </div>
      </div>

      <div class="card shadow">
        <div class="card-body">
          <div class="row d-flex justify-content-between align-items-center mb-3"></div>
          <div class="table-wrapper-scroll-y custom-scrollbar">
            <table class="table mb-0">
              <thead>
                <tr>
                  <th scope='col'><input type="checkbox" className='form-check-input' /></th>
                  <th scope="col">Employee Name</th>
                  <th scope="col">Department</th>
                  <th scope="col">Job Position</th>
                  <th scope="col">Job Level</th>
                  <th scope="col">Payment Date</th>
                  <th scope="col">Total Payment</th>
                  <th scope="col">Detail</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><input type="checkbox" className='form-check-input' /></td>
                  <td>Munandar Soleh Somandi</td>
                  <td>Accounting Department</td>
                  <td>Accounting Manager</td>
                  <td>Manager</td>
                  <td>31 Jan 2022</td>
                  <td>Rp.7.000.000</td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-outline-primary rounded-pill"
                    >
                      View
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

export default payslip;

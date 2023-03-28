import React from 'react'
import './finance.scss'
import { MdAdd } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { FaBars } from "react-icons/fa";

const reimbursement = () => {
  return (
    <div className="col-xl-12 mt-3">
      <div class="row">
        <div class="col-xl-8">
        <div className="row">
        <div class="col-lg-6 d-flex align-items-center mb-3">
        <div class="d-flex">
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
                    Accounting Department
                  </button>
                  <ul
                    class="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
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
                  <th scope="col">Detail</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><input class="form-check-input" type="checkbox" /></td>
                  <td>Munandar Soleh Somandi</td>
                  <td>Accounting Department</td>
                  <td>Manager</td>
                  <td>16.00</td>
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
        <div class="col-xl-4">
          <div className="card mb-3">
            <div class="card-header" style={{ color: "#00617F" }}>
              <b>Claim Type</b>
              <button type="button" className="btn float-end">
                <MdAdd size={23} color="#00617F" />
              </button>
            </div>
            <ul class="list-group">
              <li className="list-group-item">
                <div className="d-flex justify-content-between">
                  <div class="ms-3">
                    <p class="fw-bold mb-1">Medical Claim</p>
                    <p class="text-blue-dark mb-0">Rp.300.000</p>
                  </div>
                  <a class="btn" href="#" role="button">
                    <FaBars size={23} color="#00617F" />
                  </a>
                </div>
              </li>
              <li className="list-group-item">
                <div className="d-flex justify-content-between">
                  <div class="ms-3">
                    <p class="fw-bold mb-1">Uang Makan</p>
                    <p class="text-blue-dark mb-0">Rp.50.000</p>
                  </div>
                  <a class="btn" href="#" role="button">
                    <FaBars size={23} color="#00617F" />
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default reimbursement
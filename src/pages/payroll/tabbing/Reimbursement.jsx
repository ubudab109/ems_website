import React from 'react'
import './finance.scss'
import { MdAdd } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { FaBars } from "react-icons/fa";

const reimbursement = () => {
  return (
    <div className="col-xl-12 mt-3">
      <div className="row">
        <div className="col-xl-8">
        <div className="row">
        <div className="col-lg-6 d-flex align-items-center mb-3">
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
                    className="btn btn-outline-blues dropdown-toggle"
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
              <div className="col-lg-6 d-flex justify-content-end mb-3">
              <div className="mr-3">
            <button className="btn btn-outline-white shadow-sm" type="submit">
              Export
            </button>
          </div>
          <div className="mr-3">
            <button className="btn btn-white shadow-sm" type="submit">
              Send Reimbursement
            </button>
          </div>
              </div>
              </div>
              <div className="card shadow">
        <div className="card-body">
          <div className="row d-flex justify-content-between align-items-center mb-3"></div>
          <div className="table-wrapper-scroll-y custom-scrollbar">
            <table className="table mb-0">
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
                  <td><input className="form-check-input" type="checkbox" /></td>
                  <td>Munandar Soleh Somandi</td>
                  <td>Accounting Department</td>
                  <td>Manager</td>
                  <td>16.00</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-outline-white rounded-pill"
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
        <div className="col-xl-4">
          <div className="card p-0">
            <div className='table-responsive'>
              <table className='table'>
                <thead>
                <div className="table-responsive d-flex justify-content-between" style={{ color: "#00617F" }}>
              <p className='mt-3'>Claim Type</p>
              <a className="btn mt-3" href="#" role="button">
              <MdAdd size={23} color="#00617F" />
                  </a>
            </div>
                </thead>
                </table>
                <div className="d-flex justify-content-between">
                  <div className="ms-3">
                    <p className="fw-bold mt-2">Medical Claim</p>
                    
                  </div>
                  <p className="text-orange mt-2">Rp.300.000</p>
                  <a className="btn" href="#" role="button">
                    <FaBars size={23} color="#00617F" />
                  </a>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <div className="ms-3">
                    <p className="fw-bold mt-2">Uang Makan</p>
                  </div>
                  <p className="text-orange mt-2">Rp.50.000</p>
                  <a className="btn" href="#" role="button">
                    <FaBars size={23} color="#00617F" />
                  </a>
                </div>
                <hr />
            </div>
          </div>




        </div>
      </div>
    </div>
  )
}

export default reimbursement
import React from 'react'
import {BsList} from "react-icons/bs"

const Reimbursement = () => {
  return (
    <div className="col-xl-9">
      <div className="card shadow mb-4">
        <div className="card-body">
          <div className="row d-flex mb-3">
            <div className="col-lg-6 align-items-center">
              <div className="d-flex">
                <div className="dropdown mr-5">
                  <button
                    className="btn btn-outline-primary dropdown-toggle rounded-3"
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
              </div>
            </div>
          </div>
          <div className="table-wrapper-scroll-y custom-scrollbar">
            <table className="table mb-0">
              <thead>
                <tr>
                <th scope="col"><input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" /></th>
                  <th scope="col">Date</th>
                  <th scope="col">Claim Type</th>
                  <th scope="col">Total</th>
                  <th scope="col">Status</th>
                  <th scope="col">Detail</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                    <td><input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" /></td>
                  <td>1 Jan 2022</td>
                  <td>Medical Claim</td>
                  <td>
                   Rp. 300.000
                  </td>
                  <td>
                  <span className="badge bg-success">Approved</span>
                  </td>
                  <td>
                  <button className="btn btn-primary rounded-pill">
                      view
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reimbursement
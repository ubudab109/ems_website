import React from 'react'
import {BsList} from "react-icons/bs"

const Reimbursement = () => {
  return (
    <div className="col-xl-12">
      <div class="card shadow mb-4">
        <div class="card-body">
          <div class="row d-flex mb-3">
            <div class="col-lg-6 align-items-center">
              <div class="d-flex">
                <div class="dropdown mr-5">
                  <button
                    class="btn btn-outline-primary dropdown-toggle rounded-3"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    January
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
          </div>
          <div class="table-wrapper-scroll-y custom-scrollbar">
            <table class="table mb-0">
              <thead>
                <tr>
                <th scope="col"><input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" /></th>
                  <th scope="col">Date</th>
                  <th scope="col">Claim Type</th>
                  <th scope="col">Total</th>
                  <th scope="col">Status</th>
                  <th scope="col">Detail</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                    <td><input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" /></td>
                  <td>1 Jan 2022</td>
                  <td>Medical Claim</td>
                  <td>
                   Rp. 300.000
                  </td>
                  <td>
                  <span class="badge bg-success">Approved</span>
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
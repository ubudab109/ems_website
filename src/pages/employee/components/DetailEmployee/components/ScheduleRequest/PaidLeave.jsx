import React from 'react'
import "./ScheduleRequest.scss";
import {BsList} from "react-icons/bs"

const PaidLeave = () => {
  return (
    <div className="col-xl-9">
      <div class="card shadow mb-4">
        <div class="card-body">
          <div className='row text-center p-3 container'>
          <div className='col-xl-6'>
          <h5 className="mb-3">Cuti Wajib Karyawan</h5>
          <h5 className="mb-3">12 Days</h5>
          </div>
          <div className="v-divider"></div>
          <div className='col-xl-5'>
          <h5 className="mb-3">Cuti Wajib Karyawan</h5>
          <h5 className="mb-3">0 Days</h5>
          </div>
          </div>
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
                <div class="dropdown mr-5">
                  <button
                    class="btn btn-outline-primary dropdown-toggle rounded-3"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    2022
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
            <div class="col-lg-6 ">
              <div class="d-flex float-end">
                <div class="dropdown mr-5">
                  <button
                    class="btn btn-outline-primary dropdown-toggle rounded-3"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    All
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
                <div class="mr-5">
                  <button class="btn btn-outline-primary rounded-3" type="button">
                    Export
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="table-wrapper-scroll-y custom-scrollbar">
            <table class="table mb-0">
              <thead>
                <tr>
                  <th scope="col">Created Date</th>
                  <th scope="col">Start Date</th>
                  <th scope="col">End Date</th>
                  <th scope="col">Taken</th>
                  <th scope="col">Status</th>
                  <th scope="col">Detail</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1 Jan 2022</td>
                  <td>16:00</td>
                  <td>
                    18:00
                  </td>
                  <td style={{color:"#ff5900"}}>
                    3 Times
                  </td>
                  <td>
                  <span class="badge bg-success">Approval</span>
                  </td>
                  <td>
                  <button className="btn">
                      <BsList size={20} style={{color:"00617F"}}/>
                    </button>
                  </td>
                  <td>Cancel</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaidLeave
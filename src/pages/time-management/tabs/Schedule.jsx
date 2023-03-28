import React from "react";
import { FaBars } from "react-icons/fa";
import "./timeManagement.scss";

const Schedule = () => {
  return (
    <div className="col-xl-12">
      <div class="row">
        <div class="col-xl-8">
          <div class="card">
          <h3 className="text-blue-dark p-3">Today Schedule</h3>
            <div class="card-body">
              <div className="row">
                <div className="col-xl-6">
                  <div class="mb-3">
                    <label
                      for="exampleFormControlInput1"
                      class="form-label text-blue-dark"
                    >
                      Schedule Name
                    </label>
                    <input class="form-control" placeholder="Schedule Office" />
                  </div>
                  <div class="mb-3">
                    <label
                      for="exampleFormControlInput1"
                      class="form-label text-blue-dark"
                    >
                      Created Date
                    </label>
                    <input class="form-control" placeholder="Schedule Office" />
                  </div>
                  <div>
                    <p
                      className="text-blue-dark"
                      style={{ marginBottom: "5px" }}
                    >
                      Time
                    </p>
                    <p style={{ color: "#AAAAAA" }}>
                      Set Schedule Clock In And Clock Out
                    </p>
                  </div>
                  <div className="row">
                    <div className="col-xl-6">
                      <p>
                        <b>Clock In</b>
                      </p>
                      <h1 className="text-blue-dark">09.00</h1>
                      <hr className="hr1" />
                    </div>
                    <div className="col-xl-6">
                      <p>
                        <b>Clock Out</b>
                      </p>
                      <h1 className="text-blue-dark">15.00</h1>
                      <hr className="hr1" />
                    </div>
                  </div>
                </div>
                <div className="col-xl-6">
                  <div className="container">
                    <div className="col-xl-9 mx-auto">
                      <div className="card">
                        <img
                          className="border"
                          src="https://via.placeholder.com/150x150"
                          alt="Barcode"
                          srcset=""
                        />
                      </div>
                      <p style={{ color: "#aaaaaa" }}>Code 123123</p>
                      <div>
                        <div class="d-grid gap-2 mb-2">
                          <button class="btn btn-export rounded" type="button">
                            Export
                          </button>
                        </div>

                        <div class="row">
                          <div class="col-xl-6 ">
                            <a
                              class="btn btn-primary w-100  "
                              href="# "
                            >
                              <span style={{ fontSize: "14px" }}>
                                Change Schedule
                              </span>
                            </a>
                          </div>
                          <div class="col-xl-6 ">
                            <a class=" btn btn-orange w-100" href="# ">
                              <span style={{ fontSize: "14px" }}>
                                Edit Schedule
                              </span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-4">
          <div className="card mb-3">
            <div class="card-header" style={{ color: "#00617F" }}>
              <b>History</b>
            </div>
            <ul class="list-group">
              <li className="list-group-item">
                <div className="d-flex justify-content-between">
                  <div class="ms-3">
                    <p class="fw-bold mb-1">Schedule Utama</p>
                    <p class="text-muted mb-0">Code 123123</p>
                  </div>
                  <a class="btn" href="#" role="button">
                    <FaBars size={23} color="#00617F" />
                  </a>
                </div>
              </li>
              <li className="list-group-item">
                <div className="d-flex justify-content-between">
                  <div class="ms-3">
                    <p class="fw-bold mb-1">Schedule Utama</p>
                    <p class="text-muted mb-0">Code 123123</p>
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
  );
};

export default Schedule;

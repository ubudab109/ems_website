import React from "react";

const Third = () => {
  return (
    <div className="col-xl-12">
      <div className="card mb-3">
        <div className="card-body">
          <div className="col-xl-12">
            <div>
              <p>Payroll</p>
              <p style={{ color: "#AAAAAA", fontSize: 12 }}>
                Input Employee Salary
              </p>
            </div>
            <div class="col-xl-6">
              <div class="form-group">
                <label for="name">Payment Date</label>
                <input
                  type="text"
                  class="form-control"
                  id="basicInput"
                  placeholder="Select Date"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card mb-3">
        <div className="card-body">
          <div className="col-xl-12">
            <div className="row">
              <div className="col-xl-4">
                <p>Bank Account</p>
                <p style={{ color: "#AAAAAA", fontSize: 12 }}>
                  The Employee’s Bank Account Is Use For Payroll
                </p>
              </div>
              <div className="row">
                <div class="col-xl-4">
                  <div class="form-group">
                    <label for="name">Bank Name</label>
                    <input type="text" class="form-control" id="basicInput" />
                  </div>
                </div>
                <div class="col-xl-4">
                  <div class="form-group">
                    <label for="name">Account Number</label>
                    <input type="text" class="form-control" id="basicInput" />
                  </div>
                </div>
                <div class="col-xl-12">
                  <div class="form-group">
                    <label for="name">Account Holder Name</label>
                    <input type="text" class="form-control" id="basicInput" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card mb-3">
        <div className="card-body">
          <div className="col-xl-12">
            <div className="row">
              <div className="col-xl-4">
                <p>Salary Income</p>
                <p style={{ color: "#AAAAAA", fontSize: 12 }}>
                  Input Salary Income
                </p>
              </div>
              <div className="row">
                <div class="col-xl-6">
                  <div class="form-group">
                    <label for="name">Basic Salary</label>
                    <input type="text" class="form-control" id="basicInput" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div class="col-xl-6">
                  <div class="form-group">
                    <label for="name">Overtime</label>
                    <input type="text" class="form-control" id="basicInput" />
                  </div>
                </div>
                <div class="col-xl-2">
                  <p className="mt-5">/ Hours</p>
                </div>
              </div>
              <div className="col-xl-3">
                <button className="btn btn-outline-primary">Add New</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card mb-3">
        <div className="card-body">
          <div className="col-xl-12">
            <div className="row">
              <div className="col-xl-4">
                <p>Salary Income</p>
                <p style={{ color: "#AAAAAA", fontSize: 12 }}>
                  Input Salary Income
                </p>
              </div>
              <div className="row">
                <div class="col-xl-6">
                  <div class="form-group">
                    <label for="name">Tax</label>
                    <input type="text" class="form-control" id="basicInput" />
                  </div>
                </div>
              </div>
              <div className="row">
                <div class="col-xl-6">
                  <div class="form-group">
                    <label for="name">BPJS</label>
                    <input type="text" class="form-control" id="basicInput" />
                  </div>
                </div>
              </div>
              <div className="col-xl-3">
                <button className="btn btn-outline-primary">Add New</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card mb-3">
        <div className="card-body">
          <div className="col-xl-12">
            <div className="row">
              <div className="col-xl-4">
                <p>Attendance Cuts</p>
                <p style={{ color: "#AAAAAA", fontSize: 12 }}>
                  Input Other Cuts
                </p>
              </div>
              <div className="row">
                <div class="col-xl-6">
                  <p style={{ color: "#FF1111" }}>Absent</p>
                  <div class="form-group">
                    <label for="name">Day</label>
                    <select
                      class="form-select"
                      aria-label="Default select example"
                    >
                      <option selected>1 Days</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div class="col-xl-6">
                  <div class="form-group">
                    <input type="text" class="form-control" id="basicInput" />
                  </div>
                </div>
              </div>
              <div className="row">
                <p style={{ color: "#FFC900" }}>Late</p>
                <div class="col-xl-6">
                  <div class="form-group">
                    <label for="name">Time</label>
                    <select
                      class="form-select"
                      aria-label="Default select example"
                    >
                      <option selected>15 Minutes</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                </div>
                <div class="col-xl-6">
                  <div class="form-group">
                    <label for="name">Day</label>
                    <select
                      class="form-select"
                      aria-label="Default select example"
                    >
                      <option selected>1 Days</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div class="col-xl-6">
                  <div class="form-group">
                    <input type="text" class="form-control" id="basicInput" placeholder="Rp. " />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card mb-3">
        <div className="card-body">
          <div className="col-xl-12">
            <div className="row">
              <div className="col-xl-4">
                <p>Total Salary</p>
                <p style={{ color: "#AAAAAA", fontSize: 12 }}>
                  Total Employee Salary
                </p>
              </div>
              <div className="row">
                <div class="col-xl-6">
                  <div class="form-group">
                  <label for="name">Basic Salary</label>
                    <input type="text" class="form-control" id="basicInput" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Third;

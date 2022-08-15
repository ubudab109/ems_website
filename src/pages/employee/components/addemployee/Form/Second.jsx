import React from 'react'

const Second = () => {
  return (
    <div className="col-xl-12">
      <div className="card">
        <div className="card-body">
          <div className="row">
              <p>Employment Data</p>
              <p style={{ color: "#AAAAAA", fontSize: 12 }}>
                Fill All Employee Basic Information Data
              </p>
            <div className="col-xl-6">
              <div class="row">
                <div class="col-xl-6">
                  <div class="form-group">
                    <label for="name">Employee ID</label>
                    <input
                      type="text"
                      class="form-control"
                      id="basicInput"
                      placeholder="Employee ID"
                    />
                  </div>
                </div>
                <div class="col-xl-6">
                  <div class="form-group">
                    <label for="basicInput">Job Position</label>
                    <input
                      type="text"
                      class="form-control"
                      id="basicInput"
                      placeholder="Job Position"
                    />
                  </div>
                </div>
                <div class="col-xl-6">
                  <div class="form-group">
                    <label for="basicInput">Employee Status</label>
                    <input
                      type="text"
                      class="form-control"
                      id="basicInput"
                      placeholder="Active (Auto Active)"
                    />
                  </div>
                </div>
                <div class="col-xl-6">
                  <div class="form-group">
                    <label for="basicInput">Job Level</label>
                    <input
                      type="text"
                      class="form-control"
                      id="basicInput"
                      placeholder="Job Level"
                    />
                  </div>
                </div>
                <div className="col-xl-6">
                  <label for="basicInput">Department</label>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                  >
                    <option selected>Select Department</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <div className="col-xl-6">
                  <label for="basicInput">Job Status</label>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                  >
                    <option selected>Select Job Status</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-xl-6">
              <div class="row">          
                <div class="form-group">
                  <label for="exampleInputEmail1">Branch</label>
                  <input
                    type="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Sesuai Branch Yang Ditetapkan"
                  />
                </div>
                <div class="col-xl-6">
                  <div class="form-group">
                    <label for="basicInput">Join Date</label>
                    <input
                      type="text"
                      class="form-control"
                      id="basicInput"
                      placeholder="Select Date"
                    />
                  </div>
                </div>
                <div class="col-xl-6">
                  <div class="form-group">
                    <label for="basicInput">End Status Date</label>
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
        </div>
      </div>
    </div>
  )
}

export default Second
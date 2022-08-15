import React from "react";

const First = () => {
  return (
    <div className="col-xl-12">
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-xl-6">
              <p>Personal Data</p>
              <p style={{ color: "#AAAAAA", fontSize: 12 }}>
                Fill All Employee Basic Information Data
              </p>
              <div class="row">
                <div class="col-xl-6">
                  <div class="form-group">
                    <label for="name">First Name</label>
                    <input
                      type="text"
                      class="form-control"
                      id="basicInput"
                      placeholder="First Name"
                    />
                  </div>
                </div>
                <div class="col-xl-6">
                  <div class="form-group">
                    <label for="basicInput">Last Name</label>
                    <input
                      type="text"
                      class="form-control"
                      id="basicInput"
                      placeholder="Last Name"
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label for="exampleInputEmail1">Email address</label>
                  <input
                    type="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                  />
                  <small id="emailHelp" class="form-text text-muted">
                    This Email Is Use For Login
                  </small>
                </div>
                <div class="col-xl-6">
                  <div class="form-group">
                    <label for="basicInput">Mobile Phone</label>
                    <input
                      type="text"
                      class="form-control"
                      id="basicInput"
                      placeholder="0"
                    />
                  </div>
                </div>
                <div class="col-xl-6">
                  <div class="form-group">
                    <label for="basicInput">Phone</label>
                    <input
                      type="text"
                      class="form-control"
                      id="basicInput"
                      placeholder="0"
                    />
                  </div>
                </div>
                <div class="col-xl-6">
                  <div class="form-group">
                    <label for="basicInput">Places Of Birth</label>
                    <input type="text" class="form-control" id="basicInput" />
                  </div>
                </div>
                <div class="col-xl-6">
                  <div class="form-group">
                    <label for="basicInput">Birthdate</label>
                    <input
                      type="text"
                      class="form-control"
                      id="basicInput"
                      placeholder="Select Date"
                    />
                  </div>
                </div>
                <div class="col-xl-6">
                  <label for="basicInput">Gender</label>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="exampleRadios"
                      id="exampleRadios1"
                      value="option1"
                      checked
                    />
                    <label class="form-check-label" for="exampleRadios1">
                      Male
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="exampleRadios"
                      id="exampleRadios1"
                      value="option1"
                    />
                    <label class="form-check-label" for="exampleRadios1">
                      Female
                    </label>
                  </div>
                </div>
                <div className="col-xl-6">
                  <label for="basicInput">Gender</label>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                  >
                    <option selected>Select Status</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <div className="col-xl-6">
                  <label for="basicInput">Blood Type</label>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                  >
                    <option selected>Select Blood Type</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <div className="col-xl-6">
                  <label for="basicInput">Religion</label>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                  >
                    <option selected>Select Religion</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-xl-6">
              <p>Identity & Adress</p>
              <p style={{ color: "#AAAAAA", fontSize: 12 }}>
                Employee Identity & Address Information
              </p>
              <div class="row">
                <div class="col-xl-6">
                  <div class="form-group">
                    <label for="name">Identity Type</label>
                    <select
                      class="form-select"
                      aria-label="Default select example"
                    >
                      <option selected>Select Type Identity</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                </div>
                <div class="col-xl-6">
                  <div class="form-group">
                    <label for="basicInput">Identity Number</label>
                    <input
                      type="text"
                      class="form-control"
                      id="basicInput"
                      placeholder="0"
                    />
                  </div>
                </div>
                <div class="col-xl-6">
                  <div class="form-group">
                    <label for="basicInput">Identity Expired Date</label>
                    <input
                      type="text"
                      class="form-control"
                      id="basicInput"
                      placeholder="0"
                    />
                    <input
                      class="form-check-input ml-1"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label class="form-check-label ml-4" for="flexCheckDefault">
                      Permanent
                    </label>
                  </div>
                </div>
                <div class="col-xl-6">
                  <div class="form-group">
                    <label for="basicInput">Postal Code</label>
                    <input
                      type="text"
                      class="form-control"
                      id="basicInput"
                      placeholder="0"
                    />
                  </div>
                </div>
                <div className="mb-4">
                <label for="exampleFormControlTextarea1" class="form-label">Citizen ID Address</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
                <div>
                <label for="exampleFormControlTextarea1" class="form-label">Resident Address</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                <input
                      class="form-check-input ml-1"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label class="form-check-label ml-4" for="flexCheckDefault">
                      Permanent
                    </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default First;

import React from 'react'

const Form = () => {
  return (
    <div className="col-xl-9">
          <div className="card">
            <div className="card-body">
            <div className="row">
              <div className="col-xl-4">
                <h3>Personal Data</h3>
              </div>
              <div className="col-xl-8">
              <div className="row">
                <div className="col-xl-10 mb-3">
                  <div className="form-group mb-3">
                    <label for="name" >Full Name</label>
                    <input type="text" className="form-control" id="basicInput" />
                  </div>
                  <div className="form-group">
                    <label for="name">Email</label>
                    <input type="text" className="form-control" id="basicInput" />
                  </div>
                </div>
                <div className="col-xl-5">
                  <div className="form-group">
                    <label for="name">Mobile Phone</label>
                    <input type="text" className="form-control" id="basicInput" />
                  </div>
                </div>
                <div className="col-xl-5 mb-3">
                  <div className="form-group">
                    <label for="name">Phone</label>
                    <input type="text" className="form-control" id="basicInput" />
                  </div>
                </div>
                <div className="col-xl-5">
                  <div className="form-group">
                    <label for="name">Places Of Birth</label>
                    <input type="text" className="form-control" id="basicInput" />
                  </div>
                </div>
                <div className="col-xl-5 mb-3">
                  <div className="form-group">
                    <label for="name">Birthdate</label>
                    <input type="text" className="form-control" id="basicInput" />
                  </div>
                </div>
                <div className="col-xl-5">
                  <div className="form-group">
                    <label for="name">Gender</label>
                    <input type="text" className="form-control" id="basicInput" />
                  </div>
                </div>
                <div className="col-xl-5 mb-3">
                  <div className="form-group">
                    <label for="name">Marital Status</label>
                    <input type="text" className="form-control" id="basicInput" />
                  </div>
                </div>
                <div className="col-xl-5">
                  <div className="form-group">
                    <label for="name">Blood Type</label>
                    <input type="text" className="form-control" id="basicInput" />
                  </div>
                </div>
                <div className="col-xl-5">
                  <div className="form-group">
                    <label for="name">Religion</label>
                    <input type="text" className="form-control" id="basicInput" />
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

export default Form
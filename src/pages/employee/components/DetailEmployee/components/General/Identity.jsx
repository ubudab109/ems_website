import React from 'react'

const Identity = () => {
  return (
    <div className="col-xl-9">
          <div className="card">
            <div className="card-body">
            <div className="row">
              <div className="col-xl-4">
                <h3>Identity & Address</h3>
              </div>
              <div className="col-xl-8">
              <div className="row">
                <div className="col-xl-5">
                  <div className="form-group">
                    <label for="name">Identity Type</label>
                    <input type="text" className="form-control" id="basicInput" />
                  </div>
                </div>
                <div className="col-xl-5 mb-3">
                  <div className="form-group">
                    <label for="name">Identity Number</label>
                    <input type="text" className="form-control" id="basicInput" />
                  </div>
                </div>
                <div className="col-xl-5">
                  <div className="form-group">
                    <label for="name">Identity Expired Date</label>
                    <input type="text" className="form-control" id="basicInput" />
                  </div>
                </div>
                <div className="col-xl-5 mb-3">
                  <div className="form-group">
                    <label for="name">Postal Code</label>
                    <input type="text" className="form-control" id="basicInput" />
                  </div>
                </div>
                <div className="col-xl-12">
                  <div className="form-group">
                    <label for="name">Address</label>
                    <textarea type="text" className="form-control h-100" id="basicInput" />
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

export default Identity
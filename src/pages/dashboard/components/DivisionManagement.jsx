import React from 'react';

const DivisionManagement = () => {
  return (
    <div className="card card-dashboard card-shadow">
      <div className="col-12">
        <h1
          className="text-blue-dark text-left mt-4 mx-4"
          style={{
            fontSize: '20px'
          }}
        >
          Our Division
        </h1>
      </div>
      <div className="row justify-content-around" style={{
        width: '100%'
      }}>

        <div className="col-6 division-wrapper">
          <div className="d-flex flex-wrap">
            <div className="col-2 mt-2">
              <img src={`${process.env.PUBLIC_URL}/assets/img/ecl.png`} alt="" style={{
                width: '85%'
              }} />
            </div>
            <div className="col-10 mt-2">
              HR Department

            </div>
          </div>
        </div>

        <div className="col-6 division-wrapper">
          <div className="d-flex flex-wrap">
            <div className="col-2 mt-2">
              <img src={`${process.env.PUBLIC_URL}/assets/img/ecl.png`} alt="" style={{
                width: '85%'
              }} />
            </div>
            <div className="col-10 mt-2">
              HR Department

            </div>
          </div>
        </div>


      </div>
    </div>
  );
};

export default DivisionManagement;

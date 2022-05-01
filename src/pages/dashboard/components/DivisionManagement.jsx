import React, { useEffect, useState } from 'react';
import DivisionManagementData from './DivisionManagementData';

const DivisionManagement = () => {

  const [dataDivision, setDataDivision] = useState([]);

  const data = () => {
    var data = [];
    for (let index = 0; index < 50; index++) {
      data.push(<DivisionManagementData
        key={index}
        name="HR Division"
        image={`${process.env.PUBLIC_URL}/assets/img/division_dummy.png`}
        total={4 + index}
      />)
    }
    setDataDivision(data);
  }

  useEffect(() => {
    data();
  }, []);

  return (
    <div className="card card-dashboard card-shadow">
      <div className="row justify-content-around" style={{
        width: '100%'
      }}>
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
        <div className="divider-card mt-3 mb-3" style={{ width: '99%' }} />
        <div className="row">
          <div className="scrollbar" style={{
            overflowY: 'scroll',
            height: '486px',
          }}>
            <div className="row justify-content-between">
              {
                dataDivision
              }

            </div>


          </div>
        </div>
      </div>
    </div>
  );
};

export default DivisionManagement;

import React from 'react';

const ScheduleManagement = () => {
  return (
    <div className="card card-dashboard card-shadow">
      <div className="row justify-content-between mt-4" style={{ width: '100%' }}>
        <div className="col-xl-6 col-lg-6 col-md-8">
          <h1
            className="text-blue-dark text-left mx-1"
            style={{
              fontSize: '18px',
              padding: '0px'
            }}
          >
            On Schedule Request

          </h1>
        </div>
        <div className="col-xl-4 col-lg-4 col-md-8">
          <div className="d-flex">
            <div className="col-3 text-center mr-5" style={{
              color: '#00617F',
              border: '2px solid #00617F',
              boxSizing: 'border-box',
              borderRadius: '5px'
            }}>
              03
            </div>
            <div className="select">
              <select defaultValue={""}>
                <option value="">OAll</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
          </div>
        </div>
        <div className="row justify-content-around ml-2">
          <div className="divider-card mt-3 mb-3" />
          <div className="scrollbar" style={{
            overflowY: 'scroll',
            height: '486px',
          }}>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleManagement;

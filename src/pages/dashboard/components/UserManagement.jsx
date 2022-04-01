import React, { useEffect, useState } from 'react';
import UserManagementData from './UserManagementData';

const UserManagament = () => {
  const [dataUser, setDataUser] = useState([]);

  const data = () => {
    var data = [];
    for (let index = 0; index < 50; index++) {
      data.push(<UserManagementData
        key={index}
        avatar={`${process.env.PUBLIC_URL}/assets/img/ecl.png`}
        name={`Steve Rogers ${index}`}
        idNumber="432423"
        role="Manager"
        status={index % 2 === 0 ? 1 : 0}
      />)
    }
    setDataUser(data);
  }

  useEffect(() => {
    data();
  },[]);

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
            Users Management
          </h1>
        </div>
        <div className="col-xl-4 col-lg-4 col-md-8">
          <div className="select">
            <select defaultValue={""}>
              <option value="">OAll</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
        </div>
        <div className="row justify-content-around ml-2">
          <div className="divider-card mt-3" />
          <div className="scrollbar" style={{
            overflowY: 'scroll',
            height: '486px',
          }}>
            {
              dataUser
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagament;

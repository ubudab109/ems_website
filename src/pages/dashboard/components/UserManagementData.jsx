import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const UserManagementData = ({
  avatar,
  name,
  role,
  idNumber,
  status
}) => {
  return (
    <Fragment>
      <div className="row pt-3">
        <div className="col-2 mt-2">
          <img src={avatar} alt="" style={{
            width: '85%'
          }} />
        </div>
        <div className="col-6">
          <div className="col-12 text-left mt-1">
            <ul className="ul-db">
              <li className="text-um" style={{ fontSize: '18px', fontWeight: '600' }}>{name}</li>
              <li className="text-um text-muted" style={{ fontSize: '12px' }}>{role}</li>
            </ul>
          </div>
        </div>
        <div className="col-4 text-right align-self-center">
          <span 
            className={`badge ${status === 1 ? 'badge-online' : 'badge-offline' }`}
          >
            {`${status === 1 ? 'Online' : 'Offline'}`}
          </span>
        </div>
      </div>
      <hr />
    </Fragment>
  );
};

UserManagementData.propTypes = {
  avatar : PropTypes.string,
  name : PropTypes.string,
  role : PropTypes.string,
  idNumber : PropTypes.string,
  status : PropTypes.number,
}

UserManagementData.defaulProps = {
  avatar : '',
  name : '',
  role : '',
  idNumber : '',
  status : 0,
}

export default UserManagementData;

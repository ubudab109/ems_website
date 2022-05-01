import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const DetailAttendance = ({
  avatar,
  employeeName,
  role,
  division,
  nip,
  absentBadge,
  absentColor,
  absentStatus,
  workplaceBadge,
  workplaceColor,
  workplaceName,
  shiftTime,
  // clockStatus,
  // workPlaces,
  // shifTime,
  // clockIn,
  // clockOut,
  // locationClockIn,
  // locationClockOut
}) => {
  return (
    <Fragment>
      <div className="d-flex mb-3">
        <div className="col-xl-1 col-lg-2 col-md-3 col-sm-4" style={{ marginRight: '33px' }}>
          <img src={avatar} alt="" className="circle-image" />
        </div>
        <div className="col-xl-8 col-lg-7 col-md-8 col-sm-6 align-self-center">
          <div className="col-12 text-left mb-2">
            <h3 className="text-bold">{employeeName}</h3>
          </div>
          <div className="col-12 text-left mb-2">
            <span className="text-bold">{role}{' '}
              /
              <span className="text-black">
                {' '}{division}
              </span>
            </span>
          </div>
          <div className="col-12 text-black text-left mt-2 mb-2">
            ID : {nip}
          </div>
          <div className="col-12">
            <div className="row">
              <div className="col-xl-2 col-lg-3 col-md-6 col-sm-8">
                <span className="badge badge-radius" style={{
                  background: absentBadge,
                  color: absentColor,
                  marginRight: '24px',
                }}>
                  {absentStatus}
                </span>
              </div>
              {
                absentStatus !== 'Absent' ?
                <div className="col-xl-2 col-lg-3 col-md-6 col-sm-8">
                  <span className="badge badge-radius" style={{
                    background: workplaceBadge,
                    color: workplaceColor
                  }}>
                    {workplaceName}
                  </span>
                </div> : null
              }
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 text-left">
        <div className="col text-blue-dark mb-1">
          Shift Time : 
        </div>
        <div className="col">
          <button className="btn btn-border-blue">{shiftTime}</button>
        </div>
      </div>
      <div className="d-flex flex-wrap mt-3">
        <div className="col-6">
              
        </div>
        <div className="col-6">

        </div>
      </div>
    </Fragment>
  );
};

DetailAttendance.propTypes = {
  avatar: PropTypes.string,
  employeeName: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  division: PropTypes.string.isRequired,
  absentBadge: PropTypes.string,
  absentColor: PropTypes.string,
  absentStatus: PropTypes.string,
  workplaceBadge: PropTypes.string,
  workplaceColor: PropTypes.string,
  workplaceName: PropTypes.string,
  shiftTime: PropTypes.string,
};

DetailAttendance.defaultProps = {
  avatar: '',
  absentBadge: '',
  absentColor: '',
  absentStatus: '',
  workplaceBadge: '',
  workplaceColor: '',
  workplaceName: '',
  shiftTime: '',
};

export default DetailAttendance;
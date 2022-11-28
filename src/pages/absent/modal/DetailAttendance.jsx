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
  attendanceLocation,
  clockIn,
  clockOut,
  isError,
  errorMesages,
}) => {
  return (
    <Fragment>
      {
        isError ?
          <div className="col-12">
            {errorMesages}
          </div>
          :
          <>
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
              {
                attendanceLocation.map((e, i) => {
                  let clockType, timeClock;
                  if (e.clock_type === '1') {
                    clockType = 'Clock Out';
                    timeClock = clockOut;
                  } else {
                    clockType = 'Clock In';
                    timeClock = clockIn;
                  }
                  return (
                    <div className="col-xl-6 col-md-12" key={i}>
                      <div className="post-container">
                        {
                          e.files !== null ?
                            <div className="post-thumb"><img src={e.files.files} alt="" width={200} /></div>
                            : null
                        }
                        <div className={e.files !== null ? 'post-content' : 'post-content-no-image'} >
                          <h5 className="post-title text-blue-dark">{clockType} : {timeClock}</h5>
                          <p className="text-black text-left">{e.location}</p></div>
                      </div>
                    </div>
                  );
                })
              }
            </div>
          </>
      }
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
  attendanceLocation: PropTypes.array,
  clockIn: PropTypes.string,
  clockOut: PropTypes.string,
  isError: PropTypes.bool,
  errorMesages: PropTypes.string,
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
  clockIn: 'On Duty',
  clockOut: 'On Duty',
  attendanceLocation: [],
  isError: false,
  errorMesages: '',
};

export default DetailAttendance;
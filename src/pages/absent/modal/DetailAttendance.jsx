import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { formatingTime } from "../../../utils/helper";

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
      {isError ? (
        <div className="col-12">{errorMesages}</div>
      ) : (
        <>
          <div className="col-md-12 text-center mb-3">
            <img src={avatar} alt="" className="circle-image" />
            <h3 className="text-blue-dark">{employeeName}</h3>
            <span className="text-bold">
              {role} /<span className="text-black"> {division}</span>
            </span>
            <br />
            <span className="text-bold mb-5">ID : {nip}</span>
            <div className="row justify-content-center mb-2 mt-3">
              <div className="col-xl-2 col-lg-3 col-md-6 col-sm-8 mb-2">
                <span
                  className="badge badge-radius"
                  style={{
                    background: absentBadge,
                    color: absentColor,
                    marginRight: "24px",
                  }}
                >
                  {absentStatus}
                </span>
              </div>
              {absentStatus !== "Absent" ? (
                <div className="col-xl-2 col-lg-3 col-md-6 col-sm-8">
                  <span
                    className="badge badge-radius"
                    style={{
                      background: workplaceBadge,
                      color: workplaceColor,
                    }}
                  >
                    {workplaceName}
                  </span>
                </div>
              ) : null}
            </div>
          </div>
          <div className="col-12 text-center mt-2 mb-5">
            <div className="col text-blue-dark mb-1">Shift Time :</div>
            <div className="col">
              <button className="btn btn-border-blue">{shiftTime}</button>
            </div>
          </div>
          <div className="col-12 text-center mt-2 mb-5">
            <span className="text-blue-dark mb-1 mx-5">Clock In : {formatingTime(clockIn)}</span>
            <span className="text-blue-dark mb-1">Clock Out : {clockOut !== null ? formatingTime(clockIn) : '-'}</span>
          </div>
          <div className="d-flex justify-content-center flex-wrap mt-3">
            {workplaceName === "Remote" ? (
              attendanceLocation.map((e, i) => {
                let clockType, timeClock;
                if (e.clock_type === "1") {
                  clockType = "Clock Out";
                  timeClock = clockOut;
                } else {
                  clockType = "Clock In";
                  timeClock = clockIn;
                }
                return (
                  <div className="col-xl-6 col-md-12 mb-3" key={i}>
                    <div className="post-container">
                      {e.files !== null ? (
                        <div className="text-center">
                          <img
                            src={e.files.files}
                            alt=""
                            width={300}
                            className="img-circle"
                          />
                        </div>
                      ) : null}
                      <div
                        className={
                          e.files !== null
                            ? "text-center mt-2"
                            : "post-content-no-image"
                        }
                      >
                        <h5 className="text-blue-dark">
                          {clockType} :{" "}
                          {timeClock !== null ? formatingTime(timeClock) : ""}
                        </h5>
                        <span className="text-black text-left">
                          {e.location}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <Fragment>
                <div className="col-xl-6 col-md-12 mb-3">
                  <div className="post-container">
                    <div
                      className="post-content-no-image"
                    >
                      <h5 className="text-blue-dark">
                        Clock In :{" "}
                        {clockIn !== null ? formatingTime(clockIn) : ""}
                      </h5>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6 col-md-12 mb-3">
                  <div className="post-container">
                    <div
                      className="post-content-no-image"
                    >
                      <h5 className="text-blue-dark">
                        Clock Out :{" "}
                        {clockOut !== null ? formatingTime(clockOut) : ""}
                      </h5>
                    </div>
                  </div>
                </div>
              </Fragment>
            )}
          </div>
        </>
      )}
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
  avatar: "",
  absentBadge: "",
  absentColor: "",
  absentStatus: "",
  workplaceBadge: "",
  workplaceColor: "",
  workplaceName: "",
  shiftTime: "",
  clockIn: "On Duty",
  clockOut: "On Duty",
  attendanceLocation: [],
  isError: false,
  errorMesages: "",
};

export default DetailAttendance;

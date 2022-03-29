import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const EmployeeHoliday = ({ 
  image, badgeClass, employeeName, statusLeave, 
}) => {
  return (
    <Fragment>
      <div className="row justify-content-stretch">
        <div className="col-xl-2 col-lg-2 col-md-9 col-sm-12" style={{
          marginLeft: '11px',
        }}>
          <img
            className="img-circle"
            src={image}
            alt=""
            width={55}
          />
        </div>
        <div className="col-xl-8 col-lg-8 col-md-9 col-sm-12" style={{
          marginLeft : '21px'
        }}>
          <h4 className="text-bold font-14">{employeeName}</h4>
          <span className={`badge ${badgeClass}`}>{statusLeave}</span>
        </div>
      </div>
      <div className="divider-wrapper-calendar">
        <hr className="divider-gray" />
      </div>
    </Fragment>
  );
};

EmployeeHoliday.propTypes = {
  image : PropTypes.string.isRequired,
  badgeClass: PropTypes.string.isRequired,
  employeeName: PropTypes.string.isRequired,
  statusLeave: PropTypes.string.isRequired,
};

export default EmployeeHoliday;

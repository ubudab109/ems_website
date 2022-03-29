import React from 'react';
import PropTypes from 'prop-types';
import Calendar from 'react-calendar';

const CalendarDashboard = ({ 
  onChangeDate, date, onActiveStartDate, month, year,
}) => {
  return (
    <div className="card card-shadow">
      <div className="row justify-content-between px-3" style={{
        paddingTop: '10px'
      }}>
        <div className="col-xl-4 col-lg-8 col-md-9 col-sm-12">
          <span className="text-blue-dark">Calendar</span>
        </div>
        <div className="col-xl-3 col-lg-4 col-md-3 col-sm-12">
          <button className="btn-rounded-border-blue">{month} {year}</button>
        </div>
      </div>
      <div className="divider-wrapper-calendar">
        <hr className="divider-gray" />
      </div>
      <div className="card-body">
        <Calendar
          onChange={onChangeDate}
          value={date}
          onActiveStartDateChange={onActiveStartDate}
          showNeighboringMonth={false}
        />

        <div className="col-12 text-center">
          <p>Hari Ulang Tahun</p>
        </div>

      </div>
    </div>
  );
};

CalendarDashboard.propTypes = {
  onChangeDate : PropTypes.func,
  date : PropTypes.instanceOf(Date),
  onActiveStartDate: PropTypes.func,
  month: PropTypes.string,
  year: PropTypes.string
};

export default CalendarDashboard;

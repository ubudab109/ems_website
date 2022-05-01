import React from 'react';
import PropTypes from 'prop-types';
import Calendar from 'react-calendar';

const CalendarDashboard = ({
  onChangeDate, date, onActiveStartDate, holiday, customContent, yearChange
}) => {
  return (
    <div className="card card-dashboard card-shadow">
      <div className="d-flex flex-wrap justify-content-around" style={{
        width: '100%'
      }}>

        <div className="col-12">
          <h1 className="text-blue-dark text-left mt-4 mx-4" style={{
            fontSize: '20px'
          }}>
            Calendar
          </h1>
        </div>

      </div>

      <div className="card-body" style={{
        width: '100%'
      }}>
        <Calendar
          onChange={onChangeDate}
          value={date}
          onActiveStartDateChange={onActiveStartDate}
          showNeighboringMonth={false}
          locale="id-ID"
          tileClassName={customContent}
          onClickYear={yearChange}
        />

        <div className="row justify-content-center mt-3">
          <div className="col-12 text-center" style={{
            'border': '1px solid #00617F',
            boxSizing: 'border-box',
            borderRadius: '5px'
          }}>
            {holiday}
          </div>
        </div>

      </div>
    </div>
  );
};

CalendarDashboard.propTypes = {
  onChangeDate: PropTypes.func,
  date: PropTypes.instanceOf(Date),
  onActiveStartDate: PropTypes.func,
  month: PropTypes.string,
  year: PropTypes.string,
  holiday: PropTypes.string,
  isOpenDatePicker: PropTypes.bool,
  onClickYear: PropTypes.func,
};

CalendarDashboard.defaultProps = {
  isOpenDatePicker: false,
}

export default CalendarDashboard;

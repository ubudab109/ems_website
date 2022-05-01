import React, { Fragment } from 'react';
import DatePicker from 'react-multi-date-picker';
import PropTypes from 'prop-types';

const DateButtonPicker = React.forwardRef(({ dateText, handleChangeDate }, ref) => {
  return (
    <Fragment>
      <button
        className="btn-dark-blue"
        onClick={() => {
          ref.current.openCalendar();
        }}
        style={{
          height: '39px'
        }}>
        {dateText}
      </button>
      <DatePicker
        style={{
          visibility: 'hidden'
        }}
        ref={ref}
        onChange={handleChangeDate}
      >
        <button
          className="btn btn-secondary"
          style={{ margin: "5px" }}
          onClick={() => ref.current.closeCalendar()}
        >
          Close
        </button>
      </DatePicker>
    </Fragment>
  );
});

DateButtonPicker.propTypes = {
  dateText: PropTypes.string.isRequired,
  handleChangeDate: PropTypes.func
};


export default DateButtonPicker;

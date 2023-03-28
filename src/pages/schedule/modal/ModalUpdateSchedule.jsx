import React, { Fragment } from "react";
import PropTypes from "prop-types";

const ModalUpdateSchedule = ({ name, clockIn, clockOut, onChangeInput, isEditAllowed, }) => (
  <Fragment>
    <div className="col-12">
      <div className="form-group">
        <label htmlFor="name" className="text-blue-dark">
          Schedule Name
        </label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={onChangeInput}
          disabled={!isEditAllowed}
          id="name"
          className="form-control input-border-grey"
        />
      </div>
      <div className="row mt-2">
        <div className="col-6">
          <div className="form-group">
            <label htmlFor="clock_in" className="text-blue-dark">
              Clock In
            </label>
            <input
              type="time"
              name="clock_in"
              value={clockIn}
              onChange={onChangeInput}
              disabled={!isEditAllowed}
              id="clock_in"
              className="form-control input-border-grey"
            />
          </div>
        </div>
        <div className="col-6">
          <div className="form-group">
            <label htmlFor="clock_out" className="text-blue-dark">
              Clock Out
            </label>
            <input
              type="time"
              name="clock_out"
              value={clockOut}
              disabled={!isEditAllowed}
              onChange={onChangeInput}
              id="clock_out"
              className="form-control input-border-grey"
            />
          </div>
        </div>
      </div>
    </div>
  </Fragment>
);

ModalUpdateSchedule.propTypes = {
  name: PropTypes.string,
  clockIn: PropTypes.string,
  clockOut: PropTypes.string,
  onChangeInput: PropTypes.func,
  isEditAllowed: PropTypes.bool,
};

ModalUpdateSchedule.defaultProps = {
  name: '',
  clockIn: '',
  clockOut: '',
  isEditAllowed: true,
};

export default ModalUpdateSchedule;

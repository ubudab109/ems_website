import React from "react";
import PropTypes from "prop-types";
import MapGoogle from "../../../component/GoogleMap";
import { Fragment } from "react";

const ModalCreateSchedule = ({
  name,
  clockIn,
  clockOut,
  onChangeInput,
}) => {
  return (
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
                onChange={onChangeInput}
                id="clock_out"
                className="form-control input-border-grey"
              />
            </div>
          </div>
        </div>
        <div className="col-12 mt-2">
          <label htmlFor="" className="text-blue-dark">
            Branch Address
          </label>
          <br />
          <span className="text-red">
            This is the address point of the company's current branch <span className="text-bold">(LOOK AT THE RED MARKER)</span> . If this
            is a mistake, please contact the administrator immediately to correct
            this address point.
          </span>
          <MapGoogle />
        </div>
      </div>
    </Fragment>
  );
};

ModalCreateSchedule.propTypes = {
  name: PropTypes.string,
  clockIn: PropTypes.string,
  clockOut: PropTypes.string,
  onChangeInput: PropTypes.func,
};

ModalCreateSchedule.defaultProps = {
  name: '',
  clockIn: '',
  clockOut: '',
};

export default ModalCreateSchedule;

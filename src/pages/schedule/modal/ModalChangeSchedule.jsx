import React, { Fragment } from "react";
import PropTypes from "prop-types";

const ModalChangeSchedule = ({
  dataSchedule,
  onChangeSchedule,
  selectedSchedule,
}) => (
  <Fragment>
    <div className="col-12">
      {dataSchedule.map((val, key) => (
        <div className="form-group col-md-12" key={key}>
          <div className="form-check form-check-inline">
            <input
              onChange={onChangeSchedule}
              checked={val.id === parseInt(selectedSchedule)}
              value={val.id}
              className="form-check-input"
              type="radio"
              name="schedule"
              id={val.id}
            />
            <label className="form-check-label" htmlFor={val.id}>
              {val.name}
            </label>
          </div>
        </div>
      ))}
    </div>
  </Fragment>
);

ModalChangeSchedule.propTypes = {
  dataSchedule: PropTypes.array.isRequired,
};

export default ModalChangeSchedule;

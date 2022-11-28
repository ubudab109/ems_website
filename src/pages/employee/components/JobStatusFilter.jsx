import React, { Fragment } from "react";
import PropTypes from "prop-types";

const JobStatusFilter = ({ jobStatusName, isActive, onClick }) => (
  <Fragment>
    <div
      onClick={onClick}
      className={ isActive ? 'bg-grey d-flex flex-wrap justify-content-between cursor-pointer' : 'd-flex flex-wrap justify-content-between cursor-pointer'}
    >
      <div
        className={isActive ? "bg-grey col-10 pl-20 pt-2" : "col-10 pl-20 pt-2"}
      >
        <p>{jobStatusName}</p>
      </div>
      <div className="divider-card-black"></div>
    </div>
  </Fragment>
);

JobStatusFilter.propTypes = {
  jobStatusName: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
};

export default JobStatusFilter;

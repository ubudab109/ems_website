import React, { Fragment } from "react";
import PropTypes from "prop-types";

const ProgressBar = ({
  bgcolor,
  progress,
  height,
  label,
  total,
  marginBottom,
}) => {
  const widthProgress = (progress / total) * 100;
  const Parentdiv = {
    height: height,
    width: "100%",
    backgroundColor: "whitesmoke",
    marginBottom: marginBottom,
    borderRadius: "5px",
  };

  const Childdiv = {
    height: "100%",
    width: `${widthProgress + "%"}`,
    backgroundColor: bgcolor,
    borderBottomLeftRadius: "5px",
    transition: "width 3s ease-in-out",
    borderTopLeftRadius: "5px",
    borderTopRightRadius: `${progress === total ? "5px" : "0px"}`,
    borderBottomRightRadius: `${progress === total ? "5px" : "0px"}`,
  };

  const progresstext = {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "14px",
    color: "#00617F",
    textAlign: "right",
  };

  return (
    <Fragment>
      <div className="d-flex flex-wrap justify-content-between">
        <span style={progresstext}>{label}</span>
        <span style={progresstext}>
          {progress}/{total}
        </span>
      </div>
      <div style={Parentdiv} className="mb-3">
        <div style={Childdiv}></div>
      </div>
    </Fragment>
  );
};

ProgressBar.propTypes = {
  bgcolor: PropTypes.string,
  progress: PropTypes.any,
  height: PropTypes.any,
  label: PropTypes.string,
  total: PropTypes.any,
  marginBottom: PropTypes.any,
};

export default ProgressBar;

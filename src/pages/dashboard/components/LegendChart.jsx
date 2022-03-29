import React from 'react';
import PropTypes from 'prop-types';

const LegendChart = ({ maleTotal, femaleTotal }) => {
  return (
    <div className="row justify-content-end" style={{
      marginBottom : '11px'
    }}>
      <div className="col-xl-7 col-lg-12 col-md-12 col-sm-10">
        <div className="d-flex">
          <div
            className="col-1"
            style={{
              paddingTop: '4px',
              width: '6%',
            }}
          >
            <img
              src={`${process.env.PUBLIC_URL}/assets/img/blue_label.png`}
              alt=""
              style={{
                height: '38px'
              }}
            />
          </div>
          <div
            className="col-8"
            style={{
              paddingLeft: '13px'
            }}
          >
            <span className="text-muted-span">Male</span>
            <p className="text-blue-dark">{maleTotal}</p>
          </div>
        </div>
      </div>
      <div className="col-xl-4 col-lg-12 col-md-12 col-sm-10">
        <div className="d-flex">
          <div
            className="col-1"
            style={{
              paddingTop: '4px',
              width: '6%',
            }}
          >
            <img
              src={`${process.env.PUBLIC_URL}/assets/img/orange_label.png`}
              alt=""
              style={{
                height: '38px'
              }}
            />
          </div>
          <div
            className="col-12"
            style={{
              paddingLeft: '13px'
            }}
          >
            <span className="text-muted-span">Female</span>
            <p className="text-blue-dark">{femaleTotal}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

LegendChart.propTypes = {
  maleTotal: PropTypes.any,
  femaleTotal: PropTypes.any,
};

LegendChart.defaultProps = {
  maleTotal: '0',
  femaleTotal: '0',
}

export default LegendChart;

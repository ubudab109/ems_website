import React from 'react';
import PropTypes from 'prop-types';

const LegendThreeChart = ({ 
  dataOneIcon,
  dataTwoIcon,
  dataThreeIcon,
  dataOneLabel,
  dataTwoLabel,
  dataThreeLabel,
  dataOne, 
  dataTwo,
  dataThree,
}) => {
  return (
    <div className="row justify-content-center" style={{
      marginBottom : '11px',
      paddingLeft: '15'
    }}>
      <div className="col-5">
        <div className="d-flex">
          <div
            className="col-10"
            style={{
              paddingTop: '4px',
              width: '6%',
            }}
          >
            <img
              src={dataOneIcon}
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
            <span className="text-muted-span">{dataOneLabel}</span>
            <p className="text-blue-dark">{dataOne}</p>
          </div>
        </div>
      </div>
      <div className="col-4">
        <div className="d-flex">
          <div
            className="col-1"
            style={{
              paddingTop: '4px',
              width: '6%',
            }}
          >
            <img
              src={dataTwoIcon}
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
            <span className="text-muted-span">{dataTwoLabel}</span>
            <p className="text-blue-dark">{dataTwo}</p>
          </div>
        </div>
      </div>
      <div className="col-3">
        <div className="d-flex">
          <div
            className="col-1"
            style={{
              paddingTop: '4px',
              width: '6%',
            }}
          >
            <img
              src={dataThreeIcon}
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
            <span className="text-muted-span">{dataThreeLabel}</span>
            <p className="text-blue-dark">{dataThree}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

LegendThreeChart.propTypes = {
  dataOneIcon: PropTypes.string,
  dataTwoIcon: PropTypes.string,
  dataThreeIcon: PropTypes.string,
  dataOneLabel: PropTypes.any,
  dataTwoLabel: PropTypes.any,
  dataThreeLabel: PropTypes.any,
  dataOne: PropTypes.any,
  dataTwo: PropTypes.any,
  dataThree: PropTypes.any,
};

LegendThreeChart.defaultProps = {
  dataOneIcon: '',
  dataTwoIcon: '',
  dataThreeIcon: '',
  dataOneLabel: '',
  dataTwoLabel: '',
  dataThreeLabel: '',
  dataOne: '0',
  dataTwo: '0',
  dataThree: '0',
}

export default LegendThreeChart;

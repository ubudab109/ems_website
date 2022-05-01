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
    <div className="row justify-content-end" style={{
      marginTop: '27px',
      paddingLeft: 'auto',
      width: '100%'
    }}>
      <div className="col-4">
        <div className="d-flex">
          <div
            className="col-10"
            style={{
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
            style={{
              paddingLeft: '13px',
            }}
          >
            <span className="text-muted-span span-block">{dataOneLabel}</span>
            <span className="text-blue-dark span-block">{dataOne}</span>
          </div>
        </div>
      </div>
      <div className="col-4">
        <div className="d-flex">
          <div
            className="col-1"
            style={{
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
            style={{
              paddingLeft: '13px'
            }}
          >
            <span className="text-muted-span span-block">{dataTwoLabel}</span>
            <span className="text-blue-dark span-block">{dataTwo}</span>
          </div>
        </div>
      </div>
      <div className="col-4">
        <div className="d-flex">
          <div
            className="col-1"
            style={{
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
            style={{
              paddingLeft: '13px'
            }}
          >
            <span className="text-muted-span span-block">{dataThreeLabel}</span>
            <span className="text-blue-dark span-block">{dataThree}</span>
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

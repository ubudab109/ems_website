import React from 'react';
import PropTypes from 'prop-types';

const LegendChart = ({ 
  dataOneIcon,
  dataTwoIcon,
  dataOneLabel,
  dataTwoLabel,
  dataOne, 
  dataTwo,
}) => {
  return (
    <div className="row justify-content-end">
      <div className="col-6">
        <div className="d-flex">
          <div
            className="col-12"
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
            className="col-12"
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
    </div>
  );
};

LegendChart.propTypes = {
  dataOneIcon: PropTypes.string ,
  dataTwoIcon: PropTypes.string,
  dataOneLabel: PropTypes.any,
  dataTwoLabel: PropTypes.any,
  dataOne: PropTypes.any,
  dataTwo: PropTypes.any,
};

LegendChart.defaultProps = {
  dataOneIcon: '',
  dataTwoIcon: '',
  dataOneLabel: '',
  dataTwoLabel: '',
  dataOne: '0',
  dataTwo: '0',
}

export default LegendChart;

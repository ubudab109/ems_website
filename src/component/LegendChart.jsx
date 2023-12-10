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
    <div className="box mt-5" style={{width: '100%'}}>
      <div className="col-12 mb-5">
        <div className="d-flex">
          <div
            className="col-12"
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
              paddingLeft: '13px'
            }}
          >
            <span className="text-muted-span span-block">{dataOneLabel}</span>
            <span className="text-blue-dark span-block">{dataOne}</span>
          </div>
        </div>
      </div>
      <div className="col-12 ">
        <div className="d-flex">
          <div
            className="col-12"
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

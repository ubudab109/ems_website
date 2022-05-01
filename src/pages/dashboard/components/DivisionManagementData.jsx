import React from 'react';
import PropTypes from 'prop-types';

const DivisionManagementData = ({ 
  image,
  name,
  total,
}) => {
  return (
    <div className="col-5-4 division-wrapper p-1 mr-2 mb-3">
      <div className="d-flex flex-wrap">
        <div className="col-3 mt-2">
          <img src={image} alt="" style={{
            width: '85%'
          }} />
        </div>
        <div className="col-9 mt-2">
          <span className="text-blue-dark" style={{
            fontSize: '14px',
            lineHeight: '2px'
          }}>{name}</span>
          <div className="divider-card-child mb-1" />
          <span>Total : {total}</span>
        </div>
      </div>
    </div>
  );
};

DivisionManagementData.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string.isRequired,
  total: PropTypes.number
};

DivisionManagementData.defaultProps = {
  image: '',
  total: 0,
};


export default DivisionManagementData;

import React from 'react';
import PropTypes from 'prop-types';

const CardShadow = ({ children, title }) => {
  return (
    <div className="card card-dashboard card-shadow">
      <div className="col-12">
        <h1
          className="text-blue-dark text-left mt-4 mx-4"
          style={{
            fontSize: '20px'
          }}
        >
          {title}
        </h1>
      </div>
      <div className="card-body" style={{
        width: '100%'
      }}>
        {children}
      </div>
    </div>
  );
};

CardShadow.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

CardShadow.defaultProps = {
  title: '',
};

export default CardShadow;

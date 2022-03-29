import React from 'react';
import PropTypes from 'prop-types';

const CardShadow = ({ children }) => {
  return (
    <div className="card card-shadow">
      <div className="card-body">
        {children}
      </div>
    </div>
  );
};

CardShadow.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CardShadow;

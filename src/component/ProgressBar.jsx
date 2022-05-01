import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ProgressBar = ({ 
  bgcolor, 
  progress, 
  height, 
  total, 
  isLoaded, 
  marginBottom,
}) => {
  const widthProgress = (progress / total) * 100;
  const Parentdiv = {
    height: height,
    width: '100%',
    backgroundColor: 'whitesmoke',
    marginBottom: marginBottom,
    borderRadius: '5px',
  }

  const Childdiv = {
    height: '100%',
    width: `${isLoaded ? widthProgress+'%' : 0+'%'}`,
    backgroundColor: bgcolor,
    borderBottomLeftRadius: '5px',
    transition: 'width 3s ease-in-out',
    borderTopLeftRadius: '5px',
    borderTopRightRadius: `${progress === total ? '5px' : '0px'}`,
    borderBottomRightRadius: `${progress === total ? '5px' : '0px'}`,
  }

  const progresstext = {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: '14px',
    color: '#00617F',
    textAlign: 'right',
  }

  return (
    <Fragment>
      <div className="col-12 text-right">

        <span style={progresstext}>{progress}/{total}</span>
      </div>
      <div style={Parentdiv}>
        <div style={Childdiv}>
        </div>
      </div>
    </Fragment>
  )
};

export default ProgressBar;

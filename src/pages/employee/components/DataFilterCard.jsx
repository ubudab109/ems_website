import React from "react";
import PropTypes from 'prop-types';
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DataFilterCard = ({ 
  icon, 
  dataName,
}) => {
  return (
    <div
      className="d-flex flex-wrap justify-content-between"
      style={{
        padding: '0px 24px 0px 17px',
        cursor: 'pointer',
        marginBottom: '6px'
      }}
    >
      <span
        className="text-dark filter-hover"
        style={{
          display: 'inline-block',
          top: '0',
          paddingTop: '12px',
          paddingLeft: '9px',
          width: '90%'
        }}>
        <img
          src={icon}
          alt=""
          style={{
            marginRight: '8px',
            paddingBottom: '5px',
          }}
        />
        {dataName}
      </span>
      <FontAwesomeIcon
        icon={faBars}
        style={{
          color: '#00617F',
          fontSize: '21px',
          top: '0',
          right: '23px',
          cursor: 'pointer',
          paddingTop: '12px',
        }}
      />
    </div>
  );
};

DataFilterCard.propTypes = {
  icon: PropTypes.string.isRequired,
  dataName: PropTypes.string.isRequired,
};

export default DataFilterCard;

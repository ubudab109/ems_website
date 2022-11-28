import React from "react";
import PropTypes from 'prop-types';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const HeaderEmployeeCard = ({ filterName, onClick }) => (
  <div
    className="d-flex flex-wrap justify-content-between"
    style={{
      padding: '20px 20px 4px 20px'
    }}
  >
    <span
      className="text-blue-dark"
      style={{
        display: 'inline-block',
        position: 'absolute',
        top: '0',
        marginTop: '10px',
      }}>
      {filterName}
    </span>
    <FontAwesomeIcon
      icon={faPlus}
      style={{
        color: '#00617F',
        fontSize: '21px',
        position: 'absolute',
        top: '0',
        right: '29px',
        marginTop: '11px',
        cursor: 'pointer',
      }}
      onClick={onClick}
    />
    <div className="divider-card" style={{ marginTop: '16px' }} />
  </div>
);

HeaderEmployeeCard.propTypes = {
  filterName: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default HeaderEmployeeCard;


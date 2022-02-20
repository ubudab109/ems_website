import React, { Fragment } from "react";
import PropTypes from 'prop-types';
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const UsePagination = ({
  goToNextPage, goToPreviousPage, changePage, pageLimit, currentPage
}) => {

  const getPaginationGroup = () => {
    const start = Math.floor((currentPage - 1) / pageLimit);
    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
  };

  return (
    <Fragment>
      <button className="btn-square-blue" onClick={goToPreviousPage} disabled={currentPage === 1 ? true : false} style={{
          marginRight : '7px',
        }}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      {getPaginationGroup().map((item, index) => (
        <button key={index} className={`${currentPage === item ? 'btn-square-blue' : 'btn-square-border-blue'}`} onClick={changePage} style={{
          marginRight : '7px',
        }}>
          {item}
        </button>
      ))}
      <button className="btn-square-blue" onClick={goToNextPage} disabled={currentPage === pageLimit ? true : false}>
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </Fragment>
  )
}

UsePagination.propTypes = {
  goToNextPage: PropTypes.func,
  goToPreviousPage: PropTypes.func,
  changePage: PropTypes.func,
  pageLimit: PropTypes.number,
  currentPage: PropTypes.number,
}

export default UsePagination;
import React, { Fragment, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const getNumberOfPages = (rowCount, rowsPerPage) => {
  return Math.ceil(rowCount / rowsPerPage);
}

const toPages = (pages) => {
  const results = [];

  for (let i = 1; i < pages; i++) {
    results.push(i);
  }

  return results;
}


const UsePagination = ({
  currentPage,
  rowsPerPage,
  rowCount,
  onChangePage,
  onChangeRowsPerPage, // available but not used here
}) => {

  const [pageLimit, setPageLimit] = useState(0);
  const handleBackButtonClick = () => {
    onChangePage(currentPage - 1);
  };

  const handleNextButtonClick = () => {
    onChangePage(currentPage + 1);
  };

  const handlePageNumber = (e) => {
    onChangePage(Number(e.target.value));
  };

  const pages = getNumberOfPages(rowCount, rowsPerPage);
  const pageItems = toPages(pages);
  const nextDisabled = currentPage === pageItems.length;
  const previosDisabled = currentPage === 1;

  useEffect(() => {
   const limit = pageItems.length > 10 ? 10 : pageItems.length;
   setPageLimit(limit);
  }, [pageItems.length]);
  
  const getPaginationGroup = () => {
    const start = Math.floor((currentPage - 1) / pageLimit);
    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
  };

  return (
    <div style={{
      textAlign : 'right',
      marginTop: '12px'
    }}>
      <button className="btn-square-blue" onClick={handleBackButtonClick} disabled={previosDisabled} style={{
          marginRight : '7px',
        }}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      {getPaginationGroup().map((item, index) => (
        <button key={index} className={`${currentPage === item ? 'btn-square-blue' : 'btn-square-border-blue'}`} onClick={handlePageNumber} style={{
          marginRight : '7px',
        }}>
          {item}
        </button>
      ))}
      <button className="btn-square-blue" onClick={handleNextButtonClick} disabled={nextDisabled}>
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </div>
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
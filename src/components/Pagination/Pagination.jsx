import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPaginationRange = () => {
    const totalDisplayedPages = 6; 
    const halfRange = Math.floor(totalDisplayedPages / 2);

    let startPage = Math.max(currentPage - halfRange, 1); 
    let endPage = Math.min(startPage + totalDisplayedPages - 1, totalPages); 

    
    if (endPage - startPage < totalDisplayedPages - 1) {
      startPage = Math.max(endPage - totalDisplayedPages + 1, 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="pagination">
 
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`page-button ${currentPage === 1 ? 'disabled' : ''}`}
      >
        Previous
      </button>

    
      {getPaginationRange().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`page-number ${currentPage === page ? 'active' : ''}`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`page-button ${currentPage === totalPages ? 'disabled' : ''}`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
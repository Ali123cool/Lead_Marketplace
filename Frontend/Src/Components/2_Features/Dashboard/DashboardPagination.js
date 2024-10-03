// Src/Components/common/Dashboards/DashboardPagination.js

import React from 'react';

const DashboardPagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="flex justify-center space-x-4 mt-4">
      <button
        className="border-2 border-button-secondary text-button-secondary w-20 h-8 rounded-3xl transition-colors duration-300 hover:bg-button-secondary hover:bg-opacity-20"
        onClick={handlePrev}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span className="text-white">{`Page ${currentPage} of ${totalPages}`}</span>
      <button
        className="border-2 border-button-secondary text-button-secondary w-20 h-8 rounded-3xl transition-colors duration-300 hover:bg-button-secondary hover:bg-opacity-20 "
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default DashboardPagination;

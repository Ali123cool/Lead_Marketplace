// Src/Components/common/Dashboards/DashboardModal.js

import React from 'react';

const DashboardModal = ({ isOpen, onClose, children, title = 'Modal Title' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-secondary p-6 rounded-md shadow-lg z-10 max-w-lg w-full">
        <h2 className="text-h2 mb-4">{title}</h2>
        <div className="mb-4">{children}</div>
        <button className="btn-2" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default DashboardModal;

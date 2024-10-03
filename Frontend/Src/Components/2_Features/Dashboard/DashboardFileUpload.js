// Src/Components/common/Dashboards/DashboardFileUpload.js

import React, { useState } from 'react';

const DashboardFileUpload = ({ onFileUpload }) => {
  const [dragging, setDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    setSelectedFile(file);
    if (onFileUpload) {
      onFileUpload(file);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (onFileUpload) {
      onFileUpload(file);
    }
  };

  return (
    <div
      className={`border-2 ${dragging ? 'border-button-primary' : 'border-dashed border-gray-400'} rounded-md p-6 text-center transition-colors duration-300`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {selectedFile ? (
        <div className="text-white">
          <p>{selectedFile.name}</p>
          <p>{(selectedFile.size / 1024).toFixed(2)} KB</p>
        </div>
      ) : (
        <>
          <p className="text-white mb-4">Drag and drop a file here, or click to select a file</p>
          <input
            type="file"
            className="hidden"
            onChange={handleFileSelect}
            id="file-upload-input"
          />
          <label
            htmlFor="file-upload-input"
            className=" btn-4 cursor-pointer"
          >
            Choose File
          </label>
        </>
      )}
    </div>
  );
};

export default DashboardFileUpload;

// Src/Components/2_Features/Dashboard/DashboardFileUpload.js

import React from 'react';

const DashboardFileUpload = ({ 
  onFileUpload, 
  selectedFiles, 
  onFileDelete, 
  customMessage = 'Drag and drop files here, or click to select files',
  maxFiles = 1 // Default to 1 file per upload action
}) => {
  
  const handleDragOver = (e) => {
    e.preventDefault();
    // Optional: Add visual feedback for dragging
  };

  const handleDrop = (e) => {
    e.preventDefault();
    let files = Array.from(e.dataTransfer.files);

    // Enforce maxFiles limit based on current selected files
    if (selectedFiles.length + files.length > maxFiles) {
      const availableSlots = maxFiles - selectedFiles.length;
      alert(`You can only upload up to ${maxFiles} file(s). Please delete some files before adding new ones.`);
      files = files.slice(0, availableSlots);
    }

    // Removed PDF-only validation to allow all file types
    const validFiles = files;
    const invalidFiles = []; // No invalid files as all types are allowed

    if (invalidFiles.length > 0) {
      alert('Some files are not allowed.');
    }

    if (validFiles.length > 0) {
      onFileUpload([...selectedFiles, ...validFiles]); // Append new valid files
    }
  };

  const handleFileSelect = (e) => {
    let files = Array.from(e.target.files);

    // Enforce maxFiles limit based on current selected files
    if (selectedFiles.length + files.length > maxFiles) {
      const availableSlots = maxFiles - selectedFiles.length;
      alert(`You can only upload up to ${maxFiles} file(s). Please delete some files before adding new ones.`);
      files = files.slice(0, availableSlots);
    }

    // Removed PDF-only validation to allow all file types
    const validFiles = files;
    const invalidFiles = []; // No invalid files as all types are allowed

    if (invalidFiles.length > 0) {
      alert('Some files are not allowed.');
    }

    if (validFiles.length > 0) {
      onFileUpload([...selectedFiles, ...validFiles]); // Append new valid files
    }
  };

  return (
    <div
      className={`border-2 border-dashed border-text-primary rounded-md p-6 text-center transition-colors duration-300`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {selectedFiles.length > 0 && (
        <div className="mb-4">
          <h4 className="text-lg font-semibold mb-2">Selected Files:</h4>
          <ul className="space-y-2">
            {selectedFiles.map((file, index) => (
              <li key={index} className="flex items-center justify-between">
                <div>
                  {/* Removed URL.createObjectURL to prevent generating URLs for viewing files */}
                  <span className="text-blue-500 underline">{file.name}</span>
                  <span className="ml-2 text-sm text-primary">({(file.size / 1024).toFixed(2)} KB)</span>
                </div>
                <button
                  onClick={() => onFileDelete(file.name)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div
        className={`border-2 border-dashed border-text-primary rounded-md p-4 cursor-pointer`}
      >
        {/* Disable file input if maxFiles is reached */}
        {selectedFiles.length < maxFiles ? (
          <>
            <p className="text-primary-600 mb-4">{customMessage}</p>
            <input
              type="file"
              className="hidden"
              onChange={handleFileSelect}
              id="file-upload-input"
              multiple={maxFiles > 1} // Allow selecting multiple files only if maxFiles > 1
            />
            <label
              htmlFor="file-upload-input"
              className="btn-2 cursor-pointer"
            >
              Choose File{maxFiles > 1 ? 's' : ''}
            </label>
          </>
        ) : (
          <p className="text-red-500">Maximum of {maxFiles} file(s) uploaded. Please delete a file to add a new one.</p>
        )}
      </div>
    </div>
  );
};

export default DashboardFileUpload;

// Src/Components/FAQ_SearchBar.js

import React, { useState } from 'react';

const FAQ_SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="my-4">
      <input
        type="text"
        className="w-full p-3 border border-secondary rounded-md text-body font-body text-black"
        placeholder="Search FAQs..."
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
};

export default FAQ_SearchBar;

// Src/Pages/FAQ.js

import React, { useState } from 'react';
import Global_SectionTitle from '../Components/Global_SectionTitle';
import FAQ_FAQList from '../Components/FAQ_FAQList';
import FAQ_SearchBar from '../Components/FAQ_SearchBar';
import FAQ_ContactInfo from '../Components/FAQ_ContactInfo';

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase());
  };

  return (
    <div className="min-h-screen bg-secondary">
      <div className="container mx-auto p-6">
        <Global_SectionTitle title="Frequently Asked Questions" />
        <FAQ_SearchBar onSearch={handleSearch} />
        <FAQ_FAQList searchTerm={searchTerm} />
        <FAQ_ContactInfo />
      </div>
    </div>
  );
};

export default FAQ;

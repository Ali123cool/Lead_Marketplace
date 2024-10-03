import React, { useState } from 'react';
import FAQ_FAQList from '../../Components/3_PageSpecificSections/General/FAQ/FAQ_FAQList';
import FAQ_ContactInfo from '../../Components/3_PageSpecificSections/General/FAQ/FAQ_ContactInfo';

const FAQ = () => {
  return (
    <div className="pt-10 min-h-screen bg-primary">
      <div className="container mx-auto p-6">
        <h1 className="h1 text-center py-8">
          Frequently Asked Questions
        </h1>
        <FAQ_FAQList />
        <FAQ_ContactInfo />
      </div>
    </div>
  );
};

export default FAQ;

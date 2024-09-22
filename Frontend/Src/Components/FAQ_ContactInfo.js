// Src/Components/FAQ_ContactInfo.js

import React from 'react';

const FAQ_ContactInfo = () => {
  return (
    <div className="bg-secondary text-bodyText p-6 rounded-md">
      <h2 className="text-h2 font-h2 mb-4">Contact Information</h2>
      <p className="text-body font-body">If you have any other questions, feel free to contact our support team:</p>
      <ul className="mt-4 space-y-2">
        <li>Email: support@leadmarketplace.com</li>
        <li>Phone: (123) 456-7890</li>
        <li>Office Hours: Mon-Fri, 9 AM - 6 PM</li>
      </ul>
    </div>
  );
};

export default FAQ_ContactInfo;

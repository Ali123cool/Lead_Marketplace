// Src/Components/FAQ_FAQList.js

import React from 'react';

const FAQ_FAQList = () => {
  const faqs = [
    {
      question: "What is the purpose of the Lead Marketplace?",
      answer: "Lead Marketplace connects vendors with potential buyers, offering exclusive leads that are sold only once."
    },
    {
      question: "How do I purchase a lead?",
      answer: "To purchase a lead, simply browse the available listings, add them to your cart, and proceed through the checkout."
    },
    {
      question: "How can I contact support?",
      answer: "You can contact support using the details provided in the Contact Information section below."
    }
  ];

  return (
    <div className="space-y-6">
      {faqs.map((faq, index) => (
        <div key={index} className="bg-primary text-bodyText p-6 rounded-md">
          <h3 className="text-h3 font-h3">{faq.question}</h3>
          <p className="text-body font-body mt-2">{faq.answer}</p>
        </div>
      ))}
    </div>
  );
};

export default FAQ_FAQList;

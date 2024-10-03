import React, { useState } from 'react';

const FAQ_FAQList = () => {
  const [activeIndex, setActiveIndex] = useState(null); // To track which FAQ is open

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

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index); // Toggle the dropdown
  };

  return (
    <div className="pb-10 max-w-2xl mx-auto space-y-4"> {/* Centering the FAQ cards */}
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="bg-secondary text-text-primary p-6 rounded-lg shadow-lg"
        >
          {/* Question */}
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => handleToggle(index)}
          >
            <h3 className="h3">{faq.question}</h3> {/* Using the h3 style from index.css */}
            <span className="text-xl">
              {activeIndex === index ? '-' : '+'} {/* Toggle symbol */}
            </span>
          </div>

          {/* Separator */}
          <div className="border-b border-text-tertiary my-4"></div>

          {/* Answer (conditionally rendered) */}
          {activeIndex === index && (
            <p className="body-primary mt-4"> {/* Using body-primary for the answer */}
              {faq.answer}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQ_FAQList;

import React from 'react';

const Global_Footer = () => {
  return (
    <footer className="bg-secondary text-textsecondary text-xs p-4 text-center">
      <div className="flex justify-center space-x-6">
        <a href="/privacy-policy" className="hover:text-button1">Privacy Policy</a>
        <a href="/terms-of-service" className="hover:text-button1">Terms of Service</a>
        <a href="/refund-policy" className="hover:text-button1">Refund Policy</a>
        <a href="/email-opt-out" className="hover:text-button1">Email Opt-Out</a>
      </div>
      <p className="mt-2 text-xs">Owned and Operated By EliteGlow</p>
    </footer>
  );
};

export default Global_Footer;

import React from 'react';

const Global_Footer = () => {
  return (
    <footer className="bg-tertiary text-text-secondary text-finePrint p-4 text-center">
      <div className="flex justify-center space-x-6">
        <a href="/privacy-policy" className="hover:text-button-primary">Privacy Policy</a>
        <a href="/terms-of-service" className="hover:text-button-primary">Terms of Service</a>
        <a href="/refund-policy" className="hover:text-button-primary">Refund Policy</a>
        <a href="/email-opt-out" className="hover:text-button-primary">Email Opt-Out</a>
      </div>
      <p className="mt-2 text-finePrint">Owned and Operated By EliteGlow</p>
    </footer>
  );
};

export default Global_Footer;

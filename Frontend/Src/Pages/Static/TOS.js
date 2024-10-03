import React from 'react';

const TOS_TermsContent = () => {
  return (
    <div className="px-8 py-12 bg-primary text-text-primary text-left mx-auto max-w-3xl">
      <p className="body-primary mb-4">
        Welcome to Prozpkt! These terms and conditions outline the rules and regulations for the use of Prozpkt's Website.
      </p>
      <p className="body-primary mb-4">
        By accessing this website, we assume you accept these terms and conditions. Do not continue to use Prozpkt if you do not agree to all of the terms and conditions stated on this page.
      </p>
      {/* Add the rest of your terms of service here */}
      <p className="body-primary mt-8">Thank you for using Prozpkt!</p>
    </div>
  );
};

const TOS = () => {
  return (
    <div className="pt-4"> 
      <h1 className="h1 text-center py-8">
        Terms of Service
      </h1>
      <TOS_TermsContent />
    </div>
  );
};

export default TOS;
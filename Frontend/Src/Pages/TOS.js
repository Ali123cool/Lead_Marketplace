import React from 'react';
import Global_Navbar from '../Components/Global_Navbar';
import Global_SectionTitle from '../Components/Global_SectionTitle';
import TOS_TermsContent from '../Components/TOS_TermsContent';

const TOS = () => {
  return (
    <div>
      <Global_Navbar />
      <Global_SectionTitle title="Terms of Service" />
      <TOS_TermsContent />
    </div>
  );
};

export default TOS;

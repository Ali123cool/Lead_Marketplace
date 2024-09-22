import React from 'react';
import Global_Navbar from '../Components/Global_Navbar';
import Global_SectionTitle from '../Components/Global_SectionTitle';
import PrivacyPolicy_PrivacyContent from '../Components/PrivacyPolicy_PrivacyContent';

const PrivacyPolicy = () => {
  return (
    <div>
      <Global_Navbar />
      <Global_SectionTitle title="Privacy Policy" />
      <PrivacyPolicy_PrivacyContent />
    </div>
  );
};

export default PrivacyPolicy;

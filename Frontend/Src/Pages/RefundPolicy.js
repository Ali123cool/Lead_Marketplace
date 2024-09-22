import React from 'react';
import Global_Navbar from '../Components/Global_Navbar';
import Global_SectionTitle from '../Components/Global_SectionTitle';
import RefundPolicy_Content from '../Components/RefundPolicy_Content';

const RefundPolicy = () => {
  return (
    <div>
      <Global_Navbar />
      <Global_SectionTitle title="Refund Policy" />
      <RefundPolicy_Content />
    </div>
  );
};

export default RefundPolicy;

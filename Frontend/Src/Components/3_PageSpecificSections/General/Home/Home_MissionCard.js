// Src/Components/Page_Specific/Home/Home_MissionCard.js

import React from 'react';
import Card from '../../../1_Common/UserInterface/Card';

const Home_MissionCard = () => {
  return (
    <Card 
      styleType="card-3"  // Using card style 2 with bg-secondary
      heading="Our Mission"
      text="At Lead Marketplace, we aim to provide businesses with quality leads that help drive success. Our leads are exclusive and offer real opportunities for growth."
      textAlign="text-center"
      centerContent={true}
    />
  );
};

export default Home_MissionCard;

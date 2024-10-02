// Src/Components/Page_Specific/Home/Home_ExplainPlatformCard.js

import React from 'react';
import Card from '../../../Common/UserInterface/Card';

const Home_ExplainPlatformCard = () => {
  return (
    <Card 
      styleType="card-2"
      heading="How Lead Marketplace Works"
      text="Our platform connects you with exclusive leads that are sold only once. Browse leads, purchase them, and get detailed contact information to make your next sale."
      textAlign="text-center"
      centerContent={true}
    />
  );
};

export default Home_ExplainPlatformCard;

// Src/Pages/Home.js

import React from 'react';
import Home_HeroSection from '../../Components/Page_Specific/General/Home/Home_HeroSection';
import Home_ExplainPlatformCard from '../../Components/Page_Specific/General/Home/Home_ExplainPlatformCard';
import Home_MissionCard from '../../Components/Page_Specific/General/Home/Home_MissionCard';

const Home = () => {
  return (
    <div className="relative min-h-screen bg-primary">
      
      <div className="container mx-auto px-6">
        <Home_HeroSection />
        <Home_ExplainPlatformCard />
        <Home_MissionCard />
      </div>
    </div>
  );
};

export default Home;

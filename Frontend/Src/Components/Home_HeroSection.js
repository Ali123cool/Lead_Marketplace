// Src/Components/Home_HeroSection.js

import React from 'react';
import Home_ShopLeadsButton from './Home_ShopLeadsButton';
import Home_CreateAccountButton from './Home_CreateAccountButton';


const Home_HeroSection = () => {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center text-center py-24">
      <h1 className="text-h1 font-h1 text-bodyText mb-6">
        Welcome to Lead Marketplace
      </h1>
      <p className="text-body font-body text-bodyText max-w-2xl mb-10">
        Get exclusive leads for your business. Sign up today or browse through our available leads.
      </p>
        <div className="space-y-4">
            {/* Shop Leads Button on top */}
            <div>
                <Home_ShopLeadsButton />
            </div>
            
            {/* Create Account buttons side by side */}
            <div className="flex space-x-4">
                <Home_CreateAccountButton />
                
            </div>
        </div>
    </div>
  );
};

export default Home_HeroSection;

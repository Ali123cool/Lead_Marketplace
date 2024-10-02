import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../Common/UserInterface/Button'; // Corrected import path

const Home_HeroSection = () => {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center text-center py-24">
      <h1 className="h1 mb-6">
        Welcome to Lead Marketplace
      </h1>
      <p className="body-primary max-w-2xl mb-10">
        Get exclusive leads for your business. Sign up today or browse through our available leads.
      </p>

      <div className="space-y-4">
        {/* Shop Leads Button */}
        <div>
          <Link to="/shop-leads">
            <Button styleType="btn-1">
              Shop Leads
            </Button>
          </Link>
        </div>

        {/* Create Account Button */}
        <div className="flex space-x-4">
          <Link to="/login">
            <Button styleType="btn-3">
              Login/Register
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home_HeroSection;

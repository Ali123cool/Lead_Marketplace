// src/components/home/HeroSection.js

import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import Heading from '../common/Typography/Heading';
import Paragraph from '../common/Typography/Paragraph';
import Section from '../common/Section';

const HeroSection = () => {
  return (
    <Section 
      className="bg-secondary flex items-center justify-center" 
      fullHeight={true} 
      removeTopPadding={true}
    >
      <div className="flex flex-col items-center justify-center text-center py-16">
        <Heading level={1} className="mb-md">
          Welcome to Lead Marketplace
        </Heading>
        <Paragraph className="max-w-2xl mb-lg">
          Get exclusive leads for your business. Sign up today or browse through our available leads.
        </Paragraph>
        <div className="space-y-sm">
          <div>
            <Link to="/shop-leads">
              <Button variant="primary" size="md">Shop Leads</Button>
            </Link>
          </div>
          <div>
            <Link to="/login">
              <Button variant="secondary" size="md">Login/Register</Button>
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default HeroSection;
// src/components/home/ExplainPlatformCard.js

import React from 'react';
import Card from '../common/Card';
import Heading from '../common/Typography/Heading';
import Paragraph from '../common/Typography/Paragraph';

const ExplainPlatformCard = () => {
  return (
    <Card className="max-w-lg mx-auto mb-lg p-lg bg-tertiary">
      <Heading level={2} className="mb-md">How Lead Marketplace Works</Heading>
      <Paragraph>
        Our platform connects you with exclusive leads that are sold only once. Browse leads, purchase them, and get detailed contact information to make your next sale.
      </Paragraph>
    </Card>
  );
};

export default ExplainPlatformCard;
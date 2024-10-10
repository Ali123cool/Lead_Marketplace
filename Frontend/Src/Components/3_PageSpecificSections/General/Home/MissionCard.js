// src/components/home/MissionCard.js

import React from 'react';
import Card from '../common/Card';
import Heading from '../common/Typography/Heading';
import Paragraph from '../common/Typography/Paragraph';

const MissionCard = () => {
  return (
    <Card className="max-w-lg mx-auto mb-lg p-lg bg-tertiary">
      <Heading level={2} className="mb-md">Our Mission</Heading>
      <Paragraph>
        At Lead Marketplace, we aim to provide businesses with quality leads that help drive success. Our leads are exclusive and offer real opportunities for growth.
      </Paragraph>
    </Card>
  );
};

export default MissionCard;
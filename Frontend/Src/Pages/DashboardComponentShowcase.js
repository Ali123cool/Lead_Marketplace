// Src/Pages/DashboardComponentShowcase.js

import React, { useState } from 'react';
import DashboardButton from '../Components/Common/Dashboard/DashboardButton';
import DashboardCard from '../Components/Common/Dashboard/DashboardCard';
import DashboardFormField from '../Components/Common/Dashboard/DashboardFormField';

const DashboardComponentShowcase = () => {
  const [formValue, setFormValue] = useState('');

  return (
    <div className="min-h-screen bg-primary text-white p-6">
      <h1 className="text-h1 font-bold text-secondary mb-6">Dashboard Component Showcase</h1>

      {/* Showcase DashboardButton */}
      <h2 className="text-h2 font-semibold mb-4">Buttons</h2>
      <div className="space-x-4 mb-6">
        <DashboardButton styleType="btn-1">Primary Button</DashboardButton>
        <DashboardButton styleType="btn-3">Secondary Button</DashboardButton>
      </div>

      {/* Showcase DashboardCard */}
      <h2 className="text-h2 font-semibold mb-4">Cards</h2>
      <div className="space-y-4 mb-6">
        <DashboardCard styleType="card-2">This is Card 1</DashboardCard>
        <DashboardCard styleType="card-3">This is Card 2</DashboardCard>
      </div>

      {/* Showcase DashboardFormField */}
      <h2 className="text-h2 font-semibold mb-4">Form Fields</h2>
      <div className="space-y-4 mb-6">
        <DashboardFormField
          label="Sample Input"
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="Enter some text"
        />
      </div>
    </div>
  );
};

export default DashboardComponentShowcase;

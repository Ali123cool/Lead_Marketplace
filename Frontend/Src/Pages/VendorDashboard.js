import React, { useState } from 'react';
import VendorDashboard_Profile from '../Components/VendorDashboard_Profile';
import VendorDashboard_ManageLeads from '../Components/VendorDashboard_ManageLeads';
import VendorDashboard_Payouts from '../Components/VendorDashboard_Payouts';
import VendorDashboard_Notifications from '../Components/VendorDashboard_Notifications';
import VendorDashboard_Support from '../Components/VendorDashboard_Support';

const VendorDashboard = () => {
  const [activeTab, setActiveTab] = useState('profile'); // Default tab is Profile

  // Function to switch between tabs
  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <VendorDashboard_Profile />;
      case 'manageLeads':
        return <VendorDashboard_ManageLeads />;
      case 'payouts':
        return <VendorDashboard_Payouts />;
      case 'notifications':
        return <VendorDashboard_Notifications />;
      case 'support':
        return <VendorDashboard_Support />;
      default:
        return <VendorDashboard_Profile />;
    }
  };

  return (
    <div className="min-h-screen bg-primary text-bodyText">
      {/* Dashboard Navigation */}
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Vendor Dashboard</h1>

        <div className="flex space-x-4 mb-6">
          <button
            className={`px-4 py-2 rounded-md ${activeTab === 'profile' ? 'bg-button1' : 'bg-secondary'}`}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>

          <button
            className={`px-4 py-2 rounded-md ${activeTab === 'manageLeads' ? 'bg-button1' : 'bg-secondary'}`}
            onClick={() => setActiveTab('manageLeads')}
          >
            Manage Leads
          </button>

          <button
            className={`px-4 py-2 rounded-md ${activeTab === 'payouts' ? 'bg-button1' : 'bg-secondary'}`}
            onClick={() => setActiveTab('payouts')}
          >
            Payouts
          </button>

          <button
            className={`px-4 py-2 rounded-md ${activeTab === 'notifications' ? 'bg-button1' : 'bg-secondary'}`}
            onClick={() => setActiveTab('notifications')}
          >
            Notifications
          </button>

          <button
            className={`px-4 py-2 rounded-md ${activeTab === 'support' ? 'bg-button1' : 'bg-secondary'}`}
            onClick={() => setActiveTab('support')}
          >
            Support
          </button>
        </div>

        {/* Render the content of the active tab */}
        <div className="bg-secondary p-6 rounded-md shadow-md">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;

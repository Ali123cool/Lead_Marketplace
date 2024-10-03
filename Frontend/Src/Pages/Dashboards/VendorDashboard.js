import React, { useState } from 'react';
import VendorDashboard_Sidebar from '../../Components/3_PageSpecificSections/Dashboards/VendorDashboard/VendorDashboard_Sidebar';
import VendorDashboard_Profile from '../../Components/3_PageSpecificSections/Dashboards/VendorDashboard/VendorDashboard_Profile';
import VendorDashboard_ManageLeads from '../../Components/3_PageSpecificSections/Dashboards/VendorDashboard/VendorDashboard_ManageLeads';
import VendorDashboard_Payouts from '../../Components/3_PageSpecificSections/Dashboards/VendorDashboard/VendorDashboard_Payouts';
import VendorDashboard_Notifications from '../../Components/3_PageSpecificSections/Dashboards/VendorDashboard/VendorDashboard_Notifications';
import VendorDashboard_Support from '../../Components/3_PageSpecificSections/Dashboards/VendorDashboard/VendorDashboard_Support';

const VendorDashboard = () => {
  const [activeComponent, setActiveComponent] = useState('profile');

  const renderContent = () => {
    switch (activeComponent) {
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
    <div className="flex">
      {/* Vendor Dashboard Sidebar */}
      <VendorDashboard_Sidebar onTabSelect={setActiveComponent} />

      {/* Main Content */}
      <div className="flex-1 p-6 bg-primary text-white">
        {renderContent()}
      </div>
    </div>
  );
};

export default VendorDashboard;

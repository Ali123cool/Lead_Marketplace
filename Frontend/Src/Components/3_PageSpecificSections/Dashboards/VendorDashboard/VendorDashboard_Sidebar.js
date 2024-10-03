// Src/Components/3_PageSpecificSections/Dashboards/VendorDashboard/VendorDashboard_Sidebar.js

import React from 'react';
import { FaUser, FaCog, FaFileInvoiceDollar, FaBell, FaQuestionCircle } from 'react-icons/fa';
import DashboardSidebar from '../../../2_Features/Dashboard/DashboardSidebar';

const VendorDashboard_Sidebar = ({ onTabSelect }) => {
  const sidebarItems = [
    { label: 'Profile', icon: <FaUser />, onClick: () => onTabSelect('profile') },
    { label: 'Manage Leads', icon: <FaCog />, onClick: () => onTabSelect('manageLeads') },
    { label: 'Payouts', icon: <FaFileInvoiceDollar />, onClick: () => onTabSelect('payouts') },
    { label: 'Notifications', icon: <FaBell />, onClick: () => onTabSelect('notifications') },
    { label: 'Support', icon: <FaQuestionCircle />, onClick: () => onTabSelect('support') },
  ];

  return <DashboardSidebar title="Vendor Dashboard" items={sidebarItems} />;
};

export default VendorDashboard_Sidebar;

// Src/Components/common/Dashboards/DashboardSidebar.js

import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';

const DashboardSidebar = ({ title = 'Menu', items }) => {
  // Initialize the sidebar as closed
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className={`bg-primary min-h-screen transition-all duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-16'} overflow-hidden`}>
        
        {/* Sidebar Header */}
        <div className="flex items-center justify-between pl-4 pr-4 pt-6">
          <h2 className={`text-white text-2xl font-bold transition-all duration-300 ${!isOpen && 'hidden'}`}>
            {title}
          </h2>
          <button className="text-white" onClick={toggleSidebar}>
            <FaBars size={24} />
          </button>
        </div>

        {/* Sidebar Links */}
        <nav className="mt-6">
          {items.map((item, index) => (
            <div
              key={index}
              className="p-4 text-white hover:bg-button-primary cursor-pointer flex items-center space-x-2 transition-all duration-300"
              onClick={item.onClick}
            >
              <span>{item.icon}</span>
              <span className={`${!isOpen && 'hidden'} origin-left transition-all duration-300`}>
                {item.label}
              </span>
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default DashboardSidebar;

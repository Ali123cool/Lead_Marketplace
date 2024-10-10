import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';

const GeneralSidebar = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className={`bg-secondary h-screen ${isOpen ? 'w-64' : 'w-20'} transition-all duration-300`}>
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4">
        <h2 className={`text-white text-xl font-bold ${!isOpen && 'hidden'}`}>Menu</h2>
        <button className="text-white block md:hidden" onClick={toggleSidebar}>
          <FaBars size={24} />
        </button>
      </div>

      {/* Sidebar Links */}
      <nav className="mt-6">
        {items.map((item, index) => (
          <div key={index} className="p-4 text-white hover:bg-tertiary cursor-pointer">
            <a href={item.link} className="flex items-center space-x-2">
              <span>{item.icon}</span>
              <span className={`${!isOpen && 'hidden'} md:inline`}>{item.label}</span>
            </a>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default GeneralSidebar;
// Src/Components/common/Dashboards/DashboardBreadcrumbs.js

import React from 'react';

const DashboardBreadcrumbs = ({ items }) => {
  return (
    <nav className="text-white mb-4">
      <ul className="flex space-x-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <a href={item.link} className="hover:underline">
              {item.label}
            </a>
            {index < items.length - 1 && <span className="mx-2">/</span>}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default DashboardBreadcrumbs;

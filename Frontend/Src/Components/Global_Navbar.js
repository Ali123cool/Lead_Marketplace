import React, { useState } from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom

const Global_Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to track if menu is open

  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle the menu open/close state
  };

  return (
    <nav className="bg-primary text-bodyText p-4">
      <div className="flex justify-between items-center">
        {/* Make PROZPKT a link to the home page */}
        <Link to="/" className="font-logo text-2xl font-extrabold">PROZPKT</Link>

        {/* Hamburger button for smaller screens */}
        <button
          className="block lg:hidden text-bodyText focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={!isOpen ? "M4 6h16M4 12h16M4 18h16" : "M6 18L18 6M6 6l12 12"}
            ></path>
          </svg>
        </button>

        {/* Full menu for larger screens */}
        <ul className="hidden lg:flex space-x-6">
          <li><a href="/shop-leads" className="hover:text-button1">Shop Leads</a></li>
          <li><a href="/vendor-account" className="hover:text-button1">Vendor Account</a></li>
          <li><a href="/customer-account" className="hover:text-button1">Customer Account</a></li>
          <li><a href="/contact" className="hover:text-button1">Contact Us/FAQ</a></li>
        </ul>
      </div>

      {/* Dropdown menu for smaller screens */}
      {isOpen && (
        <ul className="lg:hidden mt-4 space-y-4">
          <li><a href="/shop-leads" className="block hover:text-button1">Shop Leads</a></li>
          <li><a href="/vendor-account" className="block hover:text-button1">Vendor Account</a></li>
          <li><a href="/customer-account" className="block hover:text-button1">Customer Account</a></li>
          <li><a href="/contact-faq" className="block hover:text-button1">Contact Us/FAQ</a></li>
        </ul>
      )}
    </nav>
  );
};

export default Global_Navbar;

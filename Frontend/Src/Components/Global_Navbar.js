import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Global_Navbar = ({ user, accountType, handleLogoff }) => {
  const [isOpen, setIsOpen] = useState(false); // Hamburger menu state
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false); // Account dropdown state
  const navigate = useNavigate(); // For navigating between pages

  // Toggle the hamburger menu for mobile view
  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle open/close state
  };

  // Toggle the account dropdown
  const toggleAccountDropdown = (e) => {
    e.stopPropagation(); // Prevent the dropdown from closing immediately
    setAccountDropdownOpen(!accountDropdownOpen); // Toggle dropdown open/close state
  };

  // Handle Link Click and Navigate
  const handleLinkClick = (path) => {
    navigate(path); // Navigate to the correct route
  };

  return (
    <nav className="bg-primary text-bodyText p-4 fixed top-0 left-0 right-0 z-50">
      <div className="flex justify-between items-center">
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
          <li><Link to="/shop-leads" className="hover:text-button1">Shop Leads</Link></li>

          {/* Account Dropdown */}
          <li className="relative">
            <button onClick={toggleAccountDropdown} className="hover:text-button1 flex items-center">
              Account
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={accountDropdownOpen ? "M6 18L18 6M6 6l12 12" : "M19 9l-7 7-7-7"}
                ></path>
              </svg>
            </button>

            {accountDropdownOpen && (
              <ul className="absolute right-0 mt-2 bg-secondary border rounded-lg shadow-md">
                {user ? (
                  <>
                    {/* Redirect to correct dashboard based on account type */}
                    <li>
                      <button
                        className="block px-4 py-2 hover:text-button1 w-full text-left"
                        onClick={() => handleLinkClick(accountType === 'vendor' ? '/vendor-dashboard' : '/customer-dashboard')}
                      >
                        Dashboard
                      </button>
                    </li>
                    <li>
                      <button
                        className="block px-4 py-2 hover:text-button1 w-full text-left"
                        onClick={handleLogoff}
                      >
                        Logoff
                      </button>
                    </li>
                  </>
                ) : (
                  <li>
                    <button
                      className="block px-4 py-2 hover:text-button1 w-full text-left"
                      onClick={() => handleLinkClick('/login')}
                    >
                      Login
                    </button>
                  </li>
                )}
              </ul>
            )}
          </li>

          <li><Link to="/contact-faq" className="hover:text-button1">Contact Us/FAQ</Link></li>
        </ul>
      </div>

      {/* Dropdown menu for smaller screens */}
      {isOpen && (
        <ul className="lg:hidden mt-4 p-6 space-y-4 bg-secondary rounded-lg">
          <li><Link to="/shop-leads" className="block hover:text-button1">Shop Leads</Link></li>

          {/* Account Section for Smaller Screens */}
          <li>
            <button className="lg:hidden text-bodyText focus:outline-none" onClick={toggleMenu}>
              Account
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={accountDropdownOpen ? "M6 18L18 6M6 6l12 12" : "M19 9l-7 7-7-7"}
                ></path>
              </svg>
            </button>
            {accountDropdownOpen && (
              <ul className="pl-4 mt-2">
                {user ? (
                  <>
                    {/* Redirect to correct dashboard based on account type */}
                    <li>
                      <button
                        className="block px-4 py-2 hover:text-button1 w-full text-left"
                        onClick={() => handleLinkClick(accountType === 'vendor' ? '/vendor-dashboard' : '/customer-dashboard')}
                      >
                        Dashboard
                      </button>
                    </li>
                    <li>
                      <button
                        className="block px-4 py-2 hover:text-button1 w-full text-left"
                        onClick={handleLogoff}
                      >
                        Logoff
                      </button>
                    </li>
                  </>
                ) : (
                  <li>
                    <button
                      className="block hover:text-button1 w-full text-left"
                      onClick={() => handleLinkClick('/login')}
                    >
                      Login
                    </button>
                  </li>
                )}
              </ul>
            )}
          </li>

          <li><Link to="/contact-faq" className="block hover:text-button1">Contact Us/FAQ</Link></li>
        </ul>
      )}
    </nav>
  );
};

export default Global_Navbar;

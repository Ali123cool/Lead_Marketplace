// Src/Components/Home_CreateAccountButton.js

import React from 'react';
import { Link } from 'react-router-dom';

const Home_CreateAccountButton = () => {
  return (
    <Link to="/login">
      <button className="bg-button2 text-bodyText py-3 px-6 rounded-lg font-body font-semibold">
        Login/Register
      </button>
    </Link>
  );
};

export default Home_CreateAccountButton;

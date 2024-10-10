// Src/Components/Home_ShopLeadsButton.js

import React from 'react';
import { Link } from 'react-router-dom';

const Home_ShopLeadsButton = () => {
  return (
    <Link to="/shop-leads">
      <button className="bg-button1 text-bodyText py-3 px-6 rounded-lg font-body font-semibold">
        Shop Leads
      </button>
    </Link>
  );
};

export default Home_ShopLeadsButton;

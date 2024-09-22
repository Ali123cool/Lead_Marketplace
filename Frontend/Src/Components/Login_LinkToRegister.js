// Src/Components/Login_LinkToRegister.js

import React from 'react';
import { Link } from 'react-router-dom';

const Login_LinkToRegister = () => {
  return (
    <div className="text-center mt-4">
      <p className="text-bodyText font-body">
        Don't have an account? 
        <Link to="/register" className="text-button2 ml-2">
          Register here.
        </Link>
      </p>
    </div>
  );
};

export default Login_LinkToRegister;

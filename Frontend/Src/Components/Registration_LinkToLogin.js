// Src/Components/Registration_LinkToLogin.js

import React from 'react';
import { Link } from 'react-router-dom';

const Registration_LinkToLogin = () => {
  return (
    <div className="text-center mt-4">
      <p className="text-bodyText font-body">
        Already have an account? 
        <Link to="/login" className="text-button2 ml-2">
          Login here.
        </Link>
      </p>
    </div>
  );
};

export default Registration_LinkToLogin;

import React from 'react';
import { Link } from 'react-router-dom';

const Login_LinkToResetPassword = () => {
  return (
    <div className="text-center mt-4">
      <p className="text-bodyText font-body">
        Forgot your password?
        <Link to="/reset-password" className="text-button2 ml-2">
          Reset Password.
        </Link>
      </p>
    </div>
  );
};

export default Login_LinkToResetPassword;

import React from 'react';
import { Link } from 'react-router-dom';

const Login_LinkToResendVerification = () => {
  return (
    <div className="text-center mt-4">
      <p className="text-bodyText font-body">
        Didn't get a verification email?
        <Link to="/resend-verification" className="text-button2 ml-2">
          Resend Verification.
        </Link>
      </p>
    </div>
  );
};

export default Login_LinkToResendVerification;

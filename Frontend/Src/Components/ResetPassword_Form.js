import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ResetPassword_Form = ({ onSubmit }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email); // Pass the email back to the parent component
  };

  return (
    <form onSubmit={handleSubmit} className="bg-primary p-6 rounded-md ">
      {/* Email Input */}
      <div className="mb-4">
        <label className="block text-bodyText mb-2">Enter your email</label>
        <input
          type="email"
          name="email"
          className="w-full p-3 border rounded-md text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      {/* Submit Button */}
      <button type="submit" className="bg-button1 text-bodyText w-full py-3 rounded-md">
        Reset Password
      </button>

      {/* Go to Login Button */}
      <div className="text-center mt-4">
        <Link to="/login" className="text-button2 hover:underline">
          Go to Login
        </Link>
      </div>
    </form>
  );
};

export default ResetPassword_Form;

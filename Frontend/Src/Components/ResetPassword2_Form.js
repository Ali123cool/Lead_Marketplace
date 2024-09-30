import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const ResetPassword2_Form = ({ onSubmit }) => {
  const [newPassword, setNewPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State to toggle password visibility

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(newPassword); // Pass the password back to the parent page for submission
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-primary p-6 rounded-md">
      {/* New Password Input */}
      <div className="mb-4 relative">
        <label className="block text-bodyText mb-2">New Password</label>
        <div className="relative w-full">
          <input
            type={isPasswordVisible ? 'text' : 'password'} // Toggle input type
            name="newPassword"
            className="w-full p-3 border rounded-md text-black pr-10" // Add padding-right for the icon
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          {/* Eye Icon inside input field */}
          <span
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-button1"
          >
            <FontAwesomeIcon icon={isPasswordVisible ? faEyeSlash : faEye} /> {/* Eye Icon */}
          </span>
        </div>
      </div>

      {/* Submit Button */}
      <button type="submit" className="bg-button1 text-bodyText w-full py-3 rounded-md">
        Reset Password
      </button>
    </form>
  );
};

export default ResetPassword2_Form;

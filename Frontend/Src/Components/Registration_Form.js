import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Registration_Form = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    accountType: 'customer',  // Default account type
  });

  const [errors, setErrors] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // Toggle visibility for password
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false); // Toggle visibility for confirm password

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrors('Passwords do not match.');
      return;
    }

    setErrors('');
    onSubmit(formData);  // Pass the form data back to the parent component
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-primary rounded-md">
      
      {/* Email Input */}
      <div className="mb-4">
        <label className="block text-white mb-2">Email</label>
        <input
          type="email"
          name="email"
          className="w-full p-3 border rounded-md text-black"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      {/* Password Input */}
      <div className="mb-4 relative">
        <label className="block text-white mb-2">Password</label>
        <div className="relative w-full">
          <input
            type={isPasswordVisible ? 'text' : 'password'} // Toggle input type
            name="password"
            className="w-full p-3 border rounded-md text-black pr-10"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {/* Eye Icon for password */}
          <span
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-button1"
          >
            <FontAwesomeIcon icon={isPasswordVisible ? faEyeSlash : faEye} />
          </span>
        </div>
      </div>

      {/* Confirm Password */}
      <div className="mb-4 relative">
        <label className="block text-white mb-2">Confirm Password</label>
        <div className="relative w-full">
          <input
            type={isConfirmPasswordVisible ? 'text' : 'password'} // Toggle input type
            name="confirmPassword"
            className="w-full p-3 border rounded-md text-black pr-10"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {/* Eye Icon for confirm password */}
          <span
            onClick={toggleConfirmPasswordVisibility}
            className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-button1"
          >
            <FontAwesomeIcon icon={isConfirmPasswordVisible ? faEyeSlash : faEye} />
          </span>
        </div>
      </div>

      {/* Account Type Selection */}
      <div className="mb-4">
        <label className="block text-white mb-2">Account Type</label>
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="accountType"
              value="customer"
              checked={formData.accountType === 'customer'}
              onChange={handleChange}
              className="mr-2"
            />
            Customer
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="accountType"
              value="vendor"
              checked={formData.accountType === 'vendor'}
              onChange={handleChange}
              className="mr-2"
            />
            Vendor
          </label>
        </div>
      </div>

      {/* Display errors */}
      {errors && <p className="text-red-600">{errors}</p>}

      {/* Submit Button */}
      <button type="submit" className="bg-button1 text-white w-full py-3 rounded-md">
        Register
      </button>
    </form>
  );
};

export default Registration_Form;

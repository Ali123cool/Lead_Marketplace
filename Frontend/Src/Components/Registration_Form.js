import React, { useState } from 'react';

const Registration_Form = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    accountType: 'customer',  // Default account type
  });

  const [errors, setErrors] = useState('');

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
      <div className="mb-4">
        <label className="block text-white mb-2">Password</label>
        <input
          type="password"
          name="password"
          className="w-full p-3 border rounded-md text-black"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      {/* Confirm Password */}
      <div className="mb-4">
        <label className="block text-white mb-2">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          className="w-full p-3 border rounded-md text-black"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
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

// Src/Components/Registration_Form.js

import React, { useState } from 'react';

const Registration_Form = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    accountType: 'customer',
    termsAccepted: false,
    privacyAccepted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
    } else {
      onSubmit(formData);
    }
  };

  return (
    <form className="bg-primary p-6 rounded-md max-w-md mx-auto" onSubmit={handleSubmit}>
      {/* Email Input Field */}
      <div className="mb-4">
        <label className="block text-bodyText font-body mb-2">Email</label>
        <input
          type="email"
          name="email"
          className="w-full p-3 border border-secondary rounded-md text-black"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      {/* Password Input Field */}
      <div className="mb-4">
        <label className="block text-bodyText font-body mb-2">Password</label>
        <input
          type="password"
          name="password"
          className="w-full p-3 border border-secondary rounded-md text-black"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      {/* Confirm Password Input Field */}
      <div className="mb-4">
        <label className="block text-bodyText font-body mb-2">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          className="w-full p-3 border border-secondary rounded-md text-black"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
      </div>

      {/* Full Name Input Field */}
      <div className="mb-4">
        <label className="block text-bodyText font-body mb-2">Full Name</label>
        <input
          type="text"
          name="fullName"
          className="w-full p-3 border border-secondary rounded-md text-black"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
      </div>

      {/* Phone Number Input Field */}
      <div className="mb-4">
        <label className="block text-bodyText font-body mb-2">Phone Number</label>
        <input
          type="text"
          name="phoneNumber"
          className="w-full p-3 border border-secondary rounded-md text-black"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
      </div>

      {/* Address Input Fields */}
      <div className="mb-4">
        <label className="block text-bodyText font-body mb-2">Address</label>
        <input
          type="text"
          name="address"
          className="w-full p-3 border border-secondary rounded-md text-black"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </div>

      {/* State/City/Zip Code Input Fields */}
      <div className="flex space-x-4 mb-4">
        <input
          type="text"
          name="city"
          placeholder="City"
          className="w-full p-3 border border-secondary rounded-md text-black"
          value={formData.city}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          className="w-full p-3 border border-secondary rounded-md text-black"
          value={formData.state}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="zipCode"
          placeholder="Zip Code"
          className="w-full p-3 border border-secondary rounded-md text-black"
          value={formData.zipCode}
          onChange={handleChange}
          required
        />
      </div>

      {/* Country Selection Dropdown */}
      <div className="mb-4">
        <label className="block text-bodyText font-body mb-2">Country</label>
        <select
          name="country"
          className="w-full p-3 border border-secondary rounded-md text-black"
          value={formData.country}
          onChange={handleChange}
          required
        >
          <option value="">Select a country</option>
          <option value="USA">USA</option>
          <option value="Canada">Canada</option>
          <option value="UK">UK</option>
        </select>
      </div>

      {/* Account Type Toggle (Vendor/Customer) */}
      <div className="mb-4">
        <label className="block text-bodyText font-body mb-2">Account Type</label>
        <div className="flex items-center">
          <label className="mr-2">
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
          <label>
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

      {/* Accept Terms of Service Checkbox */}
      <div className="mb-4">
        <label className="flex items-center text-bodyText font-body">
          <input
            type="checkbox"
            name="termsAccepted"
            className="mr-2"
            checked={formData.termsAccepted}
            onChange={handleChange}
            required
          />
          I accept the Terms of Service
        </label>
      </div>

      {/* Accept Privacy Policy Checkbox */}
      <div className="mb-4">
        <label className="flex items-center text-bodyText font-body">
          <input
            type="checkbox"
            name="privacyAccepted"
            className="mr-2"
            checked={formData.privacyAccepted}
            onChange={handleChange}
            required
          />
          I accept the Privacy Policy
        </label>
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="w-full bg-button1 text-bodyText py-3 rounded-md font-semibold"
        >
          Register
        </button>
      </div>
    </form>
  );
};

export default Registration_Form;

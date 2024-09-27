import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import countryList from 'react-select-country-list';

const usStates = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
  'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
  'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 
  'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 
  'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 
  'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 
  'West Virginia', 'Wisconsin', 'Wyoming'
];

const VendorDashboard_Profile = () => {
  const [vendorData, setVendorData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    business_name: '',
    w9_w8_document_url: '',
    account_status: '',
    stripe_account_id: '',
    street_address: '',
    street_address_2: '',
    city: '',
    state: '',
    zip_code: '',
    country: '',
    tin: '',
    bank_account_number: '',
    bank_routing_number: '',
    iban: '',
    swift_code: ''
  });

  const [isModified, setIsModified] = useState(false); // To track unsaved changes
  const [countryOptions, setCountryOptions] = useState(countryList().getData()); // Using react-select-country-list
  const [isUs, setIsUs] = useState(false); // Conditional for US fields

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('vendors')
        .select('*')
        .single(); // Fetch the vendor data

      if (!error && data) {
        setVendorData(data);
        setIsUs(data.country === 'United States');
      }
    };

    fetchData();
  }, []);

  // Handle form input changes
  const handleChange = (field, value) => {
    setVendorData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    setIsModified(true);
    if (field === 'country' && value === 'United States') {
      setIsUs(true);
    } else if (field === 'country') {
      setIsUs(false);
    }
  };

  // Save data to Supabase
  const handleSave = async () => {
    const { data, error } = await supabase
      .from('vendors')
      .update(vendorData)
      .eq('id', vendorData.id); // Save changes

    if (!error) {
      setIsModified(false); // Reset modified flag after save
      alert('Profile updated successfully.');
    } else {
      console.error(error);
      alert('Failed to update profile.');
    }
  };

  return (
    <div className="p-6 bg-secondary">
    {/* Div 1: Account Information */}
    <div className="p-4 bg-tertiary mb-4 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Account Information</h2>
        
        {/* Email */}
        <div className="flex justify-between items-center mb-4">
        <span>Email: {vendorData.email}</span>
        <button
            className="bg-button1 text-white px-4 py-2 rounded"
            onClick={() => navigate('/change-email')}
        >
            Change Email
        </button>
        </div>
        
        {/* Password */}
        <div className="flex justify-between items-center mb-4">
        <span>Password: ••••••••</span>
        <button
            className="bg-button1 text-white px-4 py-2 rounded"
            onClick={() => navigate('/change-password')}
        >
            Change Password
        </button>
        </div>
    </div>

    {/* Div 2: Personal Information */}
    <div className="p-4 bg-tertiary mb-4 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Personal Information</h2>
        
        {/* Phone Number */}
        <div className="mb-4">
        <label className="block font-bold mb-2">Phone Number</label>
        <input
            type="text"
            value={vendorData.phone_number}
            onChange={(e) => handleChange('phone_number', e.target.value)}
            className="border p-2 w-full max-w-md rounded-md text-black"
        />
        </div>

        {/* First Name */}
        <div className="mb-4">
        <label className="block font-bold mb-2">First Name</label>
        <input
            type="text"
            value={vendorData.first_name}
            onChange={(e) => handleChange('first_name', e.target.value)}
            className="border p-2 w-full max-w-md rounded-md text-black"
        />
        </div>

        {/* Last Name */}
        <div className="mb-4">
        <label className="block font-bold mb-2">Last Name</label>
        <input
            type="text"
            value={vendorData.last_name}
            onChange={(e) => handleChange('last_name', e.target.value)}
            className="border p-2 w-full max-w-md rounded-md text-black"
        />
        </div>

        {/* Business Name */}
        <div className="mb-4">
        <label className="block font-bold mb-2">Business Name</label>
        <input
            type="text"
            value={vendorData.business_name}
            onChange={(e) => handleChange('business_name', e.target.value)}
            className="border p-2 w-full max-w-md rounded-md text-black"
        />
        </div>
    </div>
    

      {/* Div 2: Address Information */}
      <div className="p-4 bg-tertiary mb-4 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Address Information</h2>
        
        {/* Country Dropdown */}
        <div className="mb-6">
          <label className="block font-bold mb-2">Country</label>
          <select
            value={vendorData.country}
            onChange={(e) => handleChange('country', e.target.value)}
            className="border p-2 w-full max-w-md rounded-md text-black"
            required
          >
            <option value="">Select Country</option>
            {countryOptions.map((country) => (
              <option key={country.value} value={country.label}>
                {country.label}
              </option>
            ))}
          </select>
        </div>

        {/* Conditional fields for USA */}
        {isUs && (
          <>
            {/* Street Address */}
            <div className="mb-6">
              <label className="block font-bold mb-2">Street Address</label>
              <input
                type="text"
                value={vendorData.street_address}
                onChange={(e) => handleChange('street_address', e.target.value)}
                className="border p-2 w-full max-w-md rounded-md text-black"
              />
            </div>

            {/* Street Address 2 */}
            <div className="mb-6">
              <label className="block font-bold mb-2">Street Address 2</label>
              <input
                type="text"
                value={vendorData.street_address_2}
                onChange={(e) => handleChange('street_address_2', e.target.value)}
                className="border p-2 w-full max-w-md rounded-md text-black"
              />
            </div>

            {/* City */}
            <div className="mb-6">
              <label className="block font-bold mb-2">City</label>
              <input
                type="text"
                value={vendorData.city}
                onChange={(e) => handleChange('city', e.target.value)}
                className="border p-2 w-full max-w-md rounded-md text-black"
              />
            </div>

            {/* State and Zip Code */}
            <div className="flex space-x-4">
              <div className="mb-6">
                <label className="block font-bold mb-2">State</label>
                <select
                  value={vendorData.state}
                  onChange={(e) => handleChange('state', e.target.value)}
                  className="border p-2 w-full max-w-md rounded-md text-black"
                >
                  <option value="">Select State</option>
                  {usStates.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-6">
                <label className="block font-bold mb-2">Zip Code</label>
                <input
                  type="text"
                  value={vendorData.zip_code}
                  onChange={(e) => handleChange('zip_code', e.target.value)}
                  className="border p-2 w-full max-w-md rounded-md text-black"
                />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Div 3: Tax Information */}
      <div className="p-4 bg-tertiary mb-4 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Tax Information</h2>
        
        {/* Conditional fields for USA */}
        {isUs ? (
          <>
            <div className="mb-6">
              <label className="block font-bold mb-2">Bank Account Number</label>
              <input
                type="text"
                value={vendorData.bank_account_number}
                onChange={(e) => handleChange('bank_account_number', e.target.value)}
                className="border p-2 w-full max-w-md rounded-md text-black"
              />
            </div>

            <div className="mb-6">
              <label className="block font-bold mb-2">Bank Routing Number</label>
              <input
                type="text"
                value={vendorData.bank_routing_number}
                onChange={(e) => handleChange('bank_routing_number', e.target.value)}
                className="border p-2 w-full max-w-md rounded-md text-black"
              />
            </div>

            {/* Upload W9 */}
            <div className="mb-6">
              <label className="block font-bold mb-2">Upload W9</label>
              <input
                type="file"
                onChange={(e) => handleChange('w9_w8_document_url', e.target.files[0])}
                className="border p-2 w-full max-w-md rounded-md text-black"
              />
            </div>
          </>
        ) : (
          <>
            <div className="mb-6">
              <label className="block font-bold mb-2">IBAN</label>
              <input
                type="text"
                value={vendorData.iban}
                onChange={(e) => handleChange('iban', e.target.value)}
                className="border p-2 w-full max-w-md rounded-md text-black"
              />
            </div>

            <div className="mb-6">
              <label className="block font-bold mb-2">SWIFT Code</label>
              <input
                type="text"
                value={vendorData.swift_code}
                onChange={(e) => handleChange('swift_code', e.target.value)}
                className="border p-2 w-full max-w-md rounded-md text-black"
              />
            </div>

            {/* Upload W8 */}
            <div className="mb-6">
              <label className="block font-bold mb-2">Upload W8</label>
              <input
                type="file"
                onChange={(e) => handleChange('w9_w8_document_url', e.target.files[0])}
                className="border p-2 w-full max-w-md rounded-md text-black"
              />
            </div>
          </>
        )}
      </div>

      {/* Submit/Save Button */}
      <div className="mt-8">
        <button
          onClick={handleSave}
          className="bg-button1 text-white px-6 py-3 rounded-md"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default VendorDashboard_Profile;

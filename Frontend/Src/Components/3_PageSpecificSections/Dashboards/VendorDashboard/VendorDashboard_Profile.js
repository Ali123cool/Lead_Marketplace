import React, { useState, useEffect } from 'react';
import { supabase } from '../../../../Api/SupabaseClient';
import countryList from 'react-select-country-list';
import DashboardFormField from '../../../2_Features/Dashboard/DashboardFormField';
import DashboardDropdown from '../../../2_Features/Dashboard/DashboardDropdown';
import DashboardButton from '../../../2_Features/Dashboard/DashboardButton';
import DashboardFileUpload from '../../../2_Features/Dashboard/DashboardFileUpload';
import DashboardCard from '../../../2_Features/Dashboard/DashboardCard';
import DashboardContainer from '../../../2_Features/Dashboard/DashboardContainer';

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

  const [countryOptions, setCountryOptions] = useState(countryList().getData());
  const [isUs, setIsUs] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('vendors')
        .select('*')
        .single();

      if (!error && data) {
        setVendorData(data);
        setIsUs(data.country === 'United States');
      }
    };

    fetchData();
  }, []);

  const handleChange = (field, value) => {
    setVendorData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    if (field === 'country' && value === 'United States') {
      setIsUs(true);
    } else if (field === 'country') {
      setIsUs(false);
    }
  };

  const handleSave = async () => {
    const { data, error } = await supabase
      .from('vendors')
      .update(vendorData)
      .eq('id', vendorData.id);

    if (!error) {
      alert('Profile updated successfully.');
    } else {
      console.error(error);
      alert('Failed to update profile.');
    }
  };

  return (
    <DashboardContainer className="text-white">

      {/* Account Information Card */}
      <DashboardCard className="mb-6">
        <h3 className="text-h3 mb-4">Account Information</h3>
        <div className="flex justify-between items-center mb-4">
          <span>Email: {vendorData.email}</span>
          <DashboardButton onClick={() => console.log('Navigate to change email')}>
            Change Email
          </DashboardButton>
        </div>
        <div className="flex justify-between items-center mb-4">
          <span>Password: ••••••••</span>
          <DashboardButton onClick={() => console.log('Navigate to change password')}>
            Change Password
          </DashboardButton>
        </div>
      </DashboardCard>

      {/* Personal Information Card */}
      <DashboardCard className="mb-6">
        <h3 className="text-h3 mb-4">Personal Information</h3>
        <DashboardFormField
          label="First Name"
          value={vendorData.first_name}
          onChange={(e) => handleChange('first_name', e.target.value)}
        />
        <DashboardFormField
          label="Last Name"
          value={vendorData.last_name}
          onChange={(e) => handleChange('last_name', e.target.value)}
        />
        <DashboardFormField
          label="Phone Number"
          value={vendorData.phone_number}
          onChange={(e) => handleChange('phone_number', e.target.value)}
        />
        <DashboardFormField
          label="Business Name"
          value={vendorData.business_name}
          onChange={(e) => handleChange('business_name', e.target.value)}
        />
      </DashboardCard>

      {/* Address Information Card */}
      <DashboardCard className="mb-6">
        <h3 className="text-h3 mb-4">Address Information</h3>
        <DashboardDropdown
          options={countryOptions}
          value={vendorData.country}
          onChange={(e) => handleChange('country', e.target.value)}
        />
        {isUs && (
          <>
            <DashboardFormField
              label="Street Address"
              value={vendorData.street_address}
              onChange={(e) => handleChange('street_address', e.target.value)}
            />
            <DashboardFormField
              label="Street Address 2"
              value={vendorData.street_address_2}
              onChange={(e) => handleChange('street_address_2', e.target.value)}
            />
            <DashboardFormField
              label="City"
              value={vendorData.city}
              onChange={(e) => handleChange('city', e.target.value)}
            />
            <DashboardDropdown
              options={usStates.map((state) => ({ value: state, label: state }))}
              value={vendorData.state}
              onChange={(e) => handleChange('state', e.target.value)}
            />
            <DashboardFormField
              label="Zip Code"
              value={vendorData.zip_code}
              onChange={(e) => handleChange('zip_code', e.target.value)}
            />
          </>
        )}
      </DashboardCard>

      {/* Tax Information Card */}
      <DashboardCard className="mb-6">
        <h3 className="text-h3 mb-4">Tax Information</h3>
        {isUs ? (
          <>
            <DashboardFormField
              label="Bank Account Number"
              value={vendorData.bank_account_number}
              onChange={(e) => handleChange('bank_account_number', e.target.value)}
            />
            <DashboardFormField
              label="Bank Routing Number"
              value={vendorData.bank_routing_number}
              onChange={(e) => handleChange('bank_routing_number', e.target.value)}
            />
            <DashboardFileUpload
              onFileUpload={(file) => handleChange('w9_w8_document_url', file)}
            />
          </>
        ) : (
          <>
            <DashboardFormField
              label="IBAN"
              value={vendorData.iban}
              onChange={(e) => handleChange('iban', e.target.value)}
            />
            <DashboardFormField
              label="SWIFT Code"
              value={vendorData.swift_code}
              onChange={(e) => handleChange('swift_code', e.target.value)}
            />
            <DashboardFileUpload
              onFileUpload={(file) => handleChange('w9_w8_document_url', file)}
            />
          </>
        )}
      </DashboardCard>

      {/* Save Button */}
      <div className="text-center mt-8">
        <DashboardButton styleType="btn-1" onClick={handleSave}>
          Save Changes
        </DashboardButton>
      </div>
    </DashboardContainer>
  );
};

export default VendorDashboard_Profile;

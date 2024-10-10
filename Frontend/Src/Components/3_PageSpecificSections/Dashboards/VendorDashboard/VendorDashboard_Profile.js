// Src/Components/3_PageSpecificSections/Dashboards/VendorDashboard/VendorDashboard_Profile.js

import React, { useState, useEffect } from 'react';
import { supabase } from '../../../../Api/SupabaseClient';
import { useNavigate } from 'react-router-dom';

import DashboardFormField from '../../../2_Features/Dashboard/DashboardFormField';
import DashboardDropdown from '../../../2_Features/Dashboard/DashboardDropdown';
import DashboardButton from '../../../2_Features/Dashboard/DashboardButton';
import DashboardFileUpload from '../../../2_Features/Dashboard/DashboardFileUpload';
import DashboardCard from '../../../2_Features/Dashboard/DashboardCard';
import DashboardContainer from '../../../2_Features/Dashboard/DashboardContainer';
import DashboardTooltip from '../../../2_Features/Dashboard/DashboardTooltip';
import DashboardAlert from '../../../2_Features/Dashboard/DashboardAlert';
import { handleSaveChanges, fetchUserFiles } from '../../../../HelperFunctions/Dashboard/VendorDashboard/SaveProfileToDatabase'; 

const allowedCountries = [
  { value: 'United States', label: 'United States' },
  { value: 'Canada', label: 'Canada' },
  { value: 'United Kingdom', label: 'United Kingdom' },
  { value: 'Australia', label: 'Australia' }
];

const usStates = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
  'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
  'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
  'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
  'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
  'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming', 'District of Columbia'
];

const VendorDashboard_Profile = () => {
  const navigate = useNavigate();

  const [vendorData, setVendorData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    business_name: '',
    street_address: '',
    street_address_2: '',
    city: '',
    state: '',
    zip_code: '',
    country: 'United States',
    id: '',
    w9_w8_uploaded: false,
  });

  const [isUs, setIsUs] = useState(vendorData.country === 'United States');
  const [isUnsavedChanges, setIsUnsavedChanges] = useState(false);

  const [selectedFiles, setSelectedFiles] = useState([]);

  const [alert, setAlert] = useState({ type: '', message: '', visible: false });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();

        if (error) {
          setAlert({ type: 'error', message: 'Authentication error. Please log in again.', visible: true });
          return;
        }

        const user = data.user;

        if (user) {
          const { data: userData, error: userError } = await supabase
            .from('users_meta')
            .select('*')
            .eq('id', user.id)
            .single();

          if (!userError && userData) {
            const country = userData.country && userData.country.trim() !== '' ? userData.country : 'United States';
            setVendorData({
              ...userData,
              id: user.id,
              email: user.email,
              country,
            });
            setIsUs(country === 'United States');
          } else {
            setAlert({ type: 'error', message: 'Failed to fetch user data.', visible: true });
          }
        } else {
          setAlert({ type: 'error', message: 'User not authenticated.', visible: true });
        }
      } catch (error) {
        setAlert({ type: 'error', message: 'An unexpected error occurred.', visible: true });
      }
    };

    fetchData();

    const handleBeforeUnload = (event) => {
      if (isUnsavedChanges) {
        event.preventDefault();
        event.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isUnsavedChanges]);

  const handleFileSelection = (files) => {
    setSelectedFiles(files);
    setIsUnsavedChanges(true);
  };

  const handleFileDelete = (fileName) => {
    setSelectedFiles((prevFiles) => prevFiles.filter(file => file.name !== fileName));
    setIsUnsavedChanges(true);
  };

  const handleSave = async () => {
    if (!vendorData.id) {
      setAlert({ type: 'error', message: 'Vendor ID is missing. Please reload the page and try again.', visible: true });
      return;
    }

    try {
      await handleSaveChanges(vendorData, selectedFiles);
      setIsUnsavedChanges(false);
      setAlert({ type: 'success', message: 'Profile and documents updated successfully.', visible: true });
      setSelectedFiles([]);
    } catch (error) {
      setAlert({ type: 'error', message: 'Failed to save changes. Please try again.', visible: true });
    }
  };

  const handleChange = (field, value) => {
    setVendorData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    if (field === 'country') {
      setIsUs(value === 'United States');
    }
    setIsUnsavedChanges(true);
  };

  const UploadStatus = ({ w9W8Uploaded }) => {
    if (w9W8Uploaded) {
      return (
        <div className="mt-4 p-4 bg-green-600 rounded">
          <p className="text-white">Your W9/W8 document has been successfully uploaded.</p>
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <DashboardContainer className="text-white">
      {alert.visible && (
        <DashboardAlert 
          type={alert.type} 
          message={alert.message} 
          onClose={() => setAlert({ ...alert, visible: false })} 
        />
      )}
      <div className="flex flex-wrap gap-4 justify-center">
        {/* Account Information Card */}
        <DashboardCard>
          <h3 className="text-h3 mb-4">Account Information</h3>
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
            <span>Email: {vendorData.email}</span>
            <div className="flex justify-end w-full md:w-auto">
              <DashboardButton
                className="w-full md:w-auto flex-shrink-0 mx-2"
                onClick={() => navigate('/vendor-dashboard/change-email')}
              >
                Change Email
              </DashboardButton>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
            <span>Password: ••••••••</span>
            <div className="flex justify-end w-full md:w-auto">
              <DashboardButton
                className="w-full md:w-auto flex-shrink-0 mx-2"
                onClick={() => navigate('/vendor-dashboard/change-password')}
              >
                Change Password
              </DashboardButton>
            </div>
          </div>
        </DashboardCard>

        {/* Personal Information Card */}
        <DashboardCard className="flex-grow">
          <h3 className="text-h3 mb-4">Personal Information</h3>
          <DashboardFormField
            label="First Name"
            value={vendorData.first_name}
            onChange={(e) => handleChange('first_name', e.target.value)}
            onBlur={() => setIsUnsavedChanges(true)}
            autoComplete="given-name"
          />
          <DashboardFormField
            label="Last Name"
            value={vendorData.last_name}
            onChange={(e) => handleChange('last_name', e.target.value)}
            onBlur={() => setIsUnsavedChanges(true)}
            autoComplete="family-name"
          />
          <DashboardFormField
            label="Phone Number"
            value={vendorData.phone_number}
            onChange={(e) => handleChange('phone_number', e.target.value)}
            onBlur={() => setIsUnsavedChanges(true)}
            autoComplete="tel"
          />
          <DashboardFormField
            label="Business Name"
            value={vendorData.business_name}
            onChange={(e) => handleChange('business_name', e.target.value)}
            onBlur={() => setIsUnsavedChanges(true)}
            autoComplete="organization"
          />
        </DashboardCard>

        {/* Address Information Card */}
        <DashboardCard>
          <h3 className="text-h3 mb-4">Address Information</h3>
          <DashboardDropdown
            label="Country"
            options={allowedCountries}
            value={vendorData.country}
            onChange={(e) => handleChange('country', e.target.value)}
            autoComplete="country"
          />

          {isUs && (
            <>
              <DashboardFormField
                label="Street Address"
                value={vendorData.street_address}
                onChange={(e) => handleChange('street_address', e.target.value)}
                onBlur={() => setIsUnsavedChanges(true)}
                autoComplete="address-line1"
              />
              <DashboardFormField
                label="Street Address 2"
                value={vendorData.street_address_2}
                onChange={(e) => handleChange('street_address_2', e.target.value)}
                onBlur={() => setIsUnsavedChanges(true)}
                autoComplete="address-line2"
              />
              <DashboardFormField
                label="City"
                value={vendorData.city}
                onChange={(e) => handleChange('city', e.target.value)}
                onBlur={() => setIsUnsavedChanges(true)}
                autoComplete="address-level2"
              />
              <DashboardDropdown
                label="State"
                options={usStates.map((state) => ({ value: state, label: state }))}
                value={vendorData.state || ''}
                onChange={(e) => handleChange('state', e.target.value)}
                autoComplete="address-level1"
              />
              <DashboardFormField
                label="Zip Code"
                value={vendorData.zip_code}
                onChange={(e) => handleChange('zip_code', e.target.value)}
                onBlur={() => setIsUnsavedChanges(true)}
                autoComplete="postal-code"
              />
            </>
          )}
        </DashboardCard>

        {/* Tax Information Card */}
        <DashboardCard className="flex-grow">
          <h3 className="text-h3 mb-4">Tax Information</h3>
          <DashboardFileUpload 
            onFileUpload={handleFileSelection} 
            selectedFiles={selectedFiles}
            onFileDelete={handleFileDelete}
            customMessage="Drag and drop your W9/W8 document here, or click to select a file"
            maxFiles={5}
          />
          <div className="relative flex items-center mt-2">
            {isUs ? (
              <>
                <a
                  href="https://www.irs.gov/pub/irs-pdf/fw9.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  Download W9 Template
                </a>
                <DashboardTooltip text="This is the official W9 form used for tax purposes in the United States." />
              </>
            ) : (
              <>
                <a
                  href="https://www.irs.gov/pub/irs-pdf/fw8ben.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  Download W-8BEN Template (for Individuals)
                </a>
                <DashboardTooltip text="This is the official W-8BEN form for international individuals." />
              </>
            )}
          </div>
          {!isUs && (
            <div className="relative flex items-center mt-2">
              <a
                href="https://www.irs.gov/pub/irs-pdf/fw8bene.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Download W-8BEN-E Template (for Companies)
              </a>
              <DashboardTooltip text="This is the official W-8BEN-E form for international entities/companies." />
            </div>
          )}

          {/* Display Upload Status */}
          <UploadStatus w9W8Uploaded={vendorData.w9_w8_uploaded} />
        </DashboardCard>
      </div>

      {/* Save Button */}
      <div className="text-center mt-8">
        <DashboardButton styleType="btn-1" onClick={handleSave}>
          Save Changes
        </DashboardButton>
      </div>
    </DashboardContainer>
  );
};

// Component to display upload status
const UploadStatus = ({ w9W8Uploaded }) => {
  if (w9W8Uploaded) {
    return (
      <div className="mt-4 p-4 bg-green-600 rounded">
        <p className="text-white">Your W9/W8 document has been successfully uploaded.</p>
      </div>
    );
  } else {
    return null;
  }
};

export default VendorDashboard_Profile;

// Src/HelperFunctions/Dashboard/VendorDashboard/SaveProfileToDatabase.js

import { supabase } from '../../../Api/SupabaseClient';

// Helper function to save profile information to Supabase
export const saveProfileToDatabase = async (vendorData) => {
  try {
    const { data, error } = await supabase
      .from('users_meta')
      .update({
        email: vendorData.email,
        first_name: vendorData.first_name,
        last_name: vendorData.last_name,
        phone_number: vendorData.phone_number,
        business_name: vendorData.business_name,
        street_address: vendorData.street_address,
        street_address_2: vendorData.street_address_2,
        city: vendorData.city,
        state: vendorData.state,
        zip_code: vendorData.zip_code,
        country: vendorData.country,
        updated_at: new Date().toISOString(),
      })
      .eq('id', vendorData.id);

    if (error) {
      throw new Error('Failed to update profile. Supabase error: ' + error.message);
    }

    return data;

  } catch (error) {
    throw error;
  }
};

// Upload a single file to the storage bucket in a user-specific folder with versioning
export const uploadFile = async (file, vendorData) => {
  if (!file || !vendorData) {
    console.error("File or Vendor Data is missing.");
    return null;
  }

  const userId = vendorData.id;
  const baseFileName = `W9TaxDocument`;
  const fileExtension = file.name.split('.').pop();
  const userFolder = `${userId}/`;

  try {
    const { data: existingFiles, error: listError } = await supabase
      .storage
      .from('w9_w8_documents')
      .list(userFolder, { limit: 100 });

    if (listError) {
      throw listError;
    }

    const matchingFiles = existingFiles.filter(f => f.name.startsWith(`${baseFileName}`));

    let version = 1;
    if (matchingFiles.length > 0) {
      const versionNumbers = matchingFiles.map(f => {
        const match = f.name.match(/_v(\d+)\./);
        return match ? parseInt(match[1], 10) : 1;
      });
      version = Math.max(...versionNumbers) + 1;
    }

    const newFileName = version === 1 
      ? `${baseFileName}.${fileExtension}` 
      : `${baseFileName}_v${version}.${fileExtension}`;
    
    const filePath = `${userFolder}${newFileName}`;

    const { data, error } = await supabase
      .storage
      .from('w9_w8_documents')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      throw error;
    }

    return filePath;

  } catch (error) {
    return null;
  }
};

// Update the users_meta table to set w9_w8_uploaded to true
export const updateW9W8UploadedStatus = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('users_meta')
      .update({ w9_w8_uploaded: true, updated_at: new Date().toISOString() })
      .eq('id', userId);

    if (error) {
      throw new Error('Failed to update upload status. Supabase error: ' + error.message);
    }

    return data;

  } catch (error) {
    throw error;
  }
};

// Handle the entire profile and file upload process
export const handleSaveChanges = async (vendorData, files) => {
  try {
    // Save Profile Data
    await saveProfileToDatabase(vendorData);

    // Handle File Uploads
    if (files && files.length > 0) {
      for (const file of files) {
        const filePath = await uploadFile(file, vendorData);
        if (!filePath) {
          throw new Error(`Failed to upload file: ${file.name}`);
        }
        // After successful upload, update the w9_w8_uploaded status
        await updateW9W8UploadedStatus(vendorData.id);
      }
    }

    return true;

  } catch (error) {
    throw error;
  }
};

// Fetch user files from Supabase storage
export const fetchUserFiles = async (userId) => {
  try {
    const userFolder = `${userId}/`;
    const { data: files, error } = await supabase
      .storage
      .from('w9_w8_documents')
      .list(userFolder, { limit: 100 });

    if (error) {
      throw error;
    }

    return files.map(file => file.name);
  } catch (error) {
    throw error;
  }
};

// Get the latest version of W9TaxDocument
export const getLatestW9TaxDocument = (uploadedFiles) => {
  const w9Files = uploadedFiles.filter(fileName => fileName.startsWith('W9TaxDocument'));
  if (w9Files.length === 0) return null;

  const sortedFiles = w9Files.sort((a, b) => {
    const versionA = parseInt(a.match(/_v(\d+)\./)?.[1] || '1', 10);
    const versionB = parseInt(b.match(/_v(\d+)\./)?.[1] || '1', 10);
    return versionB - versionA;
  });

  return sortedFiles[0];
};

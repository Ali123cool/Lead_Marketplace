// Src/HelperFunctions/Dashboard/VendorDashboard/SaveVendorTaxDocuments.js

import { supabase } from '../../../Api/SupabaseClient';

// Upload the file to the storage bucket
async function uploadFile(file, userId) {
  if (!file || !userId) {
    console.error("File or User ID is missing.");
    return null;
  }

  // Construct file name as 'userid_w9document.pdf'
  const fileExtension = file.name.split('.').pop();
  const sanitizedFileName = file.name.replace(/\s+/g, '_'); // Replace spaces with underscores
  const filePath = `${userId}_w9document.${fileExtension}`;

  console.log(`Uploading file at path: ${filePath}`);

  try {
    const { data, error } = await supabase
      .storage
      .from('w9_w8_documents')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,  // Prevent overwriting files
      });

    if (error) {
      throw error;
    }

    console.log('File uploaded successfully:', data);
    return data.path;  // 'path' corresponds to the 'name' column in 'storage.objects'

  } catch (error) {
    console.error('Error uploading file:', error.message);
    return null;
  }
}

// Generate a signed URL for the uploaded file
async function getSignedUrl(filePath) {
  if (!filePath) {
    console.error("File path is missing.");
    return null;
  }

  try {
    const { data, error } = await supabase
      .storage
      .from('w9_w8_documents')
      .createSignedUrl(filePath, 60 * 60);  // URL valid for 1 hour

    if (error) {
      throw error;
    }

    console.log('Signed URL:', data.signedUrl);
    return data.signedUrl;

  } catch (error) {
    console.error('Error creating signed URL:', error.message);
    return null;
  }
}

// Save the signed URL to the user's metadata
async function saveDocumentUrl(userId, documentUrl) {
  if (!userId || !documentUrl) {
    console.error("User ID or Document URL is missing.");
    return false;
  }

  try {
    const { error } = await supabase
      .from('users_meta')
      .update({ w9_w8_document_url: documentUrl })  // Update the user's metadata
      .eq('user_id', userId);  // Ensure this matches your table's schema

    if (error) {
      throw error;
    }

    console.log('Document URL saved successfully');
    return true;

  } catch (error) {
    console.error('Error updating user metadata:', error.message);
    return false;
  }
}

// Handle the entire file upload process
async function handleFileUpload(file, userId) {
  console.log("Starting file upload process for user:", userId);
  
  // Upload the file
  const filePath = await uploadFile(file, userId);
  if (!filePath) {
    console.error("File path is missing after upload. Aborting...");
    return null;
  }

  // Generate signed URL
  const signedUrl = await getSignedUrl(filePath);
  if (!signedUrl) {
    console.error("Signed URL is missing after generation. Aborting...");
    return null;
  }

  // Save the signed URL to the user's metadata
  const success = await saveDocumentUrl(userId, signedUrl);
  if (success) {
    console.log('File upload process completed successfully');
    return signedUrl; // Return the signed URL for further usage
  } else {
    console.error("Failed to save document URL. Aborting...");
    return null;
  }
}

export { handleFileUpload };

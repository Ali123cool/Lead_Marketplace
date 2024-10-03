import { supabase } from '../../Api/SupabaseClient';

// Function to handle user signup and metadata insertion
export const registerUser = async (email, password, accountType) => {
  try {
    // Step 1: Check if the user already exists in the users_meta table
    const { data: existingUserMeta, error: userMetaError } = await supabase
      .from('users_meta')
      .select('email')
      .eq('email', email)
      .single();

    if (userMetaError && userMetaError.code !== 'PGRST116') {
      // If an unexpected error occurs (other than no record found), handle it
      console.error('Error checking users_meta:', userMetaError.message);
      throw new Error('An error occurred. Please try again later.');
    }

    if (existingUserMeta) {
      // Email already exists in users_meta
      return { success: false, message: 'An error occurred. Only one account can be associated with an email.' };
    }

    // Step 2: Register the user using Supabase auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error('Registration error:', error.message); // Log the actual error for debugging
      throw new Error('Registration failed. Please try again.'); // Generic error message for users
    }

    // Step 3: Insert user metadata into 'users_meta' table
    const userId = data.user.id; // Get user ID from the response
    const { error: metaError } = await supabase
      .from('users_meta')
      .insert({
        id: userId,
        email,
        account_type: accountType,
        created_at: new Date().toISOString(), // Optional: ensure created_at is set to the current time
        updated_at: new Date().toISOString(), // Optional: set updated_at to current time initially
      });

    if (metaError) {
      console.error('Metadata insertion error:', metaError.message); // Log the actual error
      throw new Error('Registration succeeded, but metadata insertion failed.');
    }

    return { success: true, message: 'Registration successful. Please check your email to verify your account.' };
  } catch (err) {
    return { success: false, message: err.message };
  }
};

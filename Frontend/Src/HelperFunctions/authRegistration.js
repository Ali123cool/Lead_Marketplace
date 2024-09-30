import { supabase } from '../Api/supabaseClient';

// Function to handle user signup and metadata insertion
export const registerUser = async (email, password, accountType) => {
  try {
    // Step 1: Register the user using Supabase auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw new Error('Registration failed: ' + error.message);
    }

    // Step 2: Insert user metadata into 'users_meta' table
    const userId = data.user.id; // Get user ID from the response
    const { error: metaError } = await supabase
      .from('users_meta')
      .insert({
        id: userId,
        email,
        account_type: accountType,
      });

    if (metaError) {
      throw new Error('Error adding metadata: ' + metaError.message);
    }

    return { success: true };
  } catch (err) {
    // Handle and return errors
    return { success: false, message: err.message };
  }
};

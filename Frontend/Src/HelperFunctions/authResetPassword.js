// Helper function for resetting the user's password
import { supabase } from '../Api/supabaseClient'; // Assuming Supabase is already initialized

export const resetUserPassword = async (email) => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      // Returning a generic error message for the user
      return { success: false, message: 'Failed to send password reset email. Please try again.' };
    }
    return { success: true, message: 'If an account exists, a password reset email has been sent.' };
  } catch (err) {
    // Catch any unexpected errors
    return { success: false, message: 'Something went wrong, please try again.' };
  }
};

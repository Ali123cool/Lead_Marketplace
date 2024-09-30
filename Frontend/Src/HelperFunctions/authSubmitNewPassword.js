import { supabase } from '../Api/supabaseClient';

// Helper function to update the user's password using the reset token and new password
export const submitNewPassword = async (accessToken, newPassword) => {
  try {
    const { error } = await supabase.auth.updateUser({
      access_token: accessToken,
      password: newPassword,
    });

    if (error) {
      return { success: false, message: 'Failed to update password. Please try again.' };
    }
    return { success: true, message: 'Password updated successfully.' };
  } catch (err) {
    return { success: false, message: 'Something went wrong. Please try again.' };
  }
};

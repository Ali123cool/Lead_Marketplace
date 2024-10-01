import { supabase } from '../Api/supabaseClient';

export const authResetPassword = async (email) => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/new-password`,
    });

    if (error) {
      return { success: false, message: 'Failed to send password reset email. Please try again.' };
    }

    return { success: true, message: 'If an account exists, a password reset email has been sent.' };
  } catch (err) {
    return { success: false, message: 'Something went wrong. Please try again.' };
  }
};
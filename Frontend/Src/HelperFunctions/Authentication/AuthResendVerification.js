import { supabase } from '../../Api/supabaseClient';

export const resendVerificationEmail = async (email) => {
  try {
    // Resend verification email through Supabase
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: email, // The email submitted
    });

    if (error) {
      return { success: false, message: 'Failed to resend verification email: ' + error.message };
    }

    return { success: true, message: 'If an account exists, a verification email has been sent.' };
  } catch (err) {
    return { success: false, message: 'Something went wrong, please try again.' };
  }
};

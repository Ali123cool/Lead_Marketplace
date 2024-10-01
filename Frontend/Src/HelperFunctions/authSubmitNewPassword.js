import { supabase } from '../Api/supabaseClient';

export const submitNewPassword = async (newPassword) => {
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      return { success: false, message: 'Failed to reset the password. Please try again.' };
    }

    return { success: true, message: 'Password successfully updated.' };
  } catch (err) {
    return { success: false, message: 'Something went wrong, please try again.' };
  }
};
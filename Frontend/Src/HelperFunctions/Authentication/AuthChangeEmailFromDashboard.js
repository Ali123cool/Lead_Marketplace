import { supabase } from '../../Api/SupabaseClient';

export const updateEmail = async (newEmail, onLogout) => {
  try {
    // Step 1: Update the email in the auth.users table
    const { error: authError, data: authData } = await supabase.auth.updateUser({ email: newEmail });

    if (authError) {
      throw new Error(authError.message);
    }

    console.log('Email updated successfully in auth.users');

    // Step 2: Update the email in the users_meta table
    const userId = authData?.user?.id; // Get the user ID from the auth response
    if (!userId) {
      throw new Error('User ID not found after updating the email in auth.');
    }

    const { error: metaError } = await supabase
      .from('users_meta')
      .update({ email: newEmail })
      .eq('id', userId); // Ensure the correct user is updated based on the user ID

    if (metaError) {
      throw new Error('Failed to update email in users_meta.');
    }

    console.log('Email updated successfully in users_meta');

    // Step 3: Wait for 10 seconds before logging the user out
    setTimeout(async () => {
      const { error: logoutError } = await supabase.auth.signOut();
      if (logoutError) {
        throw new Error(logoutError.message);
      }

      if (onLogout) {
        onLogout(); // Trigger navigation or callback after logging out
      }

    }, 10000); // 10 seconds delay for logout

    return true; // Successfully updated email
  } catch (error) {
    console.error('Error during email update process:', error.message);
    throw error;
  }
};

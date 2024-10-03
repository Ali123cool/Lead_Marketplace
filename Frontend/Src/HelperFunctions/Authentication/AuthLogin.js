import { supabase } from '../../Api/SupabaseClient'; // Supabase client

// Function to log in the user and fetch their role
export const authLogin = async (email, password) => {
  try {
    // Attempt to log in via Supabase
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error('Invalid login credentials');  // Throw error if credentials are invalid

    // Fetch user role from users_meta table
    const { data: roleData, error: roleError } = await supabase
      .from('users_meta')
      .select('account_type')
      .eq('email', email)
      .single();

    if (roleError || !roleData) {
      throw new Error('Unable to fetch user role');
    }

    // Return user data and role
    return {
      user: data.user,
      role: roleData.account_type,
    };
  } catch (err) {
    throw new Error(`Login failed: ${err.message}`);
  }
};

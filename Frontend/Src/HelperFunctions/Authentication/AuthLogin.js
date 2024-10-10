import { supabase } from '../../Api/SupabaseClient'; // Supabase client

// Function to check the role in users_meta before attempting login
export const authLogin = async (email, password) => {
  try {
    // Fetch user role from users_meta table first
    const { data: roleData, error: roleError } = await supabase
      .from('users_meta')
      .select('account_type')
      .eq('email', email)
      .single();

    if (roleError || !roleData) {
      throw new Error('User role not found or invalid');
    }

    // If role is found, attempt to log in via Supabase
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error('Invalid login credentials');  // Throw error if credentials are invalid

    // Return user data and role
    return {
      user: data.user,
      role: roleData.account_type,
    };
  } catch (err) {
    throw new Error(`Login failed: ${err.message}`);
  }
};

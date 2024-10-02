import { supabase } from '../../Api/supabaseClient'; // Supabase client

// Function to log out the user and clear any frontend storage
export const authLogoff = async () => {
  try {
    // Log out from Supabase, which removes the session server-side
    await supabase.auth.signOut();
    
    // Clear any client-side storage if used (localStorage/sessionStorage)
    localStorage.clear(); // Adjust if using sessionStorage or custom logic

    // Optional: If you have any custom state or cache in your app, clear it here
    
    return true;
  } catch (err) {
    throw new Error('Logout failed: ' + err.message);
  }
};

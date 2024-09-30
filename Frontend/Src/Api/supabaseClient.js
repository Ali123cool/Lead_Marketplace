import { createClient } from '@supabase/supabase-js';

// Use the public anonymous key here, not the service role key
const supabaseUrl = 'https://hrncgfvumejvvsivzibd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhybmNnZnZ1bWVqdnZzaXZ6aWJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY4ODg4NDksImV4cCI6MjA0MjQ2NDg0OX0.MIfpYcPNkd3_vNFDckBQ8RBXIkb_rw3Vn8C1_uKbsOc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

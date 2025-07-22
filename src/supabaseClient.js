const { createClient } = require('@supabase/supabase-js');

// Get environment variables
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Check if required environment variables are present
if (!supabaseUrl) {
  console.error('Missing REACT_APP_SUPABASE_URL environment variable');
  console.log('Please add your Supabase URL to the .env file');
}

if (!supabaseAnonKey) {
  console.error('Missing REACT_APP_SUPABASE_ANON_KEY environment variable');
  console.log('Please add your Supabase anon key to the .env file');
}

// Create Supabase client with fallback values to prevent crashes
const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder_key'
);

module.exports = supabase;
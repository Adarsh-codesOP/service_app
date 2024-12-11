import { createClient } from '@supabase/supabase-js';

const supabaseUrl = '';
const supabaseKey = '';

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase credentials');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Test the connection
const testConnection = async () => {
  try {
    const { data, error } = await supabase
      .from('job_listings')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error('Database connection error:', error);
    } else {
      console.log('Database connected successfully:', data);
    }
  } catch (err) {
    console.error('Connection test failed:', err);
  }
};

// Run the test
testConnection();

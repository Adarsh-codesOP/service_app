import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xqejbzprbqsaltfwiwpn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhxZWpienByYnFzYWx0Zndpd3BuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM4NDAzODEsImV4cCI6MjA0OTQxNjM4MX0.fwRabDHeBv8oS3N6NLGqNJcVIISvKTsfklhiJEThunI';

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
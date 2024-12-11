import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xqejbzprbqsaltfwiwpn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhxZWpienByYnFzYWx0Zndpd3BuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM4NDAzODEsImV4cCI6MjA0OTQxNjM4MX0.fwRabDHeBv8oS3N6NLGqNJcVIISvKTsfklhiJEThunI';
const supabase = createClient(supabaseUrl, supabaseKey);

const testServices = [
  {
    title: 'House Cleaning',
    category: 'Cleaning',
    location: 'Mumbai',
    price: 1500
  },
  {
    title: 'Plumbing Service',
    category: 'Maintenance',
    location: 'Delhi',
    price: 800
  },
  {
    title: 'Electrical Repair',
    category: 'Maintenance',
    location: 'Bangalore',
    price: 1000
  }
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { data, error } = await supabase
        .from('listings')
        .insert(testServices)
        .select();

      if (error) throw error;

      res.status(200).json({ message: 'Services added successfully', data });
    } catch (error) {
      res.status(500).json({ error: 'Failed to add services' });
    }
  }
} 
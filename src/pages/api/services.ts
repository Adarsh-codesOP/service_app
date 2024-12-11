import { createClient } from '@supabase/supabase-js';
import type { NextApiRequest, NextApiResponse } from 'next';

const supabaseUrl = 'https://xqejbzprbqsaltfwiwpn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhxZWpienByYnFzYWx0Zndpd3BuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM4NDAzODEsImV4cCI6MjA0OTQxNjM4MX0.fwRabDHeBv8oS3N6NLGqNJcVIISvKTsfklhiJEThunI';
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const { data, error } = await supabase
        .from('listings')
        .select('*');

      if (error) throw error;

      res.status(200).json(data || []);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch services' });
    }
  }
} 
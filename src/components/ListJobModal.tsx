import React, { useState } from 'react';
import { X } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface ListJobModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ListJobModal({ isOpen, onClose }: ListJobModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    price: '',
    location: '',
    contact_info: '',
    email: ''
  });

  const categories = [
    'Select Category',
    'AC Repair',
    'Electrical',
    'Plumbing',
    'Carpentry',
    'Painting',
    'Pest Control',
    'Appliance Repair',
    'Mechanical',
    'Other'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.title || !formData.email) {
      alert('Please fill in all required fields');
      return;
    }

    // Prepare the data
    const jobData = {
      title: formData.title,
      category: formData.category || 'General',
      description: formData.description,
      price: parseFloat(formData.price) || 0,
      location: formData.location,
      contact_info: formData.contact_info,
      email: formData.email,
      created_at: new Date().toISOString()
    };

    try {
      // Direct insert using fetch
      const response = await fetch('https://xqejbzprbqsaltfwiwpn.supabase.co/rest/v1/job_listings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhxZWpienByYnFzYWx0Zndpd3BuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM4NDAzODEsImV4cCI6MjA0OTQxNjM4MX0.fwRabDHeBv8oS3N6NLGqNJcVIISvKTsfklhiJEThunI',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhxZWpienByYnFzYWx0Zndpd3BuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM4NDAzODEsImV4cCI6MjA0OTQxNjM4MX0.fwRabDHeBv8oS3N6NLGqNJcVIISvKTsfklhiJEThunI',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify(jobData)
      });

      if (!response.ok) {
        throw new Error('Failed to submit');
      }

      alert('Service listed successfully!');
      
      // Clear form
      setFormData({
        title: '',
        category: '',
        description: '',
        price: '',
        location: '',
        contact_info: '',
        email: ''
      });
      
      onClose();
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to list service. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50">
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>

          <h2 className="text-2xl font-bold mb-6">List Your Service</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full p-2 border rounded"
              >
                {categories.map((category) => (
                  <option 
                    key={category} 
                    value={category === 'Select Category' ? '' : category}
                    disabled={category === 'Select Category'}
                  >
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-2 border rounded"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Price</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full p-2 border rounded"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Contact Info</label>
              <input
                type="text"
                value={formData.contact_info}
                onChange={(e) => setFormData({ ...formData, contact_info: e.target.value })}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-2 border rounded"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 
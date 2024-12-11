import React from 'react';

interface JobListing {
  id: string;
  title: string;
  category: string;
  description: string;
  price: number;
  location: string;
  contact_info: string;
  email: string;
  created_at: string;
}

interface JobCardProps {
  job: JobListing;
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
          <p className="text-sm text-gray-500 mt-1">{job.category}</p>
        </div>
        <span className="text-lg font-bold text-indigo-600">₹{job.price}</span>
      </div>
      
      <p className="text-gray-600 mt-4">{job.description}</p>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center text-sm text-gray-500">
          <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {job.location}
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <button 
            onClick={() => window.location.href = `tel:${job.contact_info}`}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Contact Provider
          </button>
          <span className="text-sm text-gray-500">
            Posted {new Date(job.created_at).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );
} 
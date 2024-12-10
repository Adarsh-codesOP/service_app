import React from 'react';
import { Shield, Clock, Award, Search } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative bg-gradient-to-r from-indigo-600 to-indigo-800 text-white">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=2069"
          alt="Professional service"
          className="w-full h-full object-cover opacity-10"
        />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Your One-Stop Solution for Professional Services
          </h1>
          <p className="text-xl mb-8 text-indigo-100">
            Connect with verified experts for all your home service needs. Quality work, guaranteed satisfaction.
          </p>
          
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="What service do you need today?"
                className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors">
                Search
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center justify-center space-x-2">
              <Shield className="h-6 w-6" />
              <span className="text-lg">Verified Professionals</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Clock className="h-6 w-6" />
              <span className="text-lg">24/7 Availability</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Award className="h-6 w-6" />
              <span className="text-lg">Satisfaction Guaranteed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
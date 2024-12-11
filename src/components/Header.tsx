import React, { useState } from 'react';
import { Plus, ShoppingCart, LogOut } from 'lucide-react';
import ListJobModal from './ListJobModal';

export default function Header() {
  const [isListJobModalOpen, setIsListJobModalOpen] = useState(false);

  // Handle Logout
  const handleLogout = () => {
    // Remove the auth token from localStorage to log the user out
    localStorage.removeItem('authToken');
    
    // Redirect user to login page
    window.location.href = '/login'; // Redirect to login page
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            {/* Adjusted SVG Logo */}
            <svg
  xmlns="http://www.w3.org/2000/svg"
  className="h-14 w-14 text-indigo-600 mr-2"  // Increased the size to h-10 w-10
  viewBox="0 0 472 740"
  fill="none"
  stroke="black"
>
  <path 
    d="M471.5 395C471.5 492.449 387.36 571.5 283.5 571.5C179.64 571.5 95.5 492.449 95.5 395C95.5 297.551 179.64 218.5 283.5 218.5C387.36 218.5 471.5 297.551 471.5 395Z" 
    fill="#0099FF" 
    stroke="black" 
  />
  <path 
    d="M150.5 304.634L151.498 271.669L436.547 280.303L214.693 479.318L416.748 485.438L415.75 518.403L130.7 509.769L352.555 310.754L150.5 304.634Z" 
    fill="#FEFEFE" 
  />
  <path 
    d="M268.078 181.21H307.957V580H258.583V239.446C248.455 246.409 237.8 251.789 226.617 255.587C215.645 259.174 204.567 261.179 193.384 261.601V213.493C206.677 211.594 219.548 208.112 231.997 203.048C244.657 197.984 256.684 190.705 268.078 181.21Z" 
    fill="black" 
  />
  <rect 
    x="256.481" 
    y="274.991" 
    width="60.6352" 
    height="35.7808" 
    transform="rotate(2.08934 256.481 274.991)" 
    fill="#FEFEFE" 
  />
  <rect 
    x="258.63" 
    y="480.485" 
    width="50.5963" 
    height="32.8274" 
    transform="rotate(1.92414 258.63 480.485)" 
    fill="#FEFEFE" 
  />
</svg>

            
            {/* Company Name */}
            <h1 className="text-2xl font-bold text-indigo-600">ZETAONE</h1>
          </div>

          <div className="flex items-center space-x-4">
            {/* List Job Button */}
            <button
              onClick={() => setIsListJobModalOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              aria-label="List Service"
            >
              <Plus className="h-4 w-4 mr-2" />
              List Service
            </button>

            {/* Shopping Cart Button */}
            <button
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-200"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="h-5 w-5" />
            </button>

            {/* Profile Picture (Avatar) */}
            <div className="relative">
              <img
                src="https://static.vecteezy.com/system/resources/previews/020/765/399/original/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg" // Replace with user's profile picture URL
                alt="User Profile"
                className="h-10 w-10 rounded-full border-2 border-indigo-600 cursor-pointer"
                title="Profile"
              />
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-red-600 hover:text-red-800"
              aria-label="Logout"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* ListJobModal */}
      <ListJobModal
        isOpen={isListJobModalOpen}
        onClose={() => setIsListJobModalOpen(false)}
      />
    </header>
  );
}

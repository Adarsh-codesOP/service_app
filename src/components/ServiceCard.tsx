import React, { useState } from 'react';
import { Star, MapPin, Clock } from 'lucide-react';
import BookingModal from './BookingModal';

interface ServiceCardProps {
  name: string;
  category: string;
  rating: number;
  price: number;
  location: string;
  image: string;
}

export default function ServiceCard({ name, category, rating, price, location, image }: ServiceCardProps) {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-indigo-600">{category}</span>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="ml-1 text-sm text-gray-600">{rating}</span>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{name}</h3>
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{location}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-gray-900">₹{price}</span>
            <button 
              onClick={() => setIsBookingModalOpen(true)}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        service={{ name, category, price, image }}
      />
    </>
  );
}
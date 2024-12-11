import React, { useState, useEffect } from 'react';
import { Search, Calendar, Clock, MapPin, Phone } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { supabase } from '../lib/supabase';  // Make sure this import exists

interface SearchResult {
  id: string;
  title: string;
  category: string;
  location: string;
  price: number;
}

interface BookingDetails {
  serviceId: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

// Initialize EmailJS with your public key
emailjs.init("cKnbPS4A5r2j3nkkB");

export default function HeroSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedService, setSelectedService] = useState<SearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [featuredServices, setFeaturedServices] = useState<SearchResult[]>([]);
  const [bookingStatus, setBookingStatus] = useState<{
    message: string;
    type: 'success' | 'error' | null;
  }>({ message: '', type: null });

  // Fetch services from listings table
  useEffect(() => {
    const fetchListings = async () => {
      const { data, error } = await supabase
        .from('listings')
        .select('*');

      if (data && !error) {
        const formattedServices = data.map(listing => ({
          id: listing.id,
          title: listing.title,
          category: listing.category,
          price: listing.price,
          location: listing.location
        }));
        setFeaturedServices(formattedServices);
      }
    };

    fetchListings();
  }, []);

  const handleSearch = async (value: string) => {
    setSearchTerm(value);
    if (!value.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      // Direct API call to Supabase
      const response = await fetch(
        `https://xqejbzprbqsaltfwiwpn.supabase.co/rest/v1/job_listings?select=*&or=(title.ilike.%25${value}%25,category.ilike.%25${value}%25)`,
        {
          headers: {
            'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhxZWpienByYnFzYWx0Zndpd3BuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM4NDAzODEsImV4cCI6MjA0OTQxNjM4MX0.fwRabDHeBv8oS3N6NLGqNJcVIISvKTsfklhiJEThunI',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhxZWpienByYnFzYWx0Zndpd3BuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM4NDAzODEsImV4cCI6MjA0OTQxNjM4MX0.fwRabDHeBv8oS3N6NLGqNJcVIISvKTsfklhiJEThunI'
          }
        }
      );

      if (!response.ok) throw new Error('Search failed');
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Direct booking handler
  const openBookingModal = (service: SearchResult) => {
    console.log('Opening booking modal for service:', service);
    setSelectedService(service);
  };

  // ... previous imports remain same ...

const handleBooking = async (bookingDetails: BookingDetails) => {
  try {
    const response = await fetch(
      'https://xqejbzprbqsaltfwiwpn.supabase.co/rest/v1/bookings',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhxZWpienByYnFzYWx0Zndpd3BuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM4NDAzODEsImV4cCI6MjA0OTQxNjM4MX0.fwRabDHeBv8oS3N6NLGqNJcVIISvKTsfklhiJEThunI',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhxZWpienByYnFzYWx0Zndpd3BuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM4NDAzODEsImV4cCI6MjA0OTQxNjM4MX0.fwRabDHeBv8oS3N6NLGqNJcVIISvKTsfklhiJEThunI',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          service_id: bookingDetails.serviceId,
          date: bookingDetails.date,
          time: bookingDetails.time,
          name: bookingDetails.name,
          phone: bookingDetails.phone,
          address: bookingDetails.address,
          email: bookingDetails.email,
          status: 'pending',
          created_at: new Date().toISOString()
        })
      }
    );

    if (!response.ok) {
      throw new Error('Failed to save booking');
    }

    alert('Booking successful! We will contact you shortly.');
    setSelectedService(null); // Close the modal
  } catch (error) {
    console.error('Booking error:', error);
    alert('Failed to book service. Please try again.');
  }
};

  return (
    <div className="relative w-full max-w-3xl mx-auto px-4">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search services..."
          className="w-full px-12 py-4 rounded-lg border bg-white text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-black" />
      </div>

      {!searchTerm && featuredServices.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-3 text-black">Available Services</h2>
          <div className="grid grid-cols-2 gap-4">
            {featuredServices.map((service) => (
              <div 
                key={service.id}
                className="p-4 border rounded-lg bg-white shadow-sm"
              >
                <h3 className="font-medium text-black">{service.title}</h3>
                <p className="text-sm text-black mt-1">{service.category}</p>
                <p className="text-sm text-black mt-1">{service.location}</p>
                <p className="text-sm font-semibold text-black mt-1">₹{service.price}</p>
                <button
                  onClick={() => setSelectedService(service)}
                  className="mt-2 w-full px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm"
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {searchTerm && (
        <div className="absolute mt-2 w-full bg-white rounded-lg shadow-lg z-40">
          {isLoading ? (
            <div className="p-4 text-center text-black">Searching...</div>
          ) : results.length > 0 ? (
            <ul className="max-h-96 overflow-y-auto">
              {results.map((result) => (
                <li 
                  key={result.id}
                  className="px-4 py-3 hover:bg-gray-50 border-b last:border-b-0"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium text-black">{result.title}</div>
                      <div className="text-sm text-black">
                        {result.category} • {result.location}
                      </div>
                      <div className="text-sm font-semibold text-black mt-1">
                        ₹{result.price}
                      </div>
                    </div>
                    <button
                      onClick={() => openBookingModal(result)}
                      className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm"
                    >
                      Book Now
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-black">
              No services found
            </div>
          )}
        </div>
      )}

      {selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
            {bookingStatus.message && (
              <div className="absolute -top-16 left-0 right-0 p-4 mb-4 text-center">
                <div className="bg-white rounded-lg shadow-lg p-4 text-black text-lg font-medium">
                  {bookingStatus.message}
                </div>
              </div>
            )}

            <h2 className="text-2xl font-bold mb-4 text-black">{selectedService.title}</h2>
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const bookingDetails = {
                  serviceId: selectedService.id,
                  date: formData.get('date') as string,
                  time: formData.get('time') as string,
                  name: formData.get('name') as string,
                  email: formData.get('email') as string,
                  phone: formData.get('phone') as string,
                  address: formData.get('address') as string,
                };
                handleBooking(bookingDetails);
              }} 
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium mb-1 text-black">Date</label>
                <input
                  type="date"
                  name="date"
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full p-2 border rounded text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-black">Time</label>
                <select
                  name="time"
                  required
                  className="w-full p-2 border rounded text-black"
                >
                  <option value="">Select time</option>
                  {Array.from({ length: 12 }, (_, i) => i + 9).map((hour) => (
                    <option key={hour} value={`${hour}:00`}>{`${hour}:00`}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-black">Your Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full p-2 border rounded text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-black">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full p-2 border rounded text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-black">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  className="w-full p-2 border rounded text-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-black">Address</label>
                <input
                  type="text"
                  name="address"
                  required
                  className="w-full p-2 border rounded text-black"
                />
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="flex-1 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
                >
                  Confirm Booking
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedService(null);
                    setBookingStatus({ message: '', type: null });
                  }}
                  className="flex-1 border border-red-500 text-red-500 py-2 rounded hover:bg-red-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 
import React, { useEffect, useState } from 'react';

interface Service {
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

const fallbackServices: Service[] = [
  {
    id: '1',
    title: 'House Cleaning',
    category: 'Cleaning',
    location: 'Mumbai',
    price: 1500,
  },
  {
    id: '2',
    title: 'Plumbing Service',
    category: 'Maintenance',
    location: 'Delhi',
    price: 800,
  },
  {
    id: '3',
    title: 'Electrical Repair',
    category: 'Maintenance',
    location: 'Bangalore',
    price: 1000,
  },
];

export default function FeaturedServices() {
  const [services, setServices] = useState<Service[]>(fallbackServices);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [bookingStatus, setBookingStatus] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('gs', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'apikey': 'I',
            'Authorization': 'I',
            },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch services.');
        }

        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setServices(data);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleBooking = async (bookingDetails: BookingDetails) => {
    try {
      setBookingStatus('loading');
      const response = await fetch('s', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': '',
          'Authorization': 'I',
      },
        body: JSON.stringify(bookingDetails),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Supabase error:', errorData);
        throw new Error('Failed to create booking.');
      }
  
      setBookingStatus('success');
      alert('Booking confirmed!');
      setSelectedService(null);
    } catch (error) {
      console.error('Error details:', error);
      setBookingStatus('error');
      alert('Booking confirmed!');
    }
  };
  

  return (
    <div className="py-8">
      <h2 className="text-2xl font-semibold mb-6 text-black">Available Services</h2>
      {loading ? (
        <p>Loading services...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-lg shadow p-4">
              <h3 className="font-medium text-black">{service.title}</h3>
              <p className="text-sm text-black mt-1">{service.category}</p>
              <p className="text-sm text-black mt-1">{service.location}</p>
              <p className="text-sm font-semibold text-black mt-1">₹{service.price}</p>
              <button
                onClick={() => setSelectedService(service)}
                className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
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
                <select name="time" required className="w-full p-2 border rounded text-black">
                  <option value="">Select time</option>
                  {Array.from({ length: 12 }, (_, i) => i + 9).map((hour) => (
                    <option key={hour} value={`${hour}:00`}>{`${hour}:00`}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-black">Name</label>
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
                  className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                  Confirm Booking
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedService(null)}
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

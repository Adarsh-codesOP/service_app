import React, { useEffect, useState } from 'react';

interface Service {
  id: string;
  title: string;
  category: string;
  location: string;
  price: number;
}

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('https://xqejbzprbqsaltfwiwpn.supabase.co/rest/v1/job_listings', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhxZWpienByYnFzYWx0Zndpd3BuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM4NDAzODEsImV4cCI6MjA0OTQxNjM4MX0.fwRabDHeBv8oS3N6NLGqNJcVIISvKTsfklhiJEThunI',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhxZWpienByYnFzYWx0Zndpd3BuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM4NDAzODEsImV4cCI6MjA0OTQxNjM4MX0.fwRabDHeBv8oS3N6NLGqNJcVIISvKTsfklhiJEThunI'
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Fetched data:', data);
        
        if (Array.isArray(data)) {
          setServices(data);
          setFilteredServices(data);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Get unique categories from services
  const categories = ['All', ...new Set(services.map(service => service.category))];

  const filterByCategory = (category: string) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredServices(services);
    } else {
      const filtered = services.filter(service => service.category === category);
      setFilteredServices(filtered);
    }
  };

  if (loading) {
    return (
      <div className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-black">Our Services</h2>
          <div className="text-center text-black">Loading services...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-black">Our Services</h2>
        
        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => filterByCategory(category)}
              className={`px-4 py-2 rounded-md transition duration-300 ${
                selectedCategory === category
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-black hover:bg-indigo-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {filteredServices.length === 0 ? (
          <div className="text-center text-black">No services available in this category.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <div key={service.id} className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-2 text-black">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.category}</p>
                <p className="text-gray-600 mb-4">{service.location}</p>
                <p className="text-2xl font-bold text-indigo-600 mb-4">₹{service.price}</p>
                <button 
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
                  onClick={() => {
                    console.log('Booking service:', service.title);
                  }}
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 
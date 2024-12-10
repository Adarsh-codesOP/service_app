import React from 'react';
import ServiceCard from './ServiceCard';

const featuredServices = [
  {
    name: "Expert AC Repair & Service",
    category: "AC Repair",
    rating: 4.8,
    price: 499,
    location: "Mumbai",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=2069"
  },
  {
    name: "Professional Electrician Services",
    category: "Electrical",
    rating: 4.7,
    price: 299,
    location: "Delhi",
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&q=80&w=2069"
  },
  {
    name: "Emergency Plumbing Solutions",
    category: "Plumbing",
    rating: 4.9,
    price: 399,
    location: "Bangalore",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=2070"
  },
  {
    name: "Home Painting Services",
    category: "Painting",
    rating: 4.6,
    price: 999,
    location: "Chennai",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=2070"
  }
];

export default function FeaturedServices() {
  return (
    <div className="py-8">
      <h2 className="text-2xl font-semibold mb-6">Featured Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredServices.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>
    </div>
  );
}
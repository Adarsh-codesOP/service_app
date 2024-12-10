import React from 'react';
import ServiceCard from './ServiceCard';
import { Service } from '../types';

interface ServiceListProps {
  category: string;
  services: Service[];
}

export default function ServiceList({ category, services }: ServiceListProps) {
  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">{category} Services</h2>
        <span className="text-gray-600">{services.length} services available</span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <ServiceCard key={service.id} {...service} />
        ))}
      </div>
    </div>
  );
}
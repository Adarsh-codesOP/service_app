import React from 'react';
import { Wrench, Zap, Droplet, Hammer, Paintbrush, Bug, Home, Settings } from 'lucide-react';

interface CategoryListProps {
  onCategorySelect: (category: string) => void;
}

const categories = [
  { id: '1', name: 'AC Repair', icon: <Settings className="h-6 w-6" /> },
  { id: '2', name: 'Electrical', icon: <Zap className="h-6 w-6" /> },
  { id: '3', name: 'Plumbing', icon: <Droplet className="h-6 w-6" /> },
  { id: '4', name: 'Carpentry', icon: <Hammer className="h-6 w-6" /> },
  { id: '5', name: 'Painting', icon: <Paintbrush className="h-6 w-6" /> },
  { id: '6', name: 'Pest Control', icon: <Bug className="h-6 w-6" /> },
  { id: '7', name: 'Appliance Repair', icon: <Home className="h-6 w-6" /> },
  { id: '8', name: 'Mechanical', icon: <Wrench className="h-6 w-6" /> },
];

export default function CategoryList({ onCategorySelect }: CategoryListProps) {
  return (
    <div className="py-8">
      <h2 className="text-2xl font-semibold mb-6">Our Services</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategorySelect(category.name)}
            className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="p-3 bg-indigo-100 rounded-full text-indigo-600 mb-3">
              {category.icon}
            </div>
            <span className="text-sm font-medium text-gray-700">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
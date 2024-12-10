import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CategoryList from './components/CategoryList';
import FeaturedServices from './components/FeaturedServices';
import ServiceList from './components/ServiceList';
import { services } from './data/services';

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredServices = selectedCategory
    ? services.filter(service => service.category === selectedCategory)
    : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CategoryList onCategorySelect={setSelectedCategory} />
        {selectedCategory ? (
          <ServiceList 
            category={selectedCategory} 
            services={filteredServices} 
          />
        ) : (
          <FeaturedServices />
        )}
      </main>
    </div>
  );
}

export default App;
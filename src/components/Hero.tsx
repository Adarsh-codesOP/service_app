import React from 'react';
import HeroSearch from './HeroSearch';

export default function Hero() {
  return (
    <div className="bg-indigo-600 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Find Local Services
          </h1>
          <p className="mt-3 text-xl text-indigo-100 sm:mt-5">
            Connect with trusted service providers in your area
          </p>
          <div className="mt-8">
            <HeroSearch />
          </div>
        </div>
      </div>
    </div>
  );
}
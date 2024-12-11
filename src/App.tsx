import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CategoryList from './components/CategoryList';
import FeaturedServices from './components/FeaturedServices';
import ServiceList from './components/ServiceList';
import { services } from './data/services';
import Login from './components/Login';
import Register from './components/Register';
import { supabase } from './lib/supabase';
import { Session } from '@supabase/supabase-js';

function App() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoggedIn(!!session);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setIsLoggedIn(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const filteredServices = selectedCategory
    ? services.filter(service => service.category === selectedCategory)
    : [];

  const handleLogin = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      setIsLoggedIn(true);
    } catch (error: any) {
      console.error('Error logging in:', error.message);
    }
  };

  const handleRegister = async (data: {
    name: string;
    email: string;
    contact: string;
    username: string;
    password: string;
  }) => {
    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            name: data.name,
            username: data.username,
            contact: data.contact,
          },
        },
      });
      if (error) throw error;
      setIsLoggedIn(true);
    } catch (error: any) {
      console.error('Error registering:', error.message);
    }
  };

  if (!isLoggedIn) {
    if (isRegistering) {
      return (
        <Register 
          onRegister={handleRegister}
          onSwitchToLogin={() => setIsRegistering(false)}
        />
      );
    }
    return (
      <Login 
        onLogin={handleLogin}
        onSwitchToRegister={() => setIsRegistering(true)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CategoryList onCategorySelect={setSelectedCategory} />

        {selectedCategory && (
          <ServiceList 
            category={selectedCategory} 
            services={filteredServices} 
          />
        )}

        <section className="mt-10">
          <FeaturedServices />
        </section>
      </main>
    </div>
  );
}

export default App;
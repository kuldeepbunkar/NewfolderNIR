import React from 'react';
import Hero from '../components/home/Hero';
import FeaturedProperties from '../components/home/FeaturedProperties';
import Services from '../components/home/Services';

function Home() {
  return (
    <div>
      <Hero />
      <FeaturedProperties />
      <Services />
    </div>
  );
}

export default Home; 
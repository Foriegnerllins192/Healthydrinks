import React from 'react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection.jsx';
import ProductGrid from '../components/ProductGrid.jsx';
import WhyChooseUs from '../components/WhyChooseUs.jsx';
import Testimonials from '../components/Testimonials.jsx';
import Newsletter from '../components/Newsletter.jsx';

function Home() {
  return (
    <>
      <HeroSection />
      <ProductGrid />
      <WhyChooseUs />
      <section className="py-16 bg-deep-green text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Refresh Your Day!</h2>
          <p className="text-lg mb-6">Discover your new favourite healthy drink.</p>
          <Link to="/shop" className="inline-block bg-orange hover:bg-light-orange text-white font-medium py-3 px-8 rounded-full transition-colors">
            Shop Now
          </Link>
        </div>
      </section>
      <Testimonials />
      <Newsletter />
    </>
  );
}

export default Home;

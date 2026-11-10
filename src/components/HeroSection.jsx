import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const images = [
  'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=1600',
  'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=1600',
  'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=1600',
];

function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[calc(100vh-5rem)] bg-cream overflow-hidden">
      <div className="absolute inset-0">
        <img src={images[currentImage]} alt="" className="w-full h-full object-cover opacity-30 transition-opacity duration-700" />
        <div className="absolute inset-0 bg-gradient-to-r from-cream via-cream/90 to-transparent" />
      </div>
      <div className="container mx-auto px-6 relative h-full min-h-[calc(100vh-5rem)] flex items-center">
        <div className="max-w-2xl py-16">
          <h1 className="text-4xl md:text-6xl font-bold text-deep-green mb-6 leading-tight">
            Feel Good. Drink Fresh. Live Better.
          </h1>
          <p className="text-lg md:text-xl text-dark-text mb-8 max-w-xl">
            Discover refreshing, naturally delicious drinks made to bring more goodness into your everyday life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/shop" className="btn-primary text-center">Shop Our Drinks</Link>
            <Link to="/story" className="btn-secondary text-center">Explore Our Story</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;

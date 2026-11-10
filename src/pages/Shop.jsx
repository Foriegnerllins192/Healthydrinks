import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid.jsx';

function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQ = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQ);

  useEffect(() => {
    setQuery(searchParams.get('q') || '');
  }, [searchParams]);

  const onSubmit = (e) => {
    e.preventDefault();
    const q = query.trim();
    setSearchParams(q ? { q } : {});
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-dark-text mb-4">Shop</h1>
        <p className="text-gray-600 mb-6">Browse our fresh juices, smoothies, detox drinks, fruit blends, and wellness drinks.</p>
        <form onSubmit={onSubmit} className="mb-8 flex flex-col sm:flex-row gap-3 max-w-2xl">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for drinks..."
            className="flex-1 p-4 rounded-full border-2 border-fresh-green focus:outline-none focus:border-deep-green"
          />
          <button type="submit" className="btn-primary sm:w-auto">Search</button>
        </form>
        <ProductGrid searchQuery={searchParams.get('q') || ''} />
      </div>
    </section>
  );
}

export default Shop;

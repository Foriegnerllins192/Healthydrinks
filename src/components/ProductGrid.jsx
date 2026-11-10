import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SAMPLE_PRODUCTS } from '../data/products.js';
import { addToCart } from '../utils/cart.js';

function ProductGrid({ searchQuery = '' }) {
  const [products, setProducts] = useState(SAMPLE_PRODUCTS);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/products')
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((data) => {
        if (!cancelled && Array.isArray(data) && data.length) setProducts(data);
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  const q = searchQuery.trim().toLowerCase();
  const filtered = q
    ? products.filter((p) =>
        [p.name, p.short_description, p.description, p.category].some((v) => String(v || '').toLowerCase().includes(q))
      )
    : products;

  const handleAddToCart = (product) => {
    addToCart(product, 1);
  };

  return (
    <section className="py-12">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-dark-text mb-8 text-center">Featured Products</h2>
        {filtered.length === 0 ? (
          <p className="text-center text-gray-600">No drinks found for "{searchQuery}". Try another search.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filtered.map((product) => (
              <div key={product.id} className="product-card">
                <Link to={`/product/${product.id}`} className="block relative">
                  <img src={product.image_url} alt={product.name} className="w-full h-48 object-cover" />
                  {product.badge && (
                    <span className="absolute top-3 left-3 bg-orange text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {product.badge}
                    </span>
                  )}
                </Link>
                <div className="p-6">
                  <Link to={`/product/${product.id}`} className="block">
                    <h3 className="text-xl font-semibold text-dark-text mb-2 hover:text-fresh-green">{product.name}</h3>
                  </Link>
                  <p className="text-gray-600 text-sm mb-3">{product.short_description || product.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-fresh-green font-semibold">GHS {Number(product.price).toFixed(2)}</p>
                    <span className="text-orange text-sm tracking-wide" aria-label="5 out of 5 stars">★★★★★</span>
                  </div>
                  <div className="flex gap-2">
                    <Link to={`/product/${product.id}`} className="flex-1 text-center border-2 border-fresh-green text-fresh-green hover:bg-fresh-green hover:text-white font-medium py-2 px-3 rounded-full transition-colors">
                      View
                    </Link>
                    <button className="flex-1 btn-primary py-2 px-3" onClick={() => handleAddToCart(product)}>Add to Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default ProductGrid;

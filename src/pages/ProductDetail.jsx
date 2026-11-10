import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SAMPLE_PRODUCTS } from '../data/products.js';
import { addToCart } from '../utils/cart.js';

function StarRating({ value, onChange, readOnly = false }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readOnly}
          onClick={() => onChange && onChange(star)}
          className={`text-2xl ${star <= value ? 'text-orange' : 'text-gray-300'} ${readOnly ? 'cursor-default' : 'hover:text-orange'}`}
          aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

function ProductDetail() {
  const { id } = useParams();
  const product = useMemo(() => SAMPLE_PRODUCTS.find((p) => String(p.id) === String(id)) || SAMPLE_PRODUCTS[0], [id]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [size, setSize] = useState(product.sizes?.[0] || '500ml');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviews, setReviews] = useState([]);

  const viewKey = `viewed_${product.id}`;
  const reviewsKey = `reviews_${product.id}`;
  const purchasedKey = `purchased_${product.id}`;

  useEffect(() => {
    localStorage.setItem(viewKey, 'true');
    const saved = JSON.parse(localStorage.getItem(reviewsKey) || '[]');
    setReviews(saved);
    setSelectedImage(0);
    setSize(product.sizes?.[0] || '500ml');
    setQuantity(1);
  }, [product.id]);

  const canRate = localStorage.getItem(viewKey) === 'true' && localStorage.getItem(purchasedKey) === 'true';
  const hasViewed = localStorage.getItem(viewKey) === 'true';

  const handleAddToCart = () => {
    addToCart(product, quantity, { size });
    localStorage.setItem(purchasedKey, 'true');
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const submitReview = (e) => {
    e.preventDefault();
    if (!rating) return;
    const newReview = {
      id: Date.now(),
      rating,
      text: reviewText.trim(),
      author: 'Guest',
      date: new Date().toLocaleDateString(),
    };
    const next = [newReview, ...reviews];
    setReviews(next);
    localStorage.setItem(reviewsKey, JSON.stringify(next));
    setReviewText('');
    setRating(0);
  };

  const avgRating = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : null;

  return (
    <section className="py-12">
      <div className="container mx-auto px-6">
        <Link to="/shop" className="text-fresh-green hover:underline mb-6 inline-block">← Back to Shop</Link>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <img src={product.images?.[selectedImage] || product.image_url} alt={product.name} className="w-full rounded-3xl shadow-lg object-cover h-96" />
            <div className="flex gap-3 mt-4">
              {(product.images || [product.image_url]).map((img, idx) => (
                <button key={idx} onClick={() => setSelectedImage(idx)} className={`rounded-2xl overflow-hidden border-2 ${selectedImage === idx ? 'border-fresh-green' : 'border-transparent'}`}>
                  <img src={img} alt={`${product.name} view ${idx + 1}`} className="w-20 h-20 object-cover" />
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-3">View side pictures of the drink before adding to cart.</p>
          </div>

          <div>
            <h1 className="text-3xl font-bold text-dark-text mb-2">{product.name}</h1>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-orange">★★★★★</span>
              {avgRating && <span className="text-gray-600 text-sm">{avgRating} ({reviews.length} review{reviews.length > 1 ? 's' : ''})</span>}
            </div>
            <p className="text-fresh-green text-2xl font-semibold mb-4">GHS {Number(product.price).toFixed(2)}</p>
            <p className="text-gray-700 mb-6">{product.description}</p>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-dark-text mb-2">Ingredients</h3>
              <ul className="list-disc pl-6 text-gray-700">
                {(product.ingredients || []).map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-dark-text mb-2">Bottle Size</h3>
              <div className="flex flex-wrap gap-2">
                {(product.sizes || ['500ml']).map((s) => (
                  <button key={s} onClick={() => setSize(s)} className={`px-4 py-2 rounded-full border-2 ${size === s ? 'bg-fresh-green text-white border-fresh-green' : 'border-fresh-green text-dark-text'}`}>{s}</button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <span className="font-medium text-dark-text">Quantity</span>
              <div className="flex items-center gap-3">
                <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="w-10 h-10 rounded-full bg-cream text-dark-text text-lg">-</button>
                <span className="w-8 text-center font-medium">{quantity}</span>
                <button onClick={() => setQuantity((q) => q + 1)} className="w-10 h-10 rounded-full bg-cream text-dark-text text-lg">+</button>
              </div>
            </div>

            <button onClick={handleAddToCart} className="btn-primary w-full sm:w-auto">
              {added ? 'Added to Cart ✓' : 'Add to Cart'}
            </button>
            {added && <p className="text-fresh-green mt-3">Added to your cart. You can rate and review this drink after purchase.</p>}
          </div>
        </div>

        <div className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-bold text-dark-text mb-4">Ratings & Reviews</h2>
          {canRate ? (
            <form onSubmit={submitReview} className="bg-white p-6 rounded-3xl shadow-lg mb-8">
              <p className="text-gray-700 mb-3">You viewed and added this drink before. Rate it (1–5 stars) and leave a review.</p>
              <StarRating value={rating} onChange={setRating} />
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Write your review..."
                rows="3"
                className="w-full mt-4 p-4 rounded-3xl border-2 border-fresh-green focus:outline-none focus:border-deep-green"
              />
              <button type="submit" disabled={!rating} className="btn-primary mt-4 disabled:opacity-50">Submit Review</button>
            </form>
          ) : (
            <div className="bg-light-orange p-6 rounded-3xl mb-8">
              <p className="text-dark-text">
                {hasViewed
                  ? 'View the drink pictures and add it to your cart/buy to unlock rating and reviews for next time.'
                  : 'View this drink and add it to your cart to rate it and leave a review next time you come back.'}
              </p>
            </div>
          )}

          <div className="space-y-4">
            {reviews.length === 0 ? (
              <p className="text-gray-600">No reviews yet. Be the first to review after purchasing.</p>
            ) : (
              reviews.map((r) => (
                <div key={r.id} className="bg-white p-5 rounded-3xl shadow">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-dark-text">{r.author}</span>
                    <span className="text-sm text-gray-500">{r.date}</span>
                  </div>
                  <StarRating value={r.rating} readOnly />
                  {r.text && <p className="text-gray-700 mt-2">{r.text}</p>}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;

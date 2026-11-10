import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCart, updateCartQuantity, removeFromCart, getCartTotal } from '../utils/cart.js';

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  const refresh = () => setCartItems(getCart());

  useEffect(() => {
    refresh();
    window.addEventListener('cartUpdated', refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener('cartUpdated', refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  const total = getCartTotal();

  return (
    <section className="py-12">
      <div className="container mx-auto px-6">
        <h1 className="text-3xl font-bold text-dark-text mb-8">Your Cart</h1>
        {cartItems.length === 0 ? (
          <div className="bg-white p-10 rounded-3xl shadow-lg text-center">
            <p className="text-gray-600 mb-6">Your cart is empty. Add some healthy drinks!</p>
            <Link to="/shop" className="btn-primary inline-block">Go to Shop</Link>
          </div>
        ) : (
          <div>
            <div className="space-y-6 mb-8">
              {cartItems.map((item) => (
                <div key={item.key} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white rounded-3xl shadow-lg">
                  <div className="flex items-center space-x-6">
                    <img src={item.image_url} alt={item.name} className="w-24 h-24 rounded-2xl object-cover" />
                    <div>
                      <h3 className="text-xl font-semibold text-dark-text">{item.name}</h3>
                      {item.size && <p className="text-sm text-gray-500">Size: {item.size}</p>}
                      <p className="text-fresh-green">GHS {Number(item.price).toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button onClick={() => updateCartQuantity(item.key, item.quantity - 1)} className="w-8 h-8 rounded-full bg-cream text-dark-text">-</button>
                    <span className="text-lg font-medium w-6 text-center">{item.quantity}</span>
                    <button onClick={() => updateCartQuantity(item.key, item.quantity + 1)} className="w-8 h-8 rounded-full bg-cream text-dark-text">+</button>
                    <button onClick={() => removeFromCart(item.key)} className="text-orange hover:text-red-600 ml-4">Remove</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-white p-6 rounded-3xl shadow-lg max-w-md ml-auto">
              <h3 className="text-2xl font-bold text-dark-text mb-4">Order Summary</h3>
              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-xl font-medium text-dark-text">GHS {total.toFixed(2)}</span>
              </div>
              <Link to="/checkout" className="btn-primary w-full block text-center">Proceed to Checkout</Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Cart;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCart, getCartTotal, saveCart } from '../utils/cart.js';

function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', address: '', city: '', notes: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const refresh = () => setCartItems(getCart());
  useEffect(() => {
    refresh();
    window.addEventListener('cartUpdated', refresh);
    return () => window.removeEventListener('cartUpdated', refresh);
  }, []);

  const subtotal = getCartTotal();
  const deliveryFee = cartItems.length ? 10.0 : 0;
  const total = subtotal + deliveryFee;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // mark items as purchased so customers can rate/review on next visit
    cartItems.forEach((item) => {
      localStorage.setItem(`purchased_${item.id}`, 'true');
      localStorage.setItem(`viewed_${item.id}`, 'true');
    });
    setSubmitted(true);
    saveCart([]);
  };

  if (submitted) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-xl bg-white p-10 rounded-3xl shadow-lg text-center">
          <h1 className="text-3xl font-bold text-deep-green mb-4">Order Prepared</h1>
          <p className="text-gray-700 mb-6">Your order details have been captured. Mobile Money payment integration can be added next; no real payment was processed.</p>
          <Link to="/" className="btn-primary inline-block">Back to Home</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <form id="checkout-form" onSubmit={handleSubmit} className="lg:col-span-2">
          <h1 className="text-3xl font-bold text-dark-text mb-8">Checkout</h1>
          {cartItems.length === 0 && (
            <p className="text-gray-600 mb-6">Your cart is empty. <Link to="/shop" className="text-fresh-green underline">Shop now</Link>.</p>
          )}
          <div className="space-y-6">
            {[['name','Full Name','text'],['phone','Phone Number','tel'],['email','Email Address','email'],['city','City/Location','text']].map(([name,label,type]) => (
              <div key={name}>
                <label className="block text-dark-text font-medium mb-2" htmlFor={name}>{label}</label>
                <input type={type} id={name} name={name} value={formData[name]} onChange={handleInputChange} required
                  className="w-full p-4 rounded-full border-2 border-fresh-green focus:outline-none focus:border-deep-green" />
              </div>
            ))}
            <div>
              <label className="block text-dark-text font-medium mb-2" htmlFor="address">Delivery Address</label>
              <textarea id="address" name="address" value={formData.address} onChange={handleInputChange} required rows="3"
                className="w-full p-4 rounded-3xl border-2 border-fresh-green focus:outline-none focus:border-deep-green"></textarea>
            </div>
            <div>
              <label className="block text-dark-text font-medium mb-2" htmlFor="notes">Order Notes</label>
              <textarea id="notes" name="notes" value={formData.notes} onChange={handleInputChange} rows="3"
                className="w-full p-4 rounded-3xl border-2 border-fresh-green focus:outline-none focus:border-deep-green" placeholder="Special instructions for delivery"></textarea>
            </div>
          </div>
        </form>

        <div>
          <div className="sticky top-24">
            <div className="bg-white p-6 rounded-3xl shadow-lg">
              <h3 className="text-2xl font-bold text-dark-text mb-4">Order Summary</h3>
              <div className="space-y-3 mb-6">
                {cartItems.map((item) => (
                  <div key={item.key} className="flex justify-between text-sm text-gray-700">
                    <span>{item.name} x{item.quantity}</span>
                    <span>GHS {(Number(item.price) * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                {cartItems.length === 0 && <p className="text-gray-600">No items in cart</p>}
              </div>
              <div className="space-y-2 mb-6 border-t pt-4">
                <div className="flex justify-between"><span className="text-gray-600">Subtotal</span><span>GHS {subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Delivery Fee</span><span>GHS {deliveryFee.toFixed(2)}</span></div>
              </div>
              <div className="flex justify-between items-center mb-6">
                <span className="text-xl font-bold text-dark-text">Total</span>
                <span className="text-2xl font-bold text-fresh-green">GHS {total.toFixed(2)}</span>
              </div>
              <button type="submit" form="checkout-form" className="btn-primary w-full" disabled={!cartItems.length}>
                Complete Order
              </button>
              <p className="text-xs text-gray-500 mt-3">Payment gateway integration prepared; no real payment processed.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Checkout;

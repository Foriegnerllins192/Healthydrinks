import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) setSubscribed(true);
  };

  return (
    <footer className="bg-deep-green text-white pt-12 pb-8">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-2xl font-bold mb-4">Healthy Drinks</h3>
          <p className="text-sm">Refreshing natural beverages for a healthier you.</p>
        </div>
        <div>
          <h4 className="font-medium mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link to="/" className="footer-link">Home</Link></li>
            <li><Link to="/shop" className="footer-link">Shop</Link></li>
            <li><Link to="/story" className="footer-link">Our Story</Link></li>
            <li><Link to="/benefits" className="footer-link">Benefits</Link></li>
            <li><Link to="/contact" className="footer-link">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium mb-4">Contact Us</h4>
          <p>Email: info@healthydrinks.com</p>
          <p>Phone: +233 55 123 4567</p>
          <p>Address: 123 Fresh Street, Accra</p>
        </div>
        <div>
          <h4 className="font-medium mb-4">Subscribe</h4>
          {subscribed ? (
            <p className="text-sm">Thanks for subscribing!</p>
          ) : (
            <form className="flex flex-col" onSubmit={handleSubscribe}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="bg-white text-dark-text p-3 rounded-full mb-4"
              />
              <button type="submit" className="bg-orange hover:bg-light-orange text-white py-3 px-6 rounded-full">
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>
      <div className="mt-8 text-center text-sm">
        <p>© 2026 Healthy Drinks. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;

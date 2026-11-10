import React, { useState } from 'react';

function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) setSubscribed(true);
  };

  return (
    <section className="bg-light-orange py-12">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-dark-text mb-4">Stay Fresh, Stay Healthy</h2>
        <p className="text-gray-700 mb-8 max-w-md mx-auto">
          Subscribe to our newsletter for the latest product updates and special offers.
        </p>
        {subscribed ? (
          <p className="text-deep-green font-medium">Thanks for subscribing, {email}!</p>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col items-center">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="w-full p-4 rounded-full mb-4 border-2 border-fresh-green focus:outline-none focus:border-deep-green"
            />
            <button type="submit" className="btn-primary">Subscribe</button>
          </form>
        )}
      </div>
    </section>
  );
}

export default Newsletter;

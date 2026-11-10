import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(isLogin ? 'Signed in as guest session (demo). You can continue shopping.' : 'Account created (demo). You can continue as guest.');
    setTimeout(() => navigate('/'), 800);
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-6 max-w-md">
        <div className="bg-white p-8 rounded-3xl shadow-lg">
          <h1 className="text-3xl font-bold text-dark-text mb-2 text-center">
            {isLogin ? 'Sign In' : 'Create Account'}
          </h1>
          <p className="text-center text-gray-600 mb-6">Continue as <span className="font-medium">Guest</span> anytime — sign in is optional.</p>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {!isLogin && (
              <input className="w-full p-4 rounded-full border-2 border-fresh-green" placeholder="Full name" required />
            )}
            <input className="w-full p-4 rounded-full border-2 border-fresh-green" type="email" placeholder="Email address" required />
            <input className="w-full p-4 rounded-full border-2 border-fresh-green" type="password" placeholder="Password" required />
            {!isLogin && (
              <input className="w-full p-4 rounded-full border-2 border-fresh-green" placeholder="Phone number" />
            )}
            <button type="submit" className="btn-primary w-full">
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>
          {message && <p className="mt-4 text-center text-fresh-green">{message}</p>}
          <button
            type="button"
            onClick={() => { setIsLogin(!isLogin); setMessage(''); }}
            className="mt-4 text-fresh-green hover:underline w-full"
          >
            {isLogin ? "Don't have an account? Create one" : 'Already have an account? Sign in'}
          </button>
          <Link to="/" className="mt-3 block text-center text-gray-600 hover:text-dark-text">Continue as Guest</Link>
        </div>
      </div>
    </section>
  );
}

export default Auth;

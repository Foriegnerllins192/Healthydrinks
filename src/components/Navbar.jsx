import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCartCount } from '../utils/cart.js';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const update = () => setCartCount(getCartCount());
    update();
    window.addEventListener('cartUpdated', update);
    window.addEventListener('storage', update);
    return () => {
      window.removeEventListener('cartUpdated', update);
      window.removeEventListener('storage', update);
    };
  }, []);

  const submitSearch = (e) => {
    e.preventDefault();
    const q = searchQuery.trim();
    navigate(q ? `/shop?q=${encodeURIComponent(q)}` : '/shop');
    setIsSearchOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-cream shadow-md fixed w-full top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-deep-green">Healthy Drinks</Link>
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-dark-text focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
        <div className="hidden md:flex space-x-8 items-center">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/shop" className="nav-link">Shop</Link>
          <Link to="/story" className="nav-link">Our Story</Link>
          <Link to="/benefits" className="nav-link">Benefits</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </div>
        <div className="flex items-center space-x-3 md:space-x-4">
          <button className="text-dark-text hover:text-fresh-green" aria-label="Search" onClick={() => setIsSearchOpen((v) => !v)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </button>
          <div className="hidden sm:flex items-center gap-2 text-sm">
            <span className="px-3 py-1 rounded-full bg-white text-dark-text border border-fresh-green">Guest</span>
            <Link to="/auth" className="text-fresh-green hover:underline">Sign in</Link>
          </div>
          <Link to="/cart" className="relative text-dark-text hover:text-fresh-green" aria-label="Cart">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m12-9l2 9M9 22a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z"></path>
            </svg>
            <span className="absolute -top-2 -right-2 bg-orange text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">{cartCount}</span>
          </Link>
          <Link to="/shop" className="hidden md:inline-block bg-orange hover:bg-light-orange text-white font-medium py-2 px-4 rounded-full transition-colors">Shop Now</Link>
        </div>
      </div>

      {isSearchOpen && (
        <div className="border-t border-green-100 bg-white">
          <form onSubmit={submitSearch} className="container mx-auto px-6 py-3 flex gap-3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for drinks (e.g. orange, detox, smoothie)..."
              className="flex-1 p-3 rounded-full border-2 border-fresh-green focus:outline-none focus:border-deep-green"
              autoFocus
            />
            <button type="submit" className="bg-fresh-green hover:bg-deep-green text-white font-medium px-6 py-3 rounded-full transition-colors">Search</button>
          </form>
        </div>
      )}

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <Link to="/" className="mobile-menu-item" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link to="/shop" className="mobile-menu-item" onClick={() => setIsMobileMenuOpen(false)}>Shop</Link>
          <Link to="/story" className="mobile-menu-item" onClick={() => setIsMobileMenuOpen(false)}>Our Story</Link>
          <Link to="/benefits" className="mobile-menu-item" onClick={() => setIsMobileMenuOpen(false)}>Benefits</Link>
          <Link to="/contact" className="mobile-menu-item" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
          <div className="px-6 py-3 border-t flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-cream text-dark-text border border-fresh-green text-sm">Guest</span>
            <Link to="/auth" className="text-fresh-green text-sm hover:underline" onClick={() => setIsMobileMenuOpen(false)}>Sign in (optional)</Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

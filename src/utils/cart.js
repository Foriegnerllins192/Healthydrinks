export function getCart() {
  try {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  } catch {
    return [];
  }
}

export function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
  window.dispatchEvent(new Event('cartUpdated'));
}

export function addToCart(product, quantity = 1, options = {}) {
  const cart = getCart();
  const key = `${product.id}-${options.size || 'default'}`;
  const existing = cart.find((i) => i.key === key);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      key,
      id: product.id,
      name: product.name,
      price: Number(product.price),
      image_url: product.image_url,
      quantity,
      size: options.size || null,
    });
  }
  saveCart(cart);
  return cart;
}

export function getCartCount() {
  return getCart().reduce((sum, i) => sum + (i.quantity || 0), 0);
}

export function getCartTotal() {
  return getCart().reduce((sum, i) => sum + Number(i.price) * (i.quantity || 0), 0);
}

export function updateCartQuantity(key, quantity) {
  let cart = getCart();
  if (quantity <= 0) cart = cart.filter((i) => i.key !== key);
  else cart = cart.map((i) => (i.key === key ? { ...i, quantity } : i));
  saveCart(cart);
  return cart;
}

export function removeFromCart(key) {
  const cart = getCart().filter((i) => i.key !== key);
  saveCart(cart);
  return cart;
}

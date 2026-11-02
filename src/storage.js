// Cart persistence. Storage is injectable so it can be tested without a browser.
const KEY = "fake-shop:cart";

// Drop anything that isn't a known product with a positive integer quantity.
export function sanitizeCart(raw, products) {
  const clean = {};
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return clean;
  for (const [id, qty] of Object.entries(raw)) {
    const known = products.some((p) => p.id === Number(id));
    if (known && Number.isInteger(qty) && qty > 0) clean[id] = qty;
  }
  return clean;
}

export function loadCart(storage, products) {
  try {
    return sanitizeCart(JSON.parse(storage.getItem(KEY)), products);
  } catch {
    return {};
  }
}

export function saveCart(storage, cart) {
  try {
    storage.setItem(KEY, JSON.stringify(cart));
  } catch {
    // Storage may be full or disabled; the cart still works in memory.
  }
}

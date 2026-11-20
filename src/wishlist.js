// Wishlist: an array of product ids, persisted separately from the cart.
const KEY = "fake-shop:wishlist";

export function toggleWish(list, id) {
  return list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
}

export function isWished(list, id) {
  return list.includes(id);
}

// Keep only unique ids of known products.
export function sanitizeWishlist(raw, products) {
  if (!Array.isArray(raw)) return [];
  const out = [];
  for (const id of raw) {
    if (products.some((p) => p.id === id) && !out.includes(id)) out.push(id);
  }
  return out;
}

export function loadWishlist(storage, products) {
  try {
    return sanitizeWishlist(JSON.parse(storage.getItem(KEY)), products);
  } catch {
    return [];
  }
}

export function saveWishlist(storage, list) {
  try {
    storage.setItem(KEY, JSON.stringify(list));
  } catch {
    // Storage may be unavailable; the wishlist still works in memory.
  }
}

// Wishlist: an array of unique product ids, persisted in injectable storage.
const KEY = "fake-shop:wishlist";

export function toggleWish(list, id) {
  const n = Number(id);
  return list.includes(n) ? list.filter((x) => x !== n) : [...list, n];
}

export function isWished(list, id) {
  return list.includes(Number(id));
}

// Keep only unique ids of known products.
export function sanitizeWishlist(raw, products) {
  if (!Array.isArray(raw)) return [];
  const out = [];
  for (const v of raw) {
    if (Number.isInteger(v) && products.some((p) => p.id === v) && !out.includes(v)) out.push(v);
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
    // Storage may be full or disabled; the wishlist still works in memory.
  }
}

// Narrow a product list to wished items only.
export function wishedProducts(products, list) {
  return products.filter((p) => list.includes(p.id));
}

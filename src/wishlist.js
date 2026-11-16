// Wishlist: a sorted array of product ids, persisted in injectable storage.
const KEY = "fake-shop:wishlist";

export function toggleWish(list, id) {
  const n = Number(id);
  return list.includes(n) ? list.filter((x) => x !== n) : [...list, n].sort((a, b) => a - b);
}

export function isWished(list, id) {
  return list.includes(Number(id));
}

export function wishedProducts(list, products) {
  return products.filter((p) => list.includes(p.id));
}

export function loadWishlist(storage, products) {
  try {
    const raw = JSON.parse(storage.getItem(KEY));
    if (!Array.isArray(raw)) return [];
    const ids = raw.filter((id) => Number.isInteger(id) && products.some((p) => p.id === id));
    return [...new Set(ids)].sort((a, b) => a - b);
  } catch {
    return [];
  }
}

export function saveWishlist(storage, list) {
  try {
    storage.setItem(KEY, JSON.stringify(list));
  } catch {
    // Storage unavailable; wishlist still works in memory.
  }
}

// Wishlist: a list of product ids, persisted in localStorage.
const KEY = "fake-shop-wishlist";

export function toggleWish(list, id) {
  return list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
}

export function isWished(list, id) {
  return list.includes(id);
}

export function wishedProducts(list, products) {
  return list.map((id) => products.find((p) => p.id === id)).filter(Boolean);
}

export function loadWishlist(storage, products) {
  try {
    const parsed = JSON.parse(storage.getItem(KEY));
    if (!Array.isArray(parsed)) return [];
    return [...new Set(parsed)].filter((id) => products.some((p) => p.id === id));
  } catch {
    return [];
  }
}

export function saveWishlist(storage, list) {
  try {
    storage.setItem(KEY, JSON.stringify(list));
  } catch {
    /* storage unavailable or full: ignore */
  }
}

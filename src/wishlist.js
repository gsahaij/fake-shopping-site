// Wishlist: an array of product ids. Pure helpers plus injectable-storage persistence.
const KEY = "fake-shop:wishlist";

export function toggleWish(list, id) {
  id = Number(id);
  return list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
}

export function isWished(list, id) {
  return list.includes(Number(id));
}

export function wishedProducts(list, products) {
  return list.flatMap((id) => products.filter((p) => p.id === id));
}

export function sanitizeWishlist(raw, products) {
  if (!Array.isArray(raw)) return [];
  const seen = new Set();
  for (const id of raw) {
    if (Number.isInteger(id) && products.some((p) => p.id === id)) seen.add(id);
  }
  return [...seen];
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

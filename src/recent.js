// Recently viewed products: a most-recent-first list of ids, capped and de-duplicated.
export const MAX_RECENT = 5;
const KEY = "fake-shop-recent";

export function pushRecent(list, id, max = MAX_RECENT) {
  const n = Number(id);
  if (!Number.isInteger(n)) return [...list];
  return [n, ...list.filter((x) => x !== n)].slice(0, max);
}

export function recentProducts(list, products) {
  return list.flatMap((id) => products.filter((p) => p.id === id));
}

export function loadRecent(storage, products) {
  try {
    const raw = JSON.parse(storage.getItem(KEY));
    if (!Array.isArray(raw)) return [];
    const known = new Set(products.map((p) => p.id));
    return raw.filter((x, i) => known.has(x) && raw.indexOf(x) === i).slice(0, MAX_RECENT);
  } catch {
    return [];
  }
}

export function saveRecent(storage, list) {
  try {
    storage.setItem(KEY, JSON.stringify(list));
  } catch {
    /* storage unavailable: ignore */
  }
}

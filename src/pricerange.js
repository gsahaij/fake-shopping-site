// Pure helpers for filtering products by a price range (in dollars).
export function parseBound(value) {
  if (value === null || value === undefined || String(value).trim() === "") return null;
  const n = Number(value);
  return Number.isFinite(n) && n >= 0 ? n : null;
}

// Returns { min, max } with invalid bounds as null; swaps them if min > max.
export function normalizeRange(min, max) {
  let lo = parseBound(min);
  let hi = parseBound(max);
  if (lo !== null && hi !== null && lo > hi) [lo, hi] = [hi, lo];
  return { min: lo, max: hi };
}

export function filterByPrice(products, min, max) {
  const r = normalizeRange(min, max);
  return products.filter((p) => (r.min === null || p.price >= r.min) && (r.max === null || p.price <= r.max));
}

export function rangeLabel(min, max) {
  const r = normalizeRange(min, max);
  const fmt = (n) => `$${n.toFixed(2)}`;
  if (r.min === null && r.max === null) return "Any price";
  if (r.min === null) return `Up to ${fmt(r.max)}`;
  if (r.max === null) return `${fmt(r.min)} and up`;
  return `${fmt(r.min)} – ${fmt(r.max)}`;
}

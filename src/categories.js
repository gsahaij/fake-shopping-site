// Pure helpers for product categories. Categories live here (not in
// products.js) so the catalog file stays untouched; unknown ids fall back
// to "other".
export const categoryById = {
  1: "toys",
  2: "kitchen",
  3: "stationery",
  4: "home",
};

export function categoryOf(product) {
  return (product && categoryById[product.id]) || "other";
}

// Sorted, de-duplicated category names present in the list.
export function listCategories(products) {
  return [...new Set((products || []).map(categoryOf))].sort();
}

// "all" / empty / null returns everything; matching is case-insensitive.
export function filterByCategory(products, category) {
  const c = String(category || "").trim().toLowerCase();
  if (!c || c === "all") return products;
  return products.filter((p) => categoryOf(p) === c);
}

// Number of products per category, e.g. { toys: 1, home: 1 }.
export function categoryCounts(products) {
  const counts = {};
  for (const p of products || []) {
    const c = categoryOf(p);
    counts[c] = (counts[c] || 0) + 1;
  }
  return counts;
}

export function categoryLabel(category) {
  const c = String(category || "other");
  return c.charAt(0).toUpperCase() + c.slice(1);
}

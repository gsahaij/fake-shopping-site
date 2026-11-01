// Pure helpers for filtering and sorting the product list.
export function filterProducts(products, query) {
  const q = String(query || "").trim().toLowerCase();
  if (!q) return products;
  return products.filter((p) => p.name.toLowerCase().includes(q));
}

export function sortProducts(products, mode = "default") {
  const list = [...products];
  switch (mode) {
    case "price-asc": return list.sort((a, b) => a.price - b.price);
    case "price-desc": return list.sort((a, b) => b.price - a.price);
    case "name": return list.sort((a, b) => a.name.localeCompare(b.name));
    default: return list;
  }
}

export function visibleProducts(products, query, mode) {
  return sortProducts(filterProducts(products, query), mode);
}

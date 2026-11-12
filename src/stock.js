// Stock helpers: limit cart quantities to what is available and label availability.
export const LOW_STOCK_THRESHOLD = 3;

export function stockFor(stock, id) {
  const n = Number(stock[id]);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : 0;
}

export function canAdd(cart, stock, id) {
  return (cart[id] || 0) < stockFor(stock, id);
}

export function clampCart(cart, stock) {
  const next = {};
  for (const [id, qty] of Object.entries(cart)) {
    const q = Math.min(Math.floor(qty), stockFor(stock, id));
    if (q > 0) next[id] = q;
  }
  return next;
}

export function stockLabel(stock, id) {
  const n = stockFor(stock, id);
  if (n === 0) return "Out of stock";
  if (n <= LOW_STOCK_THRESHOLD) return `Only ${n} left`;
  return "In stock";
}

// Pure cart helpers: a cart is a map of productId -> quantity.
export function addItem(cart, id) {
  return { ...cart, [id]: (cart[id] || 0) + 1 };
}

export function removeItem(cart, id) {
  const next = { ...cart };
  if (!next[id]) return next;
  if (next[id] <= 1) delete next[id];
  else next[id] -= 1;
  return next;
}

export function countItems(cart) {
  return Object.values(cart).reduce((a, b) => a + b, 0);
}

export function totalCents(cart, products) {
  return Object.entries(cart).reduce((sum, [id, qty]) => {
    const p = products.find((x) => x.id === Number(id));
    return p ? sum + Math.round(p.price * 100) * qty : sum;
  }, 0);
}

export function formatCents(c) {
  return `$${(c / 100).toFixed(2)}`;
}

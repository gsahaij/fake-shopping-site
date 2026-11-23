// Cart line items: turns a cart map into display-ready rows with line totals.
import { formatCents } from "./cart.js";

export function cartLines(cart, products) {
  return Object.entries(cart).flatMap(([id, qty]) => {
    const p = products.find((x) => x.id === Number(id));
    if (!p || qty <= 0) return [];
    const unitCents = Math.round(p.price * 100);
    return [{ id: p.id, name: p.name, qty, unitCents, lineCents: unitCents * qty }];
  });
}

export function clearItem(cart, id) {
  const next = { ...cart };
  delete next[id];
  return next;
}

export function lineLabel(line) {
  return `${line.name} × ${line.qty} — ${formatCents(line.lineCents)}`;
}

// Empties the whole cart (returns a new, empty cart).
export function clearCart() {
  return {};
}

// Friendly message shown when the cart has no purchasable lines.
export function emptyCartMessage(cart, products) {
  return cartLines(cart, products).length === 0 ? "Your cart is empty — add something shiny!" : "";
}

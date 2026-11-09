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

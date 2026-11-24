// Product comparison helpers: pick up to MAX_COMPARE products and summarise differences.
import { formatCents } from "./cart.js";

export const MAX_COMPARE = 3;

// Toggle a product id in the compare list (non-mutating, capped at MAX_COMPARE).
// When full, adding a new id is ignored; removing is always allowed.
export function toggleCompare(ids, id) {
  const list = Array.isArray(ids) ? ids : [];
  if (list.includes(id)) return list.filter((x) => x !== id);
  if (list.length >= MAX_COMPARE) return list;
  return [...list, id];
}

// Resolve ids to products, in selection order, skipping unknown ids.
export function compareProducts(ids, products) {
  return (Array.isArray(ids) ? ids : [])
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean);
}

// Summarise a comparison: cheapest/priciest names and the price spread in cents.
export function compareSummary(selected) {
  if (selected.length === 0) return null;
  const cents = selected.map((p) => Math.round(p.price * 100));
  const min = Math.min(...cents);
  const max = Math.max(...cents);
  return {
    cheapest: selected[cents.indexOf(min)].name,
    priciest: selected[cents.indexOf(max)].name,
    spreadCents: max - min,
  };
}

export function compareLabel(selected) {
  const s = compareSummary(selected);
  if (!s) return "Pick up to " + MAX_COMPARE + " products to compare";
  if (selected.length === 1) return `Comparing ${selected[0].name} — add another to compare`;
  return `${s.cheapest} is cheapest; price spread ${formatCents(s.spreadCents)}`;
}

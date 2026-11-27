// Bulk (quantity-break) pricing: buy more of one product, pay less per unit.
// Rules are { minQty, percentOff } tiers; the best tier the quantity qualifies for applies.
export const DEFAULT_TIERS = [
  { minQty: 3, percentOff: 5 },
  { minQty: 5, percentOff: 10 },
  { minQty: 10, percentOff: 15 },
];

export function tierFor(qty, tiers = DEFAULT_TIERS) {
  const n = Number(qty);
  if (!Number.isFinite(n)) return null;
  let best = null;
  for (const t of tiers) {
    if (n >= t.minQty && (!best || t.minQty > best.minQty)) best = t;
  }
  return best;
}

// Savings in cents for buying `qty` units at `unitCents` each.
export function bulkDiscountCents(unitCents, qty, tiers = DEFAULT_TIERS) {
  const tier = tierFor(qty, tiers);
  if (!tier || !(unitCents > 0)) return 0;
  return Math.round((unitCents * qty * tier.percentOff) / 100);
}

// Hint for the next tier, e.g. "Add 2 more for 10% off", or "" when none is left.
export function nextTierHint(qty, tiers = DEFAULT_TIERS) {
  const n = Number(qty);
  if (!Number.isFinite(n) || n < 1) return "";
  const next = [...tiers].sort((a, b) => a.minQty - b.minQty).find((t) => t.minQty > n);
  return next ? `Add ${next.minQty - n} more for ${next.percentOff}% off` : "";
}

// Total bulk savings across a cart ({ productId: qty }).
export function cartBulkDiscountCents(cart, products, tiers = DEFAULT_TIERS) {
  return Object.entries(cart).reduce((sum, [id, qty]) => {
    const p = products.find((x) => x.id === Number(id));
    return p ? sum + bulkDiscountCents(Math.round(p.price * 100), qty, tiers) : sum;
  }, 0);
}

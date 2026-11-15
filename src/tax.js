// Sales tax: a flat rate applied to the discounted subtotal (not shipping). Values in cents.
export const TAX_RATE = 0.08;

export function taxCents(taxableCents, rate = TAX_RATE) {
  if (taxableCents <= 0 || rate <= 0) return 0;
  return Math.round(taxableCents * rate);
}

export function taxLabel(rate = TAX_RATE) {
  return `Tax (${Number((rate * 100).toFixed(2))}%)`;
}

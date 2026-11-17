// Sales tax estimate: flat rate applied to the post-discount subtotal. Values in cents.
export const TAX_RATE = 0.08;

export function taxCents(taxableCents, rate = TAX_RATE) {
  if (taxableCents <= 0 || rate <= 0) return 0;
  return Math.round(taxableCents * rate);
}

export function orderTotalCents({ subtotalCents, discountCents = 0, shippingCents = 0, rate = TAX_RATE }) {
  const taxable = Math.max(0, subtotalCents - discountCents);
  return taxable + shippingCents + taxCents(taxable, rate);
}

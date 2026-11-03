// Shipping rules: flat rate, free above a threshold. All values in cents.
export const FREE_SHIPPING_THRESHOLD = 3500;
export const FLAT_RATE = 499;

export function shippingCents(subtotalCents) {
  if (subtotalCents <= 0) return 0;
  return subtotalCents >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_RATE;
}

export function remainingForFreeShipping(subtotalCents) {
  return Math.max(0, FREE_SHIPPING_THRESHOLD - subtotalCents);
}

// 0..100 progress toward free shipping, for a progress bar.
export function freeShippingProgress(subtotalCents) {
  const pct = Math.floor((subtotalCents / FREE_SHIPPING_THRESHOLD) * 100);
  return Math.min(100, Math.max(0, pct));
}

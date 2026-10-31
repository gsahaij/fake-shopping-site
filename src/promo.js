// Promo codes: pure helpers returning discounts in integer cents.
export const promoCodes = {
  DUCK10: { type: "percent", value: 10 },
  FIVEOFF: { type: "fixed", value: 500 },
};

export function discountCents(code, subtotal, codes = promoCodes) {
  const promo = codes[String(code || "").trim().toUpperCase()];
  if (!promo || subtotal <= 0) return 0;
  const raw = promo.type === "percent" ? Math.round((subtotal * promo.value) / 100) : promo.value;
  return Math.min(raw, subtotal);
}

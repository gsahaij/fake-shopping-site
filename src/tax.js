// Estimated sales tax. Rates are demo values (basis points), not real tax advice.
export const TAX_RATES_BPS = {
  CA: 725,
  NY: 400,
  TX: 625,
  WA: 650,
  OR: 0,
  MT: 0,
  NH: 0,
  DE: 0,
};
export const DEFAULT_RATE_BPS = 500;

// Look up a rate by state code (case-insensitive); unknown states use the default.
export function rateFor(state) {
  const key = String(state ?? "").trim().toUpperCase();
  return Object.hasOwn(TAX_RATES_BPS, key) ? TAX_RATES_BPS[key] : DEFAULT_RATE_BPS;
}

// Tax in cents on a taxable amount, rounded to the nearest cent.
export function taxCents(amountCents, state) {
  if (!(amountCents > 0)) return 0;
  return Math.round((amountCents * rateFor(state)) / 10000);
}

export function formatRate(bps) {
  return `${(bps / 100).toFixed(2).replace(/\.?0+$/, "")}%`;
}

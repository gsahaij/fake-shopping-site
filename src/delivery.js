// Delivery estimates: business days only (Mon-Fri), UTC-based so results are deterministic.
export const STANDARD_DAYS = 5;
export const EXPRESS_DAYS = 2;

const DAY_MS = 24 * 60 * 60 * 1000;

function toUtcDate(input) {
  const d = input instanceof Date ? new Date(input.getTime()) : new Date(input);
  return Number.isNaN(d.getTime()) ? null : d;
}

export function isBusinessDay(date) {
  const day = date.getUTCDay();
  return day !== 0 && day !== 6;
}

// Adds n business days to a date (non-mutating). Returns null for an invalid date.
export function addBusinessDays(from, n) {
  const start = toUtcDate(from);
  if (!start) return null;
  const count = Number.isFinite(n) ? Math.max(0, Math.floor(n)) : 0;
  let d = start;
  let left = count;
  while (left > 0) {
    d = new Date(d.getTime() + DAY_MS);
    if (isBusinessDay(d)) left--;
  }
  return d;
}

export function estimateDelivery(orderDate, method = "standard") {
  const days = method === "express" ? EXPRESS_DAYS : STANDARD_DAYS;
  return addBusinessDays(orderDate, days);
}

// e.g. "Arrives Mon, Dec 1"
export function deliveryLabel(orderDate, method = "standard") {
  const d = estimateDelivery(orderDate, method);
  if (!d) return "Delivery date unavailable";
  const text = d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", timeZone: "UTC" });
  return `Arrives ${text}`;
}

// Pure helpers for formatting and parsing money (integer cents <-> display strings).
export function formatCents(cents, symbol = "$") {
  const n = Number.isFinite(cents) ? Math.round(cents) : 0;
  const sign = n < 0 ? "-" : "";
  const abs = Math.abs(n);
  const dollars = Math.floor(abs / 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `${sign}${symbol}${dollars}.${String(abs % 100).padStart(2, "0")}`;
}

// Parses "$1,234.50", "12.5" or "7" into cents. Returns null for junk or negatives.
export function parseToCents(input) {
  const s = String(input ?? "").trim().replace(/^\$/, "").replace(/,/g, "");
  if (!/^\d+(\.\d{1,2})?$/.test(s)) return null;
  const [d, c = ""] = s.split(".");
  return Number(d) * 100 + Number(c.padEnd(2, "0"));
}

export function dollarsToCents(price) {
  return Number.isFinite(price) && price >= 0 ? Math.round(price * 100) : 0;
}

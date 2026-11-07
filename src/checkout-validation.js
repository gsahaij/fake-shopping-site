// Checkout form validation. Each validator returns an error string, or "" when valid.

export function validateEmail(v) {
  const s = String(v ?? "").trim();
  if (!s) return "Email is required";
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s) ? "" : "Enter a valid email address";
}

export function validateName(v) {
  return String(v ?? "").trim().length >= 2 ? "" : "Enter your full name";
}

export function validateZip(v) {
  return /^\d{5}(-\d{4})?$/.test(String(v ?? "").trim()) ? "" : "Enter a 5-digit ZIP code";
}

// Luhn checksum, so obviously mistyped card numbers are caught.
export function luhnValid(digits) {
  let sum = 0;
  let dbl = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let d = Number(digits[i]);
    if (dbl) { d *= 2; if (d > 9) d -= 9; }
    sum += d;
    dbl = !dbl;
  }
  return digits.length > 0 && sum % 10 === 0;
}

export function validateCard(v) {
  const digits = String(v ?? "").replace(/[\s-]/g, "");
  if (!/^\d{13,19}$/.test(digits)) return "Enter a valid card number";
  return luhnValid(digits) ? "" : "Card number looks incorrect";
}

// Expiry as MM/YY; valid through the end of the stated month. `now` is injectable.
export function validateExpiry(v, now = new Date()) {
  const m = /^(\d{2})\s*\/\s*(\d{2})$/.exec(String(v ?? "").trim());
  if (!m) return "Use MM/YY";
  const month = Number(m[1]);
  const year = 2000 + Number(m[2]);
  if (month < 1 || month > 12) return "Use MM/YY";
  const endOfMonth = new Date(year, month, 1);
  return endOfMonth > now ? "" : "Card has expired";
}

export function validateCvc(v) {
  return /^\d{3,4}$/.test(String(v ?? "").trim()) ? "" : "Enter the 3 or 4 digit code";
}

const RULES = {
  name: validateName,
  email: validateEmail,
  zip: validateZip,
  card: validateCard,
  expiry: validateExpiry,
  cvc: validateCvc,
};

// Returns { field: message } containing only invalid fields.
export function validateCheckout(form, now = new Date()) {
  const errors = {};
  for (const [field, rule] of Object.entries(RULES)) {
    const msg = rule(form[field], now);
    if (msg) errors[field] = msg;
  }
  return errors;
}

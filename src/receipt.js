// Pure helper: build a plain-text receipt from a cart.
import { cartLines } from "./lines.js";
import { totalCents, formatCents } from "./cart.js";
import { discountCents } from "./promo.js";
import { shippingCents } from "./shipping.js";

export function receiptData(cart, products, promo = "") {
  const lines = cartLines(cart, products);
  const subtotal = totalCents(cart, products);
  const discount = discountCents(promo, subtotal);
  const after = subtotal - discount;
  const shipping = shippingCents(after);
  return { lines, subtotal, discount, shipping, total: after + shipping };
}

export function receiptText(cart, products, promo = "", width = 32) {
  const { lines, subtotal, discount, shipping, total } = receiptData(cart, products, promo);
  const row = (left, right) => left + " ".repeat(Math.max(1, width - left.length - right.length)) + right;
  if (!lines.length) return "Your cart is empty.";
  const out = ["FAKE SHOP RECEIPT", "-".repeat(width)];
  for (const l of lines) out.push(row(`${l.qty} x ${l.name}`, formatCents(l.lineCents)));
  out.push("-".repeat(width), row("Subtotal", formatCents(subtotal)));
  if (discount) out.push(row("Discount", `-${formatCents(discount)}`));
  out.push(row("Shipping", shipping ? formatCents(shipping) : "FREE"), row("TOTAL", formatCents(total)));
  return out.join("\n");
}

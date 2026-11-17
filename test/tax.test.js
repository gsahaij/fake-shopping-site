import test from "node:test";
import assert from "node:assert/strict";
import { taxCents, orderTotalCents, TAX_RATE } from "../src/tax.js";

test("no tax on empty or negative amounts", () => {
  assert.equal(taxCents(0), 0);
  assert.equal(taxCents(-500), 0);
});

test("tax is rounded to the nearest cent", () => {
  assert.equal(taxCents(1000), 80);
  assert.equal(taxCents(1999), 160); // 159.92 -> 160
  assert.equal(taxCents(1000, 0.0825), 83); // 82.5 -> 83
});

test("order total combines discount, shipping and tax", () => {
  const total = orderTotalCents({ subtotalCents: 2000, discountCents: 500, shippingCents: 499 });
  assert.equal(total, 1500 + 499 + Math.round(1500 * TAX_RATE));
});

test("discount larger than subtotal cannot make total negative", () => {
  assert.equal(orderTotalCents({ subtotalCents: 500, discountCents: 900 }), 0);
});

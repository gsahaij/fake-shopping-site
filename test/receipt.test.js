import test from "node:test";
import assert from "node:assert/strict";
import { receiptData, receiptText } from "../src/receipt.js";
import { products } from "../src/products.js";

test("empty cart", () => {
  assert.equal(receiptText({}, products), "Your cart is empty.");
});

test("receiptData totals with promo and shipping", () => {
  const d = receiptData({ 1: 2 }, products, "FIVEOFF"); // 998 - 500 = 498, +499 shipping
  assert.equal(d.subtotal, 998);
  assert.equal(d.discount, 500);
  assert.equal(d.shipping, 499);
  assert.equal(d.total, 997);
});

test("receiptText lists lines, free shipping, aligned width", () => {
  const text = receiptText({ 4: 2 }, products); // $36 -> free shipping
  const rows = text.split("\n");
  assert.equal(rows[0], "FAKE SHOP RECEIPT");
  assert.match(text, /2 x Desk Cactus\s+\$36\.00/);
  assert.match(text, /Shipping\s+FREE/);
  assert.match(text, /TOTAL\s+\$36\.00/);
  assert.ok(rows.slice(1).every((r) => r.length === 32));
  assert.ok(!text.includes("Discount"));
});

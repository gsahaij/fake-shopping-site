import test from "node:test";
import assert from "node:assert/strict";
import { tierFor, bulkDiscountCents, nextTierHint, cartBulkDiscountCents } from "../src/bulk.js";
import { products } from "../src/products.js";

test("tierFor picks the best qualifying tier", () => {
  assert.equal(tierFor(2), null);
  assert.equal(tierFor(3).percentOff, 5);
  assert.equal(tierFor(7).percentOff, 10);
  assert.equal(tierFor(50).percentOff, 15);
  assert.equal(tierFor("abc"), null);
});

test("bulkDiscountCents rounds and ignores bad input", () => {
  assert.equal(bulkDiscountCents(499, 3), Math.round(499 * 3 * 0.05));
  assert.equal(bulkDiscountCents(499, 2), 0);
  assert.equal(bulkDiscountCents(-5, 10), 0);
});

test("nextTierHint guides toward the next break", () => {
  assert.equal(nextTierHint(1), "Add 2 more for 5% off");
  assert.equal(nextTierHint(3), "Add 2 more for 10% off");
  assert.equal(nextTierHint(10), "");
  assert.equal(nextTierHint(0), "");
});

test("cartBulkDiscountCents sums lines and skips unknown products", () => {
  const cart = { 1: 5, 3: 1, 99: 10 };
  assert.equal(cartBulkDiscountCents(cart, products), Math.round(499 * 5 * 0.1));
  assert.equal(cartBulkDiscountCents({}, products), 0);
});

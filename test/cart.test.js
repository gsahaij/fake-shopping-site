import test from "node:test";
import assert from "node:assert/strict";
import { addItem, removeItem, countItems, totalCents, formatCents } from "../src/cart.js";
import { products } from "../src/products.js";

test("add and remove items", () => {
  let c = addItem(addItem({}, 1), 1);
  assert.equal(countItems(c), 2);
  c = removeItem(c, 1);
  assert.equal(c[1], 1);
  c = removeItem(c, 1);
  assert.deepEqual(c, {});
});

test("total uses integer cents", () => {
  const c = { 1: 3, 3: 1 };
  assert.equal(totalCents(c, products), 499 * 3 + 325);
  assert.equal(formatCents(1822), "$18.22");
});

import { cartLines, clearCart } from "../src/cart.js";

test("cartLines returns per-line totals and skips unknown products", () => {
  const lines = cartLines({ 1: 2, 3: 1, 999: 4 }, products);
  assert.deepEqual(lines, [
    { id: 1, name: "Rubber Duck", qty: 2, unitCents: 499, lineCents: 998 },
    { id: 3, name: "Sticker Pack", qty: 1, unitCents: 325, lineCents: 325 },
  ]);
});

test("clearCart empties the cart", () => assert.deepEqual(clearCart(), {}));

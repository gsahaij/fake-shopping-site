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

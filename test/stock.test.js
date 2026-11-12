import test from "node:test";
import assert from "node:assert/strict";
import { stockFor, canAdd, clampCart, stockLabel } from "../src/stock.js";

const stock = { 1: 10, 2: 2, 3: 0, 4: -5, 5: "x" };

test("stockFor sanitizes bad values", () => {
  assert.deepEqual([1, 2, 3, 4, 5, 99].map((id) => stockFor(stock, id)), [10, 2, 0, 0, 0, 0]);
});

test("canAdd stops at available stock", () => {
  assert.equal(canAdd({ 2: 1 }, stock, 2), true);
  assert.equal(canAdd({ 2: 2 }, stock, 2), false);
  assert.equal(canAdd({}, stock, 3), false);
});

test("clampCart reduces quantities and drops unavailable items", () => {
  const cart = { 1: 4, 2: 5, 3: 1 };
  assert.deepEqual(clampCart(cart, stock), { 1: 4, 2: 2 });
  assert.deepEqual(cart, { 1: 4, 2: 5, 3: 1 });
});

test("stockLabel describes availability", () => {
  assert.equal(stockLabel(stock, 1), "In stock");
  assert.equal(stockLabel(stock, 2), "Only 2 left");
  assert.equal(stockLabel(stock, 3), "Out of stock");
});

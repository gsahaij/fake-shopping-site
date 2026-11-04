import test from "node:test";
import assert from "node:assert/strict";
import { cartLines, clearItem, lineLabel } from "../src/lines.js";

const products = [
  { id: 1, name: "Rubber Duck", price: 4.99 },
  { id: 2, name: "Mystery Mug", price: 12.5 },
];

test("cartLines computes line totals in cents", () => {
  const lines = cartLines({ 1: 3, 2: 1 }, products);
  assert.deepEqual(lines.map((l) => l.lineCents), [1497, 1250]);
});

test("cartLines skips unknown products and zero quantities", () => {
  assert.deepEqual(cartLines({ 99: 2, 1: 0 }, products), []);
});

test("clearItem removes a whole line without mutating", () => {
  const cart = { 1: 3, 2: 1 };
  assert.deepEqual(clearItem(cart, 1), { 2: 1 });
  assert.deepEqual(cart, { 1: 3, 2: 1 });
});

test("lineLabel formats name, quantity and total", () => {
  assert.equal(lineLabel(cartLines({ 2: 2 }, products)[0]), "Mystery Mug × 2 — $25.00");
});

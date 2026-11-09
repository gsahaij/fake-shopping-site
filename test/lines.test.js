import test from "node:test";
import assert from "node:assert/strict";
import { cartLines } from "../src/lines.js";

const products = [
  { id: 1, name: "Rubber Duck", price: 4.99 },
  { id: 2, name: "Mystery Mug", price: 12.5 },
];

test("empty cart has no lines", () => {
  assert.deepEqual(cartLines({}, products), []);
});

test("computes unit and line totals in cents", () => {
  assert.deepEqual(cartLines({ 1: 3 }, products), [
    { id: 1, name: "Rubber Duck", qty: 3, unitCents: 499, lineCents: 1497 },
  ]);
});

test("skips unknown products and non-positive quantities", () => {
  assert.deepEqual(cartLines({ 99: 2, 2: 0 }, products), []);
});

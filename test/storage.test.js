import test from "node:test";
import assert from "node:assert/strict";
import { loadCart, saveCart, sanitizeCart } from "../src/storage.js";
import { products } from "../src/products.js";

function fakeStorage(initial = {}) {
  const data = { ...initial };
  return {
    getItem: (k) => (k in data ? data[k] : null),
    setItem: (k, v) => { data[k] = v; },
  };
}

test("save then load round-trips a cart", () => {
  const s = fakeStorage();
  saveCart(s, { 1: 2, 3: 1 });
  assert.deepEqual(loadCart(s, products), { 1: 2, 3: 1 });
});

test("empty or corrupt storage yields an empty cart", () => {
  assert.deepEqual(loadCart(fakeStorage(), products), {});
  assert.deepEqual(loadCart(fakeStorage({ "fake-shop:cart": "{oops" }), products), {});
});

test("sanitize drops unknown products and bad quantities", () => {
  assert.deepEqual(sanitizeCart({ 1: 2, 99: 1, 2: 0, 3: -1, 4: 1.5 }, products), { 1: 2 });
  assert.deepEqual(sanitizeCart([1, 2], products), {});
  assert.deepEqual(sanitizeCart(null, products), {});
});

test("saveCart swallows storage errors", () => {
  const s = { getItem: () => null, setItem: () => { throw new Error("quota"); } };
  assert.doesNotThrow(() => saveCart(s, { 1: 1 }));
});

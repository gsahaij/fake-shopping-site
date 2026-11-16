import test from "node:test";
import assert from "node:assert/strict";
import { toggleWish, isWished, wishedProducts, loadWishlist, saveWishlist } from "../src/wishlist.js";
import { products } from "../src/products.js";

const mem = (init) => {
  const d = { ...init };
  return { getItem: (k) => d[k] ?? null, setItem: (k, v) => { d[k] = v; } };
};

test("toggleWish adds, sorts, removes without mutating", () => {
  const a = [];
  const b = toggleWish(toggleWish(a, 3), "1");
  assert.deepEqual(b, [1, 3]);
  assert.deepEqual(a, []);
  assert.deepEqual(toggleWish(b, 1), [3]);
  assert.ok(isWished(b, "3"));
});

test("wishedProducts returns matching products", () => {
  assert.deepEqual(wishedProducts([2, 4], products).map((p) => p.id), [2, 4]);
});

test("load/save roundtrip and sanitising", () => {
  const s = mem();
  saveWishlist(s, [2, 1]);
  assert.deepEqual(loadWishlist(s, products), [1, 2]);
  assert.deepEqual(loadWishlist(mem({ "fake-shop:wishlist": "[9,2,2,\"x\"]" }), products), [2]);
  assert.deepEqual(loadWishlist(mem({ "fake-shop:wishlist": "oops" }), products), []);
});

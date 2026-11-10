import test from "node:test";
import assert from "node:assert/strict";
import { toggleWish, isWished, wishedProducts, loadWishlist, saveWishlist } from "../src/wishlist.js";
import { products } from "../src/products.js";

const fakeStorage = (init = {}) => {
  const data = { ...init };
  return { getItem: (k) => (k in data ? data[k] : null), setItem: (k, v) => { data[k] = v; } };
};

test("toggleWish adds then removes without mutating", () => {
  const a = [];
  const b = toggleWish(a, 2);
  assert.deepEqual(b, [2]);
  assert.deepEqual(a, []);
  assert.deepEqual(toggleWish(b, 2), []);
});
test("isWished reports membership", () => {
  assert.equal(isWished([1, 3], 3), true);
  assert.equal(isWished([1, 3], 2), false);
});
test("wishedProducts keeps order and skips unknown ids", () => {
  assert.deepEqual(wishedProducts([3, 99, 1], products).map((p) => p.id), [3, 1]);
});
test("save and load round-trip", () => {
  const s = fakeStorage();
  saveWishlist(s, [1, 4]);
  assert.deepEqual(loadWishlist(s, products), [1, 4]);
});
test("load tolerates garbage, duplicates and unknown ids", () => {
  assert.deepEqual(loadWishlist(fakeStorage(), products), []);
  assert.deepEqual(loadWishlist(fakeStorage({ "fake-shop-wishlist": "{bad" }), products), []);
  assert.deepEqual(loadWishlist(fakeStorage({ "fake-shop-wishlist": '{"a":1}' }), products), []);
  assert.deepEqual(loadWishlist(fakeStorage({ "fake-shop-wishlist": "[1,1,99,2]" }), products), [1, 2]);
});
test("save swallows storage errors", () => {
  assert.doesNotThrow(() => saveWishlist({ setItem() { throw new Error("full"); } }, [1]));
});

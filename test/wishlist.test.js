import test from "node:test";
import assert from "node:assert/strict";
import { toggleWish, isWished, sanitizeWishlist, loadWishlist, saveWishlist, wishedProducts } from "../src/wishlist.js";
import { products } from "../src/products.js";

const memory = (init = {}) => {
  const s = { ...init };
  return { getItem: (k) => (k in s ? s[k] : null), setItem: (k, v) => { s[k] = v; }, s };
};

test("toggleWish adds then removes, accepting string ids, without mutating", () => {
  const a = [];
  const b = toggleWish(a, "2");
  assert.deepEqual(b, [2]);
  assert.deepEqual(a, []);
  assert.deepEqual(toggleWish(b, 2), []);
  assert.ok(isWished(b, "2"));
  assert.ok(!isWished(b, 3));
});
test("sanitizeWishlist drops unknown, duplicate and non-integer ids", () => {
  assert.deepEqual(sanitizeWishlist([1, 1, 99, "2", 2.5, 3], products), [1, 3]);
  assert.deepEqual(sanitizeWishlist({ a: 1 }, products), []);
  assert.deepEqual(sanitizeWishlist(null, products), []);
});
test("save then load round-trips", () => {
  const st = memory();
  saveWishlist(st, [4, 1]);
  assert.deepEqual(loadWishlist(st, products), [4, 1]);
});
test("load tolerates missing or corrupt data", () => {
  assert.deepEqual(loadWishlist(memory(), products), []);
  assert.deepEqual(loadWishlist(memory({ "fake-shop:wishlist": "{bad" }), products), []);
});
test("save swallows storage errors", () => {
  assert.doesNotThrow(() => saveWishlist({ setItem() { throw new Error("full"); } }, [1]));
});
test("wishedProducts filters the catalog", () => {
  assert.deepEqual(wishedProducts(products, [3, 1]).map((p) => p.id), [1, 3]);
});

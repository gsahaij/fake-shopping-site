import test from "node:test";
import assert from "node:assert/strict";
import { toggleWish, isWished, sanitizeWishlist, loadWishlist, saveWishlist } from "../src/wishlist.js";

const products = [{ id: 1 }, { id: 2 }, { id: 3 }];
const fakeStorage = (init) => {
  const m = new Map(init ? [["fake-shop:wishlist", init]] : []);
  return { getItem: (k) => m.get(k) ?? null, setItem: (k, v) => m.set(k, v) };
};

test("toggleWish adds then removes without mutating", () => {
  const a = [1];
  const b = toggleWish(a, 2);
  assert.deepEqual(b, [1, 2]);
  assert.deepEqual(a, [1]);
  assert.deepEqual(toggleWish(b, 1), [2]);
  assert.equal(isWished(b, 2), true);
  assert.equal(isWished(b, 3), false);
});

test("sanitizeWishlist drops unknown, duplicate and non-array input", () => {
  assert.deepEqual(sanitizeWishlist([1, 1, 99, "2", 3], products), [1, 3]);
  assert.deepEqual(sanitizeWishlist({ 1: true }, products), []);
});

test("save and load round-trip; bad JSON yields empty list", () => {
  const s = fakeStorage();
  saveWishlist(s, [2, 3]);
  assert.deepEqual(loadWishlist(s, products), [2, 3]);
  assert.deepEqual(loadWishlist(fakeStorage("{oops"), products), []);
});

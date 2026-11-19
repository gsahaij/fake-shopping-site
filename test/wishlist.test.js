import test from "node:test";
import assert from "node:assert/strict";
import { toggleWish, isWished, wishedProducts, sanitizeWishlist, loadWishlist, saveWishlist } from "../src/wishlist.js";

const products = [
  { id: 1, name: "Rubber Duck", price: 4.99 },
  { id: 2, name: "Mystery Mug", price: 12.5 },
];

test("toggleWish adds then removes without mutating", () => {
  const empty = [];
  const one = toggleWish(empty, "1");
  assert.deepEqual(one, [1]);
  assert.deepEqual(empty, []);
  assert.deepEqual(toggleWish(one, 1), []);
});

test("isWished accepts string ids", () => {
  assert.equal(isWished([2], "2"), true);
  assert.equal(isWished([2], 1), false);
});

test("wishedProducts returns known products in wish order", () => {
  assert.deepEqual(wishedProducts([2, 99, 1], products).map((p) => p.id), [2, 1]);
});

test("sanitizeWishlist drops junk and duplicates", () => {
  assert.deepEqual(sanitizeWishlist([1, 1, 99, "2", null], products), [1]);
  assert.deepEqual(sanitizeWishlist({ a: 1 }, products), []);
});

test("save/load round-trips and survives bad storage", () => {
  const store = new Map();
  const storage = { getItem: (k) => store.get(k) ?? null, setItem: (k, v) => store.set(k, v) };
  saveWishlist(storage, [2, 1]);
  assert.deepEqual(loadWishlist(storage, products), [2, 1]);
  storage.setItem("fake-shop:wishlist", "not json");
  assert.deepEqual(loadWishlist(storage, products), []);
  assert.doesNotThrow(() => saveWishlist({ setItem() { throw new Error("full"); } }, [1]));
});

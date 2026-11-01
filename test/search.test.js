import test from "node:test";
import assert from "node:assert/strict";
import { filterProducts, sortProducts, visibleProducts } from "../src/search.js";
import { products } from "../src/products.js";

test("filter is case-insensitive and trims", () => {
  assert.deepEqual(filterProducts(products, "  DUCK ").map((p) => p.id), [1]);
});
test("empty query returns everything", () => {
  assert.equal(filterProducts(products, "").length, products.length);
  assert.equal(filterProducts(products, null).length, products.length);
});
test("no match gives empty list", () => assert.deepEqual(filterProducts(products, "zzz"), []));
test("sort modes order correctly and do not mutate input", () => {
  const before = products.map((p) => p.id);
  assert.deepEqual(sortProducts(products, "price-asc").map((p) => p.id), [3, 1, 2, 4]);
  assert.deepEqual(sortProducts(products, "price-desc").map((p) => p.id), [4, 2, 1, 3]);
  assert.deepEqual(sortProducts(products, "name").map((p) => p.name), ["Desk Cactus", "Mystery Mug", "Rubber Duck", "Sticker Pack"]);
  assert.deepEqual(products.map((p) => p.id), before);
});
test("visibleProducts combines filter and sort", () => {
  assert.deepEqual(visibleProducts(products, "mug", "price-desc").map((p) => p.id), [2]);
  assert.deepEqual(visibleProducts(products, "c", "price-asc").map((p) => p.id), [3, 1, 4]);
});

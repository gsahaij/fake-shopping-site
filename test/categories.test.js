import test from "node:test";
import assert from "node:assert/strict";
import { categoryOf, listCategories, filterByCategory, categoryCounts, categoryLabel } from "../src/categories.js";
import { products } from "../src/products.js";

test("categoryOf maps known ids and falls back to other", () => {
  assert.equal(categoryOf(products[0]), "toys");
  assert.equal(categoryOf({ id: 999 }), "other");
  assert.equal(categoryOf(null), "other");
});
test("listCategories is sorted and unique", () => {
  assert.deepEqual(listCategories(products), ["home", "kitchen", "stationery", "toys"]);
  assert.deepEqual(listCategories([{ id: 998 }, { id: 999 }]), ["other"]);
  assert.deepEqual(listCategories(null), []);
});
test("filterByCategory handles all, case and no match", () => {
  assert.equal(filterByCategory(products, "all").length, products.length);
  assert.equal(filterByCategory(products, "").length, products.length);
  assert.deepEqual(filterByCategory(products, " KITCHEN ").map((p) => p.id), [2]);
  assert.deepEqual(filterByCategory(products, "nope"), []);
});
test("categoryCounts tallies products", () => {
  assert.deepEqual(categoryCounts(products), { toys: 1, kitchen: 1, stationery: 1, home: 1 });
  assert.deepEqual(categoryCounts([{ id: 1 }, { id: 1 }]), { toys: 2 });
});
test("categoryLabel capitalizes", () => {
  assert.equal(categoryLabel("toys"), "Toys");
  assert.equal(categoryLabel(), "Other");
});

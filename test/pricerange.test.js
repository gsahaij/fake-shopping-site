import test from "node:test";
import assert from "node:assert/strict";
import { parseBound, normalizeRange, filterByPrice, rangeLabel } from "../src/pricerange.js";
import { products } from "../src/products.js";

test("parseBound accepts numbers and rejects junk", () => {
  assert.equal(parseBound("5"), 5);
  assert.equal(parseBound(0), 0);
  assert.equal(parseBound(""), null);
  assert.equal(parseBound(null), null);
  assert.equal(parseBound("abc"), null);
  assert.equal(parseBound("-3"), null);
});
test("normalizeRange swaps reversed bounds", () => {
  assert.deepEqual(normalizeRange(20, 5), { min: 5, max: 20 });
});
test("filterByPrice is inclusive and handles open ends", () => {
  assert.deepEqual(filterByPrice(products, 3.25, 12.5).map((p) => p.id), [2, 3]);
  assert.deepEqual(filterByPrice(products, 15, "").map((p) => p.id), [4]);
  assert.deepEqual(filterByPrice(products, null, 4).map((p) => p.id), [3]);
  assert.equal(filterByPrice(products, "", "").length, products.length);
  assert.deepEqual(filterByPrice(products, 100, 200), []);
});
test("rangeLabel describes the range", () => {
  assert.equal(rangeLabel("", ""), "Any price");
  assert.equal(rangeLabel("", 10), "Up to $10.00");
  assert.equal(rangeLabel(5, ""), "$5.00 and up");
  assert.equal(rangeLabel(10, 5), "$5.00 – $10.00");
});

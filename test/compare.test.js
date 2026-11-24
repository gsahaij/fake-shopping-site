import test from "node:test";
import assert from "node:assert/strict";
import { toggleCompare, compareProducts, compareSummary, compareLabel, MAX_COMPARE } from "../src/compare.js";

const products = [
  { id: 1, name: "Rubber Duck", price: 4.99 },
  { id: 2, name: "Mystery Mug", price: 12.5 },
  { id: 3, name: "Sticker Pack", price: 3.25 },
  { id: 4, name: "Desk Cactus", price: 18 },
];

test("toggleCompare adds, removes and caps without mutating", () => {
  const a = [1];
  assert.deepEqual(toggleCompare(a, 2), [1, 2]);
  assert.deepEqual(a, [1]);
  assert.deepEqual(toggleCompare([1, 2], 1), [2]);
  assert.equal(MAX_COMPARE, 3);
  assert.deepEqual(toggleCompare([1, 2, 3], 4), [1, 2, 3]);
  assert.deepEqual(toggleCompare(undefined, 1), [1]);
});

test("compareProducts keeps order and skips unknown ids", () => {
  assert.deepEqual(compareProducts([4, 99, 1], products).map((p) => p.id), [4, 1]);
});

test("compareSummary finds cheapest, priciest and spread", () => {
  assert.equal(compareSummary([]), null);
  assert.deepEqual(compareSummary(compareProducts([1, 2, 4], products)), {
    cheapest: "Rubber Duck", priciest: "Desk Cactus", spreadCents: 1301,
  });
});

test("compareLabel covers empty, single and multiple", () => {
  assert.equal(compareLabel([]), "Pick up to 3 products to compare");
  assert.match(compareLabel(compareProducts([1], products)), /add another/);
  assert.equal(compareLabel(compareProducts([3, 2], products)), "Sticker Pack is cheapest; price spread $9.25");
});

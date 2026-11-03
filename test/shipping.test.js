import test from "node:test";
import assert from "node:assert/strict";
import { shippingCents, remainingForFreeShipping, freeShippingProgress, FLAT_RATE } from "../src/shipping.js";

test("empty cart ships free (nothing to ship)", () => {
  assert.equal(shippingCents(0), 0);
});

test("flat rate below threshold, free at or above", () => {
  assert.equal(shippingCents(1000), FLAT_RATE);
  assert.equal(shippingCents(3499), FLAT_RATE);
  assert.equal(shippingCents(3500), 0);
  assert.equal(shippingCents(9000), 0);
});

test("remaining amount never goes negative", () => {
  assert.equal(remainingForFreeShipping(1000), 2500);
  assert.equal(remainingForFreeShipping(5000), 0);
});

test("progress is clamped to 0-100", () => {
  assert.equal(freeShippingProgress(0), 0);
  assert.equal(freeShippingProgress(1750), 50);
  assert.equal(freeShippingProgress(10000), 100);
});

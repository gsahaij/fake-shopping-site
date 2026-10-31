import test from "node:test";
import assert from "node:assert/strict";
import { discountCents } from "../src/promo.js";

test("percent code", () => assert.equal(discountCents("duck10", 1000), 100));
test("fixed code is capped at subtotal", () => {
  assert.equal(discountCents("FIVEOFF", 2000), 500);
  assert.equal(discountCents("FIVEOFF", 300), 300);
});
test("unknown, empty, or zero subtotal gives no discount", () => {
  assert.equal(discountCents("NOPE", 1000), 0);
  assert.equal(discountCents("", 1000), 0);
  assert.equal(discountCents("DUCK10", 0), 0);
});

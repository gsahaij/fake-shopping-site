import test from "node:test";
import assert from "node:assert/strict";
import { taxCents, taxLabel, TAX_RATE } from "../src/tax.js";

test("taxCents applies the default rate and rounds to the nearest cent", () => {
  assert.equal(taxCents(1000), 80);
  assert.equal(taxCents(499), 40); // 39.92 -> 40
});

test("taxCents is zero for empty or negative amounts", () => {
  assert.equal(taxCents(0), 0);
  assert.equal(taxCents(-500), 0);
});

test("taxCents accepts a custom rate", () => {
  assert.equal(taxCents(1000, 0.1), 100);
  assert.equal(taxCents(1000, 0), 0);
});

test("taxLabel shows the percentage", () => {
  assert.equal(taxLabel(), "Tax (8%)");
  assert.equal(taxLabel(0.0725), "Tax (7.25%)");
  assert.equal(TAX_RATE, 0.08);
});

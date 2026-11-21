import test from "node:test";
import assert from "node:assert/strict";
import { formatCents, parseToCents, dollarsToCents } from "../src/currency.js";

test("formatCents pads, groups thousands and handles negatives", () => {
  assert.equal(formatCents(0), "$0.00");
  assert.equal(formatCents(5), "$0.05");
  assert.equal(formatCents(123456789), "$1,234,567.89");
  assert.equal(formatCents(-250), "-$2.50");
});
test("formatCents tolerates bad input and custom symbol", () => {
  assert.equal(formatCents(NaN), "$0.00");
  assert.equal(formatCents(undefined), "$0.00");
  assert.equal(formatCents(1999, "€"), "€19.99");
});
test("parseToCents accepts common formats", () => {
  assert.equal(parseToCents("$1,234.50"), 123450);
  assert.equal(parseToCents("12.5"), 1250);
  assert.equal(parseToCents(" 7 "), 700);
});
test("parseToCents rejects junk and negatives", () => {
  for (const bad of ["", "abc", "-3", "1.234", null, "1..2"]) assert.equal(parseToCents(bad), null);
});
test("dollarsToCents avoids float error", () => {
  assert.equal(dollarsToCents(4.99), 499);
  assert.equal(dollarsToCents(0.1 + 0.2), 30);
  assert.equal(dollarsToCents(-1), 0);
});

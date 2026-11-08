import test from "node:test";
import assert from "node:assert/strict";
import { rateFor, taxCents, formatRate, DEFAULT_RATE_BPS } from "../src/tax.js";

test("known states are case/whitespace insensitive", () => {
  assert.equal(rateFor("ca"), 725);
  assert.equal(rateFor(" NY "), 400);
});

test("unknown or missing states use the default rate", () => {
  assert.equal(rateFor("ZZ"), DEFAULT_RATE_BPS);
  assert.equal(rateFor(undefined), DEFAULT_RATE_BPS);
  assert.equal(rateFor("constructor"), DEFAULT_RATE_BPS);
});

test("tax rounds to the nearest cent", () => {
  assert.equal(taxCents(1000, "CA"), 73); // 72.5 -> 73
  assert.equal(taxCents(3333, "TX"), 208);
});

test("no tax for zero/negative amounts or tax-free states", () => {
  assert.equal(taxCents(0, "CA"), 0);
  assert.equal(taxCents(-500, "CA"), 0);
  assert.equal(taxCents(5000, "OR"), 0);
});

test("formatRate trims trailing zeros", () => {
  assert.equal(formatRate(725), "7.25%");
  assert.equal(formatRate(400), "4%");
  assert.equal(formatRate(0), "0%");
});

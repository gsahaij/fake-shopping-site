import test from "node:test";
import assert from "node:assert/strict";
import { addBusinessDays, estimateDelivery, deliveryLabel, isBusinessDay } from "../src/delivery.js";

const iso = (d) => d.toISOString().slice(0, 10);

test("isBusinessDay flags weekends", () => {
  assert.equal(isBusinessDay(new Date("2026-11-27T00:00:00Z")), true); // Fri
  assert.equal(isBusinessDay(new Date("2026-11-28T00:00:00Z")), false); // Sat
  assert.equal(isBusinessDay(new Date("2026-11-29T00:00:00Z")), false); // Sun
});

test("addBusinessDays skips weekends and does not mutate", () => {
  const from = new Date("2026-11-25T00:00:00Z"); // Wed
  assert.equal(iso(addBusinessDays(from, 2)), "2026-11-27");
  assert.equal(iso(addBusinessDays(from, 3)), "2026-11-30");
  assert.equal(iso(from), "2026-11-25");
});

test("addBusinessDays handles zero, negatives, junk", () => {
  assert.equal(iso(addBusinessDays("2026-11-25T00:00:00Z", 0)), "2026-11-25");
  assert.equal(iso(addBusinessDays("2026-11-25T00:00:00Z", -3)), "2026-11-25");
  assert.equal(addBusinessDays("nope", 2), null);
});

test("standard is 5 business days, express is 2", () => {
  assert.equal(iso(estimateDelivery("2026-11-25T00:00:00Z")), "2026-12-02");
  assert.equal(iso(estimateDelivery("2026-11-25T00:00:00Z", "express")), "2026-11-27");
});

test("deliveryLabel formats or falls back", () => {
  assert.equal(deliveryLabel("2026-11-25T00:00:00Z", "express"), "Arrives Fri, Nov 27");
  assert.equal(deliveryLabel("bad"), "Delivery date unavailable");
});

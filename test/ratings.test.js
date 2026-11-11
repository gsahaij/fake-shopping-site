import test from "node:test";
import assert from "node:assert/strict";
import { validRatings, averageRating, starString, ratingBreakdown, ratingLabel } from "../src/ratings.js";

test("validRatings drops bad values and non-arrays", () => {
  assert.deepEqual(validRatings([1, 5, 0, 6, 3.5, "4", null]), [1, 5]);
  assert.deepEqual(validRatings(undefined), []);
});

test("averageRating rounds to one decimal and handles empty", () => {
  assert.equal(averageRating([5, 4, 4]), 4.3);
  assert.equal(averageRating([]), 0);
  assert.equal(averageRating([9, "x"]), 0);
});

test("starString rounds and clamps", () => {
  assert.equal(starString(4.3), "★★★★☆");
  assert.equal(starString(4.6), "★★★★★");
  assert.equal(starString(0), "☆☆☆☆☆");
  assert.equal(starString(99), "★★★★★");
  assert.equal(starString("nope"), "☆☆☆☆☆");
});

test("ratingBreakdown counts each star", () => {
  assert.deepEqual(ratingBreakdown([5, 5, 4, 2, 9]), { 1: 0, 2: 1, 3: 0, 4: 1, 5: 2 });
});

test("ratingLabel pluralizes", () => {
  assert.equal(ratingLabel([]), "No reviews yet");
  assert.equal(ratingLabel([4]), "4.0 (1 review)");
  assert.equal(ratingLabel([5, 4, 4]), "4.3 (3 reviews)");
});

import test from "node:test";
import assert from "node:assert/strict";
import { parseViewState, buildViewQuery } from "../src/urlstate.js";

test("parses query and sort", () => {
  assert.deepEqual(parseViewState("?q=duck&sort=price-asc"), { q: "duck", sort: "price-asc" });
});
test("defaults for empty, missing or invalid input", () => {
  assert.deepEqual(parseViewState(""), { q: "", sort: "default" });
  assert.deepEqual(parseViewState(null), { q: "", sort: "default" });
  assert.deepEqual(parseViewState("?sort=bogus&q=%20%20"), { q: "", sort: "default" });
});
test("builds an empty string for default state", () => {
  assert.equal(buildViewQuery(), "");
  assert.equal(buildViewQuery({ q: "  ", sort: "default" }), "");
  assert.equal(buildViewQuery({ sort: "nope" }), "");
});
test("builds and encodes non-default state", () => {
  assert.equal(buildViewQuery({ q: "rubber duck", sort: "name" }), "?q=rubber+duck&sort=name");
});
test("round-trips special characters", () => {
  const state = { q: "a&b=c ü", sort: "price-desc" };
  assert.deepEqual(parseViewState(buildViewQuery(state)), state);
});

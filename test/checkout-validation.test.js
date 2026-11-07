import test from "node:test";
import assert from "node:assert/strict";
import {
  validateEmail, validateName, validateZip, validateCard, validateExpiry, validateCvc, luhnValid, validateCheckout,
} from "../src/checkout-validation.js";

const NOW = new Date(2026, 10, 7);

test("email", () => {
  assert.equal(validateEmail("a@b.co"), "");
  assert.notEqual(validateEmail("a@b"), "");
  assert.notEqual(validateEmail("  "), "");
  assert.notEqual(validateEmail(undefined), "");
});
test("name and zip", () => {
  assert.equal(validateName("Jo"), "");
  assert.notEqual(validateName("J"), "");
  assert.equal(validateZip("12345"), "");
  assert.equal(validateZip("12345-6789"), "");
  assert.notEqual(validateZip("1234"), "");
});
test("luhn and card", () => {
  assert.equal(luhnValid("4242424242424242"), true);
  assert.equal(luhnValid("4242424242424241"), false);
  assert.equal(validateCard("4242 4242 4242 4242"), "");
  assert.equal(validateCard("4242-4242-4242-4242"), "");
  assert.notEqual(validateCard("4242 4242 4242 4241"), "");
  assert.notEqual(validateCard("abcd"), "");
});
test("expiry is valid through end of month", () => {
  assert.equal(validateExpiry("11/26", NOW), "");
  assert.equal(validateExpiry("12/30", NOW), "");
  assert.equal(validateExpiry("10/26", NOW), "Card has expired");
  assert.equal(validateExpiry("13/30", NOW), "Use MM/YY");
  assert.equal(validateExpiry("1126", NOW), "Use MM/YY");
});
test("cvc", () => {
  assert.equal(validateCvc("123"), "");
  assert.equal(validateCvc("1234"), "");
  assert.notEqual(validateCvc("12"), "");
});
test("validateCheckout reports only invalid fields", () => {
  const good = { name: "Ada Lovelace", email: "ada@example.com", zip: "90210", card: "4242424242424242", expiry: "12/30", cvc: "123" };
  assert.deepEqual(validateCheckout(good, NOW), {});
  assert.deepEqual(Object.keys(validateCheckout({ ...good, zip: "x", cvc: "" }, NOW)).sort(), ["cvc", "zip"]);
});

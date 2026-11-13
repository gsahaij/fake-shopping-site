import test from "node:test";
import assert from "node:assert/strict";
import { pushRecent, recentProducts, loadRecent, saveRecent, MAX_RECENT } from "../src/recent.js";

const products = [1, 2, 3, 4, 5, 6, 7].map((id) => ({ id, name: `P${id}`, price: 1 }));
const mem = (init) => {
  const d = { ...init };
  return { getItem: (k) => (k in d ? d[k] : null), setItem: (k, v) => { d[k] = v; } };
};

test("pushRecent puts newest first and de-duplicates", () => {
  assert.deepEqual(pushRecent([1, 2, 3], 2), [2, 1, 3]);
});

test("pushRecent caps the list and does not mutate", () => {
  const list = [1, 2, 3, 4, 5];
  assert.deepEqual(pushRecent(list, 6), [6, 1, 2, 3, 4]);
  assert.equal(list.length, MAX_RECENT);
});

test("pushRecent ignores invalid ids", () => {
  assert.deepEqual(pushRecent([1], "abc"), [1]);
});

test("recentProducts keeps order and skips unknown ids", () => {
  assert.deepEqual(recentProducts([3, 99, 1], products).map((p) => p.id), [3, 1]);
});

test("load/save round-trips and tolerates bad data", () => {
  const s = mem({});
  saveRecent(s, [2, 1]);
  assert.deepEqual(loadRecent(s, products), [2, 1]);
  assert.deepEqual(loadRecent(mem({ "fake-shop-recent": "{bad" }), products), []);
  assert.deepEqual(loadRecent(mem({ "fake-shop-recent": "[1,1,99,2]" }), products), [1, 2]);
});

import { products } from "./products.js";
import { discountCents } from "./promo.js";
import { visibleProducts } from "./search.js";
import { addItem, removeItem, countItems, totalCents, formatCents } from "./cart.js";

let cart = {};
let promo = "";
let query = "";
let sortMode = "default";
const $ = (id) => document.getElementById(id);

function render() {
  $("cart-count").textContent = countItems(cart);
  const sub = totalCents(cart, products);
  const disc = discountCents(promo, sub);
  $("cart-discount").textContent = `-${formatCents(disc)}`;
  $("cart-total").textContent = formatCents(sub - disc);
  $("cart-items").innerHTML = Object.entries(cart)
    .map(([id, qty]) => {
      const p = products.find((x) => x.id === Number(id));
      return `<li>${p.name} × ${qty} <button data-remove="${id}">−</button></li>`;
    })
    .join("");
}

function renderProducts() {
  const list = visibleProducts(products, query, sortMode);
  $("products").innerHTML = list.length
    ? list.map((p) => `<article><h3>${p.name}</h3><p>${formatCents(Math.round(p.price * 100))}</p><button data-add="${p.id}">Add to cart</button></article>`).join("")
    : "<p>No products match your search.</p>";
}
$("search").addEventListener("input", (e) => { query = e.target.value; renderProducts(); });
$("sort").addEventListener("change", (e) => { sortMode = e.target.value; renderProducts(); });
renderProducts();

document.addEventListener("click", (e) => {
  const t = e.target;
  if (t.dataset.add) cart = addItem(cart, t.dataset.add);
  else if (t.dataset.remove) cart = removeItem(cart, t.dataset.remove);
  else if (t.id === "cart-toggle") $("cart").hidden = !$("cart").hidden;
  else return;
  render();
});
$("promo-form").addEventListener("submit", (e) => {
  e.preventDefault();
  promo = $("promo-input").value;
  $("promo-msg").textContent = promo && discountCents(promo, 1e6) === 0 ? "Code not recognised" : "";
  render();
});
render();

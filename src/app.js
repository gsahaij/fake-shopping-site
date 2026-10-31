import { products } from "./products.js";
import { addItem, removeItem, countItems, totalCents, formatCents } from "./cart.js";

let cart = {};
const $ = (id) => document.getElementById(id);

function render() {
  $("cart-count").textContent = countItems(cart);
  $("cart-total").textContent = formatCents(totalCents(cart, products));
  $("cart-items").innerHTML = Object.entries(cart)
    .map(([id, qty]) => {
      const p = products.find((x) => x.id === Number(id));
      return `<li>${p.name} × ${qty} <button data-remove="${id}">−</button></li>`;
    })
    .join("");
}

$("products").innerHTML = products
  .map((p) => `<article><h3>${p.name}</h3><p>${formatCents(Math.round(p.price * 100))}</p><button data-add="${p.id}">Add to cart</button></article>`)
  .join("");

document.addEventListener("click", (e) => {
  const t = e.target;
  if (t.dataset.add) cart = addItem(cart, t.dataset.add);
  else if (t.dataset.remove) cart = removeItem(cart, t.dataset.remove);
  else if (t.id === "cart-toggle") $("cart").hidden = !$("cart").hidden;
  else return;
  render();
});
render();

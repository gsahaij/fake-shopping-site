import { products } from "./products.js";
import { discountCents } from "./promo.js";
import { visibleProducts } from "./search.js";
import { shippingCents, remainingForFreeShipping, freeShippingProgress } from "./shipping.js";
import { loadCart, saveCart } from "./storage.js";
import { cartLines, clearItem, lineLabel } from "./lines.js";
import { toggleWish, isWished, wishedProducts, loadWishlist, saveWishlist } from "./wishlist.js";
import { addItem, removeItem, countItems, totalCents, formatCents } from "./cart.js";

let cart = loadCart(window.localStorage, products);
let wishlist = loadWishlist(window.localStorage, products);
let promo = "";
let query = "";
let sortMode = "default";
const $ = (id) => document.getElementById(id);

function render() {
  saveCart(window.localStorage, cart);
  $("cart-count").textContent = countItems(cart);
  const sub = totalCents(cart, products);
  const disc = discountCents(promo, sub);
  $("cart-discount").textContent = `-${formatCents(disc)}`;
  const after = sub - disc;
  const ship = shippingCents(after);
  $("cart-shipping").textContent = ship ? formatCents(ship) : "FREE";
  $("cart-total").textContent = formatCents(after + ship);
  const left = remainingForFreeShipping(after);
  $("ship-msg").textContent = after === 0 ? "" : left ? `Add ${formatCents(left)} more for free shipping` : "You've unlocked free shipping!";
  $("ship-bar").value = freeShippingProgress(after);
  $("cart-items").innerHTML = cartLines(cart, products)
    .map((l) => `<li>${lineLabel(l)} <button data-remove="${l.id}" aria-label="Remove one ${l.name}">−</button><button data-add="${l.id}" aria-label="Add one ${l.name}">+</button><button data-clear="${l.id}" aria-label="Remove all ${l.name}">✕</button></li>`)
    .join("");
}

function renderProducts() {
  const list = visibleProducts(products, query, sortMode);
  $("products").innerHTML = list.length
    ? list.map((p) => `<article><h3>${p.name}</h3><p>${formatCents(Math.round(p.price * 100))}</p><button data-add="${p.id}">Add to cart</button> <button class="wish" data-wish="${p.id}" aria-pressed="${isWished(wishlist, p.id)}" aria-label="${isWished(wishlist, p.id) ? "Remove" : "Add"} ${p.name} ${isWished(wishlist, p.id) ? "from" : "to"} wishlist">${isWished(wishlist, p.id) ? "♥" : "♡"}</button></article>`).join("")
    : "<p>No products match your search.</p>";
}
$("search").addEventListener("input", (e) => { query = e.target.value; renderProducts(); });
$("sort").addEventListener("change", (e) => { sortMode = e.target.value; renderProducts(); });
renderProducts();

function renderWishlist() {
  saveWishlist(window.localStorage, wishlist);
  $("wish-count").textContent = wishlist.length;
  $("wishlist-items").innerHTML = wishedProducts(wishlist, products)
    .map((p) => `<li>${p.name} <button data-add="${p.id}">Add to cart</button></li>`)
    .join("") || "<li>Nothing saved yet.</li>";
}
renderWishlist();

document.addEventListener("click", (e) => {
  const t = e.target;
  if (t.dataset.add) cart = addItem(cart, t.dataset.add);
  else if (t.dataset.wish) {
    wishlist = toggleWish(wishlist, Number(t.dataset.wish));
    renderWishlist();
    renderProducts();
    return;
  }
  else if (t.dataset.clear) cart = clearItem(cart, t.dataset.clear);
  else if (t.dataset.remove) cart = removeItem(cart, t.dataset.remove);
  else if (t.id === "wish-toggle") $("wishlist").hidden = !$("wishlist").hidden;
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

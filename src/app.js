import { products } from "./products.js";
import { discountCents } from "./promo.js";
import { visibleProducts } from "./search.js";
import { shippingCents, remainingForFreeShipping, freeShippingProgress } from "./shipping.js";
import { loadCart, saveCart } from "./storage.js";
import { loadWishlist, saveWishlist, toggleWish, isWished, wishedProducts } from "./wishlist.js";
import { addItem, removeItem, countItems, totalCents, formatCents } from "./cart.js";

let cart = loadCart(window.localStorage, products);
let wishlist = loadWishlist(window.localStorage, products);
let onlyWished = false;
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
  $("cart-items").innerHTML = Object.entries(cart)
    .map(([id, qty]) => {
      const p = products.find((x) => x.id === Number(id));
      return `<li>${p.name} × ${qty} <button data-remove="${id}">−</button></li>`;
    })
    .join("");
}

function renderProducts() {
  saveWishlist(window.localStorage, wishlist);
  $("wish-count").textContent = wishlist.length;
  const base = onlyWished ? wishedProducts(products, wishlist) : products;
  const list = visibleProducts(base, query, sortMode);
  $("products").innerHTML = list.length
    ? list.map((p) => `<article><h3>${p.name}</h3><p>${formatCents(Math.round(p.price * 100))}</p><button data-add="${p.id}">Add to cart</button> <button class="wish" data-wish="${p.id}" aria-pressed="${isWished(wishlist, p.id)}" aria-label="${isWished(wishlist, p.id) ? "Remove from" : "Add to"} wishlist: ${p.name}">${isWished(wishlist, p.id) ? "♥" : "♡"}</button></article>`).join("")
    : `<p>${onlyWished ? "Your wishlist is empty." : "No products match your search."}</p>`;
}
$("search").addEventListener("input", (e) => { query = e.target.value; renderProducts(); });
$("sort").addEventListener("change", (e) => { sortMode = e.target.value; renderProducts(); });
renderProducts();

document.addEventListener("click", (e) => {
  const t = e.target;
  if (t.dataset.wish) { wishlist = toggleWish(wishlist, t.dataset.wish); renderProducts(); return; }
  if (t.id === "wish-toggle") { onlyWished = !onlyWished; t.setAttribute("aria-pressed", onlyWished); renderProducts(); return; }
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

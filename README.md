# Fake Shopping Site

A tiny static storefront (no build step) for experimenting.

- `index.html` – page shell
- `src/products.js` – product catalog
- `src/cart.js` – pure cart logic (add/remove/total)
- `src/promo.js` – promo codes (try `DUCK10`, `FIVEOFF`)
- `src/search.js` – product search and sorting
- `src/storage.js` – cart persistence in localStorage (survives reloads)
- `src/shipping.js` – flat-rate shipping, free over $35, with progress helper
- `src/lines.js` – cart line items with per-line totals (+/− controls in the cart)
- `src/styles.css` – basic styling
- `src/app.js` – DOM rendering
- `test/` – unit tests

Run: `npm start` then open http://localhost:8000. Test: `npm test`.

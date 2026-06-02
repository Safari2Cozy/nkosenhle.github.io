# MAISON — Furniture E-Commerce (front-end)

A premium, conversion-focused furniture storefront. Vanilla HTML/CSS/JS — no build step.

## Run
Just open `index.html` in a browser. (For the cleanest result, serve the folder:
`python3 -m http.server` then visit http://localhost:8000)

## Structure
- index.html        — markup + page views (Home / Shop / Product / Cart)
- css/styles.css    — full design system (tokens, components, responsive)
- js/app.js         — product data, rendering, cart, filters, search, interactions
- images/*.svg      — furniture illustration assets

## Swap in real photography
Replace the `<img src="images/*.svg">` assets with product/lifestyle photos
(keep the warm tonal background as the loading state). The hero is `images/hero.svg`.

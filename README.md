# Maison & Stone — Luxury Renovations . Interiors (landing page)

A single-page lookbook / landing site for a luxury kitchen renovation &
interiors business (South Africa, Eswatini & Zimbabwe). Vanilla HTML/CSS/JS
— no build step. WhatsApp is the primary contact channel throughout.

## Run
Just open `index.html` in a browser. (For the cleanest result, serve the folder:
`python3 -m http.server` then visit http://localhost:8000)

## Structure
- index.html         — the whole page: hero, lookbook, booking promo, trust,
                        testimonials, contact, footer, WhatsApp lightbox
- css/styles.css     — full design system (tokens, components, responsive)
- js/app.js          — curated lookbook data, style-filter tabs, lightbox,
                        WhatsApp link builder, testimonials/trust rendering
- images/logo-mark.png — brand icon, cropped from the Maison & Stone logo
- images/hero-photo.jpg — hero background photo
- images/portfolio/  — all 45 watermarked photos live here; only 9 are
                        used in the lookbook (see below) — the rest are kept
                        on disk so you can swap any of the 9 out easily

## Contact details (already wired in)
- WhatsApp: +27 83 394 2575 (`PHONE` constant at the top of `js/app.js`)
- Instagram: @maisonandstoneZA
- Facebook: "Maison and Stone" — **the footer/contact links currently point
  to `facebook.com/maisonandstoneZA` as a best guess. Please confirm your
  actual Facebook page URL and update it in `index.html`** (search for
  `facebook.com/maisonandstoneZA`, appears 3 times) if it's different.
- Email and a street address were intentionally left out — WhatsApp/Call
  are the primary CTAs. Add an email footer line if you'd like one.

Every WhatsApp button uses a `data-wa="<message>"` attribute — the JS turns
it into a `wa.me` link with that message pre-filled. To change any of the
pre-filled messages, just edit the `data-wa` text in `index.html`.

## The lookbook is intentionally curated
Only 9 of the 45 available photos are shown, on purpose — the page invites
visitors to WhatsApp in for the "full lookbook" rather than showing
everything up front. To swap which 9 appear, edit the `looks` array at the
top of `js/app.js` (each entry: id, name, mood, image path, blurb). The
`mood` value must be one of: Modern / Warm & Traditional / Bright & Airy /
Dark & Moody, so it works with the filter tabs.

## Notes
This started from a furniture e-commerce demo template, was first turned
into a full multi-page portfolio site, then simplified into this single-page
lookbook + WhatsApp-first landing page per your request. No cart, pricing,
checkout, search, or wishlist — just the lookbook and a fast path to
WhatsApp/Call.

# Njoh iPhone — WhatsApp shop site

Static sales page (Parfumino-style) with **EN / FR** and WhatsApp ask links.

## Setup

1. Set WhatsApp in [`js/wa.js`](./js/wa.js) (`WA_NUMBER`, digits only, country code, no `+`).
2. Replace example models in [`data/catalog.json`](./data/catalog.json) with real stock.
3. Fill delivery facts on the homepage when known.

## Local

```bash
cd njoh-iphone-site
python3 -m http.server 8080
```

## Hosting

- OpenBot site (publish tool)
- GitHub Pages from this repo (`docs/` or root on `gh-pages` / `main`)

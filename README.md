# Second Life AV website

A static, multi-page website for **Second Life AV by Workspace AV**. It covers refurbished meeting-room AV, buy-back and decommissioning.

- Plain HTML, CSS and JavaScript, with no framework and no dependencies.
- Pages are assembled from shared parts by a small bash script.
- Hosted on GitHub Pages. It's ready to move to secondlifeav.com.

## Structure

```
build.sh                 builds site/*.html from src/
src/config.sh            store links, contact details, site URL (edit here)
src/partials/            shared <head>, header/menu, footer (+ icon set)
src/pages/*.html         one file per page (metadata block + page body)
site/                    the published website
  css/styles.css         all styles (brand colours at the top)
  js/products.js         product and category data
  js/main.js             menu, product cards, shop filters, VAT toggle, forms
  assets/img/            photography
  assets/brand/          mark, favicon, logo lockups (SVG)
tools/make-lockups.sh    regenerates the logo lockup SVGs
serve.ps1                local preview server (Windows)
```

## Common tasks

| Task | How |
|---|---|
| Change the Shopify or eBay link, phone, email or address | Edit `src/config.sh`, then run `bash build.sh` |
| Edit page text | Edit `src/pages/<page>.html`, then run `bash build.sh` |
| Change the menu or footer | Edit `src/partials/header.html` or `footer.html`, then run `bash build.sh` |
| Add or remove products | Edit `site/js/products.js` (no build needed) |
| Preview locally | `powershell -ExecutionPolicy Bypass -File serve.ps1`, then open http://localhost:8080 |
| Publish | Push to `main`. GitHub Actions builds the site and deploys it to Pages |

## Moving to secondlifeav.com
0. Set `PREVIEW_NOINDEX=false` in `src/config.sh` and delete `site/robots.txt` so search engines can index the site.
1. Set `SITE_URL="https://secondlifeav.com/"` in `src/config.sh`.
2. Add `site/CNAME` containing `secondlifeav.com`.
3. In the repo's Settings → Pages, set the custom domain and enable HTTPS.
4. Point the domain's DNS at GitHub Pages: A records to 185.199.108–111.153, or a CNAME for `www`.

## Connecting the Shopify store
The site can show products live from Shopify, in its own design, with checkout handled by Shopify. It is built and tested against Shopify's public demo shop; switching to the real store takes two settings.

1. In Shopify admin, add the free **Headless** sales channel (Shopify App Store), create a storefront and copy its **public access token**. The public token is designed to be used in websites.
2. In the Headless storefront's permissions, allow reading products, product tags and inventory, and allow cart / checkout.
3. In `src/config.sh` set:
   - `SHOP_SOURCE="shopify"`
   - `SHOPIFY_DOMAIN="<store>.myshopify.com"`
   - `SHOPIFY_STOREFRONT_TOKEN="<public token>"`
   - `SHOPIFY_URL` to the store's web address (used as a fallback link)
4. Run `bash build.sh`, preview locally, then push.

Test locally against the demo shop without changing the live settings: `SHOP_SOURCE=shopify bash build.sh` (then run `bash build.sh` again before committing).

### How staff set up products in Shopify
| Site field | Where it comes from in Shopify |
|---|---|
| Brand | **Vendor** |
| Title, photo, price | Product title, first image, price (enter prices including VAT) |
| Category | **Product type** set to one of: Video conferencing, Displays & LED, Audio & DSP, Control & switching, Room booking, Mounts, cabling & docks (or a tag such as `cat:vc`) |
| Grade badge | A tag: `Grade A`, `Grade B`, `Grade C` or `New` |
| Part number | The variant **SKU** |
| Spec line | The first sentence of the description |
| Sold out | Automatic when stock reaches zero |

Newest products appear first and in the home page "Just in" section. Products without a category still appear under All stock.

## Still to do before launch
- **Shopify:** create the store, then follow "Connecting the Shopify store" above.
- **Forms:** connect them to a form service such as Formspree, or to Shopify forms. Right now they show a preview message.
- **Product photos:** use real photos for each listing; the line illustrations are stand-ins.
- **Policies:** confirm grades, warranty terms, delivery prices, returns and the extended warranty.
- **Legal details:** add the company and VAT numbers, confirm contact details, and link to privacy and cookie policies.
- **Logo:** get a vector (SVG) version of the mark, for a true reversed logo and sharper display.

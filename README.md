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
1. Set `SITE_URL="https://secondlifeav.com/"` in `src/config.sh`.
2. Add `site/CNAME` containing `secondlifeav.com`.
3. In the repo's Settings → Pages, set the custom domain and enable HTTPS.
4. Point the domain's DNS at GitHub Pages: A records to 185.199.108–111.153, or a CNAME for `www`.

## Still to do before launch
- **Shopify:** replace the placeholder link with the live store. Shopify will then hold real products, stock, checkout and trade pricing.
- **Forms:** connect them to a form service such as Formspree, or to Shopify forms. Right now they show a preview message.
- **Product photos:** use real photos for each listing; the line illustrations are stand-ins.
- **Policies:** confirm grades, warranty terms, delivery prices, returns and the extended warranty.
- **Legal details:** add the company and VAT numbers, confirm contact details, and link to privacy and cookie policies.
- **Logo:** get a vector (SVG) version of the mark, for a true reversed logo and sharper display.

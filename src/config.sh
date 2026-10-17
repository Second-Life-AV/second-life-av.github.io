# Site-wide settings. Edit here, then run `bash build.sh`.

# Public URL the site is served from (used for canonical and social tags).
# Switch to https://secondlifeav.com/ when the domain is pointed at the site.
SITE_URL="https://second-life-av.github.io/"

# Stores
SHOPIFY_URL="https://www.shopify.com/"            # placeholder until the Shopify store exists
EBAY_URL="https://www.ebay.co.uk/usr/secondlifeav"
INSTAGRAM_URL="https://www.instagram.com/secondlifeav/"
INSTAGRAM_HANDLE="secondlifeav"

# Contact (currently Workspace AV's London sales line and inbox; confirm before going live)
PHONE="+44 (0)20 3151 2120"
PHONE_TEL="+442031512120"
EMAIL="info@workspaceav.com"
ADDRESS="167–169 Great Portland Street, London W1W 5PF"

# Legal details shown in the footer (to be confirmed)
COMPANY_NO="TBC"
VAT_NO="TBC"

# While true, every page tells search engines not to index it (preview only).
# Set to false at launch, and delete site/robots.txt.
PREVIEW_NOINDEX=true

# Where product listings come from:
#   "sample"  = the sample stock in site/js/products.js (used for the preview)
#   "shopify" = live products from the Shopify store below
SHOP_SOURCE="${SHOP_SOURCE:-sample}"

# Shopify store connection (Storefront API). "audio.mock.shop" is Shopify's public demo shop for testing.
# For the real store: SHOPIFY_DOMAIN="their-store.myshopify.com" and the public Storefront token
# from Shopify's free "Headless" app. The token is designed to be public, so it's safe in the website.
SHOPIFY_DOMAIN="${SHOPIFY_DOMAIN:-audio.mock.shop}"
SHOPIFY_STOREFRONT_TOKEN="${SHOPIFY_STOREFRONT_TOKEN:-}"
SHOPIFY_API_VERSION="2025-07"

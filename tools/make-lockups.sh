#!/usr/bin/env bash
# Generates the Second Life AV logo lockups as SVG in site/assets/brand/lockups/.
# The mark is embedded unchanged from secondlife-mark.webp (never redrawn or recoloured).
# The wordmark uses Outfit; outline the text in a design tool before using these for print.
set -euo pipefail
cd "$(dirname "$0")/.."
out=site/assets/brand/lockups
mkdir -p "$out"
mark=$(base64 -w0 site/assets/brand/secondlife-mark.webp)

INK="#021E1E"; GREEN="#10C66F"; WHITE="#FFFFFF"

# $1 file, $2 variant (classic|twotone|signal), $3 theme (standard|reversed)
lockup() {
  local file=$1 variant=$2 theme=$3
  local bg text sub second
  if [[ $theme == reversed ]]; then bg=$INK; text=$WHITE; sub=$WHITE; else bg=$WHITE; text=$INK; sub=$INK; fi
  second=$text
  [[ $variant == twotone ]] && second=$GREEN
  local extra=""
  if [[ $variant == signal ]]; then
    # Signal arcs in green, echoing the Workspace AV signal icon
    extra="<path d=\"M508 50a26 26 0 0 1 0 36M520 40a40 40 0 0 1 0 56\" fill=\"none\" stroke=\"$GREEN\" stroke-width=\"5\" stroke-linecap=\"square\"/>"
  fi
  local width=540
  [[ $variant == signal ]] && width=560
  cat > "$out/$file" <<SVG
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 $width 160" width="$width" height="160" role="img" aria-label="Second Life Audio Visual">
  <title>Second Life AV ($variant, $theme)</title>
  <style>@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500&amp;display=swap');
    .w{font-family:Outfit,'Segoe UI',Arial,sans-serif}</style>
  <defs><clipPath id="r"><rect x="10" y="10" width="140" height="140" rx="16"/></clipPath></defs>
  <rect width="$width" height="160" fill="$bg"/>
  <image x="10" y="10" width="140" height="140" clip-path="url(#r)" href="data:image/webp;base64,$mark"/>
  <text class="w" x="172" y="86" font-size="48" font-weight="500" fill="$text" textLength="322" lengthAdjust="spacingAndGlyphs">SECOND<tspan fill="$second">LIFE</tspan></text>
  <text class="w" x="174" y="122" font-size="19" font-weight="400" fill="$sub" textLength="232" lengthAdjust="spacing">AUDIO VISUAL</text>
  $extra
</svg>
SVG
}

for v in classic twotone signal; do
  lockup "slav-lockup-$v-standard.svg" "$v" standard
  lockup "slav-lockup-$v-reversed.svg" "$v" reversed
done
ls "$out"

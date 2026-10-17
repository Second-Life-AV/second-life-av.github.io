// Second Life AV: navigation, product rendering, shop filters, VAT toggle, demo forms.
(function () {
  "use strict";

  var cfg = window.SLAV_CONFIG || {};
  var products = window.SLAV_PRODUCTS || [];
  var categories = window.SLAV_CATEGORIES || [];
  var grades = window.SLAV_GRADES || {};
  var VAT = 1.2;

  function el(html) { var t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstElementChild; }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function gbp(n) { return "£" + n.toFixed(2); }
  function store(key, val) { try { if (val === undefined) return localStorage.getItem(key); localStorage.setItem(key, val); } catch (e) { return null; } }

  /* Navigation */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") !== "true";
      toggle.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("open", open);
      document.body.classList.toggle("nav-open", open);
      toggle.querySelector("use").setAttribute("href", open ? "#i-close" : "#i-menu");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) toggle.click();
    });
  }
  document.querySelectorAll(".has-sub > .nav-link").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var li = btn.parentElement;
      var open = !li.classList.contains("open");
      document.querySelectorAll(".has-sub.open").forEach(function (o) { if (o !== li) { o.classList.remove("open"); o.firstElementChild.setAttribute("aria-expanded", "false"); } });
      li.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", String(open));
    });
  });
  document.addEventListener("click", function (e) {
    if (window.matchMedia("(min-width: 1181px)").matches && !e.target.closest(".has-sub")) {
      document.querySelectorAll(".has-sub.open").forEach(function (o) { o.classList.remove("open"); o.firstElementChild.setAttribute("aria-expanded", "false"); });
    }
  });

  /* Store links from config */
  document.querySelectorAll("[data-shopify]").forEach(function (a) { a.href = cfg.shopifyUrl; });
  document.querySelectorAll("[data-ebay]").forEach(function (a) { a.href = cfg.ebayUrl; });

  /* Product cards */
  var vatMode = store("slav-vat") === "ex" ? "ex" : "inc";

  function priceHtml(p) {
    var inc = p.price, ex = p.price / VAT;
    var main = vatMode === "ex" ? gbp(ex) + ' <small class="muted">ex VAT</small>' : gbp(inc);
    var alt = vatMode === "ex" ? gbp(inc) + " inc VAT" : gbp(ex) + " ex VAT";
    return '<span class="price-main">' + main + '</span><span class="price-alt">' + alt + "</span>";
  }

  function card(p) {
    var gradeLabel = grades[p.grade] || p.grade;
    var warranty = p.grade === "N" ? "Manufacturer warranty" : "12-month warranty";
    return el(
      '<article class="product" data-id="' + p.id + '" data-cat="' + p.cat + '" data-brand="' + esc(p.brand) + '" data-grade="' + p.grade + '" data-price="' + p.price + '" data-added="' + p.added + '">' +
        '<div class="product-art">' +
          '<div class="product-badges"><span class="grade grade-' + p.grade + '">' + esc(gradeLabel) + '</span>' +
          '<span class="chip"><svg class="i" aria-hidden="true"><use href="#i-check"/></svg>Tested</span></div>' +
          '<svg class="pi" viewBox="0 0 120 90" role="img" aria-label="' + esc(p.brand + " " + p.title) + ' (illustration)"><use href="#' + p.art + '"/></svg>' +
        "</div>" +
        '<div class="product-body">' +
          '<span class="product-brand">' + esc(p.brand) + "</span>" +
          '<h3 class="product-title">' + esc(p.title) + "</h3>" +
          '<p class="product-spec">' + esc(p.spec) + "</p>" +
          '<span class="product-part">Part no. ' + esc(p.part) + "</span>" +
          '<ul class="product-ticks"><li><svg class="i" aria-hidden="true"><use href="#i-check"/></svg>' + warranty + '</li><li><svg class="i" aria-hidden="true"><use href="#i-check"/></svg>VAT invoice</li></ul>' +
          '<div class="product-foot"><div class="price">' + priceHtml(p) + "</div>" +
            '<div class="product-actions"><a class="btn btn-dark" href="' + esc(cfg.shopifyUrl) + '" target="_blank" rel="noopener">Buy now</a>' +
            '<a class="ebay" href="' + esc(cfg.ebayUrl) + '" target="_blank" rel="noopener">Also on eBay</a></div>' +
          "</div>" +
        "</div>" +
      "</article>"
    );
  }

  function refreshPrices() {
    document.querySelectorAll(".product").forEach(function (c) {
      var p = products.find(function (x) { return x.id === c.dataset.id; });
      if (p) c.querySelector(".price").innerHTML = priceHtml(p);
    });
    document.querySelectorAll(".vat-toggle button").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.vat === vatMode)); });
  }
  document.querySelectorAll(".vat-toggle button").forEach(function (b) {
    b.addEventListener("click", function () { vatMode = b.dataset.vat; store("slav-vat", vatMode); refreshPrices(); });
  });

  /* "Just in" rail: newest first */
  document.querySelectorAll("[data-just-in]").forEach(function (rail) {
    var n = parseInt(rail.dataset.justIn, 10) || 8;
    products.slice().sort(function (a, b) { return b.added - a.added; }).slice(0, n).forEach(function (p) { rail.appendChild(card(p)); });
  });

  /* Category tiles are static HTML; fill in live stock counts */
  document.querySelectorAll("[data-cat-count]").forEach(function (span) {
    var count = products.filter(function (p) { return p.cat === span.dataset.catCount; }).length;
    if (count) span.textContent = count + (count === 1 ? " item" : " items") + " in stock";
  });

  /* Brand counts on the brands page */
  document.querySelectorAll("[data-brand-count]").forEach(function (span) {
    var b = span.dataset.brandCount.toLowerCase();
    var count = products.filter(function (p) { return p.brand.toLowerCase().indexOf(b) === 0; }).length;
    span.textContent = count ? count + (count === 1 ? " item in stock" : " items in stock") : "We buy this brand";
  });

  /* Shop page */
  var grid = document.getElementById("product-grid");
  if (grid) {
    var params = new URLSearchParams(location.search);
    var form = document.getElementById("filters");
    var countEl = document.getElementById("result-count");
    var sortEl = document.getElementById("sort");
    var brands = Array.from(new Set(products.map(function (p) { return p.brand; }))).sort();

    function checkbox(name, value, label, count, checked) {
      return '<label class="check"><input type="checkbox" name="' + name + '" value="' + esc(value) + '"' + (checked ? " checked" : "") + "> " + esc(label) + '<span class="count">' + count + "</span></label>";
    }
    var catBox = document.getElementById("f-cat");
    var brandBox = document.getElementById("f-brand");
    var gradeBox = document.getElementById("f-grade");
    var catParam = params.get("cat"), brandParam = params.get("brand");
    categories.forEach(function (c) {
      catBox.insertAdjacentHTML("beforeend", checkbox("cat", c.id, c.name, products.filter(function (p) { return p.cat === c.id; }).length, catParam === c.id));
    });
    brands.forEach(function (b) {
      brandBox.insertAdjacentHTML("beforeend", checkbox("brand", b, b, products.filter(function (p) { return p.brand === b; }).length, brandParam && b.toLowerCase().indexOf(brandParam.toLowerCase()) === 0));
    });
    ["N", "A", "B", "C"].forEach(function (g) {
      var n = products.filter(function (p) { return p.grade === g; }).length;
      if (n) gradeBox.insertAdjacentHTML("beforeend", checkbox("grade", g, grades[g], n, false));
    });

    var cards = products.map(function (p) { var c = card(p); grid.appendChild(c); return c; });

    function apply() {
      var data = new FormData(form);
      var cats = data.getAll("cat"), brs = data.getAll("brand"), grs = data.getAll("grade");
      var shown = 0;
      cards.forEach(function (c) {
        var ok = (!cats.length || cats.indexOf(c.dataset.cat) > -1) &&
                 (!brs.length || brs.indexOf(c.dataset.brand) > -1) &&
                 (!grs.length || grs.indexOf(c.dataset.grade) > -1);
        c.hidden = !ok;
        if (ok) shown++;
      });
      var key = sortEl.value;
      cards.slice().sort(function (a, b) {
        if (key === "price-asc") return a.dataset.price - b.dataset.price;
        if (key === "price-desc") return b.dataset.price - a.dataset.price;
        return b.dataset.added - a.dataset.added;
      }).forEach(function (c) { grid.appendChild(c); });
      countEl.textContent = shown + (shown === 1 ? " item" : " items");
      document.getElementById("empty").hidden = shown > 0;
      var title = document.getElementById("shop-title");
      if (title) {
        var c1 = cats.length === 1 ? categories.find(function (c) { return c.id === cats[0]; }) : null;
        title.textContent = c1 ? "Refurbished " + c1.name.toLowerCase() : (brs.length === 1 ? "Refurbished " + brs[0] + " AV" : "Refurbished AV equipment");
      }
    }
    form.addEventListener("change", apply);
    sortEl.addEventListener("change", apply);
    document.getElementById("clear-filters").addEventListener("click", function () {
      form.querySelectorAll("input[type=checkbox]").forEach(function (i) { i.checked = false; });
      history.replaceState(null, "", location.pathname);
      apply();
    });
    var ft = document.querySelector(".filters-toggle");
    if (ft) ft.addEventListener("click", function () {
      var open = form.classList.toggle("open");
      ft.setAttribute("aria-expanded", String(open));
    });
    apply();
  }
  refreshPrices();

  /* YouTube: load the player only when clicked */
  document.querySelectorAll("[data-youtube]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var f = document.createElement("iframe");
      f.src = "https://www.youtube-nocookie.com/embed/" + btn.dataset.youtube + "?autoplay=1&rel=0";
      f.title = btn.getAttribute("aria-label") || "Video";
      f.allow = "autoplay; encrypted-media; picture-in-picture";
      f.allowFullscreen = true;
      btn.replaceChildren(f);
    }, { once: true });
  });

  /* Forms: not connected yet, so show a clear preview message */
  document.querySelectorAll("form[data-demo]").forEach(function (f) {
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!f.reportValidity()) return;
      var s = f.querySelector(".form-status");
      if (s) { s.classList.add("show"); s.focus(); }
      f.querySelectorAll("button[type=submit]").forEach(function (b) { b.disabled = true; });
    });
  });
})();

/* Home hero: muted, looping YouTube video. The poster stays until playback actually starts. */
(function () {
  "use strict";
  var box = document.querySelector("[data-hero-video]");
  if (!box) return;
  var startBtn = box.querySelector(".video-start");
  // Clicking play (autoplay blocked, or reduced motion) loads the full player with sound and controls
  if (startBtn) startBtn.addEventListener("click", function () {
    var old = box.querySelector("iframe");
    if (old) old.remove();
    var p = document.createElement("iframe");
    p.src = "https://www.youtube-nocookie.com/embed/" + box.dataset.heroVideo + "?autoplay=1&rel=0&playsinline=1&modestbranding=1";
    p.title = box.dataset.title || "Video";
    p.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
    p.allowFullscreen = true;
    box.appendChild(p);
    box.classList.add("playing", "interactive");
    var s = box.querySelector(".video-sound");
    if (s) s.remove();
  });
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var id = box.dataset.heroVideo;
  var btn = box.querySelector(".video-sound");
  var muted = true;
  var f = document.createElement("iframe");
  f.src = "https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1&mute=1&loop=1&playlist=" + id +
    "&controls=0&rel=0&playsinline=1&modestbranding=1&disablekb=1&iv_load_policy=3&enablejsapi=1&origin=" + encodeURIComponent(location.origin);
  f.title = box.dataset.title || "Video";
  f.allow = "autoplay; encrypted-media; picture-in-picture";
  f.tabIndex = -1;

  function send(func, args) {
    f.contentWindow && f.contentWindow.postMessage(JSON.stringify({ event: "command", func: func, args: args || [] }), "*");
  }
  f.addEventListener("load", function () {
    // Ask the player to report its state so we know when it's really playing
    f.contentWindow.postMessage(JSON.stringify({ event: "listening", id: 1, channel: "widget" }), "*");
  });
  window.addEventListener("message", function (e) {
    if (!/^https:\/\/www\.youtube(-nocookie)?\.com$/.test(e.origin)) return;
    var d; try { d = JSON.parse(e.data); } catch (err) { return; }
    var state = d.event === "onStateChange" ? d.info : (d.info && d.info.playerState);
    var t = d.info && typeof d.info.currentTime === "number" ? d.info.currentTime : 0;
    if ((state === 1 || t > 0.3) && !box.classList.contains("playing")) {
      box.classList.add("playing");
      if (btn) btn.hidden = false;
    }
  });
  if (btn) btn.addEventListener("click", function () {
    muted = !muted;
    send(muted ? "mute" : "unMute");
    if (!muted) send("setVolume", [80]);
    btn.setAttribute("aria-pressed", String(!muted));
    btn.querySelector("span").textContent = muted ? "Sound on" : "Sound off";
    btn.querySelector("use").setAttribute("href", muted ? "#i-sound-off" : "#i-sound-on");
  });
  box.appendChild(f);
})();

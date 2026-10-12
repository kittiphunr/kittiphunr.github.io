/* Projects index (/projects/): lists every project in data/portfolio.json.
   Adding a project to the JSON is enough; no change is needed here.
   Paths are relative to /projects/, so the page also works under a sub-folder.

   Three scroll-driven 3D layouts of the same list, switched with the buttons or ?view=a|b|c:
     a  Deck      cards stack up as you scroll; the one underneath tilts back
     b  Drum      a vertical wheel: the row at the centre faces you, the others roll away
     c  Corridor  cards on two walls swing in from the sides along a centre line
   Each layout only sets CSS variables from the scroll position (see pages.css);
   with animations off (device setting or the home page's switch) it is a plain list. */
(function () {
  "use strict";
  var CODES = ["th", "en", "ja", "zh"];
  var VIEWS = ["a", "b", "c"];
  var UI = {
    th: { badge: "ผลงานทั้งหมด", title: "โปรเจกต์", lead: "รวมผลงานและระบบที่พัฒนา — เลื่อนดูทีละชิ้น เปิดโปรเจกต์หรืออ่านรายละเอียดได้จากการ์ด", open: "เปิดโปรเจกต์", details: "รายละเอียด", home: "หน้าแรก", empty: "ยังไม่มีโปรเจกต์", err: "โหลดรายการโปรเจกต์ไม่สำเร็จ ลองรีเฟรชหน้านี้อีกครั้ง", foot: "© กิตติพันธ์ รัตนคร", viewLabel: "รูปแบบการแสดงผล", viewHint: "ลองสลับ 3 แบบเพื่อเลือกแบบที่ชอบ", count: "{n} ผลงาน", viewA: "สำรับการ์ด", viewB: "วงล้อ", viewC: "ทางเดิน", featured: "ผลงานเด่น" },
    en: { badge: "All projects", title: "Projects", lead: "Systems and tools I have built. Scroll through them one by one, then open a project or read its details from its card.", open: "Open project", details: "Details", home: "Home", empty: "No projects yet.", err: "Could not load the project list. Please refresh the page.", foot: "© Kittiphun Ruttanakorn", viewLabel: "Layout", viewHint: "Try the 3 layouts and pick your favourite", count: "{n} projects", viewA: "Deck", viewB: "Drum", viewC: "Corridor", featured: "Featured" },
    ja: { badge: "すべての実績", title: "プロジェクト", lead: "開発したシステムとツールの一覧です。スクロールして一つずつ眺め、カードから詳細を見たり開いたりできます。", open: "開く", details: "詳細", home: "ホーム", empty: "プロジェクトはまだありません。", err: "プロジェクト一覧を読み込めませんでした。ページを再読み込みしてください。", foot: "© Kittiphun Ruttanakorn", viewLabel: "表示形式", viewHint: "3 つの表示を試して好みを選んでください", count: "{n} 件", viewA: "デッキ", viewB: "ドラム", viewC: "回廊", featured: "注目" },
    zh: { badge: "全部作品", title: "项目", lead: "我开发的系统与工具。向下滚动逐个浏览，可在卡片上查看详情或直接打开。", open: "打开项目", details: "详情", home: "首页", empty: "暂无项目。", err: "无法加载项目列表，请刷新页面。", foot: "© Kittiphun Ruttanakorn", viewLabel: "显示方式", viewHint: "试试 3 种方式，选出你喜欢的", count: "{n} 个项目", viewA: "卡牌堆", viewB: "滚轮", viewC: "长廊", featured: "重点" }
  };

  var root = document.documentElement;
  function store(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function save(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* ignore */ } }

  // Same animation switch as the home page: the visitor's choice, else the device's reduced-motion setting.
  var motion = store("portfolio.motion");
  if (motion !== "on" && motion !== "off") motion = matchMedia("(prefers-reduced-motion: reduce)").matches ? "off" : "on";
  root.setAttribute("data-motion", motion);
  function motionOn() { return root.getAttribute("data-motion") !== "off"; }

  function initialLang() {
    var q = new URLSearchParams(location.search).get("lang");
    if (CODES.indexOf(q) > -1) return q;
    var s = store("portfolio.lang");
    return CODES.indexOf(s) > -1 ? s : "th";
  }
  function initialView() {
    var q = new URLSearchParams(location.search).get("view");
    if (VIEWS.indexOf(q) > -1) return q;
    var s = store("portfolio.projectsView");
    return VIEWS.indexOf(s) > -1 ? s : "a";
  }

  var lang = initialLang();
  var view = initialView();
  var data = null;
  var fx = null; // per-frame update of the current layout

  // Plain string, or { th, en, ja, zh }; fall back to English, then Thai, then anything.
  function text(v) {
    if (v == null) return "";
    if (typeof v !== "object") return String(v);
    return v[lang] || v.en || v.th || v.ja || v.zh || "";
  }
  function slug(pr) {
    var t = typeof pr.title === "object" ? (pr.title.en || pr.title.th || "") : String(pr.title);
    return t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }
  function el(tag, attrs, kids) {
    var n = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) { n.setAttribute(k, attrs[k]); });
    [].concat(kids == null ? [] : kids).forEach(function (c) { if (c != null) n.append(c); });
    return n;
  }
  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
  function home() { return "../" + (lang === "th" ? "" : "?lang=" + lang); }

  // ---------- one project, shared by the three layouts ----------
  var HUES = [330, 285, 205, 350, 260, 190];

  function cover(pr, i) {
    if (pr.image) return el("div", { class: "pj-media" }, el("img", { src: "../" + pr.image, alt: "", loading: "lazy", decoding: "async" }));
    // No screenshot yet: a generated cover, like the home page's project cards.
    var hue = HUES[i % HUES.length];
    var label = (pr.tags && pr.tags[0]) || text(pr.title).slice(0, 3);
    var m = el("div", { class: "pj-media pj-gen", "aria-hidden": "true", style: "background:radial-gradient(circle at 20% 20%,hsla(" + hue + ",85%,62%,.55),transparent 55%),radial-gradient(circle at 85% 80%,hsla(" + (hue - 50) + ",80%,55%,.5),transparent 55%),linear-gradient(135deg,hsl(" + hue + ",45%,14%),hsl(" + (hue - 40) + ",50%,10%))" }, [
      el("span", { class: "gen-grid" }),
      el("span", { class: "gen-win" }, [
        el("span", { class: "gen-dots" }, [el("i"), el("i"), el("i")]),
        el("b", {}, label),
        el("i", { class: "gen-line l1" }), el("i", { class: "gen-line l2" }), el("i", { class: "gen-line l3" })
      ])
    ]);
    return m;
  }

  function project(pr, i, total) {
    var s = UI[lang], links = [];
    if (pr.link) {
      var external = /^https?:\/\//.test(pr.link) && pr.link.indexOf(location.origin) !== 0;
      links.push(el("a", Object.assign({ href: pr.link }, external ? { target: "_blank", rel: "noopener" } : {}), s.open + " →"));
    }
    if (pr.featured) links.push(el("a", { href: home() + "#featured-" + slug(pr) }, s.details));
    var n = String(i + 1).padStart(2, "0");
    return el("article", { class: "pj" + (pr.featured ? " is-featured" : "") }, [
      cover(pr, i),
      el("div", { class: "pj-body" }, [
        el("div", { class: "pj-top" }, [
          el("span", { class: "pj-num" }, n + " / " + String(total).padStart(2, "0")),
          pr.featured ? el("span", { class: "pj-star" }, "★ " + s.featured) : null
        ]),
        el("h2", {}, text(pr.title)),
        el("p", {}, text(pr.description)),
        (pr.tags && pr.tags.length) ? el("ul", { class: "tags" }, pr.tags.map(function (t) { return el("li", {}, t); })) : null,
        links.length ? el("div", { class: "links" }, links) : null
      ])
    ]);
  }

  // ---------- layouts: build the list, return the per-frame update ----------
  function build(kind, items) {
    var list = el("ol", { class: "v-list v-" + kind });
    var rows = items.map(function (pr, i) {
      var li = el("li", { class: "v-item" }, project(pr, i, items.length));
      li.style.setProperty("--i", Math.min(i, 5));        // deck: how far each card's resting place is offset
      li.style.setProperty("--side", i % 2 ? 1 : -1);      // corridor: left or right wall
      list.append(li);
      return li;
    });
    return { list: list, rows: rows };
  }

  function barHeight() { var b = document.querySelector(".bar"); return b ? b.offsetHeight : 64; }

  // Deck: p (0..1) = how far the next card has slid over this one.
  function fxDeck(rows) {
    var step = 12;
    return function () {
      rows.forEach(function (li, i) {
        var next = rows[i + 1], p = 0;
        if (next) {
          var h = li.offsetHeight, dist = next.getBoundingClientRect().top - li.getBoundingClientRect().top;
          p = clamp(1 - (dist - step) / (h - step), 0, 1);
        }
        li.style.setProperty("--p", p.toFixed(3));
      });
    };
  }

  // Drum / corridor: d = signed distance of a row's centre from the viewport centre
  // (±1 is about half a screen away); ad = |d|.
  function fxDistance(rows, onCentre) {
    return function () {
      var vh = innerHeight, centre = barHeight() + (vh - barHeight()) / 2, best = 1e9, bestI = 0;
      rows.forEach(function (li, i) {
        var r = li.getBoundingClientRect(), off = r.top + r.height / 2 - centre;
        var d = clamp(off / (vh * 0.55), -1.3, 1.3), ad = Math.abs(d);
        li.style.setProperty("--d", d.toFixed(3));
        li.style.setProperty("--ad", ad.toFixed(3));
        if (Math.abs(off) < best) { best = Math.abs(off); bestI = i; }
      });
      rows.forEach(function (li, i) { li.classList.toggle("is-centre", i === bestI); });
      if (onCentre) onCentre(bestI);
    };
  }

  function reset(rows) {
    rows.forEach(function (li) {
      ["--p", "--d", "--ad"].forEach(function (k) { li.style.removeProperty(k); });
      li.classList.remove("is-centre");
    });
  }

  var ticking = false;
  function schedule() {
    if (!fx || ticking) return;
    ticking = true;
    requestAnimationFrame(function () { ticking = false; if (fx) fx(); });
  }
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);

  // ---------- page ----------
  function renderSwitcher() {
    var s = UI[lang], box = document.getElementById("views");
    box.setAttribute("aria-label", s.viewLabel);
    box.replaceChildren.apply(box, VIEWS.map(function (v) {
      var b = el("button", { type: "button", "data-view": v, "aria-pressed": String(v === view) }, [el("b", {}, v.toUpperCase()), s["view" + v.toUpperCase()]]);
      b.addEventListener("click", function () {
        if (view === v) return;
        view = v;
        save("portfolio.projectsView", v);
        var u = new URL(location.href); u.searchParams.set("view", v); history.replaceState(null, "", u);
        render();
        // The layouts have different heights: start the new one at its top.
        var top = document.getElementById("views").getBoundingClientRect().top + window.scrollY - barHeight() - 16;
        if (window.scrollY > top) window.scrollTo({ top: Math.max(0, top), behavior: "instant" });
      });
      return b;
    }));
  }

  function render() {
    var s = UI[lang], rootEl = document.getElementById("list");
    document.documentElement.lang = lang;
    document.title = s.title + " | Kittiphun Ruttanakorn";
    document.querySelectorAll("[data-ui]").forEach(function (n) { n.textContent = s[n.getAttribute("data-ui")]; });
    document.querySelectorAll("[data-home]").forEach(function (a) { a.setAttribute("href", home()); });
    document.querySelectorAll(".langs button").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.lang === lang)); });
    renderSwitcher();
    var old = document.getElementById("pos"); if (old) old.remove();
    fx = null;
    if (!data) return;
    var items = data.projects || [];
    document.getElementById("count").textContent = s.count.replace("{n}", items.length);
    root.setAttribute("data-view", view);
    if (!items.length) { rootEl.replaceChildren(el("p", { class: "empty" }, s.empty)); return; }

    var built = build(view === "a" ? "deck" : view === "b" ? "drum" : "corridor", items);
    rootEl.replaceChildren(built.list);

    if (view === "a") fx = fxDeck(built.rows);
    else {
      var pos = null;
      if (view === "b") { // a small "5 / 13" counter that follows the centre row
        pos = el("div", { id: "pos", class: "pos", "aria-hidden": "true" });
        document.body.append(pos);
      }
      fx = fxDistance(built.rows, pos && function (i) { pos.textContent = String(i + 1).padStart(2, "0") + " / " + String(items.length).padStart(2, "0"); });
    }
    if (motionOn()) fx(); else { reset(built.rows); fx = null; }
  }

  document.querySelectorAll(".langs button").forEach(function (b) {
    b.addEventListener("click", function () {
      lang = b.dataset.lang;
      save("portfolio.lang", lang);
      var u = new URL(location.href); u.searchParams.set("lang", lang); history.replaceState(null, "", u);
      render();
    });
  });

  render();
  fetch("../data/portfolio.json", { cache: "no-cache" })
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(function (d) { data = d; render(); })
    .catch(function () { document.getElementById("list").replaceChildren(el("p", { class: "err" }, UI[lang].err)); });
})();

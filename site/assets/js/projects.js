/* Projects index (/projects/): lists every project in data/portfolio.json.
   Adding a project to the JSON is enough; no change is needed here.
   Paths are relative to /projects/, so the page also works under a sub-folder. */
(function () {
  "use strict";
  var CODES = ["th", "en", "ja", "zh"];
  var UI = {
    th: { badge: "ผลงานทั้งหมด", title: "โปรเจกต์", lead: "รวมผลงานและระบบที่พัฒนา — เลือกดูรายละเอียดหรือเปิดใช้งานจริงได้จากการ์ดด้านล่าง", open: "เปิดโปรเจกต์", details: "รายละเอียด", home: "หน้าแรก", empty: "ยังไม่มีโปรเจกต์", err: "โหลดรายการโปรเจกต์ไม่สำเร็จ ลองรีเฟรชหน้านี้อีกครั้ง", foot: "© กิตติพันธ์ รัตนคร" },
    en: { badge: "All projects", title: "Projects", lead: "Systems and tools I have built. Open a project or read its details from the cards below.", open: "Open project", details: "Details", home: "Home", empty: "No projects yet.", err: "Could not load the project list. Please refresh the page.", foot: "© Kittiphun Ruttanakorn" },
    ja: { badge: "すべての実績", title: "プロジェクト", lead: "開発したシステムとツールの一覧です。カードから詳細を見たり、実際に開いたりできます。", open: "開く", details: "詳細", home: "ホーム", empty: "プロジェクトはまだありません。", err: "プロジェクト一覧を読み込めませんでした。ページを再読み込みしてください。", foot: "© Kittiphun Ruttanakorn" },
    zh: { badge: "全部作品", title: "项目", lead: "我开发的系统与工具。可在下方卡片查看详情或直接打开。", open: "打开项目", details: "详情", home: "首页", empty: "暂无项目。", err: "无法加载项目列表，请刷新页面。", foot: "© Kittiphun Ruttanakorn" }
  };

  function store(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function initialLang() {
    var q = new URLSearchParams(location.search).get("lang");
    if (CODES.indexOf(q) > -1) return q;
    var s = store("portfolio.lang");
    return CODES.indexOf(s) > -1 ? s : "th";
  }

  var lang = initialLang();
  var data = null;

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
  function home() { return "../" + (lang === "th" ? "" : "?lang=" + lang); }

  function card(pr) {
    var s = UI[lang], title = text(pr.title);
    var media = pr.image ? el("img", { src: "../" + pr.image, alt: "", loading: "lazy" }) : el("div", { class: "ph", "aria-hidden": "true" }, "</>");
    var links = [];
    if (pr.link) {
      var external = /^https?:\/\//.test(pr.link) && pr.link.indexOf(location.origin) !== 0;
      links.push(el("a", Object.assign({ href: pr.link }, external ? { target: "_blank", rel: "noopener" } : {}), s.open + " →"));
    }
    if (pr.featured) links.push(el("a", { href: home() + "#featured-" + slug(pr) }, s.details));
    return el("article", { class: "card" }, [
      media,
      el("div", { class: "body" }, [
        el("h2", {}, title),
        el("p", {}, text(pr.description)),
        (pr.tags && pr.tags.length) ? el("ul", { class: "tags" }, pr.tags.map(function (t) { return el("li", {}, t); })) : null,
        links.length ? el("div", { class: "links" }, links) : null
      ])
    ]);
  }

  function render() {
    var s = UI[lang], root = document.getElementById("list");
    document.documentElement.lang = lang;
    document.title = s.title + " | Kittiphun Ruttanakorn";
    document.querySelectorAll("[data-ui]").forEach(function (n) { n.textContent = s[n.getAttribute("data-ui")]; });
    document.querySelectorAll("[data-home]").forEach(function (a) { a.setAttribute("href", home()); });
    document.querySelectorAll(".langs button").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.lang === lang)); });
    if (!data) return;
    var items = data.projects || [];
    root.replaceChildren.apply(root, items.length ? items.map(card) : [el("p", { class: "empty" }, s.empty)]);
  }

  document.querySelectorAll(".langs button").forEach(function (b) {
    b.addEventListener("click", function () {
      lang = b.dataset.lang;
      try { localStorage.setItem("portfolio.lang", lang); } catch (e) { /* ignore */ }
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

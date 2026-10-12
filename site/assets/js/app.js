(function () {
  "use strict";

  const LANGS = window.LANGS;
  const UI = window.UI;
  const CODES = LANGS.map((l) => l.code);
  const DEFAULT_LANG = "th";
  const DATA_URL = "data/portfolio.json";
  const CACHE_KEY = "portfolio.translations.v1";
  const LANG_KEY = "portfolio.lang";

  const FONT_URLS = {
    ja: "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap",
    zh: "https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&display=swap"
  };

  let data = null;
  let lang = DEFAULT_LANG;
  let renderId = 0;

  // ---------- storage (best effort) ----------
  function storeGet(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }
  function storeSet(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* ignore */ }
  }
  function storeDel(key) {
    try { localStorage.removeItem(key); } catch (e) { /* ignore */ }
  }

  let cache = {};
  try { cache = JSON.parse(storeGet(CACHE_KEY) || "{}") || {}; } catch (e) { cache = {}; }
  function saveCache() { storeSet(CACHE_KEY, JSON.stringify(cache)); }

  // ---------- multilingual values ----------
  // A translatable field is either a plain string (same in every language)
  // or an object such as { "th": "...", "en": "..." }. Missing languages are
  // filled by the GitHub Action, and translated in the browser as a fallback.
  function isI18n(v) {
    if (!v || typeof v !== "object" || Array.isArray(v)) return false;
    const keys = Object.keys(v);
    return keys.length > 0 && keys.every((k) => CODES.includes(k));
  }

  function pickSource(v, target) {
    // English is a better pivot for Japanese and Chinese; Thai is the source for English.
    const order = target === "en" ? ["th", "ja", "zh"] : ["en", "th", "ja", "zh"];
    for (const code of order) {
      if (code !== target && v[code] && String(v[code]).trim()) return code;
    }
    return null;
  }

  function resolve(v) {
    if (v == null) return { text: "" };
    if (!isI18n(v)) return { text: String(v) };
    if (v[lang] && String(v[lang]).trim()) return { text: v[lang] };
    const src = pickSource(v, lang);
    if (!src) return { text: "" };
    const text = v[src];
    const cached = cache[lang + "|" + text];
    if (cached) return { text: cached, auto: true };
    return { text, from: src, needs: true };
  }

  // ---------- machine translation ----------
  const API_LANG = { th: "th", en: "en", ja: "ja", zh: "zh-CN" };

  async function viaGoogle(text, from, to) {
    const url = "https://translate.googleapis.com/translate_a/single?client=gtx&dt=t" +
      "&sl=" + API_LANG[from] + "&tl=" + API_LANG[to] + "&q=" + encodeURIComponent(text);
    const res = await fetch(url);
    if (!res.ok) throw new Error("google " + res.status);
    const json = await res.json();
    return json[0].map((seg) => seg[0]).join("");
  }

  async function viaMyMemory(text, from, to) {
    const url = "https://api.mymemory.translated.net/get?q=" + encodeURIComponent(text) +
      "&langpair=" + API_LANG[from] + "|" + API_LANG[to];
    const res = await fetch(url);
    if (!res.ok) throw new Error("mymemory " + res.status);
    const json = await res.json();
    if (json.responseStatus !== 200) throw new Error("mymemory " + json.responseStatus);
    return json.responseData.translatedText;
  }

  const inflight = {};
  function translate(text, from, to) {
    const key = to + "|" + text;
    if (cache[key]) return Promise.resolve(cache[key]);
    if (!inflight[key]) {
      inflight[key] = viaGoogle(text, from, to)
        .catch(() => viaMyMemory(text, from, to))
        .then((out) => {
          if (out && out.trim()) { cache[key] = out; saveCache(); }
          return out;
        })
        .finally(() => { delete inflight[key]; });
    }
    return inflight[key];
  }

  let jobs = [];
  function bind(el, value) {
    const r = resolve(value);
    el.textContent = r.text;
    if (r.auto) markAuto(el);
    if (r.needs) jobs.push({ el, text: r.text, from: r.from, to: lang });
    return el;
  }

  function markAuto(el) {
    el.classList.add("auto-tr");
    el.title = UI[lang].autoTranslated;
  }

  async function runJobs(id) {
    const queue = jobs;
    jobs = [];
    const workers = Array.from({ length: 4 }, async () => {
      while (queue.length) {
        const job = queue.shift();
        try {
          const out = await translate(job.text, job.from, job.to);
          if (id !== renderId || !out) continue;
          job.el.textContent = out;
          markAuto(job.el);
        } catch (e) { /* keep the source text */ }
      }
    });
    await Promise.all(workers);
  }

  // ---------- helpers ----------
  function h(tag, attrs, ...children) {
    const el = document.createElement(tag);
    if (attrs) {
      for (const [k, v] of Object.entries(attrs)) {
        if (v == null || v === false) continue;
        if (k === "class") el.className = v;
        else if (k === "html") el.innerHTML = v;
        else if (k.startsWith("on") && typeof v === "function") el.addEventListener(k.slice(2), v);
        else el.setAttribute(k, v);
      }
    }
    for (const c of children.flat()) {
      if (c == null || c === false) continue;
      el.append(c instanceof Node ? c : document.createTextNode(String(c)));
    }
    return el;
  }

  function t(value, tag, cls) { return bind(h(tag || "span", cls ? { class: cls } : null), value); }

  function locale() { return LANGS.find((l) => l.code === lang).locale; }

  function formatDate(iso, withDay) {
    if (!iso) return UI[lang].present;
    // Year-only dates ("2013") show just the year; Thai drops the "พ.ศ." prefix
    // so a range reads "2556 — 2560".
    if (/^\d{4}$/.test(iso)) {
      const y = new Date(iso + "-01-01T00:00:00");
      const fmt = new Intl.DateTimeFormat(locale(), { year: "numeric" });
      return lang === "th" ? fmt.formatToParts(y).find((x) => x.type === "year").value : fmt.format(y);
    }
    const d = new Date(iso + "T00:00:00");
    if (isNaN(d)) return iso;
    const opts = withDay ? { day: "numeric", month: "long", year: "numeric" } : { month: "short", year: "numeric" };
    return new Intl.DateTimeFormat(locale(), opts).format(d);
  }

  function hasItems(list) { return Array.isArray(list) && list.length > 0; }

  // ---------- icons ----------
  const ICONS = {
    network: '<path d="M9 2h6v5H9zM2 17h6v5H2zM16 17h6v5h-6zM12 7v5M5 17v-2.5h14V17M12 12v2.5"/>',
    windows: '<path d="M3 3h8v8H3zM13 3h8v8h-8zM3 13h8v8H3zM13 13h8v8h-8z"/>',
    terminal: '<path d="M2 4h20v16H2zM6 9l3 3-3 3M12 15h6"/>',
    code: '<path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/>',
    server: '<path d="M3 3h18v7H3zM3 14h18v7H3zM7 6.5h.01M7 17.5h.01"/>',
    shield: '<path d="M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5z"/>',
    calendar: '<path d="M4 5h16v16H4zM4 10h16M9 3v4M15 3v4"/>',
    layers: '<path d="M12 3l9 5-9 5-9-5zM3 13l9 5 9-5"/>',
    cpu: '<path d="M7 7h10v10H7zM10 10h4v4h-4zM10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    arrow: '<path d="M7 17L17 7M9 7h8v8"/>',
    download: '<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>',
    mail: '<path d="M3 5h18v14H3zM3 6l9 7 9-7"/>',
    pin: '<path d="M12 21s-7-6.2-7-11a7 7 0 0114 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
    quote: '<path d="M10 7H6a2 2 0 00-2 2v4h5v5H4M20 7h-4a2 2 0 00-2 2v4h5v5h-5"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
    heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z"/>',
    check: '<circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.5 2.5L16 9.5"/>',
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/>',
    expand: '<path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>',
    chevron: '<path d="M6 9l6 6 6-6"/>'
  };

  // SVG must be parsed from markup so it gets the SVG namespace.
  function svg(markup) {
    const tmp = document.createElement("span");
    tmp.innerHTML = markup;
    return tmp.firstChild;
  }

  function icon(name, cls) {
    return svg('<svg class="ic ' + (cls || "") + '" viewBox="0 0 24 24" aria-hidden="true">' + (ICONS[name] || ICONS.server) + "</svg>");
  }

  function brand(name, color, cls, label) {
    const d = (window.BRAND_ICONS || {})[name];
    const path = d ? '<path d="' + d + '"/>' : '<circle cx="12" cy="12" r="9"/>';
    const el = h("span", { class: "inline-grid flex-none place-items-center " + (cls || ""), title: label || null });
    el.innerHTML = '<svg viewBox="0 0 24 24" class="h-full w-full" style="fill:' + (color || "#f472b6") + '" aria-hidden="true">' + path + "</svg>";
    return el;
  }

  const GITHUB_PATH = "M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 016 0C17.3 4.7 18.3 5 18.3 5c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A11.5 11.5 0 0023.5 12C23.5 5.7 18.3.5 12 .5z";

  const WRAP = "mx-auto max-w-6xl px-4 md:px-8";

  const STAR_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l3 6.9 7.5.7-5.7 5 1.7 7.4L12 18.1 5.5 22l1.7-7.4-5.7-5 7.5-.7z"/></svg>';

  function badge(text) { return h("span", { class: "badge" }, text); }

  function sectionHead(badgeText, title, center) {
    return h("header", { class: "section-head mb-10 " + (center ? "text-center" : "") },
      badgeText ? badge(badgeText) : null,
      h("h2", { class: "mt-3 text-[1.7rem] font-bold leading-tight tracking-tight md:text-4xl" }, title));
  }

  function resolveEn(v) {
    if (!isI18n(v)) return v == null ? "" : String(v);
    return v.en || v.th || Object.values(v)[0] || "";
  }

  function yearsSince(iso) {
    if (!iso) return 0;
    const start = new Date(iso + "T00:00:00"), now = new Date();
    let y = now.getFullYear() - start.getFullYear();
    if (now.getMonth() < start.getMonth() || (now.getMonth() === start.getMonth() && now.getDate() < start.getDate())) y--;
    return Math.max(1, y);
  }

  // ---------- sections ----------
  const NAV = [
    ["home", "navHome"], ["about", "navAbout"], ["skills", "navSkills"], ["featured", "navFeatured"],
    ["experience", "navExperience"], ["education", "navEducation"], ["projects", "navProjects"], ["contact", "navContact"]
  ];

  function renderNav() {
    const s = UI[lang];
    const items = NAV.filter(([id]) =>
      (id !== "education" || hasItems(data.education)) && (id !== "featured" || (data.projects || []).some((x) => x.featured)));
    // The logo already goes home, so the desktop bar skips "Home" to leave room for the other links.
    document.getElementById("nav-links").replaceChildren(...items.filter(([id]) => id !== "home").map(([id, key]) =>
      h("a", { href: "#" + id, "data-spy": id, class: "nav-link relative whitespace-nowrap px-1.5 py-1.5 text-[0.9rem] font-medium text-muted transition-colors hover:text-fg" }, s[key])));
    document.getElementById("mobile-menu").replaceChildren(...items.map(([id, key]) =>
      h("a", { href: "#" + id, class: "rounded-lg px-3 py-2.5 text-muted hover:bg-ink-800 hover:text-fg" }, s[key])));

    document.getElementById("lang-switch").replaceChildren(...LANGS.map((l) =>
      h("button", {
        type: "button", lang: l.code, "data-lang": l.code, "aria-pressed": String(l.code === lang),
        class: "whitespace-nowrap rounded-full px-[7px] py-1 text-xs font-semibold leading-snug transition-colors sm:px-2.5 " +
          (l.code === lang ? "bg-grad text-white" : "text-muted hover:text-fg")
      }, l.label)
    ));

    document.getElementById("hire-btn").replaceChildren(s.hireMe, icon("arrow"));
  }

  function renderHero() {
    const p = data.profile;
    const s = UI[lang];
    const since = hasItems(data.experience) ? data.experience[0].start : null;

    const [before, after] = s.greeting.split("{name}");
    const greet = h("h1", { class: "mt-5 text-[2.3rem] font-bold leading-[1.15] tracking-tight sm:text-5xl lg:text-[3.6rem]" },
      before,
      t(p.firstName || p.name, "span", "animate-shimmer whitespace-nowrap bg-grad-text bg-[length:220%_100%] bg-clip-text text-transparent"),
      after || "");

    const cv = p.cv ? resolve(p.cv).text : "";
    const secondary = cv
      ? h("a", { class: "btn", href: cv, download: cv.split("/").pop(), type: "application/pdf" }, s.downloadCV, icon("download"))
      : h("a", { class: "btn", href: "#contact" }, s.contactMe, icon("mail"));

    const tech = hasItems(data.proficiency)
      ? h("div", { class: "mt-10" },
          h("p", { class: "mb-3 text-xs font-semibold uppercase tracking-[0.1em] text-muted" }, s.techWith),
          h("ul", { class: "flex flex-wrap gap-3" }, data.proficiency.map((pf) =>
            h("li", { class: "transition-transform duration-200 hover:-translate-y-1" },
              brand(pf.icon, pf.color, "h-11 w-11 rounded-[10px] border border-ink-600 bg-ink-800 p-2.5 transition-colors hover:border-brand-400", resolveEn(pf.name))))))
      : null;

    const copy = h("div", { class: "hero-enter" },
      badge(resolve(p.tagline || p.title).text),
      greet,
      t(p.slogan, "p", "mt-3 text-2xl font-semibold leading-snug tracking-tight sm:text-3xl lg:text-[2.1rem]"),
      t(p.intro || p.summary, "p", "mt-5 max-w-xl text-muted"),
      h("div", { class: "mt-8 flex flex-wrap gap-3.5" },
        h("a", { class: "btn btn-primary", href: data.projects && data.projects.some((x) => x.featured) ? "#featured" : "#projects" }, s.viewWork, icon("arrow")),
        secondary
      ),
      tech
    );

    const portrait = p.photo
      ? h("img", { class: "absolute inset-4 h-[calc(100%-2rem)] w-[calc(100%-2rem)] rounded-full border-4 border-ink-950/60 object-cover", src: p.photo, alt: p.romanName || "" })
      : h("div", { class: "absolute inset-4 grid place-items-center rounded-full bg-ink-950 text-6xl font-bold" }, (p.romanName || "").split(/\s+/).map((w) => w[0]).join(""));

    // Mobile: portrait and code card stack. Desktop: portrait top-left, card
    // bottom-right, so the card never covers the face.
    const art = h("div", { class: "relative order-first mx-auto flex w-full max-w-[520px] flex-col items-center gap-14 pb-4 pt-6 lg:order-none lg:block lg:h-[590px] lg:max-w-none lg:p-0" },
      h("div", { class: "absolute right-[2%] top-0 h-[90px] w-[110px] animate-drift bg-dots bg-[length:14px_14px] opacity-[.55] lg:top-[2%]", "aria-hidden": "true" }),
      h("div", { id: "orb", class: "orb-ring relative h-[260px] w-[260px] flex-none animate-float rounded-full bg-orb shadow-orb sm:h-[300px] sm:w-[300px] lg:absolute lg:left-[4%] lg:top-[24px] lg:h-[320px] lg:w-[320px]" }, portrait),
      renderCodeCard(p, since),
      svg('<svg class="doodle absolute bottom-[6%] left-[4%] hidden w-16 fill-none stroke-fg/50 lg:block" style="stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round" viewBox="0 0 80 90" aria-hidden="true"><path d="M70 8C40 6 18 22 22 44c3 16 22 16 22 3 0-12-20-12-28 2-6 11-6 24 0 34"/><path d="M8 74l8 10 8-9"/></svg>')
    );

    document.getElementById("hero").replaceChildren(
      h("div", { class: "grid items-center gap-6 lg:min-h-[520px] lg:grid-cols-[1.05fr_.95fr] lg:gap-10" }, copy, art));
  }

  function renderCodeCard(p, since) {
    const str = (v) => h("span", { class: "text-orange-300" }, '"' + v + '"');
    const key = (k) => h("span", { class: "text-purple-200" }, k);
    const pun = (v) => h("span", { class: "text-[#8b8199]" }, v);
    const skills = (data.skills || []).map((sk) => resolveEn(sk.title).replace(/^Enterprise /, "").replace(/ & CLI$/, "").replace(/ Development$/, ""));
    const lines = [
      [h("span", { class: "text-brand-400" }, "const "), h("span", { class: "text-violet-300" }, "engineer"), pun(" = {")],
      ["  ", key("name"), pun(": "), str(resolveEn(p.firstName) || p.romanName || ""), pun(",")],
      ["  ", key("role"), pun(": "), str(resolveEn(p.title)), pun(",")],
      ["  ", key("skills"), pun(": ["), ...skills.flatMap((sk, i) => [str(sk), i < skills.length - 1 ? pun(", ") : null]), pun("],")],
      since ? ["  ", key("since"), pun(": "), str(since), pun(",")] : null,
      ["  ", key("passion"), pun(": "), str("Reliable systems"), pun(",")],
      [pun("};")]
    ].filter(Boolean);
    return h("div", { lang: "en", "aria-hidden": "true",
      class: "relative z-10 w-full max-w-[300px] animate-float-rev rounded-xl border border-[#3a2f4f] bg-[#110d1b]/90 font-mono text-[0.72rem] text-[#f5eff9] shadow-float backdrop-blur-md sm:text-[0.76rem] lg:absolute lg:bottom-0 lg:right-0 lg:w-[300px] lg:max-w-none" },
      h("div", { class: "flex items-center justify-between border-b border-[#2a2239] px-3.5 py-2 text-[0.74rem] text-[#a99fbb]" },
        h("span", null, "</> engineer.js"),
        h("i", { class: "h-2 w-2 rounded-full bg-green-400 shadow-[0_0_10px_#4ade80]" })),
      h("pre", { class: "m-0 whitespace-pre-wrap px-3.5 pb-3.5 pt-3 font-mono leading-[1.75]" },
        lines.map((parts, i) => h("span", { class: "code-line", style: "--i:" + i }, ...parts)))
    );
  }

  function renderAbout() {
    const p = data.profile;
    const s = UI[lang];
    const since = hasItems(data.experience) ? data.experience[0].start : null;
    const techCount = (data.skills || []).reduce((n, sk) => n + (sk.items || []).length, 0);
    const stats = [
      since ? ["calendar", yearsSince(since), "+", s.statYears] : null,
      ["layers", (data.projects || []).length, "+", s.statProjects],
      ["cpu", techCount, "+", s.statTech],
      ["target", (data.skills || []).length, "", s.statDomains]
    ].filter(Boolean);
    // Divider lines between the 2×2 tiles, as in the reference layout.
    const borders = ["border-b border-r", "border-b", "border-r", ""];

    document.getElementById("about").replaceChildren(h("div", { class: WRAP + " grid items-center gap-10 lg:grid-cols-2 lg:gap-14" },
      h("div", { class: "reveal" },
        badge(s.aboutBadge),
        h("h2", { class: "mb-4 mt-3.5 text-[1.6rem] font-bold leading-tight md:text-[2rem]" }, s.aboutHeading),
        t(p.summary, "p", "text-muted"),
        since ? h("p", { class: "mt-5 inline-flex items-center gap-2.5 text-sm" },
          h("span", { class: "ping-dot relative h-2 w-2 rounded-full bg-green-400" }),
          s.sinceLabel + " " + formatDate(since, true)) : null,
        h("div", { class: "mt-6" }, h("a", { class: "btn btn-sm", href: "#experience" }, s.learnMore, icon("user")))
      ),
      h("div", { class: "grid grid-cols-2", "data-reveal-group": "" }, stats.map(([ic, n, suffix, label], i) =>
        h("div", { class: "flex flex-col items-start gap-3 border-ink-600 px-4 py-6 sm:flex-row sm:items-center sm:gap-4 sm:px-6 sm:py-7 " + borders[i] },
          h("div", { class: "grid h-12 w-12 flex-none place-items-center rounded-xl bg-grad text-white shadow-glow" }, icon(ic, "h-[22px] w-[22px]")),
          h("div", null,
            h("strong", { class: "block text-[1.75rem] font-bold leading-none tabular-nums md:text-[2rem]", "data-count": n, "data-suffix": suffix }, "0"),
            h("span", { class: "mt-1.5 block text-sm text-muted" }, label)
          )
        )
      ))
    ));
  }

  function renderSkills() {
    const s = UI[lang];
    const bars = (data.proficiency || []).map((pf) => {
      const level = Math.max(0, Math.min(100, pf.level || 0));
      return h("div", { style: "--v:" + level + "%" },
        h("div", { class: "mb-2.5 flex items-center gap-3" },
          brand(pf.icon, pf.color, "h-[22px] w-[22px]"),
          t(pf.name, "span", "text-[0.95rem] font-semibold"),
          h("span", { class: "ml-auto text-sm tabular-nums text-muted" }, level + "%")
        ),
        h("div", { class: "h-1.5 overflow-hidden rounded-full bg-ink-600" },
          h("i", { class: "bar-fill block h-full rounded-full bg-grad shadow-[0_0_12px_rgba(236,72,153,.5)]" }))
      );
    });
    const cards = (data.skills || []).map((sk) =>
      h("article", { class: "card tilt p-6 md:p-7" },
        h("div", { class: "mb-4 grid h-12 w-12 place-items-center rounded-xl border border-brand-500/25 bg-brand-500/15 text-accent" }, icon(sk.icon, "h-6 w-6")),
        t(sk.title, "h3", "mb-2 text-lg font-semibold"),
        t(sk.description, "p", "text-muted"),
        hasItems(sk.items) ? h("ul", { class: "mt-4 flex flex-wrap gap-2" }, sk.items.map((it) =>
          t(it, "li", "chip"))) : null
      )
    );
    document.getElementById("skills").replaceChildren(h("div", { class: WRAP },
      sectionHead(s.skillsBadge, s.skillsHeading, true),
      bars.length ? h("div", { class: "grid gap-x-12 gap-y-7 sm:grid-cols-2 lg:grid-cols-3", "data-reveal-group": "" }, bars) : null,
      h("div", { class: "mt-24" }, sectionHead(s.expertiseBadge, s.expertiseHeading, true)),
      h("div", { class: "grid gap-6 md:grid-cols-2", "data-reveal-group": "" }, cards)
    ));
  }

  function featuredId(pr) {
    return "featured-" + resolveEn(pr.title).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  // Thumbnail grid columns by image count (full class names so Tailwind keeps them).
  const THUMB_COLS = { 1: "grid-cols-1", 2: "grid-cols-2", 3: "grid-cols-3", 4: "grid-cols-4", 5: "grid-cols-5", 6: "grid-cols-3 sm:grid-cols-6" };
  const THUMB_COLS_MANY = "grid-cols-4 sm:grid-cols-5";   // 7+ images wrap onto two rows

  // Showcase for every project marked with "featured" in portfolio.json: a switcher on top and
  // one project at a time below it, so three case studies do not make one very long scroll.
  // The chosen project survives a language change; a #featured-<name> link opens its project.
  let featuredIndex = 0;

  function renderFeatured() {
    const el = document.getElementById("featured");
    const list = (data.projects || []).filter((x) => x.featured);
    if (!list.length) { el.hidden = true; el.replaceChildren(); return; }
    el.hidden = false;
    featuredIndex = Math.min(featuredIndex, list.length - 1);

    const panels = list.map((pr, i) => featuredBlock(pr, i));
    const tabs = list.map((pr, i) => h("button", {
      type: "button", role: "tab", id: "ftab-" + i, "aria-controls": featuredId(pr), class: "ftab",
      onclick: () => select(i)
    },
      pr.image ? h("img", { class: "ftab-thumb", src: pr.image, alt: "", loading: "lazy", decoding: "async" }) : null,
      h("span", { class: "ftab-text" },
        h("span", { class: "ftab-num" }, String(i + 1).padStart(2, "0")),
        h("span", { class: "ftab-name" }, list[i].featured.name || resolveEn(pr.title).replace(/-/g, " ")))));

    function select(i, focus) {
      featuredIndex = i;
      tabs.forEach((b, j) => {
        b.setAttribute("aria-selected", String(j === i));
        b.tabIndex = j === i ? 0 : -1;
        panels[j].hidden = j !== i;
      });
      if (focus) tabs[i].focus();
      // keep the chosen tab inside the scrolling row (scrollTo on the row only, so the page doesn't jump)
      const row = tabs[i].parentElement;
      if (row) {
        const r = row.getBoundingClientRect(), c = tabs[i].getBoundingClientRect();
        row.scrollTo({ left: row.scrollLeft + (c.left - r.left) - (r.width - c.width) / 2, behavior: "smooth" });
      }
    }
    const bar = list.length > 1
      ? h("div", { class: "ftabs", role: "tablist", "aria-label": UI[lang].featuredBadge,
          onkeydown: (e) => {
            const k = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
            if (k) { e.preventDefault(); select((featuredIndex + k + list.length) % list.length, true); }
            else if (e.key === "Home") { e.preventDefault(); select(0, true); }
            else if (e.key === "End") { e.preventDefault(); select(list.length - 1, true); }
          } }, tabs)
      : null;
    select(featuredIndex);
    el.replaceChildren(h("div", { class: WRAP }, bar, panels));
  }

  // Open the project a #featured-<name> link points to before the page scrolls there.
  function openFeaturedFromHash(hash) {
    const panel = hash && hash.length > 1 && document.getElementById(decodeURIComponent(hash.slice(1)));
    if (!panel || !panel.hasAttribute("data-fpanel") || !panel.hidden) return;
    document.getElementById("ftab-" + panel.dataset.fpanel).click();
  }
  // Capture phase: runs before the smooth-scroll handler in effects.js, which needs the panel visible.
  document.addEventListener("click", (e) => {
    const a = e.target.closest && e.target.closest('a[href^="#featured-"]');
    if (a) openFeaturedFromHash(a.getAttribute("href"));
  }, true);

  function featuredBlock(pr, index) {
    const f = pr.featured;
    const s = UI[lang];
    const isRepo = /github\.com/.test(pr.link || "");

    const gallery = f.gallery || [];
    const mainImg = h("img", { class: "showcase-img aspect-[16/11] w-full bg-[#0b0912] object-contain", src: gallery[0] ? gallery[0].src : pr.image, alt: "", loading: "lazy", decoding: "async" });
    const mainLink = h("a", { href: mainImg.src, target: "_blank", rel: "noopener", class: "group relative block", title: s.viewFull, "aria-label": s.viewFull },
      mainImg,
      h("span", { class: "absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-lg bg-black/55 text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100" }, icon("expand", "h-4 w-4")));
    const caption = h("p", { class: "mt-3 min-h-[3rem] text-sm text-muted" });
    const fileLabel = h("span", { class: "ml-2 truncate font-mono text-xs text-muted" });
    const thumbs = gallery.map((g) => h("button", {
      type: "button", "aria-label": resolve(g.caption).text,
      class: "thumb overflow-hidden rounded-lg border-2 border-transparent bg-ink-700 opacity-70 transition hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
    }, h("img", { class: "aspect-video w-full object-cover object-top", src: g.src, alt: "", loading: "lazy" })));

    function show(i) {
      const g = gallery[i];
      mainImg.src = g.src; mainLink.href = g.src;
      bind(caption, g.caption);
      fileLabel.textContent = pr.link ? pr.link.replace(/^https?:\/\//, "").replace(/\/$/, "") : resolveEn(pr.title).toLowerCase() + " / " + g.src.split("/").pop();
      thumbs.forEach((b, j) => {
        b.classList.toggle("border-brand-500", j === i);
        b.classList.toggle("border-transparent", j !== i);
        b.classList.toggle("opacity-100", j === i);
        b.setAttribute("aria-current", String(j === i));
      });
    }
    thumbs.forEach((b, i) => b.addEventListener("click", () => show(i)));
    if (gallery.length) show(0);

    const frame = h("div", { class: "card overflow-hidden" },
      h("div", { class: "flex items-center gap-2 border-b border-ink-600 px-4 py-2.5" },
        h("i", { class: "h-2.5 w-2.5 flex-none rounded-full bg-[#fb7185]" }), h("i", { class: "h-2.5 w-2.5 flex-none rounded-full bg-[#fbbf24]" }), h("i", { class: "h-2.5 w-2.5 flex-none rounded-full bg-[#4ade80]" }),
        fileLabel),
      mainLink);

    const action = pr.link ? h("div", { class: "mt-6" },
      h("a", { class: "btn btn-primary", href: pr.link, target: "_blank", rel: "noopener" },
        isRepo ? svg('<svg viewBox="0 0 24 24" class="h-[18px] w-[18px] fill-current" aria-hidden="true"><path d="' + GITHUB_PATH + '"/></svg>') : null,
        isRepo ? s.viewSource : s.tryLive, icon("arrow"))) : null;

    const metrics = h("div", { class: "mt-7 grid grid-cols-2 gap-3", "data-reveal-group": "" }, (f.metrics || []).map((m) =>
      h("div", { class: "tile metric px-4 py-3.5" },
        h("strong", { class: "block bg-grad bg-clip-text text-xl font-bold leading-tight text-transparent sm:text-2xl" }, m.value),
        t(m.label, "span", "mt-1 block text-sm text-muted"))));

    const stack = hasItems(f.stack) ? h("div", { class: "mt-7" },
      h("p", { class: "mb-3 text-xs font-semibold uppercase tracking-[0.1em] text-muted" }, s.techStack),
      h("ul", { class: "flex flex-wrap gap-2" }, f.stack.map((x) =>
        h("li", { class: "chip" }, x)))) : null;

    const highlights = (f.highlights || []).map((hl) =>
      h("article", { class: "card tilt hl-card p-6 md:p-7" },
        h("div", { class: "flex items-center gap-4" },
          brand(hl.icon, hl.color, "h-14 w-14 flex-none rounded-xl border border-ink-600 bg-ink-700 p-3"),
          h("div", null,
            t(hl.title, "h3", "text-xl font-bold"),
            t(hl.role, "p", "text-sm text-muted"))),
        h("ul", { class: "mt-5 space-y-3" }, (hl.points || []).map((pt) =>
          h("li", { class: "flex gap-3 text-soft" }, icon("check", "mt-1 h-[18px] w-[18px] flex-none text-accent"), t(pt, "span"))))
      ));
    const hlCols = highlights.length >= 3 ? "lg:grid-cols-3" : "md:grid-cols-2";

    // Technical details start folded; the toggle grows them open (CSS grid-rows transition).
    let details = null;
    if (highlights.length) {
      const bodyId = featuredId(pr) + "-details";
      const label = h("span", null, s.showTech);
      const toggle = h("button", { type: "button", class: "btn btn-sm fdetails-toggle", "aria-expanded": "false", "aria-controls": bodyId },
        label, icon("chevron", "fdetails-chevron"));
      const body = h("div", { id: bodyId, class: "fdetails-body", inert: "" },
        h("div", { class: "fdetails-inner" }, h("div", { class: "grid gap-6 pb-8 pt-8 " + hlCols, "data-reveal-group": "" }, highlights)));
      toggle.addEventListener("click", () => {
        const open = toggle.getAttribute("aria-expanded") !== "true";
        toggle.setAttribute("aria-expanded", String(open));
        details.classList.toggle("open", open);
        body.toggleAttribute("inert", !open);
        label.textContent = open ? s.hideTech : s.showTech;
      });
      details = h("div", { class: "fdetails mt-10 text-center" }, toggle, body);
    }

    return h("article", { id: featuredId(pr), class: "spot panel-in", role: "tabpanel", "data-fpanel": index, "aria-labelledby": "ftab-" + index },
      h("header", { class: "section-head mb-10 text-center" },
        h("span", { class: "featured-pill", html: STAR_SVG + "<span>" + s.featuredBadge + "</span>" }),
        h("h2", { class: "mt-3 bg-grad bg-clip-text text-4xl font-bold leading-tight tracking-tight text-transparent md:text-5xl" }, f.name || resolveEn(pr.title).replace(/-/g, " ")),
        t(f.subtitle, "p", "mx-auto mt-3 max-w-2xl text-lg text-muted")),
      h("div", { class: "grid items-start gap-10 lg:grid-cols-[1.2fr_.8fr]" },
        // min-w-0 lets the long address-bar text truncate instead of widening the grid.
        h("div", { class: "reveal min-w-0" }, h("div", { class: "showcase" }, frame), caption, h("div", { class: "mt-1 grid gap-3 " + (THUMB_COLS[thumbs.length] || THUMB_COLS_MANY) }, thumbs)),
        h("div", { class: "reveal min-w-0" }, t(f.summary, "p", "text-soft"), action, metrics, stack)),
      details
    );
  }

  function timeline(items, roleKey, orgKey) {
    return h("ol", { class: "relative mx-auto max-w-3xl border-l-2 border-brand-500/40 pl-7", "data-reveal-group": "" }, items.map((e) =>
      h("li", { class: "relative mb-6" },
        h("span", { class: "absolute -left-[35px] top-1.5 h-3 w-3 rounded-full bg-brand-500 shadow-[0_0_0_4px_rgba(236,72,153,.14),0_0_18px_rgba(236,72,153,.7)]" }),
        // Entries without dates (e.g. earlier jobs) simply omit the date line.
        e.start || e.end ? h("div", { class: "mb-2 text-sm font-semibold text-accent" }, formatDate(e.start) + " — " + formatDate(e.end)) : null,
        h("div", { class: "card tilt p-6 md:p-7" },
          t(e[roleKey], "h3", "mb-1 text-lg font-semibold"),
          t(e[orgKey], "p", "font-medium text-muted"),
          e.description ? t(e.description, "p", "mt-2 text-muted") : null,
          hasItems(e.highlights) ? h("ul", { class: "mt-4 list-disc space-y-1.5 pl-5 text-soft marker:text-brand-500" },
            e.highlights.map((x) => t(x, "li"))) : null
        )
      )
    ));
  }

  function renderExperience() {
    const s = UI[lang];
    document.getElementById("experience").replaceChildren(h("div", { class: WRAP },
      sectionHead(s.experienceBadge, s.experienceTitle, true),
      timeline(data.experience || [], "role", "organization")
    ));
  }

  function renderEducation() {
    const el = document.getElementById("education");
    if (!hasItems(data.education)) { el.hidden = true; el.replaceChildren(); return; }
    const s = UI[lang];
    el.hidden = false;
    el.replaceChildren(h("div", { class: WRAP },
      sectionHead(s.educationBadge, s.educationTitle, true),
      timeline(data.education, "degree", "institution")
    ));
  }

  const COVER_HUES = [330, 285, 205, 350, 260, 190];

  function projectCover(pr, i) {
    const frame = "relative aspect-video overflow-hidden border-b border-ink-600";
    if (pr.image) {
      return h("div", { class: frame },
        h("img", { class: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105", src: pr.image, alt: "", loading: "lazy" }),
        h("span", { class: "cover-fade" }));
    }
    const hue = COVER_HUES[i % COVER_HUES.length];
    const label = (pr.tags && pr.tags[0]) || resolveEn(pr.title).slice(0, 3);
    return h("div", { class: frame + " grid place-items-center", "aria-hidden": "true",
      style: "background:radial-gradient(circle at 20% 20%,hsla(" + hue + ",85%,62%,.55),transparent 55%),radial-gradient(circle at 85% 80%,hsla(" + (hue - 50) + ",80%,55%,.5),transparent 55%),linear-gradient(135deg,hsl(" + hue + ",45%,14%),hsl(" + (hue - 40) + ",50%,10%))" },
      h("div", { class: "absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] bg-[length:22px_22px] opacity-25" }),
      h("div", { class: "relative w-[62%] rounded-lg border border-white/15 bg-[#0b0912]/70 shadow-[0_16px_30px_rgba(0,0,0,.4)] transition-transform duration-500 group-hover:-translate-y-1.5 group-hover:scale-105" },
        h("div", { class: "flex gap-1 border-b border-white/10 px-2 py-1.5" },
          h("i", { class: "h-1.5 w-1.5 rounded-full bg-white/30" }), h("i", { class: "h-1.5 w-1.5 rounded-full bg-white/30" }), h("i", { class: "h-1.5 w-1.5 rounded-full bg-white/30" })),
        h("div", { class: "grid gap-1.5 px-3 pb-3 pt-2.5" },
          h("span", { class: "font-mono text-[1.05rem] font-bold text-white" }, label),
          h("span", { class: "block h-[5px] w-[70%] rounded bg-white/15" }),
          h("span", { class: "block h-[5px] w-1/2 rounded bg-white/15" }),
          h("span", { class: "block h-[5px] w-[62%] rounded bg-white/15" })
        )
      )
    );
  }

  function renderProjects() {
    const s = UI[lang];
    const cards = (data.projects || []).map((pr, i) =>
      h("article", { class: "card tilt proj-card group flex shrink-0 snap-start basis-full flex-col overflow-hidden sm:basis-[calc((100%-1.5rem)/2)] lg:basis-[calc((100%-3rem)/3)] " + (pr.featured ? "is-featured" : "") },
        pr.featured ? h("span", { class: "proj-star", html: STAR_SVG + "<span>" + s.featuredBadge + "</span>" }) : null,
        h("span", { class: "absolute left-3.5 top-3 z-10 rounded-md bg-black/50 px-2 py-0.5 font-mono text-xs font-semibold text-white backdrop-blur" },
          String(i + 1).padStart(2, "0")),
        projectCover(pr, i),
        h("div", { class: "flex flex-1 flex-col px-[22px] pb-[18px] pt-5" },
          t(pr.title, "h3", "mb-2 text-lg font-semibold"),
          t(pr.description, "p", "flex-1 text-[0.93rem] text-muted"),
          h("div", { class: "mt-4 flex items-end justify-between gap-3" },
            hasItems(pr.tags) ? h("ul", { class: "flex flex-wrap gap-2" }, pr.tags.map((tg) =>
              h("li", { class: "rounded-full bg-brand-500/15 px-2.5 py-0.5 text-xs font-semibold text-accent" }, tg))) : h("span"),
            // Featured projects link to their spotlight; others to their external link.
            pr.featured ? h("a", { class: "inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-semibold text-accent hover:text-fg", href: "#" + featuredId(pr) },
              s.viewDetails, icon("arrow", "ic-arrow h-[15px] w-[15px] transition-transform"))
              : pr.link ? h("a", { class: "inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-semibold text-accent hover:text-fg", href: pr.link, target: "_blank", rel: "noopener" },
              s.viewProject, icon("arrow", "ic-arrow h-[15px] w-[15px] transition-transform")) : null
          )
        )
      )
    );
    document.getElementById("projects").replaceChildren(h("div", { class: WRAP },
      sectionHead(s.projectsBadge, s.projectsHeading, true),
      h("div", { id: "carousel", class: "no-scrollbar -mx-2 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-2 py-4", "data-reveal-group": "" }, cards),
      h("div", { id: "carousel-dots", class: "mt-6 flex justify-center gap-2" }),
      h("div", { class: "mt-8 text-center" },
        h("a", { class: "btn", href: lang === DEFAULT_LANG ? "projects/" : "projects/?lang=" + lang }, s.allProjects, icon("arrow")))
    ));
  }

  // "089-955-4194" -> "+66899554194" (Thai numbers drop the leading 0).
  function telHref(phone) {
    const digits = String(phone).replace(/[^\d+]/g, "");
    return digits.startsWith("0") ? "+66" + digits.slice(1) : digits;
  }

  function renderContact() {
    const p = data.profile;
    const s = UI[lang];
    const avatar = p.photo ? h("img", { class: "h-full w-full object-cover", src: p.photo, alt: "" }) : h("span", null, (p.romanName || "?")[0]);
    const social = "grid h-[42px] w-[42px] place-items-center rounded-[10px] border border-ink-600 bg-ink-800 text-fg transition hover:-translate-y-0.5 hover:border-brand-500 hover:text-accent";
    const row = "mt-2.5 flex items-center gap-2.5 text-[0.92rem] text-soft [overflow-wrap:anywhere]";

    document.getElementById("contact").replaceChildren(h("div", { class: WRAP + " grid items-center gap-10 lg:grid-cols-[1fr_1.25fr_.85fr]", "data-reveal-group": "" },
      h("div", null,
        badge(s.ctaBadge),
        h("h2", { class: "mb-2.5 mt-3.5 text-[1.6rem] font-bold leading-tight md:text-[1.9rem]" }, s.ctaHeading),
        h("p", { class: "mb-6 text-muted" }, s.ctaText),
        h("div", { class: "flex flex-wrap gap-3" },
          p.email ? h("a", { class: "btn btn-primary btn-sm", href: "mailto:" + p.email }, s.getInTouch, icon("arrow")) : null,
          p.cv ? h("a", { class: "btn btn-sm", href: resolve(p.cv).text, download: resolve(p.cv).text.split("/").pop(), type: "application/pdf" }, s.downloadCV, icon("download")) : null)
      ),
      p.motto ? h("figure", { class: "card m-0 px-7 py-6" },
        icon("quote", "h-[34px] w-[34px] text-brand-500 [stroke-width:2.4]"),
        h("blockquote", { class: "mb-5 mt-2.5 text-soft" }, t(p.motto)),
        h("figcaption", { class: "flex items-center gap-3" },
          h("div", { class: "grid h-11 w-11 flex-none place-items-center overflow-hidden rounded-full border-2 border-brand-500 bg-grad font-bold" }, avatar),
          h("div", null, t(p.name, "strong", "block text-[0.95rem]"), h("span", { class: "text-[0.82rem] text-muted" }, s.mottoLabel))
        )
      ) : h("div"),
      h("div", null,
        badge(s.followMe),
        h("div", { class: "mb-4 mt-4 flex gap-3" },
          p.github ? h("a", { class: social, href: p.github, target: "_blank", rel: "noopener", "aria-label": "GitHub",
            html: '<svg viewBox="0 0 24 24" class="h-5 w-5 fill-current" aria-hidden="true"><path d="' + GITHUB_PATH + '"/></svg>' }) : null,
          p.email ? h("a", { class: social, href: "mailto:" + p.email, "aria-label": s.email }, icon("mail", "h-5 w-5")) : null
        ),
        p.email ? h("a", { class: row + " hover:text-fg", href: "mailto:" + p.email }, icon("mail", "text-accent"), p.email) : null,
        p.phone ? h("a", { class: row + " hover:text-fg", href: "tel:" + telHref(p.phone), "aria-label": s.phone + " " + p.phone }, icon("phone", "text-accent"), p.phone) : null,
        p.location ? h("p", { class: row }, icon("pin", "text-accent"), t(p.location)) : null
      )
    ));

    const year = new Date().getFullYear();
    document.getElementById("footer").replaceChildren(h("div", { class: WRAP + " flex flex-wrap justify-between gap-3" },
      h("p", null, "© " + year + " ", t(p.name), ". " + s.rights + "."),
      h("p", { class: "flex items-center gap-1" }, s.madeWith + " ", icon("heart", "h-[15px] w-[15px] animate-beat fill-brand-500 stroke-brand-500"),
        " " + s.by + " " + (resolveEn(p.firstName) || p.romanName || ""))
    ));
  }

  // Mobile contact bar: slides up once the hero is out of view and tucks away over the contact
  // section (which already has the same buttons). Phones and tablets only (lg:hidden in the markup).
  const ctaState = { hero: true, contact: false };
  function renderCtaBar() {
    const bar = document.getElementById("cta-bar");
    const p = data.profile, s = UI[lang];
    const cv = p.cv ? resolve(p.cv).text : "";
    bar.replaceChildren(
      h("a", { class: "btn btn-primary btn-sm flex-1 justify-center", href: p.email ? "mailto:" + p.email : "#contact" }, s.hireMe, icon("mail")),
      cv ? h("a", { class: "btn btn-sm justify-center", href: cv, download: cv.split("/").pop(), type: "application/pdf", "aria-label": s.downloadCV }, s.ctaCv, icon("download")) : null);
    if (!renderCtaBar.bound && "IntersectionObserver" in window) {
      renderCtaBar.bound = true;
      const watch = (id, key) => {
        const el = document.getElementById(id);
        if (el) new IntersectionObserver(([en]) => { ctaState[key] = en.isIntersecting; syncCta(); }).observe(el);
      };
      watch("home", "hero");
      watch("contact", "contact");
    }
    syncCta();
  }
  function syncCta() {
    const bar = document.getElementById("cta-bar");
    const show = !ctaState.hero && !ctaState.contact;
    bar.classList.toggle("is-shown", show);
    bar.toggleAttribute("inert", !show);
  }

  // Primary address: GitHub Pages copies point their canonical here too.
  const SITE_URL = "https://kittiphun.rut.mcupr.ac.th/";
  const OG_LOCALE = { th: "th_TH", en: "en_US", ja: "ja_JP", zh: "zh_CN" };

  function setMeta(selector, value) {
    const el = document.querySelector(selector);
    if (el) el.setAttribute(el.tagName === "LINK" ? "href" : "content", value);
  }

  // Keep title, description and social tags in the visitor's language.
  function updateMeta() {
    const p = data.profile;
    const name = resolve(p.name).text;
    const title = name + " | " + resolve(p.title).text + " · Network · Server · Full-Stack";
    const desc = resolve(p.seoDescription || p.intro || p.summary).text.slice(0, 300);
    const url = lang === DEFAULT_LANG ? SITE_URL : SITE_URL + "?lang=" + lang;
    document.documentElement.lang = lang;
    document.title = title;
    setMeta('meta[name="description"]', desc);
    setMeta('link[rel="canonical"]', url);
    setMeta('meta[property="og:url"]', url);
    setMeta('meta[property="og:title"]', name + (lang === "en" ? "" : " — " + (p.romanName || "")));
    setMeta('meta[property="og:description"]', desc);
    setMeta('meta[property="og:locale"]', OG_LOCALE[lang]);
    setMeta('meta[name="twitter:title"]', name);
    setMeta('meta[name="twitter:description"]', desc);
    const st = document.getElementById("settings-toggle");
    st.setAttribute("aria-label", UI[lang].settings); st.title = UI[lang].settings;
    document.querySelectorAll("#settings-panel [data-ui]").forEach((el) => { el.textContent = UI[lang][el.dataset.ui]; });
  }

  function loadFont(code) {
    const href = FONT_URLS[code];
    if (!href || document.querySelector('link[data-font="' + code + '"]')) return;
    document.head.append(h("link", { rel: "stylesheet", href, "data-font": code }));
  }

  let hashHandled = false;

  function render() {
    const id = ++renderId;
    jobs = [];
    loadFont(lang);
    renderNav();
    renderHero();
    renderAbout();
    renderSkills();
    renderFeatured();
    if (!hashHandled) {
      hashHandled = true;
      openFeaturedFromHash(location.hash);
      const target = location.hash.length > 1 && document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (target && target.hasAttribute("data-fpanel")) requestAnimationFrame(() => target.scrollIntoView());
    }
    renderExperience();
    renderEducation();
    renderProjects();
    renderContact();
    renderCtaBar();
    updateMeta();
    if (window.Effects) window.Effects.afterRender();
    runJobs(id);
  }

  function setLang(code, push) {
    if (!CODES.includes(code) || code === lang && data) { return; }
    lang = code;
    storeSet(LANG_KEY, code);
    if (push) {
      const url = new URL(location.href);
      url.searchParams.set("lang", code);
      history.replaceState(null, "", url);
    }
    if (data) render();
  }

  function initialLang() {
    const q = new URLSearchParams(location.search).get("lang");
    if (CODES.includes(q)) return q;
    const saved = storeGet(LANG_KEY);
    if (CODES.includes(saved)) return saved;
    return DEFAULT_LANG;
  }

  // ---------- display settings: theme, animations, text size ----------
  // Each setting lives on an <html> attribute that index.html restores before
  // first paint; CSS and effects.js follow the attributes and the events below.
  const root = document.documentElement;
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const emit = (name, detail) => document.dispatchEvent(new CustomEvent(name, { detail }));
  const setAttr = (name, value) => (value == null ? root.removeAttribute(name) : root.setAttribute(name, value));

  function currentTheme() {
    return root.getAttribute("data-theme") || (darkQuery.matches ? "dark" : "light");
  }
  function syncThemeColor() {
    const color = currentTheme() === "dark" ? "#0b0912" : "#fdf8fb";
    document.querySelectorAll('meta[name="theme-color"]').forEach((m) => { m.removeAttribute("media"); m.setAttribute("content", color); });
  }

  // value(): current choice; apply(v): show it. A default value is not stored,
  // so the page keeps following the device for theme and motion.
  const SETTINGS = {
    theme: {
      key: "portfolio.theme", fallback: "auto",
      value: () => root.getAttribute("data-theme") || "auto",
      apply(v) { setAttr("data-theme", v === "auto" ? null : v); syncThemeColor(); emit("themechange", currentTheme()); }
    },
    motion: {
      key: "portfolio.motion", fallback: null,
      value: () => root.dataset.motion,
      apply(v) { setAttr("data-motion", v); emit("motionchange", v === "on"); }
    },
    font: {
      key: "portfolio.font", fallback: "md",
      value: () => root.dataset.font || "md",
      apply(v) { setAttr("data-font", v === "md" ? null : v); emit("fontsizechange", v); }
    }
  };

  const panel = document.getElementById("settings-panel");
  const settingsBtn = document.getElementById("settings-toggle");
  function syncPressed() {
    panel.querySelectorAll("button[data-set]").forEach((b) => {
      b.setAttribute("aria-pressed", String(SETTINGS[b.dataset.set].value() === b.dataset.value));
    });
  }
  panel.addEventListener("click", (e) => {
    const b = e.target.closest("button[data-set]");
    if (!b) return;
    const set = SETTINGS[b.dataset.set], v = b.dataset.value;
    if (v === set.fallback) storeDel(set.key); else storeSet(set.key, v);
    set.apply(v);
    syncPressed();
  });

  function openSettings(open) {
    panel.hidden = !open;
    settingsBtn.setAttribute("aria-expanded", String(open));
  }
  settingsBtn.addEventListener("click", () => openSettings(panel.hidden));
  document.addEventListener("click", (e) => { if (!panel.hidden && !e.target.closest("#settings")) openSettings(false); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !panel.hidden) { openSettings(false); settingsBtn.focus(); }
  });

  // Follow device changes unless the visitor picked something.
  darkQuery.addEventListener("change", () => { syncThemeColor(); syncPressed(); });
  motionQuery.addEventListener("change", (e) => {
    if (!storeGet(SETTINGS.motion.key)) { SETTINGS.motion.apply(e.matches ? "off" : "on"); syncPressed(); }
  });
  syncThemeColor();
  syncPressed();

  // ---------- boot ----------
  document.getElementById("lang-switch").addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-lang]");
    if (btn) setLang(btn.dataset.lang, true);
  });

  const menu = document.getElementById("mobile-menu");
  const menuBtn = document.getElementById("menu-toggle");
  function setMenu(open) {
    menu.classList.toggle("hidden", !open);
    menu.classList.toggle("flex", open);
    menuBtn.setAttribute("aria-expanded", String(open));
  }
  menuBtn.addEventListener("click", () => setMenu(menu.classList.contains("hidden")));
  menu.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });

  lang = initialLang();
  fetch(DATA_URL, { cache: "no-cache" })
    .then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then((json) => { data = json; render(); })
    .catch((err) => {
      console.error(err);
      document.getElementById("hero").replaceChildren(h("p", { class: "py-20 text-muted" }, UI[lang].loadError));
    })
    .finally(() => document.dispatchEvent(new Event("pageready"))); // hides the loading screen
})();

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
    heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z"/>'
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

  function brand(name, color, label) {
    const d = (window.BRAND_ICONS || {})[name];
    const el = h("span", { class: "brand-ic", style: "--c:" + (color || "#f472b6"), title: label || null });
    el.innerHTML = d
      ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="' + d + '"/></svg>'
      : '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/></svg>';
    return el;
  }

  const GITHUB_PATH = "M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 016 0C17.3 4.7 18.3 5 18.3 5c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A11.5 11.5 0 0023.5 12C23.5 5.7 18.3.5 12 .5z";

  function badge(text) { return h("span", { class: "badge" }, text); }

  function sectionHead(badgeText, title, center) {
    return h("header", { class: "section-head" + (center ? " center" : "") }, badgeText ? badge(badgeText) : null, h("h2", null, title));
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
    ["home", "navHome"], ["about", "navAbout"], ["skills", "navSkills"],
    ["experience", "navExperience"], ["education", "navEducation"], ["projects", "navProjects"], ["contact", "navContact"]
  ];

  function renderNav() {
    const s = UI[lang];
    const nav = document.getElementById("nav-links");
    nav.replaceChildren(...NAV
      .filter(([id]) => id !== "education" || hasItems(data.education))
      .map(([id, key]) => h("a", { href: "#" + id, "data-spy": id }, s[key])));

    const sw = document.getElementById("lang-switch");
    sw.replaceChildren(...LANGS.map((l) =>
      h("button", {
        type: "button", lang: l.code, "data-lang": l.code,
        "aria-pressed": String(l.code === lang), class: l.code === lang ? "active" : null
      }, l.label)
    ));

    const hire = document.getElementById("hire-btn");
    hire.replaceChildren(s.hireMe, icon("arrow"));
  }

  function renderHero() {
    const p = data.profile;
    const s = UI[lang];
    const since = hasItems(data.experience) ? data.experience[0].start : null;

    const [before, after] = s.greeting.split("{name}");
    const greet = h("h1", { class: "greet" }, before, t(p.firstName || p.name, "span", "accent"), after || "");

    const secondary = p.cv
      ? h("a", { class: "btn btn-outline", href: p.cv, download: "" }, s.downloadCV, icon("download"))
      : h("a", { class: "btn btn-outline", href: "#contact" }, s.contactMe, icon("mail"));

    const tech = hasItems(data.proficiency)
      ? h("div", { class: "tech-row" },
          h("p", { class: "eyebrow" }, s.techWith),
          h("ul", null, data.proficiency.map((pf) => h("li", null, brand(pf.icon, pf.color, resolveEn(pf.name))))))
      : null;

    const copy = h("div", { class: "hero-copy hero-enter" },
      badge(resolveEn(p.tagline) ? resolve(p.tagline).text : resolve(p.title).text),
      greet,
      t(p.slogan, "p", "slogan"),
      t(p.intro || p.summary, "p", "intro"),
      h("div", { class: "cta" },
        h("a", { class: "btn btn-primary", href: "#projects" }, s.viewWork, icon("arrow")),
        secondary
      ),
      tech
    );

    const portrait = p.photo
      ? h("img", { class: "portrait", src: p.photo, alt: p.romanName || "" })
      : h("div", { class: "portrait portrait-mono" }, (p.romanName || "").split(/\s+/).map((w) => w[0]).join(""));

    const art = h("div", { class: "hero-art" },
      h("div", { class: "dots", "aria-hidden": "true" }),
      h("div", { class: "orb" }, portrait),
      renderCodeCard(p, since),
      svg('<svg class="doodle" viewBox="0 0 80 90" aria-hidden="true"><path d="M70 8C40 6 18 22 22 44c3 16 22 16 22 3 0-12-20-12-28 2-6 11-6 24 0 34"/><path d="M8 74l8 10 8-9"/></svg>')
    );

    document.getElementById("hero").replaceChildren(h("div", { class: "hero-grid" }, copy, art));
  }

  function renderCodeCard(p, since) {
    const str = (v) => h("span", { class: "c-str" }, '"' + v + '"');
    const key = (k) => h("span", { class: "c-key" }, k);
    const pun = (v) => h("span", { class: "c-pun" }, v);
    const skills = (data.skills || []).map((sk) => resolveEn(sk.title).replace(/^Enterprise /, "").replace(/ & CLI$/, "").replace(/ Development$/, ""));
    const lines = [
      [h("span", { class: "c-kw" }, "const "), h("span", { class: "c-var" }, "engineer"), pun(" = {")],
      ["  ", key("name"), pun(": "), str((resolveEn(p.firstName) || p.romanName || "")), pun(",")],
      ["  ", key("role"), pun(": "), str(resolveEn(p.title)), pun(",")],
      ["  ", key("skills"), pun(": ["), ...skills.flatMap((sk, i) => [str(sk), i < skills.length - 1 ? pun(", ") : null]), pun("],")],
      since ? ["  ", key("since"), pun(": "), str(since), pun(",")] : null,
      ["  ", key("passion"), pun(": "), str("Reliable systems"), pun(",")],
      [pun("};")]
    ].filter(Boolean);
    return h("div", { class: "code-card", "aria-hidden": "true", lang: "en" },
      h("div", { class: "code-head" }, h("span", null, "</> engineer.js"), h("i")),
      h("pre", null, lines.map((parts, i) => h("span", { class: "code-line", style: "--i:" + i }, ...parts)))
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

    document.getElementById("about").replaceChildren(h("div", { class: "wrap about-grid" },
      h("div", { class: "about-copy reveal" },
        badge(s.aboutBadge),
        h("h2", null, s.aboutHeading),
        t(p.summary, "p", "summary"),
        since ? h("p", { class: "since" }, h("span", { class: "dot" }), s.sinceLabel + " " + formatDate(since, true)) : null,
        h("a", { class: "btn btn-outline btn-sm", href: "#experience" }, s.learnMore, icon("user"))
      ),
      h("div", { class: "stats", "data-reveal-group": "" }, stats.map(([ic, n, suffix, label]) =>
        h("div", { class: "stat" },
          h("div", { class: "stat-ic" }, icon(ic)),
          h("div", null,
            h("strong", { "data-count": n, "data-suffix": suffix }, "0"),
            h("span", null, label)
          )
        )
      ))
    ));
  }

  function renderSkills() {
    const s = UI[lang];
    const bars = (data.proficiency || []).map((pf) =>
      h("div", { class: "bar-item", style: "--v:" + Math.max(0, Math.min(100, pf.level || 0)) + "%;--c:" + (pf.color || "#f472b6") },
        h("div", { class: "bar-top" },
          brand(pf.icon, pf.color),
          t(pf.name, "span", "bar-name"),
          h("span", { class: "bar-val" }, (pf.level || 0) + "%")
        ),
        h("div", { class: "bar" }, h("i"))
      )
    );
    const cards = (data.skills || []).map((sk) =>
      h("article", { class: "card skill tilt" },
        h("div", { class: "skill-ic" }, icon(sk.icon)),
        t(sk.title, "h3"),
        t(sk.description, "p"),
        hasItems(sk.items) ? h("ul", { class: "chips" }, sk.items.map((it) => t(it, "li"))) : null
      )
    );
    document.getElementById("skills").replaceChildren(h("div", { class: "wrap" },
      sectionHead(s.skillsBadge, s.skillsHeading, true),
      bars.length ? h("div", { class: "bars", "data-reveal-group": "" }, bars) : null,
      h("div", { class: "subhead" }, sectionHead(s.expertiseBadge, s.expertiseHeading, true)),
      h("div", { class: "grid grid-2", "data-reveal-group": "" }, cards)
    ));
  }

  function timeline(items, roleKey, orgKey) {
    return h("ol", { class: "timeline", "data-reveal-group": "" }, items.map((e) =>
      h("li", null,
        h("div", { class: "when" }, formatDate(e.start) + " — " + formatDate(e.end)),
        h("div", { class: "card tilt" },
          t(e[roleKey], "h3"),
          t(e[orgKey], "p", "org"),
          e.description ? t(e.description, "p") : null,
          hasItems(e.highlights) ? h("ul", { class: "bullets" }, e.highlights.map((x) => t(x, "li"))) : null
        )
      )
    ));
  }

  function renderExperience() {
    const s = UI[lang];
    document.getElementById("experience").replaceChildren(h("div", { class: "wrap" },
      sectionHead(s.experienceBadge, s.experienceTitle, true),
      timeline(data.experience || [], "role", "organization")
    ));
  }

  function renderEducation() {
    const el = document.getElementById("education");
    if (!hasItems(data.education)) { el.hidden = true; el.replaceChildren(); return; }
    const s = UI[lang];
    el.hidden = false;
    el.replaceChildren(h("div", { class: "wrap" },
      sectionHead(s.educationBadge, s.educationTitle, true),
      timeline(data.education, "degree", "institution")
    ));
  }

  const COVER_HUES = [330, 285, 205, 350, 260, 190];

  function projectCover(pr, i) {
    if (pr.image) return h("div", { class: "cover" }, h("img", { src: pr.image, alt: "", loading: "lazy" }));
    const label = (pr.tags && pr.tags[0]) || resolveEn(pr.title).slice(0, 3);
    return h("div", { class: "cover cover-art", style: "--h:" + COVER_HUES[i % COVER_HUES.length], "aria-hidden": "true" },
      h("div", { class: "mock" },
        h("div", { class: "mock-bar" }, h("i"), h("i"), h("i")),
        h("div", { class: "mock-body" },
          h("span", { class: "mock-label" }, label),
          h("span", { class: "mock-line", style: "--w:70%" }),
          h("span", { class: "mock-line", style: "--w:50%" }),
          h("span", { class: "mock-line", style: "--w:62%" })
        )
      )
    );
  }

  function renderProjects() {
    const s = UI[lang];
    const cards = (data.projects || []).map((pr, i) =>
      h("article", { class: "card project tilt" },
        h("span", { class: "num" }, String(i + 1).padStart(2, "0")),
        projectCover(pr, i),
        h("div", { class: "project-body" },
          t(pr.title, "h3"),
          t(pr.description, "p"),
          h("div", { class: "project-foot" },
            hasItems(pr.tags) ? h("ul", { class: "tags" }, pr.tags.map((tg) => h("li", null, tg))) : h("span"),
            pr.link ? h("a", { class: "more", href: pr.link, target: "_blank", rel: "noopener" }, s.viewProject, icon("arrow")) : null
          )
        )
      )
    );
    document.getElementById("projects").replaceChildren(h("div", { class: "wrap" },
      sectionHead(s.projectsBadge, s.projectsHeading, true),
      h("div", { class: "grid grid-3", "data-reveal-group": "" }, cards)
    ));
  }

  function renderContact() {
    const p = data.profile;
    const s = UI[lang];
    const avatar = p.photo ? h("img", { src: p.photo, alt: "" }) : h("span", null, (p.romanName || "?")[0]);

    const socials = [
      p.github ? h("a", { class: "social", href: p.github, target: "_blank", rel: "noopener", "aria-label": "GitHub",
        html: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="' + GITHUB_PATH + '"/></svg>' }) : null,
      p.email ? h("a", { class: "social", href: "mailto:" + p.email, "aria-label": s.email }, icon("mail")) : null
    ];

    document.getElementById("contact").replaceChildren(h("div", { class: "wrap cta-grid", "data-reveal-group": "" },
      h("div", { class: "cta-copy" },
        badge(s.ctaBadge),
        h("h2", null, s.ctaHeading),
        h("p", null, s.ctaText),
        p.email ? h("a", { class: "btn btn-primary btn-sm", href: "mailto:" + p.email }, s.getInTouch, icon("arrow")) : null
      ),
      p.motto ? h("figure", { class: "quote-card" },
        icon("quote", "quote-ic"),
        h("blockquote", null, t(p.motto)),
        h("figcaption", null,
          h("div", { class: "q-avatar" }, avatar),
          h("div", null, t(p.name, "strong"), h("span", null, s.mottoLabel))
        )
      ) : h("div"),
      h("div", { class: "follow" },
        badge(s.followMe),
        h("div", { class: "socials" }, socials),
        p.email ? h("a", { class: "c-row", href: "mailto:" + p.email }, icon("mail"), p.email) : null,
        p.location ? h("p", { class: "c-row" }, icon("pin"), t(p.location)) : null
      )
    ));

    const year = new Date().getFullYear();
    document.getElementById("footer").replaceChildren(h("div", { class: "wrap footer-inner" },
      h("p", null, "© " + year + " ", t(p.name), ". " + s.rights + "."),
      h("p", null, s.madeWith + " ", icon("heart", "heart"), " " + s.by + " " + (resolveEn(p.firstName) || p.romanName || ""))
    ));
  }

  function updateMeta() {
    const p = data.profile;
    document.documentElement.lang = lang;
    document.title = resolve(p.name).text + " | " + resolve(p.title).text;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", resolve(p.slogan || p.headline).text);
  }

  function loadFont(code) {
    const href = FONT_URLS[code];
    if (!href || document.querySelector('link[data-font="' + code + '"]')) return;
    document.head.append(h("link", { rel: "stylesheet", href, "data-font": code }));
  }

  function render() {
    const id = ++renderId;
    jobs = [];
    loadFont(lang);
    renderNav();
    renderHero();
    renderAbout();
    renderSkills();
    renderExperience();
    renderEducation();
    renderProjects();
    renderContact();
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

  // ---------- boot ----------
  document.getElementById("lang-switch").addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-lang]");
    if (btn) setLang(btn.dataset.lang, true);
  });

  document.getElementById("menu-toggle").addEventListener("click", () => {
    document.body.classList.toggle("menu-open");
  });
  document.getElementById("nav-links").addEventListener("click", (e) => {
    if (e.target.closest("a")) document.body.classList.remove("menu-open");
  });

  lang = initialLang();
  fetch(DATA_URL, { cache: "no-cache" })
    .then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then((json) => { data = json; render(); })
    .catch((err) => {
      console.error(err);
      document.getElementById("hero").replaceChildren(h("p", { class: "error" }, UI[lang].loadError));
    });
})();

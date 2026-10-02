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

  const ICONS = {
    network: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="2" width="6" height="5" rx="1"/><rect x="2" y="17" width="6" height="5" rx="1"/><rect x="16" y="17" width="6" height="5" rx="1"/><path d="M12 7v5M5 17v-2.5h14V17M12 12v2.5"/></svg>',
    windows: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="8" height="8" rx="1"/><rect x="13" y="3" width="8" height="8" rx="1"/><rect x="3" y="13" width="8" height="8" rx="1"/><rect x="13" y="13" width="8" height="8" rx="1"/></svg>',
    terminal: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M6 9l3 3-3 3M12 15h6"/></svg>',
    code: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/></svg>',
    server: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="7" rx="1.5"/><rect x="3" y="14" width="18" height="7" rx="1.5"/><path d="M7 6.5h.01M7 17.5h.01"/></svg>',
    shield: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5z"/></svg>'
  };

  // ---------- sections ----------
  function renderNav() {
    const s = UI[lang];
    const links = [
      ["about", s.navAbout],
      ["skills", s.navSkills],
      ["experience", s.navExperience],
      hasItems(data.education) ? ["education", s.navEducation] : null,
      ["projects", s.navProjects],
      ["contact", s.navContact]
    ].filter(Boolean);
    const nav = document.getElementById("nav-links");
    nav.replaceChildren(...links.map(([id, label]) => h("a", { href: "#" + id }, label)));

    const sw = document.getElementById("lang-switch");
    sw.replaceChildren(...LANGS.map((l) =>
      h("button", {
        type: "button",
        lang: l.code,
        "data-lang": l.code,
        "aria-pressed": String(l.code === lang),
        class: l.code === lang ? "active" : null
      }, l.label)
    ));
  }

  function renderHero() {
    const p = data.profile;
    const s = UI[lang];
    const since = hasItems(data.experience) ? data.experience[0].start : null;
    const initials = (p.romanName || "").split(/\s+/).map((w) => w[0]).join("").slice(0, 2);

    const avatar = h("div", { class: "avatar-ring" }, p.photo
      ? h("img", { class: "avatar", src: p.photo, alt: p.romanName || "" })
      : h("div", { class: "avatar avatar-mono", "aria-hidden": "true" }, initials));

    const name = t(p.name, "h1", "gradient-text");
    const roman = lang !== "en" && p.romanName ? h("p", { class: "roman", lang: "en" }, p.romanName) : null;

    const hero = h("div", { class: "hero-grid" },
      h("div", { class: "hero-main hero-enter" },
        avatar,
        name,
        roman,
        h("p", { class: "role" }, t(p.title), h("span", { class: "sep" }, " · "), t(p.organization)),
        t(p.headline, "p", "headline"),
        since ? h("p", { class: "since" }, h("span", { class: "dot" }), s.sinceLabel + " " + formatDate(since, true)) : null,
        h("div", { class: "cta" },
          h("a", { class: "btn btn-primary", href: "#contact" }, s.contactMe),
          h("a", { class: "btn", href: "#projects" }, s.viewProjects)
        )
      ),
      h("div", { class: "hero-visual" }, renderTerminal(p, since))
    );
    document.getElementById("hero").replaceChildren(hero, renderStats(), renderTicker());
  }

  function renderTerminal(p, since) {
    const host = "kittiphun@mcu-phrae";
    const line = (cmd, out) => [
      h("div", { class: "t-cmd" }, h("span", { class: "t-prompt" }, host + ":~$ "), cmd),
      h("div", { class: "t-out" }, out)
    ];
    const skills = (data.skills || []).map((sk) => resolveEn(sk.title)).join(" · ");
    return h("div", { class: "terminal", "aria-hidden": "true", lang: "en" },
      h("div", { class: "t-bar" }, h("i"), h("i"), h("i")),
      h("div", { class: "t-body" },
        line("whoami", p.romanName || ""),
        line("cat role.txt", resolveEn(p.title)),
        line("show skills", skills),
        since ? line("uptime", "since " + since) : null,
        h("div", { class: "t-cmd" }, h("span", { class: "t-prompt" }, host + ":~$ "), h("span", { class: "caret" }))
      )
    );
  }

  function renderStats() {
    const s = UI[lang];
    const techCount = (data.skills || []).reduce((n, sk) => n + (sk.items || []).length, 0);
    const stats = [
      [(data.projects || []).length, "+", s.statProjects],
      [(data.skills || []).length, "", s.statDomains],
      [techCount, "+", s.statTech],
      [LANGS.length, "", s.statLangs]
    ];
    return h("div", { class: "stats" }, stats.map(([n, suffix, label]) =>
      h("div", { class: "stat" },
        h("strong", { "data-count": n, "data-suffix": suffix }, "0"),
        h("span", null, label)
      )
    ));
  }

  function renderTicker() {
    const items = (data.skills || []).flatMap((sk) => sk.items || []);
    if (!items.length) return null;
    const row = () => h("ul", null, items.map((it) => h("li", null, resolveEn(it))));
    return h("div", { class: "ticker", "aria-hidden": "true" }, h("div", { class: "ticker-track" }, row(), row()));
  }

  function resolveEn(v) {
    if (!isI18n(v)) return v == null ? "" : String(v);
    return v.en || v.th || Object.values(v)[0] || "";
  }

  function sectionHead(title, lead) {
    return h("header", { class: "section-head" }, h("h2", null, title), lead ? h("p", { class: "lead" }, lead) : null);
  }

  function renderAbout() {
    const p = data.profile;
    const s = UI[lang];
    const facts = h("dl", { class: "facts" },
      h("div", null, h("dt", null, s.position), h("dd", null, t(p.title))),
      h("div", null, h("dt", null, s.organization), h("dd", null, t(p.organization))),
      h("div", null, h("dt", null, s.location), h("dd", null, t(p.location))),
      p.email ? h("div", null, h("dt", null, s.email), h("dd", null, h("a", { href: "mailto:" + p.email }, p.email))) : null
    );
    document.getElementById("about").replaceChildren(
      sectionHead(s.aboutTitle),
      h("div", { class: "about-grid" }, t(p.summary, "p", "summary"), facts)
    );
  }

  function renderSkills() {
    const s = UI[lang];
    const cards = (data.skills || []).map((sk) =>
      h("article", { class: "card skill tilt" },
        h("div", { class: "icon", html: ICONS[sk.icon] || ICONS.server }),
        t(sk.title, "h3"),
        t(sk.description, "p"),
        hasItems(sk.items) ? h("ul", { class: "chips" }, sk.items.map((it) => t(it, "li"))) : null
      )
    );
    document.getElementById("skills").replaceChildren(
      sectionHead(s.skillsTitle, s.skillsLead),
      h("div", { class: "grid grid-2", "data-reveal-group": "" }, cards)
    );
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
    document.getElementById("experience").replaceChildren(
      sectionHead(UI[lang].experienceTitle),
      timeline(data.experience || [], "role", "organization")
    );
  }

  function renderEducation() {
    const el = document.getElementById("education");
    if (!hasItems(data.education)) { el.hidden = true; el.replaceChildren(); return; }
    el.hidden = false;
    el.replaceChildren(
      sectionHead(UI[lang].educationTitle),
      timeline(data.education, "degree", "institution")
    );
  }

  function renderProjects() {
    const s = UI[lang];
    const cards = (data.projects || []).map((pr) =>
      h("article", { class: "card project tilt" },
        pr.image ? h("img", { class: "thumb", src: pr.image, alt: "", loading: "lazy" }) : null,
        t(pr.title, "h3"),
        t(pr.description, "p"),
        h("div", { class: "project-foot" },
          hasItems(pr.tags) ? h("ul", { class: "tags" }, pr.tags.map((tg) => h("li", null, tg))) : h("span"),
          pr.link ? h("a", { class: "more", href: pr.link, target: "_blank", rel: "noopener" }, s.viewCode + " →") : null
        )
      )
    );
    document.getElementById("projects").replaceChildren(
      sectionHead(s.projectsTitle, s.projectsLead),
      h("div", { class: "grid grid-3", "data-reveal-group": "" }, cards)
    );
  }

  function renderContact() {
    const p = data.profile;
    const s = UI[lang];
    const links = [
      p.email ? h("a", { class: "contact-item", href: "mailto:" + p.email }, h("span", null, s.email), h("strong", null, p.email)) : null,
      p.github ? h("a", { class: "contact-item", href: p.github, target: "_blank", rel: "noopener" }, h("span", null, "GitHub"), h("strong", null, p.github.replace(/^https?:\/\//, ""))) : null,
      p.location ? h("div", { class: "contact-item" }, h("span", null, s.location), t(p.location, "strong")) : null
    ];
    document.getElementById("contact").replaceChildren(
      sectionHead(s.contactTitle, s.contactLead),
      h("div", { class: "contact-grid", "data-reveal-group": "" }, links)
    );
    const year = new Date().getFullYear();
    document.getElementById("footer").replaceChildren(
      h("p", null, "© " + year + " ", t(p.name), ". " + s.rights + ".")
    );
  }

  function updateMeta() {
    const p = data.profile;
    document.documentElement.lang = lang;
    document.title = resolve(p.name).text + " | " + resolve(p.title).text;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", resolve(p.headline).text);
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

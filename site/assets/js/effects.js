// Visual effects: 3D network globe, scroll reveal, card tilt, animated counters,
// eased in-page scrolling, interactive cursor and scroll progress.
// Motion follows <html data-motion="on|off"> (device setting or the display
// settings menu) and switches live on the "motionchange" event.
(function () {
  "use strict";

  const motionOn = () => document.documentElement.dataset.motion !== "off";
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  // ---------- 3D network globe ----------
  const Globe = (function () {
    const canvas = document.getElementById("globe");
    if (!canvas || !canvas.getContext) return { layout() {}, syncMotion() {} };
    const ctx = canvas.getContext("2d");
    const hero = canvas.parentElement;

    const N = 220;
    const NEIGHBOURS = 3;
    const points = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const th = golden * i;
      points.push([Math.cos(th) * r, y, Math.sin(th) * r]);
    }

    // Link each node to its nearest neighbours (deduplicated).
    const edgeSet = new Set();
    const edges = [];
    points.forEach((p, i) => {
      points
        .map((q, j) => [j, (p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2 + (p[2] - q[2]) ** 2])
        .filter(([j]) => j !== i)
        .sort((a, b) => a[1] - b[1])
        .slice(0, NEIGHBOURS)
        .forEach(([j]) => {
          const key = i < j ? i + "-" + j : j + "-" + i;
          if (!edgeSet.has(key)) { edgeSet.add(key); edges.push([i, j]); }
        });
    });

    // Data packets travelling along random edges.
    const packets = Array.from({ length: 26 }, () => newPacket());
    function newPacket() {
      return { e: edges[(Math.random() * edges.length) | 0], t: Math.random(), v: 0.004 + Math.random() * 0.008 };
    }

    // Background particles.
    const dust = Array.from({ length: 70 }, () => ({
      x: Math.random(), y: Math.random(), r: Math.random() * 1.4 + 0.3, v: Math.random() * 0.00025 + 0.00005, a: Math.random() * 0.5 + 0.15
    }));

    // Palette follows the device theme (deeper pinks on a light background).
    const darkMq = window.matchMedia("(prefers-color-scheme: dark)");
    const PALETTES = {
      dark: { dust: "#ffc2dd", glowA: "rgba(236,72,153,0.32)", glowB: "rgba(190,24,93,0.12)", glowC: "rgba(190,24,93,0)",
              ring: "249,168,212", sat: "#fbcfe8", edge: "#f9a8d4", nodeFront: "#ffe4f1", nodeBack: "#f472b6", core: "rgba(255,255,255,1)", halo: "244,114,182", edgeBoost: 1 },
      light: { dust: "#f472b6", glowA: "rgba(236,72,153,0.16)", glowB: "rgba(219,39,119,0.06)", glowC: "rgba(219,39,119,0)",
               ring: "219,39,119", sat: "#db2777", edge: "#db2777", nodeFront: "#be185d", nodeBack: "#f472b6", core: "rgba(255,240,247,1)", halo: "219,39,119", edgeBoost: 0.85 }
    };
    function isDark() {
      const t = document.documentElement.getAttribute("data-theme");
      return t ? t === "dark" : darkMq.matches;
    }
    let pal = isDark() ? PALETTES.dark : PALETTES.light;
    function repaint() { pal = isDark() ? PALETTES.dark : PALETTES.light; if (!running) draw(); }
    darkMq.addEventListener("change", repaint);
    document.addEventListener("themechange", repaint);

    let w = 0, h = 0, dpr = 1, cx = 0, cy = 0, R = 0;
    let rotY = 0, rotX = -0.35;
    let mx = 0, my = 0, tmx = 0, tmy = 0;
    let running = false, visible = true, raf = 0;

    function layout() {
      const rect = hero.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width; h = rect.height;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      canvas.style.width = w + "px"; canvas.style.height = h + "px";
      const anchor = document.getElementById("orb");
      if (anchor) {
        const a = anchor.getBoundingClientRect();
        cx = a.left - rect.left + a.width / 2;
        cy = a.top - rect.top + a.height / 2;
        R = a.width / 2 * 1.32;
      } else {
        cx = w * 0.7; cy = h * 0.45; R = Math.min(w, h) * 0.3;
      }
      if (!running) draw();
    }

    function project(p) {
      // rotate around Y then X
      const cosY = Math.cos(rotY + mx * 0.6), sinY = Math.sin(rotY + mx * 0.6);
      const cosX = Math.cos(rotX + my * 0.4), sinX = Math.sin(rotX + my * 0.4);
      let x = p[0] * cosY - p[2] * sinY;
      let z = p[0] * sinY + p[2] * cosY;
      let y = p[1] * cosX - z * sinX;
      z = p[1] * sinX + z * cosX;
      const persp = 2.8 / (2.8 - z);
      return [cx + x * R * persp, cy + y * R * persp, z, persp];
    }

    function draw() {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      for (const d of dust) {
        ctx.globalAlpha = d.a;
        ctx.fillStyle = pal.dust;
        ctx.beginPath(); ctx.arc(d.x * w, d.y * h, d.r, 0, 6.283); ctx.fill();
      }

      // soft glow behind the globe
      const g = ctx.createRadialGradient(cx, cy, R * 0.1, cx, cy, R * 1.6);
      g.addColorStop(0, pal.glowA);
      g.addColorStop(0.5, pal.glowB);
      g.addColorStop(1, pal.glowC);
      ctx.globalAlpha = 1; ctx.fillStyle = g;
      ctx.fillRect(cx - R * 1.6, cy - R * 1.6, R * 3.2, R * 3.2);

      const proj = points.map(project);

      // orbit rings
      ctx.lineWidth = 1;
      for (let k = 0; k < 2; k++) {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(-0.35 + k * 0.7 + rotY * (k ? -0.15 : 0.1));
        ctx.strokeStyle = "rgba(" + pal.ring + "," + (0.18 - k * 0.06) + ")";
        ctx.beginPath(); ctx.ellipse(0, 0, R * (1.35 + k * 0.12), R * (0.32 + k * 0.08), 0, 0, 6.283); ctx.stroke();
        const sa = rotY * (k ? -2.2 : 1.6) + k * 2;
        ctx.fillStyle = pal.sat;
        ctx.beginPath(); ctx.arc(Math.cos(sa) * R * (1.35 + k * 0.12), Math.sin(sa) * R * (0.32 + k * 0.08), 2.6, 0, 6.283); ctx.fill();
        ctx.restore();
      }

      // edges
      for (const [i, j] of edges) {
        const a = proj[i], b = proj[j];
        const depth = (a[2] + b[2]) / 2;
        ctx.globalAlpha = Math.max(0.04, (0.12 + depth * 0.3) * pal.edgeBoost);
        ctx.strokeStyle = pal.edge;
        ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke();
      }

      // nodes
      for (const p of proj) {
        const front = (p[2] + 1) / 2;
        ctx.globalAlpha = 0.25 + front * 0.75;
        ctx.fillStyle = front > 0.55 ? pal.nodeFront : pal.nodeBack;
        ctx.beginPath(); ctx.arc(p[0], p[1], 1 + front * 1.8 * p[3], 0, 6.283); ctx.fill();
      }

      // packets
      for (const pk of packets) {
        const a = proj[pk.e[0]], b = proj[pk.e[1]];
        const x = a[0] + (b[0] - a[0]) * pk.t, y = a[1] + (b[1] - a[1]) * pk.t;
        const front = ((a[2] + b[2]) / 2 + 1) / 2;
        ctx.globalAlpha = 0.3 + front * 0.7;
        const pg = ctx.createRadialGradient(x, y, 0, x, y, 7);
        pg.addColorStop(0, pal.core);
        pg.addColorStop(0.35, "rgba(" + pal.halo + ",0.9)");
        pg.addColorStop(1, "rgba(" + pal.halo + ",0)");
        ctx.fillStyle = pg;
        ctx.beginPath(); ctx.arc(x, y, 7, 0, 6.283); ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    function tick() {
      rotY += 0.0022;
      mx += (tmx - mx) * 0.05; my += (tmy - my) * 0.05;
      for (const pk of packets) {
        pk.t += pk.v;
        if (pk.t >= 1) Object.assign(pk, newPacket(), { t: 0 });
      }
      for (const d of dust) { d.y -= d.v; if (d.y < -0.02) { d.y = 1.02; d.x = Math.random(); } }
      draw();
      raf = requestAnimationFrame(tick);
    }

    function start() {
      if (running || !motionOn() || !visible || document.hidden) return;
      running = true; raf = requestAnimationFrame(tick);
    }
    function stop() { running = false; cancelAnimationFrame(raf); }

    hero.addEventListener("pointermove", (e) => {
      const r = hero.getBoundingClientRect();
      tmx = ((e.clientX - r.left) / r.width - 0.5);
      tmy = ((e.clientY - r.top) / r.height - 0.5);
      hero.style.setProperty("--mx", (e.clientX - r.left) + "px");
      hero.style.setProperty("--my", (e.clientY - r.top) + "px");
    });
    hero.addEventListener("pointerleave", () => { tmx = 0; tmy = 0; });

    new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
      visible ? start() : stop();
    }).observe(hero);
    document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));
    window.addEventListener("resize", layout);

    // Turning motion off freezes the globe on its current frame.
    function syncMotion() { motionOn() ? start() : stop(); }

    layout();
    start();
    return { layout, syncMotion };
  })();

  // ---------- scroll reveal ----------
  // With motion off the CSS shows .reveal elements at once; they are still
  // observed so turning motion back on does not hide anything already seen.
  const revealer = "IntersectionObserver" in window
    ? new IntersectionObserver((entries) => {
        for (const en of entries) {
          if (en.isIntersecting) { en.target.classList.add("in"); revealer.unobserve(en.target); }
        }
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 })
    : null;

  function reveal() {
    const groups = document.querySelectorAll("[data-reveal-group]");
    groups.forEach((g) => {
      Array.from(g.children).forEach((el, i) => {
        el.classList.add("reveal");
        el.style.setProperty("--d", Math.min(i, 8) * 80 + "ms");
      });
    });
    document.querySelectorAll(".section-head, .reveal").forEach((el) => {
      el.classList.add("reveal");
      if (revealer) revealer.observe(el); else el.classList.add("in");
    });
  }

  // ---------- counters ----------
  const counterObs = "IntersectionObserver" in window
    ? new IntersectionObserver((entries) => {
        for (const en of entries) {
          if (!en.isIntersecting) continue;
          counterObs.unobserve(en.target);
          animateCount(en.target);
        }
      }, { threshold: 0.4 })
    : null;

  function animateCount(el) {
    const target = Number(el.dataset.count) || 0;
    const suffix = el.dataset.suffix || "";
    if (!motionOn()) { el.textContent = target + suffix; return; }
    const t0 = performance.now(), dur = 1400;
    (function step(now) {
      const p = Math.min(1, (now - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    })(t0);
  }

  function counters() {
    document.querySelectorAll("[data-count]").forEach((el) => {
      if (counterObs) counterObs.observe(el); else animateCount(el);
    });
  }

  // ---------- 3D tilt on cards ----------
  if (finePointer) {
    let active = null;
    document.addEventListener("pointermove", (e) => {
      const el = motionOn() && e.target.closest ? e.target.closest(".tilt") : null;
      if (active && active !== el) resetTilt(active);
      active = el;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      el.style.setProperty("--rx", ((0.5 - py) * 8).toFixed(2) + "deg");
      el.style.setProperty("--ry", ((px - 0.5) * 10).toFixed(2) + "deg");
      el.style.setProperty("--gx", (px * 100).toFixed(1) + "%");
      el.style.setProperty("--gy", (py * 100).toFixed(1) + "%");
      el.classList.add("tilting");
    }, { passive: true });
    document.addEventListener("pointerleave", () => active && resetTilt(active));
  }
  function resetTilt(el) {
    el.classList.remove("tilting");
    el.style.removeProperty("--rx"); el.style.removeProperty("--ry");
  }

  // ---------- eased smooth scrolling for in-page links ----------
  // Navbar / button links glide to their section with an ease-in-out curve
  // whose duration grows with distance. Wheel or touch input cancels it.
  let scrollAnim = 0;
  function cancelScroll() {
    if (!scrollAnim) return;
    cancelAnimationFrame(scrollAnim);
    scrollAnim = 0;
    document.documentElement.style.scrollBehavior = "";
  }
  function smoothScrollTo(y) {
    cancelScroll();
    const startY = scrollY;
    const maxY = document.documentElement.scrollHeight - innerHeight;
    const endY = Math.max(0, Math.min(maxY, y));
    const dist = Math.abs(endY - startY);
    if (!motionOn() || dist < 2) { window.scrollTo(0, endY); return; }
    const duration = Math.min(1400, Math.max(600, 400 + dist * 0.35));
    const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2); // easeInOutCubic
    // Native CSS smooth scrolling would animate every step again; pause it.
    document.documentElement.style.scrollBehavior = "auto";
    const t0 = performance.now();
    const step = (now) => {
      const p = Math.min(1, (now - t0) / duration);
      window.scrollTo(0, startY + (endY - startY) * ease(p));
      if (p < 1) scrollAnim = requestAnimationFrame(step);
      else { scrollAnim = 0; document.documentElement.style.scrollBehavior = ""; }
    };
    scrollAnim = requestAnimationFrame(step);
  }
  ["wheel", "touchstart", "keydown"].forEach((ev) => window.addEventListener(ev, cancelScroll, { passive: true }));

  document.addEventListener("click", (e) => {
    const a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
    const hash = a.getAttribute("href");
    const target = hash.length > 1 && document.getElementById(decodeURIComponent(hash.slice(1)));
    if (!target) return;
    e.preventDefault();
    const pad = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
    smoothScrollTo(target.getBoundingClientRect().top + scrollY - pad);
    const url = new URL(location.href);
    url.hash = hash;
    history.replaceState(null, "", url);
  });

  // ---------- interactive cursor ----------
  // A dot that tracks the pointer and a ring that trails it. The ring grows
  // over links/buttons and becomes a labelled "view" bubble over clickable
  // images. Mouse-only, and only while motion is on; otherwise the normal
  // cursor stays.
  const Cursor = (function () {
    if (!finePointer) return { syncMotion() {} };
    const root = document.documentElement;
    const CLICKABLE = 'a, button, [role="button"], label, summary';
    let dot = null, ring = null, label = null, raf = 0, on = false, shown = false;
    let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y;

    function build() {
      dot = document.createElement("div");
      ring = document.createElement("div");
      label = document.createElement("span");
      dot.className = "cursor-dot";
      ring.className = "cursor-ring";
      ring.append(label);
      dot.setAttribute("aria-hidden", "true");
      ring.setAttribute("aria-hidden", "true");
      document.body.append(ring, dot);

      window.addEventListener("pointermove", (e) => {
        if (!on || e.pointerType !== "mouse") return;
        x = e.clientX; y = e.clientY;
        dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        if (!shown) { shown = true; rx = x; ry = y; root.classList.add("cursor-visible"); }
      }, { passive: true });
      document.addEventListener("pointerleave", hide);
      window.addEventListener("pointerdown", () => ring.classList.add("is-down"));
      window.addEventListener("pointerup", () => ring.classList.remove("is-down"));
      document.addEventListener("pointerover", (e) => {
        if (!on) return;
        const t = e.target;
        const clickable = t.closest && t.closest(CLICKABLE);
        const isImage = t.tagName === "IMG" || (t.closest && t.closest(".thumb"));
        ring.classList.remove("is-link", "is-view", "is-media");
        dot.classList.remove("is-hidden");
        if (clickable && isImage) {
          const ui = (window.UI || {})[root.lang] || {};
          label.textContent = ui.cursorView || "View";
          ring.classList.add("is-view");
          dot.classList.add("is-hidden");
        } else if (clickable) {
          ring.classList.add("is-link");
          dot.classList.add("is-hidden");
        } else if (isImage) {
          ring.classList.add("is-media");
        }
      }, { passive: true });
    }

    function hide() { shown = false; root.classList.remove("cursor-visible"); }

    function follow() {
      rx += (x - rx) * 0.18; ry += (y - ry) * 0.18;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(follow);
    }

    function syncMotion() {
      if (on === motionOn()) return;
      on = !on;
      if (on) {
        if (!dot) build();
        root.classList.add("has-cursor");
        raf = requestAnimationFrame(follow);
      } else {
        cancelAnimationFrame(raf);
        hide();
        root.classList.remove("has-cursor");
      }
    }

    syncMotion();
    return { syncMotion };
  })();

  document.addEventListener("motionchange", () => {
    if (!motionOn()) cancelScroll();
    Globe.syncMotion();
    Cursor.syncMotion();
  });

  // ---------- scroll progress + nav shadow ----------
  const progress = document.getElementById("progress");
  const topbar = document.getElementById("topbar");
  function onScroll() {
    const max = document.documentElement.scrollHeight - innerHeight;
    if (progress) progress.style.transform = "scaleX(" + (max > 0 ? scrollY / max : 0) + ")";
    if (topbar) {
      topbar.classList.toggle("border-ink-600", scrollY > 8);
      topbar.classList.toggle("border-transparent", scrollY <= 8);
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ---------- active nav link ----------
  let spy = null;
  function scrollSpy() {
    if (spy) spy.disconnect();
    if (!("IntersectionObserver" in window)) return;
    const links = Array.from(document.querySelectorAll("[data-spy]"));
    spy = new IntersectionObserver((entries) => {
      for (const en of entries) {
        if (!en.isIntersecting) continue;
        const id = en.target.dataset.spyAs || en.target.id;
        links.forEach((a) => a.classList.toggle("active", a.dataset.spy === id));
      }
    }, { rootMargin: "-45% 0px -50% 0px" });
    document.querySelectorAll("main > section[id]").forEach((sec) => spy.observe(sec));
  }

  // ---------- project carousel dots ----------
  function carousel() {
    const track = document.getElementById("carousel");
    const dotsBox = document.getElementById("carousel-dots");
    if (!track || !dotsBox) return;
    const cards = Array.from(track.children);
    let pages = 1;
    function perView() {
      const first = cards[0];
      return first ? Math.max(1, Math.round(track.clientWidth / first.getBoundingClientRect().width)) : 1;
    }
    function build() {
      pages = Math.max(1, Math.ceil(cards.length / perView()));
      dotsBox.replaceChildren(...Array.from({ length: pages }, (_, i) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "dot-btn h-2 w-2 rounded-full bg-ink-500 transition-all";
        b.setAttribute("aria-label", "Page " + (i + 1));
        b.addEventListener("click", () => track.scrollTo({ left: i * track.clientWidth, behavior: motionOn() ? "smooth" : "auto" }));
        return b;
      }));
      dotsBox.hidden = pages < 2;
      update();
    }
    function update() {
      const max = track.scrollWidth - track.clientWidth;
      const page = max > 0 ? Math.round((track.scrollLeft / max) * (pages - 1)) : 0;
      Array.from(dotsBox.children).forEach((d, i) => d.setAttribute("aria-current", String(i === page)));
    }
    track.addEventListener("scroll", update, { passive: true });
    build();
    carousel.rebuild = build;
  }
  window.addEventListener("resize", () => carousel.rebuild && carousel.rebuild());
  // Text size changes move the portrait and card widths.
  document.addEventListener("fontsizechange", () => {
    Globe.layout();
    if (carousel.rebuild) carousel.rebuild();
  });

  window.Effects = {
    afterRender() {
      if (window.Circuits) window.Circuits.mount();
      carousel();
      scrollSpy();
      reveal();
      counters();
      Globe.layout();
      onScroll();
    }
  };
})();

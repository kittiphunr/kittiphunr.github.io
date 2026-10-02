// PCB-style circuit traces with current pulses running along them.
//
//   <div data-circuit="divider" data-seed="3"></div>   a strip with an IC chip between sections
//   <div data-circuit="bg" data-seed="7"></div>        faint traces behind a section
//
// Layouts are generated from a seed, so every visit draws the same board.
// Pulses are CSS stroke-dash animations; they pause off-screen and are not
// created at all when the visitor prefers reduced motion.
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const NS = "http://www.w3.org/2000/svg";

  function prng(seed) { // mulberry32
    let a = seed >>> 0;
    return () => {
      a = (a + 0x6d2b79f5) >>> 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  const d = (pts) => pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");

  // Route from (x0,y0) heading right to (x1,y1): straight, a 45° jog, straight.
  function jog(x0, y0, x1, y1, at) {
    const dy = y1 - y0;
    if (!dy) return [[x0, y0], [x1, y1]];
    const jx = x0 + (x1 - x0 - Math.abs(dy)) * at;
    return [[x0, y0], [jx, y0], [jx + Math.abs(dy) * Math.sign(x1 - x0), y1], [x1, y1]];
  }

  // ---------- divider: traces run into an IC from both edges ----------
  function divider(seed) {
    const r = prng(seed), W = 1200, H = 110, cx = 600, cw = 132, ch = 70, top = (H - ch) / 2;
    const traces = [], pads = [], vias = [];
    const pinYs = [0, 1, 2, 3, 4].map((i) => top + 11 + i * 12);
    const lanes = [10, 22, 34, 46, 58, 70, 82, 94];
    pinYs.forEach((py, i) => {
      // left side: from the edge into a pin (signal flows toward the chip)
      const ly = lanes[Math.floor(r() * lanes.length)];
      traces.push({ pts: jog(0, ly, cx - cw / 2 - 8, py, .25 + r() * .5), pulse: r() < .8, rev: false });
      pads.push([cx - cw / 2 - 8, py]);
      // right side: out of a pin to the edge
      const ry = lanes[Math.floor(r() * lanes.length)];
      traces.push({ pts: jog(cx + cw / 2 + 8, py, W, ry, .25 + r() * .5), pulse: r() < .8, rev: false });
      pads.push([cx + cw / 2 + 8, py]);
      if (i % 2 === 0) vias.push([120 + r() * 300, lanes[Math.floor(r() * lanes.length)]], [W - 120 - r() * 300, lanes[Math.floor(r() * lanes.length)]]);
    });
    // a long bus above and below the chip
    [6, H - 6].forEach((y) => traces.push({ pts: [[0, y], [W, y]], pulse: r() < .6, rev: r() < .5, faint: true }));
    return { W, H, traces, pads, vias, chip: { x: cx - cw / 2, y: top, w: cw, h: ch, pins: pinYs } };
  }

  // ---------- background: random 45°-routed traces ending in pads ----------
  function background(seed) {
    const r = prng(seed), W = 1440, H = 900, traces = [], pads = [], vias = [], smd = [];
    const DIRS = [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]];
    for (let n = 0; n < 22; n++) {
      let x = Math.round(r() * W / 20) * 20, y = Math.round(r() * H / 20) * 20;
      let dir = [0, 2, 4, 6][Math.floor(r() * 4)];
      const pts = [[x, y]];
      const segs = 3 + Math.floor(r() * 4);
      for (let s = 0; s < segs; s++) {
        const len = (2 + Math.floor(r() * 7)) * 20;
        const [dx, dy] = DIRS[dir];
        x = Math.max(10, Math.min(W - 10, x + dx * len));
        y = Math.max(10, Math.min(H - 10, y + dy * len));
        pts.push([x, y]);
        dir = (dir + (r() < .5 ? 1 : 7)) % 8; // turn 45° left or right
      }
      traces.push({ pts, pulse: r() < .45, rev: r() < .5 });
      pads.push(pts[0], pts[pts.length - 1]);
    }
    for (let n = 0; n < 14; n++) vias.push([r() * W, r() * H]);
    for (let n = 0; n < 6; n++) smd.push([r() * (W - 40), r() * (H - 20), r() < .5]);
    return { W, H, traces, pads, vias, smd };
  }

  function el(tag, attrs) {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  }

  function draw(board, kind) {
    const svg = el("svg", { viewBox: `0 0 ${board.W} ${board.H}`, preserveAspectRatio: "xMidYMid slice", "aria-hidden": "true", focusable: "false" });
    svg.classList.add("circuit-svg");
    const base = el("g", { class: "c-traces" });
    const pulses = el("g", { class: "c-pulses" });
    board.traces.forEach((t) => {
      const path = d(t.rev ? [...t.pts].reverse() : t.pts);
      base.append(el("path", { d: path, class: t.faint ? "c-trace c-faint" : "c-trace" }));
      if (t.pulse && !reduceMotion) {
        // Two layers: a soft wide glow and a bright core, sharing one animation.
        pulses.append(el("path", { d: path, class: "c-pulse c-glow" }), el("path", { d: path, class: "c-pulse c-core" }));
      }
    });
    board.pads.forEach(([x, y]) => base.append(el("circle", { cx: x, cy: y, r: kind === "bg" ? 4.5 : 3.2, class: "c-pad" })));
    board.vias.forEach(([x, y]) => base.append(el("circle", { cx: x, cy: y, r: 3, class: "c-via" })));
    (board.smd || []).forEach(([x, y, vertical]) => {
      const w = vertical ? 8 : 22, h = vertical ? 22 : 8;
      base.append(el("rect", { x, y, width: w, height: h, rx: 1.5, class: "c-smd" }));
    });
    if (board.chip) {
      const c = board.chip, g = el("g", { class: "c-chip" });
      c.pins.forEach((py) => {
        g.append(el("rect", { x: c.x - 9, y: py - 2, width: 10, height: 4, rx: 1, class: "c-pin" }));
        g.append(el("rect", { x: c.x + c.w - 1, y: py - 2, width: 10, height: 4, rx: 1, class: "c-pin" }));
      });
      g.append(el("rect", { x: c.x, y: c.y, width: c.w, height: c.h, rx: 5, class: "c-body" }));
      g.append(el("circle", { cx: c.x + 9, cy: c.y + 9, r: 2.5, class: "c-dot" }));
      const label = el("text", { x: c.x + c.w / 2, y: c.y + c.h / 2 + 4, "text-anchor": "middle", class: "c-label" });
      label.textContent = "KR · ESP32-S3";
      g.append(label);
      base.append(g);
    }
    svg.append(base, pulses);
    return svg;
  }

  // Each pulse gets its own speed and start time from the path length.
  function timePulses(svg, seed) {
    const r = prng(seed * 7 + 1);
    svg.querySelectorAll(".c-core").forEach((core) => {
      const glow = core.previousElementSibling;
      const len = core.getTotalLength();
      const dur = Math.max(2.2, len / (220 + r() * 160));
      const delay = -r() * dur * 2;
      [core, glow].forEach((p) => {
        p.style.setProperty("--len", len.toFixed(0));
        p.style.setProperty("--dur", dur.toFixed(2) + "s");
        p.style.setProperty("--delay", delay.toFixed(2) + "s");
      });
    });
  }

  const cache = new Map();
  const io = "IntersectionObserver" in window
    ? new IntersectionObserver((entries) => entries.forEach((e) => e.target.classList.toggle("is-live", e.isIntersecting)), { rootMargin: "100px" })
    : null;

  function fill(host) {
    if (host.firstElementChild) return;
    const kind = host.dataset.circuit;
    const seed = Number(host.dataset.seed) || 1;
    const key = kind + seed;
    if (!cache.has(key)) cache.set(key, kind === "divider" ? divider(seed) : background(seed));
    const svg = draw(cache.get(key), kind);
    host.append(svg);
    timePulses(svg, seed);
    if (io) io.observe(host); else host.classList.add("is-live");
  }

  // Background layers for sections whose content is re-rendered by app.js:
  // [section id, seed]. Re-inserted after every render.
  const SECTION_BG = [["about", 11], ["featured", 23], ["contact", 37]];

  window.Circuits = {
    mount() {
      document.querySelectorAll("[data-circuit]").forEach(fill);
      SECTION_BG.forEach(([id, seed]) => {
        const sec = document.getElementById(id);
        if (!sec || sec.hidden || sec.querySelector(":scope > .circuit-bg")) return;
        const layer = document.createElement("div");
        layer.className = "circuit-bg";
        layer.dataset.circuit = "bg";
        layer.dataset.seed = seed;
        layer.setAttribute("aria-hidden", "true");
        sec.prepend(layer);
        fill(layer);
      });
    }
  };
})();

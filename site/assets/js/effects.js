// Visual effects: 3D network globe, terminal typing, scroll reveal, card tilt,
// animated counters and scroll progress. Everything respects prefers-reduced-motion.
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  // ---------- 3D network globe ----------
  const Globe = (function () {
    const canvas = document.getElementById("globe");
    if (!canvas || !canvas.getContext) return { layout() {} };
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
      const anchor = document.querySelector(".hero-visual");
      if (anchor && w > 900) {
        const a = anchor.getBoundingClientRect();
        cx = a.left - rect.left + a.width / 2;
        cy = a.top - rect.top + a.height * 0.42;
        R = Math.min(a.width, a.height) * 0.42;
      } else if (anchor) {
        const a = anchor.getBoundingClientRect();
        cx = w / 2; cy = a.top - rect.top + 150; R = Math.min(w * 0.36, 130);
      } else {
        cx = w * 0.5; cy = h * 0.32; R = Math.min(w, h) * 0.42;
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
        ctx.fillStyle = "#ffc2dd";
        ctx.beginPath(); ctx.arc(d.x * w, d.y * h, d.r, 0, 6.283); ctx.fill();
      }

      // soft glow behind the globe
      const g = ctx.createRadialGradient(cx, cy, R * 0.1, cx, cy, R * 1.6);
      g.addColorStop(0, "rgba(236,72,153,0.32)");
      g.addColorStop(0.5, "rgba(190,24,93,0.12)");
      g.addColorStop(1, "rgba(190,24,93,0)");
      ctx.globalAlpha = 1; ctx.fillStyle = g;
      ctx.fillRect(cx - R * 1.6, cy - R * 1.6, R * 3.2, R * 3.2);

      const proj = points.map(project);

      // orbit rings
      ctx.lineWidth = 1;
      for (let k = 0; k < 2; k++) {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(-0.35 + k * 0.7 + rotY * (k ? -0.15 : 0.1));
        ctx.strokeStyle = "rgba(249,168,212," + (0.18 - k * 0.06) + ")";
        ctx.beginPath(); ctx.ellipse(0, 0, R * (1.35 + k * 0.12), R * (0.32 + k * 0.08), 0, 0, 6.283); ctx.stroke();
        const sa = rotY * (k ? -2.2 : 1.6) + k * 2;
        ctx.fillStyle = "#fbcfe8";
        ctx.beginPath(); ctx.arc(Math.cos(sa) * R * (1.35 + k * 0.12), Math.sin(sa) * R * (0.32 + k * 0.08), 2.6, 0, 6.283); ctx.fill();
        ctx.restore();
      }

      // edges
      for (const [i, j] of edges) {
        const a = proj[i], b = proj[j];
        const depth = (a[2] + b[2]) / 2;
        ctx.globalAlpha = Math.max(0.04, 0.12 + depth * 0.3);
        ctx.strokeStyle = "#f9a8d4";
        ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke();
      }

      // nodes
      for (const p of proj) {
        const front = (p[2] + 1) / 2;
        ctx.globalAlpha = 0.25 + front * 0.75;
        ctx.fillStyle = front > 0.55 ? "#ffe4f1" : "#f472b6";
        ctx.beginPath(); ctx.arc(p[0], p[1], 1 + front * 1.8 * p[3], 0, 6.283); ctx.fill();
      }

      // packets
      for (const pk of packets) {
        const a = proj[pk.e[0]], b = proj[pk.e[1]];
        const x = a[0] + (b[0] - a[0]) * pk.t, y = a[1] + (b[1] - a[1]) * pk.t;
        const front = ((a[2] + b[2]) / 2 + 1) / 2;
        ctx.globalAlpha = 0.3 + front * 0.7;
        const pg = ctx.createRadialGradient(x, y, 0, x, y, 7);
        pg.addColorStop(0, "rgba(255,255,255,1)");
        pg.addColorStop(0.35, "rgba(244,114,182,0.9)");
        pg.addColorStop(1, "rgba(244,114,182,0)");
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
      if (running || reduceMotion || !visible || document.hidden) return;
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

    layout();
    start();
    return { layout };
  })();

  // ---------- terminal typing ----------
  let typedOnce = false;
  function typeTerminal() {
    const body = document.querySelector(".t-body");
    if (!body) return;
    const rows = Array.from(body.children);
    if (typedOnce || reduceMotion) return;
    typedOnce = true;

    const steps = rows.map((row) => {
      const isCmd = row.classList.contains("t-cmd");
      const prompt = row.querySelector(".t-prompt");
      const textNode = isCmd ? Array.from(row.childNodes).find((n) => n.nodeType === 3) : null;
      const full = textNode ? textNode.textContent : "";
      if (textNode) textNode.textContent = "";
      row.style.visibility = "hidden";
      return { row, isCmd, textNode, full, prompt };
    });

    let i = 0;
    (function next() {
      if (i >= steps.length || !document.body.contains(body)) return;
      const s = steps[i++];
      s.row.style.visibility = "";
      if (!s.textNode) { setTimeout(next, s.isCmd ? 0 : 220); return; }
      let c = 0;
      const caret = document.createElement("span");
      caret.className = "caret";
      s.row.append(caret);
      (function type() {
        if (!document.body.contains(body)) return;
        s.textNode.textContent = s.full.slice(0, ++c);
        if (c < s.full.length) setTimeout(type, 45 + Math.random() * 55);
        else { caret.remove(); setTimeout(next, 260); }
      })();
    })();
  }

  // ---------- scroll reveal ----------
  const revealer = "IntersectionObserver" in window && !reduceMotion
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
    document.querySelectorAll(".section-head, .about-grid > *, .stat, .reveal").forEach((el) => {
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
    if (reduceMotion) { el.textContent = target + suffix; return; }
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
  if (finePointer && !reduceMotion) {
    let active = null;
    document.addEventListener("pointermove", (e) => {
      const el = e.target.closest && e.target.closest(".tilt");
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

  // ---------- scroll progress + nav shadow ----------
  const bar = document.getElementById("progress");
  function onScroll() {
    const max = document.documentElement.scrollHeight - innerHeight;
    if (bar) bar.style.transform = "scaleX(" + (max > 0 ? scrollY / max : 0) + ")";
    document.body.classList.toggle("scrolled", scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  window.Effects = {
    afterRender() {
      typeTerminal();
      reveal();
      counters();
      Globe.layout();
      onScroll();
    }
  };
})();

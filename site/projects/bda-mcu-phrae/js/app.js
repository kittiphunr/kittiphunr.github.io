/* ทัวร์ 360° หอพุทธศิลป์ — ผูกภาพ 360° เข้าด้วยกันแบบ Street View */
(function () {
  "use strict";

  var TOUR = window.TOUR;
  var ARROW_PITCH = -24; // ลูกศรวางบนพื้น
  var FORWARD_CONE = 50; // องศาที่ถือว่า "อยู่ข้างหน้า" สำหรับปุ่มเดินหน้า
  var EDIT = /[?&]edit=1/.test(location.search);
  var SVG_NS = "http://www.w3.org/2000/svg";

  var $ = function (id) { return document.getElementById(id); };
  var byId = {};
  TOUR.scenes.forEach(function (s) { byId[s.id] = s; });

  /* ---------- คำนวณทิศ ---------- */

  function norm(deg) {
    deg = ((deg + 180) % 360 + 360) % 360 - 180;
    return deg === -180 ? 180 : deg;
  }

  // ทิศบนแผนผัง (0° = ด้านบนของแผนผัง, หมุนตามเข็มนาฬิกา)
  function mapBearing(from, to) {
    if (!from.map || !to.map) return null;
    return Math.atan2(to.map.x - from.map.x, -(to.map.y - from.map.y)) * 180 / Math.PI;
  }

  // แปลงทิศบนแผนผังเป็น yaw ในภาพของ scene และกลับกัน
  // scene.mirror: ภาพที่วางบนแผนผังแบบสะท้อน (ระเบียง) — ทิศในภาพหมุนกลับด้าน
  function bearingToYaw(scene, bearing) {
    var n = scene.northOffset || 0;
    return norm(scene.mirror ? n - bearing : bearing + n);
  }
  function yawToBearing(scene, yaw) {
    var n = scene.northOffset || 0;
    return norm(scene.mirror ? n - yaw : yaw - n);
  }

  /* ---------- สร้างกราฟการเชื่อมต่อ (ลิงก์สองทาง) ---------- */

  var edges = {}; // edges[from][to] = { yaw, pitch }
  TOUR.scenes.forEach(function (s) { edges[s.id] = {}; });

  TOUR.scenes.forEach(function (s) {
    (s.links || []).forEach(function (l) {
      if (!byId[l.to]) { console.warn("ไม่พบจุด", l.to, "ที่ลิงก์จาก", s.id); return; }
      edges[s.id][l.to] = Object.assign({}, edges[s.id][l.to], l);
      if (!l.oneWay && !edges[l.to][s.id]) edges[l.to][s.id] = { to: s.id, auto: true };
    });
  });

  function linkHotspot(from, link) {
    var to = byId[link.to];
    var bearing = mapBearing(from, to);
    var yaw = link.yaw != null ? link.yaw : bearing != null ? bearingToYaw(from, bearing) : 0;
    if (bearing == null) bearing = yawToBearing(from, yaw);
    return {
      type: "scene",
      sceneId: to.id,
      yaw: yaw,
      pitch: link.pitch != null ? link.pitch : ARROW_PITCH,
      // หันหน้าไปทิศเดียวกับที่เดินมา (เหมือน Street View)
      targetYaw: link.targetYaw != null ? link.targetYaw : bearingToYaw(to, bearing),
      targetPitch: 0,
      cssClass: "sv-arrow",
      createTooltipFunc: renderArrow,
      createTooltipArgs: to.title
    };
  }

  function renderArrow(div, title) {
    div.innerHTML =
      '<span class="sv-arrow-shape" aria-hidden="true"></span>' +
      '<span class="sv-arrow-label"></span>';
    div.querySelector(".sv-arrow-label").textContent = title;
    div.setAttribute("role", "button");
    div.setAttribute("aria-label", "ไปยัง " + title);
  }

  function infoHotspot(info) {
    return {
      type: "info",
      yaw: info.yaw,
      pitch: info.pitch || 0,
      cssClass: "sv-info",
      createTooltipFunc: function (div) {
        div.innerHTML = '<span class="sv-info-dot">i</span><span class="sv-info-label"></span>';
        div.querySelector(".sv-info-label").textContent = info.title;
        div.setAttribute("role", "button");
        div.setAttribute("aria-label", info.title);
      },
      clickHandlerFunc: function () { showInfo(info); }
    };
  }

  /* ---------- ตั้งค่า Pannellum ---------- */

  // หันไปทางลิงก์แรกที่ประกาศไว้ใน scene (ทางเดินต่อ) หรือลิงก์ใดก็ได้ถ้าไม่มี
  function defaultYaw(s, hs) {
    var links = hs.filter(function (h) { return h.type === "scene"; });
    var first = s.links && s.links[0] && links.filter(function (h) { return h.sceneId === s.links[0].to; })[0];
    return (first || links[0] || { yaw: 0 }).yaw;
  }

  var scenesCfg = {};
  TOUR.scenes.forEach(function (s) {
    var hs = [];
    Object.keys(edges[s.id]).forEach(function (to) { hs.push(linkHotspot(s, edges[s.id][to])); });
    (s.infos || []).forEach(function (i) { hs.push(infoHotspot(i)); });
    scenesCfg[s.id] = {
      type: "equirectangular",
      panorama: s.image,
      // ค่าเริ่มต้น: หันไปทางลูกศรแรก (เดินต่อได้ทันทีเมื่อกระโดดมาจุดนี้)
      yaw: s.yaw != null ? s.yaw : defaultYaw(s, hs),
      pitch: s.pitch || 0,
      hotSpots: hs
    };
  });

  var startId = decodeURIComponent(location.hash.slice(1));
  if (!byId[startId]) startId = TOUR.firstScene || TOUR.scenes[0].id;

  var viewer = pannellum.viewer("viewer", {
    default: {
      firstScene: startId,
      sceneFadeDuration: 900,
      autoLoad: true,
      hfov: 100,
      minHfov: 40,
      maxHfov: 120,
      showControls: false,
      keyboardZoom: true,
      friction: 0.2,
      strings: {
        loadingLabel: "กำลังโหลดภาพ 360°...",
        loadButtonLabel: "คลิกเพื่อโหลด",
        bylineLabel: "",
        noPanoramaError: "ไม่พบภาพ 360°",
        fileAccessError: "ไม่สามารถเปิดไฟล์ %s ได้ (ให้เปิดผ่านเว็บเซิร์ฟเวอร์ ไม่ใช่ file://)",
        malformedURLError: "ที่อยู่ภาพไม่ถูกต้อง",
        iOS8WebGLError: "อุปกรณ์ไม่รองรับ WebGL",
        genericWebGLError: "เบราว์เซอร์ไม่รองรับ WebGL",
        textureSizeError: "ภาพใหญ่เกินไปสำหรับอุปกรณ์นี้ (กว้าง %s px, รองรับสูงสุด %s px)",
        unknownError: "เกิดข้อผิดพลาด"
      }
    },
    scenes: scenesCfg
  });

  /* ---------- UI ---------- */

  function currentScene() { return byId[viewer.getScene()]; }

  function updateSceneUI() {
    var s = currentScene();
    if (!s) return;
    $("scene-title").textContent = s.title;
    $("scene-desc").textContent = s.description || "";
    document.title = s.title + " · " + TOUR.title;
    if (location.hash.slice(1) !== s.id) history.replaceState(null, "", "#" + encodeURIComponent(s.id));
    Array.prototype.forEach.call(document.querySelectorAll("#scene-items button"), function (b) {
      b.classList.toggle("active", b.dataset.id === s.id);
      b.setAttribute("aria-current", b.dataset.id === s.id ? "true" : "false");
    });
    hideInfo();
    drawMap();
  }

  function goTo(id) {
    var s = currentScene();
    var target = byId[id];
    if (!target || (s && s.id === id)) return;
    var edge = s && edges[s.id][id];
    if (edge) {
      var hs = linkHotspot(s, edge);
      viewer.loadScene(id, 0, hs.targetYaw);
    } else {
      viewer.loadScene(id);
    }
  }

  // หาลิงก์ที่อยู่ใกล้ทิศที่กำลังมองที่สุด
  function forwardLink() {
    var s = currentScene();
    if (!s) return null;
    var yaw = viewer.getYaw();
    var best = null;
    Object.keys(edges[s.id]).forEach(function (to) {
      var d = Math.abs(norm(linkHotspot(s, edges[s.id][to]).yaw - yaw));
      if (d <= FORWARD_CONE && (!best || d < best.d)) best = { to: to, d: d };
    });
    return best && best.to;
  }

  function updateForwardButton() {
    var to = forwardLink();
    var btn = $("btn-forward");
    btn.disabled = !to;
    btn.textContent = to ? "เดินหน้า ▲ " + byId[to].title : "หันไปทางลูกศรเพื่อเดิน";
  }

  $("btn-forward").addEventListener("click", function () {
    var to = forwardLink();
    if (to) goTo(to);
  });

  document.addEventListener("keydown", function (e) {
    if (e.target.closest && e.target.closest("input, textarea")) return;
    if (e.key === "w" || e.key === "W" || e.key === "ไ") {
      var to = forwardLink();
      if (to) goTo(to);
    } else if (e.key === "Escape") {
      hideInfo();
    }
  });

  /* รายการจุดชม */
  var list = $("scene-items");
  TOUR.scenes.forEach(function (s, i) {
    var li = document.createElement("li");
    var b = document.createElement("button");
    b.dataset.id = s.id;
    b.innerHTML = '<span class="num"></span><span class="t"></span>';
    b.querySelector(".num").textContent = i + 1;
    b.querySelector(".t").textContent = s.title;
    b.addEventListener("click", function () {
      goTo(s.id);
      if (window.matchMedia("(max-width: 720px)").matches) togglePanel("scene-list", false);
    });
    li.appendChild(b);
    list.appendChild(li);
  });

  /* กล่องข้อมูล */
  function showInfo(info) {
    $("info-title").textContent = info.title;
    $("info-sub").textContent = info.subtitle || "";
    $("info-text").textContent = info.text || "";
    var link = $("info-link");
    link.hidden = !info.card;
    if (info.card) {
      link.href = info.card;
      $("info-img").src = info.card;
      $("info-img").alt = "ป้ายข้อมูล " + info.title;
    }
    var art = info.artwork && artById[info.artwork];
    var where = art && art.placements.length ? art.placements.map(function (p) {
      return byId["p" + p.pano] ? byId["p" + p.pano].title : "";
    }).filter(function (t, i, a) { return t && a.indexOf(t) === i; }) : [];
    $("info-where").textContent = (where.length ? "พบได้ที่: " + where.join(", ") : "") +
      (info.approx ? " (ตำแหน่ง ⓘ โดยประมาณ)" : "");
    $("info-card").hidden = false;
  }
  function hideInfo() { $("info-card").hidden = true; }

  /* งานศิลปะ */
  var ARTS = TOUR.artworks || [];
  var artById = {};
  ARTS.forEach(function (a) { artById[a.id] = a; });
  var pendingInfo = null;

  function artInfo(a) {
    return { title: a.title, subtitle: a.title_en, card: a.card, artwork: a.id,
             approx: a.placements.some(function (p) { return p.approx; }) };
  }

  // ไปยังภาพ 360° ที่เห็นงานชิ้นนี้ชัดที่สุด หันกล้องไปที่วัตถุ แล้วเปิดข้อมูล
  function openArtwork(a) {
    var p = a.placements[0];
    if (!p) { showInfo(artInfo(a)); return; }
    var id = "p" + p.pano;
    if (viewer.getScene() === id) {
      viewer.lookAt(p.pitch, p.yaw, 70, 800);
      showInfo(artInfo(a));
    } else {
      pendingInfo = artInfo(a);
      viewer.loadScene(id, p.pitch, p.yaw, 70);
    }
  }

  var artList = $("art-items");
  ARTS.forEach(function (a) {
    var li = document.createElement("li");
    var b = document.createElement("button");
    b.innerHTML = '<span class="num"></span><span class="t"><span class="th"></span><small class="en"></small></span>';
    b.querySelector(".num").textContent = a.card_no;
    b.querySelector(".th").textContent = a.title;
    b.querySelector(".en").textContent = a.title_en || "";
    if (!a.placements.length) b.classList.add("no-place");
    b.addEventListener("click", function () {
      openArtwork(a);
      if (window.matchMedia("(max-width: 720px)").matches) togglePanel("art-list", false);
    });
    li.dataset.q = (a.title + " " + (a.title_en || "") + " " + a.card_no).toLowerCase();
    li.appendChild(b);
    artList.appendChild(li);
  });
  $("art-count").textContent = ARTS.length ? "(" + ARTS.length + ")" : "";
  $("art-search").addEventListener("input", function () {
    var q = this.value.trim().toLowerCase();
    Array.prototype.forEach.call(artList.children, function (li) {
      li.hidden = q && li.dataset.q.indexOf(q) < 0;
    });
  });
  if (!ARTS.length) $("btn-art").hidden = true;

  /* แผง */
  function togglePanel(id, show) {
    var el = $(id);
    el.hidden = show == null ? !el.hidden : !show;
  }
  Array.prototype.forEach.call(document.querySelectorAll("[data-close]"), function (b) {
    b.addEventListener("click", function () { togglePanel(b.dataset.close, false); });
  });
  $("btn-list").addEventListener("click", function () { togglePanel("art-list", false); togglePanel("scene-list"); });
  $("btn-art").addEventListener("click", function () { togglePanel("scene-list", false); togglePanel("art-list"); });
  $("btn-map").addEventListener("click", function () { togglePanel("minimap"); });
  if (window.matchMedia("(max-width: 720px)").matches) togglePanel("minimap", false);

  var rotating = false;
  $("btn-rotate").addEventListener("click", function () {
    rotating = !rotating;
    if (rotating) viewer.startAutoRotate(-3); else viewer.stopAutoRotate();
    this.classList.toggle("on", rotating);
  });
  viewer.on("mousedown", function () {
    if (rotating) { rotating = false; $("btn-rotate").classList.remove("on"); }
  });

  $("btn-full").addEventListener("click", function () { viewer.toggleFullscreen(); });

  $("btn-share").addEventListener("click", function () {
    var url = location.href.split("#")[0] + "#" + encodeURIComponent(viewer.getScene());
    var done = function () { toast("คัดลอกลิงก์แล้ว"); };
    if (navigator.clipboard) navigator.clipboard.writeText(url).then(done, function () { prompt("ลิงก์", url); });
    else prompt("ลิงก์", url);
  });

  var toastTimer;
  function toast(msg) {
    var t = $("toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove("show"); }, 1800);
  }

  window.addEventListener("hashchange", function () {
    var id = decodeURIComponent(location.hash.slice(1));
    if (byId[id]) goTo(id);
  });

  /* ---------- แผนผัง ---------- */

  var svg = $("map-svg");
  var cone;

  function el(name, attrs, parent) {
    var n = document.createElementNS(SVG_NS, name);
    Object.keys(attrs).forEach(function (k) { n.setAttribute(k, attrs[k]); });
    if (parent) parent.appendChild(n);
    return n;
  }

  // แปลงพิกัดแผนผังให้พอดีกรอบ (ถ้าไม่มีรูปแผนผัง/ห้อง จะซูมให้พอดีเส้นทาง)
  var mapView = (function () {
    var fp = TOUR.floorPlan || {};
    var pts = TOUR.scenes.filter(function (s) { return s.map; }).map(function (s) { return s.map; });
    (fp.rooms || []).forEach(function (r) {
      pts.push({ x: r.x, y: r.y }, { x: r.x + r.w, y: r.y + r.h });
    });
    if (fp.image || !pts.length) {
      return { x: function (v) { return v; }, y: function (v) { return v; }, h: 100, k: 1 };
    }
    var xs = pts.map(function (p) { return p.x; }), ys = pts.map(function (p) { return p.y; });
    var minX = Math.min.apply(null, xs), minY = Math.min.apply(null, ys);
    var w = Math.max.apply(null, xs) - minX, h = Math.max.apply(null, ys) - minY;
    var pad = Math.max(w, h) * 0.03 + 0.5;
    var k = 100 / (Math.max(w, h * 1.4) + 2 * pad);
    var offX = (100 - w * k) / 2;
    return {
      x: function (v) { return (v - minX) * k + offX; },
      y: function (v) { return (v - minY + pad) * k; },
      h: Math.max(45, (h + 2 * pad) * k),
      k: k
    };
  })();
  svg.setAttribute("viewBox", "0 0 100 " + mapView.h.toFixed(1));
  svg.style.aspectRatio = (100 / mapView.h).toFixed(3);
  var NODE_R = Math.min(2.4, Math.max(1.1, mapView.k * 0.9));

  function drawMap() {
    var cur = viewer.getScene();
    var X = mapView.x, Y = mapView.y;
    svg.innerHTML = "";
    var fp = TOUR.floorPlan || {};
    if (fp.image) {
      el("image", { href: fp.image, x: 0, y: 0, width: 100, height: 100, preserveAspectRatio: "none", opacity: 0.85 }, svg);
    }
    (fp.rooms || []).forEach(function (r) {
      el("rect", { x: X(r.x), y: Y(r.y), width: r.w * mapView.k, height: r.h * mapView.k, rx: 1, class: "room" }, svg);
      var t = el("text", { x: X(r.x) + 1.2, y: Y(r.y + r.h) - 1.2, class: "room-label" }, svg);
      t.textContent = r.label;
    });
    // เส้นทางเดิน
    var drawn = {};
    TOUR.scenes.forEach(function (s) {
      Object.keys(edges[s.id]).forEach(function (to) {
        var key = [s.id, to].sort().join("|");
        if (drawn[key] || !s.map || !byId[to].map) return;
        drawn[key] = true;
        el("line", { x1: X(s.map.x), y1: Y(s.map.y), x2: X(byId[to].map.x), y2: Y(byId[to].map.y), class: "path" }, svg);
      });
    });
    // ลูกศรทิศเหนือ
    if (COMPASS) {
      var na = el("g", { class: "map-north", transform: "translate(95 " + (mapView.h - 6).toFixed(1) + ") rotate(" + (-COMPASS.mapUpAzimuth) + ")" }, svg);
      el("path", { d: "M0 -4 L2 2 L0 1 L-2 2 Z" }, na);
      var nt = el("text", { y: "-5" }, na);
      nt.textContent = "N";
    }
    // กรวยทิศที่มอง
    var c = byId[cur];
    if (c && c.map) {
      cone = el("g", { class: "cone" }, svg);
      el("path", { d: "M0 0 L-6 -11 A12.5 12.5 0 0 1 6 -11 Z" }, cone);
      updateCone();
    }
    // จุดชม
    TOUR.scenes.forEach(function (s) {
      if (!s.map) return;
      var g = el("g", { class: "node" + (s.id === cur ? " current" : ""), tabindex: 0, role: "button" }, svg);
      el("circle", { cx: X(s.map.x), cy: Y(s.map.y), r: s.id === cur ? NODE_R * 1.5 : NODE_R }, g);
      var title = el("title", {}, g);
      title.textContent = s.title;
      g.addEventListener("click", function () { goTo(s.id); });
      g.addEventListener("keydown", function (e) { if (e.key === "Enter") goTo(s.id); });
    });
  }

  /* ---------- เข็มทิศ ---------- */

  var COMPASS = TOUR.compass;
  var DIRS = ["เหนือ", "ตะวันออกเฉียงเหนือ", "ตะวันออก", "ตะวันออกเฉียงใต้",
              "ใต้", "ตะวันตกเฉียงใต้", "ตะวันตก", "ตะวันตกเฉียงเหนือ"];
  var DIRS_EN = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

  // มุมทิศจริงของทิศที่กำลังมอง (0 = เหนือ, ตามเข็มนาฬิกา)
  function azimuth(s, yaw) {
    return ((yawToBearing(s, yaw) + COMPASS.mapUpAzimuth) % 360 + 360) % 360;
  }

  function updateCompass() {
    var s = currentScene();
    if (!COMPASS || !s) return;
    var a = azimuth(s, viewer.getYaw());
    var i = Math.round(a / 45) % 8;
    $("compass-rose").setAttribute("transform", "rotate(" + (-a).toFixed(1) + ")");
    $("compass-text").textContent = DIRS_EN[i] + " " + Math.round(a) + "° · " + DIRS[i];
  }

  if (COMPASS) {
    $("compass").hidden = false;
    $("compass").addEventListener("click", function () {
      var s = currentScene();
      if (s) viewer.setYaw(bearingToYaw(s, -COMPASS.mapUpAzimuth), 800);
    });
  }

  function updateCone() {
    var s = currentScene();
    if (!cone || !s || !s.map) return;
    var heading = yawToBearing(s, viewer.getYaw());
    cone.setAttribute("transform", "translate(" + mapView.x(s.map.x) + " " + mapView.y(s.map.y) + ") rotate(" + heading + ")");
  }

  /* ---------- โหมดแก้ไข (?edit=1) ช่วยหาค่า yaw / pitch ---------- */

  if (EDIT) {
    var hud = $("edit-hud");
    hud.hidden = false;
    viewer.on("mouseup", function (e) {
      var c = viewer.mouseEventToCoords(e);
      var snippet = "{ yaw: " + c[1].toFixed(1) + ", pitch: " + c[0].toFixed(1) + " }";
      console.log(viewer.getScene(), snippet);
      hud.dataset.click = snippet;
    });
  }

  function editHud() {
    if (!EDIT) return;
    var hud = $("edit-hud");
    hud.textContent =
      "โหมดแก้ไข · scene: " + viewer.getScene() +
      "\nกึ่งกลางจอ  yaw: " + viewer.getYaw().toFixed(1) + "  pitch: " + viewer.getPitch().toFixed(1) +
      "\n(ตั้ง northOffset = yaw ที่หันไปด้านบนแผนผัง)" +
      "\nคลิกล่าสุด: " + (hud.dataset.click || "-");
  }

  /* ---------- วนอัปเดต ---------- */

  var lastYaw = null;
  (function tick() {
    if (viewer.isLoaded && viewer.isLoaded()) {
      var y = viewer.getYaw();
      if (y !== lastYaw) {
        lastYaw = y;
        updateCone();
        updateCompass();
        updateForwardButton();
        editHud();
      }
    }
    requestAnimationFrame(tick);
  })();

  viewer.on("scenechange", function () { lastYaw = null; updateSceneUI(); });
  viewer.on("load", function () {
    lastYaw = null;
    updateSceneUI();
    if (pendingInfo) { showInfo(pendingInfo); pendingInfo = null; }
  });

  // ให้โมเดล 3 มิติ (js/model3d.js) สั่งเดินไปยังจุด / เปิดงานศิลปะได้
  window.TourApp = { goTo: goTo, openArtwork: openArtwork, currentScene: currentScene, compass: COMPASS };

  /* ---------- หน้าโหลด (preloader) ---------- */

  var preloader = $("preloader");
  function hidePreloader() {
    if (!preloader || preloader.classList.contains("done")) return;
    $("preloader-fill").style.width = "100%";
    preloader.classList.add("done");
    setTimeout(function () { preloader.hidden = true; }, 700);
  }
  // คัดลอกความคืบหน้าจากแถบโหลดของ Pannellum มาแสดงในหน้าโหลด
  (function progress() {
    if (!preloader || preloader.classList.contains("done")) return;
    var fill = document.querySelector("#viewer .pnlm-lbar-fill");
    if (fill && fill.style.width) $("preloader-fill").style.width = fill.style.width;
    setTimeout(progress, 150);
  })();
  viewer.on("load", hidePreloader);
  viewer.on("error", function () {
    $("preloader-status").textContent = "โหลดภาพไม่สำเร็จ";
    setTimeout(hidePreloader, 1200);
  });
  setTimeout(hidePreloader, 25000);   // กันค้าง

  /* ---------- หน้าต้อนรับ ---------- */

  $("tour-title").textContent = TOUR.title;
  $("intro-title").textContent = TOUR.title;
  $("intro-sub").textContent = TOUR.subtitle || "";
  $("btn-start").addEventListener("click", function () {
    $("intro").classList.add("gone");
    setTimeout(function () { $("intro").hidden = true; }, 600);
  });
  if (location.hash.length > 1 || EDIT) $("intro").hidden = true;

  updateSceneUI();
})();

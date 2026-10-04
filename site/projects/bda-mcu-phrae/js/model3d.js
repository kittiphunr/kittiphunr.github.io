/* โมเดล 3 มิติแบบ "บ้านตุ๊กตา" (dollhouse) ของหอพุทธศิลป์
 *
 * - รูปทรงห้อง (ผนัง, ความสูงเพดาน) วัดจากภาพ 360° — ดู tools/geometry.py
 * - พื้นผิวพื้น/ผนัง ฉายภาพ 360° จริงจากจุดถ่ายที่ใกล้ที่สุดสองจุด (ผสมตามระยะ)
 * - ผนังที่อยู่ระหว่างกล้องกับห้องจะซ่อนอัตโนมัติ มองเห็นภายในได้จากทุกมุม
 * - คลิกวงกลมบนพื้นเพื่อเข้าชมจุดนั้น, คลิกเพชรสีทองเพื่อเปิดข้อมูลงานศิลปะ
 * หน่วยความยาว = ความสูงกล้อง (h)
 */
const T = window.TOUR;
const M = T.model;
const $ = (id) => document.getElementById(id);

let THREE, OrbitControls;
let renderer, scene, camera, controls, raycaster, pointer;
let walls = [], pins = [], gems = [], ready = false, running = false, fitted = false, fitInfo;
const S = M ? M.scale : 1;

function w(x, y) { return [x * S, y * S]; }      // พิกัดแผนผัง → พิกัดพื้น (X, Z)

/* ---------- พื้นผิวจากภาพ 360° ---------- */

function projectedMaterial(atlas, roomIndex) {
  const cams = T.scenes.filter((s) => M.atlas.cells[s.id]);
  const n = cams.length;
  const camPos = [], camNorth = [], camCell = [], camRoom = [], camMirror = [];
  cams.forEach((s) => {
    const [x, z] = w(s.map.x, s.map.y);
    camPos.push(new THREE.Vector3(x, 1, z));
    camNorth.push(s.northOffset);
    camCell.push(new THREE.Vector2(...M.atlas.cells[s.id]));
    camRoom.push(roomOf(s));
    camMirror.push(s.mirror ? 1 : 0);
  });
  return new THREE.ShaderMaterial({
    uniforms: {
      atlas: { value: atlas },
      camPos: { value: camPos }, camNorth: { value: camNorth },
      camCell: { value: camCell }, camRoom: { value: camRoom }, camMirror: { value: camMirror },
      room: { value: roomIndex },
      grid: { value: new THREE.Vector2(M.atlas.cols, M.atlas.rows) },
      dim: { value: 1.0 },
    },
    vertexShader: `
      varying vec3 vW;
      void main() {
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vW = wp.xyz;
        gl_Position = projectionMatrix * viewMatrix * wp;
      }`,
    fragmentShader: `
      #define N ${n}
      uniform sampler2D atlas;
      uniform vec3 camPos[N];
      uniform float camNorth[N];
      uniform vec2 camCell[N];
      uniform float camRoom[N];
      uniform float camMirror[N];
      uniform float room;
      uniform vec2 grid;
      uniform float dim;
      varying vec3 vW;
      vec3 sampleCam(int i) {
        vec3 d = vW - camPos[i];
        float b = degrees(atan(d.x, -d.z));
        float yaw = camMirror[i] > 0.5 ? camNorth[i] - b : b + camNorth[i];
        float pitch = degrees(atan(d.y, length(d.xz)));
        float u = fract((yaw + 180.0) / 360.0);
        float v = clamp((90.0 - pitch) / 180.0, 0.002, 0.998);
        vec2 uv = vec2((camCell[i].x + u) / grid.x, 1.0 - (camCell[i].y + v) / grid.y);
        return texture2D(atlas, uv).rgb;
      }
      void main() {
        int b1 = -1; int b2 = -1; float d1 = 1e9; float d2 = 1e9;
        for (int i = 0; i < N; i++) {
          if (abs(camRoom[i] - room) > 0.5) continue;
          float d = length(vW.xz - camPos[i].xz);
          if (d < d1) { d2 = d1; b2 = b1; d1 = d; b1 = i; }
          else if (d < d2) { d2 = d; b2 = i; }
        }
        vec3 c = sampleCam(b1);
        if (b2 >= 0) {
          float w1 = 1.0 / (d1 * d1 + 0.05), w2 = 1.0 / (d2 * d2 + 0.05);
          c = mix(c, sampleCam(b2), w2 / (w1 + w2));
        }
        gl_FragColor = vec4(c * dim, 1.0);
      }`,
    side: THREE.DoubleSide,
  });
}

function roomOf(s) {
  // ห้องของจุดถ่าย: อยู่ในกรอบห้องไหน (ระเบียงก่อน เพราะกรอบติดกัน)
  const order = [1, 0];
  for (const i of order) {
    const r = M.rooms[i];
    if (s.map.x >= r.x && s.map.x <= r.x + r.w && s.map.y >= r.y && s.map.y <= r.y + r.h) return i;
  }
  return 0;
}

/* ---------- สร้างห้อง ---------- */

function addRoom(r, index, atlas) {
  const mat = projectedMaterial(atlas, index);
  const [x0, z0] = w(r.x, r.y), [x1, z1] = w(r.x + r.w, r.y + r.h);
  const H = M.height;
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(x1 - x0, z1 - z0), mat);
  floor.rotation.x = -Math.PI / 2;
  floor.position.set((x0 + x1) / 2, 0, (z0 + z1) / 2);
  scene.add(floor);

  // ผนัง: [ชื่อ, จุดกึ่งกลาง, ความยาว, มุมหมุน, เวกเตอร์ชี้เข้าห้อง, ความสูง]
  const corridor = r.kind === "corridor";
  const spec = [
    ["top", [(x0 + x1) / 2, z0], x1 - x0, 0, [0, 1], corridor ? M.railHeight : H],
    ["bottom", [(x0 + x1) / 2, z1 - (corridor ? 0.02 : 0)], x1 - x0, 0, [0, -1], H],
    ["left", [x0, (z0 + z1) / 2], z1 - z0, Math.PI / 2, [1, 0], corridor ? 0 : H],
    ["right", [x1, (z0 + z1) / 2], z1 - z0, Math.PI / 2, [-1, 0], corridor ? 0 : H],
  ];
  spec.forEach(([name, [cx, cz], len, rot, inward, h]) => {
    if (!h) return;
    const m = new THREE.Mesh(new THREE.PlaneGeometry(len, h), mat);
    m.position.set(cx, h / 2, cz);
    m.rotation.y = rot;
    m.userData = { inward: new THREE.Vector2(...inward), point: new THREE.Vector2(cx, cz) };
    scene.add(m);
    walls.push(m);
  });

  // เส้นขอบห้องสีทอง
  const edge = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.BoxGeometry(x1 - x0, 0.001, z1 - z0)),
    new THREE.LineBasicMaterial({ color: 0xd4af37 }));
  edge.position.set((x0 + x1) / 2, 0.01, (z0 + z1) / 2);
  scene.add(edge);
}

/* ---------- หมุดจุดชม / งานศิลปะ ---------- */

function addPins() {
  const geo = new THREE.CylinderGeometry(0.13, 0.13, 0.04, 32);
  T.scenes.forEach((s) => {
    const [x, z] = w(s.map.x, s.map.y);
    const pin = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: 0xf1d98a }));
    pin.position.set(x, 0.04, z);
    pin.userData = { scene: s };
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.16, 0.21, 32),
      new THREE.MeshBasicMaterial({ color: 0x6b1d1d, side: THREE.DoubleSide }));
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = -0.015;
    pin.add(ring);
    scene.add(pin);
    pins.push(pin);
  });
}

// ยิงรังสีจากกล้อง (yaw, pitch) ไปชนผนัง/พื้น/เพดานของห้อง → ตำแหน่งวัตถุโดยประมาณ
function hitRoom(s, yaw, pitch) {
  const r = M.rooms[roomOf(s)];
  const [x0, z0] = w(r.x, r.y), [x1, z1] = w(r.x + r.w, r.y + r.h);
  const [cx, cz] = w(s.map.x, s.map.y);
  const b = THREE.MathUtils.degToRad(s.mirror ? s.northOffset - yaw : yaw - s.northOffset), p = THREE.MathUtils.degToRad(pitch);
  const d = new THREE.Vector3(Math.cos(p) * Math.sin(b), Math.sin(p), -Math.cos(p) * Math.cos(b));
  const o = new THREE.Vector3(cx, 1, cz);
  let t = Infinity;
  const planes = [[0, x0], [0, x1], [2, z0], [2, z1], [1, 0], [1, M.height]];
  planes.forEach(([axis, v]) => {
    const dc = d.getComponent(axis);
    if (Math.abs(dc) < 1e-6) return;
    const tt = (v - o.getComponent(axis)) / dc;
    if (tt > 0.05 && tt < t) t = tt;
  });
  return o.add(d.multiplyScalar(Math.max(0.3, t - 0.08)));
}

function addArtworks() {
  const geo = new THREE.OctahedronGeometry(0.09);
  const mat = new THREE.MeshBasicMaterial({ color: 0xd4af37 });
  (T.artworks || []).forEach((a) => {
    const p = a.placements[0];
    const s = p && T.scenes.find((x) => x.id === "p" + p.pano);
    if (!s) return;
    const gem = new THREE.Mesh(geo, mat.clone());
    gem.position.copy(hitRoom(s, p.yaw, p.pitch));
    gem.userData = { art: a };
    scene.add(gem);
    gems.push(gem);
  });
}

// ลูกศรทิศเหนือบนพื้น ข้างมุมห้อง (ตามเข็มทิศใน data/tour.js)
function addNorth() {
  const C = T.compass;
  if (!C) return;
  const r = M.rooms[0];
  const [x0, z0] = w(r.x, r.y), [, z1] = w(r.x + r.w, r.y + r.h);
  const shape = new THREE.Shape();
  shape.moveTo(0, 0.9); shape.lineTo(0.35, -0.5); shape.lineTo(0, -0.25); shape.lineTo(-0.35, -0.5); shape.closePath();
  const arrow = new THREE.Mesh(new THREE.ShapeGeometry(shape),
    new THREE.MeshBasicMaterial({ color: 0xff6b5b, side: THREE.DoubleSide }));
  arrow.rotation.x = -Math.PI / 2;                                  // วางราบบนพื้น ปลายชี้ −Z (ด้านบนแผนผัง)
  const g = new THREE.Group();
  g.add(arrow);
  g.rotation.y = THREE.MathUtils.degToRad(C.mapUpAzimuth);          // ทิศเหนืออยู่ที่ bearing −mapUpAzimuth
  g.position.set(x0 - 1.4, 0.02, (z0 + z1) / 2);
  scene.add(g);
}

/* ---------- เริ่ม / วนวาด ---------- */

async function build() {
  THREE = await import("three");
  ({ OrbitControls } = await import("../vendor/three/OrbitControls.js"));
  const box = $("model3d-canvas");
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
  box.appendChild(renderer.domElement);
  scene = new THREE.Scene();
  const bg = () => (window.i18n && window.i18n.currentTheme() === "light" ? 0xe9dfcb : 0x120b07);
  scene.background = new THREE.Color(bg());
  document.addEventListener("themechange", () => scene.background.set(bg()));
  camera = new THREE.PerspectiveCamera(45, 1, 0.05, 200);

  const atlas = await new THREE.TextureLoader().loadAsync(M.atlas.image);
  atlas.generateMipmaps = false;           // กันเส้นรอยต่อที่ขอบภาพ 360°
  atlas.minFilter = THREE.LinearFilter;
  atlas.colorSpace = THREE.SRGBColorSpace;
  M.rooms.forEach((r, i) => addRoom(r, i, atlas));
  addPins();
  addArtworks();
  addNorth();

  // มองจากมุมเฉียงด้านบน ให้เห็นทั้งอาคาร
  const all = new THREE.Box3();
  M.rooms.forEach((r) => {
    const [x0, z0] = w(r.x, r.y), [x1, z1] = w(r.x + r.w, r.y + r.h);
    all.expandByPoint(new THREE.Vector3(x0, 0, z0)).expandByPoint(new THREE.Vector3(x1, M.height, z1));
  });
  const c = all.getCenter(new THREE.Vector3()), size = all.getSize(new THREE.Vector3());
  controls = new OrbitControls(camera, renderer.domElement);
  controls.target.copy(c);
  controls.enableDamping = true;
  controls.maxPolarAngle = THREE.MathUtils.degToRad(84);
  controls.minDistance = 2;
  controls.maxDistance = Math.max(size.x, size.z) * 2.5;
  fitInfo = { c: c, size: size };

  raycaster = new THREE.Raycaster();
  pointer = new THREE.Vector2();
  renderer.domElement.addEventListener("pointermove", onMove);
  renderer.domElement.addEventListener("click", onClick);
  window.addEventListener("resize", resize);
  ready = true;
}

// วางกล้องมุมเฉียงด้านบน ระยะพอให้เห็นทั้งอาคารตามสัดส่วนจอ
function fit() {
  const { c, size } = fitInfo;
  const vfov = THREE.MathUtils.degToRad(camera.fov);
  const hfov = 2 * Math.atan(Math.tan(vfov / 2) * camera.aspect);
  const r = Math.hypot(size.x, size.z) / 2;
  const dist = Math.max(r / Math.sin(Math.min(hfov, vfov) / 2), 6);
  // จอแนวนอน: มองจากด้านยาวของห้อง / จอแนวตั้ง: มองตามแนวยาวของห้อง
  const dir = camera.aspect >= 1 ? new THREE.Vector3(-0.15, 0.75, 1) : new THREE.Vector3(1, 1.15, 0.3);
  dir.normalize();
  camera.position.copy(c).addScaledVector(dir, dist * (camera.aspect >= 1 ? 0.92 : 0.75));
  controls.update();
}

function resize() {
  if (!renderer) return;
  const box = $("model3d-canvas");
  renderer.setSize(box.clientWidth, box.clientHeight);
  camera.aspect = box.clientWidth / Math.max(1, box.clientHeight);
  camera.updateProjectionMatrix();
}

function pick(e) {
  const r = renderer.domElement.getBoundingClientRect();
  pointer.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
  raycaster.setFromCamera(pointer, camera);
  const hit = raycaster.intersectObjects([...gems, ...pins], false)[0];
  return hit && hit.object;
}

function onMove(e) {
  const o = pick(e);
  const tip = $("model3d-tip");
  renderer.domElement.style.cursor = o ? "pointer" : "";
  if (!o) { tip.hidden = true; return; }
  tip.textContent = o.userData.art ? "❖ " + o.userData.art.title : o.userData.scene.title;
  tip.style.left = e.clientX + 14 + "px";
  tip.style.top = e.clientY + 10 + "px";
  tip.hidden = false;
}

function onClick(e) {
  const o = pick(e);
  if (!o) return;
  close();
  if (o.userData.art) window.TourApp.openArtwork(o.userData.art);
  else window.TourApp.goTo(o.userData.scene.id);
}

function loop() {
  if (!running) return;
  // ซ่อนผนังที่อยู่ระหว่างกล้องกับห้อง (มองจากด้านนอกของผนังนั้น)
  const cam = new THREE.Vector2(camera.position.x, camera.position.z);
  walls.forEach((m) => {
    const { inward, point } = m.userData;
    m.visible = cam.clone().sub(point).dot(inward) > 0 || camera.position.y > M.height * 9;
  });
  const cur = window.TourApp.currentScene();
  pins.forEach((p) => {
    const on = cur && p.userData.scene.id === cur.id;
    p.material.color.set(on ? 0xffffff : 0xf1d98a);
    p.scale.setScalar(on ? 1.35 : 1);
  });
  gems.forEach((g) => { g.rotation.y += 0.02; });
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(loop);
}

async function open() {
  $("model3d").hidden = false;
  if (!ready) {
    $("model3d-status").hidden = false;
    try { await build(); } catch (err) {
      console.error(err);
      $("model3d-status").textContent = window.i18n.t("m3dFail");
      return;
    }
    $("model3d-status").hidden = true;
  }
  resize();
  if (!fitted) { fit(); fitted = true; }
  running = true;
  loop();
}

function close() {
  running = false;
  $("model3d").hidden = true;
  $("model3d-tip").hidden = true;
}

if (M && M.atlas) {
  $("btn-3d").hidden = false;
  $("btn-3d").addEventListener("click", open);
  $("model3d-close").addEventListener("click", close);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !$("model3d").hidden) close(); });
}

/* ภาษาและโหมดสีของทัวร์ (โหลดใน <head> ก่อนสคริปต์อื่น)
 *
 * ภาษา: ?lang=en|ja|zh|th > ค่าที่เลือกไว้ (localStorage) > ภาษาของเบราว์เซอร์ > ไทย
 * ข้อความในหน้า: ใส่ data-i18n="key" (ข้อความ) / data-i18n-html="key" (มีแท็ก)
 *               / data-i18n-attr="title:key;aria-label:key2"
 * ข้อมูลทัวร์ (ชื่อโซน งานศิลปะ): data/translations.js
 * โหมดสี: data-theme="light|dark" บน <html> ("auto" = ตามเครื่อง)
 */
(function () {
  "use strict";

  var LANGS = [
    { code: "th", label: "ไทย", locale: "th-TH" },
    { code: "en", label: "English", locale: "en-GB" },
    { code: "ja", label: "日本語", locale: "ja-JP" },
    { code: "zh", label: "中文", locale: "zh-CN" }
  ];

  var UI = {
    th: {
      tourName: "หอพุทธศิลป์",
      org: "มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย วิทยาเขตแพร่",
      logoAlt: "ตราสัญลักษณ์มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย",
      loading: "กำลังโหลดภาพ 360°…",
      loadFailed: "โหลดภาพไม่สำเร็จ",
      viewer: "ภาพ 360 องศา",
      tools: "เครื่องมือ",
      about: "ข้อมูลโครงการและผู้พัฒนา",
      settings: "ภาษาและโหมดสี",
      model3d: "โมเดล 3 มิติของห้อง",
      artworks: "งานศิลปะทั้งหมด",
      scenes: "รายการจุดชม",
      map: "แผนผัง",
      mapLabel: "แผนผังอาคาร",
      rotate: "หมุนอัตโนมัติ",
      share: "คัดลอกลิงก์จุดนี้",
      fullscreen: "เต็มจอ",
      compass: "เข็มทิศ — คลิกเพื่อหันไปทางทิศเหนือ",
      close: "ปิด",
      allScenes: "จุดชมทั้งหมด",
      artTitle: "งานศิลปะ",
      artSearch: "ค้นหา เช่น พระพุทธรูป, ตุง, ขันหมาก",
      artSearchLabel: "ค้นหางานศิลปะ",
      forward: "เดินหน้า ▲",
      forwardTitle: "เดินไปข้างหน้า (W)",
      faceArrow: "หันไปทางลูกศรเพื่อเดิน",
      goTo: "ไปยัง {name}",
      cardAlt: "ป้ายข้อมูล {name}",
      foundAt: "พบได้ที่: {places}",
      approx: "(ตำแหน่ง ⓘ โดยประมาณ)",
      pieces: "({n} ชิ้น)",
      copied: "คัดลอกลิงก์แล้ว",
      link: "ลิงก์",
      help1: "ลากเมาส์ / นิ้ว เพื่อมองรอบ ๆ",
      help2: "คลิก <b>ลูกศรบนพื้น</b> เพื่อเดินไปยังจุดถัดไป",
      help3: "คลิก <b>ⓘ</b> ที่วัตถุ หรือปุ่ม ❖ เพื่ออ่านข้อมูลงานศิลปะ",
      help4: "คลิกจุดบน <b>แผนผัง</b> หรือ ☰ เพื่อไปยังจุดที่ต้องการ",
      start: "เริ่มชมนิทรรศการ",
      devBy: "พัฒนาโดย {name}",
      moreInfo: "ข้อมูลเพิ่มเติม",
      m3dTitle: "โมเดล 3 มิติ หอพุทธศิลป์",
      m3dHelp: "ลากเพื่อหมุน · เลื่อน/บีบเพื่อซูม · คลิก <span class=\"dot\"></span> เพื่อเข้าชมจุดนั้น · คลิก <span class=\"gem\">◆</span> เพื่ออ่านข้อมูลงานศิลปะ",
      m3dClose: "ปิดโมเดล 3 มิติ",
      m3dNote: "แบบจำลองโดยประมาณ สร้างจากภาพ 360° และขนาดห้องที่วัดจากภาพ",
      m3dLoading: "กำลังสร้างโมเดล 3 มิติ…",
      m3dFail: "เปิดโมเดล 3 มิติไม่ได้ (เบราว์เซอร์ต้องรองรับ WebGL 2)",
      aboutTitle: "เกี่ยวกับ หอพุทธศิลป์เสมือนจริง",
      aboutSub: "พิพิธภัณฑ์เสมือนจริง 360° · มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย วิทยาเขตแพร่",
      developer: "ผู้พัฒนา",
      devName: "นายกิตติพันธ์ รัตนคร",
      devRole: "นักวิชาการคอมพิวเตอร์",
      email: "อีเมล",
      phone: "โทร",
      website: "เว็บไซต์",
      project: "เกี่ยวกับโครงการ",
      projectText: "เว็บไซต์นำชมหอพุทธศิลป์ด้วยภาพ 360° เดินชมได้แบบ Street View พร้อมแผนผัง เข็มทิศ โมเดล 3 มิติของห้อง และข้อมูลงานศิลปะ",
      credit1: "ภาพ 360° และป้ายข้อมูลงานศิลปะ: หอพุทธศิลป์ มจร วิทยาเขตแพร่",
      credit2: "แสดงภาพ 360°:",
      credit3: "โมเดล 3 มิติ:",
      howto: "วิธีใช้งาน",
      howto1: "ลากเมาส์หรือนิ้วเพื่อมองรอบ ๆ · คลิกลูกศรบนพื้นหรือกด <b>W</b> เพื่อเดิน",
      howto2: "<b>ⓘ</b> / <b>❖</b> ข้อมูลงานศิลปะ · <b>☰</b> รายการจุดชม · <b>◎</b> แผนผัง · <b>3D</b> โมเดล 3 มิติ",
      howto3: "คลิกเข็มทิศเพื่อหันไปทางทิศเหนือ · <b>⚙</b> เปลี่ยนภาษาและโหมดสี",
      cardNote: "ป้ายข้อมูลเป็นภาษาไทย",
      language: "ภาษา",
      theme: "โหมดสี",
      themeAuto: "ตามเครื่อง",
      themeLight: "สว่าง",
      themeDark: "มืด",
      dirs: ["เหนือ", "ตะวันออกเฉียงเหนือ", "ตะวันออก", "ตะวันออกเฉียงใต้", "ใต้", "ตะวันตกเฉียงใต้", "ตะวันตก", "ตะวันตกเฉียงเหนือ"],
      pnlm: {
        loadingLabel: "กำลังโหลดภาพ 360°...", loadButtonLabel: "คลิกเพื่อโหลด",
        noPanoramaError: "ไม่พบภาพ 360°",
        fileAccessError: "ไม่สามารถเปิดไฟล์ %s ได้ (ให้เปิดผ่านเว็บเซิร์ฟเวอร์ ไม่ใช่ file://)",
        malformedURLError: "ที่อยู่ภาพไม่ถูกต้อง", iOS8WebGLError: "อุปกรณ์ไม่รองรับ WebGL",
        genericWebGLError: "เบราว์เซอร์ไม่รองรับ WebGL",
        textureSizeError: "ภาพใหญ่เกินไปสำหรับอุปกรณ์นี้ (กว้าง %s px, รองรับสูงสุด %s px)",
        unknownError: "เกิดข้อผิดพลาด"
      }
    },
    en: {
      tourName: "Buddhist Art Gallery",
      org: "Mahachulalongkornrajavidyalaya University, Phrae Campus",
      logoAlt: "Emblem of Mahachulalongkornrajavidyalaya University",
      loading: "Loading 360° image…",
      loadFailed: "Could not load the image",
      viewer: "360° panorama",
      tools: "Tools",
      about: "About the project and developer",
      settings: "Language and theme",
      model3d: "3D model of the gallery",
      artworks: "All artworks",
      scenes: "Viewpoints",
      map: "Floor plan",
      mapLabel: "Floor plan",
      rotate: "Auto-rotate",
      share: "Copy link to this view",
      fullscreen: "Full screen",
      compass: "Compass — click to face north",
      close: "Close",
      allScenes: "All viewpoints",
      artTitle: "Artworks",
      artSearch: "Search, e.g. Buddha, tung, lacquer",
      artSearchLabel: "Search artworks",
      forward: "Forward ▲",
      forwardTitle: "Walk forward (W)",
      faceArrow: "Turn towards an arrow to walk",
      goTo: "Go to {name}",
      cardAlt: "Information card: {name}",
      foundAt: "Found at: {places}",
      approx: "(ⓘ position is approximate)",
      pieces: "({n} items)",
      copied: "Link copied",
      link: "Link",
      help1: "Drag with the mouse or a finger to look around",
      help2: "Click the <b>arrows on the floor</b> to walk to the next point",
      help3: "Click <b>ⓘ</b> on an object, or ❖, to read about the artworks",
      help4: "Click a point on the <b>floor plan</b> or ☰ to jump anywhere",
      start: "Start the tour",
      devBy: "Developed by {name}",
      moreInfo: "More information",
      m3dTitle: "3D model · Buddhist Art Gallery",
      m3dHelp: "Drag to rotate · scroll/pinch to zoom · click <span class=\"dot\"></span> to visit a viewpoint · click <span class=\"gem\">◆</span> to read about an artwork",
      m3dClose: "Close the 3D model",
      m3dNote: "Approximate model built from the 360° images and room sizes measured in them",
      m3dLoading: "Building the 3D model…",
      m3dFail: "Could not open the 3D model (WebGL 2 is required)",
      aboutTitle: "About the Virtual Buddhist Art Gallery",
      aboutSub: "360° virtual museum · Mahachulalongkornrajavidyalaya University, Phrae Campus",
      developer: "Developer",
      devName: "Mr. Kittiphun Ruttanakorn",
      devRole: "Computer Technical Officer",
      email: "Email",
      phone: "Phone",
      website: "Website",
      project: "About the project",
      projectText: "A guided tour of the Buddhist Art Gallery in 360° images, walkable like Street View, with a floor plan, compass, 3D model of the rooms and information on the artworks",
      credit1: "360° images and artwork information cards: Buddhist Art Gallery, MCU Phrae Campus",
      credit2: "360° viewer:",
      credit3: "3D model:",
      howto: "How to use",
      howto1: "Drag with the mouse or a finger to look around · click a floor arrow or press <b>W</b> to walk",
      howto2: "<b>ⓘ</b> / <b>❖</b> artworks · <b>☰</b> viewpoints · <b>◎</b> floor plan · <b>3D</b> 3D model",
      howto3: "Click the compass to face north · <b>⚙</b> change language and theme",
      cardNote: "The information card is in Thai",
      language: "Language",
      theme: "Theme",
      themeAuto: "System",
      themeLight: "Light",
      themeDark: "Dark",
      dirs: ["North", "North-east", "East", "South-east", "South", "South-west", "West", "North-west"],
      pnlm: {
        loadingLabel: "Loading 360° image...", loadButtonLabel: "Click to load",
        noPanoramaError: "No 360° image found",
        fileAccessError: "Cannot open %s (open the site through a web server, not file://)",
        malformedURLError: "Invalid image address", iOS8WebGLError: "This device does not support WebGL",
        genericWebGLError: "This browser does not support WebGL",
        textureSizeError: "The image is too large for this device (%s px wide, maximum %s px)",
        unknownError: "Something went wrong"
      }
    },
    ja: {
      tourName: "仏教美術館",
      org: "マハーチュラーロンコーンラーチャウィッタヤーライ大学 プレー校",
      logoAlt: "マハーチュラーロンコーンラーチャウィッタヤーライ大学の紋章",
      loading: "360°画像を読み込み中…",
      loadFailed: "画像を読み込めませんでした",
      viewer: "360°パノラマ",
      tools: "ツール",
      about: "プロジェクトと開発者について",
      settings: "言語と表示モード",
      model3d: "展示室の3Dモデル",
      artworks: "すべての美術品",
      scenes: "見学ポイント一覧",
      map: "見取り図",
      mapLabel: "建物の見取り図",
      rotate: "自動回転",
      share: "この場所のリンクをコピー",
      fullscreen: "全画面",
      compass: "方位磁針 — クリックで北を向く",
      close: "閉じる",
      allScenes: "すべての見学ポイント",
      artTitle: "美術品",
      artSearch: "検索（例：仏像、トゥン、漆器）",
      artSearchLabel: "美術品を検索",
      forward: "前へ ▲",
      forwardTitle: "前へ進む（W）",
      faceArrow: "矢印の方を向くと進めます",
      goTo: "{name} へ移動",
      cardAlt: "解説パネル：{name}",
      foundAt: "見られる場所：{places}",
      approx: "（ⓘの位置はおおよそです）",
      pieces: "（{n}点）",
      copied: "リンクをコピーしました",
      link: "リンク",
      help1: "マウスや指でドラッグして見回せます",
      help2: "<b>床の矢印</b>をクリックすると次の地点へ進みます",
      help3: "展示物の <b>ⓘ</b> または ❖ で美術品の解説を表示",
      help4: "<b>見取り図</b>の地点や ☰ から好きな場所へ移動",
      start: "見学を始める",
      devBy: "開発：{name}",
      moreInfo: "詳しく見る",
      m3dTitle: "3Dモデル・仏教美術館",
      m3dHelp: "ドラッグで回転・スクロール/ピンチで拡大縮小・<span class=\"dot\"></span> で見学ポイントへ・<span class=\"gem\">◆</span> で美術品の解説",
      m3dClose: "3Dモデルを閉じる",
      m3dNote: "360°画像と画像から測った部屋の寸法をもとにした概略モデルです",
      m3dLoading: "3Dモデルを作成中…",
      m3dFail: "3Dモデルを開けません（WebGL 2 が必要です）",
      aboutTitle: "バーチャル仏教美術館について",
      aboutSub: "360°バーチャル博物館・マハーチュラーロンコーンラーチャウィッタヤーライ大学 プレー校",
      developer: "開発者",
      devName: "キッティパン・ラッタナコーン",
      devRole: "コンピュータ技術職員",
      email: "メール",
      phone: "電話",
      website: "ウェブサイト",
      project: "プロジェクトについて",
      projectText: "仏教美術館を360°画像で案内するウェブサイトです。ストリートビューのように歩いて見学でき、見取り図・方位磁針・展示室の3Dモデル・美術品の解説を備えています",
      credit1: "360°画像と美術品の解説パネル：MCUプレー校 仏教美術館",
      credit2: "360°ビューア：",
      credit3: "3Dモデル：",
      howto: "使い方",
      howto1: "マウスや指でドラッグして見回す・床の矢印をクリックするか <b>W</b> キーで進む",
      howto2: "<b>ⓘ</b> / <b>❖</b> 美術品・<b>☰</b> 見学ポイント・<b>◎</b> 見取り図・<b>3D</b> 3Dモデル",
      howto3: "方位磁針をクリックで北を向く・<b>⚙</b> 言語と表示モードの切り替え",
      cardNote: "解説パネルはタイ語です",
      language: "言語",
      theme: "表示モード",
      themeAuto: "端末に合わせる",
      themeLight: "ライト",
      themeDark: "ダーク",
      dirs: ["北", "北東", "東", "南東", "南", "南西", "西", "北西"],
      pnlm: {
        loadingLabel: "360°画像を読み込み中...", loadButtonLabel: "クリックして読み込む",
        noPanoramaError: "360°画像が見つかりません",
        fileAccessError: "%s を開けません（file:// ではなくウェブサーバー経由で開いてください）",
        malformedURLError: "画像のアドレスが正しくありません", iOS8WebGLError: "この端末は WebGL に対応していません",
        genericWebGLError: "このブラウザは WebGL に対応していません",
        textureSizeError: "この端末には画像が大きすぎます（幅 %s px、最大 %s px）",
        unknownError: "エラーが発生しました"
      }
    },
    zh: {
      tourName: "佛教艺术馆",
      org: "摩诃朱拉隆功大学 帕府校区",
      logoAlt: "摩诃朱拉隆功大学校徽",
      loading: "正在加载 360° 图像…",
      loadFailed: "图像加载失败",
      viewer: "360° 全景图",
      tools: "工具",
      about: "项目与开发者信息",
      settings: "语言与显示模式",
      model3d: "展厅 3D 模型",
      artworks: "全部艺术品",
      scenes: "参观点列表",
      map: "平面图",
      mapLabel: "建筑平面图",
      rotate: "自动旋转",
      share: "复制此处链接",
      fullscreen: "全屏",
      compass: "指南针 — 点击面向北方",
      close: "关闭",
      allScenes: "全部参观点",
      artTitle: "艺术品",
      artSearch: "搜索，例如：佛像、通幡、漆器",
      artSearchLabel: "搜索艺术品",
      forward: "前进 ▲",
      forwardTitle: "向前走（W）",
      faceArrow: "转向箭头即可前进",
      goTo: "前往 {name}",
      cardAlt: "说明牌：{name}",
      foundAt: "所在位置：{places}",
      approx: "（ⓘ 位置为大致位置）",
      pieces: "（{n} 件）",
      copied: "链接已复制",
      link: "链接",
      help1: "用鼠标或手指拖动即可环顾四周",
      help2: "点击<b>地面上的箭头</b>前往下一个点",
      help3: "点击展品上的 <b>ⓘ</b> 或 ❖ 查看艺术品介绍",
      help4: "点击<b>平面图</b>上的点或 ☰ 前往任意位置",
      start: "开始参观",
      devBy: "开发者：{name}",
      moreInfo: "更多信息",
      m3dTitle: "3D 模型 · 佛教艺术馆",
      m3dHelp: "拖动旋转 · 滚动/双指缩放 · 点击 <span class=\"dot\"></span> 前往参观点 · 点击 <span class=\"gem\">◆</span> 查看艺术品介绍",
      m3dClose: "关闭 3D 模型",
      m3dNote: "根据 360° 图像及从图像测得的房间尺寸建立的近似模型",
      m3dLoading: "正在生成 3D 模型…",
      m3dFail: "无法打开 3D 模型（需要支持 WebGL 2 的浏览器）",
      aboutTitle: "关于虚拟佛教艺术馆",
      aboutSub: "360° 虚拟博物馆 · 摩诃朱拉隆功大学帕府校区",
      developer: "开发者",
      devName: "吉迪潘·叻达纳孔",
      devRole: "计算机技术员",
      email: "电子邮件",
      phone: "电话",
      website: "网站",
      project: "关于项目",
      projectText: "以 360° 图像导览佛教艺术馆的网站，可像街景一样漫步参观，并提供平面图、指南针、展厅 3D 模型和艺术品介绍",
      credit1: "360° 图像与艺术品说明牌：摩诃朱拉隆功大学帕府校区佛教艺术馆",
      credit2: "360° 查看器：",
      credit3: "3D 模型：",
      howto: "使用方法",
      howto1: "用鼠标或手指拖动环顾四周 · 点击地面箭头或按 <b>W</b> 前进",
      howto2: "<b>ⓘ</b> / <b>❖</b> 艺术品 · <b>☰</b> 参观点 · <b>◎</b> 平面图 · <b>3D</b> 3D 模型",
      howto3: "点击指南针面向北方 · <b>⚙</b> 切换语言与显示模式",
      cardNote: "说明牌为泰文",
      language: "语言",
      theme: "显示模式",
      themeAuto: "跟随系统",
      themeLight: "浅色",
      themeDark: "深色",
      dirs: ["北", "东北", "东", "东南", "南", "西南", "西", "西北"],
      pnlm: {
        loadingLabel: "正在加载 360° 图像...", loadButtonLabel: "点击加载",
        noPanoramaError: "未找到 360° 图像",
        fileAccessError: "无法打开 %s（请通过网页服务器打开，而不是 file://）",
        malformedURLError: "图像地址无效", iOS8WebGLError: "此设备不支持 WebGL",
        genericWebGLError: "此浏览器不支持 WebGL",
        textureSizeError: "图像对此设备过大（宽 %s px，最大 %s px）",
        unknownError: "发生错误"
      }
    }
  };

  /* ---------- เลือกภาษา ---------- */

  function store(key, value) {
    try {
      if (value === undefined) return localStorage.getItem(key);
      if (value === null) localStorage.removeItem(key); else localStorage.setItem(key, value);
    } catch (e) { return null; }
    return null;
  }
  var codes = LANGS.map(function (l) { return l.code; });
  function detect() {
    var q = (location.search.match(/[?&]lang=([a-z]{2})/) || [])[1];
    if (codes.indexOf(q) >= 0) return q;
    var saved = store("bda.lang");
    if (codes.indexOf(saved) >= 0) return saved;
    // บอตของเครื่องมือค้นหาให้เห็นภาษาไทย (URL หลัก) — ภาษาอื่นอยู่ที่ ?lang=
    if (/bot|crawl|spider|slurp|lighthouse/i.test(navigator.userAgent)) return "th";
    var nav = (navigator.languages || [navigator.language || ""]).map(function (l) { return String(l).slice(0, 2); });
    for (var i = 0; i < nav.length; i++) if (codes.indexOf(nav[i]) >= 0) return nav[i];
    return "th";
  }
  var lang = detect();

  function t(key, vars) {
    var s = (UI[lang] && UI[lang][key] !== undefined) ? UI[lang][key] : UI.th[key];
    if (typeof s === "string" && vars) {
      s = s.replace(/\{(\w+)\}/g, function (m, k) { return vars[k] !== undefined ? vars[k] : m; });
    }
    return s;
  }

  function setLang(code) {
    if (codes.indexOf(code) < 0 || code === lang) return;
    store("bda.lang", code);
    var url = new URL(location.href);
    if (code === "th") url.searchParams.delete("lang"); else url.searchParams.set("lang", code);
    // โหลดใหม่ทั้งหน้า (คงจุดชมไว้ใน #hash) — ถ้าต่างกันแค่ #hash ต้องสั่ง reload เอง
    if (url.href.split("#")[0] === location.href.split("#")[0]) location.reload();
    else location.replace(url.href);
  }

  function apply(root) {
    root = root || document;
    Array.prototype.forEach.call(root.querySelectorAll("[data-i18n]"), function (el) {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    Array.prototype.forEach.call(root.querySelectorAll("[data-i18n-html]"), function (el) {
      el.innerHTML = t(el.getAttribute("data-i18n-html"));
    });
    Array.prototype.forEach.call(root.querySelectorAll("[data-i18n-attr]"), function (el) {
      el.getAttribute("data-i18n-attr").split(";").forEach(function (pair) {
        var p = pair.split(":");
        if (p.length === 2) el.setAttribute(p[0].trim(), t(p[1].trim()));
      });
    });
  }

  /* ---------- โหมดสี ---------- */

  var themeQuery = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
  function themeSetting() {
    var v = store("bda.theme");
    return v === "light" || v === "dark" ? v : "auto";
  }
  function currentTheme() {
    var v = themeSetting();
    return v === "auto" ? (themeQuery && !themeQuery.matches ? "light" : "dark") : v;
  }
  function applyTheme() {
    var v = themeSetting(), html = document.documentElement;
    if (v === "auto") html.removeAttribute("data-theme"); else html.setAttribute("data-theme", v);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", currentTheme() === "light" ? "#f6efe2" : "#120b07");
    document.dispatchEvent(new CustomEvent("themechange", { detail: currentTheme() }));
  }
  function setTheme(v) {
    store("bda.theme", v === "auto" ? null : v);
    applyTheme();
  }
  if (themeQuery && themeQuery.addEventListener) themeQuery.addEventListener("change", applyTheme);

  document.documentElement.lang = lang;
  applyTheme();

  window.i18n = {
    langs: LANGS, lang: lang, t: t, setLang: setLang, apply: apply,
    theme: themeSetting, currentTheme: currentTheme, setTheme: setTheme,
    // ข้อความจากข้อมูลทัวร์: {th, en, ja, zh} หรือข้อความธรรมดา
    pick: function (v, fallback) {
      if (v && typeof v === "object") return v[lang] || v.en || v.th || fallback || "";
      return v || fallback || "";
    }
  };
})();

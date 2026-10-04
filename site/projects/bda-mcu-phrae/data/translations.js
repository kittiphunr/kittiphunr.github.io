/* คำแปลข้อมูลทัวร์ (ชื่อโซน คำอธิบาย ชื่องานศิลปะ) — ภาษาไทยอยู่ใน data/tour.js
   ภาพบัตรข้อมูลงานศิลปะยังเป็นภาษาไทย จึงแปลเฉพาะชื่อ */
window.TOUR_I18N = {
  tour: {
    title: { en: "Buddhist Art Gallery", ja: "仏教美術館", zh: "佛教艺术馆" },
    subtitle: {
      en: "360° Virtual Museum · Mahachulalongkornrajavidyalaya University, Phrae Campus",
      ja: "360° バーチャルミュージアム · マハーチュラーロンコーンラーチャウィッタヤーライ大学 プレー校",
      zh: "360° 虚拟博物馆 · 摩诃朱拉隆功大学 帕府校区"
    }
  },

  rooms: {
    "ห้องจัดแสดง หอพุทธศิลป์": { en: "Gallery hall", ja: "展示室", zh: "展厅" },
    "ระเบียงทางเดิน": { en: "Corridor", ja: "廊下", zh: "走廊" }
  },

  // คีย์คือชื่อโซนภาษาไทย (ไม่รวมเลขลำดับ " (n)")
  zones: {
    "โซนวิถีชีวิตและเครื่องใช้พื้นบ้าน": {
      en: ["Folk Life & Household Tools", "Traditional household tools, looms and Buddhist art exhibition boards"],
      ja: ["民俗の暮らしと道具", "伝統的な生活道具、機織り機、仏教美術の展示パネル"],
      zh: ["民俗生活与器具", "传统生活器具、织布机及佛教艺术展板"]
    },
    "โซนจิตรกรรมร่วมสมัย": {
      en: ["Contemporary Painting", "Contemporary Buddhist paintings and a shrine with a statue of a senior monk"],
      ja: ["現代絵画", "現代の仏教絵画と高僧像を祀る礼拝コーナー"],
      zh: ["当代绘画", "当代佛教绘画及高僧塑像供奉角"]
    },
    "โซนคัมภีร์และเครื่องสักการะ": {
      en: ["Scriptures & Offerings", "Ancient scriptures, ritual offerings and paintings on wooden panels"],
      ja: ["経典と供物", "古い経典、供物、木板に描かれた絵画"],
      zh: ["经典与供品", "古代经典、供奉器物及木板绘画"]
    },
    "โซนพระพุทธรูป": {
      en: ["Buddha Images", "Buddha images in a variety of postures displayed on wooden stands"],
      ja: ["仏像", "木製の台に並ぶさまざまな印相の仏像"],
      zh: ["佛像", "木台上陈列的各种姿态佛像"]
    },
    "โซนธรรมาสน์และบุษบก": {
      en: ["Pulpits & Pavilion Thrones", "Preaching pulpits, pavilion thrones, ceremonial parasols and Buddhist ritual objects"],
      ja: ["説法台と玉座", "説法台、玉座、儀礼用の日傘と仏教儀式の道具"],
      zh: ["讲经台与宝座", "讲经台、宝座、仪仗伞及佛教仪式器物"]
    },
    "พระพุทธรูปประธาน": {
      en: ["Principal Buddha Image", "The seated principal Buddha image with offerings and a painted backdrop"],
      ja: ["本尊", "供物と背景画に囲まれた坐像の本尊"],
      zh: ["主佛", "端坐的主佛像，配有供品与背景壁画"]
    },
    "มุมแผงพระพิมพ์": {
      en: ["Votive Tablet Panels", "Panels holding many small Buddha images, near the exit door"],
      ja: ["奉納仏パネル", "出口近くの、多数の小さな仏像を納めたパネル"],
      zh: ["佛牌墙", "出口附近供奉众多小佛像的展板"]
    },
    "ประตูหอพุทธศิลป์": {
      en: ["Gallery Door", "The door between the exhibition hall and the outer corridor"],
      ja: ["展示室の扉", "展示室と外の廊下をつなぐ扉"],
      zh: ["展厅大门", "连接展厅与外侧走廊的门"]
    },
    "ระเบียงทางเดิน": {
      en: ["Corridor", "The outer corridor running along the gallery"],
      ja: ["廊下", "美術館に沿って続く外廊下"],
      zh: ["走廊", "沿着艺术馆的外侧走廊"]
    },
    "ลานหน้าอาคาร": {
      en: ["Front Courtyard", "The open courtyard in front of the gallery entrance"],
      ja: ["建物前の広場", "美術館入口前の広場"],
      zh: ["楼前广场", "艺术馆入口前的开阔广场"]
    },
    "ทางเข้าหอพุทธศิลป์": {
      en: ["Gallery Entrance", "Entrance to the Buddhist Art Gallery, MCU Phrae Campus"],
      ja: ["美術館入口", "MCU プレー校 仏教美術館の入口"],
      zh: ["艺术馆入口", "摩诃朱拉隆功大学帕府校区佛教艺术馆入口"]
    }
  },

  // ชื่องานศิลปะ [en, ja, zh]
  artworks: {
    a01: ["Mixed-media work “Wind of the Worldly Conditions”", "ミクストメディア作品「世間法の風」", "综合材料作品《世间法之风》"],
    a02: ["Oil painting “Amid Serenity in the Darkness”", "油彩画「暗黒の中の静寂」", "油画《黑暗中的宁静》"],
    a03: ["Crafted work “Woven Tung of Bonds”", "工芸作品「絆を織るトゥン旗」", "工艺作品《编织情缘的东幡》"],
    a04: ["Tung, crafted work “Tung of Lanna Culture”", "トゥン旗の工芸作品「ランナー文化のトゥン」", "东幡工艺作品《兰纳文化之幡》"],
    a05: ["Crafted work “Phra Kan”", "工芸作品「プラ・カーン」", "工艺作品《帕甘》"],
    a06: ["Crafted work “Tung of Life and Spirit”", "工芸作品「命と魂のトゥン」", "工艺作品《生命与心灵之幡》"],
    a07: ["Crafted work “Mantra of Sacred Numerals”", "工芸作品「数字ヤントラの呪文」", "工艺作品《符数真言》"],
    a08: ["Ceremonial regalia honouring the Five Buddhas", "五仏を供養する儀礼具", "供奉五佛的仪仗器"],
    a09: ["Candlewicks offered to the Buddha", "仏前に供える灯芯", "供佛灯芯"],
    a10: ["Yantra talisman cloth", "ヤントラの護符布", "符咒布"],
    a11: ["Khoi-paper folding book", "コーイ紙の折本", "贝叶纸折本"],
    a12: ["Tuesday Buddha, reclining posture", "火曜日の仏・涅槃像", "星期二佛·卧佛"],
    a13: ["Buddha in the Subduing Mara posture", "降魔印の仏像", "降魔印佛像"],
    a14: ["Replica of Phra That Cho Hae", "プラタート・チョーヘーの模型", "雀海佛塔模型"],
    a15: ["Buddha in the Subduing Mara posture", "降魔印の仏像", "降魔印佛像"],
    a16: ["Buddha in the Subduing Mara posture", "降魔印の仏像", "降魔印佛像"],
    a17: ["Buddha in the Subduing Mara posture", "降魔印の仏像", "降魔印佛像"],
    a18: ["Sunday Buddha, gazing posture, carved wood", "日曜日の仏・凝視像（木彫）", "星期日佛·凝视像（木雕）"],
    a19: ["Buddha forbidding the sandalwood image", "栴檀像を制止する仏像", "止栴檀像佛"],
    a20: ["Wednesday (daytime) Buddha holding the alms bowl", "水曜日（昼）の仏・托鉢像", "星期三（白天）佛·持钵像"],
    a21: ["Saturday Buddha sheltered by the naga", "土曜日の仏・ナーガ守護像", "星期六佛·龙王护佛像"],
    a22: ["Thursday Buddha, Enlightenment (meditation) posture", "木曜日の仏・成道（禅定）像", "星期四佛·成道（禅定）像"],
    a23: ["Friday Buddha, contemplating posture", "金曜日の仏・思惟像", "星期五佛·思惟像"],
    a24: ["Wednesday night (Rahu) Buddha, Pa Lelai posture", "水曜日（夜・ラーフ）の仏・パーレーライ像", "星期三夜（罗睺）佛·森林安居像"],
    a25: ["Wednesday night Buddha", "水曜日（夜）の仏", "星期三夜佛"],
    a26: ["Lanna flower basket", "ランナーの花籠", "兰纳花篮"],
    a27: ["Dhamma script rack", "経典掛け", "经典挂架"],
    a28: ["Pap Sa (khoi-paper book)", "パップサー（コーイ紙の本）", "帕萨（贝叶纸书）"],
    a29: ["Earthenware pot", "素焼きの壺", "陶罐"],
    a30: ["Cast figures of revered monks", "高僧の鋳像", "高僧铸像"],
    a31: ["Model stupa", "仏塔の模型", "佛塔模型"],
    a32: ["Phra Chao Si Maha Pho Buddha image", "プラチャオ・シーマハーポー仏", "圣菩提佛像"],
    a33: ["Cotton gin", "綿繰り機", "轧棉机"],
    a34: ["Weaving braid", "機織りの綜絖", "织布综线"],
    a35: ["Weaving reed (loom comb)", "機織りの筬", "织布筘"],
    a36: ["Antique gramophone and records", "古い蓄音機とレコード", "古董留声机与唱片"],
    a37: ["Hok wooden bell", "木製のカウベル（ホック）", "木铃（霍克）"],
    a38: ["Brass bowl", "真鍮の鉢", "黄铜钵"],
    a39: ["Brass bowl", "真鍮の鉢", "黄铜钵"],
    a40: ["Antique measuring tape", "古い巻尺", "古董卷尺"],
    a41: ["Tea-brewing tube", "茶を淹れる筒", "泡茶筒"],
    a42: ["Deep brass tray", "深い真鍮の盆", "深底黄铜盘"],
    a43: ["Incense burner cover", "香炉の蓋", "香炉罩"],
    a44: ["Deng bell", "鈴（デン）", "铃（登）"],
    a45: ["Lanna lacquerware and betel set", "ランナーの漆器とキンマ入れ", "兰纳漆器与槟榔盒"],
    a46: ["Lanna lacquerware and betel set", "ランナーの漆器とキンマ入れ", "兰纳漆器与槟榔盒"],
    a47: ["Lanna lacquerware and betel set", "ランナーの漆器とキンマ入れ", "兰纳漆器与槟榔盒"],
    a48: ["Lanna lacquerware and betel set", "ランナーの漆器とキンマ入れ", "兰纳漆器与槟榔盒"],
    a49: ["Brassware", "真鍮器", "黄铜器"],
    a50: ["Water scoop", "水汲み", "水瓢"],
    a51: ["Wooden pillow", "木枕", "木枕"],
    a52: ["Gold-panning tray", "砂金採りの盆", "淘金盘"],
    a53: ["Horse-neck snare", "馬首型の罠", "马颈套索陷阱"],
    a54: ["Tobacco-leaf cutting bench", "タバコ葉の裁断台", "烟叶切台"],
    a55: ["Antique iron chest", "古い鉄の箱", "古铁箱"],
    a56: ["Flat khantoke tray", "平たいカントーク膳", "平底康托克餐盘"],
    a57: ["Lanna lacquerware and betel set", "ランナーの漆器とキンマ入れ", "兰纳漆器与槟榔盒"],
    a58: ["Statue of Phra Maha Phothiwongsachan", "プラマハー・ポーティウォンサーチャーン像", "帕玛哈·菩提翁萨占塑像"],
    a59: ["Glazed ceramics", "陶磁器", "釉陶瓷器"],
    a60: ["Buddha image for worship", "礼拝用の仏像", "供奉佛像"],
    a61: ["Ceremonial regalia honouring the Five Buddhas", "五仏を供養する儀礼具", "供奉五佛的仪仗器"],
    a62: ["Tripitaka cabinet", "三蔵経の経箱", "三藏经柜"],
    a63: ["Preaching pulpit", "説法台", "讲经台"],
    a64: ["Preaching pulpit", "説法台", "讲经台"],
    a65: ["Stupa enshrining relics of the Buddha", "仏舎利を納めた仏塔", "供奉佛舍利的佛塔"],
    a66: ["Stucco Buddha (Phra Chao Than Jai)", "漆喰の仏像（プラチャオ・タンジャイ）", "灰塑佛像（敦再佛）"],
    a67: ["Purnaghata (vase of plenty)", "プールナガタ（満瓶）", "满瓶（贤瓶）"],
    a68: ["Up Yot ceremonial vessel", "ウップヨート（儀礼容器）", "乌约礼器"],
    a69: ["Rank regalia", "位階を示す儀仗", "品阶仪仗"],
    a70: ["Terracotta Buddha panel", "素焼きの仏像パネル", "陶土佛像板"]
  }
};

# kittiphunr.github.io

เว็บไซต์พอร์ตโฟลิโอของ **กิตติพันธ์ รัตนคร** (Kittiphun Ruttanakorn) รองรับ 4 ภาษา: ไทย · English · 日本語 · 中文

## โครงสร้าง

ไฟล์ที่ขึ้นเว็บไซต์จริงอยู่ในโฟลเดอร์ `site/` เท่านั้น ส่วนสคริปต์ เอกสาร และ workflow อยู่นอกโฟลเดอร์นี้และจะไม่ถูก deploy

```
site/                 ← deploy ขึ้นเว็บ (GitHub Pages / Netlify)
├── index.html
├── assets/css/tailwind.css   (ไฟล์ที่ build แล้ว — ห้ามแก้ตรง)
├── assets/js/  assets/img/
└── data/portfolio.json
src/tailwind.css      ← CSS ต้นฉบับของ Tailwind (เอฟเฟกต์ที่ utility ทำไม่ได้)
tailwind.config.js    ← สี ฟอนต์ แอนิเมชันของธีม
scripts/              ← สคริปต์แปลภาษา
.github/              ← GitHub Action (build CSS → แปลภาษา → deploy)
```


| ไฟล์ | หน้าที่ |
| --- | --- |
| `site/data/portfolio.json` | **ข้อมูลทั้งหมดของเว็บไซต์** (ประวัติ ทักษะ ประสบการณ์ การศึกษา ผลงาน) แก้ไขที่ไฟล์นี้ไฟล์เดียว |
| `site/assets/js/i18n.js` | ข้อความเมนู/หัวข้อของหน้าเว็บในแต่ละภาษา |
| `site/assets/js/app.js` | แสดงผลข้อมูล และแปลภาษาอัตโนมัติฝั่งเบราว์เซอร์ (สำรอง) |
| `tailwind.config.js` | ธีมของ Tailwind: สีแบรนด์ (ชมพู → ม่วง), ฟอนต์, เงา, แอนิเมชัน |
| `src/tailwind.css` | ไฟล์ต้นฉบับ CSS: ปุ่ม/ป้าย (`@apply`) และเอฟเฟกต์พิเศษ |
| `site/assets/css/tailwind.css` | CSS ที่ build แล้ว (สร้างจากคำสั่ง `npm run build`) |
| `site/assets/js/icons.js` | ไอคอนโลโก้เทคโนโลยี (Simple Icons) |
| `site/assets/js/effects.js` | เอฟเฟกต์: ลูกโลกเครือข่าย 3 มิติ, แอนิเมชันเมื่อเลื่อนหน้า, แถบทักษะ, ไฮไลต์เมนูตามตำแหน่ง, การ์ดเอียง 3 มิติ, ตัวนับสถิติ (ปิดอัตโนมัติเมื่อผู้ใช้ตั้งค่าลดการเคลื่อนไหว) |
| `scripts/translate.mjs` | สคริปต์เติมคำแปลที่ขาดลงใน `site/data/portfolio.json` |
| `.github/workflows/static.yml` | GitHub Action: แปลภาษาอัตโนมัติ → commit กลับ → deploy |

## การเพิ่มข้อมูล

ข้อความที่ต้องแปลเขียนเป็นออบเจกต์ภาษา **ใส่แค่ภาษาไทยก็พอ** ระบบจะแปลเป็นภาษาที่เหลือให้เอง

```json
{
  "title": "ระบบจองห้องประชุม",
  "description": { "th": "ระบบจองห้องประชุมออนไลน์สำหรับบุคลากร" },
  "tags": ["PHP", "MySQL"],
  "link": "https://github.com/kittiphunr/...",
  "image": "assets/img/meeting.png"
}
```

- ข้อความที่เหมือนกันทุกภาษา (ชื่อโปรเจกต์ แท็ก ลิงก์) ใส่เป็นข้อความธรรมดาได้
- ถ้าใส่ทั้ง `th` และ `en` ภาษาญี่ปุ่นและจีนจะแปลจากภาษาอังกฤษ ซึ่งมักแม่นยำกว่า
- คำแปลที่มีอยู่แล้วจะไม่ถูกเขียนทับ จึงแก้คำแปลด้วยมือได้ตามต้องการ

### ตัวอย่างหมวดอื่น

**ประสบการณ์** (`experience`, ตำแหน่งล่าสุดไว้บนสุด) — `end: null` หมายถึง "ปัจจุบัน"

```json
{
  "start": "2024-10-01", "end": null,
  "role": { "th": "นักวิชาการคอมพิวเตอร์" },
  "organization": { "th": "มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย วิทยาเขตแพร่" },
  "highlights": [ { "th": "รายละเอียดงาน" } ]
}
```

**การศึกษา** (`education`, ซ่อนอัตโนมัติถ้ายังไม่มีข้อมูล)

```json
{
  "start": "2016-06-01", "end": "2020-03-31",
  "degree": { "th": "วิทยาศาสตรบัณฑิต สาขาวิทยาการคอมพิวเตอร์" },
  "institution": { "th": "ชื่อมหาวิทยาลัย" }
}
```

**ทักษะ** (`skills`) — `icon` เลือกได้จาก `network`, `windows`, `terminal`, `code`, `server`, `shield`

**ระดับทักษะ** (`proficiency`, แสดงเป็นแถบเปอร์เซ็นต์และไอคอนในหน้าแรก) — `level` คือ 0–100 ปรับตามจริงได้ `icon` เลือกจาก `cisco`, `windows`, `linux`, `ubuntu`, `html5`, `javascript`, `nodedotjs`, `python`, `mysql`, `docker`, `git`

```json
{ "name": "Docker", "icon": "docker", "color": "#2496ED", "level": 75 }
```

**รูปโปรไฟล์** — วางรูปไว้ที่ `site/assets/img/` แล้วใส่ path ใน `profile.photo`

**ไฟล์ CV** — วางไฟล์ PDF ไว้ที่ `site/assets/` แล้วใส่ path ใน `profile.cv` (เช่น `"assets/cv.pdf"`) ปุ่ม "ดาวน์โหลด CV" จะแสดงขึ้นอัตโนมัติ

**ข้อความหน้าแรก** — `profile.tagline` (ป้ายเล็ก), `profile.slogan` (ข้อความตัวใหญ่), `profile.intro` (คำแนะนำตัว), `profile.motto` (ปณิธานในส่วนติดต่อ)

วันที่ใช้รูปแบบ ค.ศ. `YYYY-MM-DD` เมื่อแสดงเป็นภาษาไทยจะเปลี่ยนเป็น พ.ศ. ให้อัตโนมัติ

## ระบบแปลภาษาอัตโนมัติ

1. **ตอน push ขึ้น `main`**: GitHub Action รัน `scripts/translate.mjs` เพื่อเติมภาษาที่ขาด แล้ว commit กลับเข้า repo และ deploy ขึ้น GitHub Pages
2. **ในเบราว์เซอร์ (สำรอง)**: ถ้ายังมีข้อความที่ไม่มีคำแปล เว็บจะแปลให้ทันทีและเก็บไว้ในเครื่องผู้เข้าชม ข้อความที่แปลด้วยเครื่องจะมีเส้นประใต้ข้อความ

รันสคริปต์แปลภาษาในเครื่อง (Node.js 18 ขึ้นไป):

```bash
node scripts/translate.mjs            # เติมคำแปลลงไฟล์
node scripts/translate.mjs --dry-run  # ทดสอบโดยไม่บันทึก
```

## การจัดหน้าด้วย Tailwind CSS

หน้าเว็บจัดด้วย [Tailwind CSS](https://tailwindcss.com) v3 โดยใส่ class ไว้ใน `site/index.html` และใน `site/assets/js/app.js` (ฟังก์ชัน `render…` ของแต่ละส่วน) Tailwind จะสแกน class จากไฟล์เหล่านี้แล้วสร้าง CSS เฉพาะที่ใช้จริง

```bash
npm install        # ครั้งแรกครั้งเดียว
npm run dev        # build ใหม่อัตโนมัติทุกครั้งที่แก้ไฟล์
npm run build      # build แบบย่อขนาดสำหรับขึ้นเว็บ
```

- เปลี่ยนสีทั้งเว็บ: แก้ `brand` และ `backgroundImage.grad` ใน `tailwind.config.js`
- โหมดสว่าง/มืด: เว็บจะเปลี่ยนตามธีมของเครื่องอัตโนมัติ สีพื้นหลัง ตัวอักษร และเส้นขอบของแต่ละธีมกำหนดเป็นตัวแปร (`--ink-*`, `--fg`, `--muted`, `--accent`) อยู่ต้นไฟล์ `src/tailwind.css`
- เมื่อ push ขึ้น `main` GitHub Action จะ build CSS ให้อัตโนมัติ แต่ควร `npm run build` และ commit ไฟล์ `site/assets/css/tailwind.css` ด้วย เพื่อให้เปิดดูในเครื่องได้ทันที
- เขียนชื่อ class ให้ครบเป็นข้อความเดียว (เช่น `"text-brand-300"`) อย่าต่อสตริงเป็นชิ้น ๆ ไม่เช่นนั้น Tailwind จะหา class ไม่เจอ

## SEO และโหมดสว่าง/มืด

- **SEO:** อยู่ใน `<head>` ของ `site/index.html` ได้แก่ title/description, Open Graph และ Twitter card (ภาพแชร์ `site/assets/img/og-image.jpg` ขนาด 1200×630), hreflang ทั้ง 4 ภาษา และข้อมูลโครงสร้าง JSON-LD (`Person`) — เมื่อเปลี่ยนภาษา title/description/canonical จะเปลี่ยนตาม
- **ไฟล์สำหรับ search engine:** `site/robots.txt` และ `site/sitemap.xml` — แก้ `lastmod` เมื่ออัปเดตเนื้อหาสำคัญ
- **แนะนำ:** ลงทะเบียนเว็บใน [Google Search Console](https://search.google.com/search-console) แล้วส่ง `https://kittiphunr.github.io/sitemap.xml`
- **โหมดสว่าง/มืด:** ค่าเริ่มต้นตามธีมของเครื่อง กดปุ่ม ☾/☀ บนแถบเมนูเพื่อสลับ ระบบจะจำค่าที่เลือกไว้ในเบราว์เซอร์

## ทดสอบในเครื่อง

```bash
python3 -m http.server 8000 --directory site
# เปิด http://localhost:8000  (หรือ ?lang=en / ja / zh)
```

> ต้องเปิดผ่าน web server เพราะเบราว์เซอร์ไม่อนุญาตให้โหลด JSON จาก `file://`

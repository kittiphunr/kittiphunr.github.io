# kittiphunr.github.io

เว็บไซต์พอร์ตโฟลิโอของ **กิตติพันธ์ รัตนคร** (Kittiphun Ruttanakorn) รองรับ 4 ภาษา: ไทย · English · 日本語 · 中文

## โครงสร้าง

ไฟล์ที่ขึ้นเว็บไซต์จริงอยู่ในโฟลเดอร์ `site/` เท่านั้น ส่วนสคริปต์ เอกสาร และ workflow อยู่นอกโฟลเดอร์นี้และจะไม่ถูก deploy

```
site/                 ← deploy ขึ้นเว็บ (GitHub Pages / Netlify)
├── index.html
├── assets/css/tailwind.css   (ไฟล์ที่ build แล้ว — ห้ามแก้ตรง)
├── assets/js/  assets/img/
├── data/portfolio.json
└── projects/bda-mcu-phrae/   (ทัวร์ 360° + โมเดล 3 มิติ หอพุทธศิลป์ — คัดลอกมาจาก repo BDA-MCU-PHRAE)
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
| `site/assets/js/effects.js` | เอฟเฟกต์: ลูกโลกเครือข่าย 3 มิติ, แอนิเมชันเมื่อเลื่อนหน้า, แถบทักษะ, ไฮไลต์เมนูตามตำแหน่ง, การ์ดเอียง 3 มิติ, ตัวนับสถิติ, เคอร์เซอร์แบบโต้ตอบ (เปิด/ปิดตามสถานะแอนิเมชัน) |
| `site/assets/js/circuit.js` | ลายวงจร PCB พร้อมกระแสไฟวิ่งตามลายวงจร (แถบคั่นมีชิป IC และพื้นหลังจาง ๆ ของบางส่วน) |
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

**ผลงานเด่น (Featured)** — ใส่ `"featured": { … }` ในผลงานชิ้นใดก็ได้ (ตอนนี้คือ Precision-QC, IV-Monitor-BCNPH และ BDA-MCU-PHRAE) ระบบจะสร้างส่วน "ผลงานเด่น" ต่อจากทักษะ ประกอบด้วย `subtitle`, `summary`, `gallery` (ภาพ + คำบรรยาย), `metrics`, `highlights` (การ์ด JavaScript / Python พร้อมรายการจุดเด่น) และ `stack` — ภาพอยู่ใน `site/assets/img/projects/<ชื่อโปรเจกต์>/`

**รูปโปรไฟล์** — วางรูปไว้ที่ `site/assets/img/` แล้วใส่ path ใน `profile.photo`

**ไฟล์ CV** — วางไฟล์ PDF ไว้ที่ `site/assets/` แล้วใส่ path ใน `profile.cv` (เช่น `"assets/cv.pdf"`) ปุ่ม "ดาวน์โหลด CV" จะแสดงขึ้นอัตโนมัติ

**ข้อความหน้าแรก** — `profile.tagline` (ป้ายเล็ก), `profile.slogan` (ข้อความตัวใหญ่), `profile.intro` (คำแนะนำตัว), `profile.motto` (ปณิธานในส่วนติดต่อ)

**SEO** — `profile.seoDescription` คือคำอธิบายสำหรับ Google และการแชร์ในแต่ละภาษา (ไม่ใส่จะใช้ `profile.intro`) ส่วนแท็กคงที่, Open Graph และ JSON-LD (Person + ผลงานเด่น) อยู่ใน `<head>` ของ `site/index.html`

วันที่ใช้รูปแบบ ค.ศ. `YYYY-MM-DD` หรือใส่แค่ปี ค.ศ. เช่น `"2013"` ก็ได้ เมื่อแสดงเป็นภาษาไทยจะเปลี่ยนเป็น พ.ศ. ให้อัตโนมัติ (`"end": null` หมายถึง "ปัจจุบัน")

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
- **ที่อยู่หลัก (canonical):** `https://kittiphun.rut.mcupr.ac.th/` — ฉบับบน GitHub Pages ก็ชี้ canonical / hreflang / sitemap มาที่ mcupr.ac.th เพื่อให้ Google นับเป็นหน้าเดียวกันและจัดอันดับที่ mcupr.ac.th (ค่าอยู่ใน `<head>` ของ `site/index.html`, `SITE_URL` ใน `site/assets/js/app.js`, `site/sitemap.xml` และ `site/robots.txt`)
- **แนะนำ:** ลงทะเบียน `https://kittiphun.rut.mcupr.ac.th/` ใน [Google Search Console](https://search.google.com/search-console) แล้วส่ง `https://kittiphun.rut.mcupr.ac.th/sitemap.xml`
- **Smooth scroll:** กดเมนูหรือปุ่มในหน้าแล้วเลื่อนแบบค่อย ๆ เร่งและค่อย ๆ ชะลอ (easeInOutCubic) ระยะเวลา 0.6–1.4 วินาทีตามระยะทาง หยุดใต้แถบเมนูพอดี (`smoothScrollTo` ใน `site/assets/js/effects.js`) หมุนล้อเมาส์ระหว่างเลื่อนจะยกเลิกทันที
- **เคอร์เซอร์แบบโต้ตอบ:** จุดสีชมพูกับวงแหวนที่ตามเมาส์ วงแหวนขยายเมื่อชี้ลิงก์/ปุ่ม และกลายเป็นวง "ดู" เมื่อชี้ภาพที่กดได้ (สไตล์อยู่ใน `src/tailwind.css` ส่วน Interactive cursor) — ใช้เฉพาะเมาส์ ปิดบนอุปกรณ์สัมผัสและเมื่อปิดแอนิเมชัน
- **ลายวงจร + กระแสไฟ:** `site/assets/js/circuit.js` วาดลายวงจรแบบ PCB (ลายทองแดงหักมุม 45°, pad, via, ชิป IC) จาก seed จึงได้ลายเดิมทุกครั้ง ใส่ได้สองแบบ: `<div class="circuit-divider" data-circuit="divider" data-seed="3"></div>` เป็นแถบคั่นระหว่างส่วน และ `data-circuit="bg"` เป็นพื้นหลังจาง ๆ (ส่วนที่ app.js เรนเดอร์ใหม่กำหนดใน `SECTION_BG`) กระแสไฟเป็นแอนิเมชัน CSS ที่หยุดเมื่ออยู่นอกจอ และซ่อนเมื่อปิดแอนิเมชัน สีปรับในส่วน Circuit traces ของ `src/tailwind.css`
- **เมนูการแสดงผล (⚙):** ปุ่มเดียวบนแถบเมนู เปิดแผงตั้งค่า 3 อย่าง: โหมดสี (ตามเครื่อง/สว่าง/มืด), แอนิเมชัน (เปิด/ปิด) และขนาดตัวอักษร (เล็ก/ปกติ/ใหญ่ = 87.5%/100%/112.5% ของขนาดฐาน) ค่าที่เลือกเก็บใน localStorage (`portfolio.theme`, `portfolio.motion`, `portfolio.font`) และสคริปต์ใน `<head>` ของ `site/index.html` ตั้ง `data-theme` / `data-motion` / `data-font` บน `<html>` ก่อนหน้าเว็บแสดงผล ถ้าไม่เคยเลือก โหมดสีและแอนิเมชันจะตามการตั้งค่าของเครื่อง โค้ดอยู่ใน `app.js` ส่วน display settings ซึ่งส่งเหตุการณ์ `themechange` / `motionchange` / `fontsizechange` ให้ `effects.js`
- **โหมดสว่าง/มืด:** ค่าเริ่มต้นตามธีมของเครื่อง กดปุ่ม ☾/☀ บนแถบเมนูเพื่อสลับ ระบบจะจำค่าที่เลือกไว้ในเบราว์เซอร์

## เรซูเม่แบบ PDF (ปุ่มดาวน์โหลด)

ปุ่ม **ดาวน์โหลดเรซูเม่ (PDF)** ในหน้าแรกและส่วนติดต่อ จะดาวน์โหลดไฟล์ตามภาษาที่เลือกอยู่ (`site/assets/cv/Kittiphun-Ruttanakorn-Resume-{TH,EN,JA,ZH}.pdf`)

- PDF ขนาด A4 สร้างจากข้อมูลชุดเดียวกับเว็บ (`site/data/portfolio.json`) ผ่านแม่แบบ `resume/index.html` — โครงแบบเรซูเม่สำหรับผู้มีประสบการณ์: ข้อมูลติดต่อ → สรุปประวัติ → ความเชี่ยวชาญหลัก → ประสบการณ์ (ใหม่ไปเก่า) → ผลงานเด่น → การศึกษา
- **หลังแก้ข้อมูลให้สร้าง PDF ใหม่:** `npm run pdf` (ใช้ Google Chrome ที่ติดตั้งในเครื่อง หรือกำหนด `CHROME_PATH`) แล้ว commit ไฟล์ใน `site/assets/cv/`
- ดูตัวอย่างก่อนสร้าง: `npm run pdf -- --serve` แล้วเปิด `http://localhost:8123/resume/?lang=th`
- ฟอนต์ไทย/ญี่ปุ่น/จีนมาจากแพ็กเกจ `@fontsource` (ใช้ตอนสร้าง PDF เท่านั้น ไม่ได้อัปโหลดขึ้นเว็บ)

## ติดตั้งบนโฮสต์มหาวิทยาลัย (Apache / cPanel)

```bash
npm install          # ครั้งแรกครั้งเดียว
npm run deploy       # build CSS แล้วสร้างโฟลเดอร์ deploy/ และไฟล์ portfolio-deploy.zip
```

- ค่าเริ่มต้นสร้างสำหรับ `https://kittiphun.rut.mcupr.ac.th/` ถ้าติดตั้งที่อื่นใช้ `python3 scripts/build_deploy.py --base-url https://โดเมน/โฟลเดอร์/`
- สคริปต์จะเปลี่ยนลิงก์ SEO / ภาพแชร์ / sitemap ให้ชี้ที่อยู่จริง ใส่เลขเวอร์ชัน (`?v=`) ให้ไฟล์ CSS/JS และสร้าง `.htaccess` (บีบอัด, cache, security headers) ที่**ไม่ยุ่งกับโฟลเดอร์ `/projects/`** (Precision QC และทัวร์ 360° ใช้การตั้งค่าของตัวเอง)
- **วิธีอัปโหลด:** อัปโหลด*ไฟล์ทั้งหมดในโฟลเดอร์* `deploy/` (หรือแตกไฟล์ zip) ขึ้น `public_html/` ด้วย FTP/SFTP หรือ File Manager ของ cPanel — อย่าลืมไฟล์ซ่อน `.htaccess` (FileZilla: *Server → Force showing hidden files*)
- **ถ้าใน `public_html/` มี `.htaccess` เดิมอยู่แล้ว** ให้เปิดดูก่อน แล้วนำเนื้อหาของเราไปต่อท้าย แทนการเขียนทับ
- อัปเดตครั้งต่อไป: แก้ข้อมูล → `npm run deploy` → อัปโหลดทับทั้งหมด
- ทัวร์ 360° และโมเดล 3 มิติ หอพุทธศิลป์ (`site/projects/bda-mcu-phrae/`, ~30 MB) รวมอยู่ใน `deploy/` และ zip แล้ว เปิดได้ที่ `https://kittiphun.rut.mcupr.ac.th/projects/bda-mcu-phrae/` (มี `.htaccess` ของตัวเอง)
- โฟลเดอร์ `deploy/` และไฟล์ zip ไม่ถูก commit (อยู่ใน `.gitignore`) สร้างใหม่ได้ทุกเมื่อ

### อัปเดตทัวร์ 360° (BDA-MCU-PHRAE)

ไฟล์ใน `site/projects/bda-mcu-phrae/` คือ `deploy/dist/` ของ repo [BDA-MCU-PHRAE](https://github.com/kittiphunr/BDA-MCU-PHRAE) เมื่อแก้ทัวร์แล้วให้คัดลอกมาใหม่:

```bash
git clone --depth 1 https://github.com/kittiphunr/BDA-MCU-PHRAE ../BDA-MCU-PHRAE   # ครั้งแรก
rm -rf site/projects/bda-mcu-phrae && cp -r ../BDA-MCU-PHRAE/deploy/dist site/projects/bda-mcu-phrae
npm run deploy
```

> แท็ก SEO ของหน้าทัวร์ (title, canonical, Open Graph, JSON-LD) อยู่ใน `index.html` ของ repo BDA-MCU-PHRAE แล้ว คัดลอกทับได้เลย ส่วนภาพแชร์อยู่ที่ `site/assets/img/projects/bda-mcu-phrae/og.jpg` ในพอร์ตโฟลิโอ

## ทดสอบในเครื่อง

```bash
python3 -m http.server 8000 --directory site
# เปิด http://localhost:8000  (หรือ ?lang=en / ja / zh)
```

> ต้องเปิดผ่าน web server เพราะเบราว์เซอร์ไม่อนุญาตให้โหลด JSON จาก `file://`

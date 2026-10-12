# kittiphunr.github.io

เว็บไซต์พอร์ตโฟลิโอของ **กิตติพันธ์ รัตนคร** (Kittiphun Ruttanakorn) รองรับ 4 ภาษา: ไทย · English · 日本語 · 中文

## โครงสร้าง

ไฟล์ที่ขึ้นเว็บไซต์จริงอยู่ในโฟลเดอร์ `site/` เท่านั้น ส่วนสคริปต์ เอกสาร และ workflow อยู่นอกโฟลเดอร์นี้และจะไม่ถูก deploy

```
site/                 ← deploy ขึ้นเว็บ (GitHub Pages / Netlify)
├── index.html
├── assets/css/tailwind.css   (ไฟล์ที่ build แล้ว — ห้ามแก้ตรง)
├── assets/js/  assets/img/  assets/css/pages.css (สไตล์ของหน้า /projects/)
├── data/portfolio.json
└── projects/
    ├── index.html            (หน้ารวมโปรเจกต์ /projects/ — อ่านจาก data/portfolio.json อัตโนมัติ)
    ├── bda-mcu-phrae/        (ทัวร์ 360° + โมเดล 3 มิติ หอพุทธศิลป์ — อัปโหลดขึ้นโฮสต์เอง จึงไม่มีโฟลเดอร์ใน `site/`; อยู่ใน `HOST_ONLY` ของ `scripts/check_site.py`)
    └── formsmith/            (Formsmith — ตัวสร้างเว็บฟอร์ม ดีพลอยบนเซิร์ฟเวอร์มหาวิทยาลัยแยกจาก repo นี้ จึงไม่มีโฟลเดอร์ใน `site/`; ลิงก์อยู่ใน `site/data/portfolio.json` และอยู่ใน `HOST_ONLY` ของ `scripts/check_site.py`)
src/tailwind.css      ← CSS ต้นฉบับของ Tailwind (เอฟเฟกต์ที่ utility ทำไม่ได้)
tailwind.config.js    ← สี ฟอนต์ แอนิเมชันของธีม
scripts/              ← สคริปต์ build/ตรวจ/แปลภาษา (`build_deploy.py`, `check_site.py`, `fetch_projects.py`, `translate.mjs`, `build_pdf.mjs`)
infra/vps/            ← ชุดติดตั้งบน VPS ของตัวเอง (Nginx + HTTPS) อยู่นอก `site/` เพื่อไม่ถูกเผยแพร่ ดู `infra/vps/README.md`
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
| `infra/vps/` | ติดตั้งและ deploy บน VPS ของตัวเอง: `setup-server.sh` (ครั้งเดียว), `deploy.sh` (ทุกครั้งที่อัปเดต), `nginx/portfolio.conf` |
| `scripts/translate.mjs` | สคริปต์เติมคำแปลที่ขาดลงใน `site/data/portfolio.json` |
| `.github/workflows/static.yml` | GitHub Action: build แล้ว deploy ขึ้น GitHub Pages |
| `.github/workflows/translate.yml` | GitHub Action: เติมคำแปลที่ขาดแล้วเปิด PR ให้ตรวจ |

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

**ผลงานเด่น (Featured)** — ใส่ `"featured": { … }` ในผลงานชิ้นใดก็ได้ (ตอนนี้คือ Precision-QC, IV-Monitor-BCNPH, BDA-MCU-PHRAE และ Formsmith ตามลำดับที่ปรากฏในหน้าเว็บ) ระบบจะสร้างส่วน "ผลงานเด่น" ต่อจากทักษะ ประกอบด้วย `subtitle`, `summary`, `gallery` (ภาพ + คำบรรยาย), `metrics`, `highlights` (การ์ด JavaScript / Python พร้อมรายการจุดเด่น) และ `stack` — ภาพอยู่ใน `site/assets/img/projects/<ชื่อโปรเจกต์>/`

**รูปโปรไฟล์** — วางรูปไว้ที่ `site/assets/img/` แล้วใส่ path ใน `profile.photo`

**ไฟล์ CV** — วางไฟล์ PDF ไว้ที่ `site/assets/` แล้วใส่ path ใน `profile.cv` (เช่น `"assets/cv.pdf"`) ปุ่ม "ดาวน์โหลด CV" จะแสดงขึ้นอัตโนมัติ

**ข้อความหน้าแรก** — `profile.tagline` (ป้ายเล็ก), `profile.slogan` (ข้อความตัวใหญ่), `profile.intro` (คำแนะนำตัว), `profile.motto` (ปณิธานในส่วนติดต่อ)

**SEO** — `profile.seoDescription` คือคำอธิบายสำหรับ Google และการแชร์ในแต่ละภาษา (ไม่ใส่จะใช้ `profile.intro`) ส่วนแท็กคงที่, Open Graph และ JSON-LD (Person + ผลงานเด่น) อยู่ใน `<head>` ของ `site/index.html`

วันที่ใช้รูปแบบ ค.ศ. `YYYY-MM-DD` หรือใส่แค่ปี ค.ศ. เช่น `"2013"` ก็ได้ เมื่อแสดงเป็นภาษาไทยจะเปลี่ยนเป็น พ.ศ. ให้อัตโนมัติ (`"end": null` หมายถึง "ปัจจุบัน")

## ระบบแปลภาษาอัตโนมัติ

1. **ตอน push `site/data/portfolio.json` ขึ้น `main`**: workflow `translate.yml` รัน `scripts/translate.mjs` เติมภาษาที่ขาด แล้ว**เปิด Pull request** จาก branch `auto/translations` ให้ตรวจก่อน (โดยเฉพาะภาษาญี่ปุ่น/จีนที่เป็นการแปลด้วยเครื่อง) แก้ใน branch นั้นได้โดยตรง เมื่อ merge แล้วจึง deploy — ไม่มีการ commit คำแปลเข้า `main` เอง
   - ตั้งค่าครั้งเดียว: *Settings → Actions → General → Workflow permissions* ติ๊ก **Allow GitHub Actions to create and approve pull requests**
   - PR ที่ workflow เปิดเองจะไม่ trigger workflow "Check site" (ข้อจำกัดของ `GITHUB_TOKEN`) แต่การแปลแก้เฉพาะ `portfolio.json`
   - ระหว่างที่ PR ยังไม่ merge ข้อความที่ยังไม่มีคำแปลจะใช้การแปลในเบราว์เซอร์ (ข้อ 2) แทน
   - workflow "Deploy to Pages" ไม่แปลหรือ commit อะไรแล้ว แค่ build และ deploy จาก `main`
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
- ทัวร์ 360° และโมเดล 3 มิติ หอพุทธศิลป์ **ไม่อยู่ใน `deploy/`** ให้อัปโหลดโฟลเดอร์ `deploy/dist` ของ repo BDA-MCU-PHRAE ไปที่ `public_html/projects/bda-mcu-phrae/` เอง (ดูหัวข้อถัดไป) การอัปโหลดอัตโนมัติแบบเพิ่ม/เขียนทับอย่างเดียวจึงไม่กระทบโฟลเดอร์นี้
- โฟลเดอร์ `deploy/` และไฟล์ zip ไม่ถูก commit (อยู่ใน `.gitignore`) สร้างใหม่ได้ทุกเมื่อ

### ทัวร์ 360° (BDA-MCU-PHRAE) — อัปโหลดเอง

ทัวร์ (`deploy/dist/` ของ repo [BDA-MCU-PHRAE](https://github.com/kittiphunr/BDA-MCU-PHRAE) ซึ่งเป็น private, ~30 MB) **ไม่ได้อยู่ใน repo นี้และไม่ถูกดาวน์โหลดตอน build หรือใน CI** ให้ build ทัวร์ใน repo นั้น แล้วอัปโหลดผลลัพธ์ไปที่ `projects/bda-mcu-phrae/` บนโฮสต์ด้วยตัวเอง (FTP/SFTP/rsync) เว็บ portfolio ลิงก์ไปที่ `https://kittiphun.rut.mcupr.ac.th/projects/bda-mcu-phrae/` อยู่แล้ว

- `scripts/check_site.py` ถือว่าโฟลเดอร์นี้อยู่เฉพาะบนโฮสต์ (`HOST_ONLY`) จึงไม่ error เมื่อไม่มีไฟล์ใน `site/`
- `scripts/fetch_projects.py` ยังอยู่ แต่ `PROJECTS` ว่าง ใช้เมื่อต้องการให้ build ดึงโปรเจกต์จาก repo public มาใส่ `site/projects/` อีกครั้ง (รองรับ `PROJECTS_TOKEN` สำหรับ repo private)

### ตรวจอัตโนมัติก่อน merge (Pull request)

workflow `.github/workflows/check.yml` รันทุก PR ที่เข้า `main`: build Tailwind, รัน `python3 scripts/check_site.py` และลอง build โฟลเดอร์ `deploy/` สคริปต์ตรวจว่า
- `portfolio.json` เป็น JSON ที่ถูกต้อง และไฟล์ที่อ้างถึง (`assets/...` รูป, PDF) มีอยู่จริง
- `href`/`src` ภายในหน้า HTML ไม่ชี้ไปไฟล์ที่ไม่มี
- URL ใน `sitemap.xml` และลิงก์โปรเจกต์บนโดเมนหลักมีไฟล์รองรับ (โฟลเดอร์ที่มีแต่บนโฮสต์ เช่น โฟลเดอร์ที่ตั้งใจให้มีแต่บนโฮสต์ ให้เพิ่มใน `HOST_ONLY` ของสคริปต์)
- ไฟล์ JS ใน `site/assets/js/` ไม่มี syntax error

รันในเครื่องได้เลย: `python3 scripts/check_site.py` (ต้องมี Node.js)

### Deploy ขึ้นโฮสต์อัตโนมัติ (GitHub Action)

workflow `.github/workflows/deploy-host.yml` build แล้วอัปโหลดขึ้นโฮสต์ผ่าน FTPS/SFTP ทุกครั้งที่ workflow "Deploy to Pages" บน `main` ทำงานสำเร็จ (หรือกด Run workflow เอง) — **ยังไม่ทำงานจนกว่าจะตั้งค่า secrets** จึง merge ก่อนได้โดยไม่มีผลกับโฮสต์

ตั้งค่าที่ *Settings → Secrets and variables → Actions*

| ชื่อ | ชนิด | ค่า |
| --- | --- | --- |
| `HOST_FTP_HOST` | secret | ชื่อเซิร์ฟเวอร์ FTP/SFTP ของโฮสต์ |
| `HOST_FTP_USER` / `HOST_FTP_PASSWORD` | secret | บัญชี FTP (แนะนำให้สร้างบัญชีที่เข้าได้เฉพาะโฟลเดอร์ของเว็บนี้) |
| `HOST_REMOTE_DIR` | variable | โฟลเดอร์เว็บบนโฮสต์ เช่น `/public_html` (ค่าเริ่มต้น) |
| `HOST_FTP_PROTOCOL` | variable | `ftps` (ค่าเริ่มต้น, explicit FTPS พอร์ต 21) · `sftp` · `ftp` (ไม่เข้ารหัส ไม่แนะนำ) |
| `HOST_FTP_PORT`, `HOST_FTP_VERIFY_CERT`, `HOST_SSH_KNOWN_HOSTS` | ไม่บังคับ | พอร์ต / ปิดการตรวจใบรับรองถ้าชื่อไม่ตรง (`no`) / host key สำหรับ sftp |

- **เพิ่ม/ทับไฟล์เท่านั้น ไม่ลบไฟล์บนโฮสต์** โฟลเดอร์ที่มีแต่บนโฮสต์ (ถ้ามี) จึงไม่ถูกแตะ ไฟล์ที่ลบออกจาก repo ต้องลบบนโฮสต์เอง
- **ไม่อัปโหลด `.htaccess` ของรากเว็บ** เพื่อไม่ทับของเดิมบนโฮสต์ ถ้าต้องการให้ติ๊ก `upload_htaccess` ตอนกด Run workflow
- **ลองก่อนด้วย dry run:** *Actions → Deploy to university host → Run workflow* (ค่าเริ่มต้นคือ dry run แสดงรายการไฟล์โดยไม่อัปโหลด) ตรวจ log แล้วค่อยรันจริงโดยเอาติ๊ก dry run ออก
- ถ้าต้องการให้ต้องกดอนุมัติก่อนอัปโหลดทุกครั้ง ให้ตั้ง *Required reviewers* ที่ environment `production`

## ทดสอบในเครื่อง

```bash
python3 -m http.server 8000 --directory site
# เปิด http://localhost:8000  (หรือ ?lang=en / ja / zh)
```

> ต้องเปิดผ่าน web server เพราะเบราว์เซอร์ไม่อนุญาตให้โหลด JSON จาก `file://`

## โครงสร้างโปรเจกต์ใน `/projects/` (มาตรฐาน)

- `https://kittiphun.rut.mcupr.ac.th/projects/` คือหน้ารวมโปรเจกต์ (`site/projects/index.html` + `assets/js/projects.js`) สร้างการ์ดจาก `projects` ใน `site/data/portfolio.json` จึง**เพิ่มโปรเจกต์ใน JSON ที่เดียว** หน้านี้ก็แสดงให้เอง (รองรับ 4 ภาษา)
- repo นี้เก็บแค่หน้าหลักและ `site/projects/index.html` ส่วนโปรเจกต์ที่มีหน้าเว็บของตัวเอง (`projects/<ชื่อ>/`: Precision QC, ทัวร์ 360°, Formsmith) **อัปโหลดขึ้นโฮสต์เอง** ไม่อยู่ใน `site/` ให้ใส่ URL ของโปรเจกต์ในช่อง `link` ของ `portfolio.json` และเพิ่มชื่อโฟลเดอร์ใน `HOST_ONLY` ของ `scripts/check_site.py`

### Precision QC (`projects/precision-qc-web/`) — อัปโหลดเอง

เป็นเว็บแอป static (ประมวลผลภาพในเบราว์เซอร์ด้วย Pyodide) ที่ build จาก repo [Precision-QC](https://github.com/kittiphunr/Precision-QC) ไม่อยู่ใน repo นี้แล้ว ให้ build ใน repo นั้นแล้วอัปโหลดไปที่ `projects/precision-qc-web/` บนโฮสต์เอง

```bash
cd ../Precision-QC && python scripts/build_site.py --out deploy --lock-domain kittiphun.rut.mcupr.ac.th
```

- รากของโฟลเดอร์ที่อัปโหลดคือ `deploy/dashboard/` (เวอร์ชันที่แสดงในพอร์ตโฟลิโอ) ส่วน `dashboard`, `pure`, `lab`, `tailwind` อัปโหลดเป็นโฟลเดอร์ย่อย
- ถ้าเพิ่มโดเมนอื่นให้แอปทำงาน ต้องเพิ่ม `--lock-domain` ตอน build

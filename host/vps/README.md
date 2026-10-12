# ติดตั้งบน VPS ของตัวเอง (Nginx + HTTPS)

ชุดไฟล์นี้อยู่นอก `site/` ตั้งใจให้ไม่ถูก deploy ขึ้นเว็บ (ไม่ให้ใครเปิดดูค่าตั้งของเซิร์ฟเวอร์ได้)

| ไฟล์ | ใช้ทำอะไร |
|---|---|
| `setup-server.sh` | รันครั้งเดียวบน VPS: ติดตั้ง Nginx + certbot, เปิดไฟร์วอลล์, ตั้งค่าเว็บ, ขอ HTTPS |
| `nginx.conf` | แม่แบบ server block (สคริปต์ข้างบนเติมโดเมนให้เอง) |
| `deploy-vps.sh` | รันบนเครื่องคุณ: build เว็บแล้ว rsync ขึ้น VPS ใช้ซ้ำได้ทุกครั้งที่อัปเดต |

## ก่อนเริ่ม
- VPS Ubuntu/Debian ที่ SSH เข้าได้ และบัญชีที่ใช้ `sudo` ได้
- DNS: A record ของโดเมนชี้มาที่ IP ของ VPS (certbot ต้องใช้)
- เครื่องคุณมี `python3`, `node`/`npm`, `rsync`

## 1) ตั้งค่าเซิร์ฟเวอร์ (ครั้งเดียว)
คัดลอกโฟลเดอร์นี้ขึ้นเซิร์ฟเวอร์แล้วรัน
```bash
scp -r host/vps user@SERVER_IP:~/vps
ssh user@SERVER_IP
sudo bash ~/vps/setup-server.sh example.com you@example.com
```
ค่าเริ่มต้นของโฟลเดอร์เว็บคือ `/var/www/portfolio` (ใส่อาร์กิวเมนต์ที่ 3 เพื่อเปลี่ยน)

## 2) build และอัปโหลด (ทุกครั้งที่อัปเดต)
```bash
bash host/vps/deploy-vps.sh example.com user@SERVER_IP
```
สคริปต์จะ build CSS → สร้าง `deploy/` โดยเปลี่ยน URL ในหน้าเว็บ, sitemap และ robots.txt เป็นโดเมนของคุณ → rsync ขึ้นเซิร์ฟเวอร์ ปกติไฟล์ถูกเพิ่มหรือเขียนทับเท่านั้น ใส่ `DELETE=1` นำหน้าคำสั่งถ้าต้องการลบไฟล์ที่ไม่มีใน build แล้ว

## ข้อควรรู้
- `.htaccess` ใช้กับ Apache เท่านั้น Nginx ไม่อ่าน สคริปต์จึงไม่อัปโหลด และ `nginx.conf` มีกฎเทียบเท่า (บีบอัด, แคช, security headers) ให้แล้ว
- ทัวร์ 360° หอพุทธศิลป์ (`projects/bda-mcu-phrae/`) และ Formsmith ให้อัปโหลดเอง สคริปต์จะไม่แตะสองโฟลเดอร์นี้ (แม้ใช้ `DELETE=1`) ลิงก์ในเว็บยังชี้ไปที่โดเมนมหาวิทยาลัยเดิม
- ต่ออายุใบรับรองอัตโนมัติ: certbot ตั้ง timer ให้เอง ตรวจได้ด้วย `sudo certbot renew --dry-run`
- ตรวจสอบ: `curl -I https://example.com/` ควรได้ `200`

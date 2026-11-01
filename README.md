# ระบบควบคุมระดับน้ำด้วย PI — เว็บไซต์โครงงาน

เว็บไซต์ static (HTML/CSS/JS ล้วน ไม่มีระบบหลังบ้าน ไม่ต้องล็อกอิน) สำหรับเผยแพร่ผ่าน GitHub Pages
เนื้อหามาจากสไลด์นำเสนอ V7 จัดใหม่ให้อ่านต่อเนื่องบนคอมพิวเตอร์ แท็บเล็ต และโทรศัพท์

- เวอร์ชันเว็บไซต์: **v1.0 · 1 พฤศจิกายน 2026**
- อ้างอิงชุดไฟล์โครงงาน: WaterLevel_Project_2026-10-31_v1.0.zip (v1.0 · จัดชุด 31 ตุลาคม 2026) — ไม่ได้รวมไว้ในเว็บไซต์

## โครงสร้างไฟล์

```
index.html                 หน้าเว็บทั้งหมด
.nojekyll                  ให้ GitHub Pages เสิร์ฟไฟล์ตามที่อยู่ ไม่ผ่าน Jekyll
assets/css/site.css        สีและการจัดหน้า
assets/js/config.js        ค่าที่แก้ได้: ลิงก์วิดีโอ, ลิงก์ดาวน์โหลดชุดโปรเจกต์, เวอร์ชันเว็บไซต์
assets/js/site.js          เมนู ขยายภาพ ปุ่มกลับด้านบน วิดีโอ แอนิเมชันถังน้ำ
assets/images/             ภาพถ่ายและกราฟจากสไลด์/ผลทดลอง และภาพที่ครอปจาก PDF
assets/documents/          PDF เทียบค่า PV กับสเกลจริง
assets/fonts/              ฟอนต์ Kanit และ Sarabun (SIL Open Font License)
assets/video/demo_720p.mp4 วิดีโอสาธิต (สำเนา H.264 720p · 46.7 MB) — ดูหัวข้อ 4
```

ทุกลิงก์ในเว็บไซต์เป็นพาธสัมพัทธ์ จึงทำงานได้ทั้งที่ `https://<username>.github.io/<repository>/` และเมื่อเปิดในเครื่อง

## 1. เปิดเว็บไซต์ในเครื่อง

- แตก ZIP แล้วดับเบิลคลิก `index.html` ได้ทันที
- หรือเปิดผ่านเว็บเซิร์ฟเวอร์ในเครื่อง (ใกล้เคียงการใช้งานจริงมากกว่า) จากโฟลเดอร์ที่มี `index.html`:
  ```
  python -m http.server 8000
  ```
  แล้วเปิด `http://localhost:8000/`

## 2. อัปโหลดไฟล์ไปยัง repository

> **ข้อจำกัดของ GitHub (ตรวจ 1 พ.ย. 2026):** อัปโหลดผ่านหน้าเว็บ GitHub ได้ไฟล์ละไม่เกิน 25 MiB · git push เตือนเมื่อไฟล์เกิน 50 MiB และปฏิเสธเมื่อเกิน 100 MiB · เว็บไซต์ GitHub Pages รวมไม่เกิน 1 GB และแบนด์วิดท์ประมาณ 100 GB/เดือน · ไฟล์ที่เก็บด้วย Git LFS ใช้กับ GitHub Pages ไม่ได้
>
> วิดีโอ `demo_720p.mp4` มีขนาด 46.7 MiB จึง **อัปโหลดผ่านหน้าเว็บไม่ได้** ให้ใช้ GitHub Desktop หรือ git (วิธี ก/ข) หรือใช้วิธี ค

**ก. GitHub Desktop (แนะนำ ไม่ต้องพิมพ์คำสั่ง)**
1. สร้าง repository ใหม่บน GitHub (เช่น `water-level-pi`) เลือก Public
2. ใน GitHub Desktop: File → Clone repository → เลือก repository นั้น
3. คัดลอกไฟล์ทั้งหมดในโฟลเดอร์นี้ (รวม `.nojekyll`) ไปไว้ในโฟลเดอร์ที่ clone มา โดยให้ `index.html` อยู่ชั้นบนสุด
4. ใส่ข้อความ commit แล้วกด Commit to main → Push origin

**ข. git command line**
```
git init
git add .
git commit -m "Website v1.0"
git branch -M main
git remote add origin https://github.com/<username>/<repository>.git
git push -u origin main
```

**ค. อัปโหลดผ่านหน้าเว็บ GitHub (ไม่รวมวิดีโอ)**
1. ลบโฟลเดอร์ `assets/video/` ออกก่อน และแก้ `videoUrl` ใน `assets/js/config.js` เป็น `""` (หรือใส่ลิงก์ YouTube ตามหัวข้อ 4)
2. ใน repository: Add file → Upload files → ลากไฟล์และโฟลเดอร์ทั้งหมดเข้าไป → Commit changes
3. ตรวจว่ามีไฟล์ `.nojekyll` ด้วย (บางเบราว์เซอร์ซ่อนไฟล์ที่ขึ้นต้นด้วยจุด หากไม่มีให้ Add file → Create new file ตั้งชื่อ `.nojekyll` เว้นว่างไว้)

## 3. ตั้งค่า GitHub Pages

1. ใน repository ไปที่ **Settings → Pages**
2. หัวข้อ **Build and deployment** → Source เลือก **Deploy from a branch**
3. Branch เลือก **main** และโฟลเดอร์ **/ (root)** → **Save**
4. รอประมาณ 1–2 นาที แล้วรีเฟรชหน้า Settings → Pages จะเห็นลิงก์ `https://<username>.github.io/<repository>/`
5. เปิดลิงก์ ตรวจว่ารูป วิดีโอ และปุ่ม PDF ทำงาน ก่อนส่งให้เพื่อน

หมายเหตุ: บัญชีฟรีต้องตั้ง repository เป็น Public จึงใช้ GitHub Pages ได้ — ทุกไฟล์ใน repository (รวมวิดีโอและ PDF ที่มีภาพบุคคล) จะเปิดดูได้สาธารณะ

## 4. วิดีโอ: ใช้ไฟล์ใน repository หรือโฮสต์ภายนอก

ตั้งค่าที่จุดเดียว: `assets/js/config.js` บรรทัด `videoUrl`

| ตัวเลือก | ค่า `videoUrl` |
|---|---|
| ไฟล์ใน repository (ค่าเริ่มต้น) | `"assets/video/demo_720p.mp4"` |
| YouTube (เช่น ตั้งเป็น Unlisted) | `"https://www.youtube.com/watch?v=XXXXXXXXXXX"` หรือ `"https://youtu.be/XXXXXXXXXXX"` |
| ไฟล์ MP4 ภายนอกที่เล่นในเบราว์เซอร์ได้ | `"https://.../video.mp4"` |
| ยังไม่มีวิดีโอ | `""` — เว็บแสดงภาพนิ่งพร้อมข้อความ ไม่มีเครื่องเล่นเสีย |

- เครื่องเล่นไม่เล่นอัตโนมัติ และโหลดวิดีโอเมื่อกดเล่นเท่านั้น
- หากใช้ YouTube ให้ลบ `assets/video/` ออกเพื่อลดขนาด repository
- ไฟล์ต้นฉบับ `Mini project present.mov` (HEVC 1080p, ~632 MB) ไม่ได้ใส่ในเว็บไซต์ เพราะเกินขีดจำกัดของ repository และเบราว์เซอร์หลายตัวเล่น HEVC ไม่ได้ · สำเนา `demo_720p.mp4` ทำจากต้นฉบับโดยไม่ตัดต่อ (H.264/AAC 1280×720, 7:48)

## 5. ปุ่มดาวน์โหลดชุดโปรเจกต์ (ไม่บังคับ)

ปุ่มนี้ซ่อนอยู่จนกว่าจะมีลิงก์จริง
1. ใน repository: **Releases → Draft a new release** → สร้าง tag เช่น `project-v1.0`
2. แนบไฟล์ `WaterLevel_Project_2026-10-31_v1.0.zip` → **Publish release**
3. คลิกขวาที่ชื่อไฟล์ใน Release → คัดลอกลิงก์
4. ใส่ลิงก์ใน `assets/js/config.js` บรรทัด `projectZipUrl` แล้ว commit/push

## 6. อัปเดตเว็บไซต์ภายหลัง

1. แก้ไฟล์ (เช่น ข้อความใน `index.html` หรือค่าใน `assets/js/config.js`)
2. ถ้าเปลี่ยนเนื้อหา ให้แก้ `siteVersion` ใน `config.js` เช่น `"เว็บไซต์ v1.1 · <วันที่>"` (แยกจากเวอร์ชันชุดไฟล์โครงงาน)
3. Commit แล้ว Push (หรืออัปโหลดไฟล์ที่แก้ผ่านหน้าเว็บ) — GitHub Pages จะอัปเดตเองภายในไม่กี่นาที
4. ถ้าเปลี่ยนชื่อไฟล์ภาพ ให้ตรวจตัวพิมพ์เล็ก–ใหญ่ให้ตรงกับใน `index.html` (บน GitHub ตัวพิมพ์ต่างกันถือเป็นคนละไฟล์)

## ไม่ได้รวมไว้

- ชุดข้อมูลทดลองและไฟล์โปรแกรมทั้งหมด (อยู่ในชุด WaterLevel_Project_2026-10-31_v1.0.zip)
- รหัสผ่าน token หรือไฟล์ตั้งค่าบัญชีใด ๆ

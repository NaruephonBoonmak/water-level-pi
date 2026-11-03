# ระบบควบคุมระดับน้ำด้วย PI — สไลด์นำเสนอออนไลน์

สไลด์นำเสนอ HTML (38 หน้า, 16:9) เปิดดูผ่านลิงก์ GitHub Pages:
**https://naruephonboonmak.github.io/water-level-pi/**

- เวอร์ชันสไลด์: v1.4 · 3 พฤศจิกายน 2026 (แยกจากชุดไฟล์โครงงาน WaterLevel_Project_2026-10-31_v1.0)
- ฉบับเว็บไซต์เลื่อนอ่าน (ก่อนหน้า) เก็บไว้ที่ tag `website-v1.0` ใน repository นี้

## วิธีใช้
- ปุ่ม ‹ › ด้านล่าง หรือปุ่มลูกศร ← → / Space · คลิกบนสไลด์ = ถัดไป
- ⛶ หรือกด F = เต็มจอ · N = บันทึกผู้บรรยาย · Ctrl+P = พิมพ์/PDF
- หน้า V-Model (6) เปิดทีละขั้น · หน้าวิดีโอ (37) กด ▶ เพื่อเล่น และหยุดเองเมื่อเปลี่ยนสไลด์

## ไฟล์
```
index.html                     สไลด์ทั้งหมด (ฟอนต์/สมการ/สคริปต์ในไฟล์ ไม่โหลดจากอินเทอร์เน็ต)
assets/                        ภาพ กราฟ ภาพจาก PDF
assets/fonts/                  Kanit, Sarabun (SIL Open Font License)
assets/video/demo_720p.mp4     วิดีโอสาธิต H.264 720p (46.7 MB)
assets/documents/              PDF เทียบค่า PV กับสเกลจริง
.nojekyll                      ให้ GitHub Pages เสิร์ฟไฟล์ตามที่อยู่
```

## เปิดในเครื่อง
แตก ZIP แล้วดับเบิลคลิก `index.html`

## อัปเดตภายหลัง
แก้ `index.html` แล้ว commit + push ไปที่ branch `main` — GitHub Pages อัปเดตเองภายในไม่กี่นาที
ไฟล์ใหญ่กว่า 25 MB (เช่น วิดีโอ) อัปโหลดผ่านหน้าเว็บ GitHub ไม่ได้ ให้ใช้ git หรือ GitHub Desktop

## ภาพ Simulink Model
- หน้า 11: ภาพรวมโมเดลที่ใช้จริง พร้อมลิงก์ภาพภายใน Real
- หน้า 12: ภายใน ControlCore และ PI_Enable พร้อม PWM mapping
- ภาพส่งออกจาก MATLAB/Simulink โดยไม่รันหรืออัปโหลดอุปกรณ์

## โมเดลจำลอง MIL
- หน้า 15: ภาพ Simulink Model สำหรับจำลอง Controller และ Plant บนคอมพิวเตอร์
- หน้า 16: ภายใน Plant_Model — Motor_Lag, Flow_Balance และ Water_Level Integrator
- ภาพจาก water_level_MIL_STEP.slx ใช้ประกอบการอธิบายผล MIL ที่มีอยู่ ไม่ได้รันการทดลองใหม่

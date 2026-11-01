/* =====================================================================
   ระบบควบคุมระดับน้ำด้วย PI — สคริปต์เว็บไซต์ (ไม่มี library ภายนอก)
   เมนู · ไฮไลต์หัวข้อ · ขยายภาพ · ปุ่มกลับด้านบน · วิดีโอ · ปุ่มดาวน์โหลด · แอนิเมชันถังน้ำ
   ===================================================================== */
(() => {
  const cfg = window.SITE_CONFIG || {};

  /* ---------- เมนูบนโทรศัพท์ ---------- */
  const menuBtn = document.getElementById('menuBtn'), links = document.getElementById('navlinks');
  menuBtn.addEventListener('click', () => { const o = links.classList.toggle('open'); menuBtn.setAttribute('aria-expanded', String(o)); });
  links.addEventListener('click', e => { if (e.target.closest('a')) { links.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); } });

  /* ---------- ไฮไลต์หัวข้อที่กำลังอ่าน ---------- */
  const navA = [...links.querySelectorAll('a[href^="#"]')];
  const secs = navA.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  const io = new IntersectionObserver(es => {
    es.forEach(e => { if (e.isIntersecting) navA.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id)); });
  }, { rootMargin: '-45% 0px -50% 0px' });
  secs.forEach(s => io.observe(s));

  /* ---------- ขยายภาพ ---------- */
  const lb = document.getElementById('lightbox'), lbImg = lb.querySelector('img'), lbCap = lb.querySelector('.cap');
  let lastFocus = null;
  const openLb = img => { lastFocus = document.activeElement; lbImg.src = img.currentSrc || img.src; lbImg.alt = img.alt; lbCap.textContent = img.alt; lb.classList.add('open'); lb.querySelector('.x').focus(); };
  const closeLb = () => { lb.classList.remove('open'); lbImg.removeAttribute('src'); if (lastFocus) lastFocus.focus(); };
  document.querySelectorAll('img.zoomable').forEach(img => {
    img.tabIndex = 0; img.setAttribute('role', 'button'); img.title = 'คลิกเพื่อขยายภาพ';
    img.addEventListener('click', () => openLb(img));
    img.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLb(img); } });
  });
  lb.addEventListener('click', e => { if (e.target === lb || e.target.closest('.x')) closeLb(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && lb.classList.contains('open')) closeLb(); });

  /* ---------- ปุ่มกลับด้านบน ---------- */
  const top = document.getElementById('totop');
  addEventListener('scroll', () => top.classList.toggle('show', scrollY > 700), { passive: true });
  top.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---------- ปุ่มดาวน์โหลดชุดโปรเจกต์ (แสดงเมื่อมีลิงก์จริงเท่านั้น) ---------- */
  document.querySelectorAll('[data-project-zip]').forEach(el => {
    if (cfg.projectZipUrl) { el.href = cfg.projectZipUrl; el.hidden = false; } else { el.remove(); }
  });
  document.querySelectorAll('[data-site-version]').forEach(el => { el.textContent = cfg.siteVersion || ''; });

  /* ---------- วิดีโอ ---------- */
  // ไม่เล่นอัตโนมัติ · ไม่โหลดไฟล์ก่อนกดเล่น · เล่นได้ทีละตัว
  const pauseOthers = except => {
    document.querySelectorAll('video').forEach(v => { if (v !== except && !v.paused) v.pause(); });
    document.querySelectorAll('iframe[data-yt]').forEach(f => { if (f !== except) f.contentWindow && f.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*'); });
  };
  document.addEventListener('play', e => { if (e.target.tagName === 'VIDEO') pauseOthers(e.target); }, true);
  const ytId = u => { const m = String(u).match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/))([\w-]{11})/); return m ? m[1] : null; };
  document.querySelectorAll('[data-video]').forEach(box => {
    const url = (cfg.videoUrl || '').trim(), title = box.dataset.title || 'วิดีโอ';
    const msg = box.querySelector('.msg');
    if (!url) return;                                  // ยังไม่มีลิงก์ → คงภาพตัวอย่างและข้อความไว้
    const id = ytId(url);
    msg.innerHTML = '<button class="play" type="button" aria-label="เล่นวิดีโอ: ' + title + '">▶</button><span>' + title + '</span>';
    msg.querySelector('.play').addEventListener('click', () => {
      pauseOthers(null);
      if (id) {
        const f = document.createElement('iframe');
        f.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0&enablejsapi=1&playsinline=1';
        f.title = title; f.dataset.yt = '1'; f.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen'; f.allowFullscreen = true;
        box.replaceChildren(f);
      } else {
        const v = document.createElement('video');
        v.controls = true; v.preload = 'metadata'; v.playsInline = true; v.poster = box.dataset.poster || ''; v.src = url;
        v.setAttribute('aria-label', title);
        v.addEventListener('error', () => { box.innerHTML = '<img class="poster" src="' + (box.dataset.poster || '') + '" alt=""><div class="msg">เปิดวิดีโอไม่ได้<small>ตรวจลิงก์ใน assets/js/config.js</small></div>'; });
        box.replaceChildren(v); v.play().catch(() => {});
      }
    });
  });

  /* ---------- แอนิเมชันถังน้ำ: เล่นเมื่ออยู่ในจอ หยุดเมื่อเลื่อนผ่าน ---------- */
  const tankRoot = document.getElementById('tankSim');
  if (tankRoot) {
    new IntersectionObserver(es => es.forEach(e => {
      tankRoot.classList.toggle('active', e.isIntersecting);
      if (e.isIntersecting) document.dispatchEvent(new CustomEvent('slidechange', { detail: { slide: tankRoot } }));
    }), { threshold: 0.25 }).observe(tankRoot);
  }
})();

/* แอนิเมชันถังน้ำแนวคิด (นำมาจากสไลด์ V7) — ไม่ใช่ข้อมูลทดลอง */
const Tank = (() => {
  const root = document.getElementById('tankSim'); if (!root) return null;
  const slide = root;
  const q = id => root.querySelector('#' + id);
  const el = { water: q('tkWater'), surf: q('tkSurf'), beam: q('tkBeam'), pulses: [...q('tkPulses').children], d: q('tkD'), pv: q('tkPV'),
               imp: q('tkImp'), pow: q('tkPow'), qin: q('tkQin'), qout: q('tkQout'), badge: q('tkBadge'), dots: [...q('tkDots').children], text: q('tkText') };
  const SP = 200, H0 = 100, PSS = 0.45, K = 26, KP = 0.03, HOLD = 2.6, RAMP = 1.0, DRAIN_X = 3;
  const Y = h => 630 - 1.04 * h;                       // mm → พิกัด y ในภาพ (ถังสูง 500 mm)
  const qout = h => PSS * Math.sqrt(Math.max(h, 0) / SP);
  const STEPS = ['ปั๊มเริ่มทำงาน', 'Qin ไหลเข้า → ระดับน้ำเพิ่ม · เซนเซอร์วัด PV', 'ใกล้ SP → ปั๊มลดกำลังจน Qin ≈ Qout', 'ระดับนิ่งที่ SP', 'ปั๊มหยุด → น้ำไหลออกเองทางท่อ → เริ่มรอบใหม่'];
  let s, raf = 0, last = 0;
  const reset = () => { s = { phase: 0, tp: 0, h: H0, pv: H0, p: 0, din: 0, dout: 0, rot: 0, pulse: 0, wave: 0 }; };
  function step(dt) {
    s.tp += dt; let k = 1;
    if (s.phase === 0) { s.p = Math.min(1, s.tp / RAMP); if (s.tp >= RAMP) { s.phase = 1; s.tp = 0; } }
    else if (s.phase === 1) {
      const tgt = Math.max(0, Math.min(1, PSS + KP * (SP - s.h)));
      s.p += (tgt - s.p) * Math.min(1, dt * 8);
      if (Math.abs(SP - s.h) < 0.3 && s.tp > 1) { s.phase = 2; s.tp = 0; }
    } else if (s.phase === 2) { s.p = Math.max(0, Math.min(1, PSS + KP * (SP - s.h))); if (s.tp >= HOLD) { s.phase = 3; s.tp = 0; } }
    else { k = DRAIN_X; s.p = Math.max(0, s.p - dt * 4); if (s.h <= H0) { s.h = H0; s.phase = 0; s.tp = 0; } }
    s.h += K * (s.p - qout(s.h)) * dt * k;
    s.pv += (s.h - s.pv) * (1 - Math.exp(-dt * k / 0.9));
    s.din += 130 * s.p * dt; s.dout += 130 * qout(s.h) * dt * k;
    s.rot = (s.rot + 900 * s.p * dt) % 360; s.pulse = (s.pulse + dt / 1.1) % 1; s.wave += dt * 2.2;
  }
  function stepLabel() { return s.phase === 0 ? 0 : s.phase === 1 ? (s.p > 0.98 ? 1 : 2) : s.phase === 2 ? 3 : 4; }
  function render() {
    const y = Y(s.h);
    el.water.setAttribute('y', y.toFixed(1)); el.water.setAttribute('height', (632 - y).toFixed(1));
    let d = 'M332 ' + (y + 6).toFixed(1);
    for (let x = 332; x <= 588; x += 8) d += ' L' + x + ' ' + (y + 3 * Math.sin(x / 22 + s.wave)).toFixed(1);
    el.surf.setAttribute('d', d + ' L588 ' + (y + 8) + ' Z');
    el.beam.setAttribute('y2', (y - 4).toFixed(1));
    el.pulses.forEach((pp, i) => { const f = (s.pulse + i / 3) % 1; pp.setAttribute('transform', 'translate(460 ' + (118 + f * (y - 126)).toFixed(1) + ')'); pp.setAttribute('opacity', (0.95 * (1 - f * f)).toFixed(2)); });
    el.d.setAttribute('y', ((112 + y) / 2).toFixed(1));
    el.pv.textContent = s.pv.toFixed(1) + ' mm';
    el.imp.setAttribute('transform', 'translate(130 585) rotate(' + s.rot.toFixed(1) + ')');
    el.pow.setAttribute('width', (100 * s.p).toFixed(1));
    el.qin.style.strokeDashoffset = (-s.din).toFixed(1); el.qin.style.opacity = s.p > 0.01 ? (0.35 + 0.65 * s.p).toFixed(2) : '0';
    el.qout.style.strokeDashoffset = (-s.dout).toFixed(1);
    el.badge.setAttribute('opacity', s.phase === 2 ? '1' : '0');
    const k = stepLabel(); el.dots.forEach((dd, i) => dd.classList.toggle('on', i === k)); el.text.textContent = STEPS[k];
  }
  function advance(sec) { const n = Math.ceil(sec * 120); for (let i = 0; i < n; i++) step(sec / n); }
  function frame(t) {
    if (!slide.classList.contains('active')) { raf = 0; return; }
    const dt = Math.min(0.05, (t - last) / 1000 || 0); last = t;
    advance(dt); render(); raf = requestAnimationFrame(frame);
  }
  function start() { cancelAnimationFrame(raf); reset(); render(); last = performance.now(); raf = requestAnimationFrame(frame); }
  function still(sec) { cancelAnimationFrame(raf); raf = 0; reset(); advance(sec); render(); }
  const qs = location.search.match(/[?&]tank=([\d.]+)/);
  const staticMode = qs || /[?&]all\b/.test(location.search) || matchMedia('(prefers-reduced-motion: reduce)').matches;
  const settled = 12;   // วินาที → อยู่ช่วง "ระดับนิ่งที่ SP"
  document.addEventListener('slidechange', e => {
    if (e.detail.slide !== slide) return;
    staticMode ? still(qs ? parseFloat(qs[1]) : settled) : start();
  });
  window.addEventListener('beforeprint', () => still(settled));
  reset(); advance(settled); render();               // ค่าเริ่มต้นก่อนเข้าหน้า (และตอนพิมพ์)
  return { start, still };
})();

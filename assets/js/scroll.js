/* Scroll choreography. Native scrolling stays untouched (no hijacking); a lerped copy of
   scrollY drives every transform, which is what makes it feel fluid rather than mechanical. */
window.Scroll = (function () {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = s => document.querySelector(s);
  let sy = scrollY, ty = scrollY, vh = innerHeight, vw = innerWidth;
  const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
  const ease = t => 1 - Math.pow(1 - t, 3);

  /* ---------- Powers of ten ---------- */
  const scaleSec = $("#scale"), zc = $("#zoom"), zctx = zc.getContext("2d");
  const N = 6, VIEW0 = 250000, VIEW1 = 2.5;          // metres across the screen, start → end
  let zW = 0, zH = 0, zdpr = 1, lastZ = -1;
  function zResize() { zdpr = Math.min(devicePixelRatio || 1, 2); zW = zc.clientWidth; zH = zc.clientHeight; zc.width = zW * zdpr; zc.height = zH * zdpr; zctx.setTransform(zdpr, 0, 0, zdpr, 0, 0); lastZ = -1; }
  const hash = (a, b) => { let h = (a * 374761393 + b * 668265263) | 0; h = (h ^ (h >>> 13)) * 1274126177; return ((h ^ (h >>> 16)) >>> 0) / 4294967296; };
  const fmtLen = m => m >= 1000 ? (m / 1000) + " km" : m >= 1 ? m + " m" : (m * 100) + " cm";
  function drawZoom(z) {                                   // z: 0 … N-1
    const view = VIEW0 * Math.pow(VIEW1 / VIEW0, z / (N - 1));
    const ppm = zW / view, cx = zW * .62, cy = zH * .5;
    zctx.clearRect(0, 0, zW, zH);
    // grid: two decades, cross-faded
    const d = Math.log10(view / 8), lo = Math.floor(d), f = d - lo;
    [[lo, 1 - f], [lo + 1, 1]].forEach(([e, a]) => {
      const step = Math.pow(10, e) * ppm; if (step < 6) return;
      zctx.strokeStyle = `rgba(244,244,241,${.07 * a + .02})`; zctx.lineWidth = 1; zctx.beginPath();
      for (let x = cx % step; x < zW; x += step) { zctx.moveTo(x, 0); zctx.lineTo(x, zH); }
      for (let y = cy % step; y < zH; y += step) { zctx.moveTo(0, y); zctx.lineTo(zW, y); }
      zctx.stroke();
      // texture: "settlements" / "buildings" / "trees" seeded per grid cell
      const n = Math.ceil(zW / step) + 1, m = Math.ceil(zH / step) + 1, i0 = Math.floor(-cx / step), j0 = Math.floor(-cy / step);
      zctx.fillStyle = `rgba(244,244,241,${.35 * a})`;
      for (let i = i0; i < i0 + n; i++) for (let j = j0; j < j0 + m; j++) {
        const r = hash(i + e * 1000, j - e * 777); if (r > .34) continue;
        const px = cx + (i + hash(i, j + 9)) * step, py = cy + (j + hash(i + 3, j)) * step;
        const s = Math.max(1, step * (.05 + r * .25));
        if (e % 2) zctx.fillRect(px, py, s, s * .7); else { zctx.beginPath(); zctx.arc(px, py, s * .5, 0, 6.28); zctx.fill(); }
      }
    });
    // nested squares — one per power of ten
    const active = Math.floor(Math.log10(view * .6));     // largest power of ten that still fits comfortably
    for (let e = -1; e <= 6; e++) {
      const side = Math.pow(10, e) * ppm; if (side < 3 || side > zW * 4) continue;
      const on = e === active;
      zctx.strokeStyle = on ? "#1F3BFF" : "rgba(244,244,241,.55)"; zctx.lineWidth = on ? 3 : 1;
      if (on) { zctx.fillStyle = "rgba(31,59,255,.16)"; zctx.fillRect(cx - side / 2, cy - side / 2, side, side); }
      zctx.strokeRect(cx - side / 2, cy - side / 2, side, side);
      if (side > 40) { zctx.fillStyle = on ? "#8FA0FF" : "rgba(244,244,241,.7)"; zctx.font = "500 11px JetBrains Mono, monospace"; zctx.fillText(fmtLen(Math.pow(10, e)), cx - side / 2 + 6, cy - side / 2 - 7); }
    }
    // crosshair at the centre
    zctx.strokeStyle = "#1F3BFF"; zctx.lineWidth = 1.5; zctx.beginPath(); zctx.moveTo(cx - 10, cy); zctx.lineTo(cx + 10, cy); zctx.moveTo(cx, cy - 10); zctx.lineTo(cx, cy + 10); zctx.stroke();
    // live map scale (screen ≈ 0.35 m wide)
    const ratio = view / .35 / 7.14, mag = Math.pow(10, Math.floor(Math.log10(ratio)) - 1), r2 = Math.max(1, Math.round(ratio / mag) * mag);
    $("#ratio").textContent = "1 : " + r2.toLocaleString("de-DE").replace(/\./g, " ");
  }
  function buildScaleText() {
    const T = I18N.T;
    $("#says").innerHTML = Array.from({ length: N }, (_, k) => `<article data-k="${k}"><span class="mono lvl">${String(k + 1).padStart(2, "0")} · ${T(`sc.${k}.l`)}</span><h3>${T(`sc.${k}.t`)}</h3><p>${T(`sc.${k}.p`)}</p></article>`).join("");
    $("#ticks").innerHTML = Array.from({ length: N }, (_, k) => `<span class="mono" data-k="${k}">${T(`sc.${k}.l`)}</span>`).join("");
    lastK = -1;
  }
  let lastK = -1;
  function updateScale() {
    const r = scaleSec.getBoundingClientRect(), total = scaleSec.offsetHeight - vh;
    if (r.bottom < 0 || r.top > vh) return;
    const p = clamp(-r.top / total);
    const u = p * (N - 1) * .9999, k0 = Math.floor(u), fr = u - k0;
    const sm = fr < .3 ? 0 : fr > .8 ? 1 : (t => t * t * (3 - 2 * t))((fr - .3) / .5);   // dwell on each level
    const z = Math.min(N - 1, k0 + sm);
    if (Math.abs(z - lastZ) > .0005) { drawZoom(z); lastZ = z; }
    const k = Math.min(N - 1, Math.round(z));
    if (k !== lastK) { document.querySelectorAll("#says article, #ticks span").forEach(el => el.classList.toggle("on", +el.dataset.k === k)); lastK = k; }
  }

  /* ---------- Folio: vertical scroll → horizontal travel ---------- */
  const folio = $("#folio"), track = $("#folioTrack"), fbar = $("#folioBar");
  let travel = 0;
  function sizeFolio() {
    travel = Math.max(0, track.scrollWidth - vw);
    folio.style.height = (travel + vh) + "px";
  }
  function updateFolio() {
    const r = folio.getBoundingClientRect(); if (r.bottom < 0 || r.top > vh) return;
    const p = clamp(-r.top / Math.max(1, travel));
    track.style.transform = `translate3d(${-p * travel}px,0,0)`;
    fbar.style.transform = `scaleX(${p})`;
    const mid = vw * .5;
    track.querySelectorAll(".fp").forEach(el => { const b = el.getBoundingClientRect(); el.classList.toggle("on", b.left < mid + b.width * .35 && b.right > mid - b.width * .35); });
  }

  /* ---------- masthead, parallax, contact ---------- */
  const mast = document.querySelectorAll(".mast span"), contact = $("#contact"), prog = $("#progress");
  function updateMisc() {
    const p = clamp(sy / vh);
    if (mast.length) { mast[0].style.transform = `translate3d(${-p * 18}vw,0,0)`; mast[1].style.transform = `translate3d(${p * 12}vw,0,0)`; }
    document.querySelectorAll(".sh-no, .vlabel").forEach(el => {
      const r = el.parentElement.getBoundingClientRect(); if (r.bottom < 0 || r.top > vh) return;
      const t = (r.top + r.height / 2 - vh / 2) / vh; el.style.transform = `translate3d(0,${t * (el.classList.contains("vlabel") ? 80 : -50)}px,0)`;
    });
    const cr = contact.getBoundingClientRect(); const cp = clamp(1 - (cr.top / vh));
    contact.style.setProperty("--ci", ((1 - ease(cp)) * 14).toFixed(2) + "%");
    const max = document.documentElement.scrollHeight - vh; prog.style.transform = `scaleX(${clamp(scrollY / max)})`;
  }

  function frame() {
    ty = scrollY; sy += (ty - sy) * .14; if (Math.abs(ty - sy) < .1) sy = ty;
    updateMisc(); updateScale(); updateFolio();
    requestAnimationFrame(frame);
  }
  function resize() { vh = innerHeight; vw = innerWidth; zResize(); sizeFolio(); }
  function init() {
    buildScaleText(); resize();
    addEventListener("resize", resize);
    if (reduce) { drawZoom(N - 1); document.querySelectorAll("#says article").forEach(a => a.classList.add("on")); return; }
    requestAnimationFrame(frame);
  }
  I18N.onChange(() => { buildScaleText(); });
  return { init, sizeFolio };
})();

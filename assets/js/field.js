/* Hero: a live contour map (marching squares) of drifting "heat sources".
   The cursor adds a warm hill; the contours closest to it light up in the signal colour. */
window.initField = function (canvas) {
  const ctx = canvas.getContext("2d");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const CELL = 11;
  let W = 0, H = 0, dpr = 1, cols = 0, rows = 0, vals = null, running = true, raf = 0;
  const mouse = { x: -9999, y: -9999, s: 0, ts: 0 };

  // deterministic seed so the composition is stable between visits
  let seed = 20261116; const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
  const src = Array.from({ length: 6 }, () => ({ x: .25 + rnd() * .75, y: rnd(), r: .16 + rnd() * .18, a: .55 + rnd() * .7, ph: rnd() * 6.28, sp: .00006 + rnd() * .00008 }));
  const LEVELS = []; for (let l = .12; l < 2.2; l += .115) LEVELS.push(l);

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = canvas.clientWidth; H = canvas.clientHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cols = Math.ceil(W / CELL) + 1; rows = Math.ceil(H / CELL) + 1;
    vals = new Float32Array(cols * rows);
  }

  function compute(t) {
    const m = Math.min(W, H);
    const S = src.map(s => ({
      x: (s.x + Math.sin(t * s.sp + s.ph) * .09) * W,
      y: (s.y + Math.cos(t * s.sp * 1.3 + s.ph) * .09) * H,
      k: 1 / (2 * (s.r * m) ** 2), a: s.a
    }));
    const mk = 1 / (2 * 150 * 150);
    for (let j = 0; j < rows; j++) {
      const py = j * CELL;
      for (let i = 0; i < cols; i++) {
        const px = i * CELL; let v = 0;
        for (let n = 0; n < S.length; n++) { const dx = px - S[n].x, dy = py - S[n].y; v += S[n].a * Math.exp(-(dx * dx + dy * dy) * S[n].k); }
        if (mouse.s > .001) { const dx = px - mouse.x, dy = py - mouse.y; v += .95 * mouse.s * Math.exp(-(dx * dx + dy * dy) * mk); }
        vals[j * cols + i] = v;
      }
    }
  }

  // marching squares segment table: edges 0=top 1=right 2=bottom 3=left
  const SEG = [[], [[3, 2]], [[2, 1]], [[3, 1]], [[0, 1]], [[3, 0], [2, 1]], [[0, 2]], [[3, 0]], [[3, 0]], [[0, 2]], [[3, 2], [0, 1]], [[0, 1]], [[3, 1]], [[2, 1]], [[3, 2]], []];

  function draw() {
    ctx.clearRect(0, 0, W, H);
    // fade the field out under the headline (left) for legibility
    for (let li = 0; li < LEVELS.length; li++) {
      const L = LEVELS[li];
      const major = li % 4 === 0;
      const hotness = Math.min(1, li / LEVELS.length * 1.4);
      ctx.beginPath();
      for (let j = 0; j < rows - 1; j++) {
        for (let i = 0; i < cols - 1; i++) {
          const a = vals[j * cols + i], b = vals[j * cols + i + 1], c = vals[(j + 1) * cols + i + 1], d = vals[(j + 1) * cols + i];
          const idx = (a > L ? 8 : 0) | (b > L ? 4 : 0) | (c > L ? 2 : 0) | (d > L ? 1 : 0);
          if (idx === 0 || idx === 15) continue;
          const x = i * CELL, y = j * CELL;
          const e = (k) => {
            switch (k) {
              case 0: return [x + CELL * (L - a) / (b - a), y];
              case 1: return [x + CELL, y + CELL * (L - b) / (c - b)];
              case 2: return [x + CELL * (L - d) / (c - d), y + CELL];
              default: return [x, y + CELL * (L - a) / (d - a)];
            }
          };
          const segs = SEG[idx];
          for (let s = 0; s < segs.length; s++) { const p = e(segs[s][0]), q = e(segs[s][1]); ctx.moveTo(p[0], p[1]); ctx.lineTo(q[0], q[1]); }
        }
      }
      if (hotness > .78) { ctx.strokeStyle = `rgba(228,87,46,${.55 + (hotness - .78)})`; ctx.lineWidth = 1.2; }
      else { ctx.strokeStyle = `rgba(20,20,20,${major ? .32 : .14})`; ctx.lineWidth = major ? 1 : .8; }
      ctx.stroke();
    }
    // vignette toward the text column
    const g = ctx.createLinearGradient(0, 0, W * .62, 0);
    g.addColorStop(0, "rgba(238,235,227,.92)"); g.addColorStop(.55, "rgba(238,235,227,.55)"); g.addColorStop(1, "rgba(238,235,227,0)");
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  }

  let last = 0;
  function frame(t) {
    raf = requestAnimationFrame(frame);
    if (!running || t - last < 33) return; last = t;
    mouse.s += (mouse.ts - mouse.s) * .06;
    compute(t); draw();
  }

  resize(); compute(4000); draw();
  addEventListener("resize", () => { resize(); compute(performance.now()); draw(); });
  if (reduce) return;
  canvas.parentElement.addEventListener("pointermove", e => { const r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; mouse.ts = 1; });
  canvas.parentElement.addEventListener("pointerleave", () => { mouse.ts = 0; });
  new IntersectionObserver(([en]) => { running = en.isIntersecting; }).observe(canvas);
  raf = requestAnimationFrame(frame);
};

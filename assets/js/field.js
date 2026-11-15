/* Fig. 1 — a halftone heat map of an imaginary paved square.
   Dot size = surface temperature. The cursor is a tree: it casts a shadow in the real
   direction of the sun over Frankfurt right now, and the dots inside it cool (and turn Klein blue). */
window.initField = function (canvas, onSun) {
  const ctx = canvas.getContext("2d");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const STEP = 13;
  let W = 0, H = 0, dpr = 1, running = true, sun = Sun.position();
  const cur = { x: -999, y: -999, s: 0, ts: 0 };
  const INK = "#0A0A0A", KLEIN = "#1F3BFF";

  // a fixed "square": two building blocks, a street, sealed hot paving, one fountain
  function base(x, y) {
    const u = x / W, v = y / H;
    let t = .62 + .18 * Math.sin(u * 7.1 + 1.3) * Math.cos(v * 5.3) + .12 * Math.sin(u * 19 + v * 11);
    if (v > .78) t += .2;                                        // asphalt street
    const f = Math.hypot(u - .63, (v - .42) * 1.4); if (f < .09) t -= .55 * (1 - f / .09); // fountain
    return Math.max(0, Math.min(1, t));
  }
  const isBuilding = (x, y) => (x / W < .1 && y / H < .7) || (x / W > .86 && y / H > .16 && y / H < .58);

  function resize() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    W = canvas.clientWidth; H = canvas.clientHeight;
    canvas.width = W * dpr; canvas.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function draw(t) {
    ctx.clearRect(0, 0, W, H);
    const day = sun.alt > 0;
    // shadow vector: away from the sun azimuth, length ~ 1/tan(alt)
    const len = day ? Math.min(220, 40 / Math.tan(Math.max(4, sun.alt) * Math.PI / 180)) : 0;
    const a = (sun.az + 180) * Math.PI / 180;               // shadow points away from the sun
    const sx = Math.sin(a), sy = -Math.cos(a);              // screen: north = up
    // building shadows as well
    for (let y = STEP / 2; y < H; y += STEP) {
      for (let x = STEP / 2; x < W; x += STEP) {
        if (isBuilding(x, y)) { ctx.fillStyle = INK; ctx.fillRect(x - STEP / 2, y - STEP / 2, STEP, STEP); continue; }
        let v = base(x, y) + .04 * Math.sin(t * .0012 + x * .05 + y * .03);
        // building shade (cast along the sun shadow vector)
        let shade = 0;
        if (day) for (let k = 8; k < len * .9; k += 10) { if (isBuilding(x - sx * k, y - sy * k)) { shade = Math.max(shade, 1 - k / len); break; } }
        // cursor-tree: crown + shadow capsule
        if (cur.s > .01) {
          const px = x - cur.x, py = y - cur.y;
          const along = Math.max(0, Math.min(len, px * sx + py * sy));
          const dx = px - sx * along, dy = py - sy * along;
          const d = Math.hypot(dx, dy);
          shade = Math.max(shade, cur.s * Math.exp(-(d * d) / (2 * 34 * 34)));
        }
        v *= 1 - .8 * shade;
        const r = .4 + v * (STEP * .5);
        ctx.beginPath(); ctx.arc(x, y, r, 0, 6.2832);
        ctx.fillStyle = shade > .35 ? KLEIN : INK; ctx.fill();
      }
    }
  }

  let last = 0;
  function frame(t) {
    requestAnimationFrame(frame);
    if (!running || t - last < 40) return; last = t;
    cur.s += (cur.ts - cur.s) * .12;
    draw(t);
  }
  function tickSun() { sun = Sun.position(); onSun && onSun(sun); }

  resize(); tickSun(); draw(0);
  setInterval(tickSun, 60000);
  addEventListener("resize", () => { resize(); draw(performance.now()); });
  canvas.addEventListener("pointermove", e => { const r = canvas.getBoundingClientRect(); cur.x = e.clientX - r.left; cur.y = e.clientY - r.top; cur.ts = 1; if (reduce) { cur.s = 1; draw(0); } });
  canvas.addEventListener("pointerleave", () => { cur.ts = 0; if (reduce) { cur.s = 0; draw(0); } });
  // invite interaction: a slow automatic "tree" walks the square until the visitor takes over
  let auto = !reduce, t0 = performance.now();
  canvas.addEventListener("pointerenter", () => { auto = false; });
  (function walk() { if (!auto) return; const k = (performance.now() - t0) / 5200; cur.x = W * (.35 + .25 * Math.sin(k)); cur.y = H * (.45 + .2 * Math.sin(k * 1.7)); cur.ts = .85; requestAnimationFrame(walk); })();
  if (reduce) return;
  new IntersectionObserver(([en]) => { running = en.isIntersecting; }).observe(canvas);
  requestAnimationFrame(frame);
};

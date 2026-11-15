/* Lab: "Cool a square" — a toy surface-temperature model on a 44 × 28 grid.
   Not physics: base temperatures per material, shade from trees / sails / a west
   building row (afternoon sun from the west), evaporative cooling from water and
   grass, then one smoothing pass. Enough to show the logic of heat-resilient design. */
window.initLab = function (canvas, ui) {
  const C = 44, R = 28, AIR = 32;
  const BASE = { paving: 51, asphalt: 57, grass: 35, water: 27, tree: 31, sail: 51, building: 0 };
  const COL = { tree: "#2F6B43", water: "#3B7EA1", grass: "#8FB36A", sail: "#E8E2D0", building: "#0B0C0B" };
  const RAMP = ["#22476B", "#2E7D8C", "#7FB069", "#F2C14E", "#E8743B", "#C9302C", "#6E1423"];
  const ctx = canvas.getContext("2d");
  let grid, temp, startMean = null, tool = "tree", painting = false;

  function rampColor(t) {
    t = Math.max(0, Math.min(.999, (t - 26) / 34));
    const f = t * (RAMP.length - 1), i = Math.floor(f), k = f - i;
    const a = parseInt(RAMP[i].slice(1), 16), b = parseInt(RAMP[i + 1].slice(1), 16);
    return `rgb(${[16, 8, 0].map(s => Math.round(((a >> s) & 255) * (1 - k) + ((b >> s) & 255) * k))})`;
  }

  function fresh() {
    grid = Array.from({ length: R }, (_, y) => Array.from({ length: C }, (_, x) => {
      if (x < 3) return "building";
      if (y > 22 && x > 6) return "asphalt"; // street along the south edge
      return "paving";
    }));
    // a lonely pair of existing trees and a small fountain, like many German squares
    grid[8][30] = "tree"; grid[18][14] = "tree"; grid[13][24] = "water";
    startMean = null; solve();
  }

  function solve() {
    const shade = Array.from({ length: R }, () => new Float32Array(C));
    const wet = Array.from({ length: R }, () => new Float32Array(C));
    for (let y = 0; y < R; y++) for (let x = 0; x < C; x++) {
      const m = grid[y][x];
      if (m === "building") { [.9, .62, .34, .14].forEach((s, k) => { if (x + k + 1 < C) shade[y][x + k + 1] = Math.max(shade[y][x + k + 1], s); }); }
      if (m === "tree") for (let dy = -3; dy <= 3; dy++) for (let dx = -3; dx <= 4; dx++) {
        const yy = y + dy, xx = x + dx; if (yy < 0 || yy >= R || xx < 0 || xx >= C) continue;
        const d = Math.hypot(dx - .6, dy); const s = Math.exp(-(d * d) / 4.2) * .95; // shade skewed east (afternoon)
        shade[yy][xx] = Math.max(shade[yy][xx], s);
      }
      if (m === "sail") for (let dx = 0; dx <= 1; dx++) if (x + dx < C) shade[y][x + dx] = Math.max(shade[y][x + dx], .85);
      if (m === "water" || m === "grass") for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) {
        const yy = y + dy, xx = x + dx; if (yy < 0 || yy >= R || xx < 0 || xx >= C) continue;
        wet[yy][xx] += (m === "water" ? 1.6 : .7) * Math.exp(-(dx * dx + dy * dy) / 2.5);
      }
    }
    const raw = Array.from({ length: R }, () => new Float32Array(C));
    for (let y = 0; y < R; y++) for (let x = 0; x < C; x++) {
      const m = grid[y][x]; if (m === "building") { raw[y][x] = NaN; continue; }
      let t = BASE[m];
      t -= shade[y][x] * (t - (AIR - 2)) * .88;
      t -= Math.min(4, wet[y][x]) * 1.2;
      raw[y][x] = t;
    }
    temp = Array.from({ length: R }, () => new Float32Array(C));
    let sum = 0, n = 0, max = 0, shaded = 0;
    for (let y = 0; y < R; y++) for (let x = 0; x < C; x++) {
      if (Number.isNaN(raw[y][x])) { temp[y][x] = NaN; continue; }
      let s = 0, w = 0;
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
        const yy = y + dy, xx = x + dx; if (yy < 0 || yy >= R || xx < 0 || xx >= C || Number.isNaN(raw[yy][xx])) continue;
        const k = dx || dy ? .5 : 2; s += raw[yy][xx] * k; w += k;
      }
      const t = s / w; temp[y][x] = t; sum += t; n++; if (t > max) max = t; if (shade[y][x] > .45) shaded++;
    }
    const mean = sum / n; if (startMean === null) startMean = mean;
    ui.mean.textContent = mean.toFixed(1) + "°";
    ui.max.textContent = max.toFixed(1) + "°";
    ui.shade.textContent = Math.round(shaded / n * 100) + "%";
    const d = mean - startMean;
    ui.delta.textContent = (Math.abs(d) < .05 ? "±" : d < 0 ? "−" : "+") + Math.abs(d).toFixed(1) + "°";
    ui.delta.classList.toggle("good", d < -.05);
    draw();
  }

  function size() {
    const w = canvas.clientWidth, dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(w * R / C * dpr);
  }

  function draw() {
    const cw = canvas.width / C, ch = canvas.height / R;
    for (let y = 0; y < R; y++) for (let x = 0; x < C; x++) {
      const m = grid[y][x];
      ctx.fillStyle = m === "building" ? COL.building : rampColor(temp[y][x]);
      ctx.fillRect(Math.floor(x * cw), Math.floor(y * ch), Math.ceil(cw), Math.ceil(ch));
    }
    // material glyphs on top of the heat field
    for (let y = 0; y < R; y++) for (let x = 0; x < C; x++) {
      const m = grid[y][x], cx = (x + .5) * cw, cy = (y + .5) * ch;
      if (m === "tree") { ctx.beginPath(); ctx.arc(cx, cy, cw * .42, 0, 7); ctx.fillStyle = COL.tree; ctx.fill(); ctx.strokeStyle = "rgba(238,235,227,.8)"; ctx.lineWidth = 1; ctx.stroke(); }
      else if (m === "water") { ctx.fillStyle = COL.water; ctx.fillRect(x * cw + 1, y * ch + 1, cw - 2, ch - 2); }
      else if (m === "grass") { ctx.fillStyle = "rgba(143,179,106,.55)"; ctx.fillRect(x * cw + 2, y * ch + 2, cw - 4, ch - 4); }
      else if (m === "sail") { ctx.strokeStyle = COL.sail; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(x * cw + 2, y * ch + 2); ctx.lineTo((x + 1) * cw - 2, (y + 1) * ch - 2); ctx.moveTo((x + 1) * cw - 2, y * ch + 2); ctx.lineTo(x * cw + 2, (y + 1) * ch - 2); ctx.stroke(); }
    }
    ctx.fillStyle = "rgba(238,235,227,.7)"; ctx.font = `${Math.max(10, cw * .7)}px IBM Plex Mono, monospace`;
    ctx.save(); ctx.translate(cw * 1.6, canvas.height / 2); ctx.rotate(-Math.PI / 2); ctx.textAlign = "center"; ctx.fillText("BUILDINGS · W", 0, 0); ctx.restore();
    ctx.fillText("☀ 15:00 →", canvas.width - cw * 8, ch * 1.4);
  }

  function cellAt(e) {
    const r = canvas.getBoundingClientRect();
    return [Math.floor((e.clientX - r.left) / r.width * C), Math.floor((e.clientY - r.top) / r.height * R)];
  }
  function paint(e) {
    const [x, y] = cellAt(e); if (x < 0 || y < 0 || x >= C || y >= R || grid[y][x] === "building") return;
    const v = tool === "paving" ? (y > 22 && x > 6 ? "asphalt" : "paving") : tool;
    if (grid[y][x] === v) return;
    // trees and sails are placed with spacing so dragging doesn't make a solid wall
    if (tool === "tree") for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) if ((dx || dy) && grid[y + dy]?.[x + dx] === "tree") return;
    grid[y][x] = v; solve();
  }
  canvas.addEventListener("pointerdown", e => { painting = true; canvas.setPointerCapture(e.pointerId); paint(e); });
  canvas.addEventListener("pointermove", e => { if (painting) paint(e); });
  canvas.addEventListener("pointerup", () => { painting = false; });
  canvas.addEventListener("pointercancel", () => { painting = false; });

  ui.tools.addEventListener("click", e => {
    const b = e.target.closest("[data-tool]"); if (!b) return;
    tool = b.dataset.tool;
    ui.tools.querySelectorAll("[data-tool]").forEach(x => x.setAttribute("aria-checked", String(x === b)));
  });
  ui.reset.addEventListener("click", fresh);
  ui.green.addEventListener("click", () => {
    // a plausible greening scheme: tree rows, a rain garden and a water table
    for (let x = 6; x < C - 2; x += 4) { grid[5][x] = "tree"; grid[20][x + 2] = "tree"; }
    for (let x = 30; x < 38; x++) for (let y = 10; y < 15; y++) grid[y][x] = "grass";
    for (let x = 12; x < 20; x++) grid[13][x] = "water";
    for (let x = 8; x < 40; x += 4) if (grid[24]?.[x] === "asphalt") grid[24][x] = "tree";
    solve();
  });
  addEventListener("resize", () => { size(); draw(); });
  size(); fresh();
};

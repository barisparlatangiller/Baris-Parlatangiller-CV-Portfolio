/* Generative "map plates" used as artwork for each case study.
   Deterministic (seeded) so they look identical on every visit.
   Swap for real screenshots by adding `image` to a work in data/content.js. */
window.Plates = (function () {
  const INK = "#141414", PAPER = "#EEEBE3", SIG = "#E4572E";
  const RAMP = ["#22476B", "#2E7D8C", "#7FB069", "#F2C14E", "#E8743B", "#C9302C", "#6E1423"];
  function rng(s) { return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); }
  function ramp(t) { t = Math.max(0, Math.min(.999, t)); const f = t * (RAMP.length - 1), i = Math.floor(f); return mix(RAMP[i], RAMP[i + 1], f - i); }
  function mix(a, b, t) { const pa = parseInt(a.slice(1), 16), pb = parseInt(b.slice(1), 16); const c = [16, 8, 0].map(s => Math.round(((pa >> s) & 255) * (1 - t) + ((pb >> s) & 255) * t)); return `rgb(${c})`; }
  const svg = (w, h, body) => `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"><rect width="${w}" height="${h}" fill="${PAPER}"/>${body}</svg>`;

  const P = {
    /* 1 m heat raster of a square, with building footprints and tree crowns */
    heat(w = 400, h = 300) {
      const r = rng(14), cs = 8, cols = Math.ceil(w / cs), rows = Math.ceil(h / cs);
      const trees = Array.from({ length: 9 }, () => [60 + r() * 300, 50 + r() * 200, 14 + r() * 16]);
      let b = "";
      for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
        const x = i * cs, y = j * cs;
        let t = .62 + .25 * Math.sin(x / 70) * Math.cos(y / 55) + (r() - .5) * .08;
        if (x < 46) t -= .35 * (1 - x / 46) + .1;                 // building shade (west)
        for (const [tx, ty, tr] of trees) { const d = Math.hypot(x - tx, y - ty); if (d < tr * 2.2) t -= .45 * Math.exp(-(d * d) / (2 * tr * tr)); }
        b += `<rect x="${x}" y="${y}" width="${cs}" height="${cs}" fill="${ramp(t)}" shape-rendering="crispEdges"/>`;
      }
      b += `<rect x="0" y="0" width="34" height="${h}" fill="${INK}"/>`;
      for (const [tx, ty, tr] of trees) b += `<circle cx="${tx}" cy="${ty}" r="${tr * .55}" fill="none" stroke="${PAPER}" stroke-width="1"/>`;
      b += `<g font-family="IBM Plex Mono,monospace" font-size="9" fill="${PAPER}"><text x="42" y="16">1 m · Tmrt · 15:00</text></g>`;
      return svg(w, h, b);
    },
    /* 30-day calendar grid — published days filled */
    calendar(w = 400, h = 300, done = []) {
      let b = ""; const cw = 52, ch = 46, ox = 18, oy = 22;
      for (let d = 1; d <= 30; d++) {
        const i = (d - 1) % 7, j = Math.floor((d - 1) / 7), x = ox + i * cw, y = oy + j * ch;
        const on = done.includes(d);
        b += `<rect x="${x}" y="${y}" width="${cw - 6}" height="${ch - 6}" fill="${on ? (d % 5 === 0 ? SIG : INK) : "none"}" stroke="${INK}" stroke-width="1"/>`;
        b += `<text x="${x + 5}" y="${y + 13}" font-family="IBM Plex Mono,monospace" font-size="9" fill="${on ? PAPER : INK}">${String(d).padStart(2, "0")}</text>`;
        if (on) b += `<circle cx="${x + cw - 16}" cy="${y + ch - 16}" r="4" fill="none" stroke="${PAPER}"/>`;
      }
      return svg(w, h, b);
    },
    /* radial city fabric — masterplan */
    radial(w = 400, h = 300) {
      const r = rng(2040), cx = w * .52, cy = h * .55; let b = "";
      for (let k = 1; k <= 9; k++) b += `<circle cx="${cx}" cy="${cy}" r="${k * 22}" fill="none" stroke="${INK}" stroke-opacity="${k % 3 ? .18 : .5}"/>`;
      for (let a = 0; a < 24; a++) { const t = a / 24 * Math.PI * 2; b += `<line x1="${cx}" y1="${cy}" x2="${cx + Math.cos(t) * 260}" y2="${cy + Math.sin(t) * 260}" stroke="${INK}" stroke-opacity="${a % 6 ? .12 : .45}"/>`; }
      for (let n = 0; n < 150; n++) { const t = r() * 6.283, d = 20 + r() * 180, s = 3 + r() * 7; b += `<rect x="${cx + Math.cos(t) * d}" y="${cy + Math.sin(t) * d}" width="${s}" height="${s}" fill="${r() > .85 ? SIG : INK}" fill-opacity="${.35 + r() * .6}" transform="rotate(${t * 57} ${cx + Math.cos(t) * d} ${cy + Math.sin(t) * d})"/>`; }
      b += `<path d="M0 ${h * .2} C ${w * .3} ${h * .1}, ${w * .5} ${h * .35}, ${w} ${h * .15}" fill="none" stroke="#2F5D8A" stroke-width="10" stroke-opacity=".5"/>`;
      return svg(w, h, b);
    },
    /* arcs from Frankfurt to project cities */
    arcs(w = 400, h = 300) {
      const o = [70, 70], ts = [[250, 120], [330, 250], [290, 220], [300, 230], [230, 110], [340, 265]]; let b = "";
      for (let x = 0; x < w; x += 25) b += `<line x1="${x}" y1="0" x2="${x}" y2="${h}" stroke="${INK}" stroke-opacity=".08"/>`;
      for (let y = 0; y < h; y += 25) b += `<line x1="0" y1="${y}" x2="${w}" y2="${y}" stroke="${INK}" stroke-opacity=".08"/>`;
      ts.forEach(([x, y], i) => { const mx = (o[0] + x) / 2, my = Math.min(o[1], y) - 60 - i * 6; b += `<path d="M${o[0]} ${o[1]} Q ${mx} ${my} ${x} ${y}" fill="none" stroke="${INK}" stroke-width="1" stroke-dasharray="${i % 2 ? "2 4" : "none"}"/><circle cx="${x}" cy="${y}" r="5" fill="${PAPER}" stroke="${INK}"/>`; [1, 2, 3].forEach(k => b += `<circle cx="${x}" cy="${y}" r="${5 + k * 7}" fill="none" stroke="${SIG}" stroke-opacity="${.5 / k}"/>`); });
      b += `<circle cx="${o[0]}" cy="${o[1]}" r="7" fill="${SIG}"/>`;
      return svg(w, h, b);
    },
    /* exploded stack of GIS layers */
    stack(w = 400, h = 300) {
      const r = rng(150); let b = "";
      for (let k = 0; k < 7; k++) {
        const y = 40 + k * 32, sk = (x, yy) => `${x + (yy - y) * .9},${yy}`;
        const pts = [sk(80, y), sk(320, y), sk(320 + 70, y + 60), sk(80 + 70, y + 60)];
        b += `<polygon points="${[[80, y], [320, y], [390, y + 60], [150, y + 60]].map(p => p.join(",")).join(" ")}" fill="${k === 3 ? SIG : PAPER}" fill-opacity="${k === 3 ? .85 : .9}" stroke="${INK}"/>`;
        for (let n = 0; n < 14; n++) { const u = r(), v = r(); const x = 80 + u * 240 + v * 70, yy = y + v * 60; b += `<circle cx="${x}" cy="${yy}" r="${1 + r() * 2}" fill="${INK}" fill-opacity=".6"/>`; }
      }
      return svg(w, h, b);
    },
    /* regional contour terrain */
    contour(w = 400, h = 300) {
      const r = rng(400000); let b = ""; const peaks = Array.from({ length: 5 }, () => [r() * w, r() * h, 40 + r() * 70]);
      for (let k = 1; k < 14; k++) {
        let d = "";
        for (const [px, py, pr] of peaks) {
          const rad = pr * (1 - k / 14) * 1.6; if (rad < 3) continue;
          d += "M";
          for (let a = 0; a <= 48; a++) { const t = a / 48 * 6.283, wob = 1 + .12 * Math.sin(t * 3 + k + px) ; d += `${(px + Math.cos(t) * rad * wob).toFixed(1)},${(py + Math.sin(t) * rad * wob * .8).toFixed(1)} `; }
          d += "Z ";
        }
        b += `<path d="${d}" fill="none" stroke="${k === 9 ? SIG : INK}" stroke-opacity="${k % 4 ? .35 : .8}"/>`;
      }
      b += `<path d="M0 ${h * .7} C ${w * .25} ${h * .62}, ${w * .45} ${h * .9}, ${w} ${h * .78}" fill="none" stroke="#2F5D8A" stroke-width="3"/>`;
      return svg(w, h, b);
    }
  };
  return P;
})();

/* Places atlas. Data comes from tools/build_places.py (GeoPandas + Natural Earth):
   a halftone dot grid tagged by country, every place with what happened there, and totals.
   Dots of countries in the work are lit; pointing at a place or a country lights it in Klein blue. */
window.Places = (function () {
  const P = window.PLACES, A = window.ATLAS, I = window.I18N;
  const $ = s => document.querySelector(s);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const W0 = P.window, rows = P.dots.length, cols = P.dots[0].length;
  const canvas = $("#plDots"), ctx = canvas.getContext("2d"), svg = $("#plSvg"), tip = $("#plTip"), wrap = $("#plMap");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const byId = Object.fromEntries(P.places.map(p => [p.id, p]));
  const KIND_ORDER = ["work", "folio", "map", "award"];
  let W = 0, H = 0, cell = 0, dpr = 1, kind = "all", hiCountry = null, hiPlaces = null, pinned = null;
  let mouse = { x: -999, y: -999 }, revealT = reduce ? 1 : 0, revealStart = 0, dirty = true;

  // dots as typed arrays
  const dots = []; for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) { const ch = P.dots[r][c]; if (ch !== " ") dots.push([c, r, ch]); }
  const FR = byId.frankfurt;
  const proj = (lat, lon) => [((lon - W0.lon0) / W0.stepLon) * cell, ((W0.lat1 - lat) / W0.stepLat) * cell];
  const countItems = p => p.items.filter(it => kind === "all" || it.kind === kind).length;
  const L = o => I.L(o), T = k => I.T(k);
  const fmt = n => n.toLocaleString(I.lang === "de" ? "de-DE" : I.lang === "tr" ? "tr-TR" : "en-GB");
  const hav = (a, b) => { const R = 6371, r = Math.PI / 180, dl = (b.lat - a.lat) * r, dg = (b.lon - a.lon) * r; const h = Math.sin(dl / 2) ** 2 + Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.sin(dg / 2) ** 2; return 2 * R * Math.asin(Math.sqrt(h)); };

  /* ---------- canvas: halftone land ---------- */
  function size() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    W = wrap.clientWidth; cell = W / cols; H = cell * rows;
    canvas.style.height = H + "px"; canvas.width = W * dpr; canvas.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    svg.setAttribute("viewBox", `0 0 ${W} ${H}`); svg.style.height = H + "px";
    drawSvg(); dirty = true;
  }
  function drawDots() {
    ctx.clearRect(0, 0, W, H);
    const [fx, fy] = proj(FR.lat, FR.lon), maxD = Math.hypot(W, H);
    const t = revealT;
    for (const [c, r, ch] of dots) {
      const x = (c + .5) * cell, y = (r + .5) * cell;
      const d = Math.hypot(x - fx, y - fy) / maxD;                 // wave from Frankfurt
      const a = Math.max(0, Math.min(1, (t * 1.6 - d) * 4));
      if (a <= 0) continue;
      const lens = Math.max(0, 1 - Math.hypot(x - mouse.x, y - mouse.y) / 70);
      const country = P.codes[ch];
      let rad, col;
      if (country && country === hiCountry) { rad = .44; col = "31,59,255"; }
      else if (country) { rad = .34; col = "244,244,241"; }
      else { rad = .22; col = "244,244,241"; }
      const alpha = country ? (hiCountry && country !== hiCountry ? .45 : .9) : .16;
      ctx.beginPath(); ctx.arc(x, y, cell * (rad + lens * .22) * a, 0, 6.2832);
      ctx.fillStyle = `rgba(${col},${alpha * a})`; ctx.fill();
    }
  }
  function loop(ts) {
    requestAnimationFrame(loop);
    if (revealStart && revealT < 1) { revealT = Math.min(1, (ts - revealStart) / 2200); dirty = true; if (revealT >= 1) svg.classList.add("in"); }
    if (dirty) { drawDots(); dirty = false; }
  }

  /* ---------- svg: route, places, labels ---------- */
  const LABEL = { munich: [10, 14], unterschleissheim: [10, -8], frankfurt: [0, -14, "middle"], koblenz: [-10, 14, "end"], berlin: [10, -6], leipzig: [10, 12], hamburg: [10, -4],
    izmir: [-10, 4, "end"], istanbul: [8, -10], sakarya: [10, -4], bilecik: [10, 12], bodrum: [-10, 12, "end"], kayakoy: [10, 14],
    baku: [10, 4], tbilisi: [-10, -6, "end"], nizwa: [10, -10], "wadi-andam": [10, 14], saudi: [-12, 4, "end"], qatar: [10, -6], valencia: [10, 4], london: [10, -4] };
  function drawSvg() {
    if (!cell) return;
    let s = ""; const small = W < 700; svg.classList.toggle("small", small);
    // career route
    const pts = P.route.map(id => proj(byId[id].lat, byId[id].lon));
    let d = `M${pts[0][0]},${pts[0][1]}`;
    for (let i = 1; i < pts.length; i++) {
      const [ax, ay] = pts[i - 1], [bx, by] = pts[i], dx = bx - ax, dy = by - ay, dist = Math.hypot(dx, dy) || 1;
      const k = (i % 2 ? -1 : 1) * (.14 + i * .05) * dist;
      d += ` Q${(ax + bx) / 2 - dy / dist * k},${(ay + by) / 2 + dx / dist * k} ${bx},${by}`;
    }
    s += `<path class="pl-route" d="${d}" pathLength="1"/>`;
    // places
    P.places.forEach(p => {
      if (p.lon < W0.lon0) return;
      const [x, y] = proj(p.lat, p.lon), n = countItems(p), sz = small ? (n ? 3 + Math.sqrt(n) * 2.2 : 3) : (n ? 5 + Math.sqrt(n) * 5 : 4);
      const [lx, ly, an] = (small && { nizwa: [-8, -8, "end"], frankfurt: [-8, -8, "end"] }[p.id]) || LABEL[p.id] || [10, 4];
      const showLabel = small ? (p.home || ["baku", "nizwa", "berlin"].includes(p.id)) : (p.home || p.items.length >= 2 || p.region);
      s += `<g class="pm${p.home ? " home" : ""}${p.region ? " region" : ""}${n ? "" : " zero"}" data-id="${p.id}" transform="translate(${x},${y})" tabindex="0" role="button" aria-label="${esc(p.name)}">
        <circle class="hit" r="16"/>${n ? `<circle class="pulse" r="4" style="animation-delay:${(Math.abs(x * 7 + y * 3) % 3000) / 1000}s"/>` : ""}<rect x="${-sz / 2}" y="${-sz / 2}" width="${sz}" height="${sz}"/>
        <text x="${lx}" y="${ly}" text-anchor="${an || "start"}" class="${showLabel ? "" : "soft"}">${esc(p.name)}</text></g>`;
    });
    // off-map: New York
    const ny = byId["new-york"];
    if (ny) {
      const [, y] = proj(ny.lat, W0.lon0), km = Math.round(hav(FR, ny) / 100) * 100;
      s += `<g class="pm offmap" data-id="new-york" transform="translate(0,${y})" tabindex="0" role="button" aria-label="New York">
        <circle class="hit" r="18" cx="14"/><path d="M40,0 H6 M14,-7 L6,0 L14,7" /><text x="46" y="-3">New York</text>${small ? "" : `<text x="46" y="12" class="soft2">${esc(T("pl.offmap").replace("{km}", fmt(km)))}</text>`}</g>`;
    }
    svg.innerHTML = s;
    applyHighlight();
  }

  /* ---------- tooltip ---------- */
  function itemHtml(it) {
    const act = it.kind === "folio" ? T("pl.open") : it.kind === "map" ? T("pl.live") : it.kind === "work" ? T("pl.select") : "";
    return `<li class="k-${it.kind}"><button data-kind="${it.kind}" data-ref="${esc(it.ref || "")}" ${act ? "" : "disabled"}><i></i><span>${esc(it.t)}</span>${act ? `<em>${esc(act)} ↗</em>` : ""}</button></li>`;
  }
  function showTip(p, x, y) {
    const items = p.items.filter(it => kind === "all" || it.kind === kind);
    tip.innerHTML = `<p class="mono">${esc(L(P.countries[p.country]))}</p><h4>${esc(p.name)}</h4><ul>${items.map(itemHtml).join("")}</ul>`;
    tip.classList.add("on");
    const r = wrap.getBoundingClientRect(), tw = tip.offsetWidth, th = tip.offsetHeight;
    let tx = x + 18, ty = y - th / 2; if (tx + tw > r.width) tx = x - tw - 18; ty = Math.max(0, Math.min(r.height - th, ty));
    tip.style.transform = `translate(${tx}px,${ty}px)`;
  }
  function hideTip() { if (!pinned) tip.classList.remove("on"); }

  /* ---------- register ---------- */
  function renderRegister() {
    const countries = Object.keys(P.countries).map(c => {
      const places = P.places.filter(p => p.country === c);
      const counts = {}; places.forEach(p => p.items.forEach(it => { counts[it.kind] = (counts[it.kind] || 0) + 1; }));
      const total = places.reduce((a, p) => a + countItems(p), 0);
      return { c, places, counts, total };
    }).sort((a, b) => b.total - a.total || Object.values(b.counts).reduce((x, y) => x + y, 0) - Object.values(a.counts).reduce((x, y) => x + y, 0));
    const max = Math.max(...countries.map(x => Object.values(x.counts).reduce((a, b) => a + b, 0)));
    $("#plRegister").innerHTML = countries.map((x, i) => {
      const all = Object.values(x.counts).reduce((a, b) => a + b, 0);
      const bar = KIND_ORDER.map(k => x.counts[k] ? `<i class="k-${k}${kind !== "all" && kind !== k ? " dim" : ""}" style="flex:${x.counts[k]}"></i>` : "").join("");
      return `<li class="${x.total ? "" : "zero"}" data-country="${esc(x.c)}">
        <button class="pl-c" aria-expanded="false"><span class="n">${String(i + 1).padStart(2, "0")}</span><span class="nm">${esc(L(P.countries[x.c]))}</span><span class="ct">${x.total}</span><span class="bar" style="width:${all / max * 100}%">${bar}</span></button>
        <div class="pl-cbody">${x.places.map(p => `<div class="pl-p" data-id="${p.id}"><p class="pl-pn">${esc(p.name)}</p><ul>${p.items.filter(it => kind === "all" || it.kind === kind).map(itemHtml).join("")}</ul></div>`).join("")}</div>
      </li>`;
    }).join("");
    $("#plRegCount").textContent = `${countries.filter(x => x.total).length} / ${countries.length}`;
    const el = P.elsewhere.filter(it => kind === "all" || it.kind === kind);
    $("#plElse").innerHTML = el.length ? `<p class="mono">${esc(T("pl.elsewhere"))}</p><ul>${el.map(itemHtml).join("")}</ul>` : "";
  }

  /* ---------- totals, title, kind chips ---------- */
  function renderTotals() {
    const t = P.totals, far = [byId[t.far.a].name, byId[t.far.b].name];
    $("#plTitle").textContent = T("pl.title").replace("{c}", t.countries).replace("{p}", t.places);
    const tiles = [[t.countries, T("pl.countries")], [t.places, T("pl.places")], [t.entries, T("pl.entries")], [fmt(t.route_km), T("pl.route")], [fmt(t.far.km), T("pl.far").replace("{a}", far[1]).replace("{b}", far[0])]];
    $("#plTotals").innerHTML = tiles.map(([v, k]) => `<div><dt data-count="${String(v).replace(/\D/g, "")}">${v}</dt><dd>${esc(k)}</dd></div>`).join("");
    $("#plKinds").innerHTML = ["all", ...KIND_ORDER].map(k => `<button data-k="${k}" aria-pressed="${k === kind}" class="k-${k}"><i></i>${esc(T("pl.k." + k))}${k === "all" ? "" : ` ${t.kinds[k] || 0}`}</button>`).join("");
  }
  function countUp() {
    if (reduce) return;
    document.querySelectorAll("#plTotals dt").forEach(el => {
      const target = +el.dataset.count, txt = el.textContent, t0 = performance.now();
      (function step(ts) { const k = Math.min(1, (ts - t0) / 1600), e = 1 - Math.pow(1 - k, 3); el.textContent = k < 1 ? fmt(Math.round(target * e)) : txt; if (k < 1) requestAnimationFrame(step); })(t0);
    });
  }

  /* ---------- highlight from the career timeline ---------- */
  function applyHighlight() {
    svg.querySelectorAll(".pm").forEach(g => {
      const id = g.dataset.id, p = byId[id];
      g.classList.toggle("hot", !!hiPlaces && hiPlaces.includes(id));
      g.classList.toggle("dim", (!!hiPlaces && !hiPlaces.includes(id)) || (!!hiCountry && p && p.country !== hiCountry));
    });
  }
  function highlight(ids) {
    hiPlaces = ids && ids.length ? ids : null; hiCountry = null; dirty = true;
    document.querySelectorAll("#plRegister > li.open").forEach(li => { li.classList.remove("open"); li.querySelector(".pl-c").setAttribute("aria-expanded", false); });
    applyHighlight();
  }

  /* ---------- actions ---------- */
  function act(btn) {
    const k = btn.dataset.kind, ref = btn.dataset.ref; if (!ref) return;
    if (k === "folio") {
      const i = A.folio.findIndex(f => f.id === ref);
      if (i >= 0) return BoardViewer.open(A.folio, i);
      const w = A.works.find(x => x.id === ref); if (w && w.link) window.open(w.link, "_blank", "noopener");
    } else if (k === "map") window.open(`https://barisparlatangiller.github.io/${ref}/`, "_blank", "noopener");
    else if (k === "work" && window.selectStation) { window.selectStation(ref); document.getElementById("gantt").scrollIntoView({ behavior: "smooth", block: "center" }); }
  }
  function openCountry(c, scroll) {
    document.querySelectorAll("#plRegister > li").forEach(li => {
      const on = li.dataset.country === c; li.classList.toggle("open", on); li.querySelector(".pl-c").setAttribute("aria-expanded", on);
    });
    hiCountry = c; hiPlaces = null; dirty = true; applyHighlight();
    if (scroll) { const li = document.querySelector(`#plRegister > li[data-country="${CSS.escape(c)}"]`); li && li.scrollIntoView({ behavior: "smooth", block: "nearest" }); }
  }

  /* ---------- events ---------- */
  wrap.addEventListener("pointermove", e => {
    const r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; dirty = true;
    const g = e.target.closest(".pm"); if (g && !pinned) { const p = byId[g.dataset.id]; const b = g.getBoundingClientRect(); showTip(p, b.left - r.left + b.width / 2, b.top - r.top + b.height / 2); hiCountry = p.country; dirty = true; applyHighlight(); }
    else if (!g && !pinned && !e.target.closest(".pl-tip")) { hideTip(); if (hiCountry && !document.querySelector("#plRegister > li.open")) { hiCountry = null; dirty = true; applyHighlight(); } }
  });
  wrap.addEventListener("pointerleave", () => { mouse.x = mouse.y = -999; dirty = true; hideTip(); });
  svg.addEventListener("click", e => {
    const g = e.target.closest(".pm"); if (!g) return;
    const p = byId[g.dataset.id]; pinned = p.id; const r = canvas.getBoundingClientRect(), b = g.getBoundingClientRect();
    showTip(p, b.left - r.left + b.width / 2, b.top - r.top + b.height / 2); openCountry(p.country, false);
  });
  svg.addEventListener("keydown", e => { if (e.key === "Enter") e.target.closest(".pm")?.dispatchEvent(new MouseEvent("click", { bubbles: true })); });
  document.addEventListener("click", e => { if (pinned && !e.target.closest(".pl-tip") && !e.target.closest(".pm")) { pinned = null; tip.classList.remove("on"); } });
  tip.addEventListener("click", e => { const b = e.target.closest("button[data-ref]"); if (b) act(b); });
  $("#plRegister").addEventListener("click", e => {
    const b = e.target.closest("button[data-ref]"); if (b) return act(b);
    const c = e.target.closest(".pl-c"); if (!c) return;
    const li = c.parentElement; if (li.classList.contains("open")) { li.classList.remove("open"); c.setAttribute("aria-expanded", false); hiCountry = null; dirty = true; applyHighlight(); }
    else openCountry(li.dataset.country, false);
  });
  $("#plRegister").addEventListener("pointerover", e => { const p = e.target.closest(".pl-p"); svg.querySelectorAll(".pm").forEach(g => g.classList.toggle("focus", !!p && g.dataset.id === p.dataset.id)); });
  $("#plElse").addEventListener("click", e => { const b = e.target.closest("button[data-ref]"); if (b) act(b); });
  $("#plKinds").addEventListener("click", e => { const b = e.target.closest("[data-k]"); if (!b) return; kind = b.dataset.k; renderTotals(); renderRegister(); drawSvg(); });

  function render() { renderTotals(); renderRegister(); drawSvg(); }
  function init() {
    render(); size();
    addEventListener("resize", size);
    new IntersectionObserver(([en], o) => { if (en.isIntersecting) { revealStart = performance.now(); countUp(); if (reduce) svg.classList.add("in"); o.disconnect(); } }, { threshold: .25 }).observe(wrap);
    requestAnimationFrame(loop);
    I.onChange(render);
  }
  return { init, highlight };
})();

/* ==========================================================================
   Career Twin. One 3D map holds the whole career:
   - semantic zoom: world → region → city → one metre (real SOLWEIG data for Frankfurt)
   - three lenses on the same 49 items: Map (where), Time (when), Skills (what)
   - the career as eight chapters on the map (Story), featured work, a command palette, and a detail panel for everything
   Built on deck.gl with data produced by tools/build_places.py and tools/build_v2.py.
   ========================================================================== */
(function () {
  const I = window.I18N, T = k => I.T(k), L = o => I.L(o), A = window.ATLAS;
  const $ = s => document.querySelector(s);
  const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const small = () => innerWidth < 900;

  /* ---------- palette ---------- */
  const C = {
    void: [5, 6, 10], ground: [14, 16, 22], ground2: [24, 28, 40], edge: [38, 44, 59], text: [236, 238, 244], mute: [126, 134, 155],
    klein: [51, 82, 255], lime: [204, 255, 51], steel: [138, 151, 181],
    kind: { work: [236, 238, 244], folio: [51, 82, 255], map: [138, 151, 181], award: [204, 255, 51] }
  };
  const HEAT = ["#0B1A4A", "#1F3BFF", "#2EC5FF", "#CCFF33", "#FFD23A", "#FF6A2A", "#E8174A"].map(h => [1, 3, 5].map(i => parseInt(h.substr(i, 2), 16)));
  const SKILL_ORDER = ["spatial", "climate", "data", "code", "plan", "comm"];
  const KIND_ORDER = ["work", "folio", "map", "award"];

  /* ---------- camera presets ---------- */
  const FLY = () => new deck.FlyToInterpolator({ speed: 1.4 });
  const V = {
    world: { longitude: 24, latitude: 37.5, zoom: small() ? 2.6 : 3.55, pitch: 50, bearing: -12 },
    region: { longitude: 10.2, latitude: 50.2, zoom: small() ? 5.2 : 6.1, pitch: 55, bearing: -18 },
    city: { longitude: 8.6835, latitude: 50.1115, zoom: small() ? 12 : 12.7, pitch: 58, bearing: -24 },
    square: { longitude: 8.6818, latitude: 50.1106, zoom: small() ? 15 : 15.7, pitch: 62, bearing: 28 },
    time: { longitude: 28.5, latitude: 37, zoom: small() ? 2.9 : 3.8, pitch: 56, bearing: 0 },
    skill: { longitude: 26, latitude: 40, zoom: small() ? 3 : 3.9, pitch: 42, bearing: 0 }
  };

  /* ---------- story: the career as chapters on the map ---------- */
  const MAPS = "*maps";
  const CH = [
    { y: [2014, 2018], refs: ["deu"], base: "izmir", arcs: [], v: { longitude: 27.4, latitude: 38.7, zoom: 6.5, pitch: 55, bearing: -12 } },
    { y: [2018, 2019.7], refs: ["beb"], base: "izmir", arcs: ["sakarya", "bilecik"], v: { longitude: 28.7, latitude: 39.4, zoom: 6.1, pitch: 55, bearing: -16 } },
    { y: [2019.7, 2021], refs: ["asp1", "asp3", "baku-2040"], base: "frankfurt", arcs: ["baku"], v: { longitude: 29, latitude: 45, zoom: 4.05, pitch: 50, bearing: -8 } },
    { y: [2021, 2022.4], refs: ["sinir", "konak"], base: "izmir", arcs: [], v: { longitude: 27.2, latitude: 38.45, zoom: 7.4, pitch: 58, bearing: 10 } },
    { y: [2022.4, 2024.7], refs: ["asp2", "nizwa-2040", "wadi-landscape"], base: "frankfurt", arcs: ["tbilisi", "nizwa", "wadi-andam", "saudi", "qatar"], v: { longitude: 37.5, latitude: 36.5, zoom: 3.85, pitch: 48, bearing: -6 } },
    { y: [2024.7, 2025.4], refs: ["mgk", "climate-risk"], base: "munich", arcs: ["unterschleissheim"], v: { longitude: 11.3, latitude: 48.5, zoom: 7.7, pitch: 58, bearing: -18 } },
    { y: [2025.4, 2026.95], refs: ["free", "uhi", "scenario-platform", MAPS], base: "frankfurt", arcs: ["berlin", "leipzig", "hamburg", "koblenz", "munich", "london", "istanbul"], v: { longitude: 6.5, latitude: 49.3, zoom: 4.55, pitch: 52, bearing: -10 } },
    { y: null, refs: [], base: null, arcs: [], v: { longitude: 22, latitude: 41, zoom: 3.9, pitch: 50, bearing: -10 } }
  ];
  const ROUTE_ARRIVE = [2, 3, 4, 5, 6];                  // chapter in which each route leg arrives
  const FEATURED = [
    { id: "uhi", img: "img/uhi.jpg", t: "v2.f1.t", s: "v2.f1.s", act: "v2.feat.fly", badge: "1 m · SOLWEIG", go: () => goLevel("square") },
    { id: "baku-2040", img: "../assets/img/folio/baku-2040.webp", t: "v2.f2.t", s: "v2.f2.s", act: "v2.feat.board", badge: "ISOCARP Award", go: () => { const i = A.folio.findIndex(f => f.id === "baku-2040"); BoardViewer.open(A.folio, i, 1); } }
  ];

  /* ---------- state ---------- */
  const S = { lens: "map", chapter: null, routeT: 500, routeTarget: 500, playing: false, view: { longitude: 28, latitude: 36, zoom: 2.3, pitch: 20, bearing: 0 }, hover: null, selected: null,
    hidden: new Set(), hour: 15, heat: null, heatImg: {}, loadingHeat: false, transitionLens: false, t0: performance.now() };
  let scene, world, items = [], places = {}, deckgl;

  /* ---------- helpers ---------- */
  const ELSE = [18, 33.4];
  const scaleK = z => Math.min(2, Math.max(.0004, Math.pow(2, 3.6 - z)));
  const fmt = n => n.toLocaleString(I.lang === "de" ? "de-DE" : I.lang === "tr" ? "tr-TR" : "en-GB");
  const kindName = k => T("pl.k." + k);
  const folioById = id => A.folio.find(f => f.id === id);
  const expById = id => A.experience.find(e => e.id === id) || A.education.find(e => e.id === id);
  const layerName = id => L((A.layers.find(l => l.id === id) || {}).name || id);
  const countryName = c => c ? L(scene.countries[c]) : T("v2.elsewhere");

  /* ---------- lens geometry ---------- */
  function positions() {
    const k = scaleK(S.view.zoom), byPlace = {}, bySkill = {};
    return items.map(it => {
      if (S.lens !== "skill") {
        if (!it.place) return null;
        const n = (byPlace[it.place] = (byPlace[it.place] ?? -1) + 1);
        if (n === 0) return [it.lon, it.lat];
        const r = .5 * Math.sqrt(n) * k, a = n * 2.39996;
        return [it.lon + Math.cos(a) * r / Math.cos(it.lat * Math.PI / 180), it.lat + Math.sin(a) * r];
      }
      const si = SKILL_ORDER.indexOf(it.skill), n = (bySkill[it.skill] = (bySkill[it.skill] ?? -1) + 1);
      const ang = -Math.PI / 2 + si * Math.PI / 3, cx = 26 + Math.cos(ang) * 15, cy = 40 + Math.sin(ang) * 9.5;
      const r = .95 * Math.sqrt(n), a = n * 2.39996;
      return [cx + Math.cos(a) * r, cy + Math.sin(a) * r * .8];
    });
  }
  // story state of an item: 2 = current chapter, 1 = earlier, 0 = later (not yet)
  function phase(it) {
    if (S.lens !== "story" || S.chapter == null) return 2;
    const c = S.chapter;
    if (it.ch === c) return 2;
    if (c === 7) return 1;
    if (it.ch === 7) return 0;
    return it.ch < c ? 1 : 0;
  }
  function elevation(it) {
    if (S.hidden.has(it.kind)) return 0;
    const ph = phase(it); if (ph === 0) return 0;
    const base = S.lens === "map" ? 150000 * scaleK(S.view.zoom) : 70000;
    return it.size * base * (ph === 1 ? .55 : 1) * (S.selected && S.selected.type === "item" && S.selected.item === it ? 1.35 : 1);
  }

  /* ---------- layers ---------- */
  let dotData = [];
  function buildDots() {
    const P = window.PLACES, W = P.window;
    for (let r = 0; r < P.dots.length; r++) for (let c = 0; c < P.dots[r].length; c++) {
      const ch = P.dots[r][c]; if (ch === " " || ch === "1") continue;
      dotData.push([W.lon0 + (c + .5) * W.stepLon, W.lat1 - (r + .5) * W.stepLat]);
    }
  }
  let routePath = [], routeTimes = [];
  function buildRoute() {
    const pts = scene.route.map(id => places[id]); let t = 0;
    for (let i = 1; i < pts.length; i++) {
      const a = pts[i - 1], b = pts[i], d = Math.hypot(b.lon - a.lon, b.lat - a.lat), h = d * 26000, side = i % 2 ? 1 : -1;
      for (let s = 0; s <= 40; s++) {
        const u = s / 40, nx = -(b.lat - a.lat) / d, ny = (b.lon - a.lon) / d, bow = Math.sin(Math.PI * u) * d * .12 * side;
        routePath.push([a.lon + (b.lon - a.lon) * u + nx * bow, a.lat + (b.lat - a.lat) * u + ny * bow, Math.sin(Math.PI * u) * h]);
        routeTimes.push(t + u * 100);
      }
      t += 100;
    }
  }
  function heatBounds() { const c = S.heat.meta.corners; return [c[3], c[0], c[1], c[2]]; }

  function layers() {
    const z = S.view.zoom, k = scaleK(z), pos = positions(), inHeat = S.heat && z > 10.2;
    const showItems = z < 13.4;
    const L_ = [];
    L_.push(new deck.GeoJsonLayer({
      id: "countries", data: world, filled: true, stroked: true, pickable: true, autoHighlight: true, highlightColor: [51, 82, 255, 70],
      getFillColor: f => f.properties.v ? C.ground2 : C.ground, getLineColor: f => f.properties.v ? [64, 74, 98] : C.edge, lineWidthMinPixels: 1,
      visible: !inHeat
    }));
    L_.push(new deck.ScatterplotLayer({
      id: "dots", data: dotData, getPosition: d => d, getRadius: 11500, radiusMinPixels: .6, radiusMaxPixels: 3,
      getFillColor: [236, 238, 244, 70], visible: z < 9 && !inHeat
    }));
    if (S.lens !== "skill" && z < 9) {
      const full = S.lens === "map";
      L_.push(new deck.TripsLayer({
        id: "route", data: [{ path: routePath, ts: routeTimes }], getPath: d => d.path, getTimestamps: d => d.ts,
        getColor: [236, 238, 244, 150], widthMinPixels: 1.6, trailLength: 1e4, fadeTrail: false, currentTime: full ? 1e4 : S.routeT
      }));
      if (full && !reduce) L_.push(new deck.TripsLayer({
        id: "route-comet", data: [{ path: routePath, ts: routeTimes }], getPath: d => d.path, getTimestamps: d => d.ts,
        getColor: C.lime, widthMinPixels: 3, trailLength: 120, fadeTrail: true, currentTime: ((performance.now() - S.t0) / 22) % 560
      }));
      const ch = S.lens === "story" && S.chapter != null ? CH[S.chapter] : null;
      if (ch && ch.base && ch.arcs.length) L_.push(new deck.ArcLayer({
        id: "arcs-" + S.chapter, data: ch.arcs.map(a => [places[ch.base], places[a]]),
        getSourcePosition: d => [d[0].lon, d[0].lat], getTargetPosition: d => [d[1].lon, d[1].lat],
        getSourceColor: [204, 255, 51, 230], getTargetColor: [51, 82, 255, 230], getWidth: 2, widthMinPixels: 1.5, getHeight: .5, greatCircle: false
      }));
      // featured beacons
      const pulse = reduce ? .5 : ((performance.now() - S.t0) % 2400) / 2400;
      L_.push(new deck.ScatterplotLayer({
        id: "beacons", data: ["frankfurt", "baku"].map(id => places[id]), getPosition: p => [p.lon, p.lat], stroked: true, filled: false,
        getRadius: 4 + pulse * 26, radiusUnits: "pixels", getLineColor: [204, 255, 51, Math.round(220 * (1 - pulse))], lineWidthMinPixels: 1.5,
        updateTriggers: { getRadius: pulse, getLineColor: pulse }, visible: z < 9 && (S.lens === "map" || (S.chapter != null && [2, 6].includes(S.chapter)))
      }));
    }
    if (showItems) {
      L_.push(new deck.ColumnLayer({
        id: "items", data: items.filter(d => S.lens === "skill" || d.place), diskResolution: 12, extruded: true, pickable: true,
        radius: S.lens === "map" ? Math.max(14, 25000 * k) : 30000,
        getPosition: (d) => pos[d.i], getElevation: elevation,
        getFillColor: d => {
          const c = C.kind[d.kind], sel = S.selected && S.selected.type === "item" && S.selected.item === d, hov = S.hover === d;
          if (S.hidden.has(d.kind)) return [0, 0, 0, 0];
          if (sel) return [...C.lime, 255];
          const ph = phase(d); if (ph === 1) return [...c, 70];
          return [...c, hov ? 255 : 230];
        },
        material: { ambient: .45, diffuse: .6, shininess: 40, specularColor: [80, 90, 140] },
        updateTriggers: { getPosition: [S.lens, Math.round(z * 8)], getElevation: [S.lens, S.chapter, Math.round(z * 8), [...S.hidden].join(), S.selected && S.selected.item && S.selected.item.i],
          getFillColor: [S.hover && S.hover.i, S.selected && S.selected.item && S.selected.item.i, [...S.hidden].join(), S.lens, S.chapter] },
        transitions: S.transitionLens ? { getPosition: { duration: 1300, easing: t => 1 - Math.pow(1 - t, 3) }, getElevation: { duration: 900 } } : {}
      }));
    }
    // labels
    if (S.lens !== "skill" && z < 12.4) {
      const curCh = S.lens === "story" && S.chapter != null ? CH[S.chapter] : null;
      const inCh = p => !curCh || items.some(i => i.place === p.id && phase(i) > 0);
      const pl = scene.places.filter(p => p.lon > -30 && inCh(p) && (p.home || p.region || z > 4.6 || p.n >= 3 || (curCh && items.some(i => i.place === p.id && i.ch === S.chapter))));
      L_.push(new deck.TextLayer({
        id: "place-labels", data: pl, pickable: true, getPosition: p => [p.lon, p.lat], getText: p => p.name.toUpperCase(),
        getSize: p => p.home ? 13 : 11, getColor: p => p.home ? C.text : [200, 205, 218], getPixelOffset: p => p.id === "qatar" ? [14, 10] : p.id === "saudi" ? [-14, -10] : [14, -10], getTextAnchor: p => p.id === "saudi" ? "end" : "start",
        fontFamily: "Archivo, Helvetica, Arial, sans-serif", fontWeight: 700, characterSet: "auto", outlineWidth: 3, outlineColor: [5, 6, 10, 255],
        fontSettings: { sdf: true, fontSize: 64, buffer: 6 }, parameters: { depthCompare: "always" }, updateTriggers: { getText: I.lang }
      }));
    }
    if (S.lens === "skill") {
      const cl = SKILL_ORDER.map((s, i) => { const a = -Math.PI / 2 + i * Math.PI / 3; return { s, p: [26 + Math.cos(a) * 15, 40 + Math.sin(a) * 9.5 - 4.4] }; });
      L_.push(new deck.TextLayer({ id: "skills", data: cl, getPosition: d => d.p, getText: d => layerName(d.s).toUpperCase(), getSize: 14, getColor: C.text,
        fontFamily: "Archivo, sans-serif", fontWeight: 800, characterSet: "auto", fontSettings: { sdf: true, fontSize: 64, buffer: 6 }, parameters: { depthCompare: "always" }, outlineWidth: 3, outlineColor: [5, 6, 10, 255], updateTriggers: { getText: I.lang } }));
    }
    // one metre: Frankfurt Altstadt
    if (inHeat) {
      const img = S.heatImg[S.hour];
      if (img) L_.push(new deck.BitmapLayer({ id: "heat", image: img, bounds: heatBounds(), opacity: .92, updateTriggers: { image: S.hour } }));
      L_.push(new deck.GeoJsonLayer({
        id: "plazas", data: S.heat.plazas, filled: true, stroked: true, pickable: true, autoHighlight: true, highlightColor: [204, 255, 51, 60],
        getFillColor: [0, 0, 0, 0], getLineColor: f => S.selected && S.selected.type === "plaza" && S.selected.f === f ? C.lime : [236, 238, 244, 200],
        lineWidthMinPixels: 1.6, getLineWidth: 1, updateTriggers: { getLineColor: S.selected && S.selected.f && S.selected.f.properties.pid }
      }));
      L_.push(new deck.PolygonLayer({
        id: "buildings", data: S.heat.buildings, extruded: true, wireframe: true, getPolygon: d => d[0], getElevation: d => d[1],
        getFillColor: [20, 23, 32, 238], getLineColor: [51, 82, 255, 70], material: { ambient: .4, diffuse: .55, shininess: 24, specularColor: [60, 70, 120] }
      }));
      L_.push(new deck.ScatterplotLayer({
        id: "trees", data: S.heat.trees, getPosition: d => [d[0], d[1], d[2] * .72], getRadius: d => Math.max(1.5, d[3] / 2), radiusUnits: "meters",
        billboard: false, getFillColor: [236, 238, 244, 70], stroked: true, getLineColor: [236, 238, 244, 230], lineWidthMinPixels: .7
      }));
      L_.push(new deck.TextLayer({
        id: "plaza-labels", data: S.heat.plazas.features, getPosition: f => f.properties._c, getText: f => f.properties.name, getSize: 12,
        getColor: C.text, fontFamily: "Archivo, sans-serif", fontWeight: 700, characterSet: "auto", fontSettings: { sdf: true, fontSize: 64, buffer: 6 }, parameters: { depthCompare: "always" },
        outlineWidth: 3, outlineColor: [5, 6, 10, 255], getPixelOffset: [0, -14], visible: z > 14.6
      }));
    }
    return L_;
  }
  let raf = 0; function redraw() { if (raf) return; raf = requestAnimationFrame(() => { raf = 0; deckgl && deckgl.setProps({ layers: layers() }); }); }
  // keep the route comet moving
  (function tick() { if (!reduce && S.lens !== "skill" && S.view.zoom < 9) redraw(); setTimeout(() => requestAnimationFrame(tick), 40); })();

  /* ---------- camera ---------- */
  function fly(v, ms = 2200) {
    const target = { ...v, transitionDuration: reduce ? 0 : ms, transitionInterpolator: FLY() };
    deckgl.setProps({ initialViewState: target });
  }

  /* ---------- HUD: breadcrumb, ladder, readout ---------- */
  function nearestPlace(lon, lat) { let best = null, bd = 1e9; for (const p of scene.places) { const d = Math.hypot((p.lon - lon) * Math.cos(lat * Math.PI / 180), p.lat - lat); if (d < bd) { bd = d; best = p; } } return [best, bd]; }
  function nearestPlaza(lon, lat) { if (!S.heat) return null; let best = null, bd = 1e9; for (const f of S.heat.plazas.features) { const [x, y] = f.properties._c; const d = Math.hypot(x - lon, y - lat); if (d < bd) { bd = d; best = f; } } return best; }
  function level(z) { return z < 5 ? "world" : z < 9 ? "region" : z < 13 ? "city" : "square"; }
  function hud() {
    document.body.classList.toggle("story", S.lens === "story");
    const v = S.view, lv = level(v.zoom);
    document.querySelectorAll("#ladder button").forEach(b => b.classList.toggle("on", b.dataset.level === lv));
    const parts = [T("v2.l.world")];
    if (S.lens === "skill") parts.push(T("v2.lens.skill"));
    else if (S.lens === "story" && S.chapter != null) parts.push(T("v2.lens.story"), T("v2.c" + S.chapter + ".t"));
    else if (S.lens === "map") {
      const [p, d] = nearestPlace(v.longitude, v.latitude);
      if (v.zoom >= 5 && p) parts.push(countryName(p.country));
      if (v.zoom >= 9 && p && d < 1.5) parts.push(p.name);
      if (v.zoom >= 13) { const pz = nearestPlaza(v.longitude, v.latitude); if (pz) parts.push(pz.properties.name); }
    }
    $("#crumbs").innerHTML = parts.map(esc).map(s => `<span>${s}</span>`).join("<i>›</i>");
    const mpp = 156543.03 * Math.cos(v.latitude * Math.PI / 180) / Math.pow(2, v.zoom), ratio = mpp * 3779.5;
    const mag = Math.pow(10, Math.floor(Math.log10(ratio)) - 1);
    $("#ratio").textContent = "1 : " + fmt(Math.round(ratio / mag) * mag);
    const heatOn = S.heat && v.zoom > 12; $("#heatHud").hidden = !heatOn || document.body.classList.contains("touring-noheat");
  }

  /* ---------- Frankfurt one metre: lazy data ---------- */
  async function loadHeat() {
    if (S.heat || S.loadingHeat) return; S.loadingHeat = true; $("#loader").hidden = false;
    const base = "data/frankfurt/";
    const [meta, buildings, trees, plazas] = await Promise.all(["meta", "buildings", "trees", "plazas"].map(n => fetch(base + n + ".json").then(r => r.json())));
    plazas.features.forEach(f => { const ring = (f.geometry.type === "Polygon" ? f.geometry.coordinates[0] : f.geometry.coordinates[0][0]); let x = 0, y = 0; ring.forEach(c => { x += c[0]; y += c[1]; }); f.properties._c = [x / ring.length, y / ring.length]; });
    S.heat = { meta, buildings, trees, plazas };
    $("#rampLo").textContent = meta.range[0]; $("#rampHi").textContent = meta.range[1];
    await heatImage(S.hour); $("#loader").hidden = true; redraw(); hud();
    meta.hours.forEach(h => heatImage(h));
  }
  const LUT = (() => { const lut = new Uint8ClampedArray(256 * 4); for (let v = 1; v < 256; v++) { const t = (v - 1) / 254 * (HEAT.length - 1), i = Math.min(HEAT.length - 2, Math.floor(t)), f = t - i; for (let c = 0; c < 3; c++) lut[v * 4 + c] = HEAT[i][c] + (HEAT[i + 1][c] - HEAT[i][c]) * f; lut[v * 4 + 3] = 235; } return lut; })();
  function heatImage(h) {
    if (S.heatImg[h]) return Promise.resolve(S.heatImg[h]);
    return new Promise(res => {
      const im = new Image(); im.onload = () => {
        const cv = document.createElement("canvas"); cv.width = im.width; cv.height = im.height; const cx = cv.getContext("2d"); cx.drawImage(im, 0, 0);
        const d = cx.getImageData(0, 0, cv.width, cv.height), px = d.data;
        for (let i = 0; i < px.length; i += 4) { const v = px[i], j = v * 4; px[i] = LUT[j]; px[i + 1] = LUT[j + 1]; px[i + 2] = LUT[j + 2]; px[i + 3] = v ? LUT[j + 3] : 0; }
        cx.putImageData(d, 0, 0); S.heatImg[h] = cv; res(cv);
      }; im.src = `data/frankfurt/tmrt_${String(h).padStart(2, "0")}.png`;
    });
  }
  function setHour(h) { S.hour = +h; $("#hour").value = h; $("#hourOut").textContent = String(h).padStart(2, "0") + ":00"; heatImage(S.hour).then(redraw); }

  /* ---------- panel ---------- */
  function kindTag(k) { return `<span class="mono kind k-${k}"><i></i>${esc(kindName(k))}</span>`; }
  function itemRow(it) { return `<li><button data-item="${it.i}"><i class="k-${it.kind}"></i><span>${esc(it.t)}</span><em>${esc(kindName(it.kind))}</em></button></li>`; }
  function openPanel(html) { $("#panelBody").innerHTML = html; $("#panel").classList.add("on"); document.body.classList.add("panel-on"); }
  function closePanel() { $("#panel").classList.remove("on"); document.body.classList.remove("panel-on"); S.selected = null; redraw(); }
  function showItem(it) {
    S.selected = { type: "item", item: it }; redraw();
    const p = it.place ? places[it.place] : null, where = p ? `${p.name} · ${countryName(p.country)}` : T("v2.elsewhere");
    let body = "", acts = "";
    if (it.kind === "folio") {
      const f = folioById(it.ref), w = A.works.find(x => x.id === it.ref);
      if (f) { body = `<img class="thumb" src="../assets/img/folio/${f.id}.webp" alt="" data-board="${f.id}"><p>${esc(L(f.text))}</p>`; acts = `<button class="b b-klein" data-board="${f.id}">${esc(T("pl.open"))} ↗</button>`; }
      else if (w) { body = `<p>${esc(L(w.question))}</p><p>${esc(L(w.outcome))}</p>`; acts = `<button class="b b-klein" data-fly="square">${esc(T("v2.l.square"))} ↘</button><a class="b b-line" href="${w.link}" target="_blank" rel="noopener">${esc(T("v2.heat.study"))} ↗</a>`; }
    } else if (it.kind === "work") {
      const e = expById(it.ref);
      if (e && e.bullets) body = `<p class="mono" style="color:var(--mute)">${esc(L(e.org))} · ${I.fmtDate(e.start)} → ${I.fmtDate(e.end)}</p><ul class="bul">${(e.bullets[I.lang] || e.bullets.en).map(b => `<li>${esc(b)}</li>`).join("")}</ul>`;
      else if (e) body = `<p>${esc(L(e.title))}, ${esc(L(e.org))}</p>`;
      acts = `<a class="b b-line" href="../cv.html?lang=${I.lang}">${esc(T("v2.cv"))} ↗</a>`;
    } else if (it.kind === "map") {
      body = `<p>#30DayMapChallenge 2026</p>`; acts = `<a class="b b-klein" href="https://barisparlatangiller.github.io/${it.ref}/" target="_blank" rel="noopener">${esc(T("pl.live"))} ↗</a>`;
    }
    openPanel(`${kindTag(it.kind)}<h2>${esc(it.t)}</h2><p class="where mono">${esc(where)}${it.kind === "work" ? "" : ""}</p>${body}<div class="acts">${acts}</div>`);
  }
  function showPlace(p) {
    const its = items.filter(i => i.place === p.id);
    S.selected = { type: "place", place: p }; redraw();
    openPanel(`<span class="mono kind">${esc(countryName(p.country))}</span><h2>${esc(p.name)}</h2><p class="where mono">${esc(T("v2.items").replace("{n}", its.length))}</p><ul>${its.map(itemRow).join("")}</ul>`);
  }
  function showPlaza(f) {
    const s = f.properties; S.selected = { type: "plaza", f }; redraw();
    const row = (k, v) => v == null ? "" : `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`;
    openPanel(`<span class="mono kind" style="color:var(--lime)">${esc(T("v2.heat.rank").replace("{r}", s.rank))}</span><h2>${esc(s.name)}</h2><p class="where mono">${esc(T("v2.heat.day"))}</p>
      <dl>${row(T("v2.heat.tmrt"), s.tmrt_day_mean != null ? s.tmrt_day_mean + " °C" : null)}${row(T("v2.heat.peak"), s.tmrt_peak != null ? s.tmrt_peak + " °C" : null)}
      ${row(T("v2.heat.h38"), s.utci38_hours_per_day != null ? s.utci38_hours_per_day + " h" : null)}${row(T("v2.heat.sun"), s.sun_share_day != null ? s.sun_share_day + " %" : null)}${row(T("v2.heat.trees"), s.tree_share != null ? s.tree_share + " %" : null)}</dl>
      <p class="note" style="font-size:12.5px;color:var(--mute);margin-top:14px">${esc(T("v2.heat.note"))}</p>
      <div class="acts"><a class="b b-line" href="https://barisparlatangiller.github.io/Urban-Heat-Stress---Frankfurt-Platz/" target="_blank" rel="noopener">${esc(T("v2.heat.study"))} ↗</a></div>`);
  }
  $("#panel").addEventListener("click", e => {
    const b = e.target.closest("[data-board]"); if (b) { const i = A.folio.findIndex(f => f.id === b.dataset.board); if (i >= 0) BoardViewer.open(A.folio, i); return; }
    const r = e.target.closest("[data-item]"); if (r) { const it = items[+r.dataset.item]; showItem(it); return; }
    const fl = e.target.closest("[data-fly]"); if (fl) goLevel(fl.dataset.fly);
  });
  $("#panelX").onclick = closePanel;

  function thumb(it) {
    if (it.ref === "uhi") return "img/uhi.jpg";
    if (it.kind === "folio" && folioById(it.ref)) return `../assets/img/folio/${it.ref}.webp`;
    return null;
  }
  /* ---------- hover chip ---------- */
  function chip(info) {
    const c = $("#chip"), o = info.object;
    if (!o || document.body.classList.contains("touring")) { c.classList.remove("on"); return; }
    let h = "";
    if (info.layer.id === "items") { const p = o.place ? places[o.place] : null, im = thumb(o); h = `${im ? `<img src="${im}" alt="">` : ""}<span class="mono">${esc(kindName(o.kind))}</span><b>${esc(o.t)}</b>${esc(p ? p.name : T("v2.elsewhere"))}`; }
    else if (info.layer.id === "place-labels") h = `<span class="mono">${esc(countryName(o.country))}</span><b>${esc(o.name)}</b>${esc(T("v2.items").replace("{n}", o.n))}`;
    else if (info.layer.id === "plazas") h = `<span class="mono">${esc(T("v2.heat.rank").replace("{r}", o.properties.rank))}</span><b>${esc(o.properties.name)}</b>${o.properties.tmrt_day_mean} °C`;
    else if (info.layer.id === "countries" && o.properties.v) h = `<b>${esc(countryName(o.properties.n))}</b>${esc(T("v2.items").replace("{n}", items.filter(i => i.country === o.properties.n).length))}`;
    if (!h) { c.classList.remove("on"); return; }
    c.innerHTML = h; c.classList.add("on");
    const x = Math.min(innerWidth - c.offsetWidth - 10, info.x + 16), y = Math.max(10, info.y - c.offsetHeight - 12);
    c.style.transform = `translate(${x}px,${y}px)`;
  }

  /* ---------- lenses & levels ---------- */
  function setLens(l, keepView) {
    if (S.lens === l && l !== "story") return;
    S.lens = l; S.transitionLens = true;
    document.querySelectorAll("#lenses button").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.lens === l)));
    setTimeout(() => { S.transitionLens = false; }, 1400);
    if (l === "story") { goChapter(S.chapter ?? 0); return; }
    stopPlay(); S.chapter = null; $("#chap").hidden = true; timeline();
    if (!keepView) fly(l === "map" ? V.world : V[l], 1800);
    redraw(); hud();
  }
  function goLevel(lv) {
    hideIntro();
    if (S.lens !== "map") setLens("map", true);
    if (lv === "square" || lv === "city") loadHeat();
    fly(V[lv], lv === "square" ? 3200 : 2400);
  }
  $("#lenses").addEventListener("click", e => { const b = e.target.closest("[data-lens]"); if (b) setLens(b.dataset.lens); });
  $("#ladder").addEventListener("click", e => { const b = e.target.closest("[data-level]"); if (b) goLevel(b.dataset.level); });
  $("#hour").addEventListener("input", e => setHour(e.target.value));

  /* ---------- command palette ---------- */
  let cmdSel = 0, cmdResults = [];
  function cmdEntries() {
    const e = [];
    scene.places.forEach(p => e.push({ t: p.name, sub: countryName(p.country), k: "place", go: () => { if (S.lens !== "map") setLens("map", true); fly({ longitude: p.lon, latitude: p.lat, zoom: p.id === "frankfurt" ? 10.6 : 7.2, pitch: 55, bearing: -15 }); showPlace(p); } }));
    items.forEach(it => e.push({ t: it.t, sub: kindName(it.kind), k: it.kind, go: () => { if (S.lens !== "map") setLens("map", true); const p = it.place && places[it.place]; if (p) fly({ longitude: p.lon, latitude: p.lat, zoom: 8.4, pitch: 55, bearing: -15 }); showItem(it); } }));
    if (S.heat) S.heat.plazas.features.forEach(f => e.push({ t: f.properties.name, sub: "Frankfurt · " + T("v2.l.square"), k: "plaza", go: () => { const [x, y] = f.properties._c; fly({ longitude: x, latitude: y, zoom: 17, pitch: 60, bearing: 20 }); showPlaza(f); } }));
    else e.push({ t: "Frankfurt Altstadt · 1 m", sub: T("v2.heat.title"), k: "plaza", go: () => goLevel("square") });
    return e;
  }
  function cmdRender() {
    const q = $("#cmdInput").value.trim().toLocaleLowerCase(I.lang);
    const all = cmdEntries();
    cmdResults = (q ? all.filter(x => (x.t + " " + x.sub).toLocaleLowerCase(I.lang).includes(q)) : all.slice(0, 12)).slice(0, 40);
    cmdSel = Math.min(cmdSel, Math.max(0, cmdResults.length - 1));
    $("#cmdList").innerHTML = cmdResults.length ? cmdResults.map((x, i) => `<li><button data-i="${i}" aria-selected="${i === cmdSel}"><i class="k-${x.k === "place" || x.k === "plaza" ? "award" : x.k}"></i><span>${esc(x.t)}</span><em>${esc(x.sub)}</em></button></li>`).join("") : `<li class="none">${esc(T("v2.search.none"))}</li>`;
  }
  function cmdOpen() { $("#cmdk").hidden = false; $("#cmdInput").value = ""; cmdSel = 0; cmdRender(); setTimeout(() => $("#cmdInput").focus(), 20); }
  function cmdClose() { $("#cmdk").hidden = true; }
  $("#cmdOpen").onclick = cmdOpen;
  $("#cmdInput").addEventListener("input", () => { cmdSel = 0; cmdRender(); });
  $("#cmdInput").addEventListener("keydown", e => {
    if (e.key === "ArrowDown") { cmdSel = Math.min(cmdResults.length - 1, cmdSel + 1); cmdRender(); e.preventDefault(); }
    if (e.key === "ArrowUp") { cmdSel = Math.max(0, cmdSel - 1); cmdRender(); e.preventDefault(); }
    if (e.key === "Enter" && cmdResults[cmdSel]) { const r = cmdResults[cmdSel]; cmdClose(); hideIntro(); r.go(); }
  });
  $("#cmdList").addEventListener("click", e => { const b = e.target.closest("[data-i]"); if (b) { const r = cmdResults[+b.dataset.i]; cmdClose(); hideIntro(); r.go(); } });
  $("#cmdk").addEventListener("click", e => { if (e.target.id === "cmdk") cmdClose(); });

  /* ---------- story: chapters, timeline, autoplay ---------- */
  const fmtY = y => Math.floor(y);
  function chapItems(c) { return items.filter(i => i.ch === c); }
  function timeline() {
    const span = 2026.95 - 2014;
    $("#timeline").innerHTML = CH.map((ch, c) => {
      const w = ch.y ? (ch.y[1] - ch.y[0]) / span * 86 : 14;
      const cls = [S.chapter === c ? "on" : "", S.chapter != null && c < S.chapter && ch.y ? "past" : "", ch.y ? "" : "alt"].join(" ");
      const yr = ch.y ? `${fmtY(ch.y[0])}${fmtY(ch.y[1]) !== fmtY(ch.y[0]) ? "–" + String(Math.min(2026, fmtY(ch.y[1]))).slice(2) : ""}` : T("v2.c7.y");
      return `<button data-c="${c}" class="${cls}" style="flex:${w}" title="${esc(T("v2.c" + c + ".t"))}"><span>${yr}</span><b>${esc(T("v2.c" + c + ".t"))}</b>${S.chapter === c && S.playing ? '<i class="prog" id="prog"></i>' : ""}</button>`;
    }).join("");
  }
  function chapterCard(c) {
    const ch = CH[c], its = chapItems(c);
    const yr = ch.y ? `${fmtY(ch.y[0])}<small>→</small>${ch.y[1] > 2026 ? T("it.present") : fmtY(ch.y[1])}` : esc(T("v2.c7.y"));
    const imgs = its.filter(thumb);
    const counts = KIND_ORDER.map(k => [k, its.filter(i => i.kind === k).length]).filter(x => x[1]);
    const where = [...new Set(its.filter(i => i.place).map(i => places[i.place].name))].slice(0, 5).join(" · ");
    $("#chap").innerHTML = `<div class="yr">${yr}</div>
      <p class="meta mono"><span>${esc(T("v2.chapter"))} ${String(c + 1).padStart(2, "0")} / ${String(CH.length).padStart(2, "0")}</span><span>${esc(where)}</span></p>
      <h2>${esc(T("v2.c" + c + ".t"))}</h2><p>${esc(T("v2.c" + c + ".p"))}</p>
      ${imgs.length ? `<div class="strip">${imgs.map(i => `<button data-item="${i.i}"><img src="${thumb(i)}" alt="" loading="lazy"><span>${esc(i.t)}</span></button>`).join("")}</div>` : ""}
      <div class="nav"><button class="b b-line" id="chPrev" ${c === 0 ? "disabled" : ""}>← ${esc(T("v2.prev"))}</button><button class="b b-paper" id="chNext">${esc(c === CH.length - 1 ? T("v2.l.square") + " ↘" : T("v2.next") + " →")}</button></div>
      <div class="key mono">${counts.map(([k, n]) => `<span class="k-${k}"><i></i>${n} ${esc(kindName(k))}</span>`).join("")}</div>`;
    $("#chap").hidden = false; $("#chap").style.animation = "none"; void $("#chap").offsetWidth; $("#chap").style.animation = "";
  }
  function goChapter(c) {
    hideIntro(); $("#endCard").hidden = true;
    if (c >= CH.length) return finale();
    if (S.lens !== "story") { S.lens = "story"; document.querySelectorAll("#lenses button").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.lens === "story"))); }
    S.chapter = Math.max(0, c); S.transitionLens = true; setTimeout(() => S.transitionLens = false, 1300);
    S.routeTarget = ROUTE_ARRIVE.filter(a => a <= S.chapter).length * 100 + (S.chapter === 7 ? 0 : 0);
    if (S.chapter === 7) S.routeTarget = 500;
    closePanel(true); fly(CH[S.chapter].v, 2600); chapterCard(S.chapter); timeline(); redraw(); hud();
    if (S.playing) schedule();
  }
  function finale() {
    stopPlay(); $("#chap").hidden = true; setLens("map", true); goLevel("square"); setHour(15);
    $("#chap").innerHTML = `<div class="yr">1 m</div><p class="meta mono"><span>Frankfurt · Altstadt</span><span>27.06.2026 · 15:00</span></p><h2>${esc(T("v2.f1.t"))}</h2><p>${esc(T("v2.fin"))}</p><div class="nav"><button class="b b-paper" id="chEnd">${esc(T("v2.cv"))} / PDF</button></div>`;
    setTimeout(() => { $("#chap").hidden = false; }, 1200);
  }
  let playTimer = 0, playStart = 0; const STOP = 5600;
  function schedule() { clearTimeout(playTimer); playStart = performance.now(); playTimer = setTimeout(() => goChapter(S.chapter + 1), STOP); }
  function startPlay() { S.playing = true; $("#playBtn").classList.add("on"); goChapter(S.chapter == null || S.lens !== "story" || S.chapter >= CH.length - 1 ? 0 : S.chapter); }
  function stopPlay() { S.playing = false; clearTimeout(playTimer); $("#playBtn").classList.remove("on"); const pr = $("#prog"); if (pr) pr.remove(); }
  (function prog() { const pr = $("#prog"); if (pr && S.playing) pr.style.width = Math.min(100, (performance.now() - playStart) / STOP * 100) + "%"; requestAnimationFrame(prog); })();
  // ease the route drawing toward the chapter
  (function routeAnim() { if (Math.abs(S.routeT - S.routeTarget) > .5) { S.routeT += (S.routeTarget - S.routeT) * .05; redraw(); } setTimeout(() => requestAnimationFrame(routeAnim), 30); })();
  $("#timeline").addEventListener("click", e => { const b = e.target.closest("[data-c]"); if (b) { stopPlay(); goChapter(+b.dataset.c); } });
  $("#playBtn").onclick = () => S.playing ? stopPlay() : startPlay();
  $("#chap").addEventListener("click", e => {
    if (e.target.closest("#chPrev")) { stopPlay(); goChapter(S.chapter - 1); }
    else if (e.target.closest("#chNext")) { stopPlay(); goChapter(S.chapter + 1); }
    else if (e.target.closest("#chEnd")) { $("#chap").hidden = true; $("#endCard").hidden = false; $("#endPdf").href = `../assets/cv/Baris-Parlatangiller-CV-GIS-${I.lang.toUpperCase()}.pdf`; }
    else { const b = e.target.closest("[data-item]"); if (b) { const it = items[+b.dataset.item]; if (it.kind === "folio" && folioById(it.ref)) { BoardViewer.open(A.folio, A.folio.findIndex(f => f.id === it.ref), 1); } else showItem(it); } }
  });
  $("#endExplore").onclick = () => { $("#endCard").hidden = true; };

  /* ---------- featured work ---------- */
  function featured() {
    const card = f => `<button class="feat" data-feat="${f.id}"><div class="img"><img src="${f.img}" alt="" loading="lazy"><span class="badge">${esc(f.badge)}</span></div><div class="body"><h3>${esc(T(f.t))}</h3><p>${esc(T(f.s))}</p><span class="go">${esc(T(f.act))} →</span></div></button>`;
    $("#introFeats").innerHTML = FEATURED.map(card).join(""); $("#dockFeats").innerHTML = FEATURED.map(card).join("");
  }
  document.addEventListener("click", e => { const b = e.target.closest("[data-feat]"); if (!b) return; const f = FEATURED.find(x => x.id === b.dataset.feat); hideIntro(); stopPlay(); f.go(); });

  /* ---------- intro ---------- */
  function hideIntro() { const el = $("#intro"); if (el.classList.contains("gone")) return; el.classList.add("gone"); document.body.classList.remove("intro-on"); }
  $("#introEnter").onclick = () => { hideIntro(); };
  $("#introStory").onclick = () => startPlay();
  function introText() {
    const t = window.PLACES.totals;
    $("#introStats").innerHTML = [[t.countries, T("pl.countries")], [t.places, T("pl.places")], [items.length, T("pl.entries")], [fmt(t.route_km), T("pl.route")]].map(([v, k]) => `<div><dt>${v}</dt><dd>${esc(k)}</dd></div>`).join("");
  }

  /* ---------- keyboard ---------- */
  addEventListener("keydown", e => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); $("#cmdk").hidden ? cmdOpen() : cmdClose(); return; }
    if (e.target.matches("input")) { if (e.key === "Escape") cmdClose(); return; }
    if (document.querySelector("#viewer[open]")) return;
    if (e.key === "Escape") { if (!$("#cmdk").hidden) cmdClose(); else if (S.playing) stopPlay(); else closePanel(); }
    if (e.key === "1") setLens("story"); if (e.key === "2") setLens("map"); if (e.key === "3") setLens("skill");
    if (S.lens === "story" && S.chapter != null) { if (e.key === "ArrowRight") { stopPlay(); goChapter(S.chapter + 1); } if (e.key === "ArrowLeft") { stopPlay(); goChapter(S.chapter - 1); } }
    if (e.key === " " && document.body.classList.contains("intro-on") === false) { e.preventDefault(); S.playing ? stopPlay() : startPlay(); }
    if (e.key === "Enter" && !$("#intro").classList.contains("gone")) hideIntro();
  });

  /* ---------- boot ---------- */
  function webglOk() { try { const c = document.createElement("canvas"); return !!(c.getContext("webgl2") || c.getContext("webgl")); } catch (e) { return false; } }
  async function boot() {
    I.apply();
    if (!webglOk()) { $("#nogl").hidden = false; return; }
    document.body.classList.add("intro-on");
    [scene, world] = await Promise.all([fetch("data/scene.json").then(r => r.json()), fetch("data/world.json").then(r => r.json())]);
    items = scene.items; scene.places.forEach(p => places[p.id] = p);
    items.forEach(it => { it.ch = CH.findIndex(c => c.refs.includes(it.ref) || (c.refs.includes(MAPS) && it.kind === "map")); if (it.ch < 0) it.ch = 7; });
    buildDots(); buildRoute(); introText(); featured(); timeline();
    try { await document.fonts.load("800 64px Archivo"); await document.fonts.load("400 48px 'JetBrains Mono'"); } catch (e) { }
    deckgl = new deck.Deck({
      parent: $("#map"), views: new deck.MapView({ repeat: false, farZMultiplier: 3 }), initialViewState: S.view,
      controller: { dragRotate: true, touchRotate: true, inertia: 300, scrollZoom: { speed: .012, smooth: true } },
      layers: [], getCursor: ({ isHovering, isDragging }) => isDragging ? "grabbing" : isHovering ? "pointer" : "grab",
      onViewStateChange: ({ viewState }) => {
        const before = S.view.zoom; S.view = viewState; hud();
        if (viewState.zoom > 11 && !S.heat && Math.abs(viewState.longitude - 8.68) < .4 && Math.abs(viewState.latitude - 50.11) < .3) loadHeat();
        if (Math.abs(before - viewState.zoom) > .01 || S.lens !== "map") redraw();
      },
      onHover: info => { const o = info.layer && info.layer.id === "items" ? info.object : null; if (o !== S.hover) { S.hover = o; redraw(); } chip(info);
        if (info.coordinate) $("#coords").textContent = `${Math.abs(info.coordinate[1]).toFixed(4)}° ${info.coordinate[1] >= 0 ? "N" : "S"} · ${Math.abs(info.coordinate[0]).toFixed(4)}° ${info.coordinate[0] >= 0 ? "E" : "W"}`; },
      onClick: info => {
        hideIntro(); if (!info.object) return;
        const id = info.layer.id;
        if (id === "items") showItem(info.object);
        else if (id === "place-labels") showPlace(info.object);
        else if (id === "plazas") showPlaza(info.object);
        else if (id === "countries" && info.object.properties.v) { const its = scene.places.filter(p => p.country === info.object.properties.n); if (its[0]) showPlace(its.sort((a, b) => b.n - a.n)[0]); }
      },
      onError: e => console.warn(e)
    });
    redraw(); hud();
    const autoTour = new URLSearchParams(location.search).get("tour") === "1";
    setTimeout(() => { fly(V.world, reduce ? 0 : 4200); }, 400);
    if (autoTour) setTimeout(startPlay, 1200);
    I.onChange(() => { introText(); featured(); timeline(); if (S.chapter != null && !$("#chap").hidden) chapterCard(S.chapter); hud(); redraw(); if (S.selected) { const s = S.selected; s.type === "item" ? showItem(s.item) : s.type === "place" ? showPlace(s.place) : showPlaza(s.f); } });
  }
  boot();
})();

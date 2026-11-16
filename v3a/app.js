/* v3a — the map follows the reader. Whatever is in the middle of the right column
   (a project, a role, a map) is shown on the fixed map on the left. */
(function () {
  const { A, P, L, T, esc } = V3, I = window.I18N;
  const $ = s => document.querySelector(s);
  const byId = Object.fromEntries(P.places.map(p => [p.id, p]));
  const HOME = { longitude: 24, latitude: 39, zoom: innerWidth < 900 ? 2.4 : 3.3, pitch: 0, bearing: 0 };
  let world = null, focus = [], label = null, deckgl;

  /* ---------- map ---------- */
  function layers() {
    const set = new Set(focus.map(p => p.id));
    return [
      new deck.GeoJsonLayer({ id: "land", data: world, filled: true, stroked: true, getFillColor: f => f.properties.v ? [255, 255, 255] : [250, 250, 247], getLineColor: f => f.properties.v ? [190, 188, 178] : [222, 220, 212], lineWidthMinPixels: 1, updateTriggers: {} }),
      new deck.ScatterplotLayer({ id: "all", data: P.places.filter(p => p.lon > -30), getPosition: p => [p.lon, p.lat], getRadius: 4, radiusUnits: "pixels", getFillColor: p => set.has(p.id) ? [0, 0, 0, 0] : [17, 18, 20, 120] , updateTriggers: { getFillColor: [...set].join() } }),
      new deck.ScatterplotLayer({ id: "focus", data: focus, getPosition: p => [p.lon, p.lat], getRadius: 9, radiusUnits: "pixels", getFillColor: [31, 59, 255], stroked: true, getLineColor: [255, 255, 255], lineWidthMinPixels: 2.5 }),
      new deck.ScatterplotLayer({ id: "halo", data: focus, getPosition: p => [p.lon, p.lat], getRadius: 22, radiusUnits: "pixels", filled: false, stroked: true, getLineColor: [31, 59, 255, 90], lineWidthMinPixels: 1.5 }),
      new deck.TextLayer({ id: "labels", data: focus, getPosition: p => [p.lon, p.lat], getText: p => p.name, getSize: 14, getColor: [17, 18, 20], getPixelOffset: [14, -12], getTextAnchor: "start",
        fontFamily: "Archivo, Helvetica, sans-serif", fontWeight: 700, characterSet: "auto", outlineWidth: 4, outlineColor: [245, 244, 239, 255], fontSettings: { sdf: true, fontSize: 64, buffer: 8 } })
    ];
  }
  function show(places, where) {
    focus = places.filter(Boolean).filter(p => p.lon > -30);
    deckgl && deckgl.setProps({ layers: layers() });
    $("#mapWhere").textContent = where || (focus.length ? [...new Set(focus.map(p => p.name))].join(" · ") : "Europe · Middle East");
    if (!focus.length) return fly(HOME);
    const lons = focus.map(p => p.lon), lats = focus.map(p => p.lat);
    const [w, s, e, n] = [Math.min(...lons), Math.min(...lats), Math.max(...lons), Math.max(...lats)];
    const span = Math.max(e - w, (n - s) * 1.4, .01);
    const zoom = Math.max(2.4, Math.min(focus.length === 1 ? 6.2 : 7.2, Math.log2(360 / span) - (innerWidth < 900 ? 1.4 : .9)));
    fly({ longitude: (w + e) / 2, latitude: (s + n) / 2, zoom, pitch: 0, bearing: 0 });
  }
  function fly(v) { deckgl && deckgl.setProps({ initialViewState: { ...v, transitionDuration: 1400, transitionInterpolator: new deck.FlyToInterpolator({ speed: 1.6 }) } }); }

  /* ---------- content ---------- */
  function render() {
    $("#pdf").href = V3.pdf();
    $("#stats").innerHTML = V3.stats().map(([v, k]) => `<div><dt>${v}</dt><dd>${esc(k)}</dd></div>`).join("");
    $("#projects").innerHTML = V3.projects().map((p, i) => `
      <article class="proj${p.featured ? " feat" : ""}" data-i="${i}" data-places="${p.place ? p.place.id : ""}">
        <div class="img" data-open="${i}"><img src="${p.img}" alt="${esc(p.title)}" loading="${i < 3 ? "eager" : "lazy"}">${p.badge ? `<span class="badge">${esc(p.badge)}</span>` : ""}</div>
        <div class="body"><p class="meta mono"><span>${esc(p.where)}</span><span>${esc(p.year)}</span></p><h3>${esc(p.title)}</h3><p>${esc(p.text)}</p>
        <div class="go"><button data-open="${i}">${esc(p.board ? T("v3.open") : T("v3.live"))} →</button>${p.repo ? `<a href="${p.repo}" target="_blank" rel="noopener">GitHub ↗</a>` : ""}</div></div>
      </article>`).join("");
    $("#careerList").innerHTML = V3.experience().map(e => `
      <li data-places="${e.places.join(",")}"><span class="yr">${V3.yr(e.from)}–${V3.yr(e.to).slice(-2) === V3.yr(e.from).slice(-2) ? "" : V3.yr(e.to)}</span>
        <div><b>${esc(e.role)}</b><span class="org">${esc(e.org)}${e.city ? " · " + esc(e.city) : ""}</span>${e.bullets.length ? `<ul>${e.bullets.slice(0, 2).map(b => `<li>${esc(b)}</li>`).join("")}</ul>` : ""}</div></li>`).join("");
    const cityPlace = { Berlin: "berlin", Leipzig: "leipzig", Frankfurt: "frankfurt", "München": "munich", "İstanbul": "istanbul", Hamburg: "hamburg", Koblenz: "koblenz", London: "london" };
    $("#mapList").innerHTML = V3.maps().map(r => `<li><a href="https://barisparlatangiller.github.io/${r.repo}/" target="_blank" rel="noopener" data-places="${cityPlace[r.city] || ""}"><span class="d">D${String(r.day).padStart(2, "0")}</span><span>${esc(r.title)}</span><span class="c">${esc(r.city)}</span></a></li>`).join("");
    $("#switch").innerHTML = V3.switcher("v3a");
    observe();
  }
  let io;
  function observe() {
    io && io.disconnect();
    io = new IntersectionObserver(es => {
      es.forEach(e => {
        if (!e.isIntersecting) return;
        document.querySelectorAll(".proj.on, .career > li.on").forEach(x => x.classList.remove("on"));
        const el = e.target; el.classList.add("on");
        const ids = (el.dataset.places || "").split(",").filter(Boolean);
        if (el.dataset.focus === "all") show([], "Europe · Middle East");
        else if (el.dataset.focus === "maps") show(["berlin", "leipzig", "frankfurt", "munich", "hamburg", "koblenz", "london", "istanbul"].map(id => byId[id]));
        else show(ids.map(id => byId[id]));
      });
    }, { rootMargin: "-45% 0px -45% 0px" });
    document.querySelectorAll(".proj, .career > li, [data-focus]").forEach(el => io.observe(el));
  }
  document.addEventListener("click", e => { const o = e.target.closest("[data-open]"); if (o) V3.open(V3.projects()[+o.dataset.open]); });
  document.addEventListener("pointerover", e => { const a = e.target.closest(".maplist a"); if (a && a.dataset.places) show([byId[a.dataset.places]]); });

  async function boot() {
    I.apply();
    world = await fetch("../v2/data/world.json").then(r => r.json());
    deckgl = new deck.Deck({ parent: $("#map"), views: new deck.MapView({ repeat: false }), initialViewState: HOME, controller: { scrollZoom: false, dragRotate: false }, layers: [],
      onHover: i => { if (i.coordinate) $("#mapCoord").textContent = `${i.coordinate[1].toFixed(3)}° N · ${i.coordinate[0].toFixed(3)}° E`; } });
    render(); show([]);
    I.onChange(render);
  }
  boot();
})();

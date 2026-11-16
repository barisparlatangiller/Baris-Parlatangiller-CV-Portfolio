/* v4c — three doors: hiring, planning, data. One click turns the page into the version that visitor needs. */
(function () {
  const { A, L, T, esc } = V3, I = window.I18N;
  const $ = s => document.querySelector(s);
  let cur = Number((location.hash.match(/^#door-(\d)/) || [])[1]) || 0;
  const card = (p, long) => `<button class="card" data-open="${p.id}"><div class="img"><img src="${p.img}" alt="" loading="lazy"></div><div class="m">${esc(p.where)} · ${esc(p.year)}</div><b>${esc(p.title)}</b>${long ? `<p>${esc(p.text)}</p>` : ""}</button>`;
  const back = `<button class="back" data-back>← ${esc(T("v4.back"))}</button>`;
  function face(n, img) {
    return `<button class="face" data-go="${n}"><span class="n">0${n}</span><img class="peek" src="${img}" alt=""><h2>${esc(T(`v4.d${n}.t`))}</h2><p>${esc(T(`v4.d${n}.p`))}</p><span class="go"><span>→</span></span></button><button class="rail" data-go="${n}">${esc(T(`v4.d${n}.t`))}</button>`;
  }
  function room1() {
    const F = A.focus.gis, facts = [["8+", T("v4.f1")], ["10", T("v4.f2")], ["ISOCARP", T("v4.f3")], ["FFM", T("v4.f4")]];
    return `<div class="room">${back}<h1>${esc(A.person.name)}</h1><p class="sub">${esc(L(F.headline))}</p>
      <div class="btns"><a class="btn fill" href="${V3.pdf("GIS")}" download><span>${esc(T("v2.pdf"))} · GIS</span></a><a class="btn" href="${V3.pdf("Planning")}" download><span>${esc(T("v2.pdf"))} · Planning</span></a><a class="btn" href="../cv.html" data-keep-lang><span>${esc(T("v2.cv"))}</span></a><a class="btn" href="mailto:${A.person.email}"><span>${esc(A.person.email)}</span></a></div>
      <div class="facts">${facts.map(([b, t]) => `<div><b>${esc(b)}</b>${esc(t)}</div>`).join("")}</div>
      <h3>${esc(T("cv.experience"))}</h3><ul class="jobs">${V3.experience().map(e => `<li><span class="y">${V3.yr(e.from)}${V3.yr(e.from) === V3.yr(e.to) ? "" : " – " + V3.yr(e.to)}</span><b>${esc(e.role)}</b><span>${esc(e.org)}, ${esc(e.city)}</span></li>`).join("")}</ul>
      <div class="pair"><div><h3>${esc(T("v4.langs"))}</h3><ul class="langs">${A.languages.map(l => `<li>${esc(L(l.name))}<span>${esc(L(l.level))}</span></li>`).join("")}</ul></div>
      <div><h3>${esc(T("cv.education"))}</h3><ul class="langs">${A.education.map(e => `<li>${esc(L(e.title))}<span>${e.end.slice(0, 4)}</span></li>`).join("")}</ul></div></div></div>`;
  }
  function room2() {
    const ps = V3.projects(), f = ps.filter(p => p.featured), o = ps.filter(p => !p.featured);
    return `<div class="room">${back}<h1>${esc(T("v4.d2.t"))}</h1><p class="sub">${esc(T("v4.d2.p"))}</p>
      <div class="feat">${f.map(p => card(p, true)).join("")}</div>
      <h3>${esc(T("v3.index"))} · ${o.length}</h3><div class="grid">${o.map(p => card(p, false)).join("")}</div>
      <div class="btns"><a class="btn" href="mailto:${A.person.email}"><span>${esc(T("v2.contact"))}</span></a></div></div>`;
  }
  function room3() {
    const uhi = A.repos.find(r => r.kind === "research"), maps = V3.maps();
    const tools = ["Python", "GeoPandas", "Rasterio", "Shapely", "pyproj", "QGIS", "ArcGIS Pro", "PostGIS", "SOLWEIG", "deck.gl", "Leaflet", "Git"];
    return `<div class="room">${back}<h1>${esc(T("v4.d3.t"))}</h1><p class="sub">${esc(T("v4.d3.p"))}</p>
      <div class="repo-hero"><img src="../v2/img/uhi.jpg" alt=""><div><code>${esc(T("v4.repos"))} · 01</code><b>${esc(uhi.title)}</b><p>${esc(uhi.theme)}</p>
        <div class="btns" style="margin:0"><a class="btn" href="https://github.com/barisparlatangiller/${uhi.repo}" target="_blank" rel="noopener"><span>GitHub</span></a><a class="btn" href="https://barisparlatangiller.github.io/${uhi.repo}/" target="_blank" rel="noopener"><span>Live map</span></a></div></div></div>
      <h3>#30DayMapChallenge 2026 · ${maps.length}</h3>
      <ul class="rlist">${maps.map(r => `<li><a href="https://barisparlatangiller.github.io/${r.repo}/" target="_blank" rel="noopener"><span class="dn">D${String(r.day).padStart(2, "0")}</span><span><b>${esc(r.title)}</b><br><small>${esc(r.city)} · ${esc(r.theme)}</small></span><code>↗</code></a></li>`).join("")}</ul>
      <div class="pipe"><b>${esc(T("v4.pipe"))}</b><p>${esc(T("v4.pipe.p"))}</p></div>
      <h3>${esc(T("v4.stackt"))}</h3><div class="chips">${tools.map(t => `<span>${t}</span>`).join("")}</div>
      <div class="btns"><a class="btn" href="${A.person.links.github}" target="_blank" rel="noopener"><span>github.com/barisparlatangiller</span></a></div></div>`;
  }
  function render() {
    const peek = { 1: "../assets/img/folio/baku-2040.webp", 2: "../assets/img/folio/nizwa-2040.webp", 3: "../v2/img/uhi.jpg" };
    const rooms = { 1: room1, 2: room2, 3: room3 };
    document.querySelectorAll(".door").forEach(d => { const n = +d.dataset.d; d.innerHTML = face(n, peek[n]) + rooms[n](); });
    $("#switch").innerHTML = V3.switcher("v4c"); I.apply(); set(cur, true);
  }
  function set(n, silent) {
    cur = n;
    $("#doors").classList.toggle("open", !!n);
    document.querySelectorAll(".door").forEach(d => d.classList.toggle("on", +d.dataset.d === n));
    if (!silent) { history.replaceState(null, "", n ? "#door-" + n : location.pathname + location.search); scrollTo({ top: 0, behavior: "smooth" }); }
  }
  document.addEventListener("click", e => {
    const o = e.target.closest("[data-open]"); if (o) return V3.open(V3.projects().find(p => p.id === o.dataset.open));
    const g = e.target.closest("[data-go]"); if (g) return set(+g.dataset.go);
    if (e.target.closest("[data-back]")) set(0);
  });
  addEventListener("keydown", e => { if (e.key === "Escape" && cur && !document.querySelector("dialog[open]")) set(0); });
  render(); I.onChange(render);
})();

/* Atlas page: renders every section from data/content.js and re-renders on language change. */
(function () {
  const A = window.ATLAS, I = window.I18N, L = I.L, T = I.T;
  const $ = s => document.querySelector(s);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const layerById = Object.fromEntries(A.layers.map(l => [l.id, l]));
  const ym = s => { if (!s) { const d = new Date(); return d.getFullYear() + d.getMonth() / 12; } const [y, m] = s.split("-").map(Number); return y + (m - 1) / 12; };
  const pagesUrl = r => `https://barisparlatangiller.github.io/${r}/`;
  const repoUrl = r => `https://github.com/barisparlatangiller/${r}`;

  /* ---------------- hero ---------------- */
  function renderStats() {
    const items = [["7", "stat.countries2"], ["400k", "stat.ha2"], [A.repos.length, "stat.repos2"], [A.folio.length, "fo.kicker"]];
    $("#stats").innerHTML = items.map(([v, k]) => `<div><dt>${v}</dt><dd>${esc(k === "fo.kicker" ? "Folio 2026" : T(k))}</dd></div>`).join("");
  }
  function renderSun(sun) {
    const t = Sun.frankfurtTime(), dirs = T("dirs").split(",");
    const shadowAz = (sun.az + 180) % 360, dir = dirs[Math.round(shadowAz / 45) % 8];
    const line = sun.alt > 0
      ? T("fig.sun").replace("{time}", t).replace("{alt}", sun.alt.toFixed(1)).replace("{len}", (10 / Math.tan(Math.max(.5, sun.alt) * Math.PI / 180)).toFixed(1)).replace("{dir}", dir)
      : T("fig.night").replace("{time}", t).replace("{alt}", Math.abs(sun.alt).toFixed(1));
    $("#sunline").textContent = line;
  }

  /* ---------------- 01 itinerary ---------------- */
  const BB = { lon0: 2, lon1: 62, lat0: 19, lat1: 55 };
  const VW = 1000, VH = 760;
  const proj = (lat, lon) => [(lon - BB.lon0) / (BB.lon1 - BB.lon0) * VW, (BB.lat1 - lat) / (BB.lat1 - BB.lat0) * VH];
  const stations = [
    ...A.education.map(e => ({ ...e, kind: "edu" })),
    ...A.experience.map(e => ({ ...e, kind: "job" }))
  ];
  let selected = A.experience[0].id;

  function drawMap() {
    const svg = $("#routeMap"); let s = "";
    for (let lon = 5; lon <= 60; lon += 5) { const [x] = proj(0, lon); s += `<line class="grat" x1="${x}" y1="0" x2="${x}" y2="${VH}"/>${lon % 10 === 0 ? `<text class="grat-label" x="${x + 4}" y="${VH - 6}">${lon}°E</text>` : ""}`; }
    for (let lat = 20; lat <= 55; lat += 5) { const [, y] = proj(lat, 0); s += `<line class="grat" x1="0" y1="${y}" x2="${VW}" y2="${y}"/><text class="grat-label" x="4" y="${y - 4}">${lat}°N</text>`; }
    // life route in time order
    const seq = ["izmir", "frankfurt", "izmir", "frankfurt", "munich", "frankfurt"];
    let d = "";
    seq.forEach((p, i) => {
      const [x, y] = proj(A.places[p].lat, A.places[p].lon);
      if (i === 0) { d += `M${x},${y}`; return; }
      const [px, py] = proj(A.places[seq[i - 1]].lat, A.places[seq[i - 1]].lon);
      const dx = x - px, dy = y - py, dist = Math.hypot(dx, dy);
      const k = (i % 2 ? -1 : 1) * (.12 + i * .045) * dist;          // bend grows with each trip
      const mx = (px + x) / 2 - dy / dist * k, my = (py + y) / 2 + dx / dist * k;
      d += ` Q${mx},${my} ${x},${y}`;
    });
    s += `<path class="route" id="lifeRoute" d="${d}"/>`;
    // project arcs from Frankfurt
    const [fx, fy] = proj(A.places.frankfurt.lat, A.places.frankfurt.lon);
    ["baku", "tbilisi", "muscat", "riyadh", "doha"].forEach(p => {
      const [x, y] = proj(A.places[p].lat, A.places[p].lon);
      s += `<path class="arc" d="M${fx},${fy} Q${(fx + x) / 2},${Math.min(fy, y) - 90} ${x},${y}"/>`;
    });
    const labelPos = { munich: [12, 18], frankfurt: [-12, -14, "end"], sakarya: [12, -10], bilecik: [12, 16], izmir: [-12, 4, "end"], bodrum: [12, 16], doha: [12, 4], riyadh: [-12, 4, "end"], muscat: [12, 4], baku: [12, 4], tbilisi: [-12, -8, "end"] };
    Object.entries(A.places).forEach(([id, p]) => {
      const [x, y] = proj(p.lat, p.lon); const [dx, dy, an] = labelPos[id] || [12, 4];
      s += `<g class="pt" data-place="${id}"><circle class="ring" cx="${x}" cy="${y}" r="6"/><circle class="dot" cx="${x}" cy="${y}" r="5"/><text x="${x + dx}" y="${y + dy}" text-anchor="${an || "start"}">${esc(p.name)}</text></g>`;
    });
    svg.innerHTML = s;
    const route = $("#lifeRoute"), len = route.getTotalLength();
    route.style.strokeDasharray = len; route.style.strokeDashoffset = len;
    new IntersectionObserver(([en], o) => { if (en.isIntersecting) { route.style.transition = "stroke-dashoffset 2.6s cubic-bezier(.2,.7,.1,1)"; route.style.strokeDashoffset = 0; o.disconnect(); } }, { threshold: .3 }).observe(svg);
  }

  function renderGantt() {
    const y0 = 2014, y1 = new Date().getFullYear() + 1, span = y1 - y0;
    const pct = v => ((v - y0) / span * 100).toFixed(3) + "%";
    let ticks = ""; for (let y = y0; y <= y1; y++) ticks += `<span class="tick" style="left:${pct(y)}">${y}</span>`;
    const rows = stations.slice().sort((a, b) => ym(a.start) - ym(b.start)).map(st => {
      const a = ym(st.start), b = ym(st.end), label = st.kind === "edu" ? L(st.title) : `${L(st.org)}, ${L(st.role)}`;
      return `<div class="row" role="listitem"><button class="barbtn ${st.kind}" data-id="${st.id}" aria-pressed="${st.id === selected}" style="left:${pct(a)};width:calc(${pct(b)} - ${pct(a)})" title="${esc(label)}">${esc(st.kind === "edu" ? T("it.edu") : L(st.org))}</button></div>`;
    }).join("");
    $("#gantt").innerHTML = `<div class="axis">${ticks}<span class="now" style="left:${pct(ym(null))}"></span></div>${rows}`;
  }

  function renderDetail() {
    const st = stations.find(s => s.id === selected);
    const when = `${I.fmtDate(st.start)} → ${I.fmtDate(st.end)}`;
    let html;
    if (st.kind === "edu") {
      html = `<p class="when mono">${esc(when)} · ${esc(T("it.edu"))}</p><h3>${esc(L(st.title))}</h3><p class="org">${esc(L(st.org))}</p>`;
    } else {
      html = `<p class="when mono">${esc(when)} · ${esc(L(st.city))}</p><h3>${esc(L(st.role))}</h3><p class="org">${esc(L(st.org))}</p>
        <ul>${(st.bullets[I.lang] || st.bullets.en).map(b => `<li>${esc(b)}</li>`).join("")}</ul>
        <div class="tags">${st.layers.map(id => `<span class="tag"><i style="background:${layerById[id].color}"></i>${esc(L(layerById[id].name))}</span>`).join("")}</div>`;
    }
    const el = $("#itDetail"); el.innerHTML = html; el.classList.remove("swap"); void el.offsetWidth; el.classList.add("swap");
    document.querySelectorAll("#routeMap .pt").forEach(g => {
      const on = st.places.includes(g.dataset.place);
      g.classList.toggle("hot", on); g.classList.toggle("dim", !on);
    });
  }

  $("#gantt").addEventListener("click", e => {
    const b = e.target.closest(".barbtn"); if (!b) return;
    selected = b.dataset.id;
    document.querySelectorAll(".barbtn").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
    renderDetail();
  });
  $("#routeMap").addEventListener("click", e => {
    const g = e.target.closest(".pt"); if (!g) return;
    const st = stations.slice().reverse().find(s => s.places.includes(g.dataset.place));
    if (st) { selected = st.id; renderGantt(); renderDetail(); }
  });

  /* ---------------- 02 layers ---------------- */
  const active = new Set(A.layers.map(l => l.id));
  function renderLayers() {
    $("#layerList").innerHTML = A.layers.map(l => `<li><label><input type="checkbox" value="${l.id}" ${active.has(l.id) ? "checked" : ""}><span class="sw" style="background:${l.color}"></span><span><strong>${esc(L(l.name))}</strong><small>${esc(L(l.desc))}</small><small class="tools">${esc(l.tools)}</small></span></label></li>`).join("");
    const rows = [
      ...A.works.map(w => ({ t: L(w.title), s: `${w.year} · ${L(w.place)}`, layers: w.layers })),
      ...A.experience.map(e => ({ t: L(e.role), s: `${L(e.org)} · ${e.start.slice(0, 4)}`, layers: e.layers }))
    ];
    const head = `<div class="mx-head"><span></span>${A.layers.map(l => `<span class="c"><i style="background:${l.color}"></i>${esc(L(l.name))}</span>`).join("")}</div>`;
    const body = rows.map(r => `<div class="mx-row" data-layers="${r.layers.join(" ")}"><div class="t"><b>${esc(r.t)}</b><small>${esc(r.s)}</small></div>${A.layers.map(l => r.layers.includes(l.id) ? `<span class="d" data-l="${l.id}" style="background:${l.color}"></span>` : `<span class="d blank"></span>`).join("")}</div>`).join("");
    $("#matrix").innerHTML = head + body;
    applyLayers(true);
  }
  function applyLayers(stagger) {
    document.querySelectorAll(".mx-row").forEach((row, ri) => {
      const ls = row.dataset.layers.split(" ");
      row.classList.toggle("off", !ls.some(l => active.has(l)));
      row.querySelectorAll(".d[data-l]").forEach((d, di) => {
        const on = active.has(d.dataset.l);
        if (stagger) d.style.transitionDelay = (ri * 30 + di * 25) + "ms"; else d.style.transitionDelay = "0ms";
        d.classList.toggle("on", on); d.classList.toggle("hidden", !on);
      });
    });
  }
  $("#layerList").addEventListener("change", e => { const v = e.target.value; e.target.checked ? active.add(v) : active.delete(v); applyLayers(false); });
  $("#lyAll").addEventListener("click", () => { A.layers.forEach(l => active.add(l.id)); document.querySelectorAll("#layerList input").forEach(i => i.checked = true); applyLayers(false); });
  $("#lyNone").addEventListener("click", () => { active.clear(); document.querySelectorAll("#layerList input").forEach(i => i.checked = false); applyLayers(false); });

  /* ---------------- 03 works ---------------- */
  const doneDays = A.repos.filter(r => r.kind === "30dmc").map(r => r.day);
  const plate = (w, W, H) => w.image ? `<img src="${w.image}" alt="" loading="lazy">` : Plates[w.plate](W, H, doneDays);
  function renderWorks() {
    const feat = A.works.filter(w => w.featured), more = A.works.filter(w => !w.featured);
    $("#featured").innerHTML = feat.map((w, i) => `
      <article class="feat">
        <div class="bignum rv">${String(i + 1).padStart(2, "0")}</div>
        <figure class="plate clipin">${plate(w, 400, 300)}</figure>
        <div class="txt rv">
          <span class="mono kick">${esc(L(w.kicker))} · ${esc(L(w.place))} · ${w.year}</span>
          <h3>${esc(L(w.title))}</h3>
          <p class="q">${esc(L(w.question))}</p>
          <dl>
            <div><dt class="mono">${T("wk.method")}</dt><dd>${esc(L(w.method))}</dd></div>
            <div><dt class="mono">${T("wk.outcome")}</dt><dd>${esc(L(w.outcome))}</dd></div>
            <div><dt class="mono">${T("wk.tools")}</dt><dd>${w.tools.map(esc).join(" · ")}</dd></div>
          </dl>
          <div class="links">${w.link ? `<a class="btn btn-ink" href="${w.link}" target="_blank" rel="noopener">${T("wk.live")} ↗</a>` : ""}${w.repo ? `<a class="btn btn-line" href="${w.repo}" target="_blank" rel="noopener">${T("wk.code")} ↗</a>` : ""}</div>
        </div>
      </article>`).join("");
    $("#moreWorks").innerHTML = more.map(w => `
      <details>
        <summary><span class="yr">${w.year}</span><h4>${esc(L(w.title))}</h4><span class="pl">${esc(L(w.place))}</span><span class="pm" aria-hidden="true"></span></summary>
        <div class="body"><div class="mini">${plate(w, 300, 300)}</div>
          <dl>
            <div><dt class="mono">${T("wk.question")}</dt><dd>${esc(L(w.question))}</dd></div>
            <div><dt class="mono">${T("wk.method")}</dt><dd>${esc(L(w.method))}</dd></div>
            <div><dt class="mono">${T("wk.outcome")}</dt><dd>${esc(L(w.outcome))}</dd></div>
            <div><dt class="mono">${T("wk.tools")}</dt><dd>${w.tools.map(esc).join(" · ")}</dd></div>
          </dl></div>
      </details>`).join("");
    $("#awards").innerHTML = A.awards.map(a => `<li>${esc(L(a.title))}</li>`).join("");
    observeReveal();
  }

  /* ---------------- folio ---------------- */
  function renderFolio() {
    let html = "", lastCh = 0;
    A.folio.forEach((p, i) => {
      if (p.ch !== lastCh) { lastCh = p.ch; html += `<div class="fch"><div class="n">${p.ch}</div><h3>${esc(L(A.chapters[p.ch]))}</h3></div>`; }
      html += `<article class="fp" data-i="${i}">
        <div class="img" role="button" tabindex="0" aria-label="${esc(T("fo.open"))}: ${esc(L(p.title))}"><img src="assets/img/folio/${p.id}.webp" alt="${esc(L(p.title))}" loading="lazy" decoding="async"><span class="zoomhint">${esc(T("fo.open"))} ↗</span></div>
        <div class="meta"><span class="no">${String(i + 1).padStart(2, "0")}</span><div><h3>${esc(L(p.title))}</h3><span class="mono pl">${esc(L(p.place))}</span></div><p>${esc(L(p.text))}</p></div>
      </article>`;
    });
    $("#folioTrack").innerHTML = html;
    Scroll.sizeFolio();
  }
  $("#folioTrack").addEventListener("click", e => { const f = e.target.closest(".fp .img"); if (f) BoardViewer.open(A.folio, +f.closest(".fp").dataset.i); });
  $("#folioTrack").addEventListener("keydown", e => { if (e.key === "Enter" && e.target.matches(".img")) BoardViewer.open(A.folio, +e.target.closest(".fp").dataset.i); });

  /* ---------------- 05 index ---------------- */
  let kind = "all", q = "";
  function renderIndex() {
    const list = A.repos.filter(r => (kind === "all" || r.kind === kind) && (!q || `${r.title} ${r.city} ${r.theme}`.toLowerCase().includes(q)));
    $("#ixBody").innerHTML = list.map(r => `<tr>
      <td class="no">${r.kind === "30dmc" ? "D" + String(r.day).padStart(2, "0") : "R"}</td>
      <td class="p">${esc(r.title)}<small>${esc(r.repo)}</small></td>
      <td class="c">${esc(r.city)}</td><td class="th">${esc(r.theme)}</td>
      <td class="l"><a href="${pagesUrl(r.repo)}" target="_blank" rel="noopener">${T("ix.live")} ↗</a><a href="${repoUrl(r.repo)}" target="_blank" rel="noopener">${T("ix.code")}</a></td></tr>`).join("");
    $("#ixCount").textContent = `${list.length} ${T("ix.entries")}`;
  }
  $("#ixChips").addEventListener("click", e => { const b = e.target.closest("[data-kind]"); if (!b) return; kind = b.dataset.kind; document.querySelectorAll("#ixChips button").forEach(x => x.setAttribute("aria-pressed", String(x === b))); renderIndex(); });
  $("#ixSearch").addEventListener("input", e => { q = e.target.value.trim().toLowerCase(); renderIndex(); });

  /* ---------------- 06 contact ---------------- */
  function renderContact() {
    const P = A.person;
    const items = [
      ["Email", P.email, "mailto:" + P.email],
      ["LinkedIn", "baris-parlatangiller", P.links.linkedin],
      ["GitHub", "@barisparlatangiller", P.links.github],
      [T("ct.cv"), "/cv", "cv.html?lang=" + I.lang]
    ];
    $("#ctLinks").innerHTML = items.map(([k, v, h]) => `<li><a href="${h}" ${h.startsWith("http") ? 'target="_blank" rel="noopener"' : ""}><span class="k">${esc(k)}</span><span class="v">${esc(v)}</span><span class="ar">↗</span></a></li>`).join("");
    $("#labLink").href = P.links.uhi;
  }

  /* ---------------- grid toggle ---------------- */
  addEventListener("keydown", e => { if ((e.key === "g" || e.key === "G") && !e.target.matches("input, textarea")) document.body.classList.toggle("show-grid"); });

  let io;
  function observeReveal() {
    io = io || new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { if (e.target.dataset.clip) e.target.querySelectorAll(".clipin").forEach(c => c.classList.add("in")); else e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .12 });
    document.querySelectorAll(".rv:not(.in)").forEach(el => io.observe(el));
    // clip-path hides an element from IntersectionObserver, so watch its parent instead
    document.querySelectorAll(".clipin:not(.in)").forEach(el => { el.parentElement.dataset.clip = "1"; io.observe(el.parentElement); });
  }

  /* ---------------- boot ---------------- */
  let lastSun = Sun.position();
  function renderAll() { renderStats(); renderSun(lastSun); renderGantt(); renderDetail(); renderLayers(); renderWorks(); renderFolio(); renderIndex(); renderContact(); }
  I.apply(); drawMap(); renderAll();
  document.querySelectorAll(".sh, .gantt, .ly-grid, .lab-grid, .ix-wrap, .ct-links, .tri, .numeral, .toc").forEach(el => el.classList.add("rv"));
  observeReveal();
  Scroll.init();
  initField($("#field"), sun => { lastSun = sun; renderSun(sun); });
  initLab($("#plaza"), { mean: $("#rMean"), max: $("#rMax"), shade: $("#rShade"), delta: $("#rDelta"), tools: $("#tools"), reset: $("#labReset"), green: $("#labGreen") });
  I.onChange(() => { renderAll(); });
  addEventListener("load", () => Scroll.sizeFolio());
})();

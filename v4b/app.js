/* v4b — six skill layers stacked like GIS layers. Each layer is a halftone map lit where that
   skill was used. Scrolling explodes the stack; choosing a layer isolates it and lists its work. */
(function () {
  const { A, P, L, T, esc } = V3, I = window.I18N;
  const $ = s => document.querySelector(s);
  const ORDER = ["data", "spatial", "climate", "code", "plan", "comm"];          // bottom → top
  const COL = { data: "#4A5568", spatial: "#1F6FEB", climate: "#E5484D", code: "#12A594", plan: "#E59A0B", comm: "#8E4EC6" };
  const W = P.window, cols = P.dots[0].length, rows = P.dots.length;
  let items = [], sel = null;

  function drawPlane(cv, skill) {
    const dpr = Math.min(devicePixelRatio || 1, 2), w = 620, h = Math.round(w * rows / cols);
    cv.width = w * dpr; cv.height = h * dpr; const x = cv.getContext("2d"); x.scale(dpr, dpr);
    const cell = w / cols;
    x.fillStyle = "rgba(15,17,21,.22)";
    for (let r = 0; r < rows; r += 1) for (let c = 0; c < cols; c += 1) {
      const ch = P.dots[r][c]; if (ch === " ") continue;
      x.beginPath(); x.arc((c + .5) * cell, (r + .5) * cell, cell * (ch === "1" ? .16 : .3), 0, 6.283); x.fill();
    }
    const counts = {};
    items.filter(i => i.skill === skill && i.lon != null).forEach(i => { const k = i.lon + "," + i.lat; counts[k] = (counts[k] || 0) + 1; });
    x.fillStyle = COL[skill];
    Object.entries(counts).forEach(([k, n]) => {
      const [lon, lat] = k.split(",").map(Number), px = (lon - W.lon0) / W.stepLon * cell, py = (W.lat1 - lat) / W.stepLat * cell, s = 6 + Math.sqrt(n) * 6;
      x.fillRect(px - s / 2, py - s / 2, s, s);
    });
  }
  function build() {
    $("#stack").innerHTML = ORDER.map((s, i) => `<div class="plane" data-s="${s}" style="--i:${i};--c:${COL[s]}"><div class="sheet"></div><canvas></canvas></div>`).join("");
    document.querySelectorAll(".plane").forEach(p => drawPlane(p.querySelector("canvas"), p.dataset.s));
  }
  function legend() {
    const lay = Object.fromEntries(A.layers.map(l => [l.id, l]));
    $("#legend").innerHTML = ORDER.slice().reverse().map((s, i) => `<li><button data-s="${s}" style="--c:${COL[s]}" aria-pressed="${sel === s}"><span class="n">${String(6 - i).padStart(2, "0")}</span><i></i><span><b>${esc(L(lay[s].name))}</b><small>${esc(L(lay[s].desc))}</small></span><span class="ct">${items.filter(x => x.skill === s).length}</span></button></li>`).join("");
  }
  function detail() {
    const el = $("#detail");
    if (!sel) { el.innerHTML = `<p class="empty">${esc(T("v4.stack.pick"))} ↑</p>`; el.style.removeProperty("--c"); return; }
    const lay = A.layers.find(l => l.id === sel), its = items.filter(x => x.skill === sel), ps = Object.fromEntries(V3.projects().map(p => [p.id, p]));
    const vis = its.map(i => ps[i.ref]).filter(Boolean), rest = its.filter(i => !ps[i.ref]);
    el.style.setProperty("--c", COL[sel]);
    el.innerHTML = `<div class="hd"><h2>${esc(L(lay.name))}</h2><span class="ct mono">${esc(T("v4.stack.items").replace("{n}", its.length))}</span></div>
      <p class="tools">${esc(lay.tools)}</p>
      ${vis.length ? `<div class="grid">${vis.map((p, k) => `<button class="w" data-open="${p.id}" style="animation-delay:${k * 60}ms"><div class="img"><img src="${p.img}" alt=""></div><b>${esc(p.title)}</b><span>${esc(p.where)}</span></button>`).join("")}</div>` : ""}
      ${rest.length ? `<ul>${rest.map(i => `<li>${i.kind === "map" ? `<a href="https://barisparlatangiller.github.io/${i.ref}/" target="_blank" rel="noopener">${esc(i.t)}</a>` : esc(i.t)}<span>${esc(T("pl.k." + i.kind))}</span></li>`).join("")}</ul>` : ""}`;
  }
  function select(s) {
    sel = sel === s ? null : s;
    $("#stack").classList.toggle("sel", !!sel);
    document.querySelectorAll(".plane").forEach(p => p.classList.toggle("on", p.dataset.s === sel));
    legend(); detail();
  }
  function explode() {
    const p = Math.min(1, scrollY / (innerHeight * .6));
    $("#stack").style.setProperty("--gap", (30 + p * 46) + "px");
  }
  document.addEventListener("click", e => {
    const o = e.target.closest("[data-open]"); if (o) return V3.open(V3.projects().find(p => p.id === o.dataset.open));
    const s = e.target.closest("[data-s]"); if (s) select(s.dataset.s);
  });
  addEventListener("scroll", explode, { passive: true });
  async function boot() {
    I.apply();
    items = (await fetch("../v2/data/scene.json").then(r => r.json())).items;
    build(); legend(); detail(); explode();
    $("#pdf").href = V3.pdf(); $("#switch").innerHTML = V3.switcher("v4b");
    // open on the climate layer after a moment, so the idea is visible straight away
    setTimeout(() => { if (!sel) select("climate"); }, 1400);
    I.onChange(() => { legend(); detail(); $("#pdf").href = V3.pdf(); $("#switch").innerHTML = V3.switcher("v4b"); });
  }
  boot();
})();

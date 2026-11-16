/* v3c — gallery first. A dense wall of every board; filters by chapter; each tile opens the board. */
(function () {
  const { A, L, T, esc } = V3, I = window.I18N;
  const $ = s => document.querySelector(s);
  let filter = "all";
  function size(tile) {
    const img = tile.querySelector("img"); if (!img) return;
    const set = () => { const w = tile.getBoundingClientRect().width; const h = w * (img.naturalHeight / img.naturalWidth || .7); tile.style.gridRowEnd = "span " + Math.ceil((h + 10) / 18); };
    img.complete ? set() : img.addEventListener("load", set, { once: true });
  }
  function render() {
    $("#pdf").href = V3.pdf();
    const ps = V3.projects(), chs = [...new Set(ps.map(p => p.ch))].sort();
    $("#filters").innerHTML = [`<button data-f="all" aria-pressed="${filter === "all"}">${esc(T("v3.all"))}<span class="n">${ps.length}</span></button>`]
      .concat(chs.map(c => `<button data-f="${c}" aria-pressed="${filter == c}">${esc(V3.chapterName(c))}<span class="n">${ps.filter(p => p.ch === c).length}</span></button>`)).join("");
    const tiles = ps.map((p, i) => `
      <article class="tile${p.featured ? " big" : ""}" data-ch="${p.ch}" data-open="${p.id}" tabindex="0" style="animation-delay:${Math.min(i, 12) * 50}ms">
        <img src="${p.img}" alt="${esc(p.title)}" ${i < 6 ? "" : 'loading="lazy"'}>${p.badge ? `<span class="badge">${esc(p.badge)}</span>` : ""}
        <div class="ov"><small>${esc(p.where)}${p.year ? " · " + esc(p.year) : ""}</small><b>${esc(p.title)}</b><p>${esc(p.text)}</p></div>
      </article>`);
    tiles.splice(5, 0, `<a class="tile text" data-ch="code" href="#maps" style="grid-row-end: span 14"><span class="n">${V3.maps().length}</span><div><b>${esc(T("v3.maps"))}</b><br><small>#30DayMapChallenge 2026</small></div></a>`);
    $("#wall").innerHTML = tiles.join("");
    document.querySelectorAll(".tile").forEach(size);
    apply();
    $("#stats").innerHTML = V3.stats().map(([v, k]) => `<div><dt>${v}</dt><dd>${esc(k)}</dd></div>`).join("");
    $("#career").innerHTML = V3.experience().map(e => `<li><span class="yr">${V3.yr(e.from)} → ${V3.yr(e.to)}</span><div><b>${esc(e.role)}</b><span class="o">${esc(e.org)}${e.city ? ", " + esc(e.city) : ""}</span></div></li>`).join("");
    $("#awards").innerHTML = A.awards.map(a => `<li>${esc(L(a.title))}</li>`).join("");
    $("#maps").innerHTML = V3.maps().map(r => `<li><a href="https://barisparlatangiller.github.io/${r.repo}/" target="_blank" rel="noopener">${esc(r.title)}<span>${esc(r.city)}</span></a></li>`).join("");
    $("#maps").id = "maps";
    $("#switch").innerHTML = V3.switcher("v3c");
  }
  function apply() { document.querySelectorAll(".tile").forEach(t => t.classList.toggle("off", filter !== "all" && t.dataset.ch != filter)); }
  $("#filters").addEventListener("click", e => { const b = e.target.closest("[data-f]"); if (!b) return; filter = b.dataset.f; document.querySelectorAll("#filters button").forEach(x => x.setAttribute("aria-pressed", String(x === b))); apply(); });
  $("#wall").addEventListener("click", e => { const t = e.target.closest("[data-open]"); if (t) V3.open(V3.projects().find(p => p.id === t.dataset.open)); });
  $("#wall").addEventListener("keydown", e => { if (e.key === "Enter" && e.target.dataset.open) V3.open(V3.projects().find(p => p.id === e.target.dataset.open)); });
  addEventListener("resize", () => document.querySelectorAll(".tile").forEach(size));
  I.apply(); render(); I.onChange(render);
})();

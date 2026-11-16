/* v3b — editorial. Two featured projects full bleed, then an index in a magazine grid. */
(function () {
  const { A, P, L, T, esc } = V3, I = window.I18N;
  const $ = s => document.querySelector(s);
  const LAYOUT = ["wide", "", "half", "half", "", "", "", "", "wide", "", "", "", "", "", ""];   // every row adds up to 12 columns
  function render() {
    const title = { en: ["Spatial analyst", "& urban planner"], de: ["Raumanalytiker", "& Stadtplaner"], tr: ["Mekânsal analist", "& şehir plancısı"] }[I.lang];
    $("#heroTitle").innerHTML = title.map(t => `<span><i>${esc(t)}</i></span>`).join("");
    $("#pdf").href = V3.pdf();
    $("#stats").innerHTML = V3.stats().map(([v, k]) => `<div><dt>${v}</dt><dd>${esc(k)}</dd></div>`).join("");
    const all = V3.projects(), feat = all.filter(p => p.featured), rest = all.filter(p => !p.featured);
    $("#featured").innerHTML = feat.map((p, i) => `
      <article class="feat" data-id="${p.id}">
        <div class="img" data-open="${p.id}"><img src="${p.img}" alt="${esc(p.title)}"></div>
        <div class="cap"><span class="no">${String(i + 1).padStart(2, "0")}</span>
          <div><h3>${esc(p.title)}</h3><span class="where">${esc(p.where)} · ${esc(p.year)}</span></div>
          <div><p>${esc(p.long)}</p><button class="open" data-open="${p.id}">${esc(p.board ? T("v3.open") : T("v3.live"))} →</button></div>
          <span class="badge">${esc(p.badge)}</span></div>
      </article>`).join("");
    $("#count").textContent = T("v3.count").replace("{n}", rest.length);
    $("#grid").innerHTML = rest.map((p, i) => `
      <article class="card ${LAYOUT[i] || ""}" data-open="${p.id}">
        <div class="img"><img src="${p.img}" alt="${esc(p.title)}" loading="lazy"></div>
        <div class="row"><span>${String(i + 3).padStart(2, "0")} · ${esc(V3.chapterName(p.ch))}</span><span>${esc(p.where)}</span></div>
        <h3>${esc(p.title)}</h3><p>${esc(p.text)}</p>
      </article>`).join("");
    $("#careerList").innerHTML = V3.experience().map(e => `<li class="job"><span class="yr">${V3.yr(e.from)} → ${V3.yr(e.to)}</span><div><b>${esc(e.role)}</b><span class="org">${esc(e.org)}${e.city ? ", " + esc(e.city) : ""}</span></div>${e.bullets.length ? `<ul>${e.bullets.slice(0, 2).map(b => `<li>${esc(b)}</li>`).join("")}</ul>` : "<span></span>"}</li>`).join("");
    $("#awards").innerHTML = A.awards.map(a => `<li>${esc(L(a.title))}</li>`).join("");
    $("#maps").innerHTML = V3.maps().map(r => `<li><a href="https://barisparlatangiller.github.io/${r.repo}/" target="_blank" rel="noopener">${esc(r.title)}<span>${esc(r.city)}</span></a></li>`).join("");
    $("#switch").innerHTML = V3.switcher("v3b");
    reveal();
  }
  let io;
  function reveal() {
    io && io.disconnect();
    io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .15 });
    document.querySelectorAll(".feat, .card").forEach(el => io.observe(el));
  }
  document.addEventListener("click", e => { const o = e.target.closest("[data-open]"); if (o) V3.open(V3.projects().find(p => p.id === o.dataset.open)); });
  I.apply(); render(); I.onChange(render);
})();

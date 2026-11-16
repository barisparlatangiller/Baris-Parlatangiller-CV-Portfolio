/* v4a — the CV that opens. Same structure as the printed CV; rows unfold into the projects behind them. */
(function () {
  const { A, L, T, esc } = V3, I = window.I18N;
  const $ = s => document.querySelector(s);
  const store = (k, v) => { try { if (v !== undefined) localStorage.setItem(k, v); return localStorage.getItem(k); } catch (e) { return null; } };
  let focus = ["gis", "plan"].includes(new URLSearchParams(location.search).get("focus")) ? new URLSearchParams(location.search).get("focus") : (store("atlas.focus") || "gis");
  const WORK_PROJECTS = { free: ["uhi", "scenario-platform"], mgk: ["climate-risk"], asp3: ["nizwa-2040", "wadi-landscape"], asp2: ["nizwa-2040", "wadi-landscape"], asp1: ["baku-2040"] };
  const open = new Set();
  const tile = p => `<button class="w" data-open="${p.id}"><div class="img"><img src="${p.img}" alt="" loading="lazy"></div><b>${esc(p.title)}</b><span>${esc(p.where)}</span></button>`;
  function row(id, title, sub, date, inner) {
    return `<div class="row${inner ? " has" : ""}${open.has(id) ? " open" : ""}" data-row="${id}"><button ${inner ? "" : "disabled"} aria-expanded="${open.has(id)}"><span><b>${esc(title)}</b><span class="sub">${esc(sub)}</span></span><span class="date">${esc(date)}</span><span class="pm" aria-hidden="true"></span></button>
      ${inner ? `<div class="more"><div>${inner}</div></div>` : ""}</div>`;
  }
  function render() {
    const P = A.person, F = A.focus[focus], ps = V3.projects(), pById = Object.fromEntries(ps.map(p => [p.id, p]));
    $("#focus").innerHTML = Object.entries(A.focus).map(([k, f]) => `<button data-focus="${k}" aria-pressed="${k === focus}">${esc(L(f.label))}</button>`).join("");
    $("#pdf").href = V3.pdf(focus === "plan" ? "Planning" : "GIS");
    const exp = A.experience.map(e => {
      const pr = (WORK_PROJECTS[e.id] || []).map(id => pById[id]).filter(Boolean);
      const inner = `<ul class="b">${(e.bullets[I.lang] || e.bullets.en).map(b => `<li>${esc(b)}</li>`).join("")}</ul>${pr.length ? `<div class="works">${pr.map(tile).join("")}</div>` : ""}`;
      return row(e.id, L(focus === "plan" && e.rolePlan ? e.rolePlan : e.role), `${L(e.org)}, ${L(e.city)}`, V3.yr(e.start) === V3.yr(e.end) ? V3.yr(e.start) : `${V3.yr(e.start)} – ${V3.yr(e.end)}`, inner);
    }).join("");
    const featured = ps.filter(p => p.featured), others = ps.filter(p => !p.featured);
    const projRows = featured.map(p => row("p-" + p.id, p.title, p.where, p.year, `<p style="margin:0 0 10px;color:#333">${esc(p.long)}</p><div class="works big">${tile(p)}</div>`)).join("")
      + row("p-all", T("v3.index"), T("v3.count").replace("{n}", others.length), "", `<div class="works">${others.map(tile).join("")}</div>`)
      + row("p-maps", T("v3.maps"), "#30DayMapChallenge 2026", "2026", `<p style="margin:0 0 8px;color:#333">${esc(T("v3.maps.p"))}</p><ul class="b">${V3.maps().map(r => `<li><a href="https://barisparlatangiller.github.io/${r.repo}/" target="_blank" rel="noopener">${esc(r.title)}</a>, ${esc(r.city)}</li>`).join("")}</ul>`);
    $("#sheet").innerHTML = `
      <header class="head"><div><h1>${esc(P.name)}</h1><p class="hl">${esc(L(F.headline))}</p></div>
        <ul><li>${esc(L(P.location))}</li><li><a href="mailto:${P.email}">${P.email}</a></li><li><a href="${P.links.linkedin}" target="_blank" rel="noopener">LinkedIn</a> · <a href="${P.links.github}" target="_blank" rel="noopener">GitHub</a></li></ul></header>
      <section class="profile"><h2>${esc(T("cv.profile"))}</h2>${L(F.profile).map(p => `<p>${esc(p)}</p>`).join("")}</section>
      <section><h2>${esc(T("cv.projects"))}</h2>${projRows}</section>
      <section><h2>${esc(T("cv.experience"))}</h2>${exp}</section>
      <section><h2>${esc(T("cv.skills"))}</h2><dl class="skills">${F.skills.map(s => `<div><dt>${esc(L(s.group))}</dt><dd>${esc(s.items)}</dd></div>`).join("")}</dl></section>
      <div class="two">
        <section><h2>${esc(T("cv.education"))}</h2>${A.education.map(e => row(e.id, L(e.title), L(e.org), `${e.start.slice(0, 4)} – ${e.end.slice(0, 4)}`, "")).join("")}
          <h2>${esc(T("cv.languages"))}</h2><ul class="langs">${A.languages.map(l => `<li>${esc(L(l.name))}<span>${esc(L(l.level))}</span></li>`).join("")}</ul></section>
        <section><h2>${esc(T("cv.awards"))}</h2><ul class="aw">${A.awards.map(a => `<li>${esc(L(a.title))}</li>`).join("")}</ul></section>
      </div>`;
    $("#switch").innerHTML = V3.switcher("v4a");
  }
  document.addEventListener("click", e => {
    const f = e.target.closest("[data-focus]"); if (f) { focus = f.dataset.focus; store("atlas.focus", focus); render(); return; }
    const w = e.target.closest("[data-open]"); if (w) { V3.open(V3.projects().find(p => p.id === w.dataset.open)); return; }
    const b = e.target.closest(".row.has > button"); if (b) { const r = b.parentElement, id = r.dataset.row; open.has(id) ? open.delete(id) : open.add(id); r.classList.toggle("open"); b.setAttribute("aria-expanded", r.classList.contains("open")); }
  });
  I.apply(); render(); I.onChange(render);
})();

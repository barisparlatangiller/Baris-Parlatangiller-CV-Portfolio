/* CV page: semantic, ATS-friendly HTML rendered from the same content as the atlas.
   Two "focus" readings (GIS / Planning) swap headline, profile, skills and role titles. */
(function () {
  const A = window.ATLAS, I = window.I18N, L = I.L, T = I.T;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const store = (k, v) => { try { if (v !== undefined) localStorage.setItem(k, v); return localStorage.getItem(k); } catch (e) { return null; } };
  const qp = new URLSearchParams(location.search).get("focus");
  let focus = ["gis", "plan"].includes(qp) ? qp : (store("atlas.focus") || "gis");

  function render() {
    const P = A.person, F = A.focus[focus];
    document.title = `${P.name} · CV`;
    document.getElementById("focusSeg").innerHTML = Object.entries(A.focus).map(([k, f]) => `<button data-focus="${k}" aria-pressed="${k === focus}">${esc(L(f.label))}</button>`).join("");

    const exp = A.experience.map(e => `
      <article class="job">
        <header><h3>${esc(L(focus === "plan" && e.rolePlan ? e.rolePlan : e.role))}</h3><span class="date">${I.fmtDate(e.start)} → ${I.fmtDate(e.end)}</span></header>
        <p class="org">${esc(L(e.org))} · ${esc(L(e.city))}</p>
        <ul>${(e.bullets[I.lang] || e.bullets.en).map(b => `<li>${esc(b)}</li>`).join("")}</ul>
      </article>`).join("");

    const projects = A.works.slice(0, 4).map(w => `<li><b>${esc(L(w.title))}</b> <span class="date">${w.year}</span>. ${esc(L(w.outcome).split(". ")[0].replace(/\.$/, ""))}.${w.link ? ` <a href="${w.link}">${w.link.replace("https://", "")}</a>` : ""}</li>`).join("");

    document.getElementById("cv").innerHTML = `
      <header class="head">
        <div>
          <h1>${esc(P.name)}</h1>
          <p class="headline">${esc(L(F.headline))}</p>
        </div>
        <ul class="contact">
          <li>${esc(L(P.location))}</li>
          <li><a href="mailto:${P.email}">${P.email}</a></li>
          <li><a href="${P.links.linkedin}">linkedin.com/in/baris-parlatangiller</a></li>
          <li><a href="${P.links.github}">github.com/barisparlatangiller</a></li>
          <li><a href="${P.links.maps}">barisparlatangiller.github.io</a></li>
        </ul>
      </header>

      <section><h2>${T("cv.profile")}</h2>${L(F.profile).map(p => `<p>${esc(p)}</p>`).join("")}</section>

      <section><h2>${T("cv.skills")}</h2>
        <dl class="skills">${F.skills.map(s => `<div><dt>${esc(L(s.group))}</dt><dd>${esc(s.items)}</dd></div>`).join("")}</dl>
      </section>

      <section><h2>${T("cv.experience")}</h2>${exp}</section>

      <section><h2>${T("cv.projects")}</h2><ul class="plain">${projects}</ul></section>

      <div class="cols">
        <section><h2>${T("cv.education")}</h2>
          ${A.education.map(e => `<article class="job"><header><h3>${esc(L(e.title))}</h3><span class="date">${e.start.slice(0, 4)} → ${e.end.slice(0, 4)}</span></header><p class="org">${esc(L(e.org))}</p></article>`).join("")}
        </section>
        <section><h2>${T("cv.languages")}</h2>
          <ul class="langs">${A.languages.map(l => `<li><span>${esc(L(l.name))}</span><span class="date">${esc(L(l.level))}</span></li>`).join("")}</ul>
          <h2 class="mt">${T("cv.awards")}</h2>
          <ul class="plain">${A.awards.map(a => `<li>${esc(L(a.title))}</li>`).join("")}</ul>
        </section>
      </div>
      <footer class="cvfoot">${T("cv.updated")}: ${I.fmtDate(new Date().toISOString().slice(0, 7))} · barisparlatangiller.github.io/Baris-Parlatangiller-CV-Portfolio</footer>`;
  }

  document.addEventListener("click", e => {
    const b = e.target.closest("[data-focus]"); if (!b) return;
    focus = b.dataset.focus; store("atlas.focus", focus);
    const u = new URL(location.href); u.searchParams.set("focus", focus); history.replaceState(null, "", u);
    render();
  });
  I.apply(); render(); I.onChange(render);
})();

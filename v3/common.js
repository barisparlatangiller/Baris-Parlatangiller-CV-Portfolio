/* Shared data layer for the three v3 variants (v3a split map, v3b editorial, v3c gallery).
   Everything comes from the same sources as the rest of the site: data/content.js,
   data/places.js (built by tools/build_places.py) and data/tours.js. */
(function () {
  const A = window.ATLAS, P = window.PLACES, I = window.I18N;
  const L = o => I.L(o), T = k => I.T(k);
  const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const BASE = "../";
  const place = {}; P.places.forEach(p => p.items.forEach(it => { if (it.ref && !place[it.ref]) place[it.ref] = p; }));
  const country = c => c ? L(P.countries[c]) : "";

  // the order a reader meets the work: strongest first
  const ORDER = ["uhi", "baku-2040", "climate-risk", "scenario-platform", "nizwa-2040", "wadi-landscape", "watershed", "biserinlik", "bostanli", "tactical-cooling", "rudolfstrasse", "avlu-kayakoy", "mosaic-pubvate", "bodegas-vinival", "new-stage", "cubic-flux", "kizil-yamac"];
  const FEATURED = ["uhi", "baku-2040"];
  const YEAR = { uhi: "2026", "baku-2040": "2019–20", "climate-risk": "2024–25", "scenario-platform": "2025–26", "nizwa-2040": "2022–24", "wadi-landscape": "2022–24" };

  function projects() {
    const uhiW = A.works.find(w => w.id === "uhi");
    const list = ORDER.map(id => {
      if (id === "uhi") {
        const p = place.uhi;
        return { id, ch: 2, title: L(uhiW.title), text: T("v2.f1.s"), long: L(uhiW.method) + " " + L(uhiW.outcome), img: BASE + "v2/img/uhi.jpg",
          place: p, where: "Frankfurt am Main, " + country("Germany"), year: "2026", featured: true, badge: "1 m · SOLWEIG", link: uhiW.link, repo: uhiW.repo };
      }
      const f = A.folio.find(x => x.id === id); if (!f) return null;
      const p = place[id];
      return { id, ch: f.ch, title: L(f.title), text: L(f.text), long: L(f.text), img: `${BASE}assets/img/folio/${id}.webp`, board: true,
        place: p, where: p ? `${p.name}, ${country(p.country)}` : L(f.place), year: YEAR[id] || "", featured: FEATURED.includes(id), badge: id === "baku-2040" ? "ISOCARP Award" : "" };
    }).filter(Boolean);
    return list;
  }
  function chapterName(ch) { return L(A.chapters[ch]); }
  function open(p, stop) {
    if (p.board) { const i = A.folio.findIndex(f => f.id === p.id); BoardViewer.open(A.folio, i, stop ?? 1); }
    else if (p.link) window.open(p.link, "_blank", "noopener");
  }
  function experience() {
    return A.experience.map(e => ({ id: e.id, role: L(e.role), org: L(e.org), city: L(e.city), from: e.start, to: e.end, bullets: e.bullets[I.lang] || e.bullets.en, places: e.places }))
      .concat(A.education.map(e => ({ id: e.id, role: L(e.title), org: L(e.org), city: "", from: e.start, to: e.end, bullets: [], edu: true, places: e.places })));
  }
  const maps = () => A.repos.filter(r => r.kind === "30dmc");
  const pdf = (focus = "GIS") => `${BASE}assets/cv/Baris-Parlatangiller-CV-${focus}-${I.lang.toUpperCase()}.pdf`;
  const yr = ym => ym ? ym.slice(0, 4) : T("it.present");
  function stats() { const t = P.totals; return [[t.countries, T("pl.countries")], [t.places, T("pl.places")], [A.folio.length + 1, T("v3.projects")], [A.repos.length, T("stat.repos2")]]; }
  // link to the other variants, so the person can compare
  function switcher(current) {
    return ["v3a", "v3b", "v3c"].map(v => `<a href="../${v}/?lang=${I.lang}" class="${v === current ? "on" : ""}">${v.toUpperCase()}</a>`).join("") + `<a href="../v2/?lang=${I.lang}">V2</a><a href="../?lang=${I.lang}">V1</a>`;
  }
  window.V3 = { A, P, L, T, esc, projects, chapterName, open, experience, maps, pdf, yr, stats, switcher, country, BASE };
})();

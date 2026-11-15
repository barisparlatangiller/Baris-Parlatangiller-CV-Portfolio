/* Shared language handling for index.html and cv.html */
(function () {
  const SUPPORTED = ["en", "de", "tr"];
  function store(k, v) { try { v === undefined ? null : localStorage.setItem(k, v); return localStorage.getItem(k); } catch (e) { return null; } }

  function detect() {
    const q = new URLSearchParams(location.search).get("lang");
    if (SUPPORTED.includes(q)) return q;
    const s = store("atlas.lang");
    if (SUPPORTED.includes(s)) return s;
    const n = (navigator.language || "en").slice(0, 2).toLowerCase();
    return SUPPORTED.includes(n) ? n : "en";
  }

  const I18N = {
    lang: detect(),
    listeners: [],
    /** pick the current language from a {en,de,tr} object (or return strings as-is) */
    L(o) { if (o == null) return ""; if (typeof o === "string") return o; return o[I18N.lang] ?? o.en ?? ""; },
    T(key) { return (window.UI[I18N.lang] && window.UI[I18N.lang][key]) ?? window.UI.en[key] ?? key; },
    apply() {
      document.documentElement.lang = I18N.lang;
      document.querySelectorAll("[data-i18n]").forEach(el => { el.textContent = I18N.T(el.dataset.i18n); });
      document.querySelectorAll("[data-i18n-ph]").forEach(el => { el.placeholder = I18N.T(el.dataset.i18nPh); });
      document.querySelectorAll("[data-lang]").forEach(b => {
        b.setAttribute("aria-pressed", String(b.dataset.lang === I18N.lang));
      });
      // keep the language when switching between atlas and CV
      document.querySelectorAll("a[data-keep-lang]").forEach(a => {
        const u = new URL(a.getAttribute("href"), location.href);
        u.searchParams.set("lang", I18N.lang);
        a.href = u.pathname.split("/").pop() + u.search + u.hash;
      });
    },
    set(lang) {
      if (!SUPPORTED.includes(lang)) return;
      I18N.lang = lang; store("atlas.lang", lang);
      const u = new URL(location.href); u.searchParams.set("lang", lang); history.replaceState(null, "", u);
      I18N.apply(); I18N.listeners.forEach(f => f(lang));
    },
    onChange(f) { I18N.listeners.push(f); },
    fmtDate(ym) {
      if (!ym) return I18N.T("it.present");
      const [y, m] = ym.split("-").map(Number);
      return new Date(y, m - 1, 1).toLocaleDateString(I18N.lang === "tr" ? "tr-TR" : I18N.lang === "de" ? "de-DE" : "en-GB", { month: "short", year: "numeric" });
    }
  };
  document.addEventListener("click", e => { const b = e.target.closest("[data-lang]"); if (b) I18N.set(b.dataset.lang); });
  window.I18N = I18N;
})();

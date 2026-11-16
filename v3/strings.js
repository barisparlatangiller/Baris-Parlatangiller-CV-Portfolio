/* Extra strings for the v3 variants, merged into window.UI. */
(function () {
  const S = {
    en: { "v3.projects": "projects", "v3.work": "Selected work", "v3.all": "All", "v3.career": "Career", "v3.maps": "Public maps", "v3.maps.p": "One open-data map for every day of #30DayMapChallenge 2026, each its own repository and live site.",
      "v3.awards": "Recognition", "v3.contact": "Get in touch", "v3.contact.p": "Open to senior roles in GIS, geospatial analysis and urban planning across Germany.", "v3.versions": "Versions",
      "v3.open": "Open the board", "v3.live": "Open the study", "v3.featured": "Featured", "v3.view": "View project", "v3.where": "Where", "v3.index": "All work", "v3.scroll": "Scroll", "v3.filter": "Filter", "v3.count": "{n} projects" },
    de: { "v3.projects": "Projekte", "v3.work": "Ausgewählte Arbeiten", "v3.all": "Alle", "v3.career": "Werdegang", "v3.maps": "Öffentliche Karten", "v3.maps.p": "Eine Open-Data-Karte für jeden Tag der #30DayMapChallenge 2026, jede mit eigenem Repository und Live-Seite.",
      "v3.awards": "Auszeichnungen", "v3.contact": "Kontakt aufnehmen", "v3.contact.p": "Offen für Senior-Rollen in GIS, Geodatenanalyse und Stadtplanung in ganz Deutschland.", "v3.versions": "Versionen",
      "v3.open": "Tafel öffnen", "v3.live": "Studie öffnen", "v3.featured": "Im Fokus", "v3.view": "Projekt ansehen", "v3.where": "Ort", "v3.index": "Alle Arbeiten", "v3.scroll": "Scrollen", "v3.filter": "Filter", "v3.count": "{n} Projekte" },
    tr: { "v3.projects": "proje", "v3.work": "Seçilmiş işler", "v3.all": "Tümü", "v3.career": "Kariyer", "v3.maps": "Açık haritalar", "v3.maps.p": "#30DayMapChallenge 2026'nın her günü için bir açık veri haritası; her biri kendi deposu ve canlı sitesiyle.",
      "v3.awards": "Ödüller", "v3.contact": "İletişime geçin", "v3.contact.p": "Almanya genelinde CBS, mekânsal analiz ve şehir planlama alanında kıdemli pozisyonlara açığım.", "v3.versions": "Sürümler",
      "v3.open": "Paftayı aç", "v3.live": "Çalışmayı aç", "v3.featured": "Öne çıkan", "v3.view": "Projeyi gör", "v3.where": "Yer", "v3.index": "Tüm işler", "v3.scroll": "Kaydır", "v3.filter": "Filtre", "v3.count": "{n} proje" }
  };
  for (const l of Object.keys(S)) Object.assign(window.UI[l], S[l]);
})();

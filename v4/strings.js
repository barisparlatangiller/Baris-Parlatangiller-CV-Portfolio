/* Strings for the v4 concepts, merged into window.UI. */
(function () {
  const S = {
    en: {
      "v4.cv.hint": "This is my CV. Every line opens to show the work behind it.",
      "v4.more": "Show the work", "v4.less": "Close",
      "v4.stack.k": "Skills as map layers",
      "v4.stack.t": "Six layers, one practice.",
      "v4.stack.p": "Every planning decision I support is built from the same stack: data at the bottom, communication at the top. Pick a layer to see where it was used and what it produced.",
      "v4.stack.pick": "Choose a layer", "v4.stack.items": "{n} entries on this layer", "v4.stack.where": "Places",
      "v4.d.ask": "What brings you here?",
      "v4.d1.t": "I'm hiring", "v4.d1.p": "The profile in thirty seconds: role, experience, languages and the CV.",
      "v4.d2.t": "I'm planning a project", "v4.d2.p": "Case studies with the boards behind them, from masterplans to street design.",
      "v4.d3.t": "I work with data and code", "v4.d3.p": "Open repositories, Python pipelines and sixteen public maps.",
      "v4.back": "Back", "v4.facts": "In short", "v4.langs": "Languages", "v4.repos": "Repositories", "v4.stackt": "Tools",
      "v4.pipe": "This site is built from my own pipeline", "v4.pipe.p": "GeoPandas and Natural Earth sample the maps, pyproj measures the route, and the 1 m heat model comes from SOLWEIG output.",
      "v4.f1": "8+ years in GIS, spatial analysis and urban planning", "v4.f2": "Projects in 10 countries, from municipal GIS to national masterplans", "v4.f3": "ISOCARP Award for the Baku 2040 Masterplan", "v4.f4": "Based in Frankfurt am Main, available for roles across Germany"
    },
    de: {
      "v4.cv.hint": "Das ist mein Lebenslauf. Jede Zeile lässt sich öffnen und zeigt die Arbeit dahinter.",
      "v4.more": "Arbeit zeigen", "v4.less": "Schließen",
      "v4.stack.k": "Kompetenzen als Kartenebenen",
      "v4.stack.t": "Sechs Ebenen, eine Praxis.",
      "v4.stack.p": "Jede Planungsentscheidung, die ich unterstütze, entsteht aus demselben Stapel: unten die Daten, oben die Kommunikation. Wähle eine Ebene und sieh, wo sie eingesetzt wurde und was daraus entstand.",
      "v4.stack.pick": "Ebene wählen", "v4.stack.items": "{n} Einträge auf dieser Ebene", "v4.stack.where": "Orte",
      "v4.d.ask": "Was führt Sie hierher?",
      "v4.d1.t": "Ich suche Personal", "v4.d1.p": "Das Profil in dreißig Sekunden: Rolle, Erfahrung, Sprachen und Lebenslauf.",
      "v4.d2.t": "Ich plane ein Projekt", "v4.d2.p": "Fallstudien mit den Tafeln dahinter, vom Masterplan bis zur Straßengestaltung.",
      "v4.d3.t": "Ich arbeite mit Daten und Code", "v4.d3.p": "Offene Repositories, Python-Pipelines und sechzehn öffentliche Karten.",
      "v4.back": "Zurück", "v4.facts": "Kurz gesagt", "v4.langs": "Sprachen", "v4.repos": "Repositories", "v4.stackt": "Werkzeuge",
      "v4.pipe": "Diese Seite entsteht aus meiner eigenen Pipeline", "v4.pipe.p": "GeoPandas und Natural Earth erzeugen die Karten, pyproj misst die Route und das Hitzemodell in einem Meter stammt aus SOLWEIG.",
      "v4.f1": "Über 8 Jahre in GIS, räumlicher Analyse und Stadtplanung", "v4.f2": "Projekte in 10 Ländern, vom kommunalen GIS bis zum nationalen Masterplan", "v4.f3": "ISOCARP Award für den Masterplan Baku 2040", "v4.f4": "Wohnhaft in Frankfurt am Main, verfügbar für Stellen in ganz Deutschland"
    },
    tr: {
      "v4.cv.hint": "Bu benim özgeçmişim. Her satır açılıp arkasındaki işi gösteriyor.",
      "v4.more": "İşi göster", "v4.less": "Kapat",
      "v4.stack.k": "Harita katmanı olarak yetkinlikler",
      "v4.stack.t": "Altı katman, tek bir pratik.",
      "v4.stack.p": "Desteklediğim her planlama kararı aynı yığından çıkıyor: en altta veri, en üstte iletişim. Bir katman seç; nerede kullanıldığını ve ne ürettiğini gör.",
      "v4.stack.pick": "Katman seç", "v4.stack.items": "Bu katmanda {n} kayıt", "v4.stack.where": "Yerler",
      "v4.d.ask": "Sizi buraya ne getirdi?",
      "v4.d1.t": "İşe alım yapıyorum", "v4.d1.p": "Otuz saniyede profil: rol, deneyim, diller ve özgeçmiş.",
      "v4.d2.t": "Bir proje planlıyorum", "v4.d2.p": "Master plandan sokak tasarımına, arkasındaki paftalarla vaka çalışmaları.",
      "v4.d3.t": "Veri ve kodla çalışıyorum", "v4.d3.p": "Açık depolar, Python iş akışları ve on altı açık harita.",
      "v4.back": "Geri", "v4.facts": "Kısaca", "v4.langs": "Diller", "v4.repos": "Depolar", "v4.stackt": "Araçlar",
      "v4.pipe": "Bu site kendi pipeline'ımla üretiliyor", "v4.pipe.p": "Haritaları GeoPandas ve Natural Earth üretiyor, rotayı pyproj ölçüyor, bir metrelik ısı modeli SOLWEIG çıktısından geliyor.",
      "v4.f1": "CBS, mekânsal analiz ve şehir planlamada 8+ yıl", "v4.f2": "Belediye CBS'sinden ulusal master planlara, 10 ülkede proje", "v4.f3": "Bakü 2040 Master Planı ile ISOCARP Ödülü", "v4.f4": "Frankfurt am Main'de yaşıyor, Almanya genelinde pozisyonlara açık"
    }
  };
  for (const l of Object.keys(S)) Object.assign(window.UI[l], S[l]);
})();

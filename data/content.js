/* ==========================================================================
   CONTENT — the only file you need to edit to update the site.
   Every human-readable string is { en, de, tr }.
   Add a new GitHub project: append an object to `repos` (bottom of file).
   ========================================================================== */
window.ATLAS = {
  person: {
    name: "Baris Parlatangiller",
    location: { en: "Frankfurt am Main, Germany", de: "Frankfurt am Main, Deutschland", tr: "Frankfurt am Main, Almanya" },
    email: "barisparlatangiller@gmail.com",
    links: {
      linkedin: "https://www.linkedin.com/in/baris-parlatangiller-015867129/",
      github: "https://github.com/barisparlatangiller",
      maps: "https://barisparlatangiller.github.io/",
      uhi: "https://barisparlatangiller.github.io/Urban-Heat-Stress---Frankfurt-Platz/"
    }
  },

  /* Two professional readings of the same career — switch on the CV page. */
  focus: {
    gis: {
      label: { en: "GIS & Geospatial", de: "GIS & Geodaten", tr: "CBS & Mekânsal Analiz" },
      headline: {
        en: "Senior GIS and Geospatial Analyst. Spatial analytics for planning, infrastructure and environmental decisions.",
        de: "Senior GIS- und Geodatenanalyst. Räumliche Analytik für Entscheidungen in Planung, Infrastruktur und Umwelt.",
        tr: "Kıdemli CBS ve Mekânsal Analist. Planlama, altyapı ve çevre kararları için mekânsal analitik."
      },
      profile: {
        en: [
          "GIS and geospatial analyst with 8+ years of experience delivering geodatabases, spatial analysis, cartography, remote sensing and decision-support outputs for municipal, infrastructure, environmental and strategic planning projects in Germany and internationally.",
          "Hands-on with ArcGIS Pro, QGIS, geodata management, QA/QC, accessibility analysis, spatial indicators and Python-based geoprocessing automation.",
          "Translates complex spatial evidence into clear maps, indicators and recommendations for multidisciplinary teams, executives and non-technical stakeholders."
        ],
        de: [
          "GIS- und Geodatenanalyst mit über 8 Jahren Erfahrung in Geodatenbanken, räumlicher Analyse, Kartografie, Fernerkundung und Entscheidungsgrundlagen für kommunale, Infrastruktur-, Umwelt- und strategische Planungsprojekte in Deutschland und international.",
          "Praxis in ArcGIS Pro, QGIS, Geodatenmanagement, QA/QC, Erreichbarkeitsanalysen, räumlichen Indikatoren und Python-gestützter Automatisierung von Geoprozessen.",
          "Übersetzt komplexe räumliche Evidenz in klare Karten, Kennzahlen und Empfehlungen für interdisziplinäre Teams, Führungskräfte und fachfremde Stakeholder."
        ],
        tr: [
          "Almanya'da ve uluslararası ölçekte belediye, altyapı, çevre ve stratejik planlama projeleri için coğrafi veritabanı, mekânsal analiz, kartografya, uzaktan algılama ve karar destek çıktıları üreten, 8+ yıl deneyimli CBS ve mekânsal analist.",
          "ArcGIS Pro, QGIS, mekânsal veri yönetimi, QA/QC, erişilebilirlik analizi, mekânsal göstergeler ve Python tabanlı coğrafi işlem otomasyonunda uygulamalı deneyim.",
          "Karmaşık mekânsal bulguları disiplinler arası ekipler, yöneticiler ve teknik olmayan paydaşlar için anlaşılır haritalara, göstergelere ve önerilere dönüştürür."
        ]
      },
      skills: [
        { group: { en: "GIS & Cartography", de: "GIS & Kartografie", tr: "CBS ve Kartografya" }, items: "ArcGIS Pro · QGIS · thematic mapping · geoprocessing · spatial joins · map series · print-ready layouts" },
        { group: { en: "Geodata Management", de: "Geodatenmanagement", tr: "Mekânsal Veri Yönetimi" }, items: "Geodatabases · raster/vector processing · georeferencing · QA/QC · attribute structuring · SQL" },
        { group: { en: "Spatial Analysis", de: "Räumliche Analyse", tr: "Mekânsal Analiz" }, items: "Accessibility & catchment · station-area studies · suitability · multi-criteria assessment · spatial indicators" },
        { group: { en: "Remote Sensing & Climate", de: "Fernerkundung & Klima", tr: "Uzaktan Algılama ve İklim" }, items: "Urban heat island · SOLWEIG / UMEP · environmental constraints · satellite imagery · GeoAI" },
        { group: { en: "Automation & Web", de: "Automatisierung & Web", tr: "Otomasyon ve Web" }, items: "Python · GeoPandas · Shapely · Rasterio · Fiona · Folium / Leaflet · GitHub Pages · AI-assisted development" }
      ]
    },
    plan: {
      label: { en: "Urban & Regional Planning", de: "Stadt- & Regionalplanung", tr: "Şehir ve Bölge Planlama" },
      headline: {
        en: "Senior Urban and Regional Planner. Masterplanning, mobility, infrastructure and climate resilient strategy.",
        de: "Senior Stadt- und Regionalplaner. Masterplanung, Mobilität, Infrastruktur und klimaresiliente Strategien.",
        tr: "Kıdemli Şehir ve Bölge Plancısı. Master plan, ulaşım, altyapı ve iklime dirençli strateji."
      },
      profile: {
        en: [
          "Urban and regional planner with 8+ years of international experience in masterplanning, mobility, infrastructure, climate adaptation and regional strategy across Europe and the Middle East.",
          "Translates geospatial, demographic and mobility evidence into planning recommendations, development scenarios and client-ready outputs.",
          "Experienced in leading cross-functional workstreams, training colleagues and coordinating deliverables with planners, engineers and external stakeholders."
        ],
        de: [
          "Stadt- und Regionalplaner mit über 8 Jahren internationaler Erfahrung in Masterplanung, Mobilität, Infrastruktur, Klimaanpassung und Regionalstrategien in Europa und im Nahen Osten.",
          "Übersetzt Geo-, Demografie- und Mobilitätsdaten in Planungsempfehlungen, Entwicklungsszenarien und kundenfertige Ergebnisse.",
          "Erfahren in der Leitung interdisziplinärer Arbeitspakete, in Schulungen und in der Abstimmung mit Planern, Ingenieuren und externen Stakeholdern."
        ],
        tr: [
          "Avrupa ve Orta Doğu'da master plan, ulaşım, altyapı, iklim uyumu ve bölgesel strateji projelerinde 8+ yıllık uluslararası deneyime sahip şehir ve bölge plancısı.",
          "Mekânsal, demografik ve ulaşım verilerini planlama önerilerine, gelişme senaryolarına ve müşteriye hazır çıktılara dönüştürür.",
          "Disiplinler arası iş paketlerini yönetme, ekip eğitme ve plancılar, mühendisler ve dış paydaşlarla teslimleri koordine etme deneyimi."
        ]
      },
      skills: [
        { group: { en: "Urban & Regional Planning", de: "Stadt- & Regionalplanung", tr: "Şehir ve Bölge Planlama" }, items: "Masterplanning · regional strategy · land-use analysis · development frameworks · planning reports" },
        { group: { en: "Mobility & Infrastructure", de: "Mobilität & Infrastruktur", tr: "Ulaşım ve Altyapı" }, items: "TOD & station-area studies · accessibility · passenger-flow support · infrastructure inputs" },
        { group: { en: "Scenario Development", de: "Szenarioentwicklung", tr: "Senaryo Geliştirme" }, items: "Population projections · urban growth scenarios · option testing · suitability analysis" },
        { group: { en: "Climate Adaptation", de: "Klimaanpassung", tr: "İklim Uyumu" }, items: "Heat, flood and ecological risk mapping · climate-sensitive design inputs · renewable-energy siting" },
        { group: { en: "Tools & Communication", de: "Tools & Kommunikation", tr: "Araçlar ve İletişim" }, items: "ArcGIS Pro · QGIS · Python · Adobe CC · AutoCAD · map books · 3D outputs · Claude / Codex · GitHub web maps" }
      ]
    }
  },

  /* Places used by the itinerary map (lat, lon). */
  places: {
    izmir:     { name: "İzmir",      lat: 38.42, lon: 27.14 },
    frankfurt: { name: "Frankfurt",  lat: 50.11, lon: 8.68 },
    munich:    { name: "München",    lat: 48.14, lon: 11.58 },
    baku:      { name: "Baku",       lat: 40.41, lon: 49.87 },
    tbilisi:   { name: "Tbilisi",    lat: 41.72, lon: 44.79 },
    muscat:    { name: "Muscat",     lat: 23.59, lon: 58.41 },
    riyadh:    { name: "Riyadh",     lat: 24.71, lon: 46.68 },
    doha:      { name: "Doha",       lat: 25.29, lon: 51.53 },
    sakarya:   { name: "Sakarya",    lat: 40.78, lon: 30.40 },
    bilecik:   { name: "Bilecik",    lat: 40.14, lon: 29.98 },
    bodrum:    { name: "Bodrum",     lat: 37.03, lon: 27.43 }
  },

  /* Skill "layers" — toggled like a GIS layer panel. */
  layers: [
    { id: "spatial", color: "#1F3BFF",
      name: { en: "Spatial Analysis", de: "Räumliche Analyse", tr: "Mekânsal Analiz" },
      desc: { en: "Accessibility, catchments, suitability and multi-criteria models.", de: "Erreichbarkeit, Einzugsbereiche, Eignungs- und Multikriterienmodelle.", tr: "Erişilebilirlik, etki alanı, uygunluk ve çok kriterli modeller." },
      tools: "ArcGIS Pro · QGIS · network analysis · MCA" },
    { id: "climate", color: "#0A0A0A",
      name: { en: "Remote Sensing & Climate", de: "Fernerkundung & Klima", tr: "Uzaktan Algılama ve İklim" },
      desc: { en: "Urban heat, flood and ecological risk from satellite and model data.", de: "Stadtklima, Hochwasser- und Ökorisiken aus Satelliten- und Modelldaten.", tr: "Uydu ve model verisiyle kentsel ısı, taşkın ve ekolojik risk." },
      tools: "SOLWEIG / UMEP · Landsat / Sentinel · GeoAI" },
    { id: "data", color: "#8A8A84",
      name: { en: "Geodata Engineering", de: "Geodaten-Engineering", tr: "Mekânsal Veri Mühendisliği" },
      desc: { en: "Geodatabases, standards and QA/QC that whole departments rely on.", de: "Geodatenbanken, Standards und QA/QC, auf die ganze Abteilungen bauen.", tr: "Tüm birimlerin dayandığı coğrafi veritabanları, standartlar ve QA/QC." },
      tools: "File / enterprise GDB · SQL · raster & vector pipelines" },
    { id: "code", color: "#0B1A8C",
      name: { en: "Automation & Code", de: "Automatisierung & Code", tr: "Otomasyon ve Kod" },
      desc: { en: "Python geoprocessing, web maps and AI-assisted development.", de: "Python-Geoprozessierung, Webkarten und KI-gestützte Entwicklung.", tr: "Python coğrafi işlem, web haritaları ve yapay zekâ destekli geliştirme." },
      tools: "Python · GeoPandas · Rasterio · Leaflet · GitHub Pages" },
    { id: "plan", color: "#7B8CFF",
      name: { en: "Planning & Strategy", de: "Planung & Strategie", tr: "Planlama ve Strateji" },
      desc: { en: "Masterplans, regional strategies, TOD and growth scenarios.", de: "Masterpläne, Regionalstrategien, TOD und Wachstumsszenarien.", tr: "Master planlar, bölgesel stratejiler, TOD ve büyüme senaryoları." },
      tools: "Masterplanning · projections · scenario testing" },
    { id: "comm", color: "#C2C2BC",
      name: { en: "Cartography & Communication", de: "Kartografie & Kommunikation", tr: "Kartografya ve İletişim" },
      desc: { en: "Map books, dashboards, workshops and training for non-specialists.", de: "Kartenwerke, Dashboards, Workshops und Schulungen für Nicht-Fachleute.", tr: "Harita kitapları, paneller, çalıştaylar ve uzman olmayanlara eğitim." },
      tools: "Layouts · Adobe CC · dashboards · training" }
  ],

  experience: [
    {
      id: "free", start: "2025-06", end: null,
      org: { en: "Independent", de: "Selbstständig", tr: "Bağımsız" },
      city: { en: "Germany / Remote", de: "Deutschland / Remote", tr: "Almanya / Uzaktan" },
      role: { en: "Senior GIS & Spatial Analytics Consultant", de: "Senior Berater GIS & räumliche Analytik", tr: "Kıdemli CBS ve Mekânsal Analitik Danışmanı" },
      rolePlan: { en: "Senior Urban Planning Consultant & AI-Supported Analysis Platform Developer", de: "Senior Berater Stadtplanung & Entwickler KI-gestützter Analyseplattformen", tr: "Kıdemli Şehir Planlama Danışmanı ve Yapay Zekâ Destekli Analiz Platformu Geliştiricisi" },
      places: ["frankfurt"], layers: ["spatial", "climate", "code", "plan", "comm"],
      bullets: {
        en: [
          "Build GIS models for multi-criteria assessment and scenario testing, covering earthquake resilience, 15-minute-city accessibility, solar potential and agricultural capacity across 35+ districts and 13 municipalities.",
          "Automate repetitive geoprocessing in Python, cutting manual GIS production time by roughly 60%.",
          "Publish an open-data mapping portfolio on GitHub Pages, including a 1 m-resolution urban heat stress simulation for central Frankfurt squares."
        ],
        de: [
          "Entwicklung von GIS-Modellen für Multikriterienbewertung und Szenariotests, darunter Erdbebenresilienz, 15-Minuten-Stadt, Solarpotenzial und landwirtschaftliche Kapazität in 35+ Bezirken und 13 Kommunen.",
          "Automatisierung wiederkehrender Geoprozesse in Python, wodurch die manuelle GIS-Produktion rund 60 % schneller wurde.",
          "Veröffentlichung eines Open-Data-Kartenportfolios auf GitHub Pages, inklusive einer Hitzestress-Simulation in 1 m Auflösung für Frankfurter Innenstadtplätze."
        ],
        tr: [
          "Çok kriterli değerlendirme ve senaryo testleri için CBS modelleri; 35+ ilçe ve 13 belediyede deprem dirençliliği, 15 dakikalık şehir erişilebilirliği, güneş potansiyeli ve tarımsal kapasite.",
          "Tekrarlayan coğrafi işlemleri Python ile otomatikleştirerek manuel CBS üretim süresini yaklaşık %60 azaltma.",
          "Frankfurt merkez meydanları için 1 m çözünürlüklü kentsel ısı stresi simülasyonu dahil, GitHub Pages üzerinde açık veri harita portfolyosu yayınlama."
        ]
      }
    },
    {
      id: "mgk", start: "2024-10", end: "2025-05",
      org: { en: "Mahl Gebhard Konzepte", de: "Mahl Gebhard Konzepte", tr: "Mahl Gebhard Konzepte" },
      city: { en: "Munich, Germany", de: "München, Deutschland", tr: "Münih, Almanya" },
      role: { en: "Senior GIS Expert and Urban Planner", de: "Senior GIS-Experte und Stadtplaner", tr: "Kıdemli CBS Uzmanı ve Şehir Plancısı" },
      places: ["munich"], layers: ["climate", "data", "spatial", "comm"],
      bullets: {
        en: [
          "Led GIS and analytical workstreams for two climate adaptation and land-use projects with direct municipal relevance.",
          "Applied remote sensing and GeoAI to identify heat island, flood and ecological risk hotspots.",
          "Produced 35+ spatial indicators, geodatabases and map packages; standardised team GIS methods and trained colleagues in ArcGIS and QGIS."
        ],
        de: [
          "Leitung der GIS- und Analysearbeit für zwei Klimaanpassungs- und Flächennutzungsprojekte mit direktem kommunalem Bezug.",
          "Einsatz von Fernerkundung und GeoAI zur Identifikation von Hitzeinseln, Hochwasser- und Ökorisiko-Hotspots.",
          "Erstellung von 35+ räumlichen Indikatoren, Geodatenbanken und Kartenpaketen; Standardisierung der GIS-Methoden und Schulung des Teams in ArcGIS und QGIS."
        ],
        tr: [
          "Doğrudan belediye ölçeğinde önem taşıyan iki iklim uyumu ve arazi kullanımı projesinde CBS ve analiz süreçlerini yönetme.",
          "Isı adası, taşkın ve ekolojik risk sıcak noktalarını uzaktan algılama ve GeoAI ile belirleme.",
          "35+ mekânsal gösterge, coğrafi veritabanı ve harita paketi üretme; ekibin CBS yöntemlerini standartlaştırma ve ArcGIS/QGIS eğitimi verme."
        ]
      }
    },
    {
      id: "asp3", start: "2023-09", end: "2024-09",
      org: { en: "Albert Speer + Partner", de: "Albert Speer + Partner", tr: "Albert Speer + Partner" },
      city: { en: "Frankfurt & international", de: "Frankfurt & international", tr: "Frankfurt ve uluslararası" },
      role: { en: "Team Lead, GIS and Urban Planning", de: "Teamleiter GIS und Stadtplanung", tr: "Ekip Lideri, CBS ve Şehir Planlama" },
      places: ["frankfurt", "riyadh", "muscat", "doha"], layers: ["plan", "comm", "spatial", "data"],
      bullets: {
        en: [
          "Managed a cross-functional GIS & urban planning team across multiple international projects, from task allocation to meetings and delivery schedules.",
          "Led or co-led strategy chapters, maps, dashboards, station-area studies and GIS technical reports.",
          "Represented the team in client meetings and delivered GIS and planning training for client stakeholders."
        ],
        de: [
          "Leitung eines interdisziplinären GIS- und Stadtplanungsteams über mehrere internationale Projekte, von der Aufgabenverteilung bis zu Meetings und Lieferplänen.",
          "(Mit-)Verantwortung für Strategiekapitel, Karten, Dashboards, Bahnhofsumfeldstudien und GIS-Fachberichte.",
          "Vertretung des Teams in Kundenterminen und GIS-/Planungsschulungen für Stakeholder des Auftraggebers."
        ],
        tr: [
          "Birden fazla uluslararası projede disiplinler arası CBS ve şehir planlama ekibini görev dağılımından toplantılara ve teslim takvimlerine kadar yönetme.",
          "Strateji bölümleri, haritalar, paneller, istasyon çevresi çalışmaları ve CBS teknik raporlarını yürütme veya ortak yürütme.",
          "Müşteri toplantılarında ekibi temsil etme ve müşteri paydaşlarına CBS/planlama eğitimleri verme."
        ]
      }
    },
    {
      id: "asp2", start: "2022-06", end: "2023-08",
      org: { en: "Albert Speer + Partner", de: "Albert Speer + Partner", tr: "Albert Speer + Partner" },
      city: { en: "Frankfurt & international", de: "Frankfurt & international", tr: "Frankfurt ve uluslararası" },
      role: { en: "GIS Specialist and Regional Planner", de: "GIS-Spezialist und Regionalplaner", tr: "CBS Uzmanı ve Bölge Plancısı" },
      places: ["frankfurt", "muscat", "riyadh", "baku", "tbilisi", "doha"], layers: ["spatial", "plan", "data", "comm"],
      bullets: {
        en: [
          "Contributed to strategic planning projects in Oman, Saudi Arabia, Azerbaijan, Georgia and Qatar.",
          "Led spatial modelling for mobility and infrastructure packages covering populations from ~450,000 to 2 million+, with projections and growth scenarios to 2040 and 2050.",
          "Delivered passenger-flow, accessibility and station-area inputs and 50+ analytical maps for reports and workshops."
        ],
        de: [
          "Mitarbeit an strategischen Planungsprojekten in Oman, Saudi-Arabien, Aserbaidschan, Georgien und Katar.",
          "Leitung der räumlichen Modellierung für Mobilitäts- und Infrastrukturpakete für ~450.000 bis über 2 Mio. Einwohner, inkl. Prognosen und Wachstumsszenarien bis 2040 und 2050.",
          "Grundlagen zu Fahrgastströmen, Erreichbarkeit und Bahnhofsumfeldern sowie 50+ Analysekarten für Berichte und Workshops."
        ],
        tr: [
          "Umman, Suudi Arabistan, Azerbaycan, Gürcistan ve Katar'daki stratejik planlama projelerine katkı.",
          "~450.000'den 2 milyonu aşan nüfuslara hizmet eden ulaşım ve altyapı paketleri için mekânsal modellemeyi yönetme; 2040 ve 2050 hedef yıllı projeksiyonlar ve büyüme senaryoları.",
          "Yolcu akışı, erişilebilirlik ve istasyon çevresi girdileri ile raporlar ve çalıştaylar için 50+ analitik harita."
        ]
      }
    },
    {
      id: "konak", start: "2021-10", end: "2022-05",
      org: { en: "Municipality of Konak", de: "Stadtverwaltung Konak", tr: "Konak Belediyesi" },
      city: { en: "İzmir, Türkiye", de: "İzmir, Türkei", tr: "İzmir, Türkiye" },
      role: { en: "GIS Analyst and Regional Planner", de: "GIS-Analyst und Regionalplaner", tr: "CBS Analisti ve Bölge Plancısı" },
      places: ["izmir"], layers: ["data", "spatial", "plan"],
      bullets: {
        en: [
          "Led development, standardisation and QA/QC of municipal GIS datasets used across departments.",
          "Introduced 150+ GIS layers, data standards and analytical routines for recurring municipal use in economic development, infrastructure and landscape planning."
        ],
        de: [
          "Leitung von Aufbau, Standardisierung und QA/QC kommunaler GIS-Datensätze für mehrere Ämter.",
          "Einführung von 150+ GIS-Layern, Datenstandards und Analyseroutinen für Wirtschaftsförderung, Infrastruktur- und Landschaftsplanung."
        ],
        tr: [
          "Birçok müdürlüğün kullandığı belediye CBS veri setlerinin geliştirilmesini, standartlaştırılmasını ve QA/QC sürecini yönetme.",
          "Ekonomik kalkınma, altyapı ve peyzaj planlamasında düzenli kullanım için 150+ CBS katmanı, veri standardı ve analiz rutini oluşturma."
        ]
      }
    },
    {
      id: "sinir", start: "2021-01", end: "2021-09",
      org: { en: "SINIR Planning Ltd.", de: "SINIR Planning Ltd.", tr: "SINIR Planlama Ltd." },
      city: { en: "İzmir, Türkiye", de: "İzmir, Türkei", tr: "İzmir, Türkiye" },
      role: { en: "Project Manager, Urban Planning and GIS", de: "Projektleiter Stadtplanung und GIS", tr: "Proje Yöneticisi, Şehir Planlama ve CBS" },
      places: ["izmir"], layers: ["plan", "spatial", "comm"],
      bullets: {
        en: [
          "Managed a public industrial / residential development project from analysis through reporting.",
          "Delivered land suitability and infrastructure analyses for sites totalling ~25 ha; trained and led 15+ colleagues in ArcGIS and QGIS."
        ],
        de: [
          "Leitung eines öffentlichen Gewerbe-/Wohnentwicklungsprojekts von der Analyse bis zum Bericht.",
          "Eignungs- und Infrastrukturanalysen für Flächen von insgesamt ~25 ha; Schulung und Führung von 15+ Kolleg:innen in ArcGIS und QGIS."
        ],
        tr: [
          "Kamuya ait bir sanayi / konut gelişim projesini analizden raporlamaya kadar yönetme.",
          "Toplam ~25 ha alan için arazi uygunluk ve altyapı analizleri; 15+ çalışana ArcGIS ve QGIS eğitimi verme ve ekibi yönetme."
        ]
      }
    },
    {
      id: "asp1", start: "2019-09", end: "2020-12",
      org: { en: "Albert Speer + Partner", de: "Albert Speer + Partner", tr: "Albert Speer + Partner" },
      city: { en: "Frankfurt & international", de: "Frankfurt & international", tr: "Frankfurt ve uluslararası" },
      role: { en: "GIS Analyst and Regional Planner", de: "GIS-Analyst und Regionalplaner", tr: "CBS Analisti ve Bölge Plancısı" },
      places: ["frankfurt", "baku"], layers: ["data", "spatial", "plan", "comm"],
      bullets: {
        en: [
          "Produced GIS analyses and 150+ geospatial layers for the Baku 2040 Masterplan (ISOCARP Award) and related strategy studies.",
          "Delivered 50+ analytical maps supporting mobility, land-use and environmental planning."
        ],
        de: [
          "GIS-Analysen und 150+ Geodaten-Layer für den Masterplan Baku 2040 (ISOCARP Award) und verwandte Strategiestudien.",
          "50+ Analysekarten für Mobilitäts-, Flächennutzungs- und Umweltplanung."
        ],
        tr: [
          "Bakü 2040 Master Planı (ISOCARP Ödülü) ve ilgili strateji çalışmaları için CBS analizleri ve 150+ mekânsal katman.",
          "Ulaşım, arazi kullanımı ve çevre planlamasını destekleyen 50+ analitik harita."
        ]
      }
    },
    {
      id: "beb", start: "2018-02", end: "2019-08",
      org: { en: "BEB Development Agency", de: "BEB Entwicklungsagentur", tr: "BEB Kalkınma Ajansı" },
      city: { en: "İzmir, Türkiye", de: "İzmir, Türkei", tr: "İzmir, Türkiye" },
      role: { en: "Regional & Urban Planner / GIS Analyst", de: "Regional- & Stadtplaner / GIS-Analyst", tr: "Bölge ve Şehir Plancısı / CBS Analisti" },
      places: ["izmir", "sakarya", "bilecik"], layers: ["plan", "spatial", "data"],
      bullets: {
        en: ["Analysed water, energy and land-use systems across ~400,000 ha for regional strategies such as Sakarya 2040 and Bilecik 2050."],
        de: ["Analyse von Wasser-, Energie- und Flächennutzungssystemen auf ~400.000 ha für Regionalstrategien wie Sakarya 2040 und Bilecik 2050."],
        tr: ["Sakarya 2040 ve Bilecik 2050 gibi bölgesel stratejiler için ~400.000 ha alanda su, enerji ve arazi kullanımı sistemlerinin analizi."]
      }
    }
  ],

  education: [
    {
      id: "deu", start: "2014-09", end: "2018-06", places: ["izmir"],
      title: { en: "B.Sc. City and Regional Planning", de: "B.Sc. Stadt- und Regionalplanung", tr: "Şehir ve Bölge Planlama Lisans" },
      org: { en: "Dokuz Eylül University, İzmir", de: "Dokuz-Eylül-Universität, İzmir", tr: "Dokuz Eylül Üniversitesi, İzmir" }
    },
    {
      id: "pg", start: "2018-09", end: "2021-06", places: ["izmir"],
      title: { en: "Postgraduate coursework (non-degree): urban planning, smart & regional systems, landscape & agricultural planning", de: "Postgraduale Kurse (ohne Abschluss): Stadtplanung, Smart & Regional Systems, Landschafts- & Agrarplanung", tr: "Lisansüstü dersler (derecesiz): şehir planlama, akıllı ve bölgesel sistemler, peyzaj ve tarımsal planlama" },
      org: { en: "İzmir Institute of Technology & Ege University", de: "Izmir Institute of Technology & Ege-Universität", tr: "İzmir Yüksek Teknoloji Enstitüsü ve Ege Üniversitesi" }
    }
  ],

  languages: [
    { name: { en: "Turkish", de: "Türkisch", tr: "Türkçe" }, level: { en: "Native", de: "Muttersprache", tr: "Ana dil" }, v: 1 },
    { name: { en: "English", de: "Englisch", tr: "İngilizce" }, level: { en: "Full professional", de: "Verhandlungssicher", tr: "Tam profesyonel" }, v: .9 },
    { name: { en: "German", de: "Deutsch", tr: "Almanca" }, level: { en: "B2", de: "B2", tr: "B2" }, v: .65 },
    { name: { en: "Japanese", de: "Japanisch", tr: "Japonca" }, level: { en: "A1", de: "A1", tr: "A1" }, v: .15 }
  ],

  awards: [
    { title: { en: "ISOCARP Award for the Baku 2040 Masterplan", de: "ISOCARP Award für den Masterplan Baku 2040", tr: "Bakü 2040 Master Planı ile ISOCARP Ödülü" } },
    { title: { en: "First prize in the Bodrum Urban Design Project", de: "1. Preis im Städtebauprojekt Bodrum", tr: "Bodrum Kentsel Tasarım Projesi'nde birincilik" } },
    { title: { en: "Second prize at Design Your Neighborhood 2025", de: "2. Preis bei Design Your Neighborhood 2025", tr: "Design Your Neighborhood 2025'te ikincilik" } },
    { title: { en: "Finalist in Reimagine Elbphilharmonie", de: "Finalist bei Reimagine Elbphilharmonie", tr: "Reimagine Elbphilharmonie finalisti" } },
    { title: { en: "Finalist in the Eliava Bazaar Project", de: "Finalist beim Eliava Bazaar Project", tr: "Eliava Bazaar Projesi finalisti" } }
  ],

  /* Selected works — editorial case studies. `plate` picks the generative artwork.
     Replace with a real screenshot by adding image: "assets/img/xyz.webp". */
  works: [
    {
      id: "uhi", featured: true, plate: "heat", year: "2026", place: "Frankfurt am Main",
      kicker: { en: "Independent research · Urban climate", de: "Eigene Forschung · Stadtklima", tr: "Bağımsız araştırma · Kent iklimi" },
      title: { en: "Urban Heat Stress in Frankfurt's Squares", de: "Hitzestress auf Frankfurter Plätzen", tr: "Frankfurt Meydanlarında Kentsel Isı Stresi" },
      question: { en: "How hot do Frankfurt's central squares really get, metre by metre, and where should design intervene first?", de: "Wie heiß werden Frankfurts Innenstadtplätze wirklich, Meter für Meter, und wo sollte Gestaltung zuerst ansetzen?", tr: "Frankfurt'un merkez meydanları metre metre gerçekte ne kadar ısınıyor ve tasarım önce nereye müdahale etmeli?" },
      method: { en: "1 m mean-radiant-temperature and heat-stress modelling (SOLWEIG) built from open elevation, building and vegetation data, published as an interactive web map.", de: "Modellierung von mittlerer Strahlungstemperatur und Hitzestress in 1 m (SOLWEIG) aus offenen Höhen-, Gebäude- und Vegetationsdaten, veröffentlicht als interaktive Webkarte.", tr: "Açık yükseklik, bina ve bitki örtüsü verisinden 1 m çözünürlükte ortalama radyant sıcaklık ve ısı stresi modellemesi (SOLWEIG); interaktif web haritası olarak yayınlandı." },
      outcome: { en: "A public, square-by-square heat atlas meant to complement city-scale climate maps. Part two, with design scenarios for the hottest squares, is in progress. The results are model based and have not yet been validated in the field.", de: "Ein öffentlicher Hitzeatlas Platz für Platz als Ergänzung zu stadtweiten Klimakarten. Der zweite Teil mit Gestaltungsszenarien für die heißesten Plätze ist in Arbeit. Die Ergebnisse beruhen auf einem Modell und sind noch nicht durch Messungen bestätigt.", tr: "Kent ölçeğindeki iklim haritalarını tamamlamayı amaçlayan, meydan meydan açık bir ısı atlası. En sıcak meydanlar için tasarım senaryolarını içeren ikinci bölüm üzerinde çalışıyorum. Sonuçlar modele dayanıyor ve henüz saha ölçümüyle doğrulanmadı." },
      tools: ["Python", "SOLWEIG / UMEP", "QGIS", "Leaflet"], layers: ["climate", "spatial", "code", "comm"],
      link: "https://barisparlatangiller.github.io/Urban-Heat-Stress---Frankfurt-Platz/",
      repo: "https://github.com/barisparlatangiller/Urban-Heat-Stress---Frankfurt-Platz"
    },
    {
      id: "30dmc", featured: true, plate: "calendar", year: "2026", place: { en: "Germany & beyond", de: "Deutschland & darüber hinaus", tr: "Almanya ve ötesi" },
      kicker: { en: "Open-data map series", de: "Open-Data-Kartenserie", tr: "Açık veri harita serisi" },
      title: { en: "#30DayMapChallenge 2026: Heat and Housing", de: "#30DayMapChallenge 2026: Hitze und Wohnen", tr: "#30DayMapChallenge 2026: Isı ve Konut" },
      question: { en: "Can 30 small, rigorous maps make the housing crisis and urban heat in Germany's largest cities legible to everyone?", de: "Können 30 kleine, saubere Karten Wohnungskrise und Stadthitze in Deutschlands größten Städten für alle lesbar machen?", tr: "30 küçük ama titiz harita, Almanya'nın en büyük şehirlerindeki konut krizini ve kentsel ısıyı herkes için okunur kılabilir mi?" },
      method: { en: "One day, one theme, one city. Every map is its own public repository and live GitHub Pages site, built from QGIS-loadable open data with an AI-assisted pipeline.", de: "Ein Tag, ein Thema, eine Stadt. Jede Karte ist ein eigenes öffentliches Repository mit Live-Seite auf GitHub Pages, gebaut aus offenen, QGIS-tauglichen Daten mit KI-gestützter Pipeline.", tr: "Bir gün, bir tema, bir şehir. Her harita kendi açık deposu ve canlı GitHub Pages sitesi; QGIS'e yüklenebilir açık veriler ve yapay zekâ destekli bir iş akışıyla üretildi." },
      outcome: { en: "A growing public archive of interactive maps about rents, canopy heat, land value, high-rise shadows and much more. The full list is in the index below.", de: "Ein wachsendes öffentliches Archiv interaktiver Karten über Mieten, Hitze unter Baumkronen, Bodenwerte, Hochhausschatten und vieles mehr. Die vollständige Liste steht unten im Verzeichnis.", tr: "Kira, ağaç örtüsü ve ısı, arsa değeri, yüksek bina gölgeleri ve daha fazlasını içeren, büyüyen açık bir interaktif harita arşivi. Tam liste aşağıda." },
      tools: ["QGIS", "Python", "Leaflet / MapLibre", "GitHub Pages"], layers: ["code", "comm", "spatial", "data"],
      link: "https://barisparlatangiller.github.io/", repo: "https://github.com/barisparlatangiller"
    },
    {
      id: "gulf", plate: "arcs", year: "2022–24", place: { en: "Oman · Saudi Arabia · Qatar · Georgia", de: "Oman · Saudi-Arabien · Katar · Georgien", tr: "Umman · Suudi Arabistan · Katar · Gürcistan" },
      kicker: { en: "Mobility & infrastructure strategy", de: "Mobilitäts- & Infrastrukturstrategie", tr: "Ulaşım ve altyapı stratejisi" },
      title: { en: "Strategic Planning across the Gulf & Caucasus", de: "Strategische Planung in Golfregion & Kaukasus", tr: "Körfez ve Kafkasya'da Stratejik Planlama" },
      question: { en: "Where should growth, stations and infrastructure go for cities of 450,000 to over 2 million people by 2040 and 2050?", de: "Wohin sollen Wachstum, Stationen und Infrastruktur für Städte mit 450.000 bis über 2 Mio. Menschen bis 2040 und 2050?", tr: "450.000'den 2 milyonu aşan nüfuslu şehirlerde 2040 ve 2050'ye kadar büyüme, istasyonlar ve altyapı nereye yönlenmeli?" },
      method: { en: "Population projections, growth scenarios, catchment and station-area analysis; team lead for GIS deliverables, dashboards and client training.", de: "Bevölkerungsprognosen, Wachstumsszenarien, Einzugs- und Bahnhofsumfeldanalysen; Teamleitung für GIS-Ergebnisse, Dashboards und Kundenschulungen.", tr: "Nüfus projeksiyonları, büyüme senaryoları, etki alanı ve istasyon çevresi analizleri; CBS çıktıları, paneller ve müşteri eğitimlerinde ekip liderliği." },
      outcome: { en: "Spatial modelling inputs to mobility and infrastructure packages in five countries.", de: "Räumliche Modellierung für Mobilitäts- und Infrastrukturpakete in fünf Ländern.", tr: "Beş ülkede ulaşım ve altyapı paketlerine mekânsal modelleme girdileri." },
      tools: ["ArcGIS Pro", "QGIS", "Dashboards"], layers: ["spatial", "plan", "comm"]
    },
    {
      id: "konakgis", plate: "stack", year: "2021–22", place: "İzmir",
      kicker: { en: "Municipal GIS", de: "Kommunales GIS", tr: "Belediye CBS" },
      title: { en: "Konak Municipal GIS Backbone", de: "GIS-Rückgrat der Stadt Konak", tr: "Konak Belediyesi CBS Altyapısı" },
      question: { en: "How do you make one shared, trustworthy geodata base for a whole municipality?", de: "Wie entsteht eine gemeinsame, verlässliche Geodatenbasis für eine ganze Kommune?", tr: "Bütün bir belediye için ortak ve güvenilir bir mekânsal veri tabanı nasıl kurulur?" },
      method: { en: "Data standards, QA/QC routines and 150+ layers designed for recurring use across departments.", de: "Datenstandards, QA/QC-Routinen und 150+ Layer für die wiederkehrende Nutzung in allen Ämtern.", tr: "Müdürlükler arası düzenli kullanım için veri standartları, QA/QC rutinleri ve 150+ katman." },
      outcome: { en: "A standardised municipal GIS used in economic development, infrastructure and landscape planning.", de: "Ein standardisiertes kommunales GIS für Wirtschaftsförderung, Infrastruktur- und Landschaftsplanung.", tr: "Ekonomik kalkınma, altyapı ve peyzaj planlamasında kullanılan standart bir belediye CBS'si." },
      tools: ["ArcGIS", "QGIS", "SQL"], layers: ["data", "spatial"]
    },
    {
      id: "regional", plate: "contour", year: "2018–19", place: "Sakarya · Bilecik",
      kicker: { en: "Regional strategy", de: "Regionalstrategie", tr: "Bölgesel strateji" },
      title: { en: "Sakarya 2040 & Bilecik 2050", de: "Sakarya 2040 & Bilecik 2050", tr: "Sakarya 2040 ve Bilecik 2050" },
      question: { en: "How do water, energy and land use interact across a region of ~400,000 hectares?", de: "Wie wirken Wasser, Energie und Flächennutzung in einer Region von ~400.000 Hektar zusammen?", tr: "~400.000 hektarlık bir bölgede su, enerji ve arazi kullanımı birbirini nasıl etkiliyor?" },
      method: { en: "Regional GIS analysis across seven districts and their settlements.", de: "Regionale GIS-Analyse über sieben Bezirke und ihre Siedlungen.", tr: "Yedi ilçe ve yerleşimlerinde bölgesel CBS analizi." },
      outcome: { en: "Evidence base for long-range regional development strategies.", de: "Evidenzbasis für langfristige Regionalentwicklungsstrategien.", tr: "Uzun vadeli bölgesel kalkınma stratejileri için kanıt tabanı." },
      tools: ["ArcGIS", "QGIS"], layers: ["plan", "spatial", "data"]
    }
  ],

  /* FOLIO — the 16 projects of the 2026 portfolio. Images in assets/img/folio/<id>.webp (+ -board.webp).
     chapter: 1 spatial intelligence · 2 climate & public realm · 3 culture & adaptive reuse · 4 future systems */
  chapters: {
    1: { en: "Spatial intelligence & planning systems", de: "Räumliche Intelligenz & Planungssysteme", tr: "Mekânsal zekâ ve planlama sistemleri" },
    2: { en: "Climate, public realm & streets", de: "Klima, öffentlicher Raum & Straßen", tr: "İklim, kamusal alan ve sokaklar" },
    3: { en: "Culture, heritage & adaptive reuse", de: "Kultur, Erbe & Umnutzung", tr: "Kültür, miras ve yeniden kullanım" },
    4: { en: "Future systems & speculative design", de: "Zukunftssysteme & spekulatives Design", tr: "Gelecek sistemleri ve spekülatif tasarım" }
  },
  folio: [
    { id: "climate-risk", ch: 1, place: "Unterschleißheim, DE",
      title: { en: "Climate Risk Intelligence", de: "Climate Risk Intelligence", tr: "İklim Riski Zekâsı" },
      text: { en: "Heat, flood and ecological vulnerability overlaid with development pressure, so a municipality sees where climate risk and opportunity intersect. The risk map is not the result; knowing what to do first is.", de: "Hitze-, Hochwasser- und ökologische Verwundbarkeit überlagert mit Entwicklungsdruck, damit eine Kommune sieht, wo Klimarisiko und Chance zusammenfallen. Das Ergebnis ist nicht die Risikokarte, sondern das Wissen, was zuerst zu tun ist.", tr: "Isı, taşkın ve ekolojik kırılganlık gelişme baskısıyla üst üste bindirildi; belediye iklim riskinin ve fırsatın kesiştiği yeri görüyor. Çıktı risk haritası değil, önceliktir." } },
    { id: "baku-2040", ch: 1, place: "Baku, AZ",
      title: { en: "Baku 2040, the Geospatial Evidence Base", de: "Baku 2040, die Geodatenbasis", tr: "Bakü 2040 Mekânsal Kanıt Tabanı" },
      text: { en: "150+ layers and 50+ analytical maps behind a metropolitan vision for 2,150 km² and 2.5 million people. ISOCARP Award.", de: "150+ Layer und 50+ Analysekarten hinter einer Metropolvision für 2.150 km² und 2,5 Mio. Menschen. ISOCARP Award.", tr: "2.150 km² ve 2,5 milyon kişilik bir metropol vizyonunun arkasında 150+ katman ve 50+ analitik harita. ISOCARP Ödülü." } },
    { id: "scenario-platform", ch: 1, place: "35 districts · 13 municipalities",
      title: { en: "GIS Planning Scenario Platform", de: "GIS-Plattform für Planungsszenarien", tr: "CBS Planlama Senaryo Platformu" },
      text: { en: "A decision engine that tests growth priority, climate resilience and 15-minute accessibility side by side. The goal was never more maps. It was a machine that makes alternatives comparable.", de: "Eine Entscheidungsmaschine, die Wachstumspriorität, Klimaresilienz und 15-Minuten-Erreichbarkeit nebeneinander testet. Ziel waren nicht mehr Karten, sondern vergleichbare Alternativen.", tr: "Büyüme önceliği, iklim dirençliliği ve 15 dakikalık erişilebilirliği yan yana test eden bir karar motoru. Amaç daha çok harita değil, alternatifleri karşılaştırılabilir kılan bir makineydi." } },
    { id: "nizwa-2040", ch: 1, place: "Nizwa, OM",
      title: { en: "Nizwa Master Plan 2040", de: "Masterplan Nizwa 2040", tr: "Nizwa Master Planı 2040" },
      text: { en: "A regional structure that ties heritage landscapes, wadis and emerging urban centres into one development framework for 2040.", de: "Eine Regionalstruktur, die Kulturlandschaften, Wadis und neue Zentren zu einem Entwicklungsrahmen für 2040 verbindet.", tr: "Miras peyzajlarını, vadileri ve yükselen kent merkezlerini 2040 için tek bir gelişme çerçevesinde birleştiren bölgesel yapı." } },
    { id: "wadi-landscape", ch: 2, place: "Wadi Andam Halfayn, OM",
      title: { en: "Landscape Zoning Strategy", de: "Landschaftszonierung", tr: "Peyzaj Bölgeleme Stratejisi" },
      text: { en: "Zones that follow the wadi's hydrology: ecological cores, productive landscapes and community nodes, balanced instead of competing.", de: "Zonen entlang der Hydrologie des Wadis: ökologische Kerne, produktive Landschaften und Gemeinschaftsknoten, die sich ergänzen statt zu konkurrieren.", tr: "Vadinin hidrolojisini izleyen bölgeler: ekolojik çekirdekler, üretken peyzajlar ve birbiriyle yarışmak yerine dengede duran topluluk düğümleri." } },
    { id: "watershed", ch: 2, place: "İstanbul, TR",
      title: { en: "Watershed Resilience Framework", de: "Resilienzrahmen Wassereinzugsgebiet", tr: "Su Havzası Dirençlilik Çerçevesi" },
      text: { en: "Küçükçekmece and Sazlıdere basins: ecological corridors from ridge to coast that protect water, reduce flood risk and reconnect the city to its lake.", de: "Einzugsgebiete Küçükçekmece und Sazlıdere: ökologische Korridore vom Kamm bis zur Küste, die Wasser schützen, Hochwasser mindern und die Stadt mit dem See verbinden.", tr: "Küçükçekmece ve Sazlıdere havzaları: sırttan kıyıya uzanan, suyu koruyan, taşkın riskini azaltan ve şehri gölüyle yeniden buluşturan ekolojik koridorlar." } },
    { id: "biserinlik", ch: 2, place: "Bayraklı, İzmir",
      title: { en: "#BiSerinlikLazım", de: "#BiSerinlikLazım", tr: "#BiSerinlikLazım" },
      text: { en: "A blue-green cooling corridor along Bayraklı's Sevgi Yolu. More shade, more water and more life, all measured as a drop in surface temperature.", de: "Ein blau-grüner Kühlkorridor entlang des Sevgi Yolu in Bayraklı. Mehr Schatten, mehr Wasser und mehr Leben, gemessen daran, wie stark die Oberflächentemperatur sinkt.", tr: "Bayraklı Sevgi Yolu boyunca mavi-yeşil bir serinleme koridoru. Daha çok gölge, daha çok su ve daha çok yaşam; hepsi yüzey sıcaklığındaki düşüşle ölçülüyor." } },
    { id: "bostanli", ch: 2, place: "Bostanlı, İzmir",
      title: { en: "Bostanlı Climate Corridor", de: "Klimakorridor Bostanlı", tr: "Bostanlı İklim Koridoru" },
      text: { en: "A coastal spine for walking, cycling and the tram, cooled by native shade trees, bioswales and permeable surfaces.", de: "Eine Küstenachse für Fußverkehr, Rad und Tram, gekühlt durch heimische Schattenbäume, Mulden und versickerungsfähige Beläge.", tr: "Yürüme, bisiklet ve tramvay için kıyı omurgası; yerel gölge ağaçları, biyo-hendekler ve geçirgen yüzeylerle serinletiliyor." } },
    { id: "rudolfstrasse", ch: 2, place: "Frankfurt am Main, DE",
      title: { en: "Rudolfstraße", de: "Rudolfstraße", tr: "Rudolfstraße" },
      text: { en: "A street redesign off Mainzer Landstraße: wider sidewalks, rain gardens and street trees that handle stormwater on site.", de: "Neugestaltung an der Mainzer Landstraße: breitere Gehwege, Regengärten und Straßenbäume, die Regenwasser vor Ort halten.", tr: "Mainzer Landstraße yakınında sokak tasarımı: geniş kaldırımlar, yağmur bahçeleri ve yağmur suyunu yerinde tutan sokak ağaçları." } },
    { id: "tactical-cooling", ch: 2, place: "Alsancak, İzmir",
      title: { en: "Tactical Urbanism for Cooler Cities", de: "Taktischer Urbanismus für kühlere Städte", tr: "Daha Serin Şehirler İçin Taktik Şehircilik" },
      text: { en: "Data finds the hotspots; small, cheap, fast interventions cool them today and prepare systemic change tomorrow. Cooling is the new cool.", de: "Daten finden die Hotspots; kleine, günstige, schnelle Eingriffe kühlen sie heute und bereiten den systemischen Wandel vor.", tr: "Veri sıcak noktaları buluyor; küçük, ucuz ve hızlı müdahaleler bugün serinletiyor, yarının sistemik dönüşümünü hazırlıyor." } },
    { id: "avlu-kayakoy", ch: 3, place: "Kayaköy, Fethiye",
      title: { en: "AVLU, Living Ruins", de: "AVLU, Lebende Ruinen", tr: "AVLU, Yaşayan Harabeler" },
      text: { en: "An abandoned stone village becomes an open-air museum: an elevated walkway, four routes and a network of courtyards that keep the ruins as they are.", de: "Ein verlassenes Steindorf wird Freilichtmuseum: ein erhöhter Steg, vier Routen und ein Netz aus Höfen, das die Ruinen unangetastet lässt.", tr: "Terk edilmiş taş köy açık hava müzesine dönüşüyor: yükseltilmiş yürüyüş yolu, dört rota ve harabelere dokunmayan avlular ağı." } },
    { id: "mosaic-pubvate", ch: 3, place: "Tbilisi, GE",
      title: { en: "Mosaic Pubvate", de: "Mosaic Pubvate", tr: "Mosaic Pubvate" },
      text: { en: "The Eliava market district reimagined: an elevated mosaic path where public and private space dissolve into one another. Competition finalist.", de: "Das Eliava-Marktviertel neu gedacht: ein erhöhter Mosaikpfad, auf dem öffentlicher und privater Raum ineinander übergehen. Wettbewerbsfinalist.", tr: "Eliava pazar bölgesi yeniden: kamusal ve özel alanın birbirine karıştığı yükseltilmiş bir mozaik yol. Yarışma finalisti." } },
    { id: "new-stage", ch: 3, place: { en: "Lakefront concept", de: "Konzept am Seeufer", tr: "Göl kıyısı konsepti" },
      title: { en: "The New Stage Is Urban Nature", de: "Die neue Bühne ist Stadtnatur", tr: "Yeni Sahne Kentsel Doğadır" },
      text: { en: "An amphitheatre without a backdrop: a single steel frame holds the horizon, and the landscape becomes the stage.", de: "Ein Amphitheater ohne Kulisse: ein einziger Stahlrahmen fasst den Horizont, die Landschaft wird zur Bühne.", tr: "Dekoru olmayan bir amfitiyatro: tek bir çelik çerçeve ufku tutuyor, peyzaj sahneye dönüşüyor." } },
    { id: "bodegas-vinival", ch: 3, place: "Valencia, ES",
      title: { en: "Bodegas Vinival", de: "Bodegas Vinival", tr: "Bodegas Vinival" },
      text: { en: "Brick wine silos from 1900, abandoned by 2025, and a living agro lab by 2030. A century of continuity, told as a timeline.", de: "Weinsilos aus Ziegel von 1900, verlassen im Jahr 2025 und ab 2030 ein lebendiges Agrarlabor. Ein Jahrhundert Kontinuität, erzählt als Zeitleiste.", tr: "1900'den kalma tuğla şarap siloları, 2025'te terk edilmiş, 2030'da ise yaşayan bir tarım laboratuvarı. Zaman çizelgesi olarak anlatılan bir asırlık süreklilik." } },
    { id: "cubic-flux", ch: 4, place: { en: "Wetland campus", de: "Campus im Feuchtgebiet", tr: "Sulak alan kampüsü" },
      title: { en: "Cubic Flux", de: "Cubic Flux", tr: "Cubic Flux" },
      text: { en: "A modular research campus raised above a wetland, built to grow, shrink and be taken apart without leaving a trace.", de: "Ein modularer Forschungscampus über einem Feuchtgebiet, gebaut, um zu wachsen, zu schrumpfen und spurlos rückgebaut zu werden.", tr: "Sulak alanın üzerinde yükselen modüler bir araştırma kampüsü; büyüyebilen, küçülebilen ve iz bırakmadan sökülebilen." } },
    { id: "kizil-yamac", ch: 4, place: { en: "Mars", de: "Mars", tr: "Mars" },
      title: { en: "Kızıl Yamaç AgroPilot", de: "Kızıl Yamaç AgroPilot", tr: "Kızıl Yamaç AgroPilot" },
      text: { en: "Food for a permanent human presence on Mars: pressurised greenhouse branches, a closed water loop and a field that grows by adding modules.", de: "Nahrung für eine dauerhafte Präsenz auf dem Mars: Druckgewächshäuser, ein geschlossener Wasserkreislauf und ein Feld, das modulweise wächst.", tr: "Mars'ta kalıcı insan varlığı için gıda: basınçlı sera kolları, kapalı su döngüsü ve modül ekledikçe büyüyen bir üretim alanı." } }
  ],

  /* Public GitHub projects. `kind`: "research" | "30dmc". Add new ones here. */
  repos: [
    { repo: "Urban-Heat-Stress---Frankfurt-Platz", kind: "research", title: "Urban Heat Stress, Frankfurt Platz", city: "Frankfurt", theme: "1 m heat model" },
    { repo: "30DMC26-D01-Points-Berlin-Rent-vs-Location", kind: "30dmc", day: 1, title: "Rent vs Location", city: "Berlin", theme: "Points" },
    { repo: "30DMC26-D02-Lines-Leipzig-Street-Canopy-Heat", kind: "30dmc", day: 2, title: "Street Canopy Heat", city: "Leipzig", theme: "Lines" },
    { repo: "30DMC26-D03-Polygons-Frankfurt-Land-Value-2035", kind: "30dmc", day: 3, title: "Land Value 2035", city: "Frankfurt", theme: "Polygons" },
    { repo: "30DMC26-D04-Clusters-Berlin-Coffee-Clusters", kind: "30dmc", day: 4, title: "Coffee Clusters", city: "Berlin", theme: "Clusters" },
    { repo: "30DMC26-D05-Sight-Frankfurt-HighRise-Shadows", kind: "30dmc", day: 5, title: "High-Rise Shadows", city: "Frankfurt", theme: "Sight" },
    { repo: "30DMC26-D06-Vintage-Istanbul-Old-Names", kind: "30dmc", day: 6, title: "Old Names", city: "İstanbul", theme: "Vintage" },
    { repo: "30DMC26-D07-10MinuteMap-Europe-Christmas-Markets", kind: "30dmc", day: 7, title: "Christmas Markets", city: "Europe", theme: "10-Minute Map" },
    { repo: "30DMC26-D08-Utopia-Munich-Dachrepublik", kind: "30dmc", day: 8, title: "Dachrepublik", city: "München", theme: "Utopia" },
    { repo: "30DMC26-D09-UrbanRural-Berlin-Homeoffice", kind: "30dmc", day: 9, title: "Home Office", city: "Berlin", theme: "Urban / Rural" },
    { repo: "30DMC26-D10-PromptingOnly-NYC-Pulse", kind: "30dmc", day: 10, title: "NYC Pulse", city: "New York", theme: "Prompting Only" },
    { repo: "30DMC26-D11-Sound-World-Music-Charts", kind: "30dmc", day: 11, title: "World Music Charts", city: "World", theme: "Sound" },
    { repo: "30DMC26-D12-Power-Leipzig-Secondhand", kind: "30dmc", day: 12, title: "Secondhand", city: "Leipzig", theme: "Power" },
    { repo: "30DMC26-D13-Interactions-Hamburg-City-Is-Lava", kind: "30dmc", day: 13, title: "The City Is Lava", city: "Hamburg", theme: "Interactions" },
    { repo: "30DMC26-D14-Borgesian-Frankfurt-Square-Heat", kind: "30dmc", day: 14, title: "Square Heat", city: "Frankfurt", theme: "Borgesian" },
    { repo: "30DMC26-D15-InsideOut-Koblenz-Invisible-Lake", kind: "30dmc", day: 15, title: "Invisible Lake", city: "Koblenz", theme: "Inside Out" },
    { repo: "30DMC26-D25-IsThisAMap-London-Manifest-Stage", kind: "30dmc", day: 25, title: "Manifest Stage", city: "London", theme: "Is This a Map?" }
  ]
};

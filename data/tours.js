/* Guided tours through the A3 boards. Each stop is a region of the board
   [x0, y0, x1, y1] as fractions of width and height, plus a caption in three languages.
   The viewer flies to each region in turn, so a reader can go from the whole board to the detail. */
window.TOURS = {
  "climate-risk": [
    { r: [.2, .07, .6, .75], en: "The integrated risk map for Unterschleißheim brings heat, flooding and ecological sensitivity onto a single surface.", de: "Die integrierte Risikokarte für Unterschleißheim bringt Hitze, Hochwasser und ökologische Empfindlichkeit auf eine gemeinsame Fläche.", tr: "Unterschleißheim için hazırlanan bütünleşik risk haritası ısıyı, taşkını ve ekolojik hassasiyeti tek bir yüzeyde buluşturuyor." },
    { r: [.68, .07, 1, .4], en: "Four risk layers are scored and combined into one composite index, so the hotspots stop being a matter of opinion.", de: "Vier Risikoebenen werden bewertet und zu einem Gesamtindex verrechnet, damit Hotspots keine Ansichtssache mehr sind.", tr: "Dört risk katmanı puanlanıp tek bir bileşik endekste birleşiyor; böylece sıcak noktalar bir görüş meselesi olmaktan çıkıyor." },
    { r: [.6, .72, 1, .97], en: "The decision matrix turns every risk condition into a concrete response, from new tree canopy to blue and green buffers.", de: "Die Entscheidungsmatrix übersetzt jede Risikolage in eine konkrete Antwort, von neuen Baumkronen bis zu blaugrünen Puffern.", tr: "Karar matrisi her risk durumunu somut bir yanıta dönüştürüyor; yeni ağaç örtüsünden mavi yeşil tampon alanlara kadar." }
  ],
  "baku-2040": [
    { r: [.25, .25, .47, .72], en: "Every layer of the city, from topography to strategic zones, stacked into one evidence base.", de: "Alle Ebenen der Stadt, von der Topografie bis zu den Strategiezonen, gestapelt zu einer Datengrundlage.", tr: "Topoğrafyadan stratejik bölgelere kadar şehrin bütün katmanları tek bir kanıt tabanında üst üste duruyor." },
    { r: [.45, .05, 1, .78], en: "What comes out of it is a metropolitan structure for 2,150 km² and 2.5 million people in 2040.", de: "Daraus entsteht eine Metropolstruktur für 2.150 km² und 2,5 Millionen Menschen im Jahr 2040.", tr: "Ortaya çıkan şey, 2040 yılında 2.150 km² ve 2,5 milyon insan için bir metropol yapısı." },
    { r: [0, .76, 1, .95], en: "And this is the workflow behind it, from data collection and quality control to the final planning packages.", de: "Und das ist der Arbeitsablauf dahinter, von der Datensammlung über die Qualitätskontrolle bis zu den Planungspaketen.", tr: "Arkasındaki iş akışı da bu: veri toplamadan kalite kontrole ve son planlama paketlerine kadar." }
  ],
  "scenario-platform": [
    { r: [.28, .08, .88, .62], en: "Each parcel is scored and extruded, so growth potential becomes something you can actually see.", de: "Jede Parzelle wird bewertet und extrudiert, sodass Wachstumspotenzial sichtbar wird.", tr: "Her parsel puanlanıp yükseltiliyor; böylece büyüme potansiyeli gözle görülür hale geliyor." },
    { r: [.24, .6, .98, .76], en: "Data sources, a processing engine, an indicator matrix and a scenario comparison work as one continuous chain.", de: "Datenquellen, Verarbeitung, Indikatorenmatrix und Szenariovergleich arbeiten als eine durchgehende Kette.", tr: "Veri kaynakları, işleme motoru, gösterge matrisi ve senaryo karşılaştırması tek bir zincir gibi çalışıyor." },
    { r: [.2, .75, 1, .98], en: "Three scenarios side by side: growth priority, climate resilience and 15 minute accessibility.", de: "Drei Szenarien nebeneinander: Wachstumspriorität, Klimaresilienz und Erreichbarkeit in 15 Minuten.", tr: "Yan yana üç senaryo: büyüme önceliği, iklim dirençliliği ve 15 dakikalık erişilebilirlik." }
  ],
  "nizwa-2040": [
    { r: [.2, .2, .34, .88], en: "From topography and hydrology to opportunity zones, the region is read one layer at a time.", de: "Von Topografie und Hydrologie bis zu Chancenräumen wird die Region Ebene für Ebene gelesen.", tr: "Topoğrafya ve hidrolojiden fırsat alanlarına kadar bölge katman katman okunuyor." },
    { r: [.33, .04, 1, .86], en: "The framework ties Nizwa, Firq, Manah and Birkat Al Mawz together along the wadis and growth corridors.", de: "Der Rahmenplan verbindet Nizwa, Firq, Manah und Birkat Al Mawz entlang der Wadis und Wachstumskorridore.", tr: "Çerçeve plan Nizwa, Firq, Manah ve Birkat Al Mawz'ı vadiler ve büyüme koridorları boyunca birbirine bağlıyor." },
    { r: [0, .86, 1, .99], en: "Five steps lead from understanding the region to a phased plan for implementation.", de: "Fünf Schritte führen vom Verständnis der Region zu einem gestuften Umsetzungsplan.", tr: "Beş adım, bölgeyi anlamaktan aşamalı bir uygulama planına uzanıyor." }
  ],
  "wadi-landscape": [
    { r: [.38, .02, 1, .76], en: "The zones follow the wadi itself, and each one takes on its own role along the water.", de: "Die Zonen folgen dem Wadi selbst, und jede übernimmt am Wasser ihre eigene Rolle.", tr: "Bölgeler vadinin kendisini izliyor ve her biri su boyunca kendi rolünü üstleniyor." },
    { r: [.21, .18, .39, .78], en: "Three zone types repeat across the valley: the ecological core, the community node and the productive landscape.", de: "Drei Zonentypen wiederholen sich im Tal: ökologischer Kern, Gemeinschaftsknoten und produktive Landschaft.", tr: "Vadi boyunca üç bölge tipi tekrar ediyor: ekolojik çekirdek, topluluk düğümü ve üretken peyzaj." },
    { r: [0, .78, 1, .97], en: "A typical section through the wadi and the expected impact, including 40% more riparian habitat.", de: "Ein typischer Schnitt durch das Wadi und die erwartete Wirkung, darunter 40 % mehr Uferlebensraum.", tr: "Vadiden tipik bir kesit ve beklenen etki; kıyı habitatında %40 artış da buna dahil." }
  ],
  "watershed": [
    { r: [.25, 0, .7, .82], en: "The Küçükçekmece and Sazlıdere basins drawn as one connected system, from the ridge down to the coast.", de: "Die Einzugsgebiete Küçükçekmece und Sazlıdere als ein zusammenhängendes System, vom Kamm bis zur Küste.", tr: "Küçükçekmece ve Sazlıdere havzaları, sırttan kıyıya uzanan tek ve bağlantılı bir sistem olarak çizildi." },
    { r: [.7, 0, 1, .8], en: "Six ecological corridors, each with its own section, from the forest edge to the coastal buffer.", de: "Sechs ökologische Korridore mit eigenem Schnitt, vom Waldrand bis zum Küstenpuffer.", tr: "Orman kenarından kıyı tamponuna kadar, her biri kendi kesitine sahip altı ekolojik koridor." },
    { r: [.47, .8, 1, .97], en: "The expected impact is 35% more water retention and 30% less flood exposure for vulnerable areas.", de: "Erwartet werden 35 % mehr Wasserrückhalt und 30 % weniger Hochwassergefährdung in empfindlichen Bereichen.", tr: "Beklenen etki, %35 daha fazla su tutma ve hassas alanlarda taşkına %30 daha az maruz kalma." }
  ],
  "biserinlik": [
    { r: [.52, .02, 1, .4], en: "Surface temperature along Sevgi Yolu today and after the strategy, with an expected drop of 8 to 12 °C.", de: "Oberflächentemperatur am Sevgi Yolu heute und nach der Strategie, mit einem erwarteten Rückgang um 8 bis 12 °C.", tr: "Sevgi Yolu boyunca bugünkü ve strateji sonrası yüzey sıcaklığı; beklenen düşüş 8 ile 12 °C arasında." },
    { r: [0, .42, .3, .73], en: "A tree palette chosen for shade, from oriental plane to olive, each species rated for how well it cools.", de: "Eine Baumauswahl für Schatten, von der Morgenländischen Platane bis zur Olive, jede Art nach ihrer Kühlwirkung bewertet.", tr: "Doğu çınarından zeytine kadar gölge için seçilmiş bir ağaç paleti; her tür serinletme gücüne göre değerlendirildi." },
    { r: [.3, .42, .73, .73], en: "The typical section shows how shade, water and permeable ground work together to cool the street.", de: "Der typische Schnitt zeigt, wie Schatten, Wasser und offener Boden die Straße gemeinsam kühlen.", tr: "Tipik kesit, gölgenin, suyun ve geçirgen zeminin sokağı birlikte nasıl serinlettiğini gösteriyor." }
  ],
  "bostanli": [
    { r: [.15, .1, .8, .72], en: "The coastal spine with tram, bike lane and promenade, shaded by plane trees and Mexican fan palms.", de: "Die Küstenachse mit Tram, Radweg und Promenade, beschattet von Platanen und Washingtonpalmen.", tr: "Tramvay, bisiklet yolu ve promenadıyla kıyı omurgası; çınarlar ve Meksika yelpaze palmiyeleriyle gölgeleniyor." },
    { r: [0, .72, .8, .97], en: "Six interventions make it work, from shaded tram stops to rain gardens.", de: "Sechs Eingriffe machen es möglich, von beschatteten Haltestellen bis zu Regengärten.", tr: "Bunu gölgeli tramvay duraklarından yağmur bahçelerine kadar altı müdahale mümkün kılıyor." },
    { r: [.8, .82, 1, .97], en: "The expected impact is 40% more shade cover and surface temperatures around 2.5 °C lower.", de: "Erwartet werden 40 % mehr Schatten und etwa 2,5 °C niedrigere Oberflächentemperaturen.", tr: "Beklenen etki, %40 daha fazla gölge ve yaklaşık 2,5 °C daha düşük yüzey sıcaklığı." }
  ],
  "rudolfstrasse": [
    { r: [.22, .03, .72, .95], en: "The site plan along Rudolfstraße, with rain gardens, street trees and wider sidewalks.", de: "Der Lageplan entlang der Rudolfstraße mit Regengärten, Straßenbäumen und breiteren Gehwegen.", tr: "Rudolfstraße boyunca yağmur bahçeleri, sokak ağaçları ve genişletilmiş kaldırımlarla vaziyet planı." },
    { r: [.72, .45, 1, .7], en: "A 17.7 metre section shows how sidewalks, rain gardens and parking share the street.", de: "Ein Schnitt über 17,7 Meter zeigt, wie sich Gehwege, Regengärten und Parken die Straße teilen.", tr: "17,7 metrelik kesit, kaldırımların, yağmur bahçelerinin ve otoparkın sokağı nasıl paylaştığını gösteriyor." },
    { r: [.72, .03, 1, .45], en: "The key plan and intersection detail, with raised crossings that give priority to pedestrians.", de: "Übersichtsplan und Kreuzungsdetail mit erhöhten Querungen, die Fußgängern Vorrang geben.", tr: "Anahtar plan ve kavşak detayı; yükseltilmiş geçitler yayalara öncelik veriyor." }
  ],
  "tactical-cooling": [
    { r: [.28, .02, .7, .6], en: "A heat map of Alsancak reveals five hotspots, from the commercial corridor to the park edges.", de: "Eine Hitzekarte von Alsancak zeigt fünf Hotspots, vom Geschäftskorridor bis zu den Parkrändern.", tr: "Alsancak'ın ısı haritası ticari koridordan park kenarlarına kadar beş sıcak nokta ortaya koyuyor." },
    { r: [0, .42, .3, .92], en: "A toolkit of small moves: pocket parks, misting, cool pavements and tactical bike lanes.", de: "Ein Baukasten kleiner Eingriffe: Pocket Parks, Sprühnebel, kühle Beläge und temporäre Radwege.", tr: "Küçük hamlelerden oluşan bir araç kutusu: cep parkları, sisleme, serin kaplamalar ve taktik bisiklet yolları." },
    { r: [.7, 0, 1, .95], en: "Talat Paşa Boulevard as the case study, turning a hot corridor into a cool spine.", de: "Der Talat-Paşa-Boulevard als Fallstudie, aus einem heißen Korridor wird eine kühle Achse.", tr: "Örnek alan olarak Talat Paşa Bulvarı: sıcak bir koridor serin bir omurgaya dönüşüyor." }
  ],
  "avlu-kayakoy": [
    { r: [.2, .08, .8, .8], en: "Four routes link Kayaköy with Fethiye, Ölüdeniz and Butterfly Valley.", de: "Vier Routen verbinden Kayaköy mit Fethiye, Ölüdeniz und dem Schmetterlingstal.", tr: "Dört rota Kayaköy'ü Fethiye, Ölüdeniz ve Kelebekler Vadisi'ne bağlıyor." },
    { r: [.78, .24, 1, .75], en: "A network of courtyards, each one a small hub for culture, learning and exchange.", de: "Ein Netz aus Höfen, jeder ein kleiner Treffpunkt für Kultur, Lernen und Austausch.", tr: "Her biri kültür, öğrenme ve paylaşım için küçük bir merkez olan avlulardan oluşan bir ağ." },
    { r: [.25, .62, 1, .98], en: "An elevated walkway touches the ground lightly and leaves the ruins exactly as they are.", de: "Ein erhöhter Steg berührt den Boden kaum und lässt die Ruinen, wie sie sind.", tr: "Yükseltilmiş yürüyüş yolu zemine hafifçe dokunuyor ve harabeleri olduğu gibi bırakıyor." }
  ],
  "mosaic-pubvate": [
    { r: [.32, .02, .72, .56], en: "The masterplan threads one elevated mosaic path through the Eliava market district.", de: "Der Masterplan führt einen erhöhten Mosaikpfad durch das Eliava-Marktviertel.", tr: "Master plan, Eliava pazar bölgesinin içinden geçen tek bir yükseltilmiş mozaik yol kuruyor." },
    { r: [.72, .02, 1, .56], en: "A gradient from private to public space, with the hybrid pubvate spaces in between.", de: "Ein Übergang vom privaten zum öffentlichen Raum, mit hybriden Pubvate-Räumen dazwischen.", tr: "Özelden kamusala uzanan bir geçiş ve arada melez pubvate alanları." },
    { r: [0, .72, 1, .98], en: "The elevated path in use, linking the market, the workshops and the Kura river.", de: "Der erhöhte Pfad im Gebrauch, er verbindet Markt, Werkstätten und den Fluss Kura.", tr: "Kullanımdaki yükseltilmiş yol pazarı, atölyeleri ve Kura nehrini birbirine bağlıyor." }
  ],
  "new-stage": [
    { r: [.2, .03, 1, .72], en: "A single steel frame faces the lake and turns the horizon into the stage.", de: "Ein einzelner Stahlrahmen blickt auf den See und macht den Horizont zur Bühne.", tr: "Tek bir çelik çerçeve göle bakıyor ve ufku sahneye dönüştürüyor." },
    { r: [0, .72, .52, .97], en: "One platform with four uses: performances, talks, markets and everyday gatherings.", de: "Eine Plattform für vier Nutzungen: Aufführungen, Gespräche, Märkte und alltägliche Treffen.", tr: "Dört kullanımlı tek bir platform: gösteriler, söyleşiler, pazarlar ve gündelik buluşmalar." },
    { r: [.52, .72, 1, .97], en: "The frame in detail: a light steel structure with integrated lighting and a service core.", de: "Der Rahmen im Detail: eine leichte Stahlkonstruktion mit integrierter Beleuchtung und Technikkern.", tr: "Çerçevenin detayı: entegre aydınlatmaya ve servis çekirdeğine sahip hafif bir çelik yapı." }
  ],
  "bodegas-vinival": [
    { r: [.25, .08, 1, .66], en: "Four moments in one timeline: 1900, 2025, 2030 and 2040.", de: "Vier Momente auf einer Zeitleiste: 1900, 2025, 2030 und 2040.", tr: "Tek bir zaman çizelgesinde dört an: 1900, 2025, 2030 ve 2040." },
    { r: [0, .34, .25, .68], en: "Four design principles guide the reuse, and the first is respect for the existing structure.", de: "Vier Gestaltungsprinzipien leiten die Umnutzung, und das erste ist Respekt vor dem Bestand.", tr: "Yeniden kullanımı dört tasarım ilkesi yönlendiriyor ve ilki mevcut yapıya saygı." },
    { r: [.25, .78, 1, .97], en: "From agricultural silos to a living agro lab, told decade by decade.", de: "Von landwirtschaftlichen Silos zum lebendigen Agrarlabor, Jahrzehnt für Jahrzehnt erzählt.", tr: "Tarım silolarından yaşayan bir tarım laboratuvarına, on yıl on yıl anlatılıyor." }
  ],
  "cubic-flux": [
    { r: [.4, .03, .85, .9], en: "The campus stands on stilts above the wetland, so the water keeps flowing underneath.", de: "Der Campus steht auf Stützen über dem Feuchtgebiet, damit das Wasser darunter weiterfließen kann.", tr: "Kampüs sulak alanın üzerinde ayaklar üstünde duruyor, böylece su altından akmaya devam ediyor." },
    { r: [0, .03, .4, .5], en: "Floor plans on a modular grid that can grow or shrink with the needs of research.", de: "Grundrisse auf einem modularen Raster, das mit den Anforderungen der Forschung wachsen oder schrumpfen kann.", tr: "Araştırma ihtiyaçlarına göre büyüyüp küçülebilen modüler bir ızgara üzerinde kat planları." },
    { r: [0, .5, .4, .97], en: "One base module, stacked and connected into configurations that can adapt over time.", de: "Ein Grundmodul, gestapelt und verbunden zu Konfigurationen, die sich mit der Zeit anpassen.", tr: "Tek bir temel modül, üst üste ve yan yana gelerek zamanla uyum sağlayan düzenlere dönüşüyor." }
  ],
  "kizil-yamac": [
    { r: [.25, .13, 1, .48], en: "A pressurised greenhouse module, built for a long term human presence on Mars.", de: "Ein Druckgewächshaus-Modul, gebaut für eine dauerhafte Präsenz von Menschen auf dem Mars.", tr: "Mars'ta uzun süreli insan varlığı için tasarlanmış basınçlı bir sera modülü." },
    { r: [.25, .48, 1, .93], en: "Greenhouse branches, a central hub, a water loop and solar arrays form one production field.", de: "Gewächshausarme, ein zentraler Knoten, ein Wasserkreislauf und Solarfelder bilden ein Produktionsfeld.", tr: "Sera kolları, merkezi bir düğüm, su döngüsü ve güneş panelleri tek bir üretim alanı oluşturuyor." },
    { r: [0, .88, 1, 1], en: "The system aims for 95% water reuse and grows simply by adding more modules.", de: "Das System zielt auf 95 % Wasserwiederverwendung und wächst, indem man einfach Module ergänzt.", tr: "Sistem suyun %95'ini yeniden kullanmayı hedefliyor ve yalnızca yeni modüller eklenerek büyüyor." }
  ]
};

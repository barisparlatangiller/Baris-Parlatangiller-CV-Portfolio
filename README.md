# An Atlas of Work — Baris Parlatangiller

**Interactive CV & portfolio of a Senior GIS & Spatial Analyst and Urban & Regional Planner, Frankfurt am Main.**
English · Deutsch · Türkçe

**Live:** https://barisparlatangiller.github.io/Baris-Parlatangiller-CV-Portfolio/
**CV only:** https://barisparlatangiller.github.io/Baris-Parlatangiller-CV-Portfolio/cv.html

---

## v2: Career Twin (3D)

**Live:** https://barisparlatangiller.github.io/Baris-Parlatangiller-CV-Portfolio/v2/ · career timeline link: `…/v2/?tour=1`

The whole career as one 3D map you fly through (deck.gl). Every role, project, map and award is a column; scroll zooms from the world down to one metre. The deepest level is the real SOLWEIG study of Frankfurt's Altstadt: 3,018 extruded buildings, 1,827 street trees, 24 squares with statistics and hourly mean radiant temperature for 27 June 2026, with an hour slider. Three lenses (keys 1, 2, 3) rearrange the same items by place, time and skill. A professional career timeline in eight chapters, a rotating globe that hands over to a flat 3D map at city scale, featured work, a command palette (Cmd+K), a detail panel for everything, and the board viewer with guided tours. Data is built in Python by `tools/build_v2.py` (GeoPandas, Shapely, Pillow).

## The idea

The site is designed like a Swiss International Style magazine, made for someone who makes maps. It uses concrete grey, ink black and one colour, Klein blue. Heat colours appear only where they are data.

| Part | What it does |
|---|---|
| **Masthead** | One cover in three languages, like *Neue Grafik*. Fig. 1 is a halftone heat map: your cursor is a tree, and its shadow falls in the real direction of the sun over Frankfurt right now, calculated in the browser. |
| **Powers of ten** | A pinned scroll sequence that zooms from a 400,000 ha region down to one square metre, with a live map scale. Each step is a real project. |
| **01 Places** | Every country and city from the CV, the portfolio and the map series on a halftone map built in Python (see below), with totals, a register by country and the career timeline. Point at a place to see what happened there; the country lights up in Klein blue. |
| **02 Layers** | Skills as a GIS layer panel, linked to the roles and projects that prove them. |
| **03 Works** | Two in-depth case studies (Frankfurt heat stress, #30DayMapChallenge) plus further work and awards. |
| **Folio** | The sixteen projects of the 2026 portfolio in a pinned horizontal gallery. Every image opens its full A3 board in a map-style viewer with zoom and pan, and a **guided tour** flies from the whole board to three details and explains each one. |
| **04 Lab** | *Cool a square*: paint trees, water and grass on a plaza and watch a simple surface temperature model react. |
| **05 Index** | Every public map repository, filterable and searchable. |
| **06 Contact** | A Klein blue panel that grows open as you scroll. |

Press **G** anywhere to see the 12 column grid.

### Links for applications

| Link | Opens |
|---|---|
| `…/Baris-Parlatangiller-CV-Portfolio/` | the full atlas |
| `…/cv.html?lang=de&focus=gis` | the CV in German, GIS focus (`lang`: en, de, tr · `focus`: gis, plan) |
| `…/#biserinlik` | a single project board, opened in the viewer |
| `…/#biserinlik/2` | the same board, zoomed into detail 2 of the guided tour |
| `…/assets/cv/Baris-Parlatangiller-CV-GIS-EN.pdf` | ready-made PDF (GIS or Planning, EN, DE or TR) |

The **CV page** (`cv.html`) is calm, semantic and ATS friendly, with print to PDF built in. A **Focus** switch toggles between the GIS reading and the urban planning reading of the same career.

## Why no framework?

The site is plain HTML, CSS and JavaScript. There is no build step and no external dependencies. Fonts (Archivo and JetBrains Mono, SIL Open Font License) are self-hosted, so the site makes no third party requests.

- It deploys on GitHub Pages as-is: push and it's live.
- It opens straight from the file system for editing (`index.html` works without a server).
- It loads fast, uses no trackers or cookies, and respects `prefers-reduced-motion`.

## The Python pipeline behind the Places map

The map is not drawn by hand. [`tools/build_places.py`](tools/build_places.py) uses **GeoPandas** and **Natural Earth 1:50m** to sample a halftone dot grid with square spacing on screen, tags every dot with its country through a spatial join, checks that each place really lies inside its country, and measures the career route with geodesic distances on the WGS84 ellipsoid (**pyproj**). The result is written to `data/places.js`, which the static site loads.

```bash
pip install geopandas pyproj
python tools/build_places.py
# data/places.js: 84x126 grid, 7139 land dots, 10 countries, 20 places, 49 entries, route 6474 km
```

To add a city or a project, edit [`tools/places.json`](tools/places.json) and run the script again.

## Updating content

**Everything is in [`data/content.js`](data/content.js).** Every text is `{ en, de, tr }`.

- **New GitHub project:** add one line to `repos` at the bottom of the file. The index and the stats update automatically.
- **New job:** add an object to `experience`, with `places` (keys from `places`) and `layers` (skill ids).
- **Folio projects:** add an entry to `folio` and put `<id>.webp` (cover) and `<id>-board.webp` (full board) in `assets/img/folio/`.
- **Guided tours:** [`data/tours.js`](data/tours.js), three regions per board with captions in three languages.
- **Interface wording:** [`data/ui.js`](data/ui.js).
- **CV PDFs:** after changing the CV, print `cv.html` to PDF again (or ask for the PDFs to be regenerated) and replace the files in `assets/cv/`.

## Structure

```
index.html          the atlas
cv.html             the CV (print → PDF)
data/content.js     all content, EN/DE/TR
data/ui.js          interface strings, EN/DE/TR
assets/css/         style.css (atlas), cv.css (CV + print)
assets/js/          i18n · sun · field (halftone hero) · scroll (choreography) · viewer · plates · lab · main · cv
assets/img/folio/   project covers and A3 boards
```

## Run locally

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

## License

The source code is under the MIT license. Personal content (CV text, project descriptions, images) is © Baris Parlatangiller. See [LICENSE](LICENSE).

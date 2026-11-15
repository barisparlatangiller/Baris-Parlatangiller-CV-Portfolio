# An Atlas of Work — Baris Parlatangiller

**Interactive CV & portfolio of a Senior GIS & Spatial Analyst and Urban & Regional Planner, Frankfurt am Main.**
English · Deutsch · Türkçe

**Live:** https://barisparlatangiller.github.io/Baris-Parlatangiller-CV-Portfolio/
**CV only:** https://barisparlatangiller.github.io/Baris-Parlatangiller-CV-Portfolio/cv.html

---

## The idea

The site is designed like a Swiss International Style magazine, made for someone who makes maps. It uses concrete grey, ink black and one colour, Klein blue. Heat colours appear only where they are data.

| Part | What it does |
|---|---|
| **Masthead** | One cover in three languages, like *Neue Grafik*. Fig. 1 is a halftone heat map: your cursor is a tree, and its shadow falls in the real direction of the sun over Frankfurt right now, calculated in the browser. |
| **Powers of ten** | A pinned scroll sequence that zooms from a 400,000 ha region down to one square metre, with a live map scale. Each step is a real project. |
| **01 Route** | The career drawn as a route on a bare graticule. The timeline drives the map. |
| **02 Layers** | Skills as a GIS layer panel, linked to the roles and projects that prove them. |
| **03 Works** | Two in-depth case studies (Frankfurt heat stress, #30DayMapChallenge) plus further work and awards. |
| **Folio** | The sixteen projects of the 2026 portfolio in a pinned horizontal gallery. Every image opens its full A3 board in a map-style viewer with zoom and pan. |
| **04 Lab** | *Cool a square*: paint trees, water and grass on a plaza and watch a simple surface temperature model react. |
| **05 Index** | Every public map repository, filterable and searchable. |
| **06 Contact** | A Klein blue panel that grows open as you scroll. |

Press **G** anywhere to see the 12 column grid.

The **CV page** (`cv.html`) is calm, semantic and ATS friendly, with print to PDF built in. A **Focus** switch toggles between the GIS reading and the urban planning reading of the same career.

## Why no framework?

The site is plain HTML, CSS and JavaScript. There is no build step and no dependencies apart from Google Fonts.

- It deploys on GitHub Pages as-is: push and it's live.
- It opens straight from the file system for editing (`index.html` works without a server).
- It loads fast, uses no trackers or cookies, and respects `prefers-reduced-motion`.

## Updating content

**Everything is in [`data/content.js`](data/content.js).** Every text is `{ en, de, tr }`.

- **New GitHub project:** add one line to `repos` at the bottom of the file. The index and the stats update automatically.
- **New job:** add an object to `experience`, with `places` (keys from `places`) and `layers` (skill ids).
- **Folio projects:** add an entry to `folio` and put `<id>.webp` (cover) and `<id>-board.webp` (full board) in `assets/img/folio/`.
- **Interface wording:** [`data/ui.js`](data/ui.js).

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

# An Atlas of Work — Baris Parlatangiller

**Interactive CV & portfolio of a Senior GIS & Spatial Analyst and Urban & Regional Planner, Frankfurt am Main.**
English · Deutsch · Türkçe

**Live:** https://barisparlatangiller.github.io/Baris-Parlatangiller-CV-Portfolio/
**CV only:** https://barisparlatangiller.github.io/Baris-Parlatangiller-CV-Portfolio/cv.html

---

## The idea

A portfolio for someone who makes maps should read like an atlas, not a template.
The site is built as a series of numbered **plates**:

| Plate | What it does |
|---|---|
| **00 · Entrance** | A live contour map (marching squares) that reacts to the cursor. |
| **01 · Itinerary** | The career drawn as a route on a bare graticule: İzmir → Frankfurt → München, with arcs to project cities in the Gulf and Caucasus. A timeline drives the map. |
| **02 · Layers** | Skills as a GIS layer panel. Toggle a layer to see which roles and projects back it up. No skill percentages. |
| **03 · Works** | Editorial case studies built around one question each: question, method, outcome, tools. |
| **04 · Lab** | *Cool a square*: paint trees, water and grass on a paved plaza and watch a simple surface-temperature model react. It links to the real 1 m SOLWEIG study. |
| **05 · Index** | Every public map repository, filterable and searchable. |
| **06 · Contact** | Email, LinkedIn, GitHub, CV. |

The **CV page** (`cv.html`) is the opposite on purpose: quiet, semantic and ATS-friendly, with print-to-PDF built in. A **Focus** switch toggles between two readings of the same career, **GIS & Geospatial** and **Urban & Regional Planning**. It changes the headline, profile, skills and role titles.

## Why no framework?

The site is plain HTML, CSS and JavaScript. There is no build step and no dependencies apart from Google Fonts.

- It deploys on GitHub Pages as-is: push and it's live.
- It opens straight from the file system for editing (`index.html` works without a server).
- It loads fast, uses no trackers or cookies, and respects `prefers-reduced-motion`.

## Updating content

**Everything is in [`data/content.js`](data/content.js).** Every text is `{ en, de, tr }`.

- **New GitHub project:** add one line to `repos` at the bottom of the file. The index and the stats update automatically.
- **New job:** add an object to `experience`, with `places` (keys from `places`) and `layers` (skill ids).
- **Real images for case studies:** put a `.webp` in `assets/img/` and add `image: "assets/img/name.webp"` to the work. Without an image, a generative "map plate" is drawn.
- **Interface wording:** [`data/ui.js`](data/ui.js).

## Structure

```
index.html          the atlas
cv.html             the CV (print → PDF)
data/content.js     all content, EN/DE/TR
data/ui.js          interface strings, EN/DE/TR
assets/css/         style.css (atlas), cv.css (CV + print)
assets/js/          i18n · field (hero contours) · plates (generative art) · lab · main · cv
```

## Run locally

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

## License

The source code is under the MIT license. Personal content (CV text, project descriptions, images) is © Baris Parlatangiller. See [LICENSE](LICENSE).

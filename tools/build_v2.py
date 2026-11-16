"""
build_v2.py — data for v2, the 3D "career twin".

    python tools/build_v2.py [--heat ../Urban-Heat-Stress---Frankfurt-Platz]

Writes v2/data/:
  world.json      Natural Earth 1:50m countries, clipped to the working window and simplified
                  (GeoPandas + Shapely). Countries in the work carry their code.
  scene.json      every role, project, map and award as one item, with place, year, skill,
                  kind and size, plus places, career route and totals.
  frankfurt/      the 1 m SOLWEIG heat study of the Frankfurt Altstadt, taken from the
                  Urban Heat Stress repository: extruded ALKIS buildings, street trees,
                  the 24 squares with their statistics, and hourly Tmrt rasters for the
                  hottest day of the 2026 heatwave (27 June, 40.8 °C).

Requires: geopandas, shapely, pyproj, pillow
"""
from __future__ import annotations

import argparse
import json
import shutil
from pathlib import Path

import geopandas as gpd
from PIL import Image
from shapely.geometry import box, mapping, shape

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "v2" / "data"
NE = ROOT / "tools" / "data" / "countries-50m.json"
PLACES = ROOT / "tools" / "places.json"

WINDOW = (-180.0, -85.0, 180.0, 85.0)       # whole world, for the globe
SIMPLIFY = 0.04                          # degrees

# Year and main skill for every item. Work years come from the CV; folio boards, maps and
# awards without a firm date sit in the 2026 portfolio column.
WORK_YEAR = {"deu": 2014, "beb": 2018, "asp1": 2019, "sinir": 2021, "konak": 2021, "asp2": 2022, "asp3": 2023, "mgk": 2024, "free": 2025}
WORK_SPAN = {"deu": 4, "beb": 1.5, "asp1": 1.3, "sinir": .7, "konak": .6, "asp2": 1.2, "asp3": 1, "mgk": .6, "free": 1.5}
SKILL = {
    "deu": "plan", "beb": "plan", "asp1": "data", "sinir": "plan", "konak": "data", "asp2": "spatial", "asp3": "plan", "mgk": "climate", "free": "code",
    "climate-risk": "climate", "baku-2040": "data", "scenario-platform": "spatial", "nizwa-2040": "plan", "wadi-landscape": "plan",
    "watershed": "climate", "biserinlik": "climate", "bostanli": "climate", "rudolfstrasse": "plan", "tactical-cooling": "climate",
    "avlu-kayakoy": "plan", "mosaic-pubvate": "plan", "new-stage": "comm", "bodegas-vinival": "plan", "cubic-flux": "plan",
    "kizil-yamac": "spatial", "uhi": "climate",
}
FOLIO_YEAR = {"baku-2040": 2020, "rudolfstrasse": 2024}


def world() -> dict:
    g = gpd.read_file(NE, layer="countries").set_crs(4326, allow_override=True)
    src = json.loads(PLACES.read_text(encoding="utf-8"))
    codes = {name: i + 1 for i, name in enumerate(src["countries"])}
    g["geometry"] = g.geometry.make_valid().intersection(box(*WINDOW)).simplify(SIMPLIFY, preserve_topology=True)
    g = g[~g.geometry.is_empty]
    feats = []
    for name, geom in zip(g["name"], g.geometry):
        gj = mapping(geom)
        gj = json.loads(json.dumps(gj), parse_float=lambda x: round(float(x), 3))
        feats.append({"type": "Feature", "properties": {"n": name, "v": codes.get(name, 0)}, "geometry": gj})
    return {"type": "FeatureCollection", "features": feats}


def scene() -> dict:
    src = json.loads(PLACES.read_text(encoding="utf-8"))
    items, n = [], 0
    for p in src["places"]:
        for it in p["items"]:
            ref = it.get("ref", "")
            if it["kind"] == "work":
                year, size = WORK_YEAR.get(ref, 2026), 1 + WORK_SPAN.get(ref, 1)
            elif it["kind"] == "folio":
                year, size = FOLIO_YEAR.get(ref, 2026), 1.6
            elif it["kind"] == "map":
                year, size = 2026, .8
            else:
                year, size = 2026, 1.2
            skill = SKILL.get(ref, "code" if it["kind"] == "map" else "comm")
            items.append({"i": n, "kind": it["kind"], "t": it["t"], "ref": ref, "place": p["id"], "country": p["country"],
                          "lon": p["lon"], "lat": p["lat"], "year": year, "skill": skill, "size": size})
            n += 1
    for it in src.get("elsewhere", []):
        ref = it.get("ref", "")
        items.append({"i": n, "kind": it["kind"], "t": it["t"], "ref": ref, "place": None, "country": None, "lon": None, "lat": None,
                      "year": 2026, "skill": SKILL.get(ref, "code" if it["kind"] == "map" else "comm"), "size": 1.6 if it["kind"] == "folio" else .8})
        n += 1
    places = [{k: p[k] for k in ("id", "name", "country", "lat", "lon")} | {"home": p.get("home", False), "region": p.get("region", False), "n": len(p["items"])} for p in src["places"]]
    return {"items": items, "places": places, "countries": src["countries"], "route": src["route"]}


def frankfurt(heat_repo: Path) -> None:
    out = OUT / "frankfurt"; out.mkdir(parents=True, exist_ok=True)
    d = heat_repo / "docs" / "data"
    man = json.loads((d / "manifest.json").read_text())
    # buildings: [ring, height] with 6-decimal coordinates
    b = json.loads((d / "buildings.geojson").read_text())
    blds = []
    for f in b["features"]:
        geom = shape(f["geometry"])
        polys = [geom] if geom.geom_type == "Polygon" else list(geom.geoms)
        for poly in polys:
            ring = [[round(x, 6), round(y, 6)] for x, y in poly.exterior.coords]
            blds.append([ring, round(float(f["properties"].get("h") or 3), 1)])
    (out / "buildings.json").write_text(json.dumps(blds, separators=(",", ":")))
    # trees: one point per trunk with height and crown diameter
    t = json.loads((d / "trees3d.geojson").read_text())
    trees = []
    for f in t["features"]:
        if f["properties"]["part"] != "trunk":
            continue
        c = shape(f["geometry"]).centroid
        trees.append([round(c.x, 6), round(c.y, 6), f["properties"]["h"], f["properties"]["cd"]])
    (out / "trees.json").write_text(json.dumps(trees, separators=(",", ":")))
    # squares with statistics
    stats = {p["pid"]: p for p in json.loads((d / "plaza_stats.json").read_text())["plazas"]}
    pl = json.loads((d / "plazas_altstadt_wgs84.geojson").read_text())
    for f in pl["features"]:
        s = stats.get(f["properties"]["pid"], {})
        f["properties"] = {"pid": f["properties"]["pid"], "name": f["properties"]["name"], "area": f["properties"].get("area_m2"),
                           **{k: s.get(k) for k in ("rank", "tmrt_day_mean", "tmrt_peak", "tmrt_peak_time", "utci_day_mean", "utci38_hours_per_day", "sun_share_day", "tree_share", "utci_night_mean")}}
    (out / "plazas.json").write_text(json.dumps(pl, ensure_ascii=False, separators=(",", ":")))
    # hourly Tmrt for the hottest day, halved to 2 m pixels for the web
    hours = list(range(8, 20))
    for h in hours:
        src = d / "frames" / f"tmrt_20260627_{h:02d}.png"
        im = Image.open(src).convert("L")
        im = im.resize((im.width // 2, im.height // 2), Image.NEAREST)
        im.save(out / f"tmrt_{h:02d}.png", optimize=True)
    meta = {"corners": man["corners"], "range": man["ranges"]["tmrt"], "hours": hours, "day": "2026-06-27", "tmax": 40.8,
            "timezone": man.get("timezone", "CET"), "source": man.get("source"), "n_buildings": len(blds), "n_trees": len(trees), "n_squares": len(pl["features"])}
    (out / "meta.json").write_text(json.dumps(meta, separators=(",", ":")))
    print(f"frankfurt: {len(blds)} buildings, {len(trees)} trees, {len(pl['features'])} squares, {len(hours)} hourly rasters")


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--heat", type=Path, default=ROOT.parent / "barisparlatangiller" / "urban-heat-stress---frankfurt-platz")
    a = ap.parse_args()
    OUT.mkdir(parents=True, exist_ok=True)
    w = world(); (OUT / "world.json").write_text(json.dumps(w, separators=(",", ":")))
    s = scene(); (OUT / "scene.json").write_text(json.dumps(s, ensure_ascii=False, separators=(",", ":")))
    print(f"world: {len(w['features'])} countries · scene: {len(s['items'])} items, {len(s['places'])} places")
    if a.heat.exists():
        frankfurt(a.heat)
    else:
        print("heat repository not found, skipping the Frankfurt level")


if __name__ == "__main__":
    main()

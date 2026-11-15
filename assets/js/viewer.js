/* Board viewer — A3 boards are dense, so they open in a map-like viewer:
   wheel / pinch to zoom around the pointer, drag to pan, arrows to step through the folio. */
window.BoardViewer = (function () {
  const dlg = document.getElementById("viewer"), stage = document.getElementById("vwStage"), img = document.getElementById("vwImg");
  const $ = id => document.getElementById(id);
  let list = [], idx = 0, s = 1, x = 0, y = 0, fitS = 1, drag = null;
  const pointers = new Map(); let pinch = null;

  function apply() { img.style.transform = `translate(${x}px,${y}px) scale(${s})`; $("vwZoom").textContent = Math.round(s / fitS * 100) + "%"; }
  function fit() {
    const r = stage.getBoundingClientRect(), w = img.naturalWidth, h = img.naturalHeight; if (!w) return;
    fitS = Math.min(r.width / w, r.height / h) * .94; s = fitS;
    x = (r.width - w * s) / 2; y = (r.height - h * s) / 2; apply();
  }
  function zoomAt(f, cx, cy) {
    const ns = Math.max(fitS * .8, Math.min(fitS * 6, s * f));
    x = cx - (cx - x) * (ns / s); y = cy - (cy - y) * (ns / s); s = ns; apply();
  }
  function show(i) {
    idx = (i + list.length) % list.length; const p = list[idx], L = I18N.L;
    img.onload = fit; img.src = `assets/img/folio/${p.id}-board.webp`; img.alt = L(p.title);
    $("vwMeta").textContent = `${String(idx + 1).padStart(2, "0")} / ${list.length} · ${L(p.place)}`;
    $("vwTitle").textContent = L(p.title); $("vwText").textContent = L(p.text);
  }
  function open(items, i) { list = items; if (!dlg.open) dlg.showModal(); document.body.style.overflow = "hidden"; show(i); }
  function close() { dlg.close(); }
  dlg.addEventListener("close", () => { document.body.style.overflow = ""; });

  stage.addEventListener("wheel", e => { e.preventDefault(); const r = stage.getBoundingClientRect(); zoomAt(Math.exp(-e.deltaY * .0018), e.clientX - r.left, e.clientY - r.top); }, { passive: false });
  stage.addEventListener("pointerdown", e => {
    stage.setPointerCapture(e.pointerId); pointers.set(e.pointerId, [e.clientX, e.clientY]);
    if (pointers.size === 2) { const [a, b] = [...pointers.values()]; pinch = { d: Math.hypot(a[0] - b[0], a[1] - b[1]) }; drag = null; }
    else { drag = { px: e.clientX, py: e.clientY, x, y }; stage.classList.add("drag"); }
  });
  stage.addEventListener("pointermove", e => {
    if (!pointers.has(e.pointerId)) return; pointers.set(e.pointerId, [e.clientX, e.clientY]);
    if (pinch && pointers.size === 2) {
      const [a, b] = [...pointers.values()], d = Math.hypot(a[0] - b[0], a[1] - b[1]), r = stage.getBoundingClientRect();
      zoomAt(d / pinch.d, (a[0] + b[0]) / 2 - r.left, (a[1] + b[1]) / 2 - r.top); pinch.d = d;
    } else if (drag) { x = drag.x + e.clientX - drag.px; y = drag.y + e.clientY - drag.py; apply(); }
  });
  const up = e => { pointers.delete(e.pointerId); if (pointers.size < 2) pinch = null; if (!pointers.size) { drag = null; stage.classList.remove("drag"); } };
  stage.addEventListener("pointerup", up); stage.addEventListener("pointercancel", up);
  stage.addEventListener("dblclick", e => { const r = stage.getBoundingClientRect(); zoomAt(2, e.clientX - r.left, e.clientY - r.top); });
  $("vwPrev").onclick = () => show(idx - 1); $("vwNext").onclick = () => show(idx + 1);
  $("vwFit").onclick = fit; $("vwClose").onclick = close;
  dlg.addEventListener("keydown", e => { if (e.key === "ArrowRight") show(idx + 1); if (e.key === "ArrowLeft") show(idx - 1); if (e.key === "+" || e.key === "=") { const r = stage.getBoundingClientRect(); zoomAt(1.4, r.width / 2, r.height / 2); } if (e.key === "-") { const r = stage.getBoundingClientRect(); zoomAt(1 / 1.4, r.width / 2, r.height / 2); } });
  addEventListener("resize", () => { if (dlg.open) fit(); });
  I18N.onChange(() => { if (dlg.open) show(idx); });
  return { open };
})();

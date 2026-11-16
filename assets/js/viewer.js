/* Board viewer. A3 boards are dense, so they open like a map: wheel or pinch to zoom around
   the pointer, drag to pan. A guided tour flies from the whole board to three details and
   explains each one, which is how a reader gets from the big picture to the substance.
   Every board has its own link (#project-id, #project-id/2) so a single project can be shared. */
window.BoardViewer = (function () {
  const dlg = document.getElementById("viewer"), stage = document.getElementById("vwStage"), img = document.getElementById("vwImg");
  const $ = id => document.getElementById(id);
  let list = [], idx = 0, s = 1, x = 0, y = 0, fitS = 1, drag = null, stop = 0, pendingStop = 0;
  const pointers = new Map(); let pinch = null;

  const tour = () => (window.TOURS && TOURS[list[idx]?.id]) || [];
  function apply() { img.style.transform = `translate(${x}px,${y}px) scale(${s})`; $("vwZoom").textContent = Math.round(s / fitS * 100) + "%"; }
  function still() { img.classList.remove("fly"); }
  function fitRect(r0, pad = .06, fly = true) {
    const r = stage.getBoundingClientRect(), w = img.naturalWidth, h = img.naturalHeight; if (!w) return;
    const rw = (r0[2] - r0[0]) * w, rh = (r0[3] - r0[1]) * h;
    const ns = Math.min(r.width / rw, r.height / rh) * (1 - pad * 2);
    const cx = (r0[0] + r0[2]) / 2 * w, cy = (r0[1] + r0[3]) / 2 * h;
    img.classList.toggle("fly", fly);
    s = ns; x = r.width / 2 - cx * s; y = r.height / 2 - cy * s; apply();
  }
  function fit(fly = false) {
    const r = stage.getBoundingClientRect(), w = img.naturalWidth, h = img.naturalHeight; if (!w) return;
    fitS = Math.min(r.width / w, r.height / h) * .94; fitRect([0, 0, 1, 1], .03, fly);
  }
  function zoomAt(f, cx, cy) {
    still(); const ns = Math.max(fitS * .8, Math.min(fitS * 7, s * f));
    x = cx - (cx - x) * (ns / s); y = cy - (cy - y) * (ns / s); s = ns; apply();
  }

  function renderStops() {
    const T = I18N.T, L = I18N.L, st = tour();
    $("vwStops").innerHTML = [`<li><button data-s="0" aria-current="${stop === 0}"><span>00</span>${T("vw.whole")}</button></li>`]
      .concat(st.map((p, i) => `<li><button data-s="${i + 1}" aria-current="${stop === i + 1}"><span>${String(i + 1).padStart(2, "0")}</span>${L(p)}</button></li>`)).join("");
    $("vwStep").textContent = stop === 0 ? T("vw.start") : stop < st.length ? T("vw.next") : T("vw.again");
    $("vwStep").style.display = st.length ? "" : "none";
  }
  function goStop(n) {
    const st = tour(); stop = Math.max(0, Math.min(st.length, n));
    const cap = $("vwCap");
    if (stop === 0) { fit(true); cap.classList.remove("on"); }
    else { fitRect(st[stop - 1].r, .05, true); cap.innerHTML = `<b>${String(stop).padStart(2, "0")}</b>${I18N.L(st[stop - 1])}`; cap.classList.add("on"); }
    renderStops(); setHash();
  }
  function setHash() { const id = list[idx]?.id; if (!id) return; history.replaceState(null, "", "#" + id + (stop ? "/" + stop : "")); }

  function show(i, startStop = 0) {
    idx = (i + list.length) % list.length; const p = list[idx], L = I18N.L;
    stop = 0; pendingStop = startStop; $("vwCap").classList.remove("on");
    img.onload = () => { fit(false); if (pendingStop) setTimeout(() => goStop(pendingStop), 350); };
    img.src = `${window.ASSET_BASE || ""}assets/img/folio/${p.id}-board.webp`; img.alt = L(p.title);
    $("vwMeta").textContent = `${String(idx + 1).padStart(2, "0")} / ${list.length} · ${L(p.place)}`;
    $("vwTitle").textContent = L(p.title); $("vwText").textContent = L(p.text);
    renderStops(); setHash();
  }
  function open(items, i, startStop = 0) { list = items; if (!dlg.open) dlg.showModal(); document.body.style.overflow = "hidden"; show(i, startStop); }
  function close() { dlg.close(); }
  dlg.addEventListener("close", () => { document.body.style.overflow = ""; history.replaceState(null, "", location.pathname + location.search); });

  stage.addEventListener("wheel", e => { e.preventDefault(); const r = stage.getBoundingClientRect(); zoomAt(Math.exp(-e.deltaY * .0018), e.clientX - r.left, e.clientY - r.top); }, { passive: false });
  stage.addEventListener("pointerdown", e => {
    still(); stage.setPointerCapture(e.pointerId); pointers.set(e.pointerId, [e.clientX, e.clientY]);
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

  $("vwStops").addEventListener("click", e => { const b = e.target.closest("[data-s]"); if (b) goStop(+b.dataset.s); });
  $("vwStep").onclick = () => goStop(stop >= tour().length ? 0 : stop + 1);
  $("vwPrev").onclick = () => show(idx - 1); $("vwNext").onclick = () => show(idx + 1);
  $("vwFit").onclick = () => goStop(0); $("vwClose").onclick = close;
  dlg.addEventListener("keydown", e => {
    if (e.key === "ArrowRight") show(idx + 1); if (e.key === "ArrowLeft") show(idx - 1);
    if (e.key === " " || e.key === "Enter") { if (e.target === document.body || e.target === dlg || e.target === stage) { e.preventDefault(); $("vwStep").click(); } }
    if (e.key === "ArrowDown") { e.preventDefault(); goStop(stop + 1); } if (e.key === "ArrowUp") { e.preventDefault(); goStop(stop - 1); }
    const r = stage.getBoundingClientRect();
    if (e.key === "+" || e.key === "=") zoomAt(1.4, r.width / 2, r.height / 2);
    if (e.key === "-") zoomAt(1 / 1.4, r.width / 2, r.height / 2);
  });
  addEventListener("resize", () => { if (dlg.open) stop ? goStop(stop) : fit(); });
  I18N.onChange(() => { if (dlg.open) { const p = list[idx]; $("vwTitle").textContent = I18N.L(p.title); $("vwText").textContent = I18N.L(p.text); $("vwMeta").textContent = `${String(idx + 1).padStart(2, "0")} / ${list.length} · ${I18N.L(p.place)}`; goStop(stop); } });
  return { open };
})();

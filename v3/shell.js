/* Injects the shared board viewer markup (used by assets/js/viewer.js) into every v3 page. */
document.body.insertAdjacentHTML("beforeend", `
<dialog class="viewer" id="viewer" aria-label="Project board">
  <div class="vw-stage" id="vwStage"><img id="vwImg" alt="" draggable="false"><p class="vw-cap" id="vwCap" aria-live="polite"></p></div>
  <aside class="vw-side">
    <p class="mono" id="vwMeta"></p><h3 id="vwTitle"></h3><p id="vwText"></p>
    <div class="vw-tour"><p class="mono" data-i18n="vw.tour"></p><ol id="vwStops"></ol><button class="vbtn vbtn-solid" id="vwStep"></button></div>
    <div class="vw-ctl"><button class="vbtn" id="vwPrev" aria-label="Previous">←</button><button class="vbtn" id="vwNext" aria-label="Next">→</button><button class="vbtn" id="vwFit" data-i18n="vw.fit"></button><button class="vbtn" id="vwClose" data-i18n="vw.close"></button></div>
    <p class="mono vw-hint" data-i18n="vw.hint"></p><div class="vw-scale mono"><i></i><span id="vwZoom">100%</span></div>
  </aside>
</dialog>`);
window.ASSET_BASE = "../";

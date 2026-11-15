/* Solar position for Frankfurt am Main, computed in the browser (NOAA approximation).
   Used by the hero: the shade your cursor casts falls in the real direction of today's sun. */
window.Sun = (function () {
  const LAT = 50.1109, LON = 8.6821, rad = Math.PI / 180;
  function position(date = new Date()) {
    const jd = date.getTime() / 86400000 + 2440587.5, n = jd - 2451545.0;
    const L = (280.46 + 0.9856474 * n) % 360, g = ((357.528 + 0.9856003 * n) % 360) * rad;
    const lambda = (L + 1.915 * Math.sin(g) + 0.02 * Math.sin(2 * g)) * rad;
    const eps = (23.439 - 0.0000004 * n) * rad;
    const dec = Math.asin(Math.sin(eps) * Math.sin(lambda));
    const ra = Math.atan2(Math.cos(eps) * Math.sin(lambda), Math.cos(lambda));
    const gmst = (18.697374558 + 24.06570982441908 * n) % 24;
    const ha = ((gmst * 15 + LON) * rad - ra);
    const lat = LAT * rad;
    const alt = Math.asin(Math.sin(lat) * Math.sin(dec) + Math.cos(lat) * Math.cos(dec) * Math.cos(ha));
    let az = Math.atan2(-Math.sin(ha), Math.tan(dec) * Math.cos(lat) - Math.sin(lat) * Math.cos(ha));
    az = (az / rad + 360) % 360; // degrees from north, clockwise
    return { alt: alt / rad, az };
  }
  function frankfurtTime(date = new Date()) {
    return date.toLocaleTimeString("de-DE", { timeZone: "Europe/Berlin", hour: "2-digit", minute: "2-digit" });
  }
  return { position, frankfurtTime };
})();

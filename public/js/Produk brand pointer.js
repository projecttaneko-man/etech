(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    var grid = document.getElementById('brandGrid');
    var divider = document.getElementById('brandDivider');
    var spotlightSection = document.getElementById('spotlight');
    var glow = document.getElementById('spotlightGlow');

    if (!grid || !divider) return;

    var tiles = Array.prototype.slice.call(grid.querySelectorAll('.brand-tile'));
    var panels = spotlightSection
      ? Array.prototype.slice.call(spotlightSection.querySelectorAll('.spot-panel'))
      : [];

    // Batas puncak segitiga agar tidak mepet tepi kiri/kanan
    var PEAK_MIN_PCT = 4;
    var PEAK_MAX_PCT = 96;

    // Klik kartu: set state akhir yang konsisten (panel id harus "spot-" + data-brand)
    grid.addEventListener('click', function (e) {
      var tile = e.target.closest ? e.target.closest('.brand-tile') : null;
      if (!tile || !grid.contains(tile)) return;
      setActiveTile(tile);
    });

    function setActiveTile(tile) {
      tiles.forEach(function (t) {
        var isActive = t === tile;
        t.classList.toggle('active', isActive);
        t.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      });

      var key = tile.getAttribute('data-brand');
      if (key && panels.length) {
        panels.forEach(function (p) {
          p.classList.toggle('active', p.id === 'spot-' + key);
        });
      }

      positionArrow();
    }

    // Ikuti perubahan class "active" dari sumber lain
    var observer = new MutationObserver(function () {
      positionArrow();
    });
    tiles.forEach(function (t) {
      observer.observe(t, { attributes: true, attributeFilter: ['class'] });
    });

    // Hitung ulang saat resize (di-debounce) dan load (gambar bisa mengubah layout)
    var resizeTimer = null;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(positionArrow, 100);
    });
    window.addEventListener('load', positionArrow);

    function buildClipPath(peakPct) {
      return 'polygon(0% 100%, ' + peakPct.toFixed(2) + '% 0%, 100% 100%)';
    }

    function positionArrow() {
      var active = grid.querySelector('.brand-tile.active') || tiles[0];
      if (!active) return;

      var tileRect = active.getBoundingClientRect();
      var tileCenterX = tileRect.left + tileRect.width / 2;

      var dividerRect = divider.getBoundingClientRect();
      if (dividerRect.width > 0) {
        var peakPct = ((tileCenterX - dividerRect.left) / dividerRect.width) * 100;
        peakPct = Math.max(PEAK_MIN_PCT, Math.min(PEAK_MAX_PCT, peakPct));
        var clip = buildClipPath(peakPct);
        divider.style.clipPath = clip;
        divider.style.webkitClipPath = clip;
      }

      if (glow && spotlightSection) {
        var secRect = spotlightSection.getBoundingClientRect();
        glow.style.left = (tileCenterX - secRect.left) + 'px';
      }
    }

   positionArrow();
    requestAnimationFrame(positionArrow);
    setTimeout(positionArrow, 300);
  }
})();
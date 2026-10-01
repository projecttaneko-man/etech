(function () {
  var svg =
    '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400">' +
    '<defs><pattern id="ph-stripes" width="26" height="26" patternTransform="rotate(115)" patternUnits="userSpaceOnUse">' +
    '<rect width="26" height="26" fill="#FDF8F3"/>' +
    '<rect width="10" height="26" fill="#ECE0D3"/>' +
    '</pattern></defs>' +
    '<rect width="600" height="400" fill="url(#ph-stripes)"/>' +
    '<rect x="1" y="1" width="598" height="398" fill="none" stroke="#D9C8B4" stroke-width="2"/>' +
    '<text x="300" y="200" font-family="monospace" font-size="13" fill="#8A7A6E" text-anchor="middle">FOTO PRODUK</text>' +
    '</svg>';
  var fallback = 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);

  function applyFallback(img) {
    if (img.src === fallback) return;
    img.src = fallback;
    img.alt = 'Foto (placeholder)';
  }

  document.querySelectorAll('img').forEach(function (img) {
    img.addEventListener('error', function () {
      applyFallback(img);
    });
    if (img.complete && img.naturalWidth === 0) applyFallback(img);
  });
})();

(function () {
  var track = document.getElementById('proyekTrack');
  var progressBar = document.getElementById('proyekProgressBar');
  if (!track) return;

  var SPEED = 0.6;
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isPaused = false;
  var loopWidth = 0;

  var originalCards = Array.prototype.slice.call(track.children);
  originalCards.forEach(function (card) {
    var clone = card.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    clone.setAttribute('tabindex', '-1');
    track.appendChild(clone);
  });

  function trackGap() {
    var trackStyle = getComputedStyle(track);
    return parseFloat(trackStyle.columnGap || trackStyle.gap || 20) || 20;
  }

  function computeLoopWidth() {
    if (!originalCards.length) return 0;
    var first = originalCards[0];
    var lastOriginal = originalCards[originalCards.length - 1];
    return (lastOriginal.offsetLeft + lastOriginal.offsetWidth + trackGap()) - first.offsetLeft;
  }

  function recalc() {
    loopWidth = computeLoopWidth();
  }

  function updateProgress() {
    if (!progressBar || !loopWidth) return;
    var pct = ((track.scrollLeft % loopWidth) / loopWidth) * 100;
    progressBar.style.width = pct + '%';
  }

  function tick() {
    if (!isPaused && !reduceMotion && loopWidth > 0) {
      track.scrollLeft += SPEED;
      if (track.scrollLeft >= loopWidth) track.scrollLeft -= loopWidth;
      updateProgress();
    }
    requestAnimationFrame(tick);
  }

  function pause() { isPaused = true; }
  function resume() { isPaused = false; }

  track.addEventListener('mouseenter', pause);
  track.addEventListener('mouseleave', resume);
  track.addEventListener('touchstart', pause, { passive: true });
  track.addEventListener('touchend', function () { setTimeout(resume, 1500); }, { passive: true });
  track.addEventListener('focusin', pause);
  track.addEventListener('focusout', resume);
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) pause(); else resume();
  });

  window.addEventListener('resize', recalc);
  window.addEventListener('load', recalc);
  track.querySelectorAll('img').forEach(function (img) {
    img.addEventListener('load', recalc);
  });

  recalc();
  requestAnimationFrame(tick);
})();

document.addEventListener('DOMContentLoaded', function () {

  var revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealEls.length) {
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  var autoRevealSelectors = [
    '.service-card', '.reason-card', '.value-card', '.team-card',
    '.cat-card', '.portfolio-card', '.product-simple', '.service-item',
    '.cert-item', '.info-feature', '.stage-block', '.stage-service',
    '.warranty-item', '.proyek-card',
    '.reason-item', '.tipe-point'
  ];
  document.querySelectorAll(autoRevealSelectors.join(',')).forEach(function (el, i) {
    if (!el.classList.contains('reveal')) {
      el.classList.add('reveal');
      el.style.transitionDelay = (Math.min(i % 4, 3) * 0.08) + 's';
      if ('IntersectionObserver' in window) {
        var observerAuto = new IntersectionObserver(function (entries, observer) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
        observerAuto.observe(el);
      } else {
        el.classList.add('is-visible');
      }
    }
  });

  var navbar = document.querySelector('nav.main');
  if (navbar) {
    var handleNavScroll = function () {
      if (window.scrollY > 10) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    handleNavScroll();
    window.addEventListener('scroll', handleNavScroll, { passive: true });
  }

  var navToggle = document.querySelector('.navbar-toggle');
  var navList = document.querySelector('nav.main ul');

  if (navToggle && navList) {
    navToggle.addEventListener('click', function () {
      navList.classList.toggle('is-open');
      navToggle.classList.toggle('is-active');
      navToggle.setAttribute(
        'aria-expanded',
        navList.classList.contains('is-open') ? 'true' : 'false'
      );
    });

    navList.querySelectorAll('a.navlink').forEach(function (link) {
      link.addEventListener('click', function () {
        navList.classList.remove('is-open');
        navToggle.classList.remove('is-active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  var parallaxEls = document.querySelectorAll('[data-parallax]');
  if (parallaxEls.length) {
    var updateParallax = function () {
      parallaxEls.forEach(function (el) {
        var media = el.querySelector('.hero-media img, .page-hero-media img');
        if (!media) return;
        var rect = el.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < window.innerHeight) {
          var offset = rect.top * 0.15;
          media.style.transform = 'translateY(' + offset + 'px) scale(1.08)';
        }
      });
    };
    updateParallax();
    window.addEventListener('scroll', updateParallax, { passive: true });
    window.addEventListener('resize', updateParallax);
  }

});

(function () {
  'use strict';

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function onMediaChange(mq, handler) {
    if (mq.addEventListener) mq.addEventListener('change', handler);
    else if (mq.addListener) mq.addListener(handler);
  }

  function initProsesHighlight() {
    var wrap = document.querySelector('.proses-steps');
    if (!wrap) return;
    var cards = Array.prototype.slice.call(wrap.querySelectorAll('.proses-card'));
    if (cards.length < 2) return;

    var INTERVAL = 3200;
    var isWide = window.matchMedia('(min-width: 901px)');
    var current = -1;
    var timer = null;
    var inView = false;
    var interacting = false;
    var centerObserver = null;

    function setActive(i) {
      if (i === current) return;
      current = i;
      cards.forEach(function (card, j) {
        card.classList.toggle('is-dark', j === i);
      });
    }

    function stop() {
      if (timer) { clearInterval(timer); timer = null; }
    }

    function start() {
      if (timer || reduceMotion || !isWide.matches || !inView || interacting || document.hidden) return;
      if (current < 0) setActive(0);
      timer = setInterval(function () {
        setActive((current + 1) % cards.length);
      }, INTERVAL);
    }

    cards.forEach(function (card, i) {
      card.addEventListener('mouseenter', function () {
        interacting = true; stop(); setActive(i);
      });
      card.addEventListener('focusin', function () {
        interacting = true; stop(); setActive(i);
      });
    });
    wrap.addEventListener('mouseleave', function () {
      interacting = false; start();
    });
    wrap.addEventListener('focusout', function (e) {
      if (!wrap.contains(e.relatedTarget)) { interacting = false; start(); }
    });

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        inView = entries[0].isIntersecting;
        if (inView) start(); else stop();
      }, { threshold: 0.35 }).observe(wrap);
    }
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stop(); else start();
    });

    function bindCenter() {
      if (centerObserver || !('IntersectionObserver' in window)) return;
      centerObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) setActive(cards.indexOf(entry.target));
        });
      }, { rootMargin: '-45% 0px -45% 0px' });
      cards.forEach(function (card) { centerObserver.observe(card); });
    }
    function unbindCenter() {
      if (centerObserver) { centerObserver.disconnect(); centerObserver = null; }
    }

    function applyMode() {
      if (isWide.matches) { unbindCenter(); start(); }
      else { stop(); bindCenter(); }
    }
    onMediaChange(isWide, applyMode);
    applyMode();
  }

  function initFaq() {
    var items = document.querySelectorAll('.faq-list details.faq-item');
    if (!items.length) return;
    if ('HTMLDetailsElement' in window && 'name' in HTMLDetailsElement.prototype) return;

    items.forEach(function (item) {
      item.addEventListener('toggle', function () {
        if (!item.open) return;
        items.forEach(function (other) {
          if (other !== item) other.open = false;
        });
      });
    });
  }

  function initReveal() {
    if (reduceMotion || !('IntersectionObserver' in window) || !Element.prototype.animate) return;

    var targets = document.querySelectorAll([
      '.proses-col-text', '.proses-card',
      '.produk-head', '.produk-card',
      '.berjalan-head', '.berjalan-card',
      '.faq-intro', '.faq-item'
    ].join(','));
    if (!targets.length) return;

    var vh = window.innerHeight || document.documentElement.clientHeight;
    var pending = [];

    targets.forEach(function (el) {
      if (el.getBoundingClientRect().top < vh * 0.9) return;
      el.style.opacity = '0';
      pending.push(el);
    });
    if (!pending.length) return;

    var observer = new IntersectionObserver(function (entries) {
      var batch = 0;
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        observer.unobserve(el);
        el.animate(
          [
            { opacity: 0, transform: 'translateY(24px)' },
            { opacity: 1, transform: 'translateY(0)' }
          ],
          { duration: 600, delay: Math.min(batch, 4) * 90, easing: 'cubic-bezier(.22,.61,.36,1)', fill: 'backwards' }
        );
        el.style.opacity = '';
        batch++;
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    pending.forEach(function (el) { observer.observe(el); });
  }

  function init() {
    initProsesHighlight();
    initFaq();
    initReveal();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();

(function () {
  'use strict';
  var root = document.querySelector('[data-hero-slider]');
  if (!root) return;
  var slides = root.querySelectorAll('.hh-slide');
  if (slides.length < 2) return;

  var dashes = root.querySelectorAll('.hh-dash');
  var counter = root.querySelector('[data-hh-current]');
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var INTERVAL = 6000;
  var current = 0;
  var timer = null;

  function show(i) {
    current = (i + slides.length) % slides.length;
    slides.forEach(function (s, j) { s.classList.toggle('is-active', j === current); });
    dashes.forEach(function (d, j) { d.classList.toggle('is-active', j === current); });
    if (counter) counter.textContent = String(current + 1).padStart(2, '0');
  }
  function stop() { if (timer) { clearInterval(timer); timer = null; } }
  function start() {
    if (timer || reduceMotion || document.hidden) return;
    timer = setInterval(function () { show(current + 1); }, INTERVAL);
  }

  dashes.forEach(function (dash, i) {
    dash.addEventListener('click', function () { show(i); stop(); start(); });
  });
  root.addEventListener('mouseenter', stop);
  root.addEventListener('mouseleave', start);
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) stop(); else start();
  });
  start();
})();

(function () {
  'use strict';

  var reduceMotionHome = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isTouchHome = window.matchMedia &&
    window.matchMedia('(hover: none), (pointer: coarse)').matches;

  function initRotateText() {
    var els = document.querySelectorAll('[data-rotate-text]');
    if (!els.length) return;

    els.forEach(function (el) {
      var raw = el.getAttribute('data-rotate-words') || '';
      var words = raw.split(',').map(function (w) { return w.trim(); }).filter(Boolean);
      if (words.length < 2) return;

      var interval = parseInt(el.getAttribute('data-rotate-interval'), 10) || 2600;
      var i = 0;
      el.textContent = words[0];

      if (reduceMotionHome) return;

      setInterval(function () {
        el.classList.add('is-swapping');
        setTimeout(function () {
          i = (i + 1) % words.length;
          el.textContent = words[i];
          el.classList.remove('is-swapping');
        }, 260);
      }, interval);
    });
  }

  function initCounters() {
    var counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    function animateCounter(el) {
      var toRaw = el.getAttribute('data-counter-to') || '0';
      var to = parseFloat(toRaw);
      var suffix = el.getAttribute('data-counter-suffix') || '';
      var decimals = (toRaw.split('.')[1] || '').length;
      var duration = parseInt(el.getAttribute('data-counter-duration'), 10) || 1600;

      if (reduceMotionHome) {
        el.textContent = to.toFixed(decimals) + suffix;
        return;
      }

      var start = null;
      function step(timestamp) {
        if (!start) start = timestamp;
        var progress = Math.min((timestamp - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = (eased * to).toFixed(decimals) + suffix;
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    if ('IntersectionObserver' in window) {
      var counterObserver = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      counters.forEach(function (el) { counterObserver.observe(el); });
    } else {
      counters.forEach(animateCounter);
    }
  }

  function initMarquee() {
    var wraps = document.querySelectorAll('[data-marquee]');
    if (!wraps.length) return;

    wraps.forEach(function (wrap) {
      var track = wrap.querySelector('[data-marquee-track]');
      if (!track || !track.children.length) return;

      var speed = parseFloat(wrap.getAttribute('data-marquee-speed')) || 0.5;
      var originalItems = Array.prototype.slice.call(track.children);

      originalItems.forEach(function (item) {
        var clone = item.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        clone.setAttribute('tabindex', '-1');
        track.appendChild(clone);
      });

      var isPaused = false;
      var loopWidth = 0;

      function trackGap() {
        var s = getComputedStyle(track);
        return parseFloat(s.columnGap || s.gap || 24) || 24;
      }
      function computeLoopWidth() {
        var first = originalItems[0];
        var last = originalItems[originalItems.length - 1];
        return (last.offsetLeft + last.offsetWidth + trackGap()) - first.offsetLeft;
      }
      function recalc() {
        loopWidth = computeLoopWidth();
      }
      function tick() {
        if (!isPaused && !reduceMotionHome && loopWidth > 0) {
          wrap.scrollLeft += speed;
          if (wrap.scrollLeft >= loopWidth) wrap.scrollLeft -= loopWidth;
        }
        requestAnimationFrame(tick);
      }

      wrap.addEventListener('mouseenter', function () { isPaused = true; });
      wrap.addEventListener('mouseleave', function () { isPaused = false; });
      wrap.addEventListener('touchstart', function () { isPaused = true; }, { passive: true });
      wrap.addEventListener('touchend', function () {
        setTimeout(function () { isPaused = false; }, 1500);
      }, { passive: true });
      document.addEventListener('visibilitychange', function () {
        isPaused = document.hidden;
      });
      window.addEventListener('resize', recalc);
      window.addEventListener('load', recalc);
      track.querySelectorAll('img').forEach(function (img) {
        img.addEventListener('load', recalc);
      });

      recalc();
      requestAnimationFrame(tick);
    });
  }

  function initMagneticButtons() {
    if (reduceMotionHome || isTouchHome) return;
    var buttons = document.querySelectorAll('[data-magnetic]');
    if (!buttons.length) return;

    var STRENGTH = 0.25;

    buttons.forEach(function (btn) {
      btn.addEventListener('mousemove', function (e) {
        var rect = btn.getBoundingClientRect();
        var x = e.clientX - rect.left - rect.width / 2;
        var y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = 'translate(' + (x * STRENGTH) + 'px, ' + (y * STRENGTH) + 'px)';
      });
      btn.addEventListener('mouseleave', function () {
        btn.style.transform = 'translate(0, 0)';
      });
    });
  }

  function initHeroGlow() {
    if (isTouchHome) return;
    var heroes = document.querySelectorAll('[data-hero-glow]');
    if (!heroes.length) return;

    heroes.forEach(function (hero) {
      hero.addEventListener('mousemove', function (e) {
        var rect = hero.getBoundingClientRect();
        var x = ((e.clientX - rect.left) / rect.width) * 100;
        var y = ((e.clientY - rect.top) / rect.height) * 100;
        hero.style.setProperty('--glow-x', x + '%');
        hero.style.setProperty('--glow-y', y + '%');
      });
    });
  }

  function initHome() {
    initRotateText();
    initCounters();
    initMarquee();
    initMagneticButtons();
    initHeroGlow();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initHome);
  else initHome();
})();

(function () {
  'use strict';

  var reduceMotionSite = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initRipple() {
    if (reduceMotionSite || !Element.prototype.animate) return;
    var buttons = document.querySelectorAll('.btn, .hh-btn');
    if (!buttons.length) return;

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        var rect = btn.getBoundingClientRect();
        var size = Math.max(rect.width, rect.height) * 1.8;
        var x = (e.clientX !== undefined ? e.clientX - rect.left : rect.width / 2) - size / 2;
        var y = (e.clientY !== undefined ? e.clientY - rect.top : rect.height / 2) - size / 2;

        var ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.width = size + 'px';
        ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        btn.appendChild(ripple);

        var anim = ripple.animate(
          [
            { transform: 'scale(0)', opacity: 0.55 },
            { transform: 'scale(1)', opacity: 0 }
          ],
          { duration: 550, easing: 'ease-out' }
        );
        anim.onfinish = function () { ripple.remove(); };
      });
    });
  }

  function initScrollProgress() {
    var bar = document.createElement('div');
    bar.className = 'scroll-progress';
    bar.setAttribute('aria-hidden', 'true');
    document.body.appendChild(bar);

    function update() {
      var scrollTop = window.scrollY || document.documentElement.scrollTop;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = pct + '%';
    }

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
  }

  function initSitewide() {
    initRipple();
    initScrollProgress();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initSitewide);
  else initSitewide();
})();
(function () {
  var COOKIE = 'googtrans';

  function getLang() {
    var m = document.cookie.match(/(?:^|;\s*)googtrans=\/id\/([a-z]+)/);
    return m && m[1] === 'en' ? 'en' : 'id';
  }

  function setCookie(value, days) {
    var exp = new Date(Date.now() + days * 864e5).toUTCString();
    var base = COOKIE + '=' + value + '; expires=' + exp + '; path=/';
    document.cookie = base;
    if (location.hostname.indexOf('.') > -1) {
      document.cookie = base + '; domain=.' + location.hostname.replace(/^www\./, '');
    }
  }

  function setLang(code) {
    if (code === getLang()) return;
    if (code === 'en') setCookie('/id/en', 365);
    else setCookie('/id/id', -1); 
    location.reload();
  }

  function markActive() {
    var current = getLang();
    document.querySelectorAll('.lang-switch__item').forEach(function (btn) {
      var active = btn.dataset.lang === current;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', active);
      btn.addEventListener('click', function () { setLang(btn.dataset.lang); });
    });
  }
  
  window.googleTranslateElementInit = function () {
    new google.translate.TranslateElement(
      { pageLanguage: 'id', includedLanguages: 'en', autoDisplay: false },
      'google_translate_element'
    );
  };

  document.addEventListener('DOMContentLoaded', function () {
    markActive();
    if (getLang() === 'en') {
      var s = document.createElement('script');
      s.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      s.async = true;
      document.body.appendChild(s);
    }
  });
})();
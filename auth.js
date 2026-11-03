/* auth.js - پاراستنی پەڕەکان: دەرچوون بە داخستنی براوزەر + دوای ١٠ خولەک بێ چالاکی */
(function () {
  var TIMEOUT_MS = 10 * 60 * 1000;   // 10 خولەک
  var LOGIN_PAGE = 'index.html';
  var S = window.sessionStorage;     // بە داخستنی تاب/براوزەر خۆی دەسڕێتەوە

  function clearSession() {
    try {
      S.removeItem('isLoggedIn');
      S.removeItem('currentUser');
      S.removeItem('lastActivity');
      localStorage.removeItem('isLoggedIn');   // پاشماوەی وەشانی کۆن
      localStorage.removeItem('currentUser');
    } catch (e) {}
  }

  function logout() {
    clearSession();
    window.location.replace(LOGIN_PAGE);
  }
  window.appLogout = logout;

  function expired() {
    var last = parseInt(S.getItem('lastActivity') || '0', 10);
    return !last || (Date.now() - last) > TIMEOUT_MS;
  }

  function check() {
    if (S.getItem('isLoggedIn') !== 'true' || expired()) logout();
  }

  // پشکنینی سەرەتا
  check();

  // تۆمارکردنی چالاکی (هەر ٥ چرکە جارێک زیاتر نانووسێت)
  var lastWrite = 0;
  function touch() {
    var now = Date.now();
    if (now - lastWrite > 5000) {
      lastWrite = now;
      try { S.setItem('lastActivity', String(now)); } catch (e) {}
    }
  }
  ['mousemove', 'mousedown', 'keydown', 'click', 'scroll', 'touchstart', 'wheel', 'input']
    .forEach(function (ev) {
      window.addEventListener(ev, touch, { passive: true, capture: true });
    });
  touch();

  // پشکنینی خولی
  setInterval(check, 5000);
  document.addEventListener('visibilitychange', function () {
    if (!document.hidden) check();
  });
  // دوگمەی Back (پەڕەی کاشکراو)
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) check();
  });
})();

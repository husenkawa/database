/* theme.js - لایت/دارک مۆد لە main.html ەوە وەردەگرێت (بێ دوگمە لە پەڕەکانی تر) */
(function () {
  var root = document.documentElement;
  function apply() {
    var dark = false;
    try { dark = localStorage.getItem('theme') === 'dark'; } catch (e) {}
    root.classList.toggle('app-dark', dark);
  }
  apply();

  var css =
    '@media screen{' +
    'html.app-dark{background:#fff;filter:invert(1) hue-rotate(180deg) contrast(.9);}' +
    'html.app-dark body,html.app-dark .dashboard-bg{background:linear-gradient(135deg,#ffffff 0%,#ebf4ff 50%,#d6e2f6 100%) !important;}' +
    'html.app-dark img:not(#hotelLogo),html.app-dark video,html.app-dark canvas{filter:invert(1) hue-rotate(180deg);}' +
    '}' +
    '@media print{html.app-dark,html.app-dark img{filter:none !important;}}';
  var st = document.createElement('style');
  st.id = 'theme-dark-style';
  st.appendChild(document.createTextNode(css));
  (document.head || root).appendChild(st);

  // ئەگەر لە تابێکی تر مۆدەکە گۆڕدرا
  window.addEventListener('storage', function (e) { if (e.key === 'theme') apply(); });
  window.addEventListener('pageshow', apply);
})();

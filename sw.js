/* Admin Chlorophylle Night – fonctionnement hors ligne.
   Avec réseau : on prend la dernière version publiée (et on la garde en cache).
   Sans réseau : on sert la version en cache.
   Les appels à GitHub (api.github.com) ne passent jamais par ce cache. */
// Préfixe propre à CETTE app : les caisses partagent l'adresse scraper147.github.io,
// il ne faut jamais toucher à leurs caches.
var PREFIX = 'admin-chlorophylle-';
var CACHE = PREFIX + 'v1';
var FILES = ['./', './index.html', './manifest.webmanifest',
  './icons/icon-192.png', './icons/icon-512.png', './icons/icon-maskable-512.png', './icons/apple-touch-icon.png'];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(FILES); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k.indexOf(PREFIX) === 0 && k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(new Promise(function (resolve) {
    var done = false;
    function fromCache() {
      if (done) return; done = true;
      caches.match(e.request, { ignoreSearch: true }).then(function (r) {
        resolve(r || caches.match('./index.html'));
      });
    }
    var timer = setTimeout(fromCache, 3000); // réseau trop lent : on n'attend pas
    fetch(e.request).then(function (res) {
      if (res && res.ok) { var copy = res.clone(), u = new URL(e.request.url); caches.open(CACHE).then(function (c) { c.put(u.origin + u.pathname, copy); }); }
      clearTimeout(timer);
      if (!done) { done = true; resolve(res); }
    }).catch(function () { clearTimeout(timer); fromCache(); });
  }));
});

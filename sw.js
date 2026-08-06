// Movement service worker — offline-first so your coach works on any trail,
// in any basement gym, on any airplane.

const VERSION = 'movement-v1.1.0';

const CORE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './css/app.css',
  './js/app.js',
  './js/store.js',
  './js/audio.js',
  './js/ui.js',
  './js/data/activities.js',
  './js/data/sessions.js',
  './js/data/learn.js',
  './js/data/sparks.js',
  './js/views/today.js',
  './js/views/move.js',
  './js/views/player.js',
  './js/views/learn.js',
  './js/views/together.js',
  './js/views/plan.js',
  './js/views/you.js',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(VERSION).then(c => c.addAll(CORE)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Cache-first with background refresh (stale-while-revalidate) for same-origin GETs.
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;

  e.respondWith(
    caches.match(e.request).then(cached => {
      const fresh = fetch(e.request)
        .then(res => {
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(VERSION).then(c => c.put(e.request, copy));
          }
          return res;
        })
        .catch(() => cached);
      return cached || fresh;
    })
  );
});

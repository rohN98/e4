// Minimal service worker with precache + runtime caching
// Place at /e4/service-worker.js so its scope is /e4/
const CACHE_NAME = 'e4-cache-v1';
const PRECACHE_URLS = [
  '/e4/',
  '/e4/index.html',
  '/e4/manifest.webmanifest',
  '/e4/assets/icons/icon-192.png',
  '/e4/assets/icons/icon-512.png'
  // Add other core assets you want cached (css, js, images)
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_URLS))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  // Use cache-first for navigation and precached assets, network-first for others
  const req = event.request;
  if (req.mode === 'navigate' || req.method === 'GET') {
    event.respondWith(
      caches.match(req).then(cached => {
        const networkFetch = fetch(req)
          .then(res => {
            // update cache for GET requests
            if (req.method === 'GET' && res && res.status === 200) {
              const resClone = res.clone();
              caches.open(CACHE_NAME).then(cache => cache.put(req, resClone));
            }
            return res;
          })
          .catch(() => {
            // fallback to cached page for navigation
            return cached || caches.match('/e4/index.html');
          });
        // For navigations give cached response first for fast loads
        return cached || networkFetch;
      })
    );
  } else {
    // For non-navigation requests use network-first
    event.respondWith(
      fetch(req)
        .then(res => {
          if (req.method === 'GET' && res && res.status === 200) {
            const resClone = res.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(req, resClone));
          }
          return res;
        })
        .catch(() => caches.match(req))
    );
  }
});
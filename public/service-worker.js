const CACHE_NAME = 'atomency-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/styles.css',
  '/css/alchemist-style.css',
  '/js/elements-data.js',
  '/js/reactions-data.js',
  '/js/app.js',
  '/js/alchemist-engine.js',
  '/js/molecular-features.js',
  '/js/vsepr-geometry.js',
  '/js/vsepr-visual.js',
  '/js/vsepr-physics.js',
  '/js/alchemist-app.js',
  '/js/enhancements.js',
  '/js/reaction-kinetics.js',
  '/js/nuclear-decay.js',
  '/js/analytics.js'
];

// Install - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

// Fetch strategy: Cache-first for static, network-first for API
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Network-first for API calls (PubChem, etc.)
  if (url.pathname.startsWith('/api/') || url.hostname.includes('pubchem')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => cache.put(request, responseToCache));
          }
          return response;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // Cache-first for static assets
  event.respondWith(
    caches.match(request)
      .then((response) => {
        if (response) return response;

        const fetchRequest = request.clone();
        return fetch(fetchRequest).then((response) => {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then((cache) => cache.put(request, responseToCache));

          return response;
        });
      })
  );
});

// Activate - clean old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

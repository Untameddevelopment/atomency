const CACHE_NAME = 'atomency-v3';
const urlsToCache = [
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

// Install - cache static resources (NOT HTML - HTML is network-first)
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

// Fetch strategy: Network-first for HTML & navigation, cache-first for static assets
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

  // NETWORK-FIRST for HTML pages and navigation requests
  // This ensures users always get the latest About, Terms, Footer, etc.
  if (request.mode === 'navigate' ||
      url.pathname === '/' ||
      url.pathname === '/index.html' ||
      request.headers.get('accept')?.includes('text/html')) {
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

  // Cache-first for static assets (CSS, JS, images)
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

// Activate - clean ALL old caches aggressively
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

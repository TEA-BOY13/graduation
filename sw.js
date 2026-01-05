const CACHE_NAME = 'student-gallery-v1';
const urlsToCache = [
  './',
  './gallery.html',
  './index.html',
  './manifest.json',
  './sw.js',
  'https://cdn.jsdelivr.net/npm/sweetalert2@11'
];

// Install service worker and cache files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate service worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keyList =>
      Promise.all(
        keyList.map(key => {
          if(key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
});

// Fetch files from cache first, fallback to network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
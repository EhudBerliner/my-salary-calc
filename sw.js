const CACHE_NAME = 'salary-calc-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

// התקנה ושמירה ב-Cache
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// שליפת נתונים מה-Cache כשאין אינטרנט
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
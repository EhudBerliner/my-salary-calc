const CACHE_NAME = 'salary-calc-v3.6';
const ASSETS = [
  './', 
  './index.html', 
  './manifest.json', 
  './Image1.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then((res) => res || fetch(e.request)));
});


const CACHE_NAME = 'bjj-manager-cache-v1';
const urlsToCache = [
  '/',
  '/portal_aluno.html',
  '/logo_bjj_maneger.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Volta a versão salva no telemóvel para ser super rápido
        }
        return fetch(event.request);
      })
  );
});

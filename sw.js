const CACHE_NAME = 'bjj-manager-cache-v4';
const urlsToCache = [
  '/',
  '/login.html',
  '/dashboard.html',
  '/portal_aluno.html',
  '/alunos.html',
  '/certificados.html',
  '/competicoes.html',
  '/curriculo.html',
  '/financeiro.html',
  '/historico.html',
  '/loja.html',
  '/planos.html',
  '/turmas.html',
  '/super_admin.html',
  '/logo_bjj_maneger.png',
  '/manifest.json',        // Manifesto do Professor
  '/manifest_portal.json', // Manifesto do Aluno
  '/manifest_master.json'  // Manifesto do CEO
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', event => {
  // Garante que versões antigas do cache (v1, v2, v3) sejam apagadas
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  // Ignora pedidos para fora do domínio (ex: APIs externas)
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    fetch(event.request)
      .then(networkResponse => {
        // Se houver internet, atualiza o cache e entrega a página nova
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      })
      .catch(() => {
        // Se estiver offline, entrega o que estiver guardado no cache
        return caches.match(event.request);
      })
  );
});

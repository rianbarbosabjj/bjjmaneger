const CACHE_NAME = 'bjj-manager-cache-v2'; // Atualizado para v2 para forçar limpeza do cache antigo
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
  '/manifest.json',        // Manifesto do App do Professor
  '/manifest_aluno.json'   // Manifesto do App do Aluno
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
  // Este passo garante que caches antigos sejam apagados quando a nova versão entrar
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
  // Ignora requisições de outras origens (como APIs do Firebase)
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    // ESTRATÉGIA NETWORK-FIRST (Internet primeiro, fallback para o Cache)
    fetch(event.request)
      .then(networkResponse => {
        // Se tem internet e a página carregou, guarda a versão mais fresca no cache!
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      })
      .catch(() => {
        // Se a internet caiu (offline), salva o dia entregando o que está no cache!
        return caches.match(event.request);
      })
  );
});

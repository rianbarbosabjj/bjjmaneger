const CACHE_NAME = 'bjj-manager-cache-v2'; // Atualizado para v2 para forçar os celulares a baixarem as novidades
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
  // Este passo garante que caches antigos (ex: v1) sejam apagados quando o v2 entrar
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
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Retorna a versão rápida salva no celular
        }
        return fetch(event.request);
      })
  );
});

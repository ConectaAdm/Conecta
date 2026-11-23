// =============================================================
// Service Worker do C.O.N.E.C.T.A
// -------------------------------------------------------------
// É ele que transforma o site em PWA "de verdade": roda em segundo
// plano no navegador, intercepta as requisições e guarda arquivos
// em cache para o app abrir rápido e funcionar mesmo sem internet.
//
// IMPORTANTE: sempre que alterar arquivos de CSS/JS/HTML e quiser
// que os usuários recebam a versão nova, aumente o número abaixo.
// =============================================================
const CACHE_VERSION = 'v3';
const STATIC_CACHE = `conecta-static-${CACHE_VERSION}`;
const RUNTIME_CACHE = `conecta-runtime-${CACHE_VERSION}`;

// Página exibida quando o usuário está offline e a página pedida não está em cache
const OFFLINE_URL = '/offline.html';

// Arquivos guardados já na instalação (o "esqueleto" do app)
const PRECACHE_URLS = [
  '/',
  '/offline.html',
  '/manifest.json',
  '/css/style.css',
  '/css/login.css',
  '/css/cadastro.css',
  '/css/dashboard.css',
  '/css/chat.css',
  '/css/materiais.css',
  '/css/perfil.css',
  '/css/pomodoro.css',
  '/css/responsive.css',
  '/assets/CONECTA-LOGO.png',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/apple-touch-icon.png',
  '/icons/favicon-32.png'
];

// 1) INSTALAÇÃO: baixa e guarda os arquivos essenciais
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then(async (cache) => {
      // Adiciona um por um para que a falha de um arquivo não cancele a instalação
      await Promise.all(
        PRECACHE_URLS.map((url) =>
          cache.add(url).catch((err) => console.warn('[SW] Não foi possível guardar', url, err))
        )
      );
    })
  );
  // Ativa a nova versão sem esperar o usuário fechar todas as abas
  self.skipWaiting();
});

// 2) ATIVAÇÃO: apaga caches de versões antigas
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key.startsWith('conecta-') && key !== STATIC_CACHE && key !== RUNTIME_CACHE)
          .map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// 3) BUSCA (fetch): decide de onde vem cada resposta
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Só tratamos GET. POST/PUT/DELETE (login, cadastro, envio de mensagens) vão direto para a rede.
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Requisições de outros domínios (Supabase, CDN) não são interceptadas:
  // dados de usuário e autenticação precisam sempre vir atualizados do servidor.
  if (url.origin !== self.location.origin) return;

  // Navegação entre páginas (HTML): REDE PRIMEIRO, com cache como reserva.
  // Assim o usuário sempre vê a versão mais nova quando está online.
  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request));
    return;
  }

  // CSS, JS, imagens, fontes: CACHE PRIMEIRO e atualiza em segundo plano
  // (estratégia "stale-while-revalidate") — deixa o app bem mais rápido.
  if (['style', 'script', 'image', 'font', 'manifest'].includes(request.destination)) {
    event.respondWith(staleWhileRevalidate(request));
  }
});

async function networkFirst(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  try {
    const response = await fetch(request);
    if (response && response.ok) cache.put(request, response.clone());
    return response;
  } catch (err) {
    const cached = (await cache.match(request)) || (await caches.match(request));
    return cached || caches.match(OFFLINE_URL);
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  const cached = await caches.match(request);
  const networkFetch = fetch(request)
    .then((response) => {
      if (response && response.ok) cache.put(request, response.clone());
      return response;
    })
    .catch(() => undefined);
  return cached || (await networkFetch) || Response.error();
}

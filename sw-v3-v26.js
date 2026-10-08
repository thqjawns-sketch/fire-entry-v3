const CACHE_NAME = 'fire-entry-v3-pwa-v26';
const APP_SHELL = [
  './icon-v3-192.png',
  './icon-v3-512.png'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => key.startsWith('fire-entry-v3-pwa-') && key !== CACHE_NAME)
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Apps Script 등 외부 API 요청은 서비스워커가 건드리지 않음.
  if (url.origin !== self.location.origin) return;

  // index.html/화면 이동은 항상 네트워크 최신본을 사용.
  // 이전 HTML을 캐시 fallback으로 되살리지 않음.
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request, { cache: 'no-store' })
    );
    return;
  }

  // 아이콘 등 정적 파일도 네트워크 우선.
  event.respondWith(
    fetch(event.request, { cache: 'no-store' })
      .then(response => {
        if (response && response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});

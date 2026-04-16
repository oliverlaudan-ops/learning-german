const CACHE = 'deutsch-lernen-v1';
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll([
    '/', '/index.html', '/css/style.css', '/js/data.js', '/js/router.js',
    '/js/components.js', '/js/app.js', '/manifest.json'
  ])));
  self.skipWaiting();
});
self.addEventListener('activate', e => { e.waitUntil(clients.claim()); });
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).then(resp => {
    const clone = resp.clone();
    caches.open(CACHE).then(c => c.put(e.request, clone));
    return resp;
  }).catch(() => caches.match('/index.html'))));
});
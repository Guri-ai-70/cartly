// Cartly service worker – makes the app work offline.
// When you change any file, raise the version number below so phones get the update.
const CACHE = 'cartly-v18';
const FILES = ['./', './index.html', './items.js', './manifest.webmanifest', './icon-192.png', './icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const u = e.request.url;
  if (!u.startsWith(self.location.origin) && !u.includes('fonts.g')) return; // e.g. translation – always online
  e.respondWith(
    caches.match(e.request).then(hit => hit || fetch(e.request).then(res => {
      const url = e.request.url;
      if (res.ok && (url.startsWith(self.location.origin) || url.includes('fonts.g'))) {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy));
      }
      return res;
    }).catch(() => caches.match('./index.html')))
  );
});

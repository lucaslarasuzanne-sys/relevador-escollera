// Service worker del Relevador: guarda la página para abrirla sin señal. No hace ningún pedido a terceros.
const CACHE = 'relevador-e2d90b889d7f', ARCHIVOS = ['./', './index.html', './manifest.webmanifest', './icono.svg'];
self.addEventListener('install', e=> e.waitUntil(caches.open(CACHE).then(c=> c.addAll(ARCHIVOS)).then(()=> self.skipWaiting())));
self.addEventListener('activate', e=> e.waitUntil(caches.keys().then(k=> Promise.all(k.filter(x=> x !== CACHE).map(x=> caches.delete(x)))).then(()=> self.clients.claim())));
self.addEventListener('fetch', e=>{ if(e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return; e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(r=> r || fetch(e.request))); });

// Service worker: hace que la app abra sin internet.
// - La página se pide primero a la red (para recibir actualizaciones) y, si no hay red, sale de la caché.
// - Lo pesado (MediaPipe, modelos, tipografías) se guarda solo cuando se usa por primera vez,
//   así un equipo modesto o un plan de datos limitado no descarga 20 MB que quizá nunca use.
const APP = 'guitarra-app-v4';          // cambia este número al publicar una versión nueva
const RECURSOS = 'guitarra-recursos-v1'; // se conserva entre versiones para no volver a bajar los modelos
const BASE = ['./', './index.html', './manifest.webmanifest', './iconos/icono-192.png', './iconos/icono-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(APP).then(c => c.addAll(BASE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(claves => Promise.all(claves.filter(k => k !== APP && k !== RECURSOS).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

const guardar = (cache, peticion, respuesta) => caches.open(cache).then(c => c.put(peticion, respuesta));

self.addEventListener('fetch', e => {
  const peticion = e.request;
  if (peticion.method !== 'GET') return;

  if (peticion.mode === 'navigate') {
    e.respondWith(
      fetch(peticion)
        .then(r => { guardar(APP, './index.html', r.clone()); return r; })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  e.respondWith(
    caches.match(peticion).then(guardada => guardada || fetch(peticion).then(r => {
      if (r.ok || r.type === 'opaque') {
        const propia = new URL(peticion.url).origin === location.origin && !peticion.url.includes('/mediapipe/') && !peticion.url.includes('/modelos/');
        guardar(propia ? APP : RECURSOS, peticion, r.clone());
      }
      return r;
    }))
  );
});

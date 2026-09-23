/* Only a generic offline screen is cached. Never cache forms, APIs or private pages. */
const OFFLINE_CACHE = "flo-offline-v1";
self.addEventListener("install", event => {
  event.waitUntil(caches.open(OFFLINE_CACHE).then(cache => cache.add("/offline")));
});
self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith("flo-offline-") && key !== OFFLINE_CACHE).map(key => caches.delete(key)))));
});
self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);
  if (event.request.method !== "GET" || event.request.mode !== "navigate" || url.origin !== self.location.origin || /^\/(api|redaksjon)(\/|$)/.test(url.pathname)) return;
  event.respondWith(fetch(event.request).catch(async () => {
    const fallback = await caches.match("/offline");
    return fallback || new Response("Ingen nettforbindelse. Prøv igjen når du er på nett.", { status: 503, headers: { "Content-Type": "text/plain; charset=utf-8" } });
  }));
});

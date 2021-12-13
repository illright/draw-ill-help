const timestamp = 1639368243338;
const build = [
  "/draw-ill-help/_app/start-b1cc46ba.js",
  "/draw-ill-help/_app/assets/start-464e9d0a.css",
  "/draw-ill-help/_app/pages/__layout.svelte-1f0cee31.js",
  "/draw-ill-help/_app/assets/pages/__layout.svelte-e505c229.css",
  "/draw-ill-help/_app/error.svelte-6c70098f.js",
  "/draw-ill-help/_app/pages/index.svelte-12187fcb.js",
  "/draw-ill-help/_app/pages/dataset.svelte-06a18b6e.js",
  "/draw-ill-help/_app/pages/draw.svelte-f462d2c3.js",
  "/draw-ill-help/_app/chunks/vendor-4fd8af32.js",
  "/draw-ill-help/_app/chunks/singletons-12a22614.js",
  "/draw-ill-help/_app/chunks/classes-ea0002a8.js",
  "/draw-ill-help/_app/chunks/action-28bbd5ea.js"
];
const files = [
  "/draw-ill-help/.nojekyll",
  "/draw-ill-help/FlatColorIconsPicture.svg",
  "/draw-ill-help/group1-shard1of2.bin",
  "/draw-ill-help/group1-shard2of2.bin",
  "/draw-ill-help/model.json"
];
const cacheName = `draw-ill-help-${timestamp}`;
const routes = ["/draw-ill-help", "/draw-ill-help/draw", "/draw-ill-help/dataset"];
async function fetchAndCacheAssets() {
  console.log("[Service Worker] installing");
  self.skipWaiting();
  const cache = await caches.open(cacheName);
  cache.addAll(files.filter((name) => !name.endsWith(".nojekyll")));
  return cache.addAll(build.concat(routes));
}
async function deactivateUnusedCaches() {
  console.log("[Service Worker] activating");
  const allCaches = await caches.keys();
  const inactiveCaches = allCaches.filter((thatCacheName) => thatCacheName !== cacheName);
  const deletionPromises = inactiveCaches.map((thatCacheName) => caches.delete(thatCacheName));
  return Promise.all(deletionPromises.concat([self.clients.claim()]));
}
async function readFromCacheOrFetch(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse !== void 0) {
    return cachedResponse;
  } else {
    const networkResponsePromise = fetch(request);
    const cache = await caches.open(cacheName);
    const networkResponse = await networkResponsePromise;
    cache.put(request, networkResponse.clone());
    return networkResponse;
  }
}
self.addEventListener("install", (event) => event.waitUntil(fetchAndCacheAssets()));
self.addEventListener("activate", (event) => event.waitUntil(deactivateUnusedCaches()));
self.addEventListener("fetch", (event) => event.respondWith(readFromCacheOrFetch(event.request)));

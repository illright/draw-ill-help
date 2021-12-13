// TypeScript hacks to enable correct typings for the service worker
//   Track the open issue here: https://github.com/microsoft/TypeScript/issues/11781
/// <reference no-default-lib="true"/>
/// <reference lib="es2020" />
/// <reference lib="WebWorker" />
declare const self: ServiceWorkerGlobalScope & typeof globalThis;

import { build, timestamp, files } from '$service-worker';

/** Unique cache ID, generated at build time. */
const cacheName = `draw-ill-help-${timestamp}`;
const routes = ['/cvdl-project', '/cvdl-project/draw', '/cvdl-project/dataset'];

/**
 * Download the website files on initialization.
 *
 * This includes page content, styles, scripts and the model,
 * however, the service worker won't wait or check
 * if the model was fetched successfully.
 */
async function fetchAndCacheAssets() {
  console.log('[Service Worker] installing');
  // Make this worker the active one
  self.skipWaiting();

  const cache = await caches.open(cacheName);

  cache.addAll(files.filter((name) => !name.endsWith('.nojekyll')));
  return cache.addAll(build.concat(routes));
}

/** Take down caches left over by previous versions of the service worker. */
async function deactivateUnusedCaches() {
  console.log('[Service Worker] activating');
  const allCaches = await caches.keys();
  const inactiveCaches = allCaches.filter((thatCacheName) => thatCacheName !== cacheName);

  const deletionPromises: Promise<boolean | void>[] = inactiveCaches.map((thatCacheName) =>
    caches.delete(thatCacheName)
  );
  return Promise.all(deletionPromises.concat([self.clients.claim()]));
}

/**
 * Try serving the request from cache, falling back to network.
 *
 * If the request is for any of the files in the `/static` directory,
 * but they failed to be cached, cache them now.
 */
async function readFromCacheOrFetch(request: Request) {
  const cachedResponse = await caches.match(request);

  if (cachedResponse !== undefined) {
    return cachedResponse;
  } else {
    const networkResponsePromise = fetch(request);
    const cache = await caches.open(cacheName);
    const networkResponse = await networkResponsePromise;
    cache.put(request, networkResponse.clone());
    return networkResponse;
  }
}

self.addEventListener('install', (event) => event.waitUntil(fetchAndCacheAssets()));
self.addEventListener('activate', (event) => event.waitUntil(deactivateUnusedCaches()));
self.addEventListener('fetch', (event) => event.respondWith(readFromCacheOrFetch(event.request)));

const cacheName = "cache-v1";
const precacheResources = [
  "/",
  "bundle.js",
  "fd789c2563f36186cc846db07ae1cf48.gif"
];
self.addEventListener("install", event => {
  console.log("Service worker install event!");
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(precacheResources);
    })
  );
});

self.addEventListener("activate", event => {
  console.log("Service worker activate event!");
});

self.addEventListener("fetch", event => {
  console.log("Fetch intercepted for:", event.request.url);
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        console.log(cachedResponse);
        return cachedResponse;
      }
      return fetch(event.request);
    })
  );
});

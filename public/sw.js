self.addEventListener('install', event => {
  event.waitUntil(
    (async function() {
      const cache = await caches.open('airbnb')
      await cache.addAll(['/'])
    })(),
  )
})

self.addEventListener('fetch', function(event) {
  event.respondWith(
    (async function() {
      try {
        const networkResponse = await fetch(event.request)
        const cache = await caches.open('airbnb-dynamic')
        event.waitUntil(cache.put(event.request, networkResponse.clone()))
        return networkResponse
      } catch (err) {
        return caches.match(event.request)
      }
    })(),
  )
})

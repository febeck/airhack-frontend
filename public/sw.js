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
        return await fetch(event.request)
      } catch (err) {
        return caches.match(event.request)
      }
    })(),
  )
})

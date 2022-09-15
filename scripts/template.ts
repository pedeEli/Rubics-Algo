declare let self: ServiceWorkerGlobalScope
declare let __next_generated__: string[]
declare let __next_pages__: string[]
declare let __next_data__: string[]
declare let __public_files__: string[]
declare let id: string
export {}

const nextGenerated = __next_generated__
const nextPages = __next_pages__
const nextData = __next_data__
const publicFiles = __public_files__

const cacheName = `rubics-algo-${id}`

console.log(publicFiles)

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys()
    await Promise.all(keys.map(async key => {
      if (key === 'cacheName')
        return
      await caches.delete(key)
    }))
    const cache = await caches.open(cacheName)
    await cache.addAll([...nextPages, ...nextGenerated, ...nextData, ...publicFiles])
  })())
})


const cacheFirst = async (request: Request) => {
  const cached = await caches.match(request);
  if (cached)
    return cached;
  return fetch(request);
};

self.addEventListener("fetch", event => {
  event.respondWith(cacheFirst(event.request));
});

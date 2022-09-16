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


self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys()
    await Promise.all(keys.map(async key => {
      if (key === 'cacheName')
        return
      await caches.delete(key)
    }))
    const cache = await caches.open(cacheName)
    await Promise.all([...nextPages, ...nextGenerated, ...nextData, ...publicFiles].map(async file => {
      const response = await fetch(file, {
        credentials: 'omit'
      })
      await cache.put(file, response)
    }))
  })())
})


const fetchFirst = async (request: Request) => {
  try {
    const data = await fetch(request)
    return data
  } catch (e) {
    const cached = await caches.match(request)
    if (!cached) {
      console.log(request)
      throw new Error('not in cache')
    }
    return cached
  }
}

self.addEventListener("fetch", event => {
  event.respondWith(fetchFirst(event.request))
})

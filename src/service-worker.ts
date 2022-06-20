/// <reference lib="webworker"/>

import {build, files, prerendered, version} from '$service-worker'


const cacheName = `rubics-${version}`

const worker = (self as unknown) as ServiceWorkerGlobalScope
const toCache = build.concat(files, prerendered)

worker.addEventListener('install', event => {
    event.waitUntil(caches
        .open(cacheName)
        .then(cache => cache.addAll(toCache)))
    worker.skipWaiting()
})

const deleteCache = async (key: string) => {
    await caches.delete(key)
}
  
const deleteOldCaches = async () => {
    const cacheKeepList = [cacheName];
    const keyList = await caches.keys()
    const cachesToDelete = keyList.filter(key => !cacheKeepList.includes(key))
    await Promise.all(cachesToDelete.map(deleteCache))
}

worker.addEventListener('activate', event => {
    event.waitUntil(deleteOldCaches());
})


worker.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request)
        .then(async response => {
            const cache = await caches.open(cacheName)
            cache.put(event.request, response.clone())
            return response
        })
        .catch(async () => {
            const cache = await caches.open(cacheName)
            const cached = await cache.match(event.request)
            return cached!
        })
    )
})
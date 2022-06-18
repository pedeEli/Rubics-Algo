/// <reference lib="webworker"/>

import {build, files, prerendered, version} from '$service-worker'


const cacheName = `rubics-${version}`

const worker = (self as unknown) as ServiceWorkerGlobalScope
const toCache = build.concat(files, prerendered)

worker.addEventListener('install', event => {
    event.waitUntil(caches
        .open(cacheName)
        .then(cache => cache.addAll(toCache))
        .then(() => worker.skipWaiting()))
})

worker.addEventListener('activate', event => {
    event.waitUntil(caches.keys().then(async keys => {
        for (const key in keys) {
            if (key !== cacheName) await caches.delete(key)
        }
        worker.clients.claim()
    }))
})



worker.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request)
        .then(async response => {
            if (!response.ok) {
                const cached = await caches.match(event.request)
                return cached!
            }
            const cache = await caches.open(cacheName)
            cache.put(event.request, response.clone())
            return response
        })
    )
})
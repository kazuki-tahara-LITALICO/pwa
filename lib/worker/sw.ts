import { defaultCache } from '@serwist/next/worker';
import type { PrecacheEntry, SerwistGlobalConfig } from 'serwist';
import { Serwist } from 'serwist';
import { pushHandler } from '@/lib/worker/push-handler';

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: defaultCache,
  fallbacks: {
    entries: [
      {
        url: '/~offline',
        matcher({ request }) {
          return request.destination === 'document';
        },
      },
    ],
  },
});

serwist.addEventListeners();

self.addEventListener('push', pushHandler);

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(self.clients.openWindow(event.notification.data.url));
});

self.addEventListener('fetch', (event) => {
  if (event.preloadResponse) {
    event.respondWith(
      (async function () {
        const preloadResponse = await event.preloadResponse;
        if (preloadResponse) {
          return preloadResponse;
        }
        return fetch(event.request);
      })()
    );
  }
});

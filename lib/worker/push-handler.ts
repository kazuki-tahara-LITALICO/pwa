declare const self: ServiceWorkerGlobalScope;

const BADGE_CACHE = 'badge-cache';
const BADGE_COUNT = 'badge-count';

const getBadgeCount = async () => {
  const cache = await caches.open(BADGE_CACHE);
  const response = await cache.match(BADGE_COUNT);
  if (response) {
    const data = await response.json();
    return data.count || 0;
  }
  return 0;
};

const setBadgeCount = async (count: number) => {
  const cache = await caches.open(BADGE_CACHE);
  await cache.put(BADGE_COUNT, new Response(JSON.stringify({ count })));
};

export const pushHandler = async (event: PushEvent) => {
  event.waitUntil(
    (async () => {
      const data = event.data ? event.data.json() : {};
      console.log('Push event data:', data);
      const title = data.title || 'Default title';
      const message = data.message || 'Default message';

      let badgeCount = await getBadgeCount();
      badgeCount += data.badgeCount || 1;
      console.log('Updated badge count:', badgeCount);

      await setBadgeCount(badgeCount);

      const options = {
        body: message,
      };

      if ('setAppBadge' in navigator) {
        await navigator.setAppBadge(badgeCount).catch((error) => {
          console.error('Failed to set badge:', error);
        });
      }

      await self.registration
        .showNotification(title, options)
        .then(() => {
          console.log('Notification displayed successfully.');
        })
        .catch((error) => {
          console.error('Error displaying notification:', error);
        });
    })()
  );
};

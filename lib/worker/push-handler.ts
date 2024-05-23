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
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'Default title';
  const message = data.message || 'Default message';

  const options = {
    body: message,
  };

  let badgeCount = await getBadgeCount();
  badgeCount += 1;

  await setBadgeCount(badgeCount);

  event.waitUntil(
    self.registration
      .showNotification(title, options)
      .then(() => {
        console.log('Notification displayed successfully.');
      })
      .catch((error) => {
        console.error('Error displaying notification:', error);
      })
  );

  if ('setAppBadge' in navigator) {
    navigator
      .setAppBadge(data.badgeCount)
      .catch((error) => console.error(`Failed to set badge:${error}`));
  }
};

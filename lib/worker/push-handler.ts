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
  console.log('Push event data:', data); // 追加
  const title = data.title || 'Default title';
  const message = data.message || 'Default message';

  let badgeCount = await getBadgeCount();
  badgeCount += data.badgeCount || 1;
  console.log('Updated badge count:', badgeCount); // 追加

  await setBadgeCount(badgeCount);

  const options = {
    body: message,
    data: {
      url: '/scan',
      badgeCount: badgeCount,
    },
  };

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

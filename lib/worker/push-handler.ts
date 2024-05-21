declare const self: ServiceWorkerGlobalScope;

export const pushHandler = (event: PushEvent) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'Default title';
  const message = data.message || 'Default message';

  const options = {
    body: message,
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
};

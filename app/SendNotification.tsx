'use client';
import type { MouseEventHandler } from 'react';
import { useEffect, useState } from 'react';

const base64ToUint8Array = (base64: string) => {
  const padding = '='.repeat((4 - (base64.length % 4)) % 4);
  const b64 = (base64 + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(b64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

export default function SendNotification() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null
  );

  const handleToggleSubscription = async () => {
    if (isSubscribed) {
      await unsubscribeButtonOnClick();
    } else {
      await subscribeButtonOnClick();
    }
    setIsSubscribed(!isSubscribed);
  };

  const [registration, setRegistration] =
    useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      window.serwist !== undefined
    ) {
      navigator.serviceWorker.ready.then((reg) => {
        reg.pushManager.getSubscription().then((sub) => {
          if (
            sub &&
            !(
              sub.expirationTime &&
              Date.now() > sub.expirationTime - 5 * 60 * 1000
            )
          ) {
            setSubscription(sub);
            setIsSubscribed(true);
          }
        });
        setRegistration(reg);
      });
    }
  }, []);

  const subscribeButtonOnClick = async () => {
    if (!process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY) {
      throw new Error('Environment variables supplied not sufficient.');
    }
    if (!registration) {
      console.error('No SW registration available.');
      return;
    }
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: base64ToUint8Array(
        process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY
      ),
    });
    setSubscription(sub);
    setIsSubscribed(true);
    alert('Web push subscribed!');
    console.log(sub);
  };

  const unsubscribeButtonOnClick = async () => {
    if (!subscription) {
      console.error('Web push not subscribed');
      return;
    }
    await subscription.unsubscribe();
    setSubscription(null);
    setIsSubscribed(false);
    console.log('Web push unsubscribed!');
  };

  const sendNotificationButtonOnClick: MouseEventHandler<
    HTMLButtonElement
  > = async (event) => {
    event.preventDefault();

    if (!subscription) {
      alert('Web push not subscribed');
      return;
    }

    try {
      await fetch('/notification', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ subscription }),
        signal: AbortSignal.timeout(10000),
      });
    } catch (err) {
      if (err instanceof Error) {
        if (err.name === 'TimeoutError') {
          console.error('Timeout: It took too long to get the result.');
        } else if (err.name === 'AbortError') {
          console.error(
            'Fetch aborted by user action (browser stop button, closing tab, etc.)'
          );
        } else if (err.name === 'TypeError') {
          console.error('The AbortSignal.timeout() method is not supported.');
        } else {
          console.error(`Error: type: ${err.name}, message: ${err.message}`);
        }
      } else {
        console.error(err);
      }
      alert('An error happened.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-2 bg-gray-100">
      <div className="flex items-center mb-6">
        <span className="mr-2 text-gray-800">
          {isSubscribed ? '通知を許可' : '通知を制限'}
        </span>
        <div
          className={`relative inline-block w-12 h-6 transition duration-200 ease-linear ${
            isSubscribed ? 'bg-blue-500' : 'bg-red-500'
          } rounded-full`}
          onClick={handleToggleSubscription}
        >
          <span
            className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-linear transform ${
              isSubscribed ? 'translate-x-6' : ''
            }`}
          ></span>
        </div>
      </div>
      <button
        type="button"
        onClick={sendNotificationButtonOnClick}
        disabled={!isSubscribed}
        className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-1 px-2 rounded mr-2 disabled:bg-gray-500"
      >
        ダミー通知を送信
      </button>
    </div>
  );
}

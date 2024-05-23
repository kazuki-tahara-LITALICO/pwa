'use client';
import { useEffect, useRef, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const Install = () => {
  const deferredPromptRef = useRef<BeforeInstallPromptEvent | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const beforeInstallPromptHandler = (event: any) => {
      setReady(true);
      deferredPromptRef.current = event;
    };

    window.addEventListener('beforeinstallprompt', beforeInstallPromptHandler);
    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        beforeInstallPromptHandler
      );
    };
  }, []);

  const handleClick = async () => {
    const deferredPrompt = deferredPromptRef.current;
    if (deferredPrompt) deferredPrompt.prompt();
  };

  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-1 px-2 rounded mr-2 disabled:bg-gray-400"
      disabled={!ready}
      onClick={handleClick}
    >
      インストール
    </button>
  );
};

export default Install;

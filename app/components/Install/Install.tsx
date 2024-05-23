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
    <button disabled={!ready} onClick={handleClick}>
      Install
    </button>
  );
};

export default Install;

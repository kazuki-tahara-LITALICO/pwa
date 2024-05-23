'use client';
import { useEffect, useRef, useState } from 'react';

const Install = () => {
  const deferredPromptRef = useRef(null);
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

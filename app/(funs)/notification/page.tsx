import type { Metadata } from 'next';
import Link from 'next/link';

import SendNotification from '../../components/SendNotification/SendNotification';
// import Install from './components/Install/Install';

export const metadata: Metadata = {
  title: 'Home',
};

export default function Page() {
  return (
    <>
      <h2 className="text-2xl font-bold mb-5">Web Push Test Page</h2>
      <div className="w-full max-w-md">
        <SendNotification />
      </div>
    </>
  );
}

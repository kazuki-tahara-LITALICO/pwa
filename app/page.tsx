import type { Metadata } from 'next';
import Link from 'next/link';

import SendNotification from './SendNotification';

export const metadata: Metadata = {
  title: 'Home',
};

export default function Page() {
  return (
    <>
      <h1>Next.js + Serwist</h1>
      <Link href="/scan">QRcode Scan Page</Link>
      <SendNotification />
    </>
  );
}

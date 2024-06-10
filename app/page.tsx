import type { Metadata } from 'next';
import Link from 'next/link';

import SendNotification from './SendNotification';
import Install from './components/Install/Install';

export const metadata: Metadata = {
  title: 'Home',
};

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-blue-600">
        Next.js + Serwist
      </h1>
      <h2 className="text-2xl font-bold mb-5">Web Push Test Page</h2>

      <div className="w-full max-w-md">
        <SendNotification />
      </div>
      <Link
        href="/scan"
        className="text-2xl font-medium text-gray-800 underline hover:text-blue-600"
      >
        Go to QRcode Scan Page
      </Link>
      {/* PC or Android版でのダウンロードリンク */}
      {/* <div className="w-full max-w-md mt-4">
        <Install />
      </div> */}
    </div>
  );
}

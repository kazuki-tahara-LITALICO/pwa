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
      <Link
        href="/scan"
        className="text-2xl font-medium text-gray-800 hover:text-gray-500 mb-6 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100"
      >
        QRcode Scan Page
      </Link>
      <div className="w-full max-w-md">
        <SendNotification />
      </div>
      {/* <div className="w-full max-w-md mt-4">
        <Install />
      </div> */}
    </div>
  );
}

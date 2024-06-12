'use client';

import Link from 'next/link';

const page = () => {
  return (
    <div>
      <ul>
        <li>
          <Link
            href="/scan"
            className="text-blue-600 underline underline-offset-1"
          >
            QR code scan
          </Link>
        </li>
        <li>
          <Link
            href="/notification"
            className="text-blue-600 underline underline-offset-1"
          >
            Push notification
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default page;

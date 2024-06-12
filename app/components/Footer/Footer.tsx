import { BsQrCode } from 'react-icons/bs';
import { BsBell } from 'react-icons/bs';
import { IoMdHome } from 'react-icons/io';

import Link from 'next/link';

const Footer = () => {
  return (
    <div className="sticky bottom-0 left-0 z-50 w-full h-full bg-white border-t border-gray-200 dark:bg-gray-300 dark:border-gray-200">
      <div className="grid h-full max-w-lg grid-cols-3 mx-auto font-medium pb-4 pt-2">
        <Link
          href="/"
          className="inline-flex flex-col items-center justify-center group"
        >
          <IoMdHome className="size-6 text-gray-500 group-hover:text-blue-600 " />
          <span className="text-[0.5rem] text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
            ホーム
          </span>
        </Link>

        <Link
          href="/scan"
          className="inline-flex flex-col items-center justify-center group"
        >
          <BsQrCode className="size-5 text-gray-500 group-hover:text-blue-600 " />
          <span className="text-[0.5rem] text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
            QRコード
          </span>
        </Link>
        <Link
          href="/notification"
          className="inline-flex flex-col items-center justify-center group"
        >
          <BsBell className="size-5 text-gray-500 group-hover:text-blue-600 " />
          <span className="text-[0.5rem] text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
            通知
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Footer;

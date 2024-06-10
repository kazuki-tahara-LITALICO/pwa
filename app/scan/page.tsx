'use client';
import { useState } from 'react';
import Link from 'next/link';
import QrcodeReader from '../components/Qrcode/QrcodeReader';
import SendNotification from '../SendNotification';

const QrScanPage = () => {
  const [scannedResult, setScannedResult] = useState<string>('');

  const onNewScanResult = (result: string) => {
    console.info('QR Scan Result');
    setScannedResult(result);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-blue-600">
        Next.js + Serwist
      </h1>
      <h2 className="text-2xl font-bold mb-5">QR code Test Page</h2>
      スキャン結果URL:{scannedResult}
      {/* <div className="w-fuu"> */}
      <QrcodeReader onScanSuccess={onNewScanResult} onScanFailure={() => {}} />
      {/* </div> */}
      <Link
        href="/"
        className="text-2xl font-medium text-gray-800 underline hover:text-blue-600"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default QrScanPage;

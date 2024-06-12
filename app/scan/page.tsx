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
    <>
      <h2 className="text-2xl font-bold mb-5">QR code Test Page</h2>
      スキャン結果URL:{scannedResult}
      <div className="w-full max-w-md">
        <QrcodeReader
          onScanSuccess={onNewScanResult}
          onScanFailure={() => {}}
        />
      </div>
      <Link
        href="/"
        className="text-2xl font-medium text-gray-800 underline hover:text-blue-600"
      >
        Go to Home
      </Link>
    </>
  );
};

export default QrScanPage;

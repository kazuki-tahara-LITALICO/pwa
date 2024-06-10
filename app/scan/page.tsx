'use client';
import { useState } from 'react';
import Link from 'next/link';
import QrcodeReader from '../components/Qrcode/QrcodeReader';

const QrScanPage = () => {
  const [scannedResult, setScannedResult] = useState<string>('');

  const onNewScanResult = (result: string) => {
    console.info('QR Scan Result');
    setScannedResult(result);
  };

  return (
    <main>
      <h1>QrScanPage</h1>
      <div>
        <h2>スキャン結果URL:{scannedResult}</h2>
      </div>
      <QrcodeReader onScanSuccess={onNewScanResult} onScanFailure={() => {}} />
      <Link
        href="/"
        className="inline-block text-2xl font-medium text-gray-800 hover:text-gray-500 mt-5 mb-6 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100"
      >
        Home Page
      </Link>
    </main>
  );
};

export default QrScanPage;

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
      <Link href="/">Home</Link>
    </main>
  );
};

export default QrScanPage;

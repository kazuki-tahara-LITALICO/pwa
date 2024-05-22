'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import QrcodeReader from '../components/Qrcode/QrcodeReader';

const SecondPage = () => {
  const [scannedTime, setScannedTime] = useState(new Date());
  const [scannedResult, setScannedResult] = useState<string>('');

  useEffect(() => {}, [scannedTime, scannedResult]);

  const onNewScanResult = (result: string) => {
    console.info('QR Scan Result');
    console.info(result);
    setScannedTime(new Date());
    setScannedResult(result);
  };

  return (
    <main>
      <h1>Second page</h1>
      <div>
        <h2></h2>
      </div>
      <QrcodeReader onScanSuccess={onNewScanResult} onScanFailure={() => {}} />

      <Link href="/">Home</Link>
    </main>
  );
};

export default SecondPage;

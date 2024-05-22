'use client';

import { Html5Qrcode, Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect, useState } from 'react';

const qrcodeRegionId = 'html5qr-code-full-region';

type Props = {
  onScanSuccess: () => void;
  onScanFailure: () => void;
};

const QrcodeReader = ({ onScanSuccess, onScanFailure }: Props) => {
  const config = { fps: 1, qrbox: { width: 250, height: 250 } };
  const [cameraPermission, setCameraPermission] = useState<boolean>(false);
  const [selectedCameraId, setSelectedCameraId] = useState<string>('');
  const [cameras, setCameras] = useState<
    {
      value: string;
      label: string;
    }[]
  >([]);
  const [html5QrcodeScanner, setHtml5QrcodeScanner] =
    useState<Html5Qrcode | null>(null);

  useEffect(() => {
    if (!onScanSuccess && !onScanFailure) {
      throw new Error('system error');
    }
    const scanner = new Html5Qrcode(qrcodeRegionId);
    setHtml5QrcodeScanner(scanner);
    return () => {
      scanner.clear();
    };
  }, [onScanFailure, onScanSuccess]);

  const getCamera = async () => {
    const cameras = await Html5Qrcode.getCameras().catch((err) => {
      console.error(`カメラが取得出来ませんでした：${err}`);
    });
    if (cameras && cameras.length) {
      const formattedCameras = cameras.map((camera) => ({
        value: camera.id,
        label: camera.label || `Camera ${camera.id}`,
      }));
      setCameras(formattedCameras);
      setSelectedCameraId(formattedCameras[0].value);
      setCameraPermission(true);
    }
  };

  const startScan = async () => {
    if (!html5QrcodeScanner) throw new Error('system error');
    await html5QrcodeScanner
      .start(selectedCameraId, config, onScanSuccess, onScanFailure)
      .catch((error) => console.error(`Error starting the scanner: ${error}`));
    setHtml5QrcodeScanner(html5QrcodeScanner);
  };

  const stopScan = async () => {
    if (!html5QrcodeScanner) throw new Error('system error');
    await html5QrcodeScanner
      .stop()
      .catch((error) => console.error(`Error stopping the scanner: ${error}`));
    setHtml5QrcodeScanner(html5QrcodeScanner);
  };

  // const startScan = async () => {
  //   await html5QrcodeScanner.
  // }

  return <div>QrcodeReader</div>;
};

export default QrcodeReader;

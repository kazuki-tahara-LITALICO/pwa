'use client';

import { Html5Qrcode, Html5QrcodeScannerState } from 'html5-qrcode';
import { useCallback, useEffect, useMemo, useState } from 'react';

const qrcodeRegionId = 'html5qr-code-full-region';

type Props = {
  onScanSuccess: (arg: any) => void;
  onScanFailure: () => void | undefined;
};

type Cameras = {
  value: string;
  label: string;
}[];

const QrcodeReader = ({ onScanSuccess, onScanFailure }: Props) => {
  const [isScanCamera, setIsScanCamera] = useState(false);
  const config = useMemo(
    () => ({ fps: 1, qrbox: { width: 250, height: 250 } }),
    []
  );

  const [cameraPermission, setCameraPermission] = useState<boolean>(false);
  const [selectedCameraId, setSelectedCameraId] = useState<string>('');
  const [cameras, setCameras] = useState<Cameras>([]);

  const [html5QrcodeScanner, setHtml5QrcodeScanner] =
    useState<Html5Qrcode | null>(null);

  useEffect(() => {
    if (!onScanSuccess && !onScanFailure) {
      throw new Error('system error');
    }
    const scanner = new Html5Qrcode(qrcodeRegionId);
    setHtml5QrcodeScanner(scanner);
    return () => {
      if (scanner.getState() === Html5QrcodeScannerState.SCANNING) {
        scanner
          .stop()
          .then(() => {
            scanner.clear();
          })
          .catch((err) => {
            console.error(`Error stopping the scanner: ${err}`);
            scanner.clear();
          });
      } else {
        scanner.clear();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleToggleSubscription = async () => {
    if (isScanCamera) {
      await stopScan();
    } else {
      await startScan();
    }
    setIsScanCamera(!isScanCamera);
  };

  const getCameras = useCallback(async () => {
    try {
      const cameras = await Html5Qrcode.getCameras();
      if (cameras && cameras.length) {
        const formattedCameras = cameras.map((camera) => ({
          value: camera.id,
          label: camera.label || `Camera ${camera.id}`,
        }));
        setCameras(formattedCameras);
        setSelectedCameraId(formattedCameras[0].value);
        setCameraPermission(true);
      }
    } catch (error) {
      console.error(`カメラが取得出来ませんでした：${error}`);
    }
  }, []);

  const startScan = useCallback(async () => {
    if (!html5QrcodeScanner) throw new Error('system error');
    try {
      await html5QrcodeScanner.start(
        selectedCameraId,
        config,
        onScanSuccess,
        onScanFailure
      );
    } catch (error) {
      console.error(`Error starting the scanner: ${error}`);
    }
  }, [
    config,
    html5QrcodeScanner,
    onScanFailure,
    onScanSuccess,
    selectedCameraId,
  ]);

  const stopScan = useCallback(async () => {
    if (!html5QrcodeScanner) throw new Error('system error');
    try {
      await html5QrcodeScanner.stop();
    } catch (error) {
      console.error(`Error stopping the scanner: ${error}`);
    }
  }, [html5QrcodeScanner]);

  const switchCamera = useCallback((targetId: string) => {
    setSelectedCameraId(targetId);
  }, []);

  return (
    <div className="container mx-auto">
      <div className="max-w-screen-lg" id={qrcodeRegionId} />

      <div>
        {cameras.length > 0 ? (
          <select
            name="camera"
            value={selectedCameraId}
            onChange={(e) => switchCamera(e.target.value)}
          >
            {cameras.map((camera) => (
              <option key={camera.value} value={camera.value}>
                {camera.label}
              </option>
            ))}
          </select>
        ) : (
          <p>カメラがありません</p>
        )}
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-1 px-2 rounded mr-2"
        onClick={getCameras}
      >
        カメラ取得
      </button>

      <div className="flex items-center mb-6">
        <span className="mr-2 text-gray-800">
          {isScanCamera ? 'スキャン停止' : 'スキャン開始'}
        </span>
        <div
          className={`relative inline-block w-12 h-6 transition duration-200 ease-linear ${
            isScanCamera ? 'bg-blue-500' : 'bg-red-500'
          } rounded-full`}
          onClick={handleToggleSubscription}
        >
          <span
            className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ease-linear transform ${
              isScanCamera ? 'translate-x-6' : ''
            }`}
          ></span>
        </div>
      </div>
    </div>
  );
};

export default QrcodeReader;

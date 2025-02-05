import { useRef, useEffect, type RefObject, MutableRefObject } from 'react';
import SignaturePad from 'signature_pad';

type UseSignaturePadReturn = {
  canvasRef: RefObject<HTMLCanvasElement>;
  clear: () => void;
  toDataURL: (type?: string, quality?: number) => string | null;
};

const drawGrid = (canvas: HTMLCanvasElement) => {
  const context = canvas.getContext('2d');
  if (context) {
    const width = canvas.width;
    const height = canvas.height;
    const gridSize = 10;

    context.clearRect(0, 0, width, height); // 既存の内容をクリア
    context.strokeStyle = '#8888';
    context.lineWidth = 0.5;

    for (let x = 0; x <= width; x += gridSize) {
      context.beginPath();
      context.moveTo(x, 0);
      context.lineTo(x, height);
      context.stroke();
    }

    for (let y = 0; y <= height; y += gridSize) {
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(width, y);
      context.stroke();
    }
  }
};

export const useSignaturePad = (): UseSignaturePadReturn => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const signaturePadRef = useRef<SignaturePad | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const preventDefault = (e: Event) => e.preventDefault();

      canvas.addEventListener('touchstart', preventDefault);
      canvas.addEventListener('touchmove', preventDefault);
      canvas.addEventListener('touchend', preventDefault);

      signaturePadRef.current = new SignaturePad(canvasRef.current);
      drawGrid(canvasRef.current);

      return () => {
        canvas.removeEventListener('touchstart', preventDefault);
        canvas.removeEventListener('touchmove', preventDefault);
        canvas.removeEventListener('touchend', preventDefault);
        signaturePadRef.current?.off();
        signaturePadRef.current = null;
      };
    }
  }, []);

  const clear = () => {
    if (canvasRef.current && signaturePadRef.current) {
      signaturePadRef.current.clear();
      drawGrid(canvasRef.current); // クリア後に格子線を再描画
    }
  };

  const toDataURL = (
    type: string = 'image/png',
    quality: number = 1.0
  ): string | null => {
    return signaturePadRef.current?.toDataURL(type, quality) || null;
  };

  return {
    canvasRef,
    clear,
    toDataURL,
  };
};

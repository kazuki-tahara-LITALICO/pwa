import { useRef, useEffect, type RefObject, MutableRefObject } from 'react';
import SignaturePad from 'signature_pad';

type UseSignaturePadReturn = {
  canvasRef: RefObject<HTMLCanvasElement>;
  clear: () => void;
  toDataURL: (type?: string, quality?: number) => string | null;
};

export const useSignaturePad = (): UseSignaturePadReturn => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const signaturePadRef = useRef<SignaturePad | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      signaturePadRef.current = new SignaturePad(canvasRef.current);
    }

    return () => {
      signaturePadRef.current?.off();
      signaturePadRef.current = null;
    };
  }, []);

  const clear = () => {
    signaturePadRef.current?.clear();
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

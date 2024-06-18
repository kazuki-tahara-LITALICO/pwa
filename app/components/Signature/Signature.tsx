import { useSignaturePad } from './hooks/useSignature';

const Signature = () => {
  const { canvasRef, clear, toDataURL } = useSignaturePad();

  const handleSave = () => {
    const dataURL = toDataURL();
    console.info(dataURL);
  };

  return (
    <div className="select-none">
      <canvas ref={canvasRef} className="border border-black outline-none" />
      <div className="flex justify-center mt-5">
        <button
          className="bg-blue-500 text-white text-sm font-bold py-3 px-4 rounded mr-2 touch-none"
          onClick={handleSave}
        >
          保存
        </button>
        <button
          className="bg-red-500 text-white text-sm font-bold py-3 px-4 rounded mr-2"
          onClick={clear}
        >
          削除
        </button>
      </div>
    </div>
  );
};

export default Signature;

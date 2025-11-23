// src/app/(co-owner)/profile/usage-history/components/signaturePad.tsx
'use client';

import { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';

interface SignaturePadProps {
  onSave: (dataUrl: string) => void;
  onClear: () => void;
}

export default function SignaturePad({ onSave, onClear }: SignaturePadProps) {
  const sigRef = useRef<SignatureCanvas>(null);
  const [isEmpty, setIsEmpty] = useState(true);

  const handleClear = () => {
    sigRef.current?.clear();
    setIsEmpty(true);
    onClear();
  };

  const handleSave = () => {
    if (sigRef.current?.isEmpty()) return;
    const dataUrl = sigRef.current?.toDataURL('image/png');
    if (dataUrl) {
      setIsEmpty(false);
      onSave(dataUrl);
    }
  };

  const handleBegin = () => setIsEmpty(false);

  return (
    <div className="space-y-3">
      <div className="border-2 border-dashed border-gray-300 rounded-lg overflow-hidden bg-gray-50">
        <SignatureCanvas
          ref={sigRef}
          penColor="black"
          canvasProps={{
            className: 'w-full h-48',
          }}
          onBegin={handleBegin}
        />
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleClear}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
        >
          Xóa
        </button>
        <button
          onClick={handleSave}
          disabled={isEmpty}
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          Lưu chữ ký
        </button>
      </div>
    </div>
  );
}
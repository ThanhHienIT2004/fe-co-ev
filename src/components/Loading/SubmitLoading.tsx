// components/ui/SubmitLoading.tsx
import { Loader2 } from 'lucide-react';

export default function SubmitLoading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-4 animate-pulse">
        <Loader2 className="w-12 h-12 text-teal-600 animate-spin" />
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-800">Đang cập nhật xe...</p>
          <p className="text-sm text-gray-500 mt-1">Vui lòng chờ trong giây lát</p>
        </div>
      </div>
    </div>
  );
}
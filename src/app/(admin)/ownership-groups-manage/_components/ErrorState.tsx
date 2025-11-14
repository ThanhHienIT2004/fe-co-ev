// app/admin/ownership-groups/components/ErrorState.tsx
import { AlertCircle } from 'lucide-react';

type Props = {
  message: string;
};

export default function ErrorState({ message }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 flex items-center justify-center p-6">
      <div className="text-center bg-white rounded-3xl shadow-2xl p-10 max-w-md">
        <AlertCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
        <p className="text-2xl font-bold text-red-600">Lỗi tải dữ liệu</p>
        <p className="text-gray-600 mt-2">{message}</p>
        <button onClick={() => window.location.reload()} className="mt-6 px-8 py-4 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition font-bold">
          Thử lại
        </button>
      </div>
    </div>
  );
}
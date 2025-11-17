// src/app/admin/_component/DeleteConfirmModal.tsx
"use client";
import { X, Trash2 } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 animate-in fade-in zoom-in duration-200">
        {/* Icon + Tiêu đề */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center">
            <Trash2 className="w-6 h-6 text-rose-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Xác nhận xóa</h3>
        </div>

        {/* Nội dung */}
        <p className="text-gray-600 mb-6">
          Xóa người dùng này? <strong className="text-rose-600">Dữ liệu sẽ không thể khôi phục.</strong>
        </p>

        {/* Nút - giống Home */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition"
          >
            Hủy
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-gradient-to-r from-rose-600 to-red-600 text-white py-2.5 rounded-xl font-medium hover:shadow-lg transition"
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  );
}
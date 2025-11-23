// src/app/admin/_component/DeleteProfileModal.tsx
"use client";

import { Trash2, X } from "lucide-react";
import { deleteProfile } from "@/libs/apis/profile";

export default function DeleteProfileModal({
  userId,
  onClose,
  onSuccess,
}: {
  userId: number;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const handleDelete = async () => {
    try {
      await deleteProfile(userId);
      onSuccess();
      onClose();
    } catch (err: any) {
      alert(err.message || "Xóa thất bại");
    }
  };

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
          Xóa hồ sơ người dùng này?{" "}
          <strong className="text-rose-600">
            Dữ liệu sẽ không thể khôi phục.
          </strong>
        </p>

        {/* Nút */}
        <div className="flex gap-3">
          <button
            onClick={handleDelete}
            className="flex-1 bg-gradient-to-r from-rose-600 to-red-600 text-white py-2.5 rounded-xl font-medium hover:shadow-lg transition"
          >
            Xóa
          </button>
          
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-xl font-semibold shadow"
          >
            Hủy
          </button>
        </div>
      </div>
    </div>
  );
}

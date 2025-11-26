'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import VehicleCostForm from '@/app/(co-owner)/group-funds/vehicle-cost/components/VehicleCostForm';
import { ArrowLeft } from 'lucide-react';

export default function CreateVehicleCostPage() {
  const { groupId } = useParams<{ groupId: string }>();

  // QUAN TRỌNG: DÙNG CHÍNH XÁC groupId từ URL, KHÔNG fallback '1' nữa!
  // Vì khi vào /create/2 → groupId = "2", nếu ?? '1' sẽ bị ghi đè thành 1 → sai hoàn toàn!
  const GROUP_ID = groupId; // ← Đây là dòng fix lỗi chính!

  // Nếu vẫn muốn fallback an toàn (khi không có params), dùng:
  // const GROUP_ID = groupId || '1';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">

        {/* Back Button */}
        <Link
          href={`/group-funds/vehicle-cost?groupId=${GROUP_ID || '1'}`}
          className="inline-flex items-center gap-2.5 text-blue-600 hover:text-blue-800 font-semibold mb-8 transition-all hover:-translate-x-1 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Quay lại danh sách chi phí
        </Link>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 px-8 py-10 text-white">
            <h1 className="text-4xl font-bold tracking-tight">
              Thêm Chi Phí Xe & Thanh Toán Từ Quỹ
            </h1>
            <p className="text-blue-100 text-lg mt-2 font-medium">
              Nhóm ID: <span className="font-bold">{GROUP_ID || 'Chưa xác định'}</span>
            </p>
          </div>

          {/* Form - BÂY GIỜ ĐÃ NHẬN ĐÚNG groupId */}
          <div className="p-8 lg:p-10 bg-gray-50/30">
            <VehicleCostForm groupId={GROUP_ID!} />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500 text-sm">
          <p>Chi phí sẽ được lưu tự động • Quỹ được cập nhật theo thời gian thực</p>
        </div>
      </div>
    </div>
  );
}
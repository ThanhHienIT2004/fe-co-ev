"use client";

import { useCreateVehicle } from '@/libs/hooks/useVehicles';
import { useRouter } from 'next/navigation';
import VehicleForm from '../../_component/VehicleForm';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CreateVehiclePage() {
  const { mutate: createVehicle, isPending } = useCreateVehicle();
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    await createVehicle(data);
    router.push('/vehicles-manage');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* HEADER + NÚT QUAY LẠI */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/vehicles-manage"
            className="group flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:bg-gray-50"
          >
            <ArrowLeft className="w-5 h-5 text-teal-600 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium text-gray-700">Quay lại danh sách</span>
          </Link>
          <h1 className="text-3xl font-black text-gray-800 tracking-tight">Thêm xe mới</h1>
        </div>

        {/* FORM CARD - SIÊU ĐẸP */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-teal-100">
          {/* Icon + Tiêu đề phụ */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-black text-xl">+</span>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-700">Tạo xe đồng sở hữu</p>
              <p className="text-sm text-gray-500">Điền đầy đủ thông tin để thêm xe vào hệ thống</p>
            </div>
          </div>

          <VehicleForm
            onSubmit={handleSubmit}
            submitText={isPending ? "Đang tạo..." : "Tạo xe"}
            disabled={isPending}
          />
        </div>

        {/* HƯỚNG DẪN NHỎ */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Sau khi tạo, xe sẽ xuất hiện trong danh sách và sẵn sàng cho nhóm đồng sở hữu.
          </p>
        </div>
      </div>
    </div>
  );
}
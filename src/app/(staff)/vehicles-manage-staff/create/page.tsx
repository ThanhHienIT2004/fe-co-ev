"use client";

import { useCreateVehicle } from '@/libs/hooks/useVehicles';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Car, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import SubmitLoading from '@/components/Loading/SubmitLoading';
import VehicleForm from '@/app/(admin)/_component/VehicleForm';

export default function CreateVehiclePage() {
  const { mutate: createVehicle} = useCreateVehicle();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false); // ← Thêm state này
  const [success, setSuccess] = useState(false);

const handleSubmit = async (data: any) => {
    setIsLoading(true); // Bắt đầu loading
    try {
      await createVehicle(data);
      setSuccess(true);
      setTimeout(() => router.push('/vehicles-manage-staff'), 1200);
    } catch (error) {
      console.error("Tạo xe thất bại:", error);
      // toast.error("Có lỗi xảy ra");
    } finally {
      setIsLoading(false); // Luôn tắt loading
    }
  };

  return (
    <>
    {isLoading && <SubmitLoading />}
      {success && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl p-10 flex flex-col items-center gap-5 animate-in fade-in zoom-in">
            <CheckCircle className="w-20 h-20 text-green-500" />
            <p className="text-2xl font-bold text-gray-800">Tạo xe thành công!</p>
            <p className="text-gray-600">Đang chuyển về danh sách...</p>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* HEADER + NÚT QUAY LẠI */}
          <div className="flex items-center gap-4 mb-8">
            <Link
              href="/vehicles-manage-staff"
              className="group flex items-center gap-2 bg-white px-5 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:bg-gray-50 border border-gray-100"
            >
              <ArrowLeft className="w-5 h-5 text-teal-600 group-hover:-translate-x-1 transition-transform" />
              <span className="font-semibold text-gray-700">Quay lại danh sách</span>
            </Link>
            <div className="flex items-center gap-3">
              <Car className="w-10 h-10 text-teal-600" />
              <h1 className="text-3xl font-black text-gray-800 tracking-tight">Thêm xe mới</h1>
            </div>
          </div>

          {/* CARD FORM - SIÊU ĐẸP & CHUYÊN NGHIỆP */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-teal-100 overflow-hidden">
            {/* Header nhỏ trong card */}
            <div className="flex items-center gap-4 mb-10">
              <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-xl">
                <span className="text-white font-black text-2xl">+</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Tạo xe đồng sở hữu</h2>
                <p className="text-gray-600 mt-1">Điền đầy đủ thông tin để thêm xe vào hệ thống quản lý</p>
              </div>
            </div>

            {/* Form - Dùng chung với trang Edit */}
            <VehicleForm
              onSubmit={handleSubmit}
              submitText="Tạo xe mới"
              defaultValues={{
                vehicle_name: '',
                license_plate: '',
                description: '',
              }}
            />
          </div>

          {/* GHI CHÚ DƯỚI CHÂN */}
          <div className="mt-10 text-center bg-white/70 backdrop-blur-sm rounded-2xl py-6 px-8 shadow-lg border border-teal-100">
            <p className="text-sm text-gray-700">
              Sau khi tạo thành công, xe sẽ xuất hiện trong danh sách và có thể được chia sẻ với nhóm đồng sở hữu ngay lập tức.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
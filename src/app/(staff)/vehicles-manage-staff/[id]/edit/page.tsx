"use client";

import VehicleForm from '@/app/(admin)/_component/VehicleForm';
import { useUpdateVehicle, useVehicle } from '@/libs/hooks/useVehicles';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Car } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import SubmitLoading from '@/components/Loading/SubmitLoading';
import { enqueueSnackbar } from 'notistack';

export default function EditVehiclePage() {
  const { id } = useParams();
  const { data: vehicle, isLoading: isFetching } = useVehicle(id as string);
  const {updateVehicle } = useUpdateVehicle();
  const router = useRouter();

  // State loading khi đang submit
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      await updateVehicle(id as string, data);
      router.push('/vehicles-manage');
      enqueueSnackbar("Cập nhật xe thành công!", { variant: "success" });
    } catch (error) {
      enqueueSnackbar("Cập nhật xe thất bại!", { variant: "error" });
    } finally {
      setIsSubmitting(false); // Quan trọng: luôn tắt loading
    }
  };

  // Loading khi fetch dữ liệu xe
  if (isFetching) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-teal-600 mx-auto mb-6"></div>
          <p className="text-gray-600 font-medium">Đang tải thông tin xe...</p>
        </div>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="text-center py-32">
        <Car className="w-20 h-20 text-gray-400 mx-auto mb-6" />
        <p className="text-xl font-medium text-gray-700">Không tìm thấy xe</p>
        <Link href="/vehicles-manage" className="text-teal-600 hover:underline mt-4 inline-block">
          ← Quay lại danh sách
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Loading toàn màn hình khi đang cập nhật */}
      {isSubmitting && <SubmitLoading />}

      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* HEADER + NÚT QUAY LẠI */}
          <div className="flex items-center gap-5 mb-10">
            <Link
              href="/vehicles-manage"
              className="group flex items-center gap-3 bg-white px-6 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-gray-50 border border-gray-100"
            >
              <ArrowLeft className="w-6 h-6 text-teal-600 group-hover:-translate-x-1 transition-transform" />
              <span className="font-semibold text-gray-700">Quay lại danh sách</span>
            </Link>
            <div className="flex items-center gap-4">
              <Car className="w-10 h-10 text-teal-600" />
              <h1 className="text-4xl font-black text-gray-800 tracking-tight">Chỉnh sửa xe</h1>
            </div>
          </div>

          {/* CARD FORM - SIÊU ĐẸP */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-teal-100 overflow-hidden">
            {/* Header trong card */}
            <div className="flex items-center gap-4 mb-10">
              <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-xl">
                <span className="text-white font-black text-2xl">ID</span>
              </div>
              <div>
                <code className="text-lg font-mono text-teal-600 bg-teal-50 px-4 py-2 rounded-xl font-bold">
                  {vehicle.vehicle_id}
                </code>
                <p className="text-sm text-gray-500 mt-2">Mã định danh xe trong hệ thống</p>
              </div>
            </div>

            {/* Form */}
            <VehicleForm
              defaultValues={{
                vehicle_name: vehicle.vehicle_name || '',
                license_plate: vehicle.license_plate || '',
                description: vehicle.description || '',
              }}
              onSubmit={handleSubmit}
              submitText="Cập nhật xe"
            />
          </div>

          {/* GHI CHÚ */}
          <div className="mt-10 text-center bg-white/70 backdrop-blur-sm rounded-2xl py-6 px-8 shadow-lg border border-teal-100">
            <p className="text-sm text-gray-700">
              Cập nhật thông tin xe và nhấn{' '}
              <span className="font-bold text-teal-600">Cập nhật xe</span> để lưu thay đổi.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
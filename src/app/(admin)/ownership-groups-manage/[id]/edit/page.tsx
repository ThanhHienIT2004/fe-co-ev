"use client";

import VehicleForm from '@/app/(admin)/_component/VehicleForm';
import { useUpdateVehicle, useVehicle } from '@/libs/hooks/useVehicles';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function EditVehiclePage() {
  const { id } = useParams();
  const { data: vehicle, isLoading } = useVehicle(id as string);
  const { mutate: updateVehicle } = useUpdateVehicle();
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  const handleSubmit = async (data: any) => {
    await updateVehicle(id as string, data);
    router.push('/ownership-groups-manage');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* HEADER + NÚT QUAY LẠI */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/ownership-groups-manage"
            className="group flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:bg-gray-50"
          >
            <ArrowLeft className="w-5 h-5 text-teal-600 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium text-gray-700">Quay lại danh sách</span>
          </Link>
          <h1 className="text-3xl font-black text-gray-800 tracking-tight">Chỉnh sửa xe</h1>
        </div>

        {/* FORM CARD - ĐẸP & CHUYÊN NGHIỆP */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
              <span className="text-teal-600 font-bold text-lg">ID</span>
            </div>
            <code className="text-sm font-mono text-teal-600 bg-teal-50 px-3 py-1 rounded-lg">
              {vehicle?.vehicle_id}
            </code>
          </div>

          <VehicleForm
            defaultValues={{
              vehicle_name: vehicle?.vehicle_name || '',
              license_plate: vehicle?.license_plate || '',
              description: vehicle?.description || '',
            }}
            onSubmit={handleSubmit}
            submitText="Cập nhật xe"
          />
        </div>

        {/* FOOTER NOTE */}
        <p className="text-center text-sm text-gray-500 mt-8">
          Cập nhật thông tin xe và nhấn <span className="font-semibold text-teal-600">Cập nhật xe</span> để lưu
        </p>
      </div>
    </div>
  );
}
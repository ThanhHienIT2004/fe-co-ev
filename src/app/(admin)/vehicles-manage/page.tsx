// app/vehicles/page.tsx
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useDeleteVehicle, useVehicles } from '@/libs/hooks/useVehicles';

export default function VehiclesPage() {
  const { data: vehicles, isLoading, error } = useVehicles();
  const { mutate: deleteVehicle } = useDeleteVehicle();

  if (isLoading) return <p className="text-center py-10">Đang tải...</p>;
  if (error) return <p className="text-red-500">Lỗi: {error.message}</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Quản lý xe</h1>
        <Link
          href="/vehicles-manage/create"
          className="bg-teal-600 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-teal-700 transition"
        >
          <Plus className="w-5 h-5" /> Thêm xe
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles?.map((v) => (
          <div
            key={v.vehicle_id}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div className="relative h-48 bg-gray-100">
              <Image
                src={v.image_url || '/images-default.jpg'}
                alt={v.vehicle_name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-5">
              <h3 className="font-bold text-lg text-gray-800">{v.vehicle_name}</h3>
              <p className="text-sm text-teal-600 font-mono">{v.license_plate}</p>
              <p className="text-sm text-gray-600 mt-2 line-clamp-2">{v.description}</p>

              <div className="flex justify-end gap-2 mt-4">
                <Link
                  href={`/vehicles-manage/${v.vehicle_id}/edit`}
                  className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition"
                >
                  <Edit className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => deleteVehicle(v.vehicle_id)}
                  className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
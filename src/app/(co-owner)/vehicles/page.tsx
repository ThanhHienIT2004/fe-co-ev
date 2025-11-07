// app/vehicles/page.tsx
"use client";

import { useVehicles } from '@/libs/hooks/useVehicles';
import VehicleList from './_component/VehicleList';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default function VehiclesPage() {
  const { data: vehicles, isLoading, error } = useVehicles();

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">
              Danh sách xe đồng sở hữu
            </h1>
            <p className="text-lg text-gray-600 mt-2">
              {isLoading ? 'Đang tải...' : `${vehicles?.length || 0} xe sẵn sàng`}
            </p>
          </div>

          <Link
            href="/vehicles/create"
            className="group flex items-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
            Thêm xe mới
          </Link>
        </div>

        {/* LOADING */}
        {isLoading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse"
              >
                <div className="h-52 bg-gray-200"></div>
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-10 bg-gray-200 rounded mt-4"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-600 font-medium">Lỗi tải dữ liệu. Vui lòng thử lại.</p>
          </div>
        )}

        {/* DANH SÁCH */}
        {!isLoading && vehicles && <VehicleList vehicles={vehicles} />}
      </div>
    </main>
  );
}
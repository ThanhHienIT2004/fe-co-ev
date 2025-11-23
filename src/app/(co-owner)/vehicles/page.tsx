// app/vehicles/page.tsx
"use client";

import { useVehicles } from '@/libs/hooks/useVehicles';
import VehicleList from './_component/VehicleList';
import { Plus, Car, Users, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function VehiclesPage() {
  const { data: vehicles, isLoading, error } = useVehicles();

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50">
      {/* HERO SECTION */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-600/10 to-cyan-600/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4" />
              Đồng sở hữu xe hơi thông minh
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 tracking-tight">
              Danh sách xe
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-600">
                của nhóm bạn
              </span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
              Cùng sở hữu những chiếc xe sang trọng với chi phí chỉ bằng một phần nhỏ.
              Mọi thứ đã sẵn sàng cho hành trình tiếp theo.
            </p>
          </div>

          {/* STATS BAR */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/50 p-6 text-center transform hover:scale-105 transition-all duration-300">
              <Car className="w-10 h-10 text-teal-600 mx-auto mb-3" />
              <p className="text-3xl font-black text-gray-900">
                {isLoading ? '-' : vehicles?.length || 0}
              </p>
              <p className="text-gray-600 font-medium">Xe đang sở hữu</p>
            </div>
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/50 p-6 text-center transform hover:scale-105 transition-all duration-300">
              <Users className="w-10 h-10 text-cyan-600 mx-auto mb-3" />
              <p className="text-3xl font-black text-gray-900">4</p>
              <p className="text-gray-600 font-medium">Thành viên nhóm</p>
            </div>
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/50 p-6 text-center transform hover:scale-105 transition-all duration-300">
              <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-600">
                Tiết kiệm 70%
              </div>
              <p className="text-gray-600 font-medium mt-2">So với sở hữu riêng</p>
            </div>
          </div>

          {/* CTA BUTTON */}
          <div className="mt-12 text-center">
            <Link
              href="/vehicles/create"
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-bold text-lg px-10 py-5 rounded-2xl shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-110 hover:-translate-y-1"
            >
              <Plus className="w-7 h-7 group-hover:rotate-90 transition-transform duration-500" />
              Thêm xe mới vào nhóm
              <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10 pb-24">
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 lg:p-12">
          <div className="mb-10">
            <h2 className="text-4xl font-black text-gray-900 flex items-center gap-3">
              <Car className="w-10 h-10 text-teal-600" />
              Xe sẵn sàng sử dụng
            </h2>
            <p className="text-lg text-gray-600 mt-3">
              {isLoading
                ? 'Đang tải danh sách xe...'
                : vehicles && vehicles.length > 0
                ? `Có ${vehicles.length} xe đang chờ bạn và các thành viên`
                : 'Chưa có xe nào trong nhóm'}
            </p>
          </div>

          {/* LOADING STATE - GLASSMORPHISM */}
          {isLoading && (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white/60 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden border border-white/30 animate-pulse"
                >
                  <div className="h-64 bg-gradient-to-br from-gray-200 to-gray-300" />
                  <div className="p-6 space-y-4">
                    <div className="h-7 bg-gray-300 rounded-xl w-4/5" />
                    <div className="h-5 bg-gray-200 rounded-lg w-full" />
                    <div className="h-5 bg-gray-200 rounded-lg w-3/4" />
                    <div className="h-12 bg-gradient-to-r from-teal-200 to-cyan-200 rounded-xl mt-6" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ERROR STATE */}
          {error && (
            <div className="text-center py-20">
              <div className="bg-red-50 border-2 border-dashed border-red-300 rounded-3xl p-12">
                <div className="text-red-600 text-6xl mb-4">⚠️</div>
                <p className="text-xl font-bold text-red-700">Không thể tải danh sách xe</p>
                <p className="text-red-600 mt-2">Vui lòng thử lại sau vài phút</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-6 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
                >
                  Thử lại
                </button>
              </div>
            </div>
          )}

          {/* VEHICLE LIST */}
          {!isLoading && vehicles && vehicles.length > 0 && (
            <VehicleList vehicles={vehicles} />
          )}

          {/* EMPTY STATE */}
          {!isLoading && vehicles && vehicles.length === 0 && (
            <div className="text-center py-24">
              <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-3xl w-32 h-32 mx-auto mb-8 flex items-center justify-center">
                <Car className="w-16 h-16 text-gray-400" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                Chưa có xe nào trong nhóm
              </h3>
              <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
                Hãy là người đầu tiên thêm một chiếc xe tuyệt vời vào nhóm đồng sở hữu!
              </p>
              <Link
                href="/vehicles/create"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-bold text-lg px-10 py-5 rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:scale-105"
              >
                <Plus className="w-6 h-6" />
                Thêm xe đầu tiên
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* FLOATING ACTION BUTTON (Mobile) */}
      <Link
        href="/vehicles/create"
        className="fixed bottom-8 right-8 bg-gradient-to-r from-teal-500 to-cyan-600 text-white p-5 rounded-full shadow-2xl hover:shadow-cyan-600/50 transition-all hover:scale-110 z-50 lg:hidden"
      >
        <Plus className="w-8 h-8" />
      </Link>
    </main>
  );
}
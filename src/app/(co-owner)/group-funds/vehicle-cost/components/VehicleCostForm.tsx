'use client';

import { useEffect } from 'react';
import { useVehicleCost } from '@/libs/hooks/useVehicleCost';
import VehicleCostList from './VehicleCostList';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation'; // ← DÙNG CÁI NÀY!
import { format } from 'date-fns';
import { Plus, Car, Clock, AlertCircle, CheckCircle } from 'lucide-react';

export default function VehicleCostPage() {
  const searchParams = useSearchParams();
  const groupIdFromUrl = searchParams.get('groupId');

  // QUAN TRỌNG: Lấy từ query string, không phải params!
  const GROUP_ID = groupIdFromUrl || '1'; // fallback an toàn

  const { costs, loading, fetchAll } = useVehicleCost(GROUP_ID);

  useEffect(() => {
    if (GROUP_ID && GROUP_ID !== '1' || groupIdFromUrl) {
      fetchAll();
    }
  }, [GROUP_ID, fetchAll]);

  const totalCosts = costs.reduce((sum, c) => sum + Number(c.amount || 0), 0);
  const pendingCount = costs.filter(c => c.status === 'pending').length;
  const paidCount = costs.filter(c => c.status === 'paid').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12">
          <div>
            <h1 className="text-5xl font-bold text-gray-900 tracking-tight flex items-center gap-4">
              <Car className="w-12 h-12 text-blue-600" />
              Quản Lý Chi Phí Xe
            </h1>
            <p className="text-xl text-gray-600 mt-3">
              Nhóm ID: <span className="font-mono font-bold text-indigo-600 text-2xl">{GROUP_ID}</span>
            </p>
          </div>

          <Link
            href={`/group-funds/vehicle-cost/create/${GROUP_ID}`}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all hover:scale-105"
          >
            <Plus className="w-6 h-6" />
            Thêm chi phí mới
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition">
            <p className="text-gray-600 font-medium">Tổng chi phí</p>
            <p className="text-4xl font-bold text-red-600 mt-2">
              {loading ? '...' : `${totalCosts.toLocaleString('vi-VN')} ₫`}
            </p>
          </div>

          <div className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white rounded-3xl shadow-xl p-6">
            <p className="font-medium opacity-90">Chờ thanh toán</p>
            <p className="text-5xl font-bold mt-2">{loading ? '...' : pendingCount}</p>
            <AlertCircle className="w-16 h-16 opacity-80 mt-4" />
          </div>

          <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-3xl shadow-xl p-6">
            <p className="font-medium opacity-90">Đã thanh toán</p>
            <p className="text-5xl font-bold mt-2">{loading ? '...' : paidCount}</p>
            <CheckCircle className="w-16 h-16 opacity-80 mt-4" />
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition">
            <p className="text-gray-600 font-medium">Cập nhật lúc</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              {format(new Date(), 'HH:mm')}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {format(new Date(), 'dd/MM/yyyy')}
            </p>
            <Clock className="w-12 h-12 text-indigo-500 opacity-80 mt-4" />
          </div>
        </div>

        {/* Danh sách */}
        {loading ? (
          <div className="p-20 text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
            <p className="text-gray-600 mt-6 text-lg">Đang tải chi phí...</p>
          </div>
        ) : costs.length === 0 ? (
          <div className="p-20 text-center bg-white rounded-3xl shadow-xl">
            <Car className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Chưa có chi phí nào</h3>
            <Link
              href={`/group-funds/vehicle-cost/create/${GROUP_ID}`}
              className="inline-flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition"
            >
              <Plus className="w-6 h-6" />
              Thêm chi phí đầu tiên
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-6">
              <h2 className="text-2xl font-bold">Danh sách chi phí xe</h2>
            </div>
            <div className="p-8">
              <VehicleCostList costs={costs} groupId={GROUP_ID} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
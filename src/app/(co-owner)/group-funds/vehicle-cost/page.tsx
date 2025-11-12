'use client';
import { useEffect } from 'react';
import { useVehicleCost } from '@/libs/hooks/useVehicleCost';
import VehicleCostList from './components/VehicleCostList';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { format } from 'date-fns';

export default function VehicleCostPage() {
  const { groupId } = useParams<{ groupId: string }>();
  const GROUP_ID = groupId ?? 'group_001';

  const { costs, loading, fetchAll } = useVehicleCost(GROUP_ID);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const totalCosts = costs.reduce((sum, c) => sum + Number(c.amount), 0);
  const pendingCount = costs.filter(c => c.status === 'pending').length;
  const paidCount = costs.filter(c => c.status === 'paid').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-teal-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Chi Phí Xe</h1>
            <p className="text-gray-600 mt-1">Nhóm: <strong>{GROUP_ID}</strong></p>
          </div>
          <Link
            href={`/group-funds/vehicle-cost/create?groupId=${GROUP_ID}`}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Thêm chi phí
          </Link>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
            <p className="text-sm font-medium text-gray-600">Tổng chi phí</p>
            <p className="text-3xl font-bold text-red-600 mt-1">
              {loading ? '...' : `${totalCosts.toLocaleString('vi-VN')}đ`}
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
            <p className="text-sm font-medium text-gray-600">Chờ thanh toán</p>
            <p className="text-3xl font-bold text-yellow-600 mt-1">{loading ? '...' : pendingCount}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
            <p className="text-sm font-medium text-gray-600">Đã thanh toán</p>
            <p className="text-3xl font-bold text-green-600 mt-1">{loading ? '...' : paidCount}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
            <p className="text-sm font-medium text-gray-600">Cập nhật</p>
            <p className="text-lg font-bold text-gray-900 mt-1">
              {format(new Date(), 'HH:mm')}
            </p>
          </div>
        </div>

        {/* List */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            <p className="text-gray-600 mt-4">Đang tải chi phí...</p>
          </div>
        ) : costs.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-16 text-center border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Chưa có chi phí nào</h3>
            <p className="text-gray-600 mb-6">Thêm chi phí đầu tiên ngay bây giờ!</p>
            <Link href={`/group-funds/vehicle-cost/create?groupId=${GROUP_ID}`} className="bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700">
              Thêm chi phí
            </Link>
          </div>
        ) : (
          <VehicleCostList costs={costs} groupId={GROUP_ID} />
        )}
      </div>
    </div>
  );
}
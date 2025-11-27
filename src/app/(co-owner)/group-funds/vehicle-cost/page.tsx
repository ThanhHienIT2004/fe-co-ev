'use client';

import { useEffect, useState } from 'react';
import { useVehicleCost } from '@/libs/hooks/useVehicleCost';
import VehicleCostList from './components/VehicleCostList';
import Link from 'next/link';
import { format } from 'date-fns';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { Car, Loader2 } from 'lucide-react';

interface GroupInfo {
  groupId: number;
  groupName: string;
  ownerId: number;
  vehicleId?: number;
  vehiclePlate?: string;
}

export default function VehicleCostPage() {
  const searchParams = useSearchParams();
  const urlGroupId = searchParams.get('groupId');
  const groupId = urlGroupId || '3';

  const [groupInfo, setGroupInfo] = useState<GroupInfo | null>(null);
  const [groupLoading, setGroupLoading] = useState(true);

  // Lấy thông tin nhóm + xe từ API ownership (giống hệt trang quỹ)
  useEffect(() => {
    const fetchGroupInfo = async () => {
      try {
        setGroupLoading(true);
        const res = await axios.get(`http://localhost:8085/payment/ownership/${groupId}`);
        const data = res.data;
        setGroupInfo(data);

        // Lưu vào localStorage để các trang khác dùng
        localStorage.setItem('selectedGroup', JSON.stringify({
          groupId: data.groupId,
          groupName: data.groupName,
          ownerId: data.ownerId,
          vehicleId: data.vehicleId || null,
          vehiclePlate: data.vehiclePlate || null,
        }));
      } catch (err) {
        console.error('Lỗi lấy thông tin nhóm:', err);
      } finally {
        setGroupLoading(false);
      }
    };
    fetchGroupInfo();
  }, [groupId]);

  // Dùng hook mới – giờ gọi kiểu object hoặc kiểu cũ đều được!
  const { costs, loading: costsLoading, fetchAll } = useVehicleCost({
    groupId,
    vehicleId: groupInfo?.vehicleId || null,
  });

  // Reload khi focus tab
  useEffect(() => {
    const handler = () => fetchAll();
    window.addEventListener('focus', handler);
    return () => window.removeEventListener('focus', handler);
  }, [fetchAll]);

  const total = costs.reduce((s, c) => s + Number(c.amount || 0), 0);
  const pending = costs.filter(c => c.status === 'pending').length;
  const paid = costs.filter(c => c.status === 'paid').length;

  if (groupLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-teal-50 flex items-center justify-center">
        <Loader2 className="w-16 h-16 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-teal-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header đẹp như trang quỹ */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
            <Car className="w-10 h-10 text-cyan-600" />
            Chi Phí Xe – {groupInfo?.groupName || `Nhóm ${groupId}`}
          </h1>
          <div className="flex flex-wrap items-center gap-4 mt-3 text-gray-600">
            {groupInfo?.vehiclePlate ? (
              <span className="flex items-center gap-2 font-semibold text-indigo-700">
                <Car className="w-5 h-5" />
                {groupInfo.vehiclePlate}
              </span>
            ) : (
              <span className="italic text-gray-500">Chưa liên kết xe</span>
            )}
            <span>•</span>
            <span>Chủ nhóm: User {groupInfo?.ownerId}</span>
            <span>•</span>
            <span className="text-sm bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
              ID: {groupId}
              {groupInfo?.vehicleId && ` • Xe ID: ${groupInfo.vehicleId}`}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center mb-10">
          <p className="text-gray-600">Theo dõi chi phí bảo dưỡng, sửa chữa xe nhóm</p>
          <Link
            href={`/group-funds/vehicle-cost/create?groupId=${groupId}${groupInfo?.vehicleId ? `&vehicleId=${groupInfo.vehicleId}` : ''}`}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-xl transition flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Thêm chi phí
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
            <p className="text-sm text-gray-600">Tổng chi phí</p>
            <p className="text-3xl font-bold text-red-600 mt-2">
              {costsLoading ? '...' : `${total.toLocaleString('vi-VN')} ₫`}
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
            <p className="text-sm text-gray-600">Chờ thanh toán</p>
            <p className="text-3xl font-bold text-orange-500 mt-2">{costsLoading ? '...' : pending}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
            <p className="text-sm text-gray-600">Đã thanh toán</p>
            <p className="text-3xl font-bold text-green-600 mt-2">{costsLoading ? '...' : paid}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
            <p className="text-sm text-gray-600">Cập nhật lúc</p>
            <p className="text-xl font-bold text-gray-800 mt-2">
              {format(new Date(), 'HH:mm dd/MM')}
            </p>
          </div>
        </div>

        {/* Danh sách chi phí */}
        {costsLoading ? (
          <div className="text-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-cyan-600 mx-auto" />
            <p className="mt-4 text-gray-600 text-lg">Đang tải chi phí xe...</p>
          </div>
        ) : costs.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-20 text-center">
            <Car className="w-32 h-32 mx-auto mb-8 text-gray-300" />
            <h3 className="text-3xl font-bold mb-4 text-gray-700">Chưa có chi phí nào</h3>
            <Link
              href={`/group-funds/vehicle-cost/create?groupId=${groupId}${groupInfo?.vehicleId ? `&vehicleId=${groupInfo.vehicleId}` : ''}`}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-2xl transition text-lg"
            >
              + Thêm chi phí đầu tiên
            </Link>
          </div>
        ) : (
          <VehicleCostList costs={costs} groupId={groupId} />
        )}
      </div>
    </div>
  );
}
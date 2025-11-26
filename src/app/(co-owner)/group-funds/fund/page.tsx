// app/group-funds/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useGroupFund } from '@/libs/hooks/useGroupFund';
import Link from 'next/link';
import FundList from './components/FundList';
import { useSearchParams } from 'next/navigation';
import { format } from 'date-fns';
import axios from 'axios';
import { Loader2, Users, Car } from 'lucide-react';

interface GroupInfo {
  groupId: number;
  groupName: string;
  ownerId: number;
  vehicleId?: number;
  vehiclePlate?: string;
  ownerName?: string;
}

export default function FundListPage() {
  const searchParams = useSearchParams();
  const groupIdFromUrl = searchParams.get('groupId');
  const groupId = groupIdFromUrl || '1';

  const { funds, loading: fundsLoading, fetchAll, deleteFund } = useGroupFund(groupId);

  const [groupInfo, setGroupInfo] = useState<GroupInfo | null>(null);
  const [groupLoading, setGroupLoading] = useState(true);
  const [groupError, setGroupError] = useState('');

  // Lấy thông tin nhóm từ API ownership
  useEffect(() => {
    const fetchGroupInfo = async () => {
      try {
        setGroupLoading(true);
        setGroupError('');
        const res = await axios.get(`http://localhost:8082/payment/ownership/${groupId}`);
        setGroupInfo(res.data);

        // Lưu vào localStorage để trang tạo quỹ + chi phí xe dùng luôn
        localStorage.setItem('selectedGroup', JSON.stringify(res.data));
      } catch (err: any) {
        console.error('Lỗi lấy thông tin nhóm:', err);
        setGroupError('Không thể tải thông tin nhóm');
      } finally {
        setGroupLoading(false);
      }
    };

    if (groupId) {
      fetchGroupInfo();
    }
  }, [groupId]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const handleDelete = async (id: number) => {
    if (!confirm('Xóa quỹ này? Dữ liệu sẽ mất vĩnh viễn!')) return;
    try {
      await deleteFund(id);
      alert('Xóa thành công!');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Xóa thất bại');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-green-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header với thông tin nhóm */}
        <div className="mb-10">
          {groupLoading ? (
            <div className="flex items-center gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
              <span className="text-lg text-gray-600">Đang tải thông tin nhóm...</span>
            </div>
          ) : groupError ? (
            <div className="text-red-600 font-medium">{groupError}</div>
          ) : groupInfo ? (
            <>
              <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
                <Users className="w-10 h-10 text-indigo-600" />
                Quỹ chung – {groupInfo.groupName}
              </h1>
              <div className="flex flex-wrap items-center gap-4 mt-4 text-gray-600">
                {groupInfo.vehiclePlate ? (
                  <span className="flex items-center gap-2 font-semibold text-indigo-700">
                    <Car className="w-5 h-5" />
                    {groupInfo.vehiclePlate}
                  </span>
                ) : (
                  <span className="italic text-gray-500">Chưa liên kết xe</span>
                )}
                <span>•</span>
                <span>Chủ nhóm: User {groupInfo.ownerId}</span>
                <span>•</span>
                <span className="text-sm bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
                  ID: {groupInfo.groupId}
                  {groupInfo.vehicleId && ` • Xe ID: ${groupInfo.vehicleId}`}
                </span>
              </div>
            </>
          ) : (
            <h1 className="text-4xl font-bold text-gray-900">
              Danh sách quỹ – Nhóm {groupId}
            </h1>
          )}
        </div>

        {/* NÚT TẠO QUỸ MỚI – ĐÃ FIX ĐÚNG LINK!!! */}
        <div className="flex justify-between items-center mb-10">
          <p className="text-gray-600">Quản lý quỹ nhóm một cách minh bạch</p>
          <Link
            href={`/group-funds/fund/create?groupId=${groupId}`}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all flex items-center gap-2 shadow-md"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Tạo quỹ mới
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
            <p className="text-sm font-medium text-gray-600">Tổng số quỹ</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{funds.length}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
            <p className="text-sm font-medium text-gray-600">Tổng số dư</p>
            <p className="text-3xl font-bold text-green-600 mt-1">
              {funds.reduce((s, f) => s + Number(f.balance || 0), 0).toLocaleString('vi-VN')} ₫
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
            <p className="text-sm font-medium text-gray-600">Cập nhật lúc</p>
            <p className="text-lg font-bold text-gray-900 mt-1">
              {format(new Date(), 'HH:mm, dd/MM/yyyy')}
            </p>
          </div>
        </div>

        {/* Danh sách quỹ */}
        <FundList
          funds={funds}
          loading={fundsLoading}
          onDelete={handleDelete}
          groupId={Number(groupId)}
        />

        {/* Footer */}
        <div className="mt-16 text-center text-sm text-gray-500 border-t pt-6">
          Cập nhật lúc: <strong>{format(new Date(), 'HH:mm:ss, dd/MM/yyyy')}</strong>
        </div>
      </div>
    </div>
  );
}
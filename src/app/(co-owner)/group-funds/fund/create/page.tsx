// app/group-funds/fund/create/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useGroupFund } from '@/libs/hooks/useGroupFund';
import { ArrowLeft, Loader2, AlertCircle } from 'lucide-react';

interface GroupInfo {
  groupId: number;
  groupName: string;
  ownerId: number;
  vehiclePlate?: string;
}

export default function CreateFundPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const groupIdFromUrl = searchParams.get('groupId');

  // Nếu không có groupId trong URL thì lấy từ localStorage (đã lưu ở trang danh sách)
  
  const storedGroup = typeof window !== 'undefined' ? localStorage.getItem('selectedGroup') : null;
  const groupInfo: GroupInfo | null = storedGroup ? JSON.parse(storedGroup) : null;

  const groupId = groupIdFromUrl || groupInfo?.groupId?.toString() || '';

  // Giả sử userId hiện tại bạn đang hard-code hoặc lấy từ auth (ví dụ 1)
  // Thay đổi theo hệ thống auth thực tế của bạn
  const currentUserId = 1;

  const { create } = useGroupFund(groupId);

  const [fundName, setFundName] = useState('');
  const [initialBalance, setInitialBalance] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!groupId) {
      setError('Không tìm thấy thông tin nhóm. Vui lòng quay lại danh sách quỹ.');
      return;
    }

    if (!fundName.trim()) {
      setError('Vui lòng nhập tên quỹ');
      return;
    }

    const balanceNum = parseFloat(initialBalance.replace(/,/g, '')) || 0;

    setLoading(true);
    setError('');

    try {
      await create(fundName.trim(), balanceNum, currentUserId);

      // Thành công → quay về danh sách
      alert('Tạo quỹ thành công!');
      router.push(`/group-funds?groupId=${groupId}`);
    } catch (err: any) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          err.message ||
          'Tạo quỹ thất bại, vui lòng thử lại'
      );
    } finally {
      setLoading(false);
    }
  };

  // Format số tiền khi nhập
  const formatCurrency = (value: string) => {
    const num = value.replace(/\D/g, '');
    if (!num) return '';
    return Number(num).toLocaleString('vi-VN');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-green-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Back button */}
        <Link
          href={`/group-funds?groupId=${groupId}`}
          className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Quay lại danh sách quỹ
        </Link>

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Tạo quỹ mới
          </h1>
          {groupInfo && (
            <p className="text-lg text-gray-600">
              Nhóm: <span className="font-semibold text-indigo-700">{groupInfo.groupName}</span>
              {groupInfo.vehiclePlate && (
                <span className="ml-3 text-sm bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
                  {groupInfo.vehiclePlate}
                </span>
              )}
            </p>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {/* Tên quỹ */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tên quỹ <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={fundName}
                onChange={(e) => setFundName(e.target.value)}
                placeholder="Ví dụ: Quỹ bảo trì xe, Quỹ du lịch nhóm..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                disabled={loading}
              />
            </div>

            {/* Số dư ban đầu */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Số dư ban đầu (₫)
              </label>
              <input
                type="text"
                value={initialBalance}
                onChange={(e) => setInitialBalance(formatCurrency(e.target.value))}
                placeholder="0"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                disabled={loading}
              />
              <p className="mt-2 text-sm text-gray-500">
                Để trống hoặc 0 nếu quỹ bắt đầu từ số dư 0
              </p>
            </div>

            {/* Thông báo lỗi */}
            {error && (
              <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Nút submit */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading || !fundName.trim()}
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3.5 rounded-xl font-semibold hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Đang tạo...
                  </>
                ) : (
                  'Tạo quỹ mới'
                )}
              </button>

              <Link
                href={`/group-funds?groupId=${groupId}`}
                className="px-8 py-3.5 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition"
              >
                Hủy
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
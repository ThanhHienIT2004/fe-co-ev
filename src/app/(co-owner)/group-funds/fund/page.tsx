'use client';
import { useEffect } from 'react';
import { useGroupFund } from '@/libs/hooks/useGroupFund';
import Link from 'next/link';
import FundList from './components/FundList';
import { useSearchParams } from 'next/navigation';
import { format } from 'date-fns';

export default function FundListPage() {
  const searchParams = useSearchParams();
  const groupId = searchParams.get('groupId') || '1'; // Lấy groupId từ URL hoặc fallback

  const { funds, loading, fetchAll, deleteFund } = useGroupFund(groupId);

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
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Danh Sách Quỹ Chung</h1>
            <p className="text-gray-600 mt-1">Quản lý quỹ nhóm một cách minh bạch</p>
          </div>
          <Link
            href={`/group-funds/${groupId}/fund/create`}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all flex items-center gap-2"
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
              {funds.reduce((s, f) => s + Number(f.balance || 0), 0).toLocaleString('vi-VN')}đ
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
            <p className="text-sm font-medium text-gray-600">Cập nhật</p>
            <p className="text-lg font-bold text-gray-900 mt-1">
              {format(new Date(), 'HH:mm')}
            </p>
          </div>
        </div>

        {/* Fund List */}
        <FundList funds={funds} loading={loading} onDelete={handleDelete} groupId={Number(groupId)} />

        <div className="mt-12 text-center text-sm text-gray-500">
          Cập nhật lúc: <strong>{format(new Date(), 'HH:mm, dd/MM/yyyy')}</strong>
        </div>
      </div>
    </div>
  );
}

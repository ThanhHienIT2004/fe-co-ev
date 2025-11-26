'use client';
import Link from 'next/link';
import { useEffect } from 'react';
import { useGroupFund } from '@/libs/hooks/useGroupFund';
import { useVehicleCost } from '@/libs/hooks/useVehicleCost';
import { usePoll } from '@/libs/hooks/usePoll';
import { format } from 'date-fns';
import { useSearchParams } from 'next/navigation';

export default function GroupFundsDashboard() {
  const searchParams = useSearchParams();
  const GROUP_ID = searchParams.get('groupId') || '2';

  const { funds, loading: loadingFunds, fetchAll: fetchFunds } = useGroupFund(GROUP_ID);
  const { costs, loading: loadingCosts, fetchAll: fetchCosts } = useVehicleCost(GROUP_ID);
  const { polls, loading: loadingPolls, fetchAll: fetchPolls } = usePoll(GROUP_ID);

  useEffect(() => {
    fetchFunds();
    fetchCosts();
    fetchPolls();
  }, [fetchFunds, fetchCosts, fetchPolls]);

  const totalBalance = funds.reduce((sum, f) => sum + Number(f.balance || 0), 0);
  const totalFunds = funds.length;
  const totalCosts = costs.reduce((sum, c) => sum + Number(c.amount || 0), 0);
  const pendingCosts = costs.filter(c => c.status === 'pending').length;
  const paidCosts = costs.filter(c => c.status === 'paid').length;

  const totalPolls = polls.length;
  const openPolls = polls.filter(p => p.status === 'active').length;
  const closedPolls = polls.filter(p => p.status === 'closed').length;

  const latestFund = [...funds].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )[0];

  const isLoading = loadingFunds || loadingCosts || loadingPolls;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-green-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-black mb-3">Quản Lý Quỹ, Chi Phí & Bình Chọn</h1>
          <p className="text-lg text-black">Nhóm: <strong>{GROUP_ID}</strong></p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-xl">
            <p className="text-blue-100 text-sm">Tổng Quỹ</p>
            <p className="text-3xl font-bold mt-1">
              {isLoading ? '...' : `${totalBalance.toLocaleString('vi-VN')}đ`}
            </p>
          </div>
          <div className="bg-gradient-to-br from-red-500 to-red-600 text-white p-6 rounded-2xl shadow-xl">
            <p className="text-red-100 text-sm">Tổng Chi Phí</p>
            <p className="text-3xl font-bold mt-1">
              {isLoading ? '...' : `${totalCosts.toLocaleString('vi-VN')}đ`}
            </p>
          </div>
          <div className="bg-gradient-to-br from-yellow-500 to-amber-600 text-white p-6 rounded-2xl shadow-xl">
            <p className="text-yellow-100 text-sm">Chờ Thanh Toán</p>
            <p className="text-3xl font-bold mt-1">{isLoading ? '...' : pendingCosts}</p>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-6 rounded-2xl shadow-xl">
            <p className="text-green-100 text-sm">Tổng Quỹ</p>
            <p className="text-3xl font-bold mt-1">{isLoading ? '...' : totalFunds}</p>
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Danh sách quỹ */}
          <Link href={`/group-funds/fund?groupId=${GROUP_ID}`} className="group">
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center mb-5">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-black mb-2">Danh Sách Quỹ</h2>
              <p className="text-sm text-blue-600 font-medium">
                {isLoading ? 'Đang tải...' : `→ ${totalFunds} quỹ`}
              </p>
            </div>
          </Link>

          {/* Tạo quỹ mới */}
          <Link href={`/group-funds/fund/create?groupId=${GROUP_ID}`} className="group">
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center mb-5">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-black mb-2">Tạo Quỹ Mới</h2>
              <p className="text-sm text-green-600 font-medium">Bắt đầu ngay</p>
            </div>
          </Link>

          {/* Chi phí xe */}
          <Link href={`/group-funds/vehicle-cost?groupId=${GROUP_ID}`} className="group">
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-teal-200 rounded-xl flex items-center justify-center mb-5">
                <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-black mb-2">Chi Phí Xe</h2>
              <p className="text-sm text-teal-600 font-medium">
                {isLoading ? 'Đang tải...' : `→ ${costs.length} chi phí • ${pendingCosts} chờ`}
              </p>
            </div>
          </Link>

          {/* Polls */}
          <Link href={`/group-funds/polls?groupId=${GROUP_ID}`} className="group">
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center mb-5">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m-6-8h6m2 8h2m-2-4h2m-2-4h2M4 6h16v12H4V6z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-black mb-2">Bình Chọn</h2>
              {isLoading ? (
                <p className="text-sm text-purple-600 font-medium">Đang tải...</p>
              ) : (
                <p className="text-sm text-purple-600 font-medium">
                  → {totalPolls} bình chọn • {openPolls} mở • {closedPolls} đóng
                </p>
              )}
            </div>
          </Link>

          {latestFund && (
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 border border-indigo-200">
              <p className="text-xs font-semibold text-indigo-600 uppercase mb-2">Quỹ mới nhất</p>
              <h3 className="text-xl font-bold text-indigo-900 truncate">{latestFund.fundName}</h3>
              <p className="text-2xl font-bold text-indigo-700 mt-2">
                {Number(latestFund.balance).toLocaleString('vi-VN')}đ
              </p>
              <Link href={`/group-funds/fund/${latestFund.fundId}?groupId=${GROUP_ID}`} className="text-indigo-600 text-sm mt-4 inline-block hover:underline">
                Xem chi tiết
              </Link>
            </div>
          )}
        </div>

        <div className="text-center text-sm text-black">
          Cập nhật lúc: <strong>{format(new Date(), 'HH:mm, dd/MM/yyyy')}</strong>
        </div>
      </div>
    </div>
  );
}



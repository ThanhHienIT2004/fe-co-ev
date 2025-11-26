'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useGroupFund } from '@/libs/hooks/useGroupFund';
import { useVehicleCost } from '@/libs/hooks/useVehicleCost';
import { usePoll } from '@/libs/hooks/usePoll';
import { format } from 'date-fns';
import { useSearchParams } from 'next/navigation';
import { Wallet, CarFront, Vote, PlusCircle, TrendingUp, Clock } from 'lucide-react';

export default function GroupFundsDashboard() {
  const searchParams = useSearchParams();
  const urlGroupId = searchParams.get('groupId');

  // Ưu tiên lấy từ URL, nếu không có thì mặc định là '1' để test
  const GROUP_ID = urlGroupId?.trim() || '1';

  // Gọi các hook – luôn truyền GROUP_ID hợp lệ
  const { funds, loading: loadingFunds, fetchAll: fetchFunds } = useGroupFund(GROUP_ID);
  const { costs, loading: loadingCosts, fetchAll: fetchCosts } = useVehicleCost(GROUP_ID);
  const { polls, loading: loadingPolls, fetchAll: fetchPolls } = usePoll(GROUP_ID);

  // Tự động reload khi vào trang hoặc groupId thay đổi
  useEffect(() => {
    fetchFunds();
    fetchCosts();
    fetchPolls();
  }, [GROUP_ID, fetchFunds, fetchCosts, fetchPolls]);

  // Tính toán thống kê
  const totalBalance = funds.reduce((sum, f) => sum + Number(f.balance || 0), 0);
  const totalFunds = funds.length;

  const totalCosts = costs.reduce((sum, c) => sum + Number(c.amount || 0), 0);
  const pendingCosts = costs.filter(c => c.status === 'pending').length;
  const paidCosts = costs.filter(c => c.status === 'paid').length;

  const totalPolls = polls.length;
  const openPolls = polls.filter(p => p.status === 'active').length;
  const closedPolls = polls.filter(p => p.status === 'closed').length;

  const latestFund = [...funds]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];

  const isLoading = loadingFunds || loadingCosts || loadingPolls;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
            Quản Lý Quỹ Nhóm
          </h1>
          <p className="text-xl text-gray-700">
            Nhóm: <span className="font-mono text-3xl font-bold text-indigo-600">#{GROUP_ID}</span>
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Mở link: <code className="bg-gray-200 px-2 py-1 rounded">?groupId=1</code> để vào nhóm khác
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-8 rounded-3xl shadow-xl transform hover:scale-105 transition">
            <Wallet className="w-12 h-12 mb-3 opacity-90" />
            <p className="text-blue-100 text-sm font-medium">Tổng số dư quỹ</p>
            <p className="text-4xl font-bold mt-2">
              {isLoading ? '...' : `${totalBalance.toLocaleString('vi-VN')} ₫`}
            </p>
          </div>

          <div className="bg-gradient-to-br from-red-500 to-pink-600 text-white p-8 rounded-3xl shadow-xl transform hover:scale-105 transition">
            <CarFront className="w-12 h-12 mb-3 opacity-90" />
            <p className="text-red-100 text-sm font-medium">Tổng chi phí xe</p>
            <p className="text-4xl font-bold mt-2">
              {isLoading ? '...' : `${totalCosts.toLocaleString('vi-VN')} ₫`}
            </p>
          </div>

          <div className="bg-gradient-to-br from-yellow-500 to-orange-600 text-white p-8 rounded-3xl shadow-xl transform hover:scale-105 transition">
            <Clock className="w-12 h-12 mb-3 opacity-90" />
            <p className="text-yellow-100 text-sm font-medium">Chờ thanh toán</p>
            <p className="text-5xl font-bold mt-2">{isLoading ? '...' : pendingCosts}</p>
          </div>

          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white p-8 rounded-3xl shadow-xl transform hover:scale-105 transition">
            <TrendingUp className="w-12 h-12 mb-3 opacity-90" />
            <p className="text-emerald-100 text-sm font-medium">Số quỹ hiện có</p>
            <p className="text-5xl font-bold mt-2">{isLoading ? '...' : totalFunds}</p>
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">

          {/* Danh sách quỹ */}
          <Link href={`/group-funds/fund?groupId=${GROUP_ID}`} className="group block">
            <div className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl hover:-translate-y-2 transition-all border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                <Wallet className="w-9 h-9 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Danh Sách Quỹ</h2>
              <p className="text-blue-600 font-semibold">
                {isLoading ? 'Đang tải...' : `→ ${totalFunds} quỹ hoạt động`}
              </p>
            </div>
          </Link>

          {/* Tạo quỹ mới */}
          <Link href={`/group-funds/fund/create?groupId=${GROUP_ID}`} className="group block">
            <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-3xl shadow-xl p-8 hover:shadow-2xl hover:-translate-y-2 transition-all">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                <PlusCircle className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-bold mb-3">Tạo Quỹ Mới</h2>
              <p className="opacity-90 font-medium">Bắt đầu quỹ chung ngay hôm nay</p>
            </div>
          </Link>

          {/* Chi phí xe */}
          <Link href={`/group-funds/vehicle-cost?groupId=${GROUP_ID}`} className="group block">
            <div className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl hover:-translate-y-2 transition-all border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-cyan-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                <CarFront className="w-9 h-9 text-teal-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Chi Phí Xe</h2>
              <p className="text-teal-600 font-semibold">
                {isLoading ? 'Đang tải...' : `→ ${costs.length} mục • ${pendingCosts} chờ duyệt`}
              </p>
            </div>
          </Link>

          {/* Bình chọn */}
          <Link href={`/group-funds/polls?groupId=${GROUP_ID}`} className="group block">
            <div className="bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl hover:-translate-y-2 transition-all border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-200 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition">
                <Vote className="w-9 h-9 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Bình Chọn</h2>
              <p className="text-purple-600 font-semibold">
                {isLoading ? 'Đang tải...' : `→ ${totalPolls} phiếu • ${openPolls} đang mở`}
              </p>
            </div>
          </Link>

          {/* Quỹ mới nhất */}
          {latestFund && (
            <div className="md:col-span-2 lg:col-span-1">
              <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-3xl p-8 border-2 border-indigo-200 shadow-xl">
                <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-3">
                  Quỹ mới nhất
                </p>
                <h3 className="text-2xl font-extrabold text-indigo-900 line-clamp-2">
                  {latestFund.fundName}
                </h3>
                <p className="text-3xl font-bold text-indigo-700 mt-4">
                  {Number(latestFund.balance).toLocaleString('vi-VN')} ₫
                </p>
                <Link
                  href={`/group-funds/fund/${latestFund.fundId}?groupId=${GROUP_ID}`}
                  className="inline-flex items-center gap-2 text-indigo-600 font-semibold mt-5 hover:underline"
                >
                  Xem chi tiết →
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center text-gray-600">
          <p className="text-sm">
            Cập nhật lúc: <strong className="font-mono">{format(new Date(), 'HH:mm, dd/MM/yyyy')}</strong>
          </p>
          <p className="text-xs mt-2 opacity-70">
            Hệ thống tự động cập nhật theo thời gian thực • Group ID: {GROUP_ID}
          </p>
        </div>
      </div>
    </div>
  );
}
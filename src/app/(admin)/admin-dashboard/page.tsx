// app/admin/dashboard/page.tsx (hoặc components/AdminDashboard.tsx nếu bạn dùng như component)
'use client';

import { ContractLineChart } from "./_components/ContractLineChart";
import { DarkModeToggle } from "./_components/DarkModeToggle";
import { StatsCard } from "./_components/StatsCard";
import { TopGroupsBar } from "./_components/TopGroupsBar";
import { VehicleStatusPie } from "./_components/VehicleStatusPie";
import { WeeklyBookingsChart } from "./_components/WeeklyBookingsChart";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-linear-to-br from-teal-50 via-cyan-50 to-white dark:from-gray-900 dark:to-gray-950">
      <DarkModeToggle />

      <div className="pt-24 pb-16 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <StatsCard label="Tổng hợp đồng đã ký" value="1,512" change="+278 tháng này" color="from-teal-500 to-teal-600" />
            <StatsCard label="Xe đang hoạt động" value="68" change="92% khả dụng" color="from-cyan-500 to-cyan-600" />
            <StatsCard label="Nhóm đồng sở hữu" value="24" change="+3 nhóm mới" color="from-emerald-500 to-emerald-600" />
            <StatsCard label="Lượt đặt xe hôm nay" value="189" change="+42% so với hôm qua" color="from-sky-500 to-sky-600" />
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8"><ContractLineChart /></div>
            <div className="lg:col-span-4"><VehicleStatusPie /></div>
            <div className="lg:col-span-7"><TopGroupsBar /></div>
            <div className="lg:col-span-5"><WeeklyBookingsChart /></div>
          </div>

          {/* Footer */}
          <div className="mt-16 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © 2025 EVSharing • Hệ thống xe điện chia sẻ thông minh • Cập nhật: {new Date().toLocaleDateString("vi-VN")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
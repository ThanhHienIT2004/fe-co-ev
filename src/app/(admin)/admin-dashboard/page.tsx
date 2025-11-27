'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useVehicles } from "@/libs/hooks/useVehicles";
import { useOwnershipGroups } from "@/libs/hooks/useOwnershipGroups";

import { ContractLineChart } from "./_components/ContractLineChart";
import { DarkModeToggle } from "./_components/DarkModeToggle";
import { StatsCard } from "./_components/StatsCard";
import { TopGroupsBar } from "./_components/TopGroupsBar";
import { VehicleStatusPie } from "./_components/VehicleStatusPie";
import { BookingStatsChart } from "./_components/BookingStatsChart";
import { ConflictStatsChart } from "./_components/ConflictStatsChart";
import { UsageStatsChart } from "./_components/UsageStatsChart";
import { YearDistanceChart } from "./_components/YearDistanceChart";
import { useEContracts } from "@/libs/hooks/useEContracts";
import { useUsers } from "@/libs/hooks/useUser";
import { GroupFundChart } from "./_components/GroupFundChart";

export default function AdminDashboardPage() {
  const { data: vehicles = [], isLoading: loadingVehicles } = useVehicles();
  const { groups = [], isLoading: loadingGroups } = useOwnershipGroups();
  const { contracts = [], isLoading: loadingEContracts } = useEContracts();
  const { users = []} = useUsers();
  const totalVehicles = vehicles.length;
  const totalGroups = groups.length;
  const totalContracts = contracts.length;
  const totalUsers = users.length;

  return (
    <div className="min-h-screen bg-linear-to-br from-teal-50 via-cyan-50 to-white dark:from-gray-900 dark:to-gray-950">
      <DarkModeToggle />

      <div className="pt-24 pb-16 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <StatsCard label="Tổng hợp đồng hiện tại" value={loadingEContracts ? "..." : totalContracts.toString()}change="+278 tháng này" color="from-teal-500 to-teal-600" />
            <StatsCard label="Xe đang hoạt động" value={loadingVehicles ? "..." : totalVehicles.toString()} change="92% khả dụng" color="from-cyan-500 to-cyan-600" />
            <StatsCard label="Nhóm đồng sở hữu" value={loadingGroups ? "..." : totalGroups.toString()} change="+3 nhóm mới" color="from-emerald-500 to-emerald-600" />
            <StatsCard label="Số người dùng hiện tại" value={ totalUsers.toString()} change="+42% so với hôm qua" color="from-sky-500 to-sky-600" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8"><ContractLineChart /></div>
            <div className="lg:col-span-4"><VehicleStatusPie /></div>
            <div className="lg:col-span-7"><TopGroupsBar /></div>
            <div className="lg:col-span-5">
              <BookingStatsChart />
            </div>
            <div className="lg:col-span-5">
              <ConflictStatsChart />
            </div>
            <div className="lg:col-span-5">
              <UsageStatsChart />
            </div>
            <div className="lg:col-span-5"><YearDistanceChart /></div>
            <div className="lg:col-span-12"><GroupFundChart /></div>
          </div>.
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
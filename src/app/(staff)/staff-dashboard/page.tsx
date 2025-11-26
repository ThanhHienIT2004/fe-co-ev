'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useVehicles } from "@/libs/hooks/useVehicles";
import { useOwnershipGroups } from "@/libs/hooks/useOwnershipGroups";

import { DarkModeToggle } from "./_components/DarkModeToggle";
import { BookingStatsChart } from "./_components/BookingStatsChart";
import { ConflictStatsChart } from "./_components/ConflictStatsChart";
import { UsageStatsChart } from "./_components/UsageStatsChart";
import { YearDistanceChart } from "./_components/YearDistanceChart";

export default function StaffDashboardPage() {
  const { data: vehicles = [], isLoading: loadingVehicles } = useVehicles();
  const { groups = [], isLoading: loadingGroups } = useOwnershipGroups();

  const totalVehicles = vehicles.length;
  const totalGroups = groups.length;

  return (
    <div className="min-h-screen bg-linear-to-br from-teal-50 via-cyan-50 to-white dark:from-gray-900 dark:to-gray-950">
      <DarkModeToggle />

      <div className="pt-24 pb-16 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6">
              <BookingStatsChart />
            </div>

            <div className="lg:col-span-6">
              <ConflictStatsChart />
            </div>

            <div className="lg:col-span-6">
              <UsageStatsChart />
            </div>
            <div className="lg:col-span-6"><YearDistanceChart /></div>
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
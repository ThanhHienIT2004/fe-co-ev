'use client'; // ← BẮT BUỘC PHẢI CÓ DÒNG NÀY

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // ← giờ dùng được rồi

import { useVehicles } from "@/libs/hooks/useVehicles";
import { useOwnershipGroups } from "@/libs/hooks/useOwnershipGroups";

import { ContractLineChart } from "./_components/ContractLineChart";
import { DarkModeToggle } from "./_components/DarkModeToggle";
import { StatsCard } from "./_components/StatsCard";
import { TopGroupsBar } from "./_components/TopGroupsBar";
import { VehicleStatusPie } from "./_components/VehicleStatusPie";
import { WeeklyBookingsChart } from "./_components/WeeklyBookingsChart";
import { YearDistanceChart } from "./_components/YearDistanceChart";

export default function AdminDashboardPage() {
  const router = useRouter(); // ← giờ không còn lỗi nữa

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (!role || role !== "ADMIN") {
      alert("Bạn không có quyền truy cập trang quản trị!");
      router.replace("/");
    }
  }, [router]);

  const role = localStorage.getItem("role");
  if (role !== "ADMIN") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-teal-500 mx-auto"></div>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">Đang chuyển hướng...</p>
        </div>
      </div>
    );
  }

  const { data: vehicles = [], isLoading: loadingVehicles } = useVehicles();
  const { groups = [], isLoading: loadingGroups } = useOwnershipGroups();

  const totalVehicles = vehicles.length;
  const totalGroups = groups.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-white dark:from-gray-900 dark:to-gray-950">
      <DarkModeToggle />

      <div className="pt-24 pb-16 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <StatsCard label="Tổng hợp đồng đã ký" value="1.512" change="+278 tháng này" color="from-teal-500 to-teal-600" />
            <StatsCard label="Xe đang hoạt động" value={loadingVehicles ? "..." : totalVehicles.toString()} change="92% khả dụng" color="from-cyan-500 to-cyan-600" />
            <StatsCard label="Nhóm đồng sở hữu" value={loadingGroups ? "..." : totalGroups.toString()} change="+3 nhóm mới" color="from-emerald-500 to-emerald-600" />
            <StatsCard label="Lượt đặt xe hôm nay" value="189" change="+42% so với hôm qua" color="from-sky-500 to-sky-600" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8"><ContractLineChart /></div>
            <div className="lg:col-span-4"><VehicleStatusPie /></div>
            <div className="lg:col-span-7"><TopGroupsBar /></div>
            <div className="lg:col-span-5"><WeeklyBookingsChart /></div>
            <div className="lg:col-span-7"><YearDistanceChart /></div>
          </div>

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
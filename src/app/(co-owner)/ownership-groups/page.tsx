// app/vehicles/page.tsx
"use client";

import { useVehicles } from '@/libs/hooks/useVehicles';
import { Plus, Users, Car, DollarSign, Wrench } from 'lucide-react';
import Link from 'next/link';
import { useDeleteOwnershipGroup, useOwnershipGroups, useUserGroups } from '@/libs/hooks/useOwnershipGroups';
import EmptyState from '../history/components/EmptyState';
import GroupCard from './_component/GroupCard';
import { useEffect, useState } from 'react';
import { useDeleteGroupMember } from '@/libs/hooks/useGroupMembers';
import { mutate } from 'swr';

export default function VehiclesPage() {
  const { data: vehicles } = useVehicles();
    const [id, setId] = useState<string | null>(null);
    useEffect(() => {
    const storedId = localStorage.getItem("userId");
    setId(storedId);
  }, []); 
  const { groups, isLoading, error } = useUserGroups(id);
  const { deleteMember } = useDeleteGroupMember();
  const [deleting, setDeleting] = useState<string | null>(null);

  // Giả lập dữ liệu nhóm (thay bằng API thực tế sau)
  const groupStats = {
    monthlyFee: 12800000,
    members: 4,
    services: ['Bảo dưỡng định kỳ', 'Bảo hiểm full', 'Rửa xe miễn phí', 'Hỗ trợ 24/7'],
    totalVehicles: vehicles?.length || 0,
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-50 via-white to-cyan-50">
      {/* HERO HEADER */}
      <div className="bg-linear-to-r from-teal-600 to-cyan-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
            <div className="max-w-2xl">
              <h1 className="text-5xl lg:text-6xl font-black tracking-tight">
                Nhóm Đồng Sở Hữu Xe
              </h1>
              <p className="text-xl lg:text-2xl mt-4 opacity-95">
                Cùng nhau sở hữu, cùng chia sẻ chi phí, cùng tận hưởng hành trình
              </p>
              <div className="flex items-center gap-6 mt-6">
                <div className="flex items-center gap-2">
                  <Users className="w-6 h-6" />
                  <span className="text-lg font-semibold">{groupStats.members} thành viên</span>
                </div>
                <div className="flex items-center gap-2">
                  <Car className="w-6 h-6" />
                  <span className="text-lg font-semibold">{groupStats.totalVehicles} xe đang hoạt động</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SUB HEADER - THÔNG TIN NHÓM */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 lg:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Tổng phí hàng tháng */}
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <div className="p-4 bg-orange-100 rounded-full">
                  <DollarSign className="w-8 h-8 text-orange-600" />
                </div>
              </div>
              <p className="text-sm text-gray-600 uppercase tracking-wider">Tổng phí/tháng</p>
              <p className="text-3xl font-black text-gray-900 mt-2">
                {groupStats.monthlyFee.toLocaleString('vi-VN')}₫
              </p>
              <p className="text-sm text-gray-500 mt-1">
                ≈ {(groupStats.monthlyFee / groupStats.members).toLocaleString('vi-VN')}₫/người
              </p>
            </div>

            {/* Dịch vụ đang sử dụng */}
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <div className="p-4 bg-emerald-100 rounded-full">
                  <Wrench className="w-8 h-8 text-emerald-600" />
                </div>
              </div>
              <p className="text-sm text-gray-600 uppercase tracking-wider">Dịch vụ bao gồm</p>
              <div className="mt-3 space-y-2">
                {groupStats.services.map((service, idx) => (
                  <div key={idx} className="flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">{service}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Nút hành động phụ */}
            <div className="flex flex-col justify-center items-center gap-4">
              <Link
                href="/group/invite"
                className="w-full max-w-xs bg-linear-to-r from-teal-500 to-cyan-500 text-white font-bold py-3 px-6 rounded-xl hover:shadow-lg transition-all hover:scale-105"
              >
                Mời thành viên mới
              </Link>
              <Link
                href="/group/bills"
                className="text-teal-600 font-medium hover:underline"
              >
                Xem chi tiết hóa đơn →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* DANH SÁCH XE */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto px-6 -mt-10 pb-24">
          {groups.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {groups.map((group) => (  
                <GroupCard
                  key={group.group_id}
                  group={group}
                />
              ))}
            </div>
          )}
        </div>

        {/* LOADING SKELETON */}
        {isLoading && (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse border border-gray-100"
              >
                <div className="h-56 bg-gray-200"></div>
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-gray-200 rounded w-4/5"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-12 bg-gray-200 rounded-xl mt-6"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className="text-center py-20 bg-red-50 rounded-2xl border border-red-200">
            <p className="text-red-600 font-bold text-xl">Không thể tải dữ liệu xe</p>
            <p className="text-red-500 mt-2">Vui lòng kiểm tra kết nối và thử lại.</p>
          </div>
        )}


        {!isLoading && vehicles && vehicles.length === 0 && (
          <div className="text-center py-20">
            <Car className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <p className="text-xl text-gray-600 font-medium">Chưa có xe nào trong nhóm</p>
            <Link
              href="/vehicles/create"
              className="mt-6 inline-flex items-center gap-2 text-teal-600 font-bold hover:underline"
            >
              <Plus className="w-5 h-5" />
              Thêm xe đầu tiên ngay bây giờ
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
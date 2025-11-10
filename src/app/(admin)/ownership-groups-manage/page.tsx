// app/admin/ownership-groups/page.tsx
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Plus, Trash2, Edit, Users, Car, Calendar, AlertCircle, Loader2 } from 'lucide-react';
import { useDeleteOwnershipGroup, useOwnershipGroups } from '@/libs/hooks/useOwnershipGroups';

export default function OwnershipGroupsPage() {
  const { groups, isLoading, error } = useOwnershipGroups();
  const { deleteGroup, isPending } = useDeleteOwnershipGroup();

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <ErrorState message={error.message} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50">
      {/* HERO */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
            <div>
              <h1 className="text-5xl lg:text-6xl font-black tracking-tight flex items-center gap-4">
                <Users className="w-14 h-14" />
                Quản lý nhóm đồng sở hữu
              </h1>
              <p className="text-xl mt-4 opacity-95">
                {groups.length} nhóm • {groups.reduce((acc, g) => acc + (g.member_count || 4), 0)} thành viên
              </p>
            </div>
            <Link
              href="/ownership-groups-manage/create"
              className="group flex items-center gap-3 bg-white text-teal-600 font-bold px-8 py-5 rounded-2xl shadow-2xl hover:shadow-cyan-300 transition-all duration-300 hover:scale-105 hover:-translate-y-1"
            >
              <Plus className="w-7 h-7 group-hover:rotate-90 transition-transform duration-500" />
              Tạo nhóm mới
            </Link>
          </div>
        </div>
      </div>

      {/* DANH SÁCH */}
      <div className="max-w-7xl mx-auto px-6 -mt-10 pb-24">
        {groups.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {groups.map((group) => (
              <GroupCard key={group.group_id} group={group} deleteGroup={deleteGroup} isPending={isPending} />
            ))}
          </div>
        )}
      </div>

      {/* FAB */}
      <Link
        href="/ownership-groups-manage/create"
        className="fixed bottom-8 right-8 bg-teal-600 text-white p-5 rounded-full shadow-2xl hover:shadow-teal-600/50 transition-all hover:scale-110 z-50 lg:hidden"
      >
        <Plus className="w-8 h-8" />
      </Link>
    </div>
  );
}

// Card nhóm
function GroupCard({ group, deleteGroup, isPending }: any) {
  const vehicle = group.vehicle;

  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50 hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 group">
      {/* Ảnh xe */}
      <div className="relative h-64">
        <Image
          src={vehicle?.image_url || '/images-default.jpg'}
          alt={vehicle?.vehicle_name || 'Xe'}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        
        {/* Badge */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded-full px-4 py-2 flex items-center gap-2 shadow-lg">
          <Users className="w-5 h-5 text-teal-600" />
          <span className="font-bold text-teal-600">{group.member_count || 4}</span>
        </div>

        {/* Tên nhóm + xe */}
        <div className="absolute bottom-4 left-6 text-white">
          <h3 className="text-2xl font-black drop-shadow-lg">{group.group_name}</h3>
          <p className="text-lg font-bold opacity-95 drop-shadow flex items-center gap-2 mt-1">
            <Car className="w-5 h-5" />
            {vehicle?.vehicle_name}
          </p>
          <p className="text-sm opacity-90 flex items-center gap-2 mt-1 drop-shadow">
            <Calendar className="w-4 h-4" />
            {new Date(group.created_at).toLocaleDateString('vi-VN')}
          </p>
        </div>
      </div>

      {/* Nội dung */}
      <div className="p-6">
        <div className="mb-4">
          <p className="text-teal-600 font-mono text-lg font-bold">
            {vehicle?.license_plate}
          </p>
          <p className="text-gray-600 text-sm mt-1 line-clamp-2">
            {vehicle?.description}
          </p>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600 mb-6">
          <span>Chủ nhóm:</span>
          <span className="font-bold text-teal-600">
            {group.created_by.slice(0, 12)}...
          </span>
        </div>

    <div className="flex justify-between items-center mt-6">
      <Link
        href={`/ownership-groups-manage/${group.group_id}`}
        className="px-6 py-3 bg-teal-600 text-white rounded-xl font-bold hover:bg-teal-700 transition shadow-lg hover:shadow-xl"
      >
        Xem chi tiết
      </Link>

      <div className="flex gap-3">
        <Link
          href={`/ownership-groups-manage/${group.group_id}/edit`}
          className="p-3 bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-200 transition group"
        >
          <Edit className="w-5 h-5 group-hover:scale-125 transition" />
        </Link>
        <button
          onClick={() => confirm('Xóa nhóm này?') && deleteGroup(group.group_id)}
          disabled={isPending}
          className="p-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition disabled:opacity-50 group"
        >
          {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trash2 className="w-5 h-5 group-hover:scale-125 transition" />}
        </button>
      </div>
    </div>
  </div>
  </div>
  );
}

// Loading
function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white/80 backdrop-blur rounded-3xl shadow-xl overflow-hidden animate-pulse">
              <div className="h-64 bg-gradient-to-br from-gray-200 to-gray-300"></div>
              <div className="p-6 space-y-4">
                <div className="h-8 bg-gray-200 rounded-xl w-4/5"></div>
                <div className="h-5 bg-gray-200 rounded-lg w-full"></div>
                <div className="h-5 bg-gray-200 rounded-lg w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Empty
function EmptyState() {
  return (
    <div className="text-center py-32">
      <Users className="w-32 h-32 text-gray-300 mx-auto mb-8" />
      <h3 className="text-3xl font-bold text-gray-800 mb-4">Chưa có nhóm nào</h3>
      <p className="text-xl text-gray-600 mb-8">Tạo nhóm đầu tiên để bắt đầu!</p>
      <Link
        href="/ownership-groups-manage/create"
        className="inline-flex items-center gap-3 bg-teal-600 text-white font-bold px-10 py-5 rounded-2xl hover:bg-teal-700 transition hover:scale-105 shadow-xl"
      >
        <Plus className="w-6 h-6" />
        Tạo nhóm đầu tiên
      </Link>
    </div>
  );
}

// Error
function ErrorState({ message }: { message: string }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 flex items-center justify-center p-6">
      <div className="text-center bg-white rounded-3xl shadow-2xl p-10 max-w-md">
        <AlertCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
        <p className="text-2xl font-bold text-red-600">Lỗi tải dữ liệu</p>
        <p className="text-gray-600 mt-2">{message}</p>
        <button onClick={() => window.location.reload()} className="mt-6 px-8 py-4 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition font-bold">
          Thử lại
        </button>
      </div>
    </div>
  );
}
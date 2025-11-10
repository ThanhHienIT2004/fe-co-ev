// app/ownership-groups-manage/[id]/page.tsx
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Users, UserPlus, Edit, Trash2, Loader2, Crown, Percent } from 'lucide-react';
import { useOwnershipGroup } from '@/libs/hooks/useOwnershipGroups';
import { useGroupMembers, useDeleteGroupMember } from '@/libs/hooks/useGroupMembers';
import { useParams, useRouter } from 'next/navigation';

export default function GroupDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { group, isLoading: loadingGroup } = useOwnershipGroup(id as string);
  const { members, isLoading: loadingMembers } = useGroupMembers(id as string);
  const { deleteMember } = useDeleteGroupMember();

  if (loadingGroup || loadingMembers) {
    return <LoadingSkeleton />;
  }

  if (!group) {
    return <ErrorState message="Không tìm thấy nhóm" />;
  }

  const vehicle = group.vehicle;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50">
      {/* HERO + QUAY LẠI */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex items-center gap-6 mb-8">
            <Link
              href="/ownership-groups-manage"
              className="group flex items-center gap-3 bg-white/20 backdrop-blur-lg px-6 py-4 rounded-2xl hover:bg-white/30 transition-all duration-300 hover:scale-105"
            >
              <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
              <span className="font-bold text-lg">Quay lại danh sách</span>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-black tracking-tight">
                {group.group_name}
              </h1>
              <p className="text-2xl mt-4 opacity-95 flex items-center gap-3">
                <Users className="w-8 h-8" />
                {members.length} thành viên
              </p>
            </div>

            <div className="flex justify-end gap-4">
              <Link
                href={`/ownership-groups-manage/${id}/edit`}
                className="bg-white text-teal-600 px-8 py-4 rounded-2xl font-bold hover:bg-gray-100 transition shadow-xl"
              >
                <Edit className="w-5 h-5 inline mr-2" />
                Sửa nhóm
              </Link>
              <Link
                href={`/ownership-groups-manage/${id}/add-member`}
                className="bg-yellow-500 text-white px-8 py-4 rounded-2xl font-bold hover:bg-yellow-600 transition shadow-xl"
              >
                <UserPlus className="w-5 h-5 inline mr-2" />
                Thêm thành viên
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* THÔNG TIN XE */}
      <div className="max-w-7xl mx-auto px-6 -mt-12 pb-10">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/50">
          <div className="relative h-80">
            <Image
              src={vehicle?.image_url || '/images-default.jpg'}
              alt={vehicle?.vehicle_name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute bottom-8 left-8 text-white">
              <h2 className="text-4xl font-black drop-shadow-2xl">{vehicle?.vehicle_name}</h2>
              <p className="text-2xl font-bold mt-2">{vehicle?.license_plate}</p>
              <p className="text-lg mt-2 opacity-90">{vehicle?.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* DANH SÁCH THÀNH VIÊN */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <h2 className="text-3xl font-black text-gray-800 mb-8 flex items-center gap-3">
          <Users className="w-10 h-10 text-teal-600" />
          Danh sách thành viên
        </h2>

        {members.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl shadow-xl">
            <Users className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <p className="text-xl text-gray-600">Chưa có thành viên nào</p>
            <Link
              href={`/ownership-groups-manage/${id}/add-member`}
              className="mt-6 inline-flex items-center gap-3 bg-teal-600 text-white px-8 py-4 rounded-2xl hover:bg-teal-700 transition"
            >
              <UserPlus className="w-5 h-5" />
              Thêm thành viên đầu tiên
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {members.map((member) => (
              <div
                key={member.member_id}
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-cyan-600 rounded-full flex items-center justify-center text-white font-black text-xl">
                      {member.member_name?.[0] || 'U'}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">
                        {member.member_name || 'Thành viên'}
                      </h3>
                      <p className="text-gray-600 font-mono text-sm">
                        ID: {member.member_id.slice(0, 12)}...
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    {/* Role */}
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Vai trò</p>
                      <p className="font-bold text-teal-600 flex items-center gap-2">
                        {member.group_role === 'OWNER' && <Crown className="w-5 h-5 text-yellow-500" />}
                        {member.group_role || 'Thành viên'}
                      </p>
                    </div>

                    {/* Tỷ lệ sở hữu */}
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Tỷ lệ sở hữu</p>
                      <p className="font-black text-2xl text-teal-600 flex items-center gap-1">
                        <Percent className="w-5 h-5" />
                        {member.ownership_ratio || 0}%
                      </p>
                    </div>

                    {/* Hành động */}
                    <div className="flex gap-3">
                      <button className="p-3 bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-200 transition">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => confirm('Xóa thành viên này?') && deleteMember(member.member_id)}
                        className="p-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Loading & Error giữ nguyên như trước
function LoadingSkeleton() { /* ... */ }
function ErrorState({ message }: { message: string }) { /* ... */ }
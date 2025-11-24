"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Edit, Trash2, Users, Car, Calendar, Loader2, AlertCircle } from 'lucide-react';
import { useGroupMemberCount } from '@/libs/hooks/useGroupMembers';
import { useState } from 'react';
import { enqueueSnackbar } from 'notistack';

type Props = {
  group: {
    group_id: string;
    group_name: string;
    created_by: string;
    created_at: string;
    updated_at?: string;
    vehicle?: {
      vehicle_id: string;
      vehicle_name: string;
      license_plate: string;
      description?: string;
      image_url?: string;
    };
  };
  onDelete: (id: string) => Promise<void>; // Đổi thành async để hỗ trợ loading tốt hơn
  isPending: boolean;
};

export default function GroupCard({ group, onDelete, isPending }: Props) {
  const { count, isLoading: loadingCount } = useGroupMemberCount(group.group_id);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const formatId = (id: string) => id.toString().slice(-8);

  const handleDelete = async () => {
    setDeletingId(group.group_id);
    try {
      await onDelete(group.group_id);
      setShowDeleteModal(false);
    } finally {
      setDeletingId(null);
      enqueueSnackbar("Xóa nhóm thành công!", { variant: "success" });
    }
  };

  return (
    <>
      <div className="group bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-teal-200">
        {/* Ảnh xe */}
        <div className="relative h-44 bg-gradient-to-b from-gray-100 to-gray-200">
          {group.vehicle?.image_url ? (
            <Image
              src={group.vehicle.image_url}
              alt={group.vehicle.vehicle_name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
              priority
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <Car className="w-24 h-24 text-gray-400" />
            </div>
          )}

          {/* Badge số thành viên */}
          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 shadow-xl border border-teal-100">
            <Users className="w-5 h-5 text-teal-600" />
            <span className="font-black text-teal-600 text-lg">
              {loadingCount ? '...' : count ?? 0}
            </span>
          </div>

          {/* Tên nhóm + xe */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 pt-12">
            <h3 className="text-xl font-black text-white drop-shadow-2xl">
              {group.group_name}
            </h3>
            <p className="text-white/90 font-bold text-lg flex items-center gap-2 mt-1 drop-shadow-lg">
              <Car className="w-5 h-5" />
              {group.vehicle?.vehicle_name || 'Chưa gắn xe'}
            </p>
          </div>
        </div>

        {/* Nội dung */}
        <div className="p-6 space-y-0.5">
          <div>
            <p className="text-teal-600 font-mono text-lg font-bold">
              {group.vehicle?.license_plate || '—'}
            </p>
            <p className="text-xs text-gray-500 font-mono">
              ID nhóm: {formatId(group.group_id)}
            </p>
          </div>

          <p className="text-sm text-gray-600 line-clamp-2">
            {group.vehicle?.description || "Chưa có mô tả cho xe này"}
          </p>

          <div className="text-sm">
            <span className="text-gray-500">Chủ nhóm:</span>{' '}
            <span className="font-bold text-teal-700">ID {group.created_by}</span>
          </div>

          <div className="flex items-center justify-between pt-0.5 border-t border-gray-100">
            <div className="flex gap-3">
              <Link
                href={`/ownership-groups-manage/${group.group_id}`}
                className="px-5 py-2.5 bg-teal-600 text-white text-sm font-bold rounded-xl hover:bg-teal-700 transition shadow-md hover:shadow-lg"
              >
                Chi tiết
              </Link>

              <Link
                href={`/ownership-groups-manage/${group.group_id}/edit`}
                className="p-3 bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-200 transition shadow-md hover:shadow-lg"
                title="Chỉnh sửa nhóm"
              >
                <Edit className="w-5 h-5" />
              </Link>

              {/* Nút xóa mở modal */}
              <button
                onClick={() => setShowDeleteModal(true)}
                disabled={isPending}
                className="p-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition shadow-md hover:shadow-lg disabled:opacity-50"
                title="Xóa nhóm"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>     
            <div className="text-xs text-gray-400">
              <Calendar className="w-4 h-4 inline mr-1" />
              {new Date(group.updated_at || group.created_at).toLocaleDateString("vi-VN")}
            </div>
        </div>
      </div>

      {/* Modal xác nhận xóa - đẹp lung linh */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-scaleIn">
            <div className="p-8 text-center">
              <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
                <AlertCircle className="w-12 h-12 text-red-600" />
              </div>
              
              <h3 className="text-2xl font-black text-gray-900 mb-3">
                Xóa nhóm này?
              </h3>
              
              <p className="text-gray-600 mb-2">
                Bạn đang xóa nhóm <span className="font-bold text-teal-600">“{group.group_name}”</span>
              </p>
              <p className="text-sm text-red-600 font-medium">
                Tất cả thành viên sẽ bị xóa • Hành động này <span className="underline">không thể hoàn tác</span>
              </p>
            </div>

            <div className="flex border-t border-gray-100">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-4 font-bold text-gray-600 hover:bg-gray-50 transition"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleDelete}
                disabled={deletingId === group.group_id}
                className="flex-1 py-4 font-bold text-white bg-red-600 hover:bg-red-700 transition flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {deletingId === group.group_id ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Đang xóa...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-5 h-5" />
                    Xóa nhóm
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
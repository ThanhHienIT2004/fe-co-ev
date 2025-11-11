"use client";
import Image from 'next/image';
import Link from 'next/link';
import { Edit, Trash2, Users, Car, Calendar, Loader2 } from 'lucide-react';
import { OwnershipGroup } from '@/types/ownership-group';
import { useGroupMemberCount } from '@/libs/hooks/useGroupMembers';

type Props = {
  group: OwnershipGroup;
  onDelete: (id: string) => void;
  isPending: boolean;
};

export default function GroupCard({ group, onDelete, isPending }: Props) {
  const vehicle = group.vehicle;

  // ✅ Dùng group.group_id thay vì useParams()
  const { count, isLoading: loadingCount } = useGroupMemberCount(group.group_id);

  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50 hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 group">
      <div className="relative h-64">
        <Image
          src={vehicle?.image_url || '/images-default.jpg'}
          alt={vehicle?.vehicle_name || 'Xe'}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
          priority
        />

        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded-full px-4 py-2 flex items-center gap-2 shadow-lg">
          <Users className="w-5 h-5 text-teal-600" />
          {/* ✅ Hiển thị số lượng thực tế hoặc "..." khi đang tải */}
          <span className="font-bold text-teal-600">
            {loadingCount ? '...' : count}
          </span>
        </div>

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
              onClick={() => confirm('Xóa nhóm này?') && onDelete(group.group_id)}
              disabled={isPending}
              className="p-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition disabled:opacity-50 group"
            >
              {isPending ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Trash2 className="w-5 h-5 group-hover:scale-125 transition" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

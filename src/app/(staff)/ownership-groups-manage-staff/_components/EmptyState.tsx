// app/admin/ownership-groups/components/EmptyState.tsx
import Link from 'next/link';
import { Plus, Users } from 'lucide-react';

export default function EmptyState() {
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
// app/ownership-groups-manage/create/page.tsx
"use client";

import { useState } from 'react';
import { useCreateOwnershipGroup } from '@/libs/hooks/useOwnershipGroups';
import { useRouter } from 'next/navigation';
import { Plus, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function CreateGroupPage() {
  const { createGroup } = useCreateOwnershipGroup();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    try {
      await createGroup({
        group_name: formData.get('group_name') as string,
        vehicle_id: formData.get('vehicle_id') as string,
        created_by: 'admin_123', // Thay bằng user ID thật sau
      });
      router.push('/ownership-groups-manage');
    } catch (error) {
      alert('Tạo nhóm thất bại. Vui lòng thử lại!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-teal-50 via-white to-cyan-50">
      {/* HERO HEADER + NÚT QUAY LẠI */}
      <div className="bg-linear-to-r from-teal-500 to-cyan-800 text-white">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="flex items-center gap-6 mb-8">
            {/* NÚT QUAY LẠI - ĐẸP NHƯ BA YÊU CẦU */}
            <Link
              href="/ownership-groups-manage"
              className="group flex items-center gap-3 bg-white/20 backdrop-blur-lg px-6 py-3.5 rounded-2xl hover:bg-white/30 transition-all duration-300 hover:scale-105 shadow-xl"
            >
              <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
              <span className="font-bold text-lg">Quay lại danh sách</span>
            </Link>
          </div>

          <div className="flex items-center gap-5">
            <div className="bg-white/20 backdrop-blur p-4 rounded-2xl">
              <Plus className="w-14 h-14" />
            </div>
            <div>
              <h1 className="text-5xl font-black tracking-tight">
                Tạo nhóm đồng sở hữu mới
              </h1>
              <p className="text-xl mt-2 opacity-95">
                Thêm nhóm mới để cùng chia sẻ xe VinFast
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FORM TẠO NHÓM */}
      <div className="max-w-2xl mx-auto px-6 -mt-12 pb-24">
        <div className="bg-white rounded-3xl shadow-2xl p-10 border border-white/50">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* TÊN NHÓM */}
            <div>
              <label className="block text-xl font-bold text-gray-800 mb-3">
                Tên nhóm đồng sở hữu
              </label>
              <input
                name="group_name"
                type="text"
                required
                placeholder="VD: Nhóm VinFast VF 03 VIP - Hà Nội"
                className="w-full px-6 py-5 rounded-2xl border-2 border-gray-200 focus:border-teal-600 focus:ring-4 focus:ring-teal-100 transition-all duration-300 text-lg font-medium placeholder-gray-400"
              />
              <p className="text-sm text-gray-500 mt-2">Tên nhóm nên rõ ràng, dễ nhận diện</p>
            </div>

            {/* XE (ID) */}
            <div>
              <label className="block text-xl font-bold text-gray-800 mb-3">
                ID xe trong hệ thống
              </label>
              <input
                name="vehicle_id"
                type="text"
                required
                placeholder="0e5571ef-a130-4128-88db-ca63e825e5d1"
                className="w-full px-6 py-5 rounded-2xl border-2 border-gray-200 focus:border-teal-600 focus:ring-4 focus:ring-teal-100 transition-all duration-300 font-mono text-lg tracking-wider placeholder-gray-400"
              />
              <p className="text-sm text-gray-500 mt-2">
                Copy ID xe từ trang quản lý xe
              </p>
            </div>

            {/* NÚT SUBMIT */}
            <div className="flex gap-6 pt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-teal-600 text-white py-5 rounded-2xl font-black text-xl hover:bg-teal-700 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl hover:scale-105"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-7 h-7 animate-spin" />
                    Đang tạo nhóm...
                  </>
                ) : (
                  <>
                    <Plus className="w-7 h-7" />
                    Tạo nhóm ngay
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => router.push('/ownership-groups-manage')}
                className="flex-1 bg-gray-100 text-gray-800 py-5 rounded-2xl font-bold text-xl hover:bg-gray-200 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
              >
                Hủy bỏ
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* FAB Mobile */}
      <Link
        href="/ownership-groups-manage"
        className="fixed bottom-8 left-8 bg-white text-teal-600 p-5 rounded-full shadow-2xl hover:shadow-teal-600/50 transition-all hover:scale-110 z-50 lg:hidden"
      >
        <ArrowLeft className="w-8 h-8" />
      </Link>
    </div>
  );
}
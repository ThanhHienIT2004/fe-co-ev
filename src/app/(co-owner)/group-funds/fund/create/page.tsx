// src/app/(co-owner)/group-funds/fund/create/page.tsx
'use client';
import { useState } from 'react';
import { useGroupFund } from '@/libs/hooks/useGroupFund';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function CreateFundPage() {
  const searchParams = useSearchParams();
  const groupId = searchParams.get('groupId') ?? 'group_001';

  const { create, loading } = useGroupFund(groupId);
  const router = useRouter();

  const [form, setForm] = useState({
    fundName: '',
    initialBalance: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fundName.trim()) return alert('Vui lòng nhập tên quỹ!');

    try {
      await create({
        groupId,
        fundName: form.fundName.trim(),
        initialBalance: form.initialBalance || undefined,
      });

      alert('Tạo quỹ thành công!');
      router.push(`/group-funds/fund?groupId=${groupId}`);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Tạo quỹ thất bại!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-green-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Tạo Quỹ Mới</h1>
          <p className="text-gray-600 mb-6">
            Nhóm: <strong>{groupId}</strong>
          </p>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tên quỹ <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.fundName}
                onChange={(e) => setForm({ ...form, fundName: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="VD: Quỹ chuyến đi Đà Lạt"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Số dư ban đầu (tùy chọn)
              </label>
              <input
                type="text"
                value={form.initialBalance}
                onChange={(e) =>
                  setForm({ ...form, initialBalance: e.target.value.replace(/\D/g, '') })
                }
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="0"
              />
              <p className="text-xs text-gray-500 mt-2">
                {form.initialBalance && `${Number(form.initialBalance).toLocaleString('vi-VN')}đ`}
              </p>
            </div>
          </div>

          <div className="flex gap-4 mt-10">
            <button
              type="submit"
              disabled={loading || !form.fundName.trim()}
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed transition shadow-lg"
            >
              {loading ? 'Đang tạo quỹ...' : 'Tạo quỹ ngay'}
            </button>
            <Link
              href={`/group-funds/fund?groupId=${groupId}`}
              className="px-8 py-4 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition"
            >
              Hủy
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
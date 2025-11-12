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

  const [form, setForm] = useState({ fundName: '', initialBalance: '' });

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
          <p className="text-gray-600 mb-6">Nhóm: <strong>{groupId}</strong></p>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tên quỹ *</label>
              <input
                type="text"
                value={form.fundName}
                onChange={(e) => setForm({ ...form, fundName: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Số dư ban đầu</label>
              <input
                type="text"
                value={form.initialBalance}
                onChange={(e) => setForm({ ...form, initialBalance: e.target.value.replace(/\D/g, '') })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500"
                placeholder="0"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-8">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-green-600 text-white py-3 rounded-xl font-medium hover:bg-green-700 disabled:opacity-70"
            >
              {loading ? 'Đang tạo...' : 'Tạo quỹ'}
            </button>
            <Link href="/group-funds/fund" className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200">
              Hủy
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
// src/app/(co-owner)/group-funds/polls/create/page.tsx
'use client';
import { useState } from 'react';
import { usePoll } from '@/libs/hooks/usePoll';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CreatePollPage() {
  const { create } = usePoll();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    description: '',
    costId: '',
    expiresAt: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.description) return alert('Nhập nội dung');

    setLoading(true);
    try {
      await create({
        groupId: 1,
        description: form.description,
        costId: form.costId ? Number(form.costId) : null,
        expiresAt: form.expiresAt || null,
      });
      router.push('/group-funds/polls');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Tạo thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-green-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-black">Tạo Bình Chọn</h1>
          <Link href="/group-funds/polls" className="text-blue-600 hover:underline">
            ← Quay lại
          </Link>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <p className="text-blue-700 font-medium">Nhóm: <strong>group_001</strong></p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-black mb-2">Nội dung *</label>
            <textarea
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg h-32 focus:ring-2 focus:ring-green-500"
              placeholder="Có nên thuê xe 16 chỗ không?"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">Chi phí liên kết (tùy chọn)</label>
            <input
              type="number"
              value={form.costId}
              onChange={e => setForm({ ...form, costId: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              placeholder="123"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">Hết hạn (tùy chọn)</label>
            <input
              type="datetime-local"
              value={form.expiresAt}
              onChange={e => setForm({ ...form, expiresAt: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? 'Đang tạo...' : 'Tạo bình chọn'}
            </button>
            <Link href="/group-funds/polls" className="flex-1 text-center bg-gray-100 py-3 rounded-lg font-medium">
              Hủy
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
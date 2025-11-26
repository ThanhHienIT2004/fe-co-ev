// src/app/(co-owner)/group-funds/[groupId]/fund/create/page.tsx

'use client';

import { useState } from 'react';
import { useGroupFund } from '@/libs/hooks/useGroupFund';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Loader2, Wallet } from 'lucide-react';

export default function CreateFundPage() {
  const router = useRouter();
  const params = useParams();
  const groupId = params.groupId as string;

  if (!groupId) {
    router.replace('/groups');
    return null;
  }

  const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;
  if (!userId) {
    alert('Không tìm thấy userId! Vui lòng đăng nhập lại.');
    router.replace('/');
    return null;
  }

  const { create, loading } = useGroupFund(groupId);

  const [form, setForm] = useState({
    fundName: '',
    initialBalance: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fundName.trim()) return alert('Vui lòng nhập tên quỹ!');

    try {
      await create(
        form.fundName.trim(),
        form.initialBalance ? Number(form.initialBalance) : 0,
        Number(userId)
      );

      alert('Tạo quỹ thành công!');
      router.push(`/group-funds/${groupId}/fund`); // URL đẹp hơn
    } catch (err: any) {
      alert(err.response?.data?.message || 'Tạo quỹ thất bại!');
    }
  };

  const formatMoney = (num: string) => {
    return num ? Number(num).toLocaleString('vi-VN') + 'đ' : '';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-green-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">

        <Link
          href={`/group-funds/${groupId}/fund`}
          className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Quay lại danh sách quỹ
        </Link>

        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
              <Wallet className="w-9 h-9" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Tạo Quỹ Mới</h1>
              <p className="text-gray-600">
                Nhóm ID: <strong className="text-indigo-700">{groupId}</strong> • 
                Người tạo: <strong className="text-emerald-700">User {userId}</strong>
              </p>
            </div>
          </div>

          {/* Form giống hệt file cũ */}
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Tên quỹ <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.fundName}
                onChange={(e) => setForm({ ...form, fundName: e.target.value })}
                className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition text-lg"
                placeholder="VD: Quỹ đi Đà Lạt, Quỹ bảo trì xe..."
                maxLength={100}
                required
              />
              <p className="text-xs text-gray-500 mt-2">{form.fundName.length}/100 ký tự</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Số dư ban đầu (tùy chọn)
              </label>
              <input
                type="text"
                inputMode="numeric"
                value={form.initialBalance}
                onChange={(e) => setForm({ ...form, initialBalance: e.target.value.replace(/\D/g, '') })}
                className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition text-lg font-mono"
                placeholder="0"
              />
              {form.initialBalance && (
                <div className="mt-4 p-5 bg-green-50 border border-green-200 rounded-2xl">
                  <p className="text-green-800 font-bold text-xl">
                    Khởi tạo: {formatMoney(form.initialBalance)}
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                disabled={loading || !form.fundName.trim()}
                className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-5 rounded-2xl font-bold text-lg hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Đang tạo...
                  </>
                ) : (
                  'Tạo quỹ ngay'
                )}
              </button>

              <Link
                href={`/group-funds/${groupId}/fund`}
                className="px-8 py-5 bg-gray-100 text-gray-700 rounded-2xl font-semibold hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Hủy
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
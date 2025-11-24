'use client';

import { useState } from 'react';
import { useVehicleCost } from '@/libs/hooks/useVehicleCost';
import { useGroupFund } from '@/libs/hooks/useGroupFund';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Car, DollarSign } from 'lucide-react';

export default function CreateCostPage() {
  const { create, loading } = useVehicleCost('all');
  const { funds } = useGroupFund();
  const router = useRouter();

  const [form, setForm] = useState({
    groupId: 0,
    costName: '',
    amount: '',      
    vehicleId: '',     
    fundId: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.groupId || !form.costName || !form.amount) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc!');
      return;
    }

    try {
      await create({
        groupId: form.groupId,              
        costName: form.costName,          
        amount: Number(form.amount),    
        vehicleId: form.vehicleId ? Number(form.vehicleId) : undefined, 
        fundId: form.fundId ? Number(form.fundId) : undefined,
      });

      alert('Tạo chi phí thành công!');
      router.push('/cost');
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || 'Tạo chi phí thất bại!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/cost" className="flex items-center gap-2 text-blue-600 hover:underline mb-8">
          <ArrowLeft className="w-4 h-4" /> Quay lại danh sách
        </Link>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tạo Chi Phí Mới</h1>
          <p className="text-gray-600 mb-8">Thêm một khoản chi phí vào hệ thống</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Group ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nhóm ID <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                required
                min="1"
                value={form.groupId || ''}
                onChange={(e) => setForm({ ...form, groupId: Number(e.target.value) || 0 })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Ví dụ: 1"
              />
            </div>

            {/* Tên chi phí */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tên chi phí <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={form.costName}
                onChange={(e) => setForm({ ...form, costName: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
                placeholder="Bảo dưỡng định kỳ, Sạc pin tháng 7..."
              />
            </div>

            {/* Số tiền */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Số tiền (VNĐ) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  required
                  min="0"
                  step="1000"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
                  placeholder="1500000"
                />
              </div>
            </div>

            {/* Mã xe (Vehicle ID) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mã xe (Vehicle ID) <span className="text-gray-400 text-xs">(tùy chọn)</span>
              </label>
              <div className="relative">
                <Car className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  value={form.vehicleId}
                  onChange={(e) => setForm({ ...form, vehicleId: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
                  placeholder="Ví dụ: 101"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Nếu để trống sẽ không gắn xe cụ thể</p>
            </div>

            {/* Gắn quỹ */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gắn với Quỹ Chung
              </label>
              <select
                value={form.fundId}
                onChange={(e) => setForm({ ...form, fundId: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Không gắn quỹ</option>
                {funds.map((fund) => (
                  <option key={fund.fundId} value={fund.fundId}>
                    {fund.fundName} - {Number(fund.balance).toLocaleString('vi-VN')}đ
                  </option>
                ))}
              </select>
            </div>

            {/* Nút hành động */}
            <div className="flex gap-4 pt-8">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:shadow-xl transition disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Đang tạo...
                  </>
                ) : (
                  'Tạo Chi Phí Mới'
                )}
              </button>
              <Link
                href="/cost"
                className="px-8 py-4 border border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition"
              >
                Hủy
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
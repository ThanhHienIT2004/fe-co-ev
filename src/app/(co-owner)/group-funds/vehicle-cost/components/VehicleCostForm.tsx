'use client';
import { useState } from 'react';
import { useVehicleCost } from '@/libs/hooks/useVehicleCost';
import { useGroupFund } from '@/libs/hooks/useGroupFund';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Props {
  groupId: string;
}

export default function VehicleCostForm({ groupId }: Props) {
  const router = useRouter();
  const { create, loading } = useVehicleCost(groupId);
  const { funds } = useGroupFund(groupId);

  const [form, setForm] = useState({
    costName: '',
    amount: '',
    fundId: '', 
    vehicleId: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.costName.trim()) return alert('Vui lòng nhập tên chi phí');
    if (!form.amount || Number(form.amount) <= 0) return alert('Số tiền phải lớn hơn 0');

    try {
      await create({
        groupId: Number(groupId),
        costName: form.costName.trim(),
        amount: Number(form.amount),
        fundId: form.fundId ? Number(form.fundId) : undefined,
        vehicleId: form.vehicleId ? Number(form.vehicleId) : undefined,
      });

      alert('Thêm chi phí thành công!');
      router.push(`/group-funds/vehicle-cost?groupId=${groupId}`);
    } catch (err: any) {
      alert(err.response?.data?.message || err.message || 'Thêm chi phí thất bại');
      console.error('Create cost error:', err.response?.data || err.message || err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Tên chi phí *</label>
        <input
          type="text"
          value={form.costName}
          onChange={e => setForm({ ...form, costName: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Xăng, cầu đường, sửa xe..."
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Số tiền *</label>
        <input
          type="text"
          value={form.amount}
          onChange={e => setForm({ ...form, amount: e.target.value.replace(/\D/g, '') })}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 transition"
          placeholder="500000"
        />
        <p className="text-xs text-gray-500 mt-1">
          {form.amount ? Number(form.amount).toLocaleString('vi-VN') + 'đ' : ''}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Quỹ (tùy chọn)</label>
          <select
            value={form.fundId}
            onChange={e => setForm({ ...form, fundId: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="">Không dùng quỹ</option>
            {funds.map(f => (
              <option key={f.fundId} value={f.fundId}>
                {f.fundName} ({Number(f.balance).toLocaleString('vi-VN')}đ)
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Mã xe (tùy chọn)</label>
          <input
            type="text"
            value={form.vehicleId}
            onChange={e => setForm({ ...form, vehicleId: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Nhập ID xe (VD: 1)"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-medium hover:shadow-lg disabled:opacity-70 transition-all"
        >
          {loading ? 'Đang thêm...' : 'Thêm chi phí'}
        </button>
        <Link
          href={`/group-funds/vehicle-cost?groupId=${groupId}`}
          className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all font-medium text-center"
        >
          Hủy
        </Link>
      </div>
    </form>
  );
}

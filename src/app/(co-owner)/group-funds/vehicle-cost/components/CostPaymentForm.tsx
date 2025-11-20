'use client';
import { useState } from 'react';
import { useVehicleCost } from '@/libs/hooks/useVehicleCost';
import { useRouter } from 'next/navigation';

interface Props {
  groupId: number; // vẫn là number
  onSuccess?: () => void;
}

export default function VehicleCostForm({ groupId, onSuccess }: Props) {
  const { create } = useVehicleCost(String(groupId)); // Ép number → string
  const router = useRouter();
  const [form, setForm] = useState({
    costName: '',
    amount: '',
    vehicleId: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!form.costName || !form.amount) return alert('Vui lòng nhập đầy đủ');
  setLoading(true);

  // Chuyển vehicleId sang number, nếu rỗng thì gửi 0
  const vehicleIdNumber = form.vehicleId ? Number(form.vehicleId) : 0;

  try {
    await create({
      groupId,                     // number
      fundId: 1,                   // ví dụ tạm
      costName: form.costName,     
      amount: Number(form.amount), 
      vehicleId: vehicleIdNumber,  // gửi number cho backend
    });
    onSuccess?.();
    router.push('/group-funds/vehicle-cost');
  } catch (err: any) {
    alert(err.message);
  } finally {
    setLoading(false);
  }
};


  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Tên chi phí</label>
        <input
          type="text"
          value={form.costName}
          onChange={e => setForm({ ...form, costName: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Xăng dầu, sửa chữa..."
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Số tiền (VNĐ)</label>
        <input
          type="number"
          value={form.amount}
          onChange={e => setForm({ ...form, amount: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          min="0"
          step="1000"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Biển số xe</label>
        <input
          type="text"
          value={form.vehicleId}
          onChange={e => setForm({ ...form, vehicleId: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="59A1-12345"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition font-medium"
      >
        {loading ? 'Đang tạo...' : 'Tạo Chi Phí'}
      </button>
    </form>
  );
}

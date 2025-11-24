'use client';

import { useState, useEffect } from 'react';
import { useVehicleCost } from '@/libs/hooks/useVehicleCost';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Clock, XCircle, AlertCircle } from 'lucide-react';

export default function EditCostStatusPage() {
  const { id } = useParams<{ id: string }>();
  const { getById, updateStatus } = useVehicleCost('all');
  const router = useRouter();

  const [cost, setCost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) return;

    getById(Number(id))
      .then(setCost)
      .catch(() => {
        alert('Không tìm thấy chi phí');
        router.push('/cost');
      })
      .finally(() => setLoading(false));
  }, [id, getById, router]);

  const handleStatusChange = async (newStatus: 'pending' | 'paid' | 'cancelled') => {
    if (!cost || cost.status === newStatus) return;

    if (!confirm(`Chuyển trạng thái thành "${newStatus === 'paid' ? 'ĐÃ THANH TOÁN' : newStatus === 'pending' ? 'CHỜ THANH TOÁN' : 'ĐÃ HỦY'}"?`)) {
      return;
    }

    setSaving(true);
    try {
      await updateStatus(cost.costId, newStatus);
      alert('Cập nhật trạng thái thành công!');
      setCost({ ...cost, status: newStatus });
    } catch (err: any) {
      alert(err.response?.data?.message || 'Cập nhật thất bại!');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  if (!cost) return null;

  const statusConfig = {
    pending: { label: 'Chờ thanh toán', icon: Clock, color: 'yellow', bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-300' },
    paid: { label: 'Đã thanh toán', icon: CheckCircle2, color: 'green', bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-300' },
    cancelled: { label: 'Đã hủy', icon: XCircle, color: 'red', bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300' },
  };

  const current = statusConfig[cost.status];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Back button */}
        <Link href="/cost" className="inline-flex items-center gap-2 text-blue-600 hover:underline mb-8">
          <ArrowLeft className="w-4 h-4" /> Quay lại danh sách
        </Link>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8">
            <h1 className="text-3xl font-bold">Cập nhật trạng thái chi phí</h1>
            <p className="mt-2 text-indigo-100">ID: #{cost.costId}</p>
          </div>

          <div className="p-8 space-y-8">
            {/* Thông tin chi phí (chỉ xem) */}
            <div className="grid md:grid-cols-2 gap-6 text-gray-700">
              <div>
                <p className="text-sm font-medium text-gray-500">Tên chi phí</p>
                <p className="text-xl font-semibold mt-1">{cost.costName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Số tiền</p>
                <p className="text-2xl font-bold text-red-600 mt-1">
                  {Number(cost.amount).toLocaleString('vi-VN')}đ
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Nhóm</p>
                <p className="mt-1">Group ID: {cost.groupId}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Ngày tạo</p>
                <p className="mt-1">{new Date(cost.createdAt).toLocaleDateString('vi-VN')}</p>
              </div>
            </div>

            {/* Trạng thái hiện tại */}
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center">
              <p className="text-sm font-medium text-gray-600 mb-3">Trạng thái hiện tại</p>
              <div className={`inline-flex items-center gap-3 px-6 py-4 rounded-xl ${current.bg} ${current.text} font-bold text-lg`}>
                <current.icon className="w-7 h-7" />
                {current.label}
              </div>
            </div>

            {/* Chọn trạng thái mới */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-5 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-orange-500" />
                Chọn trạng thái mới
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {Object.entries(statusConfig).map(([key, config]) => {
                  const Icon = config.icon;
                  const isActive = cost.status === key;

                  return (
                    <button
                      key={key}
                      onClick={() => handleStatusChange(key as any)}
                      disabled={saving || isActive}
                      className={`relative py-5 px-6 rounded-xl font-medium text-lg transition-all border-2 flex flex-col items-center gap-3
                        ${isActive 
                          ? `${config.bg} ${config.text} border-${config.color}-400 shadow-lg cursor-not-allowed` 
                          : 'bg-white border-gray-300 hover:border-indigo-400 hover:shadow-md'
                        } 
                        disabled:opacity-60`}
                    >
                      <Icon className="w-10 h-10" />
                      <span>{config.label}</span>
                      {isActive && <span className="absolute top-2 right-2 text-xs bg-white px-2 py-1 rounded-full">Hiện tại</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Nút quay lại */}
            <div className="pt-6 border-t">
              <Link
                href="/cost"
                className="w-full block text-center py-4 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition"
              >
                Hoàn tất – Quay lại danh sách
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
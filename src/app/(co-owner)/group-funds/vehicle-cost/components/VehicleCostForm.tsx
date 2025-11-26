// app/(co-owner)/group-funds/vehicle-cost/components/VehicleCostForm.tsx
'use client';

import { FC, useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2, Car, DollarSign, FileText, ArrowLeft, AlertCircle } from 'lucide-react';

interface VehicleCostFormProps {
  groupId: string;
}

const VehicleCostForm: FC<VehicleCostFormProps> = ({ groupId }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [vehicleId, setVehicleId] = useState<number>(0);

  // Lấy userId từ localStorage (an toàn + debug rõ ràng)
  useEffect(() => {
    const rawUserId = localStorage.getItem('userId');
    console.log('Raw userId từ localStorage:', rawUserId);

    if (!rawUserId || rawUserId === 'null' || rawUserId === 'undefined') {
      console.warn('userId không hợp lệ hoặc chưa đăng nhập');
      setUserId(null);
      return;
    }

    const parsed = Number(rawUserId);
    if (isNaN(parsed) || parsed <= 0) {
      console.warn('userId không phải số hợp lệ:', rawUserId);
      setUserId(null);
    } else {
      setUserId(parsed);
    }
  }, []);

  // Lấy vehicleId từ localStorage (selectedGroup)
  useEffect(() => {
    try {
      const selected = localStorage.getItem('selectedGroup');
      if (selected) {
        const parsed = JSON.parse(selected);
        const vid = parsed.vehicleId ? Number(parsed.vehicleId) : 0;
        setVehicleId(vid);
        console.log('vehicleId từ selectedGroup:', vid);
      }
    } catch (err) {
      console.error('Lỗi parse selectedGroup:', err);
      setVehicleId(0);
    }
  }, []);

  const [form, setForm] = useState({
    costName: '',
    amount: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Kiểm tra userId nghiêm ngặt trước khi gửi
    if (!userId || userId <= 0) {
      alert('Không thể xác định tài khoản người dùng!\nVui lòng đăng nhập lại.');
      localStorage.removeItem('userId');
      router.push('/login'); // Đổi thành trang login của bạn
      return;
    }

    if (!form.costName.trim()) {
      return alert('Vui lòng nhập tên chi phí!');
    }

    if (!form.amount || Number(form.amount) <= 0) {
      return alert('Số tiền phải lớn hơn 0!');
    }

    // Cảnh báo nếu chưa có xe liên kết
    if (vehicleId === 0) {
      if (!confirm('Nhóm này chưa liên kết xe.\nBạn có muốn tạo chi phí chung (không gắn xe) không?')) {
        return;
      }
    }

    setSubmitting(true);
    try {
      const payload = {
        vehicleId: vehicleId || 0,
        costName: form.costName.trim(),
        amount: Number(form.amount),
      };

      console.log('Gửi API:', {
        url: `http://localhost:8082/payment/costs/${groupId}/${userId}`,
        payload,
      });

      await axios.post(
        `http://localhost:8082/payment/costs/${groupId}/${userId}`,
        payload,
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: 10000,
        }
      );

      alert('Thêm chi phí thành công!');
      router.push(`/group-funds/vehicle-cost?groupId=${groupId}`);
    } catch (err: any) {
      console.error('Lỗi tạo chi phí:', err);
      const msg = err.response?.data?.message || err.message || 'Lỗi không xác định!';
      alert('Lỗi: ' + msg);
    } finally {
      setSubmitting(false);
    }
  };

  const formatMoney = (value: string) => {
    const nums = value.replace(/\D/g, '');
    setForm(prev => ({ ...prev, amount: nums }));
  };

  const displayAmount = form.amount ? Number(form.amount).toLocaleString('vi-VN') : '0';

  // Đang load userId
  if (userId === null) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-indigo-600 mx-auto mb-4" />
          <p className="text-lg text-gray-600">Đang tải thông tin người dùng...</p>
        </div>
      </div>
    );
  }

  // userId không hợp lệ (sau khi đã load xong)
  if (userId <= 0) {
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-red-700 mb-3">Phiên đăng nhập hết hạn</h2>
          <p className="text-gray-600 mb-6">Vui lòng đăng nhập lại để tiếp tục.</p>
          <button
            onClick={() => {
              localStorage.clear();
              router.push('/login');
            }}
            className="bg-red-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-red-700"
          >
            Đi đến trang đăng nhập
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => router.push(`/group-funds/vehicle-cost?groupId=${groupId}`)}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-semibold mb-8 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          Quay lại danh sách
        </button>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
            <div className="flex items-center gap-4">
              <Car className="w-12 h-12" />
              <div>
                <h1 className="text-3xl font-bold">
                  Thêm Chi Phí Xe (Nhóm #{groupId})
                </h1>
                <p className="mt-2">
                  Xe liên kết:{' '}
                  <strong>{vehicleId === 0 ? 'Chưa có xe' : `Xe #${vehicleId}`}</strong>
                  {vehicleId === 0 && (
                    <span className="text-yellow-200 ml-2 text-sm">(gửi vehicleId = 0)</span>
                  )}
                </p>
                <p className="text-sm mt-2 opacity-90">
                  Người tạo: <strong>User ID #{userId}</strong>
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            <div>
              <label className="flex items-center gap-3 text-xl font-bold mb-3">
                <FileText className="w-6 h-6 text-indigo-600" />
                Tên chi phí <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.costName}
                onChange={(e) => setForm({ ...form, costName: e.target.value })}
                className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-indigo-500 text-lg transition"
                placeholder="VD: Bảo dưỡng lớn, Xăng dầu tháng 12, Phí gửi xe..."
                required
              />
            </div>

            <div>
              <label className="flex items-center gap-3 text-xl font-bold mb-3">
                <DollarSign className="w-6 h-6 text-green-600" />
                Số tiền (VNĐ) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                inputMode="numeric"
                value={form.amount}
                onChange={(e) => formatMoney(e.target.value)}
                className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-green-500 text-lg font-mono transition"
                placeholder="0"
                required
              />
              {form.amount ? (
                <div className="mt-4 p-5 bg-green-50 rounded-xl text-center border border-green-200">
                  <p className="text-3xl font-bold text-green-700">
                    {displayAmount} ₫
                  </p>
                  <p className="text-sm text-green-600 mt-1">Đã định dạng tự động</p>
                </div>
              ) : (
                <div className="mt-4 p-5 bg-gray-50 rounded-xl text-center text-gray-500">
                  Nhập số tiền để xem preview
                </div>
              )}
            </div>

            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                disabled={submitting || !form.costName.trim() || !form.amount}
                className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-5 rounded-xl font-bold text-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 hover:shadow-lg transition"
              >
                {submitting ? (
                  <Loader2 className="w-7 h-7 animate-spin" />
                ) : (
                  <Car className="w-7 h-7" />
                )}
                {submitting ? 'Đang lưu...' : 'Thêm chi phí'}
              </button>

              <button
                type="button"
                onClick={() => router.push(`/group-funds/vehicle-cost?groupId=${groupId}`)}
                className="px-8 py-5 bg-gray-100 rounded-xl font-bold text-gray-700 hover:bg-gray-200 transition"
              >
                Hủy
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VehicleCostForm;
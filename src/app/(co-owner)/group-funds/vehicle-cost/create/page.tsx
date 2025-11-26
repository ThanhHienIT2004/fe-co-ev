// app/group-funds/vehicle-cost/create/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import { ArrowLeft, Loader2, Car } from 'lucide-react';

export default function CreateVehicleCostPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const urlGroupId = searchParams.get('groupId');
  const urlVehicleId = searchParams.get('vehicleId');

  // State thông tin nhóm + xe
  const [groupId, setGroupId] = useState<string>('');
  const [groupName, setGroupName] = useState<string>('Đang tải...');
  const [vehiclePlate, setVehiclePlate] = useState<string>('Đang tải...');
  const [vehicleId, setVehicleId] = useState<string | null>(null);

  // State form + loading
  const [costName, setCostName] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  // Lấy userId (giống hệt trang tạo quỹ)
  const [userId, setUserId] = useState<string>('');

  // Load userId + thông tin nhóm từ localStorage (siêu nhanh)
  useEffect(() => {
    // Lấy userId trước
    const savedUserId = localStorage.getItem('userId');
    if (savedUserId) {
      setUserId(savedUserId);
    } else {
      alert('Không tìm thấy userId! Vui lòng đăng nhập lại.');
      router.replace('/');
      return;
    }

    // Lấy thông tin nhóm + xe
    try {
      const saved = localStorage.getItem('selectedGroup');
      if (saved) {
        const data = JSON.parse(saved);
        if (data.groupId) {
          setGroupId(String(data.groupId));
          setGroupName(data.groupName || `Nhóm #${data.groupId}`);
          setVehicleId(data.vehicleId ? String(data.vehicleId) : null);
          setVehiclePlate(data.vehiclePlate || (data.vehicleId ? `Xe ID ${data.vehicleId}` : 'Tất cả xe trong nhóm'));
          return;
        }
      }
    } catch (e) {
      console.error('Lỗi đọc localStorage:', e);
    }

    // Fallback: dùng URL
    if (urlGroupId) {
      setGroupId(urlGroupId);
      setGroupName(`Nhóm #${urlGroupId}`);
      setVehicleId(urlVehicleId || null);
      setVehiclePlate(urlVehicleId ? `Xe ID ${urlVehicleId}` : 'Tất cả xe trong nhóm');
    } else {
      router.replace('/group-funds/vehicle-cost');
    }
  }, [urlGroupId, urlVehicleId, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!costName.trim()) return alert('Vui lòng nhập tên chi phí!');
    if (!amount || Number(amount) <= 0) return alert('Số tiền phải lớn hơn 0!');

    setLoading(true);
    try {
      // ĐÚNG HOÀN TOÀN VỚI BACKEND CỦA BẠN: /costs/{groupId}/{userId}
      await axios.post(
        `http://localhost:8082/payment/costs/${groupId}/${userId}`,
        {
          costName: costName.trim(),
          amount: Number(amount),
          vehicleId: vehicleId ? Number(vehicleId) : null,
          status: 'pending',
        }
      );

      alert('Tạo chi phí xe thành công!');
      router.push(`/group-funds/vehicle-cost?groupId=${groupId}`);
    } catch (err: any) {
      console.error('Lỗi tạo chi phí:', err);
      const msg = err.response?.data?.message || 'Tạo chi phí thất bại!';
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  const formatMoney = (num: string) => {
    return num ? Number(num).toLocaleString('vi-VN') + ' ₫' : '';
  };

  // Loading nếu chưa có đủ dữ liệu
  if (!groupId || !userId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-cyan-600 mx-auto mb-4" />
          <p className="text-gray-600">Đang tải thông tin...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-teal-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Nút quay lại */}
        <Link
          href={`/group-funds/vehicle-cost?groupId=${groupId}`}
          className="inline-flex items-center gap-2 text-cyan-600 hover:text-cyan-800 font-medium mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Quay lại danh sách
        </Link>

        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">

          {/* Header đẹp như trang tạo quỹ */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
              <Car className="w-9 h-9" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Tạo Chi Phí Xe</h1>
              <p className="text-gray-600">
                Nhóm: <strong className="text-indigo-700">{groupName}</strong> • 
                Xe: <strong className="text-cyan-700">{vehiclePlate}</strong> • 
                Người tạo: <strong className="text-blue-700">User {userId}</strong>
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-8">

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Tên chi phí <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={costName}
                onChange={(e) => setCostName(e.target.value)}
                className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 transition text-lg"
                placeholder="VD: Thay lốp, sửa động cơ, bảo dưỡng định kỳ..."
                maxLength={100}
                required
              />
              <p className="text-xs text-gray-500 mt-2">{costName.length}/100 ký tự</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Số tiền (VNĐ) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                inputMode="numeric"
                value={amount}
                onChange={(e) => setAmount(e.target.value.replace(/\D/g, ''))}
                className="w-full px-5 py-4 rounded-2xl border-2 border-gray-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 transition text-lg font-mono"
                placeholder="1500000"
                required
              />
              {amount && (
                <div className="mt-4 p-5 bg-cyan-50 border border-cyan-200 rounded-2xl">
                  <p className="text-cyan-800 font-bold text-xl">
                    Số tiền: {formatMoney(amount)}
                  </p>
                </div>
              )}
            </div>

            {/* Nút hành động */}
            <div className="flex gap-4 pt-6">
              <button
                type="submit"
                disabled={loading || !costName.trim() || !amount}
                className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-5 rounded-2xl font-bold text-lg hover:from-cyan-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Đang tạo...
                  </>
                ) : (
                  'Tạo chi phí ngay'
                )}
              </button>

              <Link
                href={`/group-funds/vehicle-cost?groupId=${groupId}`}
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
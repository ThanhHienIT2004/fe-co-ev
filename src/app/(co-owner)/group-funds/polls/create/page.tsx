'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import CostSelect from '@/app/(co-owner)/group-funds/polls/components/CostSelect';
import { ArrowLeft, Loader2, Users, Calendar, Tag, AlertCircle } from 'lucide-react';
import axios from 'axios';

interface GroupInfo {
  groupId: number;
  groupName: string;
  vehiclePlate?: string;
}

export default function CreatePollPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const groupIdFromUrl = searchParams.get('groupId');

  // Lấy thông tin nhóm từ localStorage (đã lưu ở trang danh sách quỹ)
  const [groupInfo, setGroupInfo] = useState<GroupInfo | null>(null);
  const [groupId, setGroupId] = useState<string>('');

  useEffect(() => {
    const stored = localStorage.getItem('selectedGroup');
    if (stored) {
      const info = JSON.parse(stored);
      setGroupInfo(info);
      setGroupId(groupIdFromUrl || info.groupId.toString());
    } else if (groupIdFromUrl) {
      setGroupId(groupIdFromUrl);
    }
  }, [groupIdFromUrl]);

  const [description, setDescription] = useState('');
  const [selectedCostId, setSelectedCostId] = useState<number | null>(null);
  const [expiresAt, setExpiresAt] = useState('');
  const [loading, setLoading] = useState(false);

  // Giả sử bạn có userId từ auth (ở đây hardcode 1 để test)
  const currentUserId = 1;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!description.trim()) {
      alert('Vui lòng nhập nội dung bình chọn');
      return;
    }

    if (!groupId) {
      alert('Không xác định được nhóm');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        'http://localhost:8082/payment/polls',
        {
          groupId: Number(groupId),
          description: description.trim(),
          costId: selectedCostId,
          expiresAt: expiresAt || null,
        },
        {
          headers: {
            userId: currentUserId, // Backend lấy từ header
          },
        }
      );

      alert('Tạo bình chọn thành công!');
      router.push(`/group-funds/polls?groupId=${groupId}`);
    } catch (err: any) {
      console.error('Lỗi tạo poll:', err);
      alert(
        err.response?.data?.message ||
          err.message ||
          'Tạo bình chọn thất bại. Vui lòng thử lại!'
      );
    } finally {
      setLoading(false);
    }
  };

  if (!groupId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-green-50 flex items-center justify-center">
        <div className="text-center bg-white p-10 rounded-2xl shadow-xl">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Không tìm thấy nhóm
          </h2>
          <Link
            href="/group-funds"
            className="text-indigo-600 hover:underline"
          >
            ← Quay lại danh sách nhóm
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-green-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Link */}
        <Link
          href={`/group-funds/polls?groupId=${groupId}`}
          className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 mb-8 font-medium"
        >
          <ArrowLeft className="w-5 h-5" />
          Quay lại danh sách bình chọn
        </Link>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-8">
            <h1 className="text-4xl font-bold flex items-center gap-4">
              <Users className="w-12 h-12" />
              Tạo Bình Chọn Mới
            </h1>
            {groupInfo && (
              <div className="mt-4 text-emerald-50">
                <p className="text-xl font-medium">{groupInfo.groupName}</p>
                {groupInfo.vehiclePlate && (
                  <p className="text-sm opacity-90 mt-1">
                    {groupInfo.vehiclePlate}
                  </p>
                )}
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="p-10 space-y-8">
            {/* Nội dung bình chọn */}
            <div>
              <label className="flex items-center gap-3 text-lg font-semibold text-gray-800 mb-4">
                <Tag className="w-6 h-6 text-emerald-600" />
                Nội dung bình chọn <span className="text-red-500">*</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ví dụ: Có nên thay lốp xe mới trong tháng này không?"
                className="w-full px-6 py-5 text-lg border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition resize-none"
                rows={5}
                required
                disabled={loading}
              />
            </div>

            {/* Loại chi phí */}
            <div>
              <label className="flex items-center gap-3 text-lg font-semibold text-gray-800 mb-4">
                <Tag className="w-6 h-6 text-emerald-600" />
                Liên kết chi phí (tùy chọn)
              </label>
              <CostSelect
                groupId={groupId}
                value={selectedCostId}
                onChange={setSelectedCostId}
                disabled={loading}
              />
              <p className="mt-3 text-sm text-gray-600">
                Chọn nếu bình chọn liên quan đến một khoản chi cụ thể (bảo dưỡng, xăng, phí đường...)
              </p>
            </div>

            {/* Thời gian hết hạn */}
            <div>
              <label className="flex items-center gap-3 text-lg font-semibold text-gray-800 mb-4">
                <Calendar className="w-6 h-6 text-emerald-600" />
                Thời gian hết hạn (tùy chọn)
              </label>
              <input
                type="datetime-local"
                value={expiresAt}
                onChange={(e) => setExpiresAt(e.target.value)}
                className="w-full px-6 py-5 text-lg border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                disabled={loading}
              />
            </div>

            {/* Nút */}
            <div className="flex gap-6 pt-8">
              <button
                type="submit"
                disabled={loading || !description.trim()}
                className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xl font-bold py-5 rounded-2xl hover:shadow-2xl transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-7 h-7 animate-spin" />
                    Đang tạo bình chọn...
                  </>
                ) : (
                  'Tạo Bình Chọn Ngay'
                )}
              </button>

              <Link
                href={`/group-funds/polls?groupId=${groupId}`}
                className="px-10 py-5 bg-gray-100 text-gray-700 text-xl font-medium rounded-2xl hover:bg-gray-200 transition text-center"
              >
                Hủy bỏ
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
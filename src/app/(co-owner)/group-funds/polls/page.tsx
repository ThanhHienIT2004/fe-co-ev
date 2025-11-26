'use client';

import { useEffect, useState } from 'react';
import { usePoll } from '@/libs/hooks/usePoll';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import PollCard from './components/PollCard';
import { format } from 'date-fns';
import { Loader2, Users, Plus, Car, AlertCircle } from 'lucide-react';

interface GroupInfo {
  groupId: number;
  groupName: string;
  vehiclePlate?: string;
}

export default function PollListPage() {
  const searchParams = useSearchParams();
  const groupIdFromUrl = searchParams.get('groupId');

  const [groupInfo, setGroupInfo] = useState<GroupInfo | null>(null);
  const [groupId, setGroupId] = useState<string | null>(null);

  // 1. LẤY groupId TRƯỚC
  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('selectedGroup') : null;
    if (stored) {
      const parsed = JSON.parse(stored) as GroupInfo;
      setGroupInfo(parsed);
      setGroupId(groupIdFromUrl || String(parsed.groupId));
    } else if (groupIdFromUrl) {
      setGroupId(groupIdFromUrl);
    }
  }, [groupIdFromUrl]);

  // 2. GỌI usePoll() Ở ĐÂY – TRƯỚC MỌI ĐIỀU KIỆN!!!
  // Dù groupId là null thì vẫn gọi (để React giữ thứ tự hook ổn định)
  const { polls, loading, fetchAll, close, deletePoll } = usePoll(groupId ?? '');

  // 3. TẢI DỮ LIỆU KHI groupId có giá trị
  useEffect(() => {
    if (groupId) {
      fetchAll();
    }
  }, [groupId, fetchAll]);

  // 4. BÂY GIỜ MỚI ĐƯỢC DÙNG if/return – SAU KHI ĐÃ GỌI HẾT HOOK
  if (!groupId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-green-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md bg-white rounded-2xl shadow-2xl p-12">
          <AlertCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Không tìm thấy nhóm</h2>
          <p className="text-gray-600 mb-8">
            Vui lòng vào từ trang <strong>Quỹ chung</strong> hoặc thêm <code className="bg-gray-200 px-2 py-1 rounded">?groupId=1</code> vào URL
          </p>
          <Link href="/group-funds" className="inline-block bg-indigo-600 text-white px-8 py-4 rounded-xl hover:bg-indigo-700 transition text-lg font-medium">
            Quay lại danh sách nhóm
          </Link>
        </div>
      </div>
    );
  }

  const handleClose = async (id: number) => {
    if (!confirm('Đóng bình chọn này? Thành viên sẽ không thể vote nữa.')) return;
    try {
      await close(id);
      alert('Đã đóng bình chọn!');
    } catch (err: any) {
      alert('Có lỗi xảy ra');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Xóa vĩnh viễn bình chọn này? Không thể hoàn tác!')) return;
    try {
      await deletePoll(id);
      alert('Đã xóa bình chọn!');
    } catch (err: any) {
      alert('Có lỗi khi xóa');
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-green-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-gray-900 flex items-center gap-4">
            <Users className="w-12 h-12 text-emerald-600" />
            Bình Chọn
          </h1>

          {groupInfo ? (
            <div className="flex flex-wrap items-center gap-6 mt-6 text-gray-700">
              <span className="text-2xl font-bold text-emerald-700">{groupInfo.groupName}</span>
              {groupInfo.vehiclePlate && (
                <>
                  <span className="text-gray-400">•</span>
                  <span className="flex items-center gap-2 text-lg">
                    <Car className="w-6 h-6 text-emerald-600" />
                    <strong>{groupInfo.vehiclePlate}</strong>
                  </span>
                </>
              )}
              <span className="text-sm bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full font-medium">
                ID nhóm: {groupInfo.groupId}
              </span>
            </div>
          ) : (
            <p className="mt-4 text-xl text-gray-600">
              Nhóm ID: <strong className="text-emerald-700">{groupId}</strong>
            </p>
          )}
        </div>

        {/* Nút tạo mới */}
        <div className="flex justify-between items-center mb-12">
          <p className="text-lg text-gray-600">
            Tạo bình chọn để cả nhóm cùng quyết định chi tiêu một cách minh bạch và công bằng
          </p>
          <Link
            href={`/group-funds/polls/create?groupId=${groupId}`}
            className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all flex items-center gap-3 shadow-xl"
          >
            <Plus className="w-6 h-6" />
            Tạo bình chọn mới
          </Link>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-32">
            <Loader2 className="w-20 h-20 animate-spin text-emerald-600 mx-auto" />
            <p className="mt-6 text-xl text-gray-700">Đang tải danh sách bình chọn...</p>
          </div>
        )}

        {/* Không có dữ liệu */}
        {!loading && polls.length === 0 && (
          <div className="bg-white rounded-3xl shadow-2xl p-20 text-center border border-gray-100">
            <div className="w-32 h-32 mx-auto bg-emerald-100 rounded-full flex items-center justify-center mb-8">
              <Users className="w-16 h-16 text-emerald-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Chưa có bình chọn nào
            </h3>
            <p className="text-xl text-gray-600 mb-10">
              Hãy là người đầu tiên tạo bình chọn cho nhóm nhé!
            </p>
            <Link
              href={`/group-funds/polls/create?groupId=${groupId}`}
              className="inline-flex items-center gap-3 bg-emerald-600 text-white px-10 py-5 rounded-2xl text-xl font-bold hover:bg-emerald-700 transition shadow-lg"
            >
              <Plus className="w-7 h-7" />
              Tạo bình chọn đầu tiên
            </Link>
          </div>
        )}

        {/* Danh sách bình chọn */}
        {!loading && polls.length > 0 && (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {polls.map((poll) => (
              <PollCard
                key={poll.pollId}
                poll={poll}
                onClose={handleClose}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="mt-20 text-center text-gray-500 border-t pt-10">
          Cập nhật lúc:{' '}
          <strong className="text-gray-700 text-lg">
            {format(new Date(), 'HH:mm:ss, dd/MM/yyyy')}
          </strong>
        </div>
      </div>
    </div>
  );
}
'use client';
import { useEffect } from 'react';
import { usePoll } from '@/libs/hooks/usePoll';
import Link from 'next/link';
import PollCard from './components/PollCard';
import { format } from 'date-fns';

export default function PollListPage() {
  const { polls, loading, fetchAll, close, deletePoll } = usePoll();

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const handleClose = async (id: number) => {
    if (!confirm('Đóng bình chọn?')) return;
    try {
      await close(id);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Lỗi');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Xóa vĩnh viễn?')) return;
    try {
      await deletePoll(id);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Lỗi');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-green-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold text-black">Bình Chọn</h1>
            <p className="text-black mt-1">Nhóm: <strong>group_001</strong></p>
          </div>
          <Link
            href="/group-funds/polls/create"
            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg flex items-center gap-2"
          >
            Tạo mới
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
            <p className="text-black mt-4">Đang tải bình chọn nhóm group_001...</p>
          </div>
        ) : polls.length === 0 ? (
          <div className="bg-white rounded-2xl p-16 text-center shadow-md">
            <h3 className="text-xl font-bold text-black mb-2">Chưa có bình chọn</h3>
            <p className="text-black mb-4">Nhóm: group_001</p>
            <Link href="/group-funds/polls/create" className="text-green-600 underline">
              Tạo bình chọn đầu tiên
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {polls.map(poll => (
              <PollCard
                key={poll.pollId}
                poll={poll}
                onClose={handleClose}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        <div className="mt-12 text-center text-sm text-black">
          Cập nhật: <strong>{format(new Date(), 'HH:mm, dd/MM/yyyy')}</strong>
        </div>
      </div>
    </div>
  );
}

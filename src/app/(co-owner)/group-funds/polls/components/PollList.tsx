'use client';
import { useEffect } from 'react';
import { usePoll } from '@/libs/hooks/usePoll';
import PollCard from './PollCard';

// Nhận groupId từ component cha
export default function PollList({ groupId }: { groupId: string | number }) {
  const { polls, loading, fetchAll, close, deletePoll } = usePoll(groupId); // truyền vào đây

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {loading ? (
        <div className="text-center py-10">Đang tải...</div>
      ) : polls.length === 0 ? (
        <div className="text-center py-10 text-gray-500">Chưa có bình chọn</div>
      ) : (
        polls.map(poll => (
          <PollCard key={poll.pollId} poll={poll} onClose={close} onDelete={deletePoll} />
        ))
      )}
    </div>
  );
}
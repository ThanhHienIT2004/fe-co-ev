'use client';

import { useEffect, useState, useCallback } from 'react';
import { usePoll } from '@/libs/hooks/usePoll';
import { usePollVote } from '@/libs/hooks/usePollVote';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { format } from 'date-fns';

export default function PollDetailPage() {
  const { getById, close } = usePoll();
  const { vote, getResult, fetchByPoll } = usePollVote();
  const { id } = useParams();
  const router = useRouter();

  const pollId = id ? Number(id) : null;

  const [poll, setPoll] = useState<any>(null);
  const [votes, setVotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [myVote, setMyVote] = useState<'yes' | 'no' | 'abstain' | null>(null);

  const voteLabel: Record<'yes' | 'no' | 'abstain', string> = {
    yes: 'Đồng ý',
    no: 'Không',
    abstain: 'Kiêng',
  };

  useEffect(() => {
    if (!pollId || isNaN(pollId)) {
      router.push('/group-funds/polls');
    }
  }, [pollId, router]);

  // LOAD DATA
  const loadData = useCallback(async () => {
    if (!pollId || isNaN(pollId)) return;

    try {
      setLoading(true);

      const [p, v] = await Promise.all([getById(pollId), fetchByPoll(pollId)]);

      setPoll(p);
      setVotes(v);

      const userId = localStorage.getItem('userId') || '1';
      const userVote = v.find((vote: any) => vote.userId == userId);
      if (userVote?.voteValue) {
        setMyVote(userVote.voteValue as 'yes' | 'no' | 'abstain');
      }
    } catch (err) {
      alert('Không tải được bình chọn');
      router.push('/group-funds/polls');
    } finally {
      setLoading(false);
    }
  }, [pollId, getById, fetchByPoll, router]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleVote = useCallback(
    async (value: 'yes' | 'no' | 'abstain') => {
      if (!pollId) return;
      if (myVote === value) return;

      try {
        const userId = Number(localStorage.getItem('userId') || 1);
        const groupId = poll?.groupId || 1;

        const newVote = await vote(pollId, value, userId, groupId);

        setVotes((prev) => {
          const filtered = prev.filter((v) => v.userId !== newVote.userId);
          return [...filtered, newVote];
        });

        setMyVote(value);
      } catch (err: any) {
        alert(err.response?.data?.message || 'Bầu chọn thất bại. Vui lòng thử lại.');
      }
    },
    [pollId, vote, myVote, poll]
  );

  // ĐÓNG BÌNH CHỌN
  const handleClose = useCallback(async () => {
    if (!pollId || !confirm('Bạn có chắc muốn đóng bình chọn này?')) return;
    try {
      const closed = await close(pollId);
      setPoll(closed);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Đóng bình chọn thất bại');
    }
  }, [pollId, close]);

  if (!pollId) return null;
  if (loading) return <div className="text-center py-20 text-black">Đang tải...</div>;
  if (!poll) return <div className="text-center py-20 text-black">Không tìm thấy bình chọn</div>;

  const result = getResult(votes);
  const isActive = poll.status === 'active';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-green-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-black">{poll.description}</h1>
              <p className="text-black mt-2">
                Nhóm: <strong>{poll.groupName || poll.groupId}</strong>
              </p>
              {poll.costId && (
                <p className="text-orange-600 text-sm">Liên quan chi phí #{poll.costId}</p>
              )}
              <p className="text-gray-500 text-sm mt-2">
                Tạo lúc: {poll.createdAt ? format(new Date(poll.createdAt), 'dd/MM/yyyy HH:mm') : '-'}
              </p>
            </div>

            {isActive && (
              <button
                onClick={handleClose}
                className="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 px-5 py-3 rounded-lg font-medium transition"
              >
                Đóng bình chọn
              </button>
            )}
          </div>

          {/* NÚT BẦU CHỌN */}
          {isActive && !myVote && (
            <div className="grid grid-cols-3 gap-6 mb-10">
              <button
                onClick={() => handleVote('yes')}
                className="bg-green-600 hover:bg-green-700 text-white py-6 rounded-2xl font-bold text-xl transition transform hover:scale-105"
              >
                Đồng ý
              </button>
              <button
                onClick={() => handleVote('no')}
                className="bg-red-600 hover:bg-red-700 text-white py-6 rounded-2xl font-bold text-xl transition transform hover:scale-105"
              >
                Không đồng ý
              </button>
              <button
                onClick={() => handleVote('abstain')}
                className="bg-gray-600 hover:bg-gray-700 text-white py-6 rounded-2xl font-bold text-xl transition transform hover:scale-105"
              >
                Kiêng cử
              </button>
            </div>
          )}

          {/* HIỂN THỊ LỰA CHỌN CỦA BẠN */}
          {myVote && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl mb-8 text-center border border-blue-200">
              <p className="text-blue-800 font-semibold text-lg">
                Bạn đã bầu: <span className="font-bold text-xl">{voteLabel[myVote]}</span>
              </p>
            </div>
          )}

          {/* KẾT QUẢ THANH BAR – ĐÃ FIX 100% */}
          <div className="space-y-6 mt-10">
            {(['yes', 'no', 'abstain'] as const).map((val) => {
              const keyInResult = val.toLowerCase() as 'yes' | 'no' | 'abstain';
              const count = result[keyInResult] ?? 0;
              const percent = result.total ? Math.round((count / result.total) * 100) : 0;
              const color =
                val === 'yes' ? 'bg-green-600' : val === 'no' ? 'bg-red-600' : 'bg-gray-600';

              return (
                <div key={val} className="bg-gray-50 p-4 rounded-xl shadow-sm">
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold text-black">
                      {voteLabel[val]} <span className="text-gray-600 font-normal">({count} lượt)</span>
                    </span>
                    <span className="font-bold text-black">{percent}%</span>
                  </div>
                  <div className="w-full bg-gray-300 rounded-full h-10 overflow-hidden">
                    <div
                      className={`${color} h-full rounded-full transition-all duration-700 ease-out flex items-center justify-end pr-4 text-white font-bold shadow-md`}
                      style={{ width: `${percent}%` }}
                    >
                      {percent > 15 && `${percent}%`}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 pt-8 border-t text-center">
            <p className="text-lg font-medium text-black">
              Tổng cộng: <strong className="text-2xl">{result.total}</strong> lượt bầu
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Cập nhật lúc: {format(new Date(), 'HH:mm, dd/MM/yyyy')}
            </p>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link
            href="/group-funds/polls"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-medium transition"
          >
            ← Quay lại danh sách bình chọn
          </Link>
        </div>
      </div>
    </div>
  );
}
'use client';

import { useEffect, useState, useCallback } from 'react';
import { usePoll } from '@/libs/hooks/usePoll';
import { usePollVote } from '@/libs/hooks/usePollVote';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { format } from 'date-fns';
import { ArrowLeft, CheckCircle2, XCircle, MinusCircle, Users, Clock, AlertCircle } from 'lucide-react';

const voteConfig = 
  {
  yes: { label: 'Đồng ý', color: 'bg-green-600', icon: CheckCircle2 },
  no: { label: 'Không đồng ý', color: 'bg-red-600', icon: XCircle },
  abstain: { label: 'Kiêng cử', color: 'bg-gray-500', icon: MinusCircle },
} as const;


type VoteValue = 'yes' | 'no' | 'abstain';

export default function PollDetailPage() {
const { getById, close } = usePoll(undefined);
  const { vote, getResult, fetchByPoll } = usePollVote();
  const { id } = useParams();
  const router = useRouter();

  const pollId = id ? Number(id) : null;

  const [poll, setPoll] = useState<any>(null);
  const [votes, setVotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [myVote, setMyVote] = useState<VoteValue | null>(null);
  const [isVoting, setIsVoting] = useState(false);

  // Redirect nếu ID không hợp lệ
  useEffect(() => {
    if (!pollId || isNaN(pollId)) {
      router.replace('/group-funds/polls');
    }
  }, [pollId, router]);

  const loadData = useCallback(async () => {
    if (!pollId) return;

    try {
      const [pollData, voteData] = await Promise.all([
        getById(pollId),
        fetchByPoll(pollId).catch(() => []), // phòng lỗi
      ]);

      setPoll(pollData);
      setVotes(voteData || []);

      // Tìm vote của mình
      const userId = localStorage.getItem('userId') || '1';
      const myRecord = voteData?.find((v: any) => String(v.userId) === userId);
      setMyVote(myRecord?.voteValue || null);
    } catch (err) {
      alert('Không thể tải bình chọn này');
      router.replace('/group-funds/polls');
    } finally {
      setLoading(false);
    }
  }, [pollId, getById, fetchByPoll, router]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleVote = async (value: VoteValue) => {
    if (isVoting || myVote || !pollId || poll?.status !== 'OPEN') return;

    const expires = poll?.expiresAt ? new Date(poll.expiresAt) : null;
    if (expires && expires < new Date()) {
      alert('Bình chọn đã hết hạn!');
      return;
    }

    try {
      setIsVoting(true);
      const userId = Number(localStorage.getItem('userId') || 1);
      const groupId = poll?.groupId || 1;

      const newVoteRecord = await vote(pollId, value, userId, groupId);

      // Cập nhật danh sách vote
      setVotes(prev => {
        const filtered = prev.filter((v: any) => String(v.userId) !== String(userId));
        return newVoteRecord ? [...filtered, newVoteRecord] : filtered;
      });

      setMyVote(value);
      alert('Đã gửi phiếu bầu thành công!');
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Không thể bầu chọn. Vui lòng thử lại.');
    } finally {
      setIsVoting(false);
    }
  };

  const handleClose = async () => {
    if (!pollId || !confirm('Đóng bình chọn này?\nThành viên sẽ không thể vote nữa.')) return;

    try {
      const updated = await close(pollId);
      setPoll(updated);
      alert('Đã đóng bình chọn!');
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Không thể đóng bình chọn');
    }
  };

  // Tính trạng thái bình chọn
  const isOpen = poll?.status === 'OPEN';
  const expiresAt = poll?.expiresAt ? new Date(poll.expiresAt) : null;
  const isExpired = expiresAt ? expiresAt < new Date() : false;
  const canVote = isOpen && !isExpired && !myVote;

  const result = getResult(votes);
  const totalVotes = result.total || 0;

  // Loading state đẹp
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-xl text-gray-700">Đang tải bình chọn...</p>
        </div>
      </div>
    );
  }

  if (!poll) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-md">
          <AlertCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Không tìm thấy bình chọn</h2>
          <Link href="/group-funds/polls" className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-700 transition">
            ← Quay lại danh sách
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-green-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Back button */}
        <Link href="/group-funds/polls" className="inline-flex items-center gap-3 text-emerald-700 hover:text-emerald-800 font-semibold mb-8 transition">
          <ArrowLeft className="w-6 h-6" />
          Quay lại danh sách bình chọn
        </Link>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">

          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-10">
            <h1 className="text-4xl font-extrabold mb-6">{poll.description}</h1>
            <div className="flex flex-wrap items-center gap-6 text-lg">
              <span className="flex items-center gap-2">
                <Users className="w-6 h-6" />
                <strong>{poll.groupName || `Nhóm ID: ${poll.groupId}`}</strong>
              </span>
              {poll.costId && (
                <span className="bg-white/20 px-5 py-2 rounded-full font-bold">
                  Chi phí #{poll.costId}
                </span>
              )}
            </div>
            <div className="mt-6 text-emerald-50">
              <Clock className="w-5 h-5 inline mr-2" />
              Tạo: {format(new Date(poll.createdAt), 'HH:mm, dd/MM/yyyy')}
              {expiresAt && (
                <span className={isExpired ? 'text-red-200 ml-6' : 'ml-6'}>
                  • Hết hạn: {format(expiresAt, 'HH:mm, dd/MM/yyyy')}
                  {isExpired && ' (Đã hết hạn)'}
                </span>
              )}
            </div>
          </div>

          {/* Status */}
          <div className="px-10 pt-8">
            <span className={`inline-flex items-center gap-3 px-8 py-4 rounded-full text-xl font-bold ${
              canVote ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700'
            }`}>
              {canVote ? (
                <>ĐANG MỞ BẦU CHỌN</>
              ) : isExpired ? (
                <>ĐÃ HẾT HẠN</>
              ) : !isOpen ? (
                <>ĐÃ ĐÓNG</>
              ) : (
                <>ĐÃ KẾT THÚC</>
              )}
            </span>
          </div>

          {/* Nút vote lớn */}
          {canVote && (
            <div className="grid md:grid-cols-3 gap-8 px-10 py-12">
              {(Object.keys(voteConfig) as VoteValue[]).map((key) => {
                const { label, color, icon: Icon } = voteConfig[key];
                return (
                  <button
                    key={key}
                    onClick={() => handleVote(key)}
                    disabled={isVoting}
                    className={`relative overflow-hidden rounded-3xl shadow-2xl transform transition-all duration-300 ${
                      isVoting ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105 hover:shadow-3xl'
                    }`}
                  >
                    <div className={`${color} p-12 text-white text-center`}>
                      <Icon className="w-20 h-20 mx-auto mb-4 opacity-30" />
                      <div className="text-4xl font-extrabold">{label}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Đã vote */}
          {myVote && (
            <div className="mx-10 my-12 bg-gradient-to-r from-emerald-50 to-teal-50 border-l-8 border-emerald-600 rounded-2xl p-10 text-center shadow-xl">
              <p className="text-4xl font-bold text-emerald-800">
                Bạn đã chọn: <span className="text-5xl">{voteConfig[myVote].label}</span>
              </p>
              <p className="text-xl text-gray-700 mt-4">Cảm ơn bạn đã tham gia!</p>
            </div>
          )}

          {/* Kết quả */}
          <div className="bg-gray-50 px-12 py-12 border-t-4 border-gray-200">
            <h3 className="text-3xl font-bold text-center mb-10 text-gray-800">
              Kết quả hiện tại ({totalVotes} lượt bầu)
            </h3>

            {(Object.keys(voteConfig) as VoteValue[]).map((key) => {
              const count = result[key] || 0;
              const percent = totalVotes ? Math.round((count / totalVotes) * 100) : 0;
              const { label, color } = voteConfig[key];

              return (
                <div key={key} className="mb-8">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-2xl font-bold text-gray-800">
                      {label} <span className="text-lg font-normal text-gray-600">({count} phiếu)</span>
                    </span>
                    <span className="text-3xl font-extrabold text-gray-900">{percent}%</span>
                  </div>
                  <div className="h-20 bg-gray-300 rounded-full overflow-hidden shadow-inner">
                    <div
                      className={`${color} h-full rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-8 text-white text-3xl font-bold shadow-lg`}
                      style={{ width: `${percent}%` }}
                    >
                      {percent > 20 && `${percent}%`}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Nút đóng bình chọn (nếu còn mở) */}
          {isOpen && !isExpired && (
            <div className="text-center py-8">
              <button
                onClick={handleClose}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-5 px-12 rounded-2xl text-2xl shadow-2xl transform hover:scale-105 transition"
              >
                Đóng bình chọn ngay
              </button>
            </div>
          )}

          <div className="text-center text-gray-500 py-8 border-t">
            Cập nhật lúc: <strong className="text-lg">{format(new Date(), 'HH:mm:ss, dd/MM/yyyy')}</strong>
          </div>
        </div>

        {/* Back button dưới cùng */}
        <div className="text-center mt-12">
          <Link
            href="/group-funds/polls"
            className="inline-flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-5 px-12 rounded-2xl text-xl shadow-2xl transition"
          >
            ← Quay lại danh sách
          </Link>
        </div>
      </div>
    </div>
  );
}
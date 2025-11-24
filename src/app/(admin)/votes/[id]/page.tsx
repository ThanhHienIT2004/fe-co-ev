// src/app/(admin)/votes/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { usePoll } from '@/libs/hooks/usePoll';
import { usePollVote } from '@/libs/hooks/usePollVote';
import Link from 'next/link';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

import {
  ArrowLeft,
  Users,
  CheckCircle2,
  XCircle,
  MinusCircle,
  Calendar,
  AlertCircle,
  TrendingUp,
} from 'lucide-react';

import type { Poll } from '@/types/poll.type';

export default function AdminPollDetailPage() {
  const params = useParams();
  const router = useRouter();
  const pollId = Number(params.id);

  const { getById } = usePoll();
  const { fetchByPoll, votes, loading: loadingVotes, getResult } = usePollVote();

  const [poll, setPoll] = useState<Poll | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!pollId || isNaN(pollId)) {
      router.push('/admin/votes');
      return;
    }

    const loadData = async () => {
      try {
        const pollData = await getById(pollId);
        await fetchByPoll(pollId);
        setPoll(pollData);
      } catch (err) {
        console.error(err);
        alert('Không thể tải chi tiết bình chọn');
        router.push('/admin/votes');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [pollId, getById, fetchByPoll, router]);

  const result = getResult(votes);
  const totalVotes = result.yes + result.no + result.abstain;

  const yesPercent = totalVotes > 0 ? ((result.yes / totalVotes) * 100).toFixed(1) : 0;
  const noPercent = totalVotes > 0 ? ((result.no / totalVotes) * 100).toFixed(1) : 0;
  const abstainPercent = totalVotes > 0 ? ((result.abstain / totalVotes) * 100).toFixed(1) : 0;

  // Trạng thái bình chọn (dựa theo theo type Poll của bạn)
  const now = new Date();
  const endAt = poll?.endAt ? new Date(poll.endAt) : null;
  const isActive = poll && !poll.closedAt && endAt && endAt > now;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-6 text-xl text-gray-600">Đang tải chi tiết bình chọn...</p>
        </div>
      </div>
    );
  }

  if (!poll) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-12 text-center shadow-2xl max-w-md">
          <AlertCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Không tìm thấy bình chọn</h2>
          <Link href="/admin/votes" className="text-indigo-600 hover:underline font-medium">
            ← Quay lại danh sách
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Nút quay lại */}
        <Link href="/admin/votes" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 mb-8 font-medium text-lg">
          <ArrowLeft className="w-5 h-5" />
          Quay lại danh sách
        </Link>

        {/* Header bình chọn */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex justify-between items-start mb-6">
            <div className="max-w-4xl">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{poll.title}</h1>
              {poll.description && (
                <p className="text-lg text-gray-700 leading-relaxed">{poll.description}</p>
              )}
            </div>
            <span className={`px-6 py-3 rounded-full text-lg font-bold flex items-center gap-3 ${
              isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700'
            }`}>
              {isActive ? (
                <>TrendingUp Đang mở</>
              ) : (
                <>XCircle Đã đóng</>
              )}
            </span>
          </div>

          {/* Thống kê nhanh */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-6 rounded-xl shadow-lg">
              <p className="text-blue-100 text-sm">Tổng lượt vote</p>
              <p className="text-4xl font-bold mt-2">{totalVotes.toLocaleString()}</p>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-6 rounded-xl shadow-lg">
              <p className="text-green-100 text-sm flex items-center gap-2">CheckCircle2 Đồng ý</p>
              <p className="text-4xl font-bold mt-2">{result.yes}</p>
            </div>
            <div className="bg-gradient-to-br from-red-500 to-rose-600 text-white p-6 rounded-xl shadow-lg">
              <p className="text-red-100 text-sm flex items-center gap-2">XCircle Không đồng ý</p>
              <p className="text-4xl font-bold mt-2">{result.no}</p>
            </div>
            <div className="bg-gradient-to-br from-gray-500 to-gray-600 text-white p-6 rounded-xl shadow-lg">
              <p className="text-gray-100 text-sm flex items-center gap-2">MinusCircle Kiêng cử</p>
              <p className="text-4xl font-bold mt-2">{result.abstain}</p>
            </div>
          </div>

          <div className="mt-8 text-sm text-gray-600 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Hạn chót: <strong>
              {poll.endAt ? format(new Date(poll.endAt), 'HH:mm, EEEE, dd/MM/yyyy', { locale: vi }) : 'Không xác định'}
            </strong>
          </div>
        </div>

        {/* Kết quả dạng thanh ngang + phần trăm (thay thế biểu đồ) */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Kết quả bình chọn</h2>

          {totalVotes === 0 ? (
            <div className="text-center py-20">
              <Users className="w-24 h-24 text-gray-300 mx-auto mb-6" />
              <p className="text-xl text-gray-600">Chưa có lượt vote nào</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Đồng ý */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-green-700 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" /> Đồng ý
                  </span>
                  <span className="font-bold text-green-700">{result.yes} lượt • {yesPercent}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-10 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-green-500 to-emerald-600 h-full rounded-full flex items-center justify-end pr-4 text-white font-bold transition-all duration-700"
                    style={{ width: `${yesPercent}%` }}
                  >
                    {yesPercent}%
                  </div>
                </div>
              </div>

              {/* Không đồng ý */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-red-700 flex items-center gap-2">
                    <XCircle className="w-5 h-5" /> Không đồng ý
                  </span>
                  <span className="font-bold text-red-700">{result.no} lượt • {noPercent}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-10 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-red-500 to-rose-600 h-full rounded-full flex items-center justify-end pr-4 text-white font-bold transition-all duration-700"
                    style={{ width: `${noPercent}%` }}
                  >
                    {noPercent}%
                  </div>
                </div>
              </div>

              {/* Kiêng cử */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-gray-600 flex items-center gap-2">
                    <MinusCircle className="w-5 h-5" /> Kiêng cử
                  </span>
                  <span className="font-bold text-gray-600">{result.abstain} lượt • {abstainPercent}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-10 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-gray-400 to-gray-600 h-full rounded-full flex items-center justify-end pr-4 text-white font-bold transition-all duration-700"
                    style={{ width: `${abstainPercent}%` }}
                  >
                    {abstainPercent}%
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Danh sách người vote */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-8 py-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
            <h2 className="text-2xl font-bold">Danh sách người tham gia ({votes.length})</h2>
          </div>

          {loadingVotes ? (
            <div className="p-16 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent" />
            </div>
          ) : votes.length === 0 ? (
            <div className="p-20 text-center">
              <Users className="w-24 h-24 text-gray-300 mx-auto mb-6" />
              <p className="text-xl text-gray-600">Chưa có ai tham gia bình chọn</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="px-8 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Người vote</th>
                    <th className="px-8 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Lựa chọn</th>
                    <th className="px-8 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Thời gian</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {votes.map((vote: any) => (
                    <tr key={vote.pollVoteId ?? vote.userId} className="hover:bg-gray-50 transition">
                      <td className="px-8 py-5">
                        <p className="font-semibold text-gray-900">User ID: {vote.userId}</p>
                        <p className="text-sm text-gray-500">Nhóm: {vote.groupId ?? '—'}</p>
                      </td>
                      <td className="px-8 py-5">
                        <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold ${
                          vote.voteValue === 'yes' ? 'bg-green-100 text-green-800' :
                          vote.voteValue === 'no' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {vote.voteValue === 'yes' && <CheckCircle2 className="w-4 h-4" />}
                          {vote.voteValue === 'no' && <XCircle className="w-4 h-4" />}
                          {vote.voteValue === 'abstain' && <MinusCircle className="w-4 h-4" />}
                          {vote.voteValue === 'yes' ? 'Đồng ý' : vote.voteValue === 'no' ? 'Không đồng ý' : 'Kiêng cử'}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-sm text-gray-600">
                        {format(new Date(vote.createdAt), 'HH:mm, dd/MM/yyyy', { locale: vi })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="mt-16 text-center text-sm text-gray-500">
          © 2025 Hệ thống Đồng sở hữu Xe Điện • Trang quản trị Admin
        </div>
      </div>
    </div>
  );
}
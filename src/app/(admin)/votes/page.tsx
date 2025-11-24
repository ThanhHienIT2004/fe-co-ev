// src/app/(admin)/votes/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { usePoll } from '@/libs/hooks/usePoll';
import Link from 'next/link';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import {
  BarChart3,
  CheckCircle2,
  XCircle,
  Clock,
  Users,
  Plus,
  Search,
  Filter,
  ChevronDown,
  Eye,
  Trash2,
  AlertCircle,
  TrendingUp,
} from 'lucide-react';

import type { Poll } from '@/types/poll.type';

interface PollOption {
  optionId?: number;
  text: string;
  votes: number;
}

export default function AdminVoteManagement() {
  const { polls = [], loading, fetchAll, close, deletePoll } = usePoll();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'closed'>('all');

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const handleClose = async (id: number) => {
    if (!confirm('Bạn có chắc chắn muốn ĐÓNG bình chọn này?\nNgười dùng sẽ không thể vote nữa.')) return;
    try {
      await close(id);
      alert('Đóng bình chọn thành công!');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Lỗi khi đóng bình chọn');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('XÓA VĨNH VIỄN bình chọn này?\nHành động KHÔNG THỂ HOÀN TÁC!\nTất cả dữ liệu sẽ bị xóa.')) return;
    try {
      await deletePoll(id);
      alert('Xóa bình chọn thành công!');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Lỗi khi xóa');
    }
  };

  // Lọc + tìm kiếm
  const filteredPolls = polls
    .filter((poll): poll is Poll => !!poll && 'pollId' in poll)
    .filter((poll) => {
      const matchesSearch = !searchTerm.trim() ||
        poll.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        poll.description?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'all' ||
        (statusFilter === 'active' && (!poll.closedAt && new Date(poll.endAt) > new Date())) ||
        (statusFilter === 'closed' && (poll.closedAt || new Date(poll.endAt) <= new Date()));

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  // Thống kê
  const totalPolls = polls.length;
  const activePolls = polls.filter(p => !p.closedAt && new Date(p.endAt) > new Date()).length;
  const closedPolls = polls.filter(p => p.closedAt || new Date(p.endAt) <= new Date()).length;
  const totalVotes = polls.reduce((sum, p) => sum + (p.totalVotes || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-start mb-10">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Quản Lý Bình Chọn</h1>
            <p className="text-gray-600 mt-2">Admin • Toàn quyền quản lý tất cả bình chọn trong hệ thống</p>
          </div>
          <Link
            href="/admin/votes/create"
            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-4 rounded-xl font-semibold hover:shadow-2xl transition flex items-center gap-3 shadow-lg"
          >
            <Plus className="w-6 h-6" />
            Tạo Bình Chọn Mới
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-6 rounded-2xl shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Tổng bình chọn</p>
                <p className="text-4xl font-bold mt-2">{totalPolls}</p>
              </div>
              <BarChart3 className="w-12 h-12 text-blue-200 opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-6 rounded-2xl shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Đang mở</p>
                <p className="text-4xl font-bold mt-2">{activePolls}</p>
              </div>
              <TrendingUp className="w-12 h-12 text-green-200 opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-500 to-gray-600 text-white p-6 rounded-2xl shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-100 text-sm">Đã kết thúc</p>
                <p className="text-4xl font-bold mt-2">{closedPolls}</p>
              </div>
              <XCircle className="w-12 h-12 text-gray-200 opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white p-6 rounded-2xl shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Tổng lượt vote</p>
                <p className="text-4xl font-bold mt-2">{totalVotes.toLocaleString()}</p>
              </div>
              <Users className="w-12 h-12 text-purple-200 opacity-80" />
            </div>
          </div>
        </div>

        {/* Tìm kiếm + Lọc */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-200">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm tiêu đề, mô tả..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition text-gray-700"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="pl-12 pr-10 py-4 border border-gray-300 rounded-xl appearance-none bg-white focus:ring-2 focus:ring-indigo-500 cursor-pointer outline-none transition text-gray-700 font-medium"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="active">Đang mở</option>
                <option value="closed">Đã kết thúc</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Danh sách bình chọn */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-indigo-600 border-t-transparent"></div>
            <p className="mt-6 text-xl text-gray-600">Đang tải danh sách bình chọn...</p>
          </div>
        ) : filteredPolls.length === 0 ? (
          <div className="bg-white rounded-2xl p-20 text-center shadow-xl border border-gray-200">
            <AlertCircle className="w-20 h-20 text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Không tìm thấy bình chọn</h3>
            <p className="text-gray-600">
              {searchTerm || statusFilter !== 'all'
                ? 'Không có kết quả phù hợp với bộ lọc hiện tại'
                : 'Chưa có bình chọn nào trong hệ thống'}
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {filteredPolls.map((poll) => {
              const options: PollOption[] = poll.options || [];
              const isYesNoPoll = !options.length;
              const totalVotesInPoll = poll.totalVotes || 0;

              return (
                <div
                  key={poll.pollId}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100"
                >
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{poll.title}</h3>
                        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                          <span className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            {totalVotesInPoll} lượt vote
                          </span>
                          <span className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            Tạo: {format(new Date(poll.createdAt), 'dd/MM/yyyy HH:mm', { locale: vi })}
                          </span>
                          {poll.endAt && (
                            <span className="flex items-center gap-2">
                              Hạn: {format(new Date(poll.endAt), 'dd/MM/yyyy HH:mm', { locale: vi })}
                            </span>
                          )}
                        </div>
                      </div>

                      <span className={`px-5 py-3 rounded-full text-lg font-bold flex items-center gap-3 ${
                        (!poll.closedAt && new Date(poll.endAt) > new Date())
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {(!poll.closedAt && new Date(poll.endAt) > new Date()) ? (
                          <>CheckCircle2 Đang mở</>
                        ) : (
                          <>XCircle Đã kết thúc</>
                        )}
                      </span>
                    </div>

                    {poll.description && (
                      <p className="text-gray-700 mb-6 leading-relaxed">{poll.description}</p>
                    )}

                    {/* Hiển thị kết quả theo loại bình chọn */}
                    {isYesNoPoll ? (
                      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 mb-8 border border-indigo-100">
                        <p className="font-semibold text-indigo-800 mb-4">Loại: Bình chọn Yes/No/Kiêng cử</p>
                        <div className="text-2xl font-bold text-indigo-700">
                          {totalVotesInPoll > 0 ? `${poll.yesVotes || 0} Đồng ý` : 'Chưa có lượt vote'}
                        </div>
                      </div>
                    ) : options.length > 0 ? (
                      <div className="space-y-4 mb-8">
                        <p className="font-semibold text-indigo-800">Top lựa chọn:</p>
                        {options
                          .sort((a, b) => b.votes - a.votes)
                          .slice(0, 3)
                          .map((opt, idx) => (
                            <div
                              key={opt.optionId || idx}
                              className="flex items-center justify-between bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-5 border border-indigo-100"
                            >
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                                  {idx + 1}
                                </div>
                                <span className="font-medium text-gray-800 text-lg max-w-md truncate">{opt.text}</span>
                              </div>
                              <div className="text-right">
                                <p className="text-3xl font-bold text-indigo-600">{opt.votes}</p>
                                <p className="text-sm text-gray-500">lượt bầu</p>
                              </div>
                            </div>
                          ))}
                        {options.length > 3 && (
                          <p className="text-center text-sm text-gray-500 italic pt-4">
                            … và {options.length - 3} lựa chọn khác
                          </p>
                        )}
                      </div>
                    ) : null}

                    {/* Nút hành động */}
                    <div className="flex justify-end gap-4 flex-wrap">
                      <Link
                        href={`/admin/votes/${poll.pollId}`}
                        className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition flex items-center gap-2"
                      >
                        <Eye className="w-5 h-5" /> Xem chi tiết
                      </Link>

                      {(!poll.closedAt && new Date(poll.endAt) > new Date()) && (
                        <button
                          onClick={() => handleClose(poll.pollId)}
                          className="px-6 py-3 bg-yellow-600 text-white rounded-xl font-medium hover:bg-yellow-700 transition flex items-center gap-2"
                        >
                          <XCircle className="w-5 h-5" /> Đóng ngay
                        </button>
                      )}

                      <button
                        onClick={() => handleDelete(poll.pollId)}
                        className="px-6 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition flex items-center gap-2"
                      >
                        <Trash2 className="w-5 h-5" /> Xóa vĩnh viễn
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-16 text-center text-sm text-gray-500">
          © 2025 Hệ thống Đồng sở hữu Xe Điện • Admin Panel • Cập nhật:{' '}
          {format(new Date(), 'HH:mm, dd/MM/yyyy', { locale: vi })}
        </div>
      </div>
    </div>
  );
}
// src/app/(admin)/payments/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import Link from 'next/link';
import { useAdminPayments } from '@/libs/hooks/useAdminPayments';
import api from '@/libs/apis/api';

interface PaymentDTO {
  paymentId: number;
  groupId: number;
  amount: string;
  status: string;
  userName?: string;
  performedBy?: string;
  gatewayOrderId?: string | null;
  createdAt: string;
}

interface FundTransactionDTO {
  transactionId: number;
  fundId: number;
  transactionType: 'DEPOSIT' | 'WITHDRAW' | 'COST_PAYMENT';
  amount: string;
  performedBy: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
  gatewayOrderId?: string | null;
  costId?: number | null;
  createdAt: string;
}

interface TransactionItem {
  id: string;
  type: 'GROUP_DEPOSIT' | 'FUND_DEPOSIT' | 'WITHDRAW' | 'COST_PAYMENT';
  title: string;
  amount: number;
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
  performedBy: string;
  groupId?: number;
  fundId?: number;
  costId?: number | null;
  gatewayOrderId?: string | null;
  createdAt: string;
}

export default function AdminPaymentsPage() {
  const { transactions: fundTransactions, stats, loading: fundLoading, error: fundError, refetch } = useAdminPayments();

  const [groupPayments, setGroupPayments] = useState<PaymentDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'all' | 'group' | 'fund' | 'pending'>('all');
  const [search, setSearch] = useState('');

  // LẤY TẤT CẢ NẠP TIỀN NHÓM
  useEffect(() => {
    const fetchGroupPayments = async () => {
      try {
        setLoading(true);
        const res = await api.get<PaymentDTO[]>('/payments');
        setGroupPayments(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.warn('Không tải được nạp tiền nhóm:', err);
        setGroupPayments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGroupPayments();
    const interval = setInterval(fetchGroupPayments, 15000);
    return () => clearInterval(interval);
  }, []);

  // GỘP DỮ LIỆU: NẠP NHÓM + GIAO DỊCH QUỸ
  const allData: TransactionItem[] = [
    // 1. Nạp tiền nhóm (từ PaymentController)
    ...groupPayments.map(p => ({
      id: `GRP_${p.paymentId}`,
      type: 'GROUP_DEPOSIT' as const,
      title: `Nạp tiền nhóm #${p.groupId}`,
      amount: Number(p.amount),
      status: (p.status || 'PENDING').toUpperCase() as any,
      performedBy: p.userName || p.performedBy || 'Người dùng',
      groupId: p.groupId,
      gatewayOrderId: p.gatewayOrderId ?? undefined,
      createdAt: p.createdAt,
    })),

    // 2. Giao dịch quỹ (từ hook)
    ...fundTransactions.map(t => ({
      id: `FUND_${t.transactionId}`,
      type: t.transactionType === 'DEPOSIT' ? 'FUND_DEPOSIT' as const :
             t.transactionType === 'WITHDRAW' ? 'WITHDRAW' as const : 'COST_PAYMENT' as const,
      title:
        t.transactionType === 'DEPOSIT' ? `Nạp vào quỹ #${t.fundId}` :
        t.transactionType === 'WITHDRAW' ? `Rút từ quỹ #${t.fundId}` :
        `Thanh toán chi phí #${t.costId ?? '?'}`,
      amount: t.transactionType === 'DEPOSIT' ? Number(t.amount) : -Number(t.amount),
      status: t.status,
      performedBy: t.performedBy,
      fundId: t.fundId,
      costId: t.costId ?? undefined,
      gatewayOrderId: t.gatewayOrderId ?? undefined,
      createdAt: t.createdAt,
    })),
  ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const filtered = allData.filter(item => {
    if (tab === 'group' && item.type !== 'GROUP_DEPOSIT') return false;
    if (tab === 'fund' && item.type === 'GROUP_DEPOSIT') return false;
    if (tab === 'pending' && item.status !== 'PENDING') return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        item.id.toLowerCase().includes(q) ||
        item.title.toLowerCase().includes(q) ||
        item.performedBy.toLowerCase().includes(q) ||
        (item.gatewayOrderId && item.gatewayOrderId.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const pendingCount = allData.filter(t => t.status === 'PENDING').length;
  const isLoading = loading || fundLoading;

  if (fundError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center p-8">
        <div className="bg-white p-12 rounded-3xl shadow-2xl text-center max-w-lg">
          <h2 className="text-3xl font-bold text-red-600 mb-4">Lỗi hệ thống</h2>
          <p className="text-gray-600 mb-8">{fundError}</p>
          <button onClick={refetch} className="bg-red-600 text-white px-10 py-4 rounded-2xl hover:bg-red-700 font-bold transition">
            Thử lại ngay
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Admin • Quản Lý Thanh Toán
          </h1>
          <p className="text-xl text-gray-600 mt-4">
            Toàn bộ nạp tiền nhóm & giao dịch quỹ xe chung
          </p>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div className="bg-white p-8 rounded-3xl shadow-lg border text-center">
              <p className="text-gray-600 text-lg">Tổng giao dịch</p>
              <p className="text-5xl font-extrabold text-gray-900 mt-3">{stats.totalTransactions + groupPayments.length}</p>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-8 rounded-3xl shadow-lg border-2 border-emerald-300 text-center">
              <p className="text-emerald-700 text-lg">Tổng nạp</p>
              <p className="text-5xl font-extrabold text-emerald-600 mt-3">
                +{(stats.totalDeposit + groupPayments.reduce((s, p) => s + Number(p.amount), 0)).toLocaleString('vi-VN')}đ
              </p>
            </div>
            <div className="bg-gradient-to-br from-rose-50 to-rose-100 p-8 rounded-3xl shadow-lg border-2 border-rose-300 text-center">
              <p className="text-rose-700 text-lg">Tổng rút</p>
              <p className="text-5xl font-extrabold text-rose-600 mt-3">
                -{stats.totalWithdraw.toLocaleString('vi-VN')}đ
              </p>
            </div>
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-8 rounded-3xl shadow-lg border-2 border-indigo-300 text-center">
              <p className="text-indigo-700 text-lg">Chi phí đã TT</p>
              <p className="text-5xl font-extrabold text-indigo-600 mt-3">
                {stats.totalCostPayment.toLocaleString('vi-VN')}đ
              </p>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-3xl shadow-xl border mb-8 overflow-hidden">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              { key: 'all', label: 'Tất cả', count: allData.length },
              { key: 'group', label: 'Nạp tiền nhóm', count: groupPayments.length },
              { key: 'fund', label: 'Giao dịch quỹ', count: fundTransactions.length },
              { key: 'pending', label: 'Chờ duyệt', count: pendingCount },
            ].map(t => (
              <button
                key={t.key}
                onClick={() => setTab(t.key as any)}
                className={`py-6 font-bold text-lg transition relative ${
                  tab === t.key
                    ? t.key === 'pending'
                      ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white'
                      : 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {t.label}
                <span className="ml-3 px-4 py-1 bg-white text-blue-600 rounded-full text-sm font-bold">
                  {t.count}
                </span>
                {t.key === 'pending' && pendingCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full animate-ping"></span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Tìm kiếm mã GD, người dùng, mã VNPAY..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full px-8 py-5 text-lg border-2 border-gray-200 rounded-3xl focus:ring-4 focus:ring-blue-200 focus:border-blue-500 outline-none transition"
          />
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="text-center py-32">
            <div className="inline-block animate-spin rounded-full h-20 w-20 border-8 border-blue-500 border-t-transparent"></div>
            <p className="mt-8 text-2xl text-gray-600 font-medium">Đang tải dữ liệu thanh toán...</p>
          </div>
        )}

        {/* List */}
        {!isLoading && filtered.length > 0 && (
          <div className="space-y-6">
            {filtered.map(item => (
              <div
                key={item.id}
                className={`p-8 rounded-3xl shadow-xl border-2 transition-all hover:shadow-2xl ${
                  item.status === 'PENDING' ? 'border-amber-400 bg-amber-50' :
                  item.status === 'COMPLETED' ? 'border-green-400 bg-green-50' :
                  'border-gray-200 bg-white'
                }`}
              >
                <div className="flex justify-between items-start gap-8">
                  <div className="flex items-center gap-6 flex-1">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg ${
                      item.type === 'GROUP_DEPOSIT' ? 'bg-gradient-to-r from-cyan-500 to-blue-600' :
                      item.type === 'FUND_DEPOSIT' ? 'bg-emerald-600' :
                      item.type === 'WITHDRAW' ? 'bg-rose-600' :
                      'bg-indigo-600'
                    }`}>
                      {item.type.includes('DEPOSIT') ? 'N' : item.type === 'WITHDRAW' ? 'R' : 'C'}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900">{item.title}</h3>
                      <p className="text-lg text-gray-600 mt-1">
                        {item.performedBy} • {format(new Date(item.createdAt), 'HH:mm - dd/MM/yyyy')}
                      </p>
                      {item.gatewayOrderId && (
                        <code className="text-sm bg-gray-100 px-4 py-2 rounded-lg mt-3 inline-block font-mono text-gray-700">
                          {item.gatewayOrderId}
                        </code>
                      )}
                    </div>
                  </div>

                  <div className="text-right">
                    <p className={`text-4xl font-extrabold ${item.amount > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {item.amount > 0 ? '+' : ''}{Math.abs(item.amount).toLocaleString('vi-VN')}đ
                    </p>
                    <div className="mt-4">
                      <span className={`inline-block px-6 py-3 rounded-2xl text-lg font-bold border-2 ${
                        item.status === 'COMPLETED' ? 'bg-green-100 text-green-800 border-green-300' :
                        item.status === 'PENDING' ? 'bg-amber-100 text-amber-800 border-amber-300' :
                        item.status === 'FAILED' ? 'bg-red-100 text-red-800 border-red-300' :
                        'bg-gray-100 text-gray-700 border-gray-300'
                      }`}>
                        {item.status === 'COMPLETED' ? 'HOÀN TẤT' : 
                         item.status === 'PENDING' ? 'CHỜ DUYỆT' : 
                         item.status === 'FAILED' ? 'THẤT BẠI' : item.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/*<div className="mt-6 pt-6 border-t border-gray-200 flex flex-wrap gap-4 text-blue-600">
                  {item.groupId && <Link href={`/group-fund/fund/${item.groupId}`} className="hover:underline font-medium">Xem nhóm</Link>}
                  {item.fundId && <Link href={`/group-fund/fund/${item.fundId}`} className="hover:underline font-medium">Xem quỹ</Link>}
                  {item.costId && <Link href={`/vehhicle-cost/${item.costId}`} className="hover:underline font-medium">Xem chi phí</Link>}
                </div>*/}
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && filtered.length === 0 && (
          <div className="text-center py-32 bg-white rounded-3xl shadow">
            <p className="text-2xl text-gray-500 font-medium">Không có giao dịch nào phù hợp</p>
          </div>
        )}

        <div className="mt-16 text-center text-gray-500 text-sm">
          Cập nhật tự động mỗi 15 giây • {format(new Date(), 'HH:mm:ss, dd/MM/yyyy')}
        </div>
      </div>
    </div>
  );
}
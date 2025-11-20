// src/libs/hooks/useAdminPayments.ts
'use client';

import { useState, useEffect, useCallback } from 'react';
import api from '@/libs/apis/api';

export interface FundTransactionDTO {
  transactionId: number;
  fundId: number;
  paymentId?: number | null;
  costId?: number | null;
  transactionType: 'DEPOSIT' | 'WITHDRAW' | 'COST_PAYMENT';
  amount: string;
  description?: string | null;
  performedBy: string;
  gatewayOrderId?: string | null;
  status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
  createdAt: string;
}

export interface AdminStats {
  totalTransactions: number;
  totalDeposit: number;
  totalWithdraw: number;
  totalCostPayment: number;
  pendingCount: number;
  recentTransactions: Array<{
    id: number;
    title: string;
    amount: number;
    date: string;
    status: string;
    type: 'deposit' | 'withdraw' | 'cost';
  }>;
}

export const useAdminPayments = () => {
  const [transactions, setTransactions] = useState<FundTransactionDTO[]>([]);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // DUY NHẤT 1 REQUEST – SIÊU NHANH
      const res = await api.get<FundTransactionDTO[]>('/transactions/admin/fund-transactions');
      const data = res.data || [];

      // Sort mới nhất trước
      const Sorted = [...data].sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      setTransactions(Sorted);

      // Tính stats từ transactions (không cần gọi thêm API)
      const completed = Sorted.filter(t => t.status === 'COMPLETED');
      const pending = Sorted.filter(t => t.status === 'PENDING');

      const deposit = completed
        .filter(t => t.transactionType === 'DEPOSIT')
        .reduce((s, t) => s + Number(t.amount), 0);

      const withdraw = completed
        .filter(t => t.transactionType === 'WITHDRAW')
        .reduce((s, t) => s + Number(t.amount), 0);

      const costPayment = completed
        .filter(t => t.transactionType === 'COST_PAYMENT')
        .reduce((s, t) => s + Number(t.amount), 0);

      const recent = Sorted.slice(0, 10).map(t => ({
        id: t.transactionId,
        title: t.transactionType === 'DEPOSIT' ? `Nạp tiền #${t.transactionId}` :
               t.transactionType === 'WITHDRAW' ? `Rút tiền #${t.transactionId}` :
               `Thanh toán chi phí #${t.transactionId}`,
        amount: t.transactionType === 'DEPOSIT' ? Number(t.amount) : -Number(t.amount),
        date: t.createdAt,
        status: t.status,
        type: t.transactionType === 'DEPOSIT' ? 'deposit' as const :
              t.transactionType === 'WITHDRAW' ? 'withdraw' as const : 'cost' as const,
      }));

      setStats({
        totalTransactions: Sorted.length,
        totalDeposit: deposit,
        totalWithdraw: withdraw,
        totalCostPayment: costPayment,
        pendingCount: pending.length,
        recentTransactions: recent,
      });

    } catch (err: any) {
      setError('Không thể tải dữ liệu giao dịch');
      console.error('Admin payments error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 15000);
    return () => clearInterval(interval);
  }, [fetchData]);

  return {
    transactions,
    stats,
    loading,
    error,
    refetch: fetchData,
  };
};
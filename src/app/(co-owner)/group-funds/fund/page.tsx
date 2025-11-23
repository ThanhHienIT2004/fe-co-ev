// src/libs/hooks/useGroupFund.ts
import { useState, useEffect, useCallback } from 'react';
import api from '@/libs/apis/funds';
import type { GroupFund, CreateFundRequest } from '@/types/groupfund.type';

export const useGroupFund = (groupId?: string) => { 
  const [funds, setFunds] = useState<GroupFund[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAll = useCallback(async () => {
    if (!groupId) {
      setFunds([]);
      return;
    }

    setLoading(true);
    try {
      const res = await api.get<GroupFund[]>('/funds', {
        params: { groupId }, 
      });
      setFunds(res.data);
    } catch (err) {
      console.error('Lỗi lấy danh sách quỹ:', err);
      setFunds([]);
    } finally {
      setLoading(false);
    }
  }, [groupId]);

  const getById = async (id: number): Promise<GroupFund> => {
    const res = await api.get<GroupFund>(`/funds/${id}`);
    return res.data;
  };

  const create = async (data: CreateFundRequest): Promise<GroupFund> => {
    const res = await api.post<GroupFund>('/funds', data);
    await fetchAll();
    return res.data;
  };

  const deposit = async (
    fundId: number,
    data: { amount: string; gateway: 'VNPAY'; fake: boolean }
  ) => {
    const res = await api.post('/payments/fake-create', {
      fundId,
      groupId: groupId ? Number(groupId) : undefined,
      amount: Number(data.amount),
      gateway: 'VNPAY',
      fake: data.fake,
    });
    return res.data;
  };

  const deleteFund = async (id: number): Promise<void> => {
    await api.delete(`/funds/${id}`);
    await fetchAll();
  };

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return {
    funds,
    loading,
    fetchAll,
    getById,
    create,
    deposit,
    deleteFund,
  };
};
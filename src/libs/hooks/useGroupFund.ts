// libs/hooks/useGroupFund.ts
import { useState, useCallback } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:8085/payment';

export function useGroupFund(groupId: string | number) {
  const [funds, setFunds] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // LẤY DANH SÁCH QUỸ CỦA NHÓM (dùng đúng endpoint backend)
  const fetchAll = useCallback(async () => {
    if (!groupId) return;
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/funds/${groupId}`);
      setFunds(res.data || []);
    } catch (err: any) {
      console.error('Lỗi tải danh sách quỹ:', err);
      setFunds([]);
    } finally {
      setLoading(false);
    }
  }, [groupId]);

  // LẤY CHI TIẾT 1 QUỸ THEO ID
  const getById = async (fundId: number) => {
    try {
      const res = await axios.get(`${API_BASE}/funds/getFund/${fundId}`);
      return res.data;
    } catch (err: any) {
      console.error('Lỗi lấy chi tiết quỹ:', err);
      throw err;
    }
  };

// HÀM CREATE ĐÃ SỬA – NHẬN ĐÚNG 3 THAM SỐ
const create = async (fundName: string, initialBalance: number = 0, userId: number) => {
  if (!groupId || !userId) throw new Error('Thiếu groupId hoặc userId');

  const payload = {
    fundName: fundName.trim(),
    initialBalance,
  };

  try {
    const res = await axios.post(
      `http://localhost:8085/payment/funds/${groupId}/${userId}`,
      payload
    );

    const newFund = res.data?.data || res.data;
    setFunds(prev => [...prev, newFund]);
    return newFund;
  } catch (err: any) {
    throw err;
  }
};

  // XÓA QUỸ
  const deleteFund = async (fundId: number) => {
    await axios.delete(`${API_BASE}/funds/${fundId}`);
    setFunds(prev => prev.filter(f => f.id !== fundId));
  };

  return {
    funds,
    loading,
    fetchAll,
    getById, 
    create,
    deleteFund,
  };
}
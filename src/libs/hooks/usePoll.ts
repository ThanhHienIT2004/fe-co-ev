// src/libs/hooks/usePoll.ts
'use client';

import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import type { Poll } from '@/types/poll.type';

const API_BASE = 'http://localhost:8085/payment/polls';

const getUserIdFromStorage = (): number => {
  if (typeof window === 'undefined') return 0;

  const keys = ['userId', 'authUser', 'user', 'currentUser', 'profile'];
  for (const key of keys) {
    const raw = localStorage.getItem(key);
    if (!raw) continue;

    try {
      if (/^\d+$/.test(raw.trim())) return Number(raw.trim());

      const parsed = JSON.parse(raw);
      const id =
        parsed?.userId ||
        parsed?.id ||
        parsed?.profileId ||
        parsed?.user_id ||
        parsed?.profile?.id;

      if (id && !isNaN(Number(id))) return Number(id);
    } catch {
      // ignore
    }
  }
  return 0;
};

export const usePoll = (groupId?: string | number) => {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [loading, setLoading] = useState(false);
  const userId = getUserIdFromStorage();

  const ensureUserId = () => {
    if (!userId || userId === 0) {
      alert('Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại!');
      throw new Error('Missing userId');
    }
  };

  const fetchAll = useCallback(async (): Promise<Poll[]> => {
    const gid = groupId ? Number(groupId) : null;
    if (!gid || isNaN(gid)) {
      setPolls([]);
      return [];
    }

    setLoading(true);
    try {
      const { data } = await axios.get<Poll[]>(API_BASE, {
        params: { groupId: gid },
      });
      setPolls(data ?? []);
      return data ?? [];
    } catch (err: any) {
      console.error('Lỗi tải danh sách poll:', err.response?.data || err.message);
      setPolls([]);
      return [];
    } finally {
      setLoading(false);
    }
  }, [groupId]);


  useEffect(() => {
    const gid = groupId ? Number(groupId) : null;
    if (gid && !isNaN(gid)) {
      fetchAll();
    }
  }, [groupId, fetchAll]);

  const getById = async (pollId: number): Promise<Poll> => {
    const { data } = await axios.get<Poll>(`${API_BASE}/${pollId}`);
    return data;
  };

  const create = async (payload: {
    groupId: number;
    description: string;
    costId?: number | null;
    expiresAt?: string | null;
  }): Promise<Poll> => {
    ensureUserId();
    const { data } = await axios.post<Poll>(API_BASE, payload, {
      headers: { userId: String(userId) },
    });
    return data;
  };

  const close = async (pollId: number): Promise<Poll> => {  
    ensureUserId();
    const { data } = await axios.put<Poll>(`${API_BASE}/${pollId}/close`, {}, {
      headers: { userId: String(userId) },
    });
    setPolls((prev) => prev.map((p) => (p.pollId === pollId ? data : p)));
    return data;
  };

  const deletePoll = async (pollId: number): Promise<void> => {

    ensureUserId();
    await axios.delete(`${API_BASE}/${pollId}`, {
      headers: { userId: String(userId) },
    });
    setPolls((prev) => prev.filter((p) => p.pollId !== pollId));
  };

  return {
    polls,
    loading,
    fetchAll,
    getById,
    create,
    close,
    deletePoll,
    userId,
  };
};
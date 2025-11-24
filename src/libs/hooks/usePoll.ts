import { useState, useCallback } from 'react';
import api from '@/libs/apis/api';
import { Poll, CreatePollRequest } from '@/types/poll.type';

export const usePoll = () => {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAll = useCallback(async (): Promise<Poll[]> => {
    setLoading(true);
    try {
      const res = await api.get<Poll[]>('/polls');
      setPolls(res.data);
      return res.data;
    } catch (err: any) {
      alert('Lỗi: ' + (err.response?.data?.message || err.message));
      setPolls([]);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const getById = useCallback(async (id: number): Promise<Poll> => {
    const res = await api.get<Poll>(`/polls/${id}`);
    return res.data;
  }, []);

  const create = useCallback(async (data: CreatePollRequest): Promise<Poll> => {
    const res = await api.post<Poll>('/polls', data);
    setPolls(prev => [...prev, res.data]);
    return res.data;
  }, []);

  const close = useCallback(async (id: number): Promise<Poll> => {
    const res = await api.post<Poll>(`/polls/${id}/close`);
    setPolls(prev => prev.map(p => (p.pollId === id ? res.data : p)));
    return res.data;
  }, []);

  const deletePoll = useCallback(async (id: number) => {
    await api.delete(`/polls/${id}`);
    setPolls(prev => prev.filter(p => p.pollId !== id));
  }, []);

  return { polls, loading, fetchAll, getById, create, close, deletePoll };
};

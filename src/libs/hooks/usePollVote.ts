// src/libs/hooks/usePollVote.ts
'use client';

import { useCallback } from 'react';
import api from '@/libs/apis/api';
import { PollVote } from '@/types/pollvote.type';

interface VoteResult {
  yes: number;
  no: number;
  abstain: number;
  total: number;
}

export const usePollVote = () => {
  // Không cần state votes ở đây nữa → tránh re-render liên tục ở trang chi tiết
  // const [votes, setVotes] = useState<PollVote[]>([]);
  // const [loading, setLoading] = useState(false);

  /**
   * Lấy danh sách vote theo pollId
   */
  const fetchByPoll = useCallback(async (pollId: number): Promise<PollVote[]> => {
    try {
      const res = await api.get<PollVote[]>(`payment/poll-votes/poll/${pollId}`);
      return res.data ?? [];
    } catch (err: any) {
      console.error('Lấy danh sách vote thất bại:', err.response?.data || err.message);
      return [];
    }
  }, []);

  /**
   * Gửi phiếu bầu
   */
  const vote = useCallback(
    async (
      pollId: number,
      voteValue: 'yes' | 'no' | 'abstain',
      userId: number,
      groupId: number
    ): Promise<PollVote> => {
      try {
        const res = await api.post<PollVote>(
          `/poll-votes/poll/${pollId}`,
          null, // body = null
          {
            params: { voteValue, groupId },
            headers: { userId: userId.toString() },
          }
        );

        return res.data;
      } catch (err: any) {
        const msg = err.response?.data?.message || 'Bầu chọn thất bại. Vui lòng thử lại.';
        throw new Error(msg);
      }
    },
    []
  );

  /**
   * Tính kết quả từ danh sách vote
   * Dùng được với bất kỳ mảng votes nào (từ state component hoặc từ fetch)
   */
  const getResult = useCallback((votesList: PollVote[] = []): VoteResult => {
    const result: VoteResult = {
      yes: 0,
      no: 0,
      abstain: 0,
      total: votesList.length,
    };

    for (const v of votesList) {
      switch (v.voteValue) {
        case 'yes':
          result.yes++;
          break;
        case 'no':
          result.no++;
          break;
        case 'abstain':
          result.abstain++;
          break;
      }
    }

    return result;
  }, []);

  return {
    // votes,        → bỏ đi, không cần nữa
    // loading,      → bỏ đi
    fetchByPoll,
    vote,
    getResult,
  };
};
// File: src/libs/hooks/usePollVote.ts
'use client';

import { useState, useCallback } from 'react';
import api from '@/libs/apis/api';
import { PollVote } from '@/types/pollvote.type';

interface VoteResult {
  yes: number;
  no: number;
  abstain: number;
  total: number;
}

export const usePollVote = () => {
  const [votes, setVotes] = useState<PollVote[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchByPoll = useCallback(async (pollId: number): Promise<PollVote[]> => {
    setLoading(true);
    try {
      const res = await api.get<PollVote[]>(`/poll-votes/poll/${pollId}`);
      setVotes(res.data);
      return res.data;
    } catch (err) {
      console.error('Lấy danh sách vote thất bại:', err);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const vote = useCallback(
    async (pollId: number, voteValue: 'yes' | 'no' | 'abstain', userId: number, groupId: number) => {
      console.log(userId, groupId, voteValue)
      try {
        const res = await api.post<PollVote>(
          `/poll-votes/poll/${pollId}`,
          null,
          {
            params: { voteValue, groupId },
            headers: { userId: userId.toString() },
          }
        );

        const newVote = res.data;
        setVotes((prev) => {
          const filtered = prev.filter((v) => v.userId !== newVote.userId);
          return [...filtered, newVote];
        });

        return newVote;
      } catch (err: any) {
        throw err;
      }
    },
    []
  );

  const getResult = useCallback((votesList: PollVote[] = votes): VoteResult => {
    const result: VoteResult = { yes: 0, no: 0, abstain: 0, total: votesList.length };

    votesList.forEach((v) => {
      const value = (v.voteValue || '');
      if (value === 'yes') result.yes++;
      else if (value === 'no') result.no++;
      else if (value === 'abstain') result.abstain++;
    });

    return result;
  }, [votes]);

  return { votes, loading, fetchByPoll, vote, getResult };
};
// lib/hooks/useConflictOwner.ts
import useSWR from 'swr';
import { ConflictLog } from '@/types/conflict.type';
import { conflictApi } from '@/libs/apis/conflict';

const fetcher = (user_id: number) => conflictApi.getByBooking(user_id);

export function useConflictOwner(user_id?: number) {
  const { data, error, isLoading } = useSWR<ConflictLog[]>(
    user_id ? ['conflicts', user_id] : null,
    () => fetcher(user_id!)
  );

  return {
    conflicts: data || [],
    isLoading,
    error,
  };
}

// libs/hooks/useOwnerUsage.ts
import { useState, useEffect } from 'react';
import { usageApi } from '@/libs/apis/usage';
import { UsageRecord, UpdateUsageDto } from '@/types/usage.type';

export const useOwnerUsage = () => {
  const [usages, setUsages] = useState<UsageRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchUsages = async (userId?: string) => {
    setIsLoading(true);
    try {
      const data = await usageApi.getAll(userId ? { user_id: userId } : undefined);
      setUsages(data);
    } catch (err: any) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUsage = async (id: string, updateData: UpdateUsageDto) => {
    const updated = await usageApi.update(id, updateData);
    setUsages((prev) => prev.map(u => u.usage_id === id ? updated : u));
    return updated;
  };

  const deleteUsage = async (id: string) => {
    await usageApi.delete(id);
    setUsages((prev) => prev.filter(u => u.usage_id !== id));
  }

  return { usages, isLoading, error, fetchUsages, updateUsage, deleteUsage };
};

// libs/hooks/useOwnerUsage.ts
import { useState } from 'react';
import { usageApi } from '@/libs/apis/usage';
import { UsageRecord, UpdateUsageDto } from '@/types/usage.type';

export const useOwnerUsage = () => {
  const [usages, setUsages] = useState<UsageRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  /**
   * Fetch usage theo user_id từ session
   */
  const fetchUsages = async (userId?: number) => {
    // Nếu chưa login → không gọi API
    if (!userId) {
      setUsages([]);
      return;
    }

    setIsLoading(true);
    try {
      const data = await usageApi.getAll({ user_id: userId });
      setUsages(data);
    } catch (err: any) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Update 1 usage record
   */
  const updateUsage = async (id: number, updateData: UpdateUsageDto) => {
    const updated = await usageApi.update(id, updateData);
    setUsages(prev =>
      prev.map(u => (u.usage_id === id ? updated : u))
    );
    return updated;
  };

  /**
   * Delete usage
   */
  const deleteUsage = async (id: number) => {
    await usageApi.delete(id);
    setUsages(prev => prev.filter(u => u.usage_id !== id));
  };

  return {
    usages,
    isLoading,
    error,
    fetchUsages,
    updateUsage,
    deleteUsage,
  };
};

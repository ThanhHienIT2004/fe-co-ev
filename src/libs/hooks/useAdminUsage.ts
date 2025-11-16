// libs/hooks/useAdminUsage.ts
import { useState, useEffect } from 'react';
import { usageApi } from '@/libs/apis/usage';
import { UsageRecord, UpdateUsageDto } from '@/types/usage.type';

interface FetchOptions {
  user_id?: number;
  booking_id?: number;
  page?: number;
  limit?: number;
}

export const useAdminUsage = () => {
  const [usages, setUsages] = useState<UsageRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Pagination info
  const [total, setTotal] = useState(0);

  const fetchUsages = async (options?: FetchOptions) => {
    setIsLoading(true);
    try {
      // Nếu backend hỗ trợ query params, có thể sửa usageApi.getAll(options)
      const data: UsageRecord[] = await usageApi.getAll(); // TODO: thêm params
      let filtered = data;

      // Filter cục bộ nếu backend chưa filter
      if (options?.user_id) {
        filtered = filtered.filter(u => u.user_id === options.user_id);
      }
      if (options?.booking_id) {
        filtered = filtered.filter(u => u.booking_id === options.booking_id);
      }

      // Pagination cục bộ
      const page = options?.page ?? 1;
      const limit = options?.limit ?? 20;
      const start = (page - 1) * limit;
      const end = start + limit;
      const paginated = filtered.slice(start, end);

      setUsages(paginated);
      setTotal(filtered.length);
    } catch (err: any) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUsage = async (id: number, updateData: UpdateUsageDto) => {
    const updated = await usageApi.update(id, updateData);
    setUsages((prev) =>
      prev.map(u => u.usage_id === id ? { ...u, ...updated } : u)
    );
    return updated;
  };
  
  const deleteUsage = async (id: number) => {
    await usageApi.delete(id);
    setUsages((prev) => prev.filter(u => u.usage_id !== id));
  };

  return { usages, isLoading, error, fetchUsages, updateUsage, deleteUsage, total };
};

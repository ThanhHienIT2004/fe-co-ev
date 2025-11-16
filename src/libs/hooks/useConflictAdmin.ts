// lib/hooks/useConflictAdmin.ts
import useSWR, { mutate } from 'swr';
import { ConflictLog, CreateConflictDto, UpdateConflictStatusDto } from '@/types/conflict.type';
import { conflictApi } from '@/libs/apis/conflict';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function useConflictAdmin() {
  const { data, error, isLoading } = useSWR<ConflictLog[]>('/api/proxy/conflicts', fetcher);

  // Tạo conflict mới
  const createConflict = async (data: CreateConflictDto) => {
    await conflictApi.create(data);
    mutate('/api/proxy/conflicts');
  };

  // Cập nhật trạng thái conflict
  const updateConflictStatus = async (conflict_id: number, data: UpdateConflictStatusDto) => {
    await conflictApi.updateStatus(conflict_id, data);
    mutate('/api/proxy/conflicts');
  };

  // Xóa conflict (nếu bạn muốn thêm sau)
  // const deleteConflict = async (conflict_id: string) => {
  //   await conflictApi.delete(conflict_id);
  //   mutate('/api/proxy/conflicts');
  // };

  return {
    conflicts: data || [],
    isLoading,
    error,
    createConflict,
    updateConflictStatus,
    // deleteConflict,
  };
}

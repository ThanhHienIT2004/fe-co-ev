// lib/hooks/useConflictAdmin.ts
import useSWR, { mutate } from 'swr';
import { ConflictLog, CreateConflictDto, ResolutionStatus } from '@/types/conflict.type';

const BASE_URL = "http://localhost:8085/booking/conflict-log";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export function useConflictAdmin() {
  const { data, error, isLoading } = useSWR<ConflictLog[]>(`${BASE_URL}/get-all`, fetcher);

  // Tạo conflict mới
  const createConflict = async (data: CreateConflictDto) => {
    // đảm bảo gửi đủ user_id, booking_id và description
    await fetch(`${BASE_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: data.user_id,
        booking_id: data.booking_id,
        description: data.description || ""
      }),
    });
    mutate(`${BASE_URL}/get-all`);
  };

  // Cập nhật trạng thái conflict (resolve/reject)
  const updateConflictStatus = async (
    conflict_id: number,
    status: ResolutionStatus,
    resolved_by?: number
  ) => {
    await fetch(`${BASE_URL}/${conflict_id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, resolved_by }),
    });
    mutate(`${BASE_URL}/get-all`);
  };

  return {
    conflicts: data || [],
    isLoading,
    error,
    createConflict,
    updateConflictStatus,
  };
}

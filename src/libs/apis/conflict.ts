// lib/apis/conflict.ts
import { ConflictLog, CreateConflictDto, UpdateConflictStatusDto } from '@/types/conflict.type';

const API_URL = 'http://localhost:5001';

export const conflictApi = {
  // Tạo conflict mới
  create: async (data: CreateConflictDto): Promise<ConflictLog> => {
    const res = await fetch(`${API_URL}/booking/conflict-log`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`Server error: ${res.status}`);
    return res.json();
  },

  // Lấy tất cả conflict
  getAll: async (): Promise<ConflictLog[]> => {
    const res = await fetch(`${API_URL}/booking/conflict-log`, { cache: 'no-store' });
    return res.json();
  },

  // Lấy conflict theo ID
  getById: async (conflict_id: number): Promise<ConflictLog> => {
    const res = await fetch(`${API_URL}/booking/conflict-log/${conflict_id}`);
    return res.json();
  },

  // Lấy conflict theo user ID
  getByBooking: async (user_id: number): Promise<ConflictLog[]> => {
    const res = await fetch(`${API_URL}/booking/conflict-log/${user_id}`);
    return res.json();
  },

  // Cập nhật trạng thái conflict
  updateStatus: async (conflict_id: number, data: UpdateConflictStatusDto): Promise<ConflictLog> => {
    const res = await fetch(`${API_URL}/booking/conflict-log/${conflict_id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`Server error: ${res.status}`);
    return res.json();
  },
};

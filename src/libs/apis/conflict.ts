// lib/apis/conflict.ts
import { ConflictLog, CreateConflictDto, UpdateConflictStatusDto, ResolutionStatus } from '@/types/conflict.type';

const BASE_URL = "http://localhost:8085/booking/conflict-log";

export const conflictApi = {
  create: async (data: { user_id: number; booking_id: number; description: string }) => {
    return fetch(`${BASE_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(res => res.json());
  },

  updateStatus: async (
    conflict_id: number,
    data: { status: ResolutionStatus; resolved_by?: number }
  ) => {
    return fetch(`${BASE_URL}/${conflict_id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(res => res.json());
  },

  getById: async (id: number) => {
    return fetch(`${BASE_URL}/${id}`).then(res => res.json());
  },

  getByUser: async (user_id: number) => {
    return fetch(`${BASE_URL}/user_id/${user_id}`).then(res => res.json());
  },

  getAll: async () => {
    return fetch(`${BASE_URL}/get-all`).then(res => res.json());
  },
};


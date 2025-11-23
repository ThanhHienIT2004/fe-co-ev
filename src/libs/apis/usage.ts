// lib/apis/usage.ts
import { UsageRecord, CreateUsageDto, UpdateUsageDto } from '@/types/usage.type';

const API_URL =  'http://localhost:8085';

export const usageApi = {
  create: async (data: CreateUsageDto): Promise<UsageRecord> => {
    const res = await fetch(`${API_URL}/booking/usage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Create usage failed: ${res.status} - ${errorText}`);
    }
    return res.json();
  },

  getAll: async (params?: { user_id?: number; booking_id?: number }): Promise<UsageRecord[]> => {
    const query = new URLSearchParams(params as any).toString();
    const res = await fetch(`${API_URL}/booking/usage/get-all${query ? `?${query}` : ''}`, {
      cache: 'no-store',
    });
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Fetch usage failed: ${res.status} - ${errorText}`);
    }
    return res.json();
  },

  getById: async (id: number): Promise<UsageRecord> => {
    const res = await fetch(`${API_URL}/booking/usage/${id}`);
    if (!res.ok) throw new Error(`Fetch by ID failed: ${res.status}`);
    return res.json();
  },

  update: async (id: number, data: UpdateUsageDto): Promise<UsageRecord> => {
    const res = await fetch(`${API_URL}/booking/usage/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`Update usage failed: ${res.status}`);
    return res.json();
  },

  delete: async (id: number): Promise<void> => {
    const res = await fetch(`${API_URL}/booking/usage/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error(`Delete usage failed: ${res.status}`);
  },
};

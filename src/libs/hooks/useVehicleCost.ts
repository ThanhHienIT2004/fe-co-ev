// src/libs/hooks/useVehicleCost.ts
import { useState, useEffect, useCallback } from 'react';
import api from '@/libs/apis/api';
import type {
  VehicleCost,
  CreateCostRequest,
  UpdateStatusRequest,
  MomoPaymentResponse,
} from '@/types/vehiclecost.type';

export const useVehicleCost = (groupId?: string) => {
  const [costs, setCosts] = useState<VehicleCost[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAll = useCallback(async () => {
    if (!groupId) {
      setCosts([]);
      return;
    }
    setLoading(true);
    try {
      const res = await api.get<VehicleCost[]>('/costs', {
        params: { groupId },
      });
      setCosts(res.data);
    } catch (err) {
      console.error('Lỗi tải chi phí:', err);
      setCosts([]);
    } finally {
      setLoading(false);
    }
  }, [groupId]);

  const getById = async (id: number): Promise<VehicleCost> => {
  const res = await api.get<VehicleCost>(`/costs/${id}`);
  return res.data;
  };

  const create = async (data: CreateCostRequest): Promise<VehicleCost> => {
    const res = await api.post<VehicleCost>('/costs', data);
    return res.data;
  };

  const updateStatus = async (
    id: number,
    status: 'paid' | 'pending' | 'cancelled'
  ): Promise<VehicleCost> => {
    const res = await api.patch<VehicleCost>(`/costs/${id}/status`, { status });
    return res.data;
  };

  const payWithMomo = async (
    id: number,
    gateway: 'MOMO' | 'VNPAY'
  ): Promise<MomoPaymentResponse> => {
    const res = await api.post<MomoPaymentResponse>(`/costs/${id}/pay`, { gateway });
    return res.data;
  };

  const deleteCost = async (id: number): Promise<void> => {
    await api.delete(`/costs/${id}`);
  };

  useEffect(() => {
    if (groupId) fetchAll();
    else setCosts([]);
  }, [groupId, fetchAll]);

  return {
    costs,
    loading,
    fetchAll,
    getById,
    create,
    updateStatus,
    payWithMomo,
    deleteCost,
  };
};
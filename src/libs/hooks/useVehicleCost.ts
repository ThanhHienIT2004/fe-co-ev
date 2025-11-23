// src/libs/hooks/useVehicleCost.ts
import { useState, useEffect, useCallback } from 'react';
import type {
  VehicleCost,
  CreateCostRequest,
  UpdateStatusRequest,
  MomoPaymentResponse,
} from '@/types/vehiclecost.type';
import api from '../apis/payment';

export const useVehicleCost = (groupId: string, userId: number = 1) => {
  const [costs, setCosts] = useState<VehicleCost[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get<VehicleCost[]>('/costs', { 
        params: { groupId } 
      });
      setCosts(res.data);
    } catch (err) {
      console.error(err);
      setCosts([]);
    } finally {
      setLoading(false);
    }
  }, [groupId]);

  const getById = useCallback(async (id: number) => {
    const res = await api.get<VehicleCost>(`/costs/${id}`, {
      params: { groupId }
    });
    return res.data;
  }, [groupId]);

  const create = async (data: CreateCostRequest) => {
    setLoading(true);
    try {
      const payload = {
        ...data,
        amount: Number(data.amount),
        fundId: data.fundId ?? null,
        vehicleId: data.vehicleId ?? null,
      };
      const res = await api.post<VehicleCost>('/costs', payload, {
        headers: { userId: userId.toString() },
      });
      setCosts(prev => [...prev, res.data]);
      return res.data;
    } catch (err: any) {
      console.error('Create cost error:', err.response?.data || err.message || err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: number, status: 'paid' | 'pending' | 'cancelled') => {
    const res = await api.patch<VehicleCost>(`/costs/${id}/status`, 
      { status } as UpdateStatusRequest,
      { headers: { userId: userId.toString() } }
    );
    setCosts(prev => prev.map(c => (c.costId === id ? res.data : c)));
    return res.data;
  };

  const payWithMomo = async (id: number, gateway: 'MOMO' | 'VNPAY') => {
    const res = await api.post<MomoPaymentResponse>(`/costs/${id}/pay`, { gateway });
    return res.data;
  };

  const deleteCost = async (id: number) => {
    await api.delete(`/costs/${id}`);
    setCosts(prev => prev.filter(c => c.costId !== id));
  };

  const updateCost = async (id: number, data: Partial<CreateCostRequest>) => {
  const res = await api.patch<VehicleCost>(`/costs/${id}`, data);
  setCosts(prev => prev.map(c => c.costId === id ? res.data : c));
  return res.data;
};

  // TỰ ĐỘNG TẢI KHI groupId THAY ĐỔI
  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return { 
    costs, 
    loading, 
    fetchAll, 
    getById, 
    create, 
    updateStatus, 
    payWithMomo, 
    deleteCost, 
    updateCost
  };
};
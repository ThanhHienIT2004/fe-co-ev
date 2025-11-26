// src/libs/hooks/useVehicleCost.ts

import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export interface VehicleCost {
  costId: number;
  groupId: number;
  userId: number;
  vehicleId: number;
  costName: string;
  amount: number;
  status: 'pending' | 'paid';
  createdAt: string;
  createdBy?: string;
}

// Params cho kiểu gọi mới
interface UseVehicleCostParams {
  groupId: string | null;
  vehicleId?: string | number | null;
}

// Overload để hỗ trợ cả kiểu cũ (chỉ groupId) và kiểu mới (object)
type UseVehicleCostArg = UseVehicleCostParams | string | null;

export const useVehicleCost = (arg: UseVehicleCostArg = null) => {
  // Chuẩn hóa về 2 biến groupId + vehicleId
  let groupId: string | null = null;
  let vehicleId: string | number | null = null;

  if (typeof arg === 'object' && arg !== null) {
    groupId = arg.groupId;
    vehicleId = 'vehicleId' in arg ? arg.vehicleId ?? null : null;
  } else {
    groupId = arg as string | null;
  }

  const [costs, setCosts] = useState<VehicleCost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    if (!groupId || groupId === '' || isNaN(Number(groupId))) {
      setCosts([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const params: any = { groupId: Number(groupId) };
      if (vehicleId !== null && vehicleId !== undefined && vehicleId !== '') {
        params.vehicleId = Number(vehicleId);
      }

      const res = await axios.get('http://localhost:8082/payment/costs', { params });
      const rawData = res.data?.data || res.data || [];

      if (!Array.isArray(rawData)) {
        setCosts([]);
        return;
      }

      const normalizedData: VehicleCost[] = rawData.map((item: any) => ({
        costId: Number(item.costId),
        groupId: Number(item.groupId),
        userId: Number(item.userId),
        vehicleId: Number(item.vehicleId ?? 0),
        costName: item.costName || 'Không tên',
        amount: Number(item.amount || 0),
        status: item.status === 'paid' ? 'paid' : 'pending',
        createdAt: item.createdAt || new Date().toISOString(),
        createdBy: item.createdBy,
      }));

      setCosts(normalizedData);
    } catch (err: any) {
      console.error('Lỗi tải chi phí:', err);
      setError('Không thể tải dữ liệu chi phí');
      setCosts([]);
    } finally {
      setLoading(false);
    }
  }, [groupId, vehicleId]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return {
    costs,
    loading,
    error,
    fetchAll,
  };
};
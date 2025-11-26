'use client';

import { useState, useEffect, useCallback } from 'react';
import api from '@/libs/apis/group';

export interface GroupBasic {
  groupId: number;
  groupName: string;
  ownerId: number;
  vehicleId?: number;
  memberCount?: number;
}

export const useUserGroups = () => {
  const [groups, setGroups] = useState<GroupBasic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Lấy userId từ localStorage, mặc định = 3
  const getUserId = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('userId') || '3';
    }
    return '3';
  };

  const fetchGroups = useCallback(async () => {
    setLoading(true);
    setError(null);
    const userId = Number(getUserId());

    try {
      // Bước 1: Lấy danh sách groupId từ backend
      const memberData: { groupId: number }[] = await api.get(`/group_member/${userId}`);

      if (!Array.isArray(memberData) || memberData.length === 0) {
        setGroups([]);
        return;
      }

      const groupIds = memberData.map((g) => g.groupId);
      const formattedGroups: GroupBasic[] = [];

      // Bước 2: Lấy chi tiết từng group
      for (const id of groupIds) {
        try {
          const data: GroupBasic = await api.get(`/ownership/${id}`);
          formattedGroups.push({
            groupId: data.groupId,
            groupName: data.groupName || 'Không có tên',
            ownerId: data.ownerId,
            vehicleId: data.vehicleId,
            memberCount: 0,
          });
        } catch {
          formattedGroups.push({
            groupId: id,
            groupName: 'Nhóm đã xóa',
            ownerId: 0,
            memberCount: 0,
          });
        }
      }

      setGroups(formattedGroups);
    } catch (err) {
      console.error('Lỗi khi tải danh sách nhóm', err);
      setError('Không thể tải danh sách nhóm');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  return { groups, loading, error, refetch: fetchGroups };
};

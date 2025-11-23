// libs/hooks/useGroupMembers.ts

import useSWR, { useSWRConfig } from 'swr';
import api from '../apis/admin-and-staff';

const fetcher = (url: string) => api.get(url).then(res => res.data);

// === LẤY DANH SÁCH THÀNH VIÊN ===
export const useGroupMembers = (groupId: number) => {
  const { data, error, isLoading, mutate } = useSWR<any[]>(
    groupId ? `/group-members/group/${groupId}` : null,
    fetcher,
    { revalidateOnFocus: false }
  );

  return {
    members: data || [],
    error,
    isLoading,
    mutate,
  };
};

// === TẠO MỚI + UPLOAD FILE (FormData) ===
export const useCreateGroupMember = () => {
  const { mutate } = useSWRConfig();

  const createMember = async (
    group_id: number,
    data: {
      user_id: number;
      group_role?: string;
      ownership_ratio?: number;
    }
  ) => {
    if (!group_id || !data.user_id) {
      throw new Error("Thiếu group_id hoặc user_id");
    }

    const res = await api.post(`/group-members/${group_id}/add`, {
      ...data,
    });

    // Cập nhật cache SWR
    mutate(`/group-members/group/${group_id}`);

    return res.data;
  };

  return { createMember };
};


// === CẬP NHẬT THÀNH VIÊN ===
export const useUpdateGroupMember = () => {
  const { mutate } = useSWRConfig();

  const updateMember = async ({
    memberId,
    groupId,
    data,
  }: {
    memberId: number;
    groupId: number;
    data: { group_role?: string; ownership_ratio?: number };
  }) => {
    const res = await api.put(`/group-members/${memberId}`, data);
    mutate(`/group-members/group/${groupId}`);
    return res.data;
  };

  return { updateMember };
};

// === XÓA THÀNH VIÊN ===
export const useDeleteGroupMember = () => {
  const { mutate } = useSWRConfig();

  const deleteMember = async (memberId: number, groupId: number) => {
    await api.delete(`/group-members/${memberId}`);
    mutate(`/group-members/group/${groupId}`);
  };

  return { deleteMember };
};

// === ĐẾM SỐ LƯỢNG ===
export const useGroupMemberCount = (groupId: number) => {
  const { data, error, isLoading } = useSWR<any[]>(
    groupId ? `/group-members/group/${groupId}` : null,
    fetcher
  );

  return {
    count: data ? data.length : 0,
    error,
    isLoading,
  };
};
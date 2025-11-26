// libs/hooks/useGroupMembers.ts

import useSWR, { useSWRConfig } from 'swr';
import api from '../apis/admin-and-staff';

const fetcher = (url: string) => api.get(url).then(res => res.data);

// === LẤY DANH SÁCH THÀNH VIÊN ===
export const useGroupMembers = (groupId: string) => {
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
    group_id: string,
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


export const useUpdateGroupMember = () => {
  const { mutate } = useSWRConfig();

  const updateMember = async ({
    groupId,  // number | string
    userId,   // number
    data,
  }: {
    groupId: string | number;
    userId: number;
    data: { group_role?: string; ownership_ratio?: number };
  }) => {
    // gọi PUT /group-members/:group_id/:user_id
    const res = await api.put(`/group-members/${groupId}/${userId}`, data);

    // invalidate cache danh sách member của group
    mutate(`/group-members/group/${groupId}`);

    return res.data;
  };

  return { updateMember };
};


// === XÓA THÀNH VIÊN ===
export const useDeleteGroupMember = () => {
  const { mutate } = useSWRConfig();

  const deleteMember = async (memberId: string, groupId: string) => {
    await api.delete(`/group-members/${memberId}`);
    mutate(`/group-members/group/${groupId}`);
  };

  return { deleteMember };
};

// === ĐẾM SỐ LƯỢNG ===
export const useGroupMemberCount = (groupId: string) => {
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
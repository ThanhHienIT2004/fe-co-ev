// libs/hooks/useGroupMembers.ts
import useSWR, { useSWRConfig } from 'swr';
import api from '@/libs/apis/api';

const fetcher = (url: string) => api.get(url).then(res => res.data);

// GET ALL thành viên của nhóm
export const useGroupMembers = (groupId: string) => {
  const { data, error, isLoading, mutate } = useSWR<any[]>(
    groupId ? `/admin/group-members?group_id=${groupId}` : null,
    fetcher
  );

  return {
    members: data || [],
    error,
    isLoading,
    mutate,
  };
};

// CREATE thành viên
export const useCreateGroupMember = () => {
  const { mutate } = useSWRConfig();

  const createMember = async (data: {
    member_id: string;
    group_id: string;
    group_role?: string;
    ownership_ratio?: number;
  }) => {
    const res = await api.post('/admin/group-members', data);
    mutate(`/admin/group-members?group_id=${data.group_id}`);
    return res.data;
  };

  return { createMember };
};

// UPDATE thành viên
export const useUpdateGroupMember = () => {
  const { mutate } = useSWRConfig();

  const updateMember = async ({ memberId, data }: { memberId: string; data: any }) => {
    const res = await api.patch(`/admin/group-members/${memberId}`, data);
    // Refetch danh sách nhóm (nếu cần)
    mutate((key: string) => key.includes('/admin/group-members'));
    return res.data;
  };

  return { updateMember };
};

// DELETE thành viên
export const useDeleteGroupMember = () => {
  const { mutate } = useSWRConfig();

  const deleteMember = async (memberId: string) => {
    await api.delete(`/admin/group-members/${memberId}`);
    mutate((key: string) => key.includes('/admin/group-members'));
  };

  return { deleteMember };
};
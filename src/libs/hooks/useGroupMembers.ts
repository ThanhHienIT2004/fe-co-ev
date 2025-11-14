import useSWR, { useSWRConfig } from 'swr';
import api from '@/libs/apis/api';

const fetcher = (url: string) => api.get(url).then(res => res.data);

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

// ĐÃ SỬA: DÙNG user_id THAY member_id
export const useCreateGroupMember = () => {
  const { mutate } = useSWRConfig();

  const createMember = async (data: {
    group_id: string;
    user_id: string;           // ĐÃ ĐỔI TỪ member_id → user_id
    group_role?: string;
    ownership_ratio?: number;
  }) => {
    const res = await api.post(`/group-members/${data.group_id}/add`, {
      user_id: data.user_id,                    // GỬI user_id
      group_role: data.group_role,
      ownership_ratio: data.ownership_ratio,
      // KHÔNG GỬI member_id NỮA → TRÁNH LỖI "should not exist"
    });

    mutate(`/group-members/group/${data.group_id}`);
    return res.data;
  };

  return { createMember };
};


/**
 * 🔹 Cập nhật thành viên
 * Backend: PUT /group-members/:id
 */
export const useUpdateGroupMember = () => {
  const { mutate } = useSWRConfig();

  const updateMember = async ({
    memberId,
    groupId,
    data,
  }: {
    memberId: string;
    groupId: string;
    data: any;
  }) => {
    const res = await api.put(`/group-members/${memberId}`, data);
    mutate(`/group-members?group_id=${groupId}`);
    return res.data;
  };

  return { updateMember };
};

/**
 * 🔹 Xóa thành viên
 * Backend: DELETE /group-members/:id
 */
export const useDeleteGroupMember = () => {
  const { mutate } = useSWRConfig();

  const deleteMember = async (memberId: string, groupId: string) => {
    await api.delete(`/group-members/${memberId}`);
    mutate(`/group-members?group_id=${groupId}`);
  };

  return { deleteMember };
};
/**
 * 🔹 Lấy số lượng thành viên của nhóm (count)
 */
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

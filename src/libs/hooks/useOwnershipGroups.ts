// hooks/useOwnershipGroups.ts
import useSWR, { useSWRConfig } from 'swr';
import { OwnershipGroupResponseDto, CreateOwnershipGroupDto } from '@/types/ownership-group';
import api from '../apis/admin-and-staff';

const fetcher = (url: string) => api.get(url).then(res => res.data);

// GET ALL - Danh sách nhóm
export const useOwnershipGroups = () => {
  const { data, error, isLoading, mutate } = useSWR<OwnershipGroupResponseDto[]>(
    '/ownership-groups',
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 5000,
    }
  );

  return {
    groups: data || [],
    error,
    isLoading,
    mutate,
  };
};
// GET ALL GROUPS OF A USER
export const useUserGroups = (userId: string | null) => {
  const { data, error, isLoading, mutate } = useSWR<OwnershipGroupResponseDto[]>(
    userId ? `/ownership-groups/user/${userId}/groups` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 5000,
    }
  );

  return {
    groups: data || [],
    error,
    isLoading,
    mutate,
  };
};

// GET ONE - Chi tiết nhóm
export const useOwnershipGroup = (groupId: string | null) => {
  const { data, error, isLoading } = useSWR<OwnershipGroupResponseDto>(
    groupId ? `/ownership-groups/${groupId}` : null,
    fetcher
  );

  return { group: data, error, isLoading };
};

// CREATE - Tạo nhóm mới
export const useCreateOwnershipGroup = () => {
  const { mutate } = useSWRConfig();

  const createGroup = async (data: CreateOwnershipGroupDto) => {
    const res = await api.post('/ownership-groups', data);
    // Tự động thêm vào danh sách (optimistic)
    mutate('/ownership-groups', (groups: OwnershipGroupResponseDto[] = []) => [
      res.data,
      ...groups,
    ], false);

    // Refetch chính xác
    mutate('/ownership-groups');
    return res.data;
  };

  return { createGroup };
};

// UPDATE - Cập nhật nhóm
export const useUpdateOwnershipGroup = () => {
  const { mutate } = useSWRConfig();

  const updateGroup = async ({ groupId, data }: { groupId: string; data: Partial<CreateOwnershipGroupDto> }) => {
    const res = await api.patch(`/ownership-groups/${groupId}`, data);

    // Cập nhật cả danh sách + chi tiết
    mutate('/ownership-groups');
    mutate(`/ownership-groups/${groupId}`);

    return res.data;
  };

  return { updateGroup };
};

// DELETE - Xóa nhóm (optimistic + mượt)
export const useDeleteOwnershipGroup = () => {
  const { mutate } = useSWRConfig();

  const deleteGroup = async (groupId: string) => {
    await api.delete(`/ownership-groups/${groupId}`);

    // Xóa ngay lập tức khỏi UI (optimistic)
    mutate('/ownership-groups', (groups: OwnershipGroupResponseDto[] = []) =>
      groups.filter(g => g.group_id !== groupId), false
    );
  };

  return { deleteGroup };
};
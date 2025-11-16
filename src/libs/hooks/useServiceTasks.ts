// hooks/useServiceTasks.ts
import useSWR, { useSWRConfig } from 'swr';
import { ServiceTask } from '@/types/service-tasks.type';
import api from '../apis/admin-and-staff';


const fetcher = (url: string) => api.get(url).then(res => res.data);

// GET ALL
export const useServiceTasks = () => {
  const { data, error, isLoading, mutate } = useSWR<ServiceTask[]>('/service-tasks', fetcher);
  return { tasks: data, error, isLoading, mutate };
};

// GET ONE
export const useServiceTask = (id: string) => {
  const { data, error, isLoading } = useSWR<ServiceTask>(id ? `/service-tasks/${id}` : null, fetcher);
  return { data, error, isLoading };
};

// CREATE
export const useCreateServiceTask = () => {
  const { mutate } = useSWRConfig();
  return {
    mutate: async (data: any) => {
      const res = await api.post('/service-tasks', data);
      mutate('/service-tasks');
      return res.data;
    },
    isPending: false,
  };
};

// UPDATE
export const useUpdateServiceTask = () => {
  const { mutate } = useSWRConfig();
  return {
    mutate: async ({ id, data }: { id: string; data: any }) => {
      const res = await api.patch(`/service-tasks/${id}`, data);
      mutate('/service-tasks');
      mutate(`/service-tasks/${id}`);
      return res.data;
    },
    isPending: false,
  };
};

// DELETE
export const useDeleteServiceTask = () => {
  const { mutate } = useSWRConfig();
  return {
    mutate: async (id: string) => {
      await api.delete(`/service-tasks/${id}`);
      mutate('/service-tasks', (tasks: ServiceTask[] = []) => 
        tasks.filter(t => t.task_id !== id), false
      );
    },
  };
};
// libs/hooks/useEContracts.ts
import useSWR, { useSWRConfig } from 'swr';
import api from '../apis/admin-and-staff';
import type { EContract } from '@/types/e-contract.types';
import toast from 'react-hot-toast';

const fetcher = (url: string) => api.get(url).then(res => res.data);

export const useEContracts = () => {
  const { data, error, isLoading, mutate } = useSWR<EContract[]>('/e-contracts', fetcher);

  return {
    contracts: data || [],
    isLoading,
    error,
    mutate,
  };
};

export const useUpdateEContractStatus = () => {
  const { mutate } = useSWRConfig();

  const updateStatus = async (contractId: number, status: EContract['signature_status']) => {
    const res = await api.put(`/e-contracts/${contractId}`, {
      signature_status: status,
    });
    mutate('/e-contracts');
    return res.data;
  };

  return { updateStatus };
};

export const downloadFile = async (url: string, fileName: string) => {
  try {
    const res = await fetch(url, {
      method: "GET",
      mode: "cors"
    });

    if (!res.ok) throw new Error("Failed to download");

    const blob = await res.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = fileName;
    link.click();

    window.URL.revokeObjectURL(blobUrl);
  } catch (err) {
    toast.error("Không thể tải file!");
  }
};

export const useUserContracts = (userId: string) => {
  const { data, error, isLoading, mutate } = useSWR<EContract[]>(
    userId ? `/e-contracts/user/${userId}` : null, // nếu chưa có userId thì không gọi
    fetcher
  );

  return {
    contracts: data ?? [],
    isLoading,
    error,
    mutate,
  };
};
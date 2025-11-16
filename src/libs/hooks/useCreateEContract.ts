// libs/hooks/useEContracts.ts
import useSWR, { useSWRConfig } from 'swr';
import api from '../apis/admin-and-staff';

export const useCreateEContract = () => {
  const { mutate } = useSWRConfig();

  /**
   * POST file PDF + dữ liệu e-contract
   * Backend: Multer + Cloudinary + validate DTO sau upload
   */
  const createEContract = async (formData: FormData) => {
    const res = await api.post('/e-contracts', formData, {
      headers: {
        // Không set Content-Type → trình duyệt tự thêm boundary
      },
    });

    mutate('/e-contracts');
    return res.data;
  };

  return { createEContract };
};
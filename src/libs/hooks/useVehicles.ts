// hooks/useVehicles.ts
import useSWR, { useSWRConfig } from 'swr';
import { Vehicle, CreateVehicleFormData, UpdateVehicleFormData } from '@/types/vehicles.type';
import api from '../apis/admin-and-staff';

// === FETCHER ===
const fetcher = (url: string) => api.get(url).then(res => res.data);

// === GET ALL ===
export const useVehicles = () => {
  const { data, error, isLoading, mutate } = useSWR<Vehicle[]>('/vehicles', fetcher);
  return { data, error, isLoading, mutate };
};
 
// === GET ONE ===
export const useVehicle = (id: string | null) => {
  const { data, error, isLoading } = useSWR<Vehicle>(
    id ? `/vehicles/${id}` : null,
    fetcher,
    { revalidateOnFocus: false }
  );
  return { data, error, isLoading };
};

// === CREATE ===
export const useCreateVehicle = () => {
  const { mutate } = useSWRConfig();

  const create = async (formData: CreateVehicleFormData) => {
    const data = new FormData();
    data.append('vehicle_name', formData.vehicle_name);
    data.append('license_plate', formData.license_plate);
    data.append('description', formData.description);
    if (formData.image) data.append('image', formData.image);
    if (formData.spec_images) {
      formData.spec_images.forEach(file => data.append('spec_images', file));
    }

    const res = await api.post('/vehicles', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  };

  const mutateCreate = async (formData: CreateVehicleFormData) => {
    const newVehicle = await create(formData);
    // Cập nhật cache ngay lập tức (optimistic)
    mutate('/vehicles', (vehicles: Vehicle[] = []) => [newVehicle, ...vehicles], false);
    return newVehicle;
  };

  return { mutate: mutateCreate };
};

// === UPDATE ===
export const useUpdateVehicle = () => {
  const { mutate } = useSWRConfig();

  const updateVehicle = async (id: string, formData: UpdateVehicleFormData) => {
    const data = new FormData();
    if (formData.vehicle_name) data.append('vehicle_name', formData.vehicle_name);
    if (formData.license_plate) data.append('license_plate', formData.license_plate);
    if (formData.description) data.append('description', formData.description);
    if (formData.image) data.append('image', formData.image);
    if (formData.spec_images?.length) {
      formData.spec_images.forEach(file => data.append('spec_images', file));
    }

    const res = await api.patch(`/vehicles/${id}/full`, data);
    return res.data;
  }; 

  const mutateUpdateVehicle = async (id: string, formData: UpdateVehicleFormData) => {
    const updated = await updateVehicle(id, formData);
    mutate('/vehicles-manage');
    mutate(`/vehicles-manage/${id}/full`);
    return updated;
  };

  return { updateVehicle: mutateUpdateVehicle };
};

// === DELETE ===
export const useDeleteVehicle = () => {
  const { mutate } = useSWRConfig();

  const deleteVehicle = async (id: string) => {
    await api.delete(`/vehicles/${id}`);
  };

  const mutateDelete = async (
    id: string,
    {
      onSuccess,
      onError,
    }: {
      onSuccess?: () => void;
      onError?: (err: any) => void;
    } = {}
  ) => {
    try {
      // 1. Gọi API
      await deleteVehicle(id);

      // 2. Cập nhật cache SWR
      await mutate(
        "/vehicles",
        (vehicles: Vehicle[] = []) =>
          vehicles.filter((v) => v.vehicle_id !== id),
        false // skip revalidate
      );

      onSuccess?.();
    } catch (err) {
      console.error(err);
      onError?.(err);
    }
  };

  return { mutate: mutateDelete };
};

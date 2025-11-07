// components/VehicleForm.tsx
import { useForm } from 'react-hook-form';
import { CreateVehicleFormData } from '@/types/vehicles.type';

interface Props {
  defaultValues?: Partial<CreateVehicleFormData>;
  onSubmit: (data: CreateVehicleFormData) => void;
  submitText: string;
}

export default function VehicleForm({ defaultValues, onSubmit, submitText }: Props) {
  const { register, handleSubmit, watch, setValue } = useForm<CreateVehicleFormData>({
    defaultValues,
  });

  const imageFile = watch('image');
  const specFiles = watch('spec_images');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block font-medium">Tên xe</label>
        <input
          {...register('vehicle_name', { required: true })}
          className="mt-1 w-full border rounded-lg px-3 py-2"
        />
      </div>

      <div>
        <label className="block font-medium">Biển số</label>
        <input
          {...register('license_plate', { required: true })}
          className="mt-1 w-full border rounded-lg px-3 py-2"
        />
      </div>

      <div>
        <label className="block font-medium">Mô tả</label>
        <textarea
          {...register('description', { required: true })}
          rows={4}
          className="mt-1 w-full border rounded-lg px-3 py-2"
        />
      </div>

      <div>
        <label className="block font-medium">Ảnh đại diện</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setValue('image', file);
          }}
          className="mt-1"
        />
        {imageFile && <p className="text-sm text-green-600">Đã chọn: {imageFile.name}</p>}
      </div>

      <div>
        <label className="block font-medium">Ảnh thông số (nhiều)</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => {
            const files = Array.from(e.target.files || []);
            if (files.length) setValue('spec_images', files);
          }}
          className="mt-1"
        />
        {specFiles && (
          <div className="mt-2 text-sm text-green-600">
            Đã chọn {specFiles.length} ảnh
          </div>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-teal-600 text-white py-3 rounded-lg font-bold hover:bg-teal-700"
      >
        {submitText}
      </button>
    </form>
  );
}
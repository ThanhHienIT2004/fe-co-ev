// components/VehicleForm.tsx
import { useForm } from 'react-hook-form';
import { CreateVehicleFormData } from '@/types/vehicles.type';
import { Upload, X, Image as ImageIcon, FileImage } from 'lucide-react';
import { useState } from 'react';

interface Props {
  defaultValues?: Partial<CreateVehicleFormData>;
  onSubmit: (data: CreateVehicleFormData) => void;
  submitText: string;
}

export default function VehicleForm({ defaultValues, onSubmit, submitText }: Props) {
  const { register, handleSubmit, watch, setValue } = useForm<CreateVehicleFormData>({
    defaultValues,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [specPreviews, setSpecPreviews] = useState<string[]>([]);

  const imageFile = watch('image');
  const specFiles = watch('spec_images') || [];

  // Xử lý ảnh đại diện
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue('image', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Xử lý ảnh thông số (nhiều ảnh)
  const handleSpecImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setValue('spec_images', files);

      const previews: string[] = [];
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          previews.push(reader.result as string);
          if (previews.length === files.length) {
            setSpecPreviews(previews);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  // Xóa ảnh đại diện
  const removeImage = () => {
    setValue('image', undefined);
    setImagePreview(null);
  };

  // Xóa 1 ảnh thông số
  const removeSpecImage = (index: number) => {
    const newFiles = specFiles.filter((_: any, i: number) => i !== index);
    const newPreviews = specPreviews.filter((_: string, i: number) => i !== index);
    setValue('spec_images', newFiles.length > 0 ? newFiles : undefined);
    setSpecPreviews(newPreviews);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Tên xe */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Tên xe</label>
        <input
          {...register('vehicle_name', { required: true })}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
          placeholder="Nhập tên xe..."
        />
      </div>

      {/* Biển số */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Biển số</label>
        <input
          {...register('license_plate', { required: true })}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
          placeholder="Ví dụ: 51H-12345"
        />
      </div>

      {/* Mô tả */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Mô tả</label>
        <textarea
          {...register('description', { required: true })}
          rows={5}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all resize-none"
          placeholder="Mô tả chi tiết về xe..."
        />
      </div>

      {/* Ảnh đại diện - ĐẸP */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">Ảnh đại diện</label>
        <div className="relative">
          {!imagePreview ? (
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all group">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-12 h-12 text-gray-400 group-hover:text-teal-600 transition-colors" />
                <p className="mt-3 text-sm text-gray-600 font-medium">Nhấp để tải lên ảnh đại diện</p>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG tối đa 10MB</p>
              </div>
              <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            </label>
          ) : (
            <div className="relative rounded-2xl overflow-hidden border-2 border-teal-200">
              <img src={imagePreview} alt="Preview" className="w-full h-64 object-cover" />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-all shadow-lg"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <p className="text-white text-sm font-medium flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  {imageFile?.name}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Ảnh thông số kỹ thuật (nhiều ảnh) */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Ảnh thông số kỹ thuật <span className="text-gray-500 font-normal">(tối đa 10 ảnh)</span>
        </label>

        {/* Khu vực kéo thả hoặc click để chọn nhiều ảnh */}
        <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all group">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <FileImage className="w-12 h-12 text-gray-400 group-hover:text-teal-600 transition-colors" />
            <p className="mt-3 text-sm text-gray-600 font-medium">Nhấp để chọn nhiều ảnh thông số</p>
            <p className="text-xs text-gray-500 mt-1">Hỗ trợ nhiều file PNG, JPG</p>
          </div>
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleSpecImagesChange}
          />
        </label>

        {/* Preview các ảnh đã chọn */}
        {specPreviews.length > 0 && (
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {specPreviews.map((src, index) => (
              <div key={index} className="relative group rounded-xl overflow-hidden shadow-md">
                <img src={src} alt={`Spec ${index + 1}`} className="w-full h-32 object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => removeSpecImage(index)}
                    className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                  <p className="text-white text-xs truncate">{specFiles[index]?.name}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Nút submit */}
      <button
        type="submit"
        className="w-full bg-teal-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-teal-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
      >
        {submitText}
      </button>
    </form>
  );
}
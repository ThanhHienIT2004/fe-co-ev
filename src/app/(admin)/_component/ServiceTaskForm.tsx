// components/ServiceTaskForm.tsx
"use client";

import { useForm } from 'react-hook-form';
import { CreateServiceTaskDto } from '@/types/service-tasks.type';
import { format } from 'date-fns';

interface Props {
  defaultValues?: Partial<CreateServiceTaskDto>;
  onSubmit: (data: CreateServiceTaskDto) => void;
  submitText: string;
  disabled?: boolean;
}

export default function ServiceTaskForm({ defaultValues, onSubmit, submitText, disabled }: Props) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<CreateServiceTaskDto>({
    defaultValues: {
      ...defaultValues,
      scheduled_at: defaultValues?.scheduled_at ? format(new Date(defaultValues.scheduled_at), "yyyy-MM-dd'T'HH:mm") : '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Vehicle ID */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          ID Xe <span className="text-red-500">*</span>
        </label>
        <input
          {...register('vehicle_id', { required: 'Vui lòng nhập ID xe' })}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
          placeholder="Nhập UUID xe"
        />
        {errors.vehicle_id && <p className="text-red-500 text-xs mt-1">{errors.vehicle_id.message}</p>}
      </div>

      {/* Type */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Loại công việc <span className="text-red-500">*</span>
        </label>
        <select
          {...register('type', { required: 'Chọn loại công việc' })}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
        >
          <option value="">-- Chọn loại --</option>
          <option value="maintenance">Bảo dưỡng</option>
          <option value="inspection">Kiểm tra</option>
          <option value="charging">Sạc pin</option>
          <option value="cleaning">Vệ sinh</option>
          <option value="other">Khác</option>
        </select>
        {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type.message}</p>}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Mô tả</label>
        <textarea
          {...register('description')}
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition resize-none"
          placeholder="Chi tiết công việc..."
        />
      </div>

      {/* Assigned To */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Giao cho</label>
        <input
          {...register('assigned_to')}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
          placeholder="Tên nhân viên"
        />
      </div>

      {/* Scheduled At */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Lịch hẹn</label>
        <input
          type="datetime-local"
          {...register('scheduled_at')}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
        />
      </div>

      {/* Status */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Trạng thái</label>
        <select
          {...register('status')}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
        >
          <option value="pending">Chờ xử lý</option>
          <option value="in_progress">Đang thực hiện</option>
          <option value="completed">Hoàn thành</option>
          <option value="cancelled">Đã hủy</option>
        </select>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={disabled}
        className={`w-full py-4 rounded-xl font-bold text-white transition-all duration-300 transform ${
          disabled
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 hover:scale-[1.02] shadow-lg'
        }`}
      >
        {submitText}
      </button>
    </form>
  );
}
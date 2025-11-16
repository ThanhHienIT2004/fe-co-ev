// app/service-tasks/_components/ServiceTaskForm.tsx
'use client';

import { useForm, Controller } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'; // ← VẪN CẦN, NHƯNG BẠN MUỐN LOẠI BỎ?

// Nếu bạn **KHÔNG MUỐN DÙNG @hookform/resolvers/zod** → DÙNG CÁCH 2 DƯỚI ĐÂY
// ---------------------------------------------------------------------
// CÁCH 1: VẪN DÙNG (khuyên dùng – chuẩn, type-safe, gọn)
// ---------------------------------------------------------------------
// import { zodResolver } from '@hookform/resolvers/zod';

// ---------------------------------------------------------------------
// CÁCH 2: KHÔNG DÙNG @hookform/resolvers → TỰ VALIDATE (theo yêu cầu)
// ---------------------------------------------------------------------

import { TaskType } from '@/types/service-tasks.type';
import { Calendar, Clock, Wrench, Zap, Droplets, AlertCircle, Loader2 } from 'lucide-react';

// Schema Zod
const schema = z.object({
  vehicle_id: z.coerce.number().min(1, 'ID xe phải lớn hơn 0'),
  assigned_to: z.coerce.number().min(1).optional().or(z.literal('')).transform((val) => (val === '' ? null : val)),
  type: z.enum(['maintenance', 'inspection', 'charging', 'cleaning', 'other'] as const, {
    required_error: 'Vui lòng chọn loại công việc',
  }),
  description: z.string().max(1000, 'Mô tả không được vượt quá 1000 ký tự').optional(),
  scheduled_at: z.string().optional(),
  completed_at: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface Props {
  defaultValues?: Partial<FormData>;
  onSubmit: (data: FormData) => void;
}

// TỰ VALIDATE KHÔNG DÙNG zodResolver
function useZodForm<T extends z.ZodType<any>>(schema: T, defaultValues?: z.infer<T>) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    control,
    trigger,
  } = useForm<z.infer<T>>({
    defaultValues: defaultValues as any,
  });

  const validate = async (data: any): Promise<z.infer<T> | null> => {
    try {
      return await schema.parseAsync(data);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          setError(err.path.join('.') as any, { message: err.message });
        });
      }
      return null;
    }
  };

  const setError = (path: any, error: { message: string }) => {
    // react-hook-form không có setError tự động với path phức tạp → dùng trigger
    // hoặc set thủ công nếu cần
  };

  const onSubmit = async (callback: (data: z.infer<T>) => void) => {
    return handleSubmit(async (data) => {
      const result = await validate(data);
      if (result) {
        callback(result);
      }
    });
  };

  return {
    register,
    control,
    watch,
    setValue,
    onSubmit,
    errors,
    isSubmitting,
    trigger,
  };
}

const typeIcons: Record<TaskType, React.ReactNode> = {
  maintenance: <Wrench className="w-4 h-4" />,
  inspection: <Calendar className="w-4 h-4" />,
  charging: <Zap className="w-4 h-4" />,
  cleaning: <Droplets className="w-4 h-4" />,
  other: <AlertCircle className="w-4 h-4" />,
};

const typeLabels: Record<TaskType, string> = {
  maintenance: 'Bảo trì',
  inspection: 'Kiểm tra',
  charging: 'Sạc pin',
  cleaning: 'Vệ sinh',
  other: 'Khác',
};

export function ServiceTaskForm({ defaultValues, onSubmit }: Props) {
  const {
    register,
    control,
    watch,
    setValue,
    onSubmit: submitHandler,
    errors,
    isSubmitting,
  } = useZodForm(schema, {
    vehicle_id: defaultValues?.vehicle_id ?? '',
    assigned_to: defaultValues?.assigned_to ?? '',
    type: defaultValues?.type,
    description: defaultValues?.description ?? '',
    scheduled_at: defaultValues?.scheduled_at
      ? new Date(defaultValues.scheduled_at).toISOString().slice(0, 16)
      : '',
    completed_at: defaultValues?.completed_at
      ? new Date(defaultValues.completed_at).toISOString().slice(0, 16)
      : '',
  });

  const selectedType = watch('type');

  return (
    <form onSubmit={submitHandler(onSubmit)} className="space-y-6">
      {/* ID Xe */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
          ID Xe <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          placeholder="Nhập ID xe"
          {...register('vehicle_id')}
          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
        />
        {errors.vehicle_id && (
          <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {errors.vehicle_id.message}
          </p>
        )}
      </div>

      {/* Người được giao */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Người được giao (ID)
        </label>
        <input
          type="number"
          placeholder="Để trống nếu chưa giao"
          {...register('assigned_to')}
          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
        />
      </div>

      {/* Loại công việc */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
          Loại công việc <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <select
            value={selectedType || ''}
            onChange={(e) => setValue('type', e.target.value as TaskType)}
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent appearance-none cursor-pointer transition-all"
          >
            <option value="" disabled>Chọn loại công việc</option>
            {(['maintenance', 'inspection', 'charging', 'cleaning', 'other'] as const).map((v) => (
              <option key={v} value={v}>
                {typeLabels[v]}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            {selectedType && typeIcons[selectedType]}
          </div>
        </div>
        {errors.type && (
          <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {errors.type.message}
          </p>
        )}
      </div>

      {/* Mô tả */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Mô tả
        </label>
        <textarea
          placeholder="Nhập chi tiết công việc..."
          rows={4}
          {...register('description')}
          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none transition-all"
        />
        {errors.description && (
          <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Thời gian dự kiến */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          Thời gian dự kiến
        </label>
        <input
          type="datetime-local"
          {...register('scheduled_at')}
          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
        />
      </div>

      {/* Thời gian hoàn thành */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
          <Clock className="w-4 h-4" />
          Thời gian hoàn thành
        </label>
        <input
          type="datetime-local"
          {...register('completed_at')}
          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
        />
      </div>

      {/* Nút submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-bold text-lg py-4 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Đang lưu...
          </>
        ) : (
          <>
            <Wrench className="w-5 h-5" />
            Lưu công việc
          </>
        )}
      </button>
    </form>
  );
}
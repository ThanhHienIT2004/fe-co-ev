// app/service-tasks/create/page.tsx
"use client";

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useCreateServiceTask } from '@/libs/hooks/useServiceTasks';
import ServiceTaskForm from '../../_component/ServiceTaskForm';

export default function CreateServiceTaskPage() {
  const { mutate: createTask, isPending } = useCreateServiceTask();
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    await createTask(data);
    router.push('/service-tasks-manage');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/service-tasks-manage"
            className="group flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:bg-gray-50"
          >
            <ArrowLeft className="w-5 h-5 text-teal-600 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium text-gray-700">Quay lại</span>
          </Link>
          <h1 className="text-3xl font-black text-gray-800 tracking-tight">Tạo công việc mới</h1>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-teal-100">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-black text-xl">+</span>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-700">Thêm công việc bảo trì</p>
              <p className="text-sm text-gray-500">Điền thông tin chi tiết để lên lịch</p>
            </div>
          </div>

          <ServiceTaskForm
            onSubmit={handleSubmit}
            submitText={isPending ? "Đang tạo..." : "Tạo công việc"}
            disabled={isPending}
          />
        </div>
      </div>
    </div>
  );
}
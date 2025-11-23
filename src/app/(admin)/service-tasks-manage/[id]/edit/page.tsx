// app/service-tasks/[id]/edit/page.tsx
"use client";

import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ServiceTaskForm from '@/app/(admin)/_component/ServiceTaskForm';
import { useServiceTask, useUpdateServiceTask } from '@/libs/hooks/useServiceTasks';

export default function EditServiceTaskPage() {
  const { id } = useParams();
  const { data: task, isLoading } = useServiceTask(id as string);
  const { mutate: updateTask, isPending } = useUpdateServiceTask();
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  const handleSubmit = async (data: any) => {
    await updateTask({ id: id as string, data });
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
          <h1 className="text-3xl font-black text-gray-800 tracking-tight">Chỉnh sửa công việc</h1>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-teal-100">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
              <span className="text-teal-600 font-bold text-lg">ID</span>
            </div>
            <code className="text-sm font-mono text-teal-600 bg-teal-50 px-3 py-1 rounded-lg">
              {task?.task_id}
            </code>
          </div>

          <ServiceTaskForm
            defaultValues={{
              vehicle_id: task?.vehicle_id,
              type: task?.type,
              description: task?.description || '',
              assigned_to: task?.assigned_to || '',
              scheduled_at: task?.scheduled_at || '',
              status: task?.status,
            }}
            onSubmit={handleSubmit}
            submitText={isPending ? "Đang cập nhật..." : "Cập nhật"}
            disabled={isPending}
          />
        </div>
      </div>
    </div>
  );
}

// app/service-tasks/page.tsx
"use client";

import { useState } from 'react';
import { useServiceTasks, useCreateServiceTask, useUpdateServiceTask, useDeleteServiceTask } from '@/libs/hooks/useServiceTasks';
import { ServiceTaskForm } from './_components/ServiceTaskForm';
import { Plus } from 'lucide-react';
import EmptyState from '@/app/(admin)/ownership-groups-manage/_components/EmptyState';
import ErrorState from '@/app/(admin)/ownership-groups-manage/_components/ErrorState';
import LoadingSkeleton from './_components/LoadingSkeleton';
import TaskFilters from './_components/TaskFilters';
import TaskList from './_components/TaskList';
import Modal from './_components/Modal';
import TaskStats from './_components/TaskStats';

export default function ServiceTasksPage() {
  const { tasks, isLoading, error } = useServiceTasks();
  const { mutate: create } = useCreateServiceTask();
  const { mutate: update } = useUpdateServiceTask();
  const { mutate: remove } = useDeleteServiceTask();

  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [filterType, setFilterType] = useState<any>('all');
  const [filterStatus, setFilterStatus] = useState<any>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTasks = tasks?.filter(task => {
    const matchesType = filterType === 'all' || task.type === filterType;
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    const matchesSearch = searchTerm === '' ||
      task.task_id.toString().includes(searchTerm) ||
      task.vehicle_id.toString().includes(searchTerm) ||
      (task.description?.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesType && matchesStatus && matchesSearch;
  });

  const handleStatusChange = async (id: number, status: any) => {
    await update({ id, data: { status } });
  };

  const handleDelete = async (id: number) => {
    if (confirm('Xóa công việc này?')) await remove(id);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50">
      {/* HERO */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-600/10 to-cyan-600/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32 text-center">
          <div className="inline-flex items-center gap-2 bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <span className="w-4 h-4 animate-pulse bg-teal-500 rounded-full" /> Quản lý bảo dưỡng & dịch vụ
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900">
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-600">Dịch vụ xe</span>
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            Theo dõi, lên lịch và hoàn thành mọi công việc bảo trì, sạc, vệ sinh một cách dễ dàng.
          </p>
          <TaskStats tasks={filteredTasks} isLoading={isLoading} />
          <button
            onClick={() => setOpenCreate(true)}
            className="mt-12 group inline-flex items-center gap-3 bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-bold text-lg px-10 py-5 rounded-2xl shadow-2xl hover:shadow-cyan-500/50 transition-all hover:scale-110 hover:-translate-y-1"
          >
            <Plus className="w-7 h-7 group-hover:rotate-90 transition-transform duration-500" />
            Tạo công việc mới
          </button>
        </div>
      </div>

      {/* MAIN */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10 pb-24">
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 lg:p-12">
          <h2 className="text-4xl font-black text-gray-900 mb-3 flex items-center gap-3">
            <span className="w-10 h-10 text-teal-600" /> Danh sách công việc
          </h2>
          <TaskFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterType={filterType}
            setFilterType={setFilterType}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
          />

          {isLoading && <LoadingSkeleton />}
          {error && <ErrorState onRetry={() => window.location.reload()} />}
          {!isLoading && !error && filteredTasks?.length === 0 && <EmptyState onCreate={() => setOpenCreate(true)} />}
          {!isLoading && !error && filteredTasks && filteredTasks.length > 0 && (
            <TaskList
              tasks={filteredTasks}
              onEdit={(task) => { setSelectedTask(task); setOpenEdit(true); }}
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>

      {/* FAB */}
      <button
        onClick={() => setOpenCreate(true)}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-teal-500 to-cyan-600 text-white p-5 rounded-full shadow-2xl hover:shadow-cyan-600/50 transition-all hover:scale-110 z-50 lg:hidden"
      >
        <Plus className="w-8 h-8" />
      </button>

      {/* MODALS */}
      {openCreate && (
        <Modal title="Tạo công việc mới" onClose={() => setOpenCreate(false)}>
          <ServiceTaskForm onSubmit={async (data) => { await create(data); setOpenCreate(false); }} />
        </Modal>
      )}
      {openEdit && selectedTask && (
        <Modal title={`Sửa công việc #${selectedTask.task_id}`} onClose={() => setOpenEdit(false)}>
          <ServiceTaskForm
            defaultValues={{
              vehicle_id: selectedTask.vehicle_id,
              assigned_to: selectedTask.assigned_to || undefined,
              type: selectedTask.type,
              description: selectedTask.description || '',
              status: selectedTask.status,
              scheduled_at: selectedTask.scheduled_at ? new Date(selectedTask.scheduled_at).toISOString().slice(0, 16) : '',
              completed_at: selectedTask.completed_at ? new Date(selectedTask.completed_at).toISOString().slice(0, 16) : '',
            }}
            onSubmit={async (data) => { await update({ id: selectedTask.task_id, data }); setOpenEdit(false); }}
          />
        </Modal>
      )}
    </main>
  );
}
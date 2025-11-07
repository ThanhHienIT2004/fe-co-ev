// app/service-tasks/page.tsx
"use client";

import { useServiceTasks, useDeleteServiceTask } from '@/libs/hooks/useServiceTasks';
import { Plus, Filter, Edit, Trash2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import ServiceTaskCard from '../_component/ServiceTaskCard';

export default function ServiceTasksPage() {
  const { tasks, isLoading, error, mutate } = useServiceTasks();
  const { mutate: deleteTask } = useDeleteServiceTask();
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredTasks = tasks?.filter(task => {
    if (filterType !== 'all' && task.type !== filterType) return false;
    if (filterStatus !== 'all' && task.status !== filterStatus) return false;
    return true;
  });

  const handleDelete = async (id: string) => {
    if (!confirm('Xóa công việc này? Hành động không thể hoàn tác.')) return;
    
    try {
      await deleteTask(id);
      // Optional: show toast success
    } catch (err) {
      alert('Xóa thất bại. Vui lòng thử lại.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">Công việc bảo trì</h1>
            <p className="text-lg text-gray-600 mt-1">
              {isLoading ? 'Đang tải...' : `${filteredTasks?.length || 0} công việc`}
            </p>
          </div>

          <Link
            href="/service-tasks-manage/create"
            className="group flex items-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
            Tạo công việc
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
          >
            <option value="all">Tất cả loại</option>
            <option value="maintenance">Bảo dưỡng</option>
            <option value="inspection">Kiểm tra</option>
            <option value="charging">Sạc pin</option>
            <option value="cleaning">Vệ sinh</option>
            <option value="other">Khác</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="pending">Chờ xử lý</option>
            <option value="in_progress">Đang làm</option>
            <option value="completed">Hoàn thành</option>
            <option value="cancelled">Đã hủy</option>
          </select>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-md p-6 animate-pulse">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
                    <div className="space-y-2">
                      <div className="h-5 bg-gray-200 rounded w-32"></div>
                      <div className="h-4 bg-gray-200 rounded w-24"></div>
                    </div>
                  </div>
                  <div className="h-6 bg-gray-200 rounded-full w-24"></div>
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center py-12 bg-red-50 rounded-2xl border border-red-200">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
            <p className="text-red-600 font-medium">Không tải được dữ liệu. Vui lòng thử lại.</p>
          </div>
        )}

        {/* List */}
        {!isLoading && filteredTasks && filteredTasks.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTasks.map((task) => (
              <div key={task.task_id} className="relative group">
                <ServiceTaskCard task={task} />
                {/* Action Buttons - Hover */}
                <div className="flex justify-end gap-2 mt-4">
                  <Link
                    href={`/service-tasks-manage/${task.task_id}/edit`}
                    className="p-2.5 bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-200 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110"
                    title="Chỉnh sửa"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(task.task_id)}
                    className="p-2.5 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110"
                    title="Xóa"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
            <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Filter className="w-10 h-10 text-gray-400" />
            </div>
            <p className="text-gray-500 text-lg font-medium">Chưa có công việc nào.</p>
            <p className="text-gray-400 text-sm mt-1">Tạo công việc đầu tiên để bắt đầu!</p>
          </div>
        )}
      </div>
    </div>
  );
}
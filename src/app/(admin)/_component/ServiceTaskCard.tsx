// components/ServiceTaskCard.tsx
import { ServiceTask, TaskStatus, TaskType } from '@/types/service-tasks.type';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Car, Clock, User, Calendar, CheckCircle, AlertCircle, XCircle, Wrench, Zap, Droplets, MoreHorizontal } from 'lucide-react';

const statusConfig: Record<TaskStatus, { label: string; color: string; icon: React.ReactNode }> = {
  pending: { label: 'Chờ xử lý', color: 'bg-amber-100 text-amber-700', icon: <Clock className="w-4 h-4" /> },
  in_progress: { label: 'Đang thực hiện', color: 'bg-blue-100 text-blue-700', icon: <AlertCircle className="w-4 h-4" /> },
  completed: { label: 'Hoàn thành', color: 'bg-emerald-100 text-emerald-700', icon: <CheckCircle className="w-4 h-4" /> },
  cancelled: { label: 'Đã hủy', color: 'bg-red-100 text-red-700', icon: <XCircle className="w-4 h-4" /> },
};

const typeConfig: Record<TaskType, { label: string; icon: React.ReactNode; color: string }> = {
  maintenance: { label: 'Bảo dưỡng', icon: <Wrench className="w-5 h-5" />, color: 'text-orange-600' },
  inspection: { label: 'Kiểm tra', icon: <AlertCircle className="w-5 h-5" />, color: 'text-purple-600' },
  charging: { label: 'Sạc pin', icon: <Zap className="w-5 h-5" />, color: 'text-cyan-600' },
  cleaning: { label: 'Vệ sinh', icon: <Droplets className="w-5 h-5" />, color: 'text-teal-600' },
  other: { label: 'Khác', icon: <MoreHorizontal className="w-5 h-5" />, color: 'text-gray-600' },
};

export default function ServiceTaskCard({ task }: { task: ServiceTask }) {
  const status = statusConfig[task.status];
  const type = typeConfig[task.type];

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-xl ${type.color} bg-opacity-10`}>
            {type.icon}
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-800">{type.label}</h3>
           </div>
        </div>
        <span className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 ${status.color}`}>
          {status.icon} {status.label}
        </span>
      </div>

      {task.description && (
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{task.description}</p>
      )}

      <div className="space-y-3 text-sm">
        <div className="flex items-center gap-2 text-gray-700">
          <Car className="w-4 h-4 text-teal-600" />
          <span className="font-medium">{task.vehicle_name || 'Xe #' + task.vehicle_id.slice(0, 8)}</span>
          <span className="text-gray-500">• {task.license_plate || 'N/A'}</span>
        </div>

        {task.assigned_to && (
          <div className="flex items-center gap-2 text-gray-700">
            <User className="w-4 h-4 text-teal-600" />
            <span>{task.assigned_to}</span>
          </div>
        )}

        {task.scheduled_at && (
          <div className="flex items-center gap-2 text-gray-700">
            <Calendar className="w-4 h-4 text-teal-600" />
            <span>
              {format(new Date(task.scheduled_at), "PPPp", { locale: vi })}
            </span>
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100 text-xs text-gray-400 flex justify-between">
        <span>Tạo: {format(new Date(task.created_at), "dd/MM/yyyy", { locale: vi })}</span>
        {task.completed_at && (
          <span>Hoàn thành: {format(new Date(task.completed_at), "dd/MM/yyyy", { locale: vi })}</span>
        )}
      </div>
    </div>
  );
}
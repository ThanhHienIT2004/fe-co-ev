// app/service-tasks/_components/StatusBadge.tsx
import { TaskStatus } from '@/types/service-tasks.type';
import { Clock, Play, CheckCircle, XCircle } from 'lucide-react';

interface StatusConfig {
  label: string;
  icon: React.ReactNode;
  className: string;
}

const statusConfig: Record<TaskStatus, StatusConfig> = {
  pending: {
    label: 'Chờ xử lý',
    icon: <Clock className="w-3 h-3" />,
    className: 'bg-yellow-100 text-yellow-700 border border-yellow-200',
  },
  in_progress: {
    label: 'Đang thực hiện',
    icon: <Play className="w-3 h-3" />,
    className: 'bg-blue-100 text-blue-700 border border-blue-200',
  },
  completed: {
    label: 'Hoàn thành',
    icon: <CheckCircle className="w-3 h-3" />,
    className: 'bg-green-100 text-green-700 border border-green-200',
  },
  cancelled: {
    label: 'Đã hủy',
    icon: <XCircle className="w-3 h-3" />,
    className: 'bg-red-100 text-red-700 border border-red-200',
  },
};

export function StatusBadge({ status }: { status: TaskStatus }) {
  const config = statusConfig[status];
  if (!config) return <span className="text-xs text-gray-500">Không xác định</span>;

  return (
    <div
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${config.className}`}
    >
      {config.icon}
      <span>{config.label}</span>
    </div>
  );
}
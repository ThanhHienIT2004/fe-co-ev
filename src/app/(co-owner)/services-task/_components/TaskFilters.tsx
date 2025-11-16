// app/service-tasks/_components/TaskFilters.tsx
import { TaskType, TaskStatus } from '@/types/service-tasks.type';
import { Search } from 'lucide-react';

const typeLabels: Record<TaskType, string> = {
  maintenance: 'Bảo trì',
  inspection: 'Kiểm tra',
  charging: 'Sạc pin',
  cleaning: 'Vệ sinh',
  other: 'Khác',
};

const statusLabels: Record<TaskStatus, string> = {
  pending: 'Chờ xử lý',
  in_progress: 'Đang thực hiện',
  completed: 'Hoàn thành',
  cancelled: 'Đã hủy',
};

interface TaskFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  filterType: TaskType | 'all';
  setFilterType: (value: TaskType | 'all') => void;
  filterStatus: TaskStatus | 'all';
  setFilterStatus: (value: TaskStatus | 'all') => void;
}

export default function TaskFilters({
  searchTerm,
  setSearchTerm,
  filterType,
  setFilterType,
  filterStatus,
  setFilterStatus,
}: TaskFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-8">
      {/* Search */}
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Tìm theo ID, xe, mô tả..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white/60 backdrop-blur-xl border border-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all placeholder:text-gray-400"
        />
      </div>

      {/* Filter Type */}
      <select
        value={filterType}
        onChange={(e) => setFilterType(e.target.value as TaskType | 'all')}
        className="px-4 py-3 bg-white/60 backdrop-blur-xl border border-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer appearance-none"
      >
        <option value="all">Tất cả loại</option>
        {Object.values(TaskType).map((value) => (
          <option key={value} value={value}>
            {typeLabels[value]}
          </option>
        ))}
      </select>

      {/* Filter Status */}
      <select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value as TaskStatus | 'all')}
        className="px-4 py-3 bg-white/60 backdrop-blur-xl border border-white/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer appearance-none"
      >
        <option value="all">Tất cả trạng thái</option>
        {Object.values(TaskStatus).map((value) => (
          <option key={value} value={value}>
            {statusLabels[value]}
          </option>
        ))}
      </select>
    </div>
  );
}
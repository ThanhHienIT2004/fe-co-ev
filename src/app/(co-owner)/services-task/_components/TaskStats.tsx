// app/service-tasks/_components/TaskStats.tsx
import { Wrench, Zap, Car } from 'lucide-react';
import { ServiceTask } from '@/types/service-tasks.type';

interface TaskStatsProps {
  tasks: ServiceTask[] | undefined;
  isLoading: boolean;
}

export default function TaskStats({ tasks, isLoading }: TaskStatsProps) {
  const maintenance = tasks?.filter(t => t.type === 'maintenance').length || 0;
  const charging = tasks?.filter(t => t.type === 'charging').length || 0;
  const total = tasks?.length || 0;
  const completed = tasks?.filter(t => t.status === 'completed').length || 0;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="mt-12 grid grid-cols-1 sm:grid-cols-4 gap-6 max-w-5xl mx-auto">
      <StatCard icon={<Wrench className="w-10 h-10 text-teal-600" />} label="Bảo trì" value={isLoading ? '-' : maintenance} />
      <StatCard icon={<Zap className="w-10 h-10 text-cyan-600" />} label="Sạc pin" value={isLoading ? '-' : charging} />
      <StatCard icon={<Car className="w-10 h-10 text-teal-600" />} label="Tổng công việc" value={isLoading ? '-' : total} />
      <StatCard label="Hoàn thành" value={isLoading ? '-' : `${percent}%`} gradient />
    </div>
  );
}

function StatCard({ icon, label, value, gradient }: { icon?: React.ReactNode; label: string; value: string | number; gradient?: boolean }) {
  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/50 p-6 text-center transform hover:scale-105 transition-all duration-300">
      {icon && <div className="mx-auto mb-3">{icon}</div>}
      <p className={`text-3xl font-black ${gradient ? 'text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-600' : 'text-gray-900'}`}>
        {value}
      </p>
      <p className="text-gray-600 font-medium">{label}</p>
    </div>
  );
}
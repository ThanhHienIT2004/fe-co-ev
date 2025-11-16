// app/service-tasks/_components/TaskCard.tsx
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Calendar, Clock, Pencil, Play, CheckCircle, XCircle, Trash2 } from 'lucide-react';
import { StatusBadge } from './StatusBadge';

const formatDate = (date: string | null) => date ? format(new Date(date), 'dd/MM/yyyy HH:mm', { locale: vi }) : '-';

export default function TaskCard({ task, onEdit, onStatusChange, onDelete }: any) {
  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/50 p-6 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-xl">
            {typeIcons[task.type]}
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-900">#{task.task_id}</h3>
            <p className="text-sm text-gray-600">Xe #{task.vehicle_id}</p>
          </div>
        </div>
        <StatusBadge status={task.status} />
      </div>

      <div className="space-y-2 text-sm text-gray-600">
        <p className="flex items-center gap-2"><Calendar className="w-4 h-4 text-teal-600" /> Dự kiến: <span className="font-medium">{formatDate(task.scheduled_at)}</span></p>
        <p className="flex items-center gap-2"><Clock className="w-4 h-4 text-cyan-600" /> Hoàn thành: <span className="font-medium">{formatDate(task.completed_at)}</span></p>
        {task.description && <p className="text-gray-700 mt-3 line-clamp-2">{task.description}</p>}
      </div>

      <div className="flex gap-2 mt-6">
        <button onClick={() => onEdit(task)} className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-medium py-2.5 rounded-xl hover:shadow-lg transition-all">
          <Pencil className="w-4 h-4" /> Sửa
        </button>
        {task.status === 'pending' && <QuickBtn icon={<Play className="w-4 h-4" />} onClick={() => onStatusChange(task.task_id, 'in_progress')} color="blue" />}
        {task.status === 'in_progress' && <QuickBtn icon={<CheckCircle className="w-4 h-4" />} onClick={() => onStatusChange(task.task_id, 'completed')} color="green" />}
        {task.status !== 'cancelled' && <QuickBtn icon={<XCircle className="w-4 h-4" />} onClick={() => onStatusChange(task.task_id, 'cancelled')} color="red" />}
        <QuickBtn icon={<Trash2 className="w-4 h-4" />} onClick={() => onDelete(task.task_id)} color="gray" />
      </div>
    </div>
  );
}

function QuickBtn({ icon, onClick, color }: any) {
  const colors: any = { blue: 'blue-100 text-blue-600 hover:bg-blue-200', green: 'green-100 text-green-600 hover:bg-green-200', red: 'red-100 text-red-600 hover:bg-red-200', gray: 'gray-100 text-gray-600 hover:bg-gray-200' };
  return <button onClick={onClick} className={`p-2.5 ${colors[color]} rounded-xl transition`}>{icon}</button>;
}
// app/service-tasks/_components/TaskList.tsx
import TaskCard from './TaskCard';

interface TaskListProps {
  tasks: any[];
  onEdit: (task: any) => void;
  onStatusChange: (id: number, status: string) => void;
  onDelete: (id: number) => void;
}

export default function TaskList({ tasks, onEdit, onStatusChange, onDelete }: TaskListProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
      {tasks.map((task) => (
        <TaskCard
          key={task.task_id}
          task={task}
          onEdit={onEdit}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
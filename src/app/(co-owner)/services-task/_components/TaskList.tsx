// app/service-tasks/_components/TaskList.tsx
import TaskCard from './TaskCard';

export default function TaskList({ tasks, onEdit, onStatusChange, onDelete }: any) {
  return (
    <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
      {tasks.map((task: any) => (
        <TaskCard key={task.task_id} task={task} onEdit={onEdit} onStatusChange={onStatusChange} onDelete={onDelete} />
      ))}
    </div>
  );
}
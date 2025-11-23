// types/service-tasks.type.ts

export interface ServiceTask {
  task_id: number;
  vehicle_id: number;
  vehicle_name?: string;
  license_plate?: string;
  assigned_to: string | null;
  type: TaskType;
  description: string | null;
  status: TaskStatus;
  scheduled_at: string | null;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateServiceTaskDto {
  vehicle_id: number;
  type: TaskType;
  description?: string;
  assigned_to?: string;
  status?: TaskStatus;
  scheduled_at?: string;
  completed_at?: string;
}
// types/service-tasks.type.ts

// 1. Tạo giá trị runtime (value) – dùng cho Object.values()
export const TaskType = {
  MAINTENANCE: 'maintenance',
  INSPECTION: 'inspection',
  CHARGING: 'charging',
  CLEANING: 'cleaning',
  OTHER: 'other',
} as const;

// 2. Tạo type từ value
export type TaskType = typeof TaskType[keyof typeof TaskType];

// Tương tự cho TaskStatus
export const TaskStatus = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

export type TaskStatus = typeof TaskStatus[keyof typeof TaskStatus];
export interface UpdateServiceTaskDto extends Partial<CreateServiceTaskDto> {}
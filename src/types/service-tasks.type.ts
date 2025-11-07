// types/service-tasks.type.ts
export type TaskType = 'maintenance' | 'inspection' | 'charging' | 'cleaning' | 'other';
export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';

export interface ServiceTask {
  task_id: string;
  vehicle_id: string;
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

// DTOs dùng cho form và API
export interface CreateServiceTaskDto {
  vehicle_id: string;
  type: TaskType;
  description?: string;
  assigned_to?: string;
  status?: TaskStatus;
  scheduled_at?: string;
  completed_at?: string;
}

export interface UpdateServiceTaskDto extends Partial<CreateServiceTaskDto> {}
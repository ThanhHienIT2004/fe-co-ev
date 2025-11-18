// types/conflict.type.ts

export enum ResolutionStatus {
  UNRESOLVED = "unresolved",
  IN_PROGRESS = "in_progress",
  RESOLVED = "resolved",
  REJECTED = "rejected",
}

// Dữ liệu 1 conflict log
export interface ConflictLog {
  conflict_id: number;
  booking_id: number;
  resolved_by?: string | null;
  resolution_status: ResolutionStatus;
  description?: string | null;
  created_at: string; // dạng ISO string khi nhận từ API
  resolved_at?: number | null;
}

// Dùng để tạo conflict mới
export interface CreateConflictDto {
  conflict_id?: number; // có thể để BE tự tạo
  booking_id: number;
  description?: string;
}

// Dùng để cập nhật trạng thái conflict
export interface UpdateConflictStatusDto {
  resolution_status: ResolutionStatus;
  resolved_by?: number;
}
